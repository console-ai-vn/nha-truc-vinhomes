import { NextRequest, NextResponse } from "next/server";
import { getGoogleSheetsEnv } from "@/src/lib/env";
import { appendLeadToSheet } from "@/src/lib/google-sheets";
import { validateCsrfToken } from "@/src/lib/csrf";
import { extractIp, rateLimit } from "@/src/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const ip = extractIp(request);
    const limit = rateLimit(ip);
    if (!limit.success) {
      return NextResponse.json(
        { message: "Quá nhiều yêu cầu. Vui lòng thử lại sau." },
        { status: 429, headers: { "Retry-After": String(limit.reset) } }
      );
    }

    const csrfCookie = request.cookies.get("csrf-token")?.value ?? null;
    const csrfHeader = request.headers.get("x-csrf-token");
    if (!validateCsrfToken(csrfHeader, csrfCookie)) {
      return NextResponse.json(
        { message: "Phiên đã hết hạn. Vui lòng tải lại trang." },
        { status: 403 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { fullName, email, phoneZalo, interest } = body;

    if (!fullName || !email || !phoneZalo) {
      return NextResponse.json(
        { message: "Vui lòng điền đầy đủ họ tên, email và số điện thoại." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(email))) {
      return NextResponse.json(
        { message: "Email không hợp lệ. Vui lòng kiểm tra lại." },
        { status: 400 }
      );
    }

    const env = getGoogleSheetsEnv();
    if (!env.configured) {
      return NextResponse.json(
        { message: "Form đang chờ kết nối. Vui lòng liên hệ Zalo nếu cần gấp." },
        { status: 503 }
      );
    }

    await appendLeadToSheet({
      fullName: String(fullName || ""),
      email: String(email || ""),
      phoneZalo: String(phoneZalo || ""),
      roleInterest: "Nhà đầu tư",
      experienceLevel: interest || "Tài liệu miễn phí",
      socialLink: "",
      source: "funnel",
      utmCampaign: "",
      note: ""
    });

    return NextResponse.json({
      ok: true,
      message: "Tài liệu đã được gửi! Kiểm tra email và Zalo của bạn.",
      resourceUrl: "https://zalo.me/g/pmlijy761"
    });
  } catch {
    return NextResponse.json(
      { message: "Lỗi kết nối. Vui lòng thử lại hoặc liên hệ Zalo." },
      { status: 502 }
    );
  }
}
