import { landingContent } from "@/src/content/landing";

export function FooterLinks() {
  const { links } = landingContent;

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <strong>Thùy Dương Invest</strong>
        </div>
        <div className="footer-links">
          <a href={`tel:${links.phone}`}>0933 15 3333</a>
          <a href={`mailto:${links.email}`}>{links.email}</a>
          <a href={links.facebook} target="_blank" rel="noreferrer">Facebook</a>
          <a href={links.tiktok} target="_blank" rel="noreferrer">TikTok</a>
        </div>
      </div>
    </footer>
  );
}
