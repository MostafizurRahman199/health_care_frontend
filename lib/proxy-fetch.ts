import { buildUrl } from "@/lib/build-url";
import { setCookiesFromResponse } from "@/lib/cookies";

/**
 * A custom fetch wrapper that proxies requests to the backend server.
 * 
 * Key features:
 * 1. Prepends backend URL using the buildUrl utility.
 * 2. On the server side:
 *    - Forwards cookies (such as accessToken and refreshToken) to the backend.
 *    - Automatically sets Authorization header with Bearer token if accessToken is present.
 *    - Captures Set-Cookie headers from the backend response and applies them to the client's browser.
 * 3. On the client side:
 *    - Defaults credentials to 'include' to ensure browser-managed cookies are forwarded properly.
 */



export async function proxyFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const url = buildUrl(path);
  const headers = new Headers(options.headers);
  const isServer = typeof window === "undefined";

  const fetchOptions: RequestInit = {
    ...options,
    headers,
  };

  if (isServer) {
    try {
      // Dynamically import next/headers to prevent bundler errors on the client side
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();

      // Forward all current request cookies to the backend
      const allCookies = cookieStore.getAll();
      if (allCookies.length > 0 && !headers.has("Cookie")) {
        const cookieHeader = allCookies.map((c) => `${c.name}=${c.value}`).join("; ");
        headers.set("Cookie", cookieHeader);
      }

      // Automatically attach Bearer token if accessToken is present
      const accessToken = cookieStore.get("accessToken")?.value;
      if (accessToken && !headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
    } catch (err) {
      console.warn("[proxyFetch] Warning: cookies() could not be accessed.", err);
    }
  } else {
    // Client-side: include credentials to send cookies automatically
    fetchOptions.credentials = fetchOptions.credentials || "include";
  }

  let response = await fetch(url, fetchOptions);

  if (isServer) {
    try {
      await setCookiesFromResponse(response);
    } catch (err) {
      console.warn("[proxyFetch] Warning: failed to forward backend cookies to client.", err);
    }
  }

  // Define paths to ignore for automatic refresh to avoid infinite loops
  const LOGIN_PATH = "/auth/login";
  const REFRESH_PATH = "/auth/refresh-token";

  // If the access token is expired (401 Unauthorized), attempt to refresh it using the refresh token
  if (
    response.status === 401 &&
    !path.includes(LOGIN_PATH) &&
    !path.includes(REFRESH_PATH)
  ) {
    console.log(`[proxyFetch] Access token expired (401) on path ${path}. Attempting token refresh...`);

    const refreshUrl = buildUrl(REFRESH_PATH);
    const refreshHeaders = new Headers();

    if (isServer) {
      try {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get("refreshToken")?.value;

        if (refreshToken) {
          // Forward only the refresh token cookie to the backend refresh endpoint
          refreshHeaders.set("Cookie", `refreshToken=${refreshToken}`);
        }
      } catch (err) {
        console.warn("[proxyFetch] Failed to retrieve refresh token from cookies:", err);
      }
    } else {
      // Client-side: browser naturally includes cookies if credentials = 'include'
    }

    try {
      const refreshResponse = await fetch(refreshUrl, {
        method: "POST",
        headers: refreshHeaders,
        credentials: isServer ? undefined : "include",
      });

      if (refreshResponse.ok) {
        console.log("[proxyFetch] Token refresh succeeded. Retrying original request...");

        if (isServer) {
          // Apply new cookies returned from the refresh endpoint (e.g. new accessToken)
          await setCookiesFromResponse(refreshResponse);

          const { cookies } = await import("next/headers");
          const cookieStore = await cookies();

          // Re-attach the new Bearer accessToken
          const newAccessToken = cookieStore.get("accessToken")?.value;
          if (newAccessToken) {
            headers.set("Authorization", `Bearer ${newAccessToken}`);
          }

          // Re-forward all current cookies for the retry request
          const allCookies = cookieStore.getAll();
          if (allCookies.length > 0) {
            const cookieHeader = allCookies.map((c) => `${c.name}=${c.value}`).join("; ");
            headers.set("Cookie", cookieHeader);
          }
        }

        // Retry the original request
        response = await fetch(url, fetchOptions);

        if (isServer) {
          try {
            await setCookiesFromResponse(response);
          } catch (err) {
            console.warn("[proxyFetch] Retry cookie set warning:", err);
          }
        }
      } else {
        console.warn("[proxyFetch] Refresh token failed or expired. Clearing cookies.");
        if (isServer) {
          const { cookies } = await import("next/headers");
          const cookieStore = await cookies();
          cookieStore.delete("accessToken");
          cookieStore.delete("refreshToken");
        }
      }
    } catch (refreshErr) {
      console.error("[proxyFetch] Error occurred during token refresh:", refreshErr);
    }
  }

  return response;
}

// Utility methods for semantic requests
export const proxy = {
  get: (path: string, options?: RequestInit) => {
    return proxyFetch(path, { ...options, method: "GET" });
  },
  
  post: (path: string, body?: unknown, options?: RequestInit) => {
    const headers = new Headers(options?.headers);
    const isFormData = body instanceof FormData;

    if (!isFormData && body !== undefined && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    return proxyFetch(path, {
      ...options,
      method: "POST",
      headers,
      body: isFormData ? (body as FormData) : JSON.stringify(body),
    });
  },

  put: (path: string, body?: unknown, options?: RequestInit) => {
    const headers = new Headers(options?.headers);
    const isFormData = body instanceof FormData;

    if (!isFormData && body !== undefined && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    return proxyFetch(path, {
      ...options,
      method: "PUT",
      headers,
      body: isFormData ? (body as FormData) : JSON.stringify(body),
    });
  },

  patch: (path: string, body?: unknown, options?: RequestInit) => {
    const headers = new Headers(options?.headers);
    const isFormData = body instanceof FormData;

    if (!isFormData && body !== undefined && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    return proxyFetch(path, {
      ...options,
      method: "PATCH",
      headers,
      body: isFormData ? (body as FormData) : JSON.stringify(body),
    });
  },

  delete: (path: string, options?: RequestInit) => {
    return proxyFetch(path, { ...options, method: "DELETE" });
  },
};
