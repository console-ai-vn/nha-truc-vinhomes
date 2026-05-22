import { NextRequest, NextResponse } from "next/server";
import { getGoogleSheetsEnv } from "@/src/lib/env";
import { appendLeadToSheet } from "@/src/lib/google-sheets";
import { leadSchema } from "@/src/lib/lead-schema";
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

    const csrfCookie = request.cookies.get("__Host-csrf")?.value ?? null;
    const csrfHeader = request.headers.get("x-csrf-token");
    if (!validateCsrfToken(csrfHeader, csrfCookie)) {
      return NextResponse.json(
        { message: "Phiên đã hết hạn. Vui lòng tải lại trang." },
        { status: 403 }
      );
    }

    let body: unknown = {};
    try {
      body = await request.json();
    } catch {
      // leave as {}
    }

    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Vui lòng kiểm tra lại thông tin gửi lên." },
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

    await appendLeadToSheet(parsed.data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { message: "Lỗi kết nối đến máy chủ. Vui lòng thử lại." },
      { status: 502 }
    );
  }
}
