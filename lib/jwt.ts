interface DecodedToken {
  role?: string;
  exp?: number;
  [key: string]: any;
}

/**
 * Decodes a JWT token without verifying its signature.
 * Useful for extracting payload data (like roles and expiration) on the client or server.
 */
export function decodeJwt(token: string): DecodedToken | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("[JWT Utility] Failed to decode token payload:", error);
    return null;
  }
}

/**
 * Decodes and verifies a JWT token signature using HS256 algorithm with Web Crypto API.
 * Checks for expiration and returns the decoded payload if valid.
 */
export async function verifyJwt(
  token: string,
  secret: string
): Promise<DecodedToken | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signatureB64] = parts;

    // 1. Decode payload and check expiration
    const payload = decodeJwt(token);
    if (!payload) return null;

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      console.warn("[JWT Utility] Token is expired.");
      return null;
    }

    // If secret is not provided or is the default placeholder, fallback to payload-only validation
    // to prevent local development blockages, but print a warning.
    if (!secret || secret === "replace-with-your-jwt-secret") {
      console.warn("[JWT Utility] JWT_SECRET is not configured or uses placeholder. Skipping signature verification in development.");
      return payload;
    }

    // 2. Prepare signature verification data
    const encoder = new TextEncoder();
    const data = encoder.encode(`${headerB64}.${payloadB64}`);

    // Convert base64url signature to Uint8Array buffer
    const sigBase64 = signatureB64.replace(/-/g, "+").replace(/_/g, "/");
    // Handle padding
    const paddedSigBase64 = sigBase64.padEnd(
      sigBase64.length + ((4 - (sigBase64.length % 4)) % 4),
      "="
    );
    const sigBinary = atob(paddedSigBase64);
    const sigBuffer = new Uint8Array(sigBinary.length);
    for (let i = 0; i < sigBinary.length; i++) {
      sigBuffer[i] = sigBinary.charCodeAt(i);
    }

    // 3. Import secret key for HMAC SHA-256 (HS256)
    const keyData = encoder.encode(secret);
    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    // 4. Verify signature
    const isValid = await crypto.subtle.verify("HMAC", key, sigBuffer, data);
    if (!isValid) {
      console.error("[JWT Utility] Signature verification failed.");
      return null;
    }

    return payload;
  } catch (error) {
    console.error("[JWT Utility] Error verifying token:", error);
    return null;
  }
}
