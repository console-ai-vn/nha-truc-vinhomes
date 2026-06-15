import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { TrackingPixels } from "@/src/components/TrackingPixels";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nha-truc-vinhomes.vercel.app"),
  title: {
    default: "Nhã Trúc Vinhomes | Tuyển nhân viên kinh doanh PKD Miền Nam",
    template: "%s | Nhã Trúc Vinhomes"
  },
  description:
    "Huỳnh Thanh Nhã Trúc - Trưởng phòng Kinh doanh Vinhomes PKD Miền Nam. Tuyển nhân viên kinh doanh, CVKD/CTV, ưu tiên người từng làm sales và muốn bám sản phẩm Vinhomes phía Nam.",
  keywords: [
    "Nhã Trúc Vinhomes",
    "tuyển dụng sales bất động sản TPHCM",
    "tuyển CVKD Vinhomes",
    "CTV Vinhomes",
    "PKD Miền Nam",
    "lương sales Vinhomes",
    "làm CTV Vinhomes có tốt không"
  ],
  authors: [{ name: "Huỳnh Thanh Nhã Trúc" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Tuyển nhân viên kinh doanh Vinhomes cùng Nhã Trúc",
    description:
      "Vào đội PKD Miền Nam cùng Nhã Trúc: có thành tích trưởng phòng, giao dịch thực tế, đào tạo sản phẩm và lộ trình bám khách rõ ràng.",
    images: ["/assets/selected/nha-truc-hero-palace-2026.jpg"],
    type: "website",
    siteName: "Nhã Trúc Vinhomes",
    locale: "vi_VN"
  },
  twitter: {
    card: "summary_large_image",
    title: "Nhã Trúc Vinhomes | Tuyển nhân viên kinh doanh",
    description: "Tuyển sales bất động sản Vinhomes tại TP.HCM và khu vực phía Nam",
    images: ["/assets/selected/nha-truc-hero-palace-2026.jpg"]
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
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Be+Vietnam+Pro:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Huỳnh Thanh Nhã Trúc",
              jobTitle: "Trưởng phòng Kinh doanh Vinhomes",
              worksFor: { "@type": "Organization", name: "Vinhomes PKD Miền Nam" },
              url: "https://nha-truc-vinhomes.vercel.app"
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
