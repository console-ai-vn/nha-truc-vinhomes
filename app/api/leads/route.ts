import { NextResponse } from "next/server";
import { getLarkEnv } from "@/src/lib/env";
import { createLeadRecord } from "@/src/lib/lark";
import { leadSchema } from "@/src/lib/lead-schema";

export async function POST(request: Request) {
  const parsed = leadSchema.safeParse(await request.json().catch(() => ({})));

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Thong tin chua hop le. Kiem tra ho ten, email, phone/Zalo va vi tri quan tam." },
      { status: 400 }
    );
  }

  const env = getLarkEnv();

  if (!env.configured) {
    return NextResponse.json(
      { message: "Form dang cho ket noi Lark. Vui long lien he Zalo neu can gap." },
      { status: 503 }
    );
  }

  try {
    await createLeadRecord(parsed.data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { message: "Chua gui duoc thong tin. Vui long thu lai hoac lien he Zalo." },
      { status: 502 }
    );
  }
}
