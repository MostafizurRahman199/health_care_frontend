import { cookies } from "next/headers";

/**
 * Extracts Set-Cookie headers from a backend response and sets them in the client's browser.
 * This is the industry-standard way to forward cookies (e.g. accessToken, refreshToken)
 * from a backend server-to-server fetch request inside Next.js Server Actions or Route Handlers.
 * 
 * @param response - The Response object returned from the backend fetch call
 */
export async function setCookiesFromResponse(response: Response): Promise<void> {
  // getSetCookie retrieves all Set-Cookie headers from the fetch response
  const setCookieHeaders = response.headers.getSetCookie();
  // console.log("[Cookies Utility] Backend Set-Cookie headers:", setCookieHeaders);
  
  if (setCookieHeaders.length === 0) {
    console.warn("[Cookies Utility] No Set-Cookie headers found in the response.");
    return;
  }

  const cookieStore = await cookies();

  for (const cookieStr of setCookieHeaders) {
    const parts = cookieStr.split(";").map((p) => p.trim());
    const [nameValue, ...attrs] = parts;
    const eqIdx = nameValue.indexOf("=");
    if (eqIdx === -1) continue;

    const name = nameValue.slice(0, eqIdx);
    const value = nameValue.slice(eqIdx + 1);

    const options: {
      path?: string;
      domain?: string;
      maxAge?: number;
      expires?: Date;
      httpOnly?: boolean;
      secure?: boolean;
      sameSite?: "lax" | "strict" | "none";
    } = {};
    for (const attr of attrs) {
      const [attrName, attrVal] = attr.split("=");
      const nameKey = attrName.trim().toLowerCase();

      if (nameKey === "path") {
        options.path = attrVal ? attrVal.trim() : "/";
      } else if (nameKey === "domain") {
        // Omit backend domain in local development to avoid mismatch issues
        options.domain = process.env.NODE_ENV === "production" ? (attrVal ? attrVal.trim() : undefined) : undefined;
      } else if (nameKey === "max-age") {
        options.maxAge = attrVal ? parseInt(attrVal.trim(), 10) : undefined;
      } else if (nameKey === "expires") {
        options.expires = attrVal ? new Date(attrVal.trim()) : undefined;
      } else if (nameKey === "httponly") {
        options.httpOnly = true;
      } else if (nameKey === "secure") {
        options.secure = process.env.NODE_ENV === "production";
      } else if (nameKey === "samesite") {
        const val = attrVal ? attrVal.trim().toLowerCase() : "";
        if (val === "lax" || val === "strict" || val === "none") {
          options.sameSite = val;
        }
      }
    }

    // Default secure option based on environment if not specified
    if (options.secure === undefined) {
      options.secure = process.env.NODE_ENV === "production";
    }

    // SameSite=None cookies MUST be Secure.
    // In local development (secure: false), we change SameSite to Lax so the browser accepts and stores the cookie.
    if (!options.secure && options.sameSite === "none") {
      options.sameSite = "lax";
    }

    console.log(`[Cookies Utility] Setting cookie: ${name} with options:`, options);
    cookieStore.set(name, value, options);
  }
}
