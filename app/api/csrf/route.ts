import { NextResponse } from "next/server";
import { CSRFTokenTTL, generateCsrfToken } from "@/src/lib/csrf";

export async function GET() {
  const token = generateCsrfToken();

  const response = NextResponse.json({ token });
  response.cookies.set("csrf-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: CSRFTokenTTL
  });

  return response;
}
