"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight, Award, BarChart3, BookOpenCheck,
  BriefcaseBusiness, Building2, ExternalLink,
  GraduationCap, MessageCircle, Network,
  ShieldCheck, Sparkles, Star, TrendingUp, Users
} from "lucide-react";
import Image from "next/image";
import { FooterLinks } from "@/src/components/landing/FooterLinks";
import { LeadForm } from "@/src/components/landing/LeadForm";
import { landingContent } from "@/src/content/landing";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BriefcaseBusiness, GraduationCap, Network, Award
};

export default function Home() {
  const { links, hero } = landingContent;
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const cb = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", cb, { passive: true });
    return () => window.removeEventListener("scroll", cb);
  }, []);

  return (
    <main>
      {/* Nav */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`} aria-label="Chính">
        <a className="brand" href="#top"><span className="brand-mark">TD</span><strong>Thùy Dương Invest</strong></a>
        <div className="nav-links">
          <a href="#authority">Uy tín</a>
          <a href="#why">Lợi ích</a>
          <a href="#opportunity">Vị trí</a>
          <a href="#faq">FAQ</a>
          <a href="#apply" className="nav-cta">Ứng tuyển</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero" id="top">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-eyebrow">Giám đốc Tư vấn Chứng khoán 09 — Hội sở SSI</p>
            <h1>{hero.headline}</h1>
            <p className="hero-lead">{hero.subheadline}</p>
            <div className="hero-badge">
              <Building2 size={22} />
              <div><strong>Trần Thị Thùy Dương</strong><span>Giám đốc Tư vấn Chứng khoán 09 — SSI Hội sở</span></div>
            </div>
            <div className="hero-cta">
              <a className="btn btn-primary" href="#apply">{hero.cta} <ArrowRight size={18} /></a>
              <a className="btn btn-outline" href={links.zaloRoom} target="_blank" rel="noreferrer">{hero.ctaSecondary} <MessageCircle size={18} /></a>
            </div>
          </div>
          <div className="hero-image-wrap">
            <div className="hero-image-frame">
              <Image src="/assets/selected/hero-portrait.png" alt={hero.portraitAlt} fill priority sizes="(max-width: 860px) 92vw, 440px" />
            </div>
            <div className="hero-accolade"><Star size={20} /><span>{hero.badge}</span></div>
          </div>
        </div>
      </section>

      {/* Stats + Authority */}
      <section className="stats-strip" aria-label="Chỉ số uy tín">
        {landingContent.stats.map((item) => (
          <div className="stat-item" key={item.label}><strong className="stat-value">{item.value}</strong><span className="stat-label">{item.label}</span></div>
        ))}
      </section>

      {/* Proof + Certifications — moved up, right after hero */}
      <section className="section proof-bg" id="authority">
        <div className="section-head">
          <p className="section-label">Uy tín & Chứng chỉ</p>
          <h2>Một trong những Giám đốc Tư vấn có thành tích hàng đầu SSI Hội sở</h2>
          <p className="section-lead">Chứng chỉ hành nghề chính thức — Thành tích được SSI ghi nhận — Đội ngũ liên tục đạt Top đầu toàn hệ thống.</p>
        </div>
        <div className="proof-grid">
          {landingContent.proofs.map((proof) => (
            <article className="proof-card" key={proof.title}>
              <div className="proof-image"><Image src={proof.image} alt={proof.alt} fill sizes="(max-width: 860px) 94vw, 31vw" /></div>
              <div className="proof-body"><h3>{proof.title}</h3><p>{proof.text}</p></div>
            </article>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="section-head">
          <p className="section-label">Hành trình</p>
          <h2>10 năm — từ Tư vấn viên đến Giám đốc SSI</h2>
        </div>
        <div style={{ maxWidth: "840px", margin: "0 auto" }}>
          {landingContent.achievements.map((a, i) => (
            <div key={a.year} style={{ display: "flex", gap: 24, padding: "0 0 32px" }}>
              <div style={{ flexShrink: 0, width: 64, textAlign: "right" }}>
                <strong style={{ fontSize: 18, fontWeight: 800, color: "var(--red)" }}>{a.year}</strong>
              </div>
              <div style={{ width: 2, flexShrink: 0, background: i < 4 ? "var(--red)" : "var(--border-light)", position: "relative" }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--red)", position: "absolute", top: 6, left: -5 }} />
              </div>
              <div style={{ paddingTop: 2 }}>
                <h3 style={{ fontSize: 18, margin: "0 0 4px", fontWeight: 700 }}>{a.title}</h3>
                <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>{a.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Investor Funnel CTA */}
      <section style={{ background: "linear-gradient(135deg, #1a1416 0%, #2d2024 100%)", padding: "28px var(--space-x)", textAlign: "center" }}>
        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
          <p style={{ color: "#fff", margin: 0, fontSize: 17, fontWeight: 500 }}>
            <TrendingUp size={20} style={{ marginRight: 8, verticalAlign: -4 }} />
            Bạn là <strong>nhà đầu tư</strong>? Nhận bộ tài liệu + tư vấn miễn phí
          </p>
          <a href="/funnel" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 24px", borderRadius: "var(--radius-md)", background: "var(--gold)", color: "#fff", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
            Khám phá ngay <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Benefits = "Tại sao nên tham gia" */}
      <section className="section" id="why">
        <div className="section-head">
          <p className="section-label">Lợi ích khi tham gia</p>
          <h2>Bạn nhận được gì khi gia nhập đội ngũ Thùy Dương?</h2>
        </div>
        <div className="opp-grid">
          {landingContent.benefits.map((b) => (
            <article className="opp-card" key={b.title}><h3>{b.title}</h3><p>{b.text}</p></article>
          ))}
        </div>
      </section>

      {/* Training */}
      <section className="section proof-bg">
        <div className="training-grid">
          <div className="training-image"><Image src="/assets/selected/training-team-ai-2025.jpg" alt="SSI AI Powered Training group" fill sizes="(max-width: 860px) 96vw, 50vw" /></div>
          <div>
            <p className="section-label">Lộ trình đào tạo</p>
            <h2>Không cần kinh nghiệm — Chúng tôi đào tạo từ số 0</h2>
            <ul className="training-list">
              {landingContent.training.map((item) => (
                <li key={item}>
                  <svg className="training-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Roles = "Vị trí nào phù hợp với bạn" */}
      <section className="section opp-bg" id="opportunity">
        <div className="section-head">
          <p className="section-label">Vị trí tuyển dụng</p>
          <h2>4 vị trí — Từ chưa có kinh nghiệm đến Leader</h2>
        </div>
        <div className="opp-grid">
          {landingContent.roles.map((role) => {
            const Icon = iconMap[role.icon.name ?? ""] ?? Award;
            return (<article className="opp-card" key={role.title}><Icon /><h3>{role.title}</h3><p>{role.text}</p></article>);
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="section proof-bg" id="faq">
        <div className="section-head">
          <p className="section-label">Giải đáp</p>
          <h2>Câu hỏi thường gặp</h2>
        </div>
        <div style={{ maxWidth: "780px", margin: "0 auto", display: "grid", gap: "12px" }}>
          {landingContent.faq.map((item) => (
            <details key={item.question} className="faq-item"><summary>{item.question}</summary><p>{item.answer}</p></details>
          ))}
        </div>
      </section>

      {/* Form = CTA cuối */}
      <section className="section" id="apply">
        <div className="form-grid">
          <div>
            <p className="section-label">Sẵn sàng thay đổi?</p>
            <h2>Điền thông tin — Nhận lộ trình trong 24h</h2>
            <p className="section-lead">Không cần kinh nghiệm. Không áp lực. Đội ngũ chị Thùy Dương sẽ gọi trao đổi trực tiếp.</p>
            <div className="form-trust">
              <p><ShieldCheck size={18} /> Thông tin chỉ dùng cho tuyển dụng</p>
              <p><Sparkles size={18} /> Không cam kết lợi nhuận đầu tư</p>
            </div>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* Links */}
      <section className="links-section">
        <div className="links-grid-inner">
          <div><p className="section-label">Kết nối</p><h2>Theo dõi Thùy Dương Invest</h2></div>
          <div className="links-cards">
            <a href={links.openAccount} target="_blank" rel="noreferrer"><BarChart3 size={20} /> Mở TK SSI <ExternalLink size={14} /></a>
            <a href={links.zaloRoom} target="_blank" rel="noreferrer"><MessageCircle size={20} /> Zalo room <ExternalLink size={14} /></a>
            <a href={links.tiktok} target="_blank" rel="noreferrer"><BookOpenCheck size={20} /> TikTok <ExternalLink size={14} /></a>
            <a href={links.facebook} target="_blank" rel="noreferrer"><Users size={20} /> Facebook <ExternalLink size={14} /></a>
          </div>
        </div>
      </section>

      <FooterLinks />

      <div className="sticky-cta" aria-hidden="true">
        <a className="btn btn-primary" href="#apply">Ứng tuyển ngay <ArrowRight size={18} /></a>
      </div>
    </main>
  );
}
