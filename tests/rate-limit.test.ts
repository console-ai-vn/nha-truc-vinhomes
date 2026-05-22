import { describe, it, expect, beforeEach } from "vitest";
import { rateLimit, extractIp } from "../src/lib/rate-limit";

describe("rateLimit", () => {
  it("allows first request", () => {
    const r = rateLimit("192.168.1.1");
    expect(r.success).toBe(true);
    expect(r.remaining).toBe(4);
  });

  it("allows 5 requests then blocks 6th", () => {
    const ip = "10.0.0.1";
    for (let i = 0; i < 5; i++) {
      const r = rateLimit(ip);
      expect(r.success).toBe(true);
    }
    const blocked = rateLimit(ip);
    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it("counts requests separately per IP", () => {
    const ip1 = "1.1.1.1";
    const ip2 = "2.2.2.2";
    rateLimit(ip1);
    rateLimit(ip1);
    const r = rateLimit(ip2);
    expect(r.success).toBe(true);
    expect(r.remaining).toBe(4);
  });

  it("returns reset time in seconds", () => {
    const r = rateLimit("3.3.3.3");
    expect(r.reset).toBeGreaterThan(0);
    expect(r.reset).toBeLessThanOrEqual(60);
  });

  it("supports custom max and window", () => {
    const r = rateLimit("4.4.4.4", 3, 30_000);
    expect(r.remaining).toBe(2);
    rateLimit("4.4.4.4", 3, 30_000);
    rateLimit("4.4.4.4", 3, 30_000);
    const blocked = rateLimit("4.4.4.4", 3, 30_000);
    expect(blocked.success).toBe(false);
  });
});

describe("extractIp", () => {
  it("extracts x-forwarded-for", () => {
    const req = new Request("https://example.com", {
      headers: { "x-forwarded-for": "203.0.113.1, 10.0.0.1" }
    });
    expect(extractIp(req)).toBe("203.0.113.1");
  });

  it("returns fallback when no x-forwarded-for", () => {
    const req = new Request("https://example.com");
    const ip = extractIp(req);
    expect(ip).toMatch(/^anon-/);
  });
});
