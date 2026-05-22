import { describe, it, expect } from "vitest";
import { generateCsrfToken, validateCsrfToken } from "../src/lib/csrf";

describe("csrf", () => {
  it("generates 64-char hex token", () => {
    const token = generateCsrfToken();
    expect(token).toHaveLength(64);
    expect(/^[a-f0-9]{64}$/.test(token)).toBe(true);
  });

  it("generates unique tokens each call", () => {
    const a = generateCsrfToken();
    const b = generateCsrfToken();
    expect(a).not.toBe(b);
  });

  it("validates matching tokens", () => {
    const token = generateCsrfToken();
    expect(validateCsrfToken(token, token)).toBe(true);
  });

  it("rejects mismatched tokens", () => {
    expect(validateCsrfToken("a".repeat(64), "b".repeat(64))).toBe(false);
  });

  it("rejects null candidate", () => {
    expect(validateCsrfToken(null, generateCsrfToken())).toBe(false);
  });

  it("rejects null expected", () => {
    expect(validateCsrfToken(generateCsrfToken(), null)).toBe(false);
  });

  it("rejects different length tokens", () => {
    expect(validateCsrfToken("abc", "abcdef")).toBe(false);
  });

  it("rejects empty strings", () => {
    expect(validateCsrfToken("", "")).toBe(false);
  });
});
