import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { TrackingPixels } from "@/src/components/TrackingPixels";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL("https://thuy-duong-ssi.vercel.app"),
  title: {
    default: "Thùy Dương Invest | Tuyển dụng Tư vấn Chứng khoán SSI 2026",
    template: "%s | Thùy Dương Invest"
  },
  description:
    "Gia nhập đội ngũ chuyên gia hàng đầu Hội sở SSI. Giám Đốc Tư vấn đầu tư SSI Trần Thị Thùy Dương tuyển dụng Tư vấn viên, Thực tập sinh, CTV, Leader. Đào tạo từ số 0, thu nhập không giới hạn.",
  keywords: ["tuyển dụng SSI", "tư vấn chứng khoán", "việc làm chứng khoán", "SSI tuyển dụng", "Thùy Dương Invest", "môi giới chứng khoán"],
  authors: [{ name: "Thùy Dương Invest" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Gia nhập đội ngũ chuyên gia hàng đầu Hội sở SSI | Thùy Dương Invest",
    description:
      "Tuyển dụng Tư vấn Chứng khoán 2026. Đào tạo từ số 0, thu nhập không giới hạn. Cùng Giám đốc Trần Thị Thùy Dương xây dựng sự nghiệp tài chính.",
    images: ["/assets/brand/og-image.svg"],
    type: "website",
    siteName: "Thùy Dương Invest",
    locale: "vi_VN"
  },
  twitter: {
    card: "summary_large_image",
    title: "Gia nhập đội ngũ chuyên gia hàng đầu Hội sở SSI",
    description: "Tuyển dụng Tư vấn Chứng khoán 2026 — Thùy Dương Invest",
    images: ["/assets/brand/og-image.svg"]
  },
  icons: {
    icon: "/assets/brand/icon.svg",
    shortcut: "/assets/brand/icon.svg",
    apple: "/assets/brand/icon.svg"
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
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;1,14..32,400;1,14..32,500&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Thùy Dương Invest",
              url: "https://thuy-duong-ssi.vercel.app",
              logo: "https://thuy-duong-ssi.vercel.app/assets/brand/icon.svg",
              founder: {
                "@type": "Person",
                name: "Trần Thị Thùy Dương",
                jobTitle: "Giám Đốc Tư vấn đầu tư SSI",
                worksFor: { "@type": "Organization", name: "SSI Securities Corporation" }
              }
            })
          }}
          type="application/ld+json"
        />
      </head>
      <body>
        {children}
        <Analytics />
        <TrackingPixels />
      </body>
    </html>
  );
}
