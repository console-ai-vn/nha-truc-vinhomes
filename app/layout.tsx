import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://thuy-duong-invest.vercel.app"),
  title: "Thuy Duong Invest | SSI Recruitment",
  description:
    "Gia nhập đội ngũ tư vấn chứng khoán SSI Hội sở cùng Giám đốc Tư vấn Chứng khoán 09 Trần Thị Thùy Dương.",
  openGraph: {
    title: "Thùy Dương Invest | SSI Recruitment",
    description:
      "Landing tuyển dụng cho đội ngũ tư vấn chứng khoán SSI Hội sở 2026.",
    images: ["/assets/selected/hero-portrait.png"]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;1,14..32,400;1,14..32,500&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
