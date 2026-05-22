import crypto from "node:crypto";

/** CSRFToken TTL in seconds — matches cookie maxAge */
export const CSRFTokenTTL = 60 * 60;

/**
 * Generate a cryptographically-secure CSRF token (64 hex chars).
 * Fresh token generated per request to GET /api/csrf.
 */
export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Timing-safe comparison of the cookie value against the header value.
 * cookieValue — read from __Host-csrf cookie
 * headerValue — read from X-CSRF-Token request header
 */
export function validateCsrfToken(candidate: string | null, expected: string | null): boolean {
  if (!candidate || !expected) return false;
  if (candidate.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(candidate), Buffer.from(expected));
}
