import { landingContent } from "@/src/content/landing";

export function FooterLinks() {
  const { links } = landingContent;

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <strong>Nhã Trúc Vinhomes</strong>
          <p>Thông tin dự án, chính sách bán hàng và giỏ hàng có thể thay đổi theo từng thời điểm.</p>
        </div>
        <div className="footer-links">
          <a href={links.zaloRoom} target="_blank" rel="noreferrer">Zalo trực tiếp</a>
          <a href={`tel:${links.phone}`}>Gọi 0947 939 224</a>
          <a href={`mailto:${links.email}`}>{links.email}</a>
          <a href={links.facebook} target="_blank" rel="noreferrer">Facebook Nhã Trúc</a>
        </div>
      </div>
    </footer>
  );
}
