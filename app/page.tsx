"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  ExternalLink,
  GraduationCap,
  MessageCircle,
  Network,
  ShieldCheck,
  Sparkles,
  Star,
  Users
} from "lucide-react";
import Image from "next/image";
import { FooterLinks } from "@/src/components/landing/FooterLinks";
import { LeadForm } from "@/src/components/landing/LeadForm";
import { landingContent } from "@/src/content/landing";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BriefcaseBusiness,
  GraduationCap,
  Network,
  Award
};

export default function Home() {
  const { links } = landingContent;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main>
      {/* ── Navigation ────────────────────────── */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`} aria-label="Primary">
        <a className="brand" href="#top">
          <span className="brand-mark">TD</span>
          <strong>Thuy Duong Invest</strong>
        </a>
        <div className="nav-links">
          <a href="#proof">Uy tin</a>
          <a href="#opportunity">Co hoi</a>
          <a href="#apply" className="nav-cta">Ung tuyen</a>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────── */}
      <section className="hero" id="top">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-eyebrow">SSI Recruitment 2026</p>
            <h1>
              Gia nhap <em>doi ngu</em> tu van chung khoan SSI Hoi so
            </h1>
            <p className="hero-lead">
              Cung Giam doc Tran Thi Thuy Duong xay dung su nghiep tai chinh,
              phat trien khach hang va mo rong thu nhap trong nganh chung khoan.
            </p>
            <div className="hero-badge">
              <Building2 size={22} />
              <div>
                <strong>Tran Thi Thuy Duong</strong>
                <span>Giam doc Tu van Chung khoan 09 — SSI Hoi so</span>
              </div>
            </div>
            <div className="hero-cta">
              <a className="btn btn-primary" href="#apply">
                Nhan lo trinh ung tuyen <ArrowRight size={18} />
              </a>
              <a
                className="btn btn-outline"
                href={links.zaloRoom}
                target="_blank"
                rel="noreferrer"
              >
                Lien he Zalo <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <div className="hero-image-wrap">
            <div className="hero-image-frame">
              <Image
                src="/assets/selected/hero-portrait.png"
                alt="Tran Thi Thuy Duong portrait"
                fill
                priority
                sizes="(max-width: 860px) 92vw, 440px"
              />
            </div>
            <div className="hero-accolade">
              <Star size={20} />
              <span>KOL xuat sac SSI Retail Awards 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ────────────────────────── */}
      <section className="stats-strip" aria-label="Authority proof">
        {landingContent.stats.map((item) => (
          <div className="stat-item" key={item.label}>
            <strong className="stat-value">{item.value}</strong>
            <span className="stat-label">{item.label}</span>
          </div>
        ))}
      </section>

      {/* ── Proof Section ──────────────────────── */}
      <section className="section proof-bg" id="proof">
        <div className="section-head">
          <p className="section-label">Uy tin ca nhan</p>
          <h2>Duoc ghi nhan boi hieu qua, doi ngu va thuong hieu ca nhan</h2>
          <p className="section-lead">
            Nhung tai san nay dung de tao niem tin ban dau. Thong tin chinh sach va vi tri
            se duoc xac nhan truc tiep trong qua trinh trao doi.
          </p>
        </div>
        <div className="proof-grid">
          {landingContent.proofs.map((proof) => (
            <article className="proof-card" key={proof.title}>
              <div className="proof-image">
                <Image
                  src={proof.image}
                  alt={proof.alt}
                  fill
                  sizes="(max-width: 860px) 94vw, 31vw"
                />
              </div>
              <div className="proof-body">
                <h3>{proof.title}</h3>
                <p>{proof.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Opportunity ────────────────────────── */}
      <section className="section opp-bg" id="opportunity">
        <div className="section-head">
          <p className="section-label">Co hoi 2026</p>
          <h2>Danh cho nguoi muon di nhanh trong nganh chung khoan</h2>
        </div>
        <div className="opp-grid">
          {landingContent.roles.map((role) => {
            const Icon = iconMap[role.icon.name ?? ""] ?? Award;
            return (
              <article className="opp-card" key={role.title}>
                <Icon />
                <h3>{role.title}</h3>
                <p>{role.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Training ───────────────────────────── */}
      <section className="section">
        <div className="training-grid">
          <div className="training-image">
            <Image
              src="/assets/selected/training-team-ai-2025.jpg"
              alt="SSI AI Powered Training group"
              fill
              sizes="(max-width: 860px) 96vw, 50vw"
            />
          </div>
          <div>
            <p className="section-label">Dao tao va scale team</p>
            <h2>Khong chi tuyen nguoi. He thong dao tao nguoi moi.</h2>
            <ul className="training-list">
              {landingContent.training.map((item) => (
                <li key={item}>
                  <svg className="training-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Form Section ───────────────────────── */}
      <section className="section proof-bg" id="apply">
        <div className="form-grid">
          <div>
            <p className="section-label">Ung tuyen</p>
            <h2>Nhan lo trinh bat dau nghe tu van chung khoan tai SSI</h2>
            <p className="section-lead">
              Dien thong tin ngan gon. Doi ngu chi Thuy Duong se lien he qua
              Zalo/email de trao doi buoc tiep theo.
            </p>
            <div className="form-trust">
              <p>
                <ShieldCheck size={18} /> Thong tin chi dung cho tuyen dung
              </p>
              <p>
                <Sparkles size={18} /> Khong cam ket loi nhuan dau tu
              </p>
            </div>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* ── Links Section ──────────────────────── */}
      <section className="links-section">
        <div className="links-grid-inner">
          <div>
            <p className="section-label">Bio links</p>
            <h2>Ket noi voi Thuy Duong Invest</h2>
          </div>
          <div className="links-cards">
            <a href={links.openAccount} target="_blank" rel="noreferrer">
              <BarChart3 size={20} /> Mo TK SSI <ExternalLink size={14} />
            </a>
            <a href={links.zaloRoom} target="_blank" rel="noreferrer">
              <MessageCircle size={20} /> Zalo room <ExternalLink size={14} />
            </a>
            <a href={links.tiktok} target="_blank" rel="noreferrer">
              <BookOpenCheck size={20} /> TikTok live <ExternalLink size={14} />
            </a>
            <a href={links.facebook} target="_blank" rel="noreferrer">
              <Users size={20} /> Facebook <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      <FooterLinks />
    </main>
  );
}
