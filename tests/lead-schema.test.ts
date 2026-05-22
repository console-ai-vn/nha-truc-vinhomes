import { describe, it, expect } from "vitest";
import { leadSchema } from "../src/lib/lead-schema";

describe("leadSchema", () => {
  const validLead = {
    fullName: "Trần Thị Thùy Dương",
    email: "duongttt@ssi.com.vn",
    phoneZalo: "0933153333",
    roleInterest: "Tư vấn chứng khoán"
  };

  it("accepts valid lead", () => {
    const r = leadSchema.safeParse(validLead);
    expect(r.success).toBe(true);
  });

  it("rejects empty fullName", () => {
    const r = leadSchema.safeParse({ ...validLead, fullName: "" });
    expect(r.success).toBe(false);
  });

  it("rejects short fullName (< 2 chars)", () => {
    const r = leadSchema.safeParse({ ...validLead, fullName: "A" });
    expect(r.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const r = leadSchema.safeParse({ ...validLead, email: "notanemail" });
    expect(r.success).toBe(false);
  });

  it("rejects short phone (< 8 chars)", () => {
    const r = leadSchema.safeParse({ ...validLead, phoneZalo: "123" });
    expect(r.success).toBe(false);
  });

  it("rejects empty roleInterest", () => {
    const r = leadSchema.safeParse({ ...validLead, roleInterest: "" });
    expect(r.success).toBe(false);
  });

  it("trims whitespace from all fields", () => {
    const r = leadSchema.safeParse({
      fullName: "  Nguyễn Văn An  ",
      email: "  an@test.com  ",
      phoneZalo: "  0988123456  ",
      roleInterest: "  Học việc  "
    });
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.fullName).toBe("Nguyễn Văn An");
      expect(r.data.email).toBe("an@test.com");
    }
  });

  it("accepts optional fields as undefined", () => {
    const r = leadSchema.safeParse(validLead);
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.experienceLevel).toBeUndefined();
      expect(r.data.socialLink).toBeUndefined();
      expect(r.data.source).toBeUndefined();
    }
  });

  it("accepts all optional fields set", () => {
    const r = leadSchema.safeParse({
      ...validLead,
      experienceLevel: "Đã làm sales",
      socialLink: "fb.com/user",
      note: "Gọi sau 17h",
      source: "landing",
      utmCampaign: "fb-ad-q1"
    });
    expect(r.success).toBe(true);
  });

  it("rejects missing required field", () => {
    const r = leadSchema.safeParse({ email: "a@b.com", phoneZalo: "12345678", roleInterest: "x" });
    expect(r.success).toBe(false);
  });

  it("error messages are in Vietnamese", () => {
    const r = leadSchema.safeParse({
      fullName: "",
      email: "bad",
      phoneZalo: "1",
      roleInterest: ""
    });
    expect(r.success).toBe(false);
    if (!r.success) {
      const msgs = r.error.issues.map((i) => i.message);
      expect(msgs.some((m) => m.includes("tên"))).toBe(true);
      expect(msgs.some((m) => m.includes("Email"))).toBe(true);
      expect(msgs.some((m) => m.includes("điện thoại") || m.includes("Zalo"))).toBe(true);
      expect(msgs.some((m) => m.includes("vị trí"))).toBe(true);
    }
  });
});
