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
        { message: "Qua nhieu yeu cau. Vui long thu lai sau." },
        { status: 429, headers: { "Retry-After": String(limit.reset) } }
      );
    }

    const csrfCookie = request.cookies.get("__Host-csrf")?.value ?? null;
    const csrfHeader = request.headers.get("x-csrf-token");
    if (!validateCsrfToken(csrfHeader, csrfCookie)) {
      return NextResponse.json(
        { message: "Phien da het han. Vui long tai lai trang." },
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
        { message: "Vui long kiem tra lai thong tin gui len." },
        { status: 400 }
      );
    }

    const env = getGoogleSheetsEnv();
    if (!env.configured) {
      return NextResponse.json(
        { message: "Form dang cho ket noi. Vui long lien he Zalo neu can gap." },
        { status: 503 }
      );
    }

    await appendLeadToSheet(parsed.data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { message: "Loi ket noi den may chu. Vui long thu lai." },
      { status: 502 }
    );
  }
}
