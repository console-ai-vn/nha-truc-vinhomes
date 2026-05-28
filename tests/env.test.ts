import { describe, it, expect, beforeEach } from "vitest";
import { getGoogleSheetsEnv } from "../src/lib/env";

describe("getGoogleSheetsEnv", () => {
  beforeEach(() => {
    delete process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    delete process.env.GOOGLE_PRIVATE_KEY_FILE;
    delete process.env.GOOGLE_PRIVATE_KEY;
    delete process.env.GOOGLE_SHEET_ID;
  });

  it("returns not configured when all missing", () => {
    const env = getGoogleSheetsEnv();
    expect(env.configured).toBe(false);
    expect(env.missing).toHaveLength(3);
  });

  it("returns not configured when partially set", () => {
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = "test@test.com";
    const env = getGoogleSheetsEnv();
    expect(env.configured).toBe(false);
    expect(env.missing).toContain("privateKey");
    expect(env.missing).toContain("sheetId");
  });

  it("returns configured when all set", () => {
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = "test@test.com";
    process.env.GOOGLE_PRIVATE_KEY_FILE = "/path/to/key.json";
    process.env.GOOGLE_SHEET_ID = "abc123";
    const env = getGoogleSheetsEnv();
    expect(env.configured).toBe(true);
    expect(env.missing).toHaveLength(0);
    expect(env.clientEmail).toBe("test@test.com");
    expect(env.sheetId).toBe("abc123");
  });
});
