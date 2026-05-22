import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://thuy-duong-invest.vercel.app"),
  title: "Thuy Duong Invest | SSI Recruitment",
  description:
    "Gia nhap doi ngu tu van chung khoan SSI Hoi so cung Giam doc Tu van Chung khoan 09 Tran Thi Thuy Duong.",
  openGraph: {
    title: "Thuy Duong Invest | SSI Recruitment",
    description:
      "Landing tuyen dung cho doi ngu tu van chung khoan SSI Hoi so 2026.",
    images: ["/assets/selected/hero-portrait.png"]
  }
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
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;0,900;1,500&family=Manrope:wght@400;500;600;700;800&display=swap"
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
