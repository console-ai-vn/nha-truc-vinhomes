import { NextResponse } from "next/server";
import { CSRFTokenTTL, generateCsrfToken } from "@/src/lib/csrf";

export async function GET() {
  const token = generateCsrfToken();

  const response = NextResponse.json({ token });
  response.cookies.set("__Host-csrf", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api",
    maxAge: CSRFTokenTTL
  });

  return response;
}
