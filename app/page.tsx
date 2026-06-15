"use client";

import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpenCheck,
  Building2,
  ExternalLink,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users
} from "lucide-react";
import Image from "next/image";
import { FooterLinks } from "@/src/components/landing/FooterLinks";
import { LeadForm } from "@/src/components/landing/LeadForm";
import { landingContent } from "@/src/content/landing";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Building2,
  BriefcaseBusiness: BarChart3,
  GraduationCap: BookOpenCheck,
  Award
};

export default function Home() {
  const { links, hero } = landingContent;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const cb = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", cb, { passive: true });
    return () => window.removeEventListener("scroll", cb);
  }, []);

  return (
    <main>
      <nav className={`nav${scrolled ? " scrolled" : ""}`} aria-label="Chính">
        <a className="brand" href="#top">
          <span className="brand-mark">NT</span>
          <span>Nhã Trúc Vinhomes</span>
        </a>
        <div className="nav-links">
          <a href="#authority">Thành tích</a>
          <a href="#opportunity">Tuyển dụng</a>
          <a href="#why">Đào tạo</a>
          <a href="#faq">FAQ</a>
          <a href="#apply" className="nav-cta">Kết nối</a>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" aria-expanded={menuOpen}>
          <span />
          <span />
          <span />
        </button>
        {menuOpen && (
          <div className="mobile-menu">
            <a href="#authority" onClick={() => setMenuOpen(false)}>Thành tích</a>
            <a href="#opportunity" onClick={() => setMenuOpen(false)}>Tuyển dụng</a>
            <a href="#why" onClick={() => setMenuOpen(false)}>Đào tạo</a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
            <a href="#apply" onClick={() => setMenuOpen(false)} className="nav-cta">Kết nối</a>
          </div>
        )}
      </nav>

      <section className="hero" id="top">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-eyebrow">Tuyển dụng CVKD/CTV Vinhomes</p>
            <h1>{hero.headline}</h1>
            <p className="hero-lead">{hero.subheadline}</p>
            <div className="hero-dossier" aria-label="Tóm tắt cơ hội tuyển dụng">
              <div>
                <span>Đang tuyển</span>
                <strong>CVKD / CTV Vinhomes</strong>
              </div>
              <div>
                <span>Thu nhập</span>
                <strong>Trao đổi rõ cơ cấu hoa hồng khi phỏng vấn</strong>
              </div>
            </div>
            <div className="hero-badge">
              <Building2 size={22} />
              <div>
                <strong>Huỳnh Thanh Nhã Trúc</strong>
                <span>Trưởng phòng Kinh doanh Vinhomes</span>
              </div>
            </div>
            <div className="hero-cta">
              <a className="btn btn-primary" href="#apply">{hero.cta} <ArrowRight size={18} /></a>
              <a className="btn btn-outline" href={links.zaloRoom} target="_blank" rel="noreferrer">{hero.ctaSecondary} <MessageCircle size={18} /></a>
            </div>
          </div>
          <div className="hero-image-wrap">
            <div className="hero-image-frame">
              <Image src="/assets/selected/nha-truc-hero-palace-2026.jpg" alt={hero.portraitAlt} fill priority sizes="(max-width: 860px) 92vw, 440px" />
            </div>
            <div className="hero-accolade"><Star size={20} /><span>{hero.badge}</span></div>
            <div className="hero-proof-note">
              <span>Thành tích ghi nhận</span>
              <strong>Top 3 Trưởng phòng Kinh doanh 2025</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-strip" aria-label="Chỉ số uy tín">
        {landingContent.stats.map((item) => (
          <div className="stat-item" key={item.label}>
            <strong className="stat-value">{item.value}</strong>
            <span className="stat-label">{item.label}</span>
          </div>
        ))}
      </section>

      <section className="section proof-bg" id="authority">
        <div className="section-head">
          <p className="section-label">Thành tích tại Vinhomes</p>
          <p className="section-lead">
            Trước khi vào đội, xem người dẫn mình đã làm gì.
          </p>
        </div>
        <div className="proof-grid">
          {landingContent.proofs.map((proof) => (
            <article className="proof-card" key={proof.title}>
              <div className="proof-image">
                <Image src={proof.image} alt={proof.alt} fill sizes="(max-width: 860px) 94vw, 31vw" />
              </div>
              <div className="proof-body">
                <h3>{proof.title}</h3>
                <p>{proof.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section timeline-section">
        <div className="section-head">
          <p className="section-label">Hành trình</p>
          <h2>Từ giao dịch thật đến đội ngũ Vinhomes phía Nam</h2>
        </div>
        <div className="timeline-list">
          {landingContent.achievements.map((a, i) => (
            <div className="timeline-item" key={`${a.year}-${a.title}`}>
              <div className="timeline-year">{a.year}</div>
              <div className={`timeline-line${i === landingContent.achievements.length - 1 ? " last" : ""}`}>
                <span />
              </div>
              <div className="timeline-content">
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="project-band">
        <div className="project-band-inner">
          <p>
            <TrendingUp size={20} />
            Theo sát các dự án: <strong>Vinhomes Grand Park</strong>, <strong>The Beverly</strong>, <strong>The Opus One</strong>, <strong>Green Paradise Cần Giờ</strong>, <strong>Long An</strong>, <strong>Saigon Park</strong>
          </p>
          <a href="#apply">Xem vị trí đang tuyển <ArrowRight size={16} /></a>
        </div>
      </section>

      <section className="section" id="why">
        <div className="section-head">
          <p className="section-label">Đào tạo và hệ thống</p>
          <h2>Vào đội - học sản phẩm, nắm quy trình, biết cách bám khách</h2>
        </div>
        <div className="opp-grid">
          {landingContent.benefits.map((b) => (
            <article className="opp-card" key={b.title}>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section team-bg">
        <div className="section-head">
          <p className="section-label">Môi trường làm việc thực tế</p>
          <h2>Nhìn vào phòng kinh doanh trước khi quyết định</h2>
          <p className="section-lead">Văn phòng, đào tạo, sự kiện dự án, team building - đây là môi trường bạn sẽ vào.</p>
        </div>
        <div className="team-gallery">
          {landingContent.teamGallery.map((item) => (
            <article className="team-photo" key={item.image}>
              <Image src={item.image} alt={item.alt} fill sizes="(max-width: 860px) 46vw, 25vw" />
              <span>{item.title}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section social-proof-section">
        <div className="section-head">
          <p className="section-label">Team & khách hàng</p>
          <h2>Người trong đội, khách hàng đã mua và giao dịch đã chốt</h2>
          <p className="section-lead">
            Đây là người trong đội, khách hàng đã mua và giao dịch đã chốt. Xem rồi quyết định.
          </p>
        </div>
        <div className="social-proof-grid">
          {landingContent.socialProofs.map((item) => (
            <article className="social-proof-card" key={item.title}>
              <div className="social-proof-photo">
                <Image src={item.image} alt={item.alt} fill sizes="(max-width: 860px) 94vw, 33vw" />
              </div>
              <div className="social-proof-copy">
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section team-testimonial-section">
        <div className="section-head">
          <p className="section-label">Ghi nhận từ đội</p>
          <h2>Không chỉ trưởng phòng có thành tích</h2>
        </div>
        <div className="team-testimonial-grid">
          {landingContent.teamTestimonials.map((item) => (
            <article className="team-testimonial-card" key={item.name}>
              <div className="team-testimonial-image" data-person={item.name}>
                <Image src={item.image} alt={item.alt} fill sizes="(max-width: 860px) 92vw, 25vw" />
              </div>
              <div className="team-testimonial-copy">
                <span>{item.meta}</span>
                <p>&ldquo;{item.quote}&rdquo;</p>
                <strong>{item.name}</strong>
                <small>{item.role}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section proof-bg">
        <div className="training-grid">
          <div className="training-image">
            <Image src="/assets/selected/nha-truc-training-green-city-work-2026.jpg" alt="Nhã Trúc tại khu trưng bày dự án Vinhomes phía Nam" fill sizes="(max-width: 860px) 96vw, 50vw" />
          </div>
          <div>
            <p className="section-label">Lộ trình đồng hành</p>
            <h2>Đi cùng từ sản phẩm, bảng giá, booking đến bàn giao</h2>
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

      <section className="section opp-bg" id="opportunity">
        <div className="section-head">
          <p className="section-label">Tuyển dụng trước</p>
          <h2>Bạn đang ở đâu trong hành trình này?</h2>
          <p className="section-lead">Ưu tiên người từng làm sales, tài chính, bảo hiểm, ngân hàng hoặc BĐS. Khách mua ở/đầu tư vẫn có thể để lại nhu cầu ở form bên dưới.</p>
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

      <section className="section proof-bg" id="faq">
        <div className="section-head">
          <p className="section-label">Giải đáp</p>
          <h2>Câu hỏi thường gặp</h2>
        </div>
        <div className="faq-list">
          {landingContent.faq.map((item) => (
            <details key={item.question} className="faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section" id="apply">
        <div className="form-grid">
          <div>
            <p className="section-label">Kết nối tuyển dụng Vinhomes</p>
            <h2>Để lại thông tin — Nhã Trúc liên hệ lại qua Zalo</h2>
            <p className="section-lead">
              Điền vào đây, ghi rõ bạn muốn ứng tuyển hay hỏi về dự án. Nếu phù hợp, sẽ hẹn trao đổi trực tiếp - không phải qua form mãi.
            </p>
            <div className="form-trust">
              <p><ShieldCheck size={18} /> Thông tin chỉ dùng để kết nối tuyển dụng hoặc tư vấn dự án</p>
              <p><Sparkles size={18} /> Hoa hồng và chính sách dự án trao đổi theo từng thời điểm</p>
            </div>
            <div className="apply-brief">
              <div className="apply-brief-head">
                <Award size={20} />
                <strong>Bạn có phù hợp không?</strong>
              </div>
              <ul>
                <li>Đã từng làm sales — ngành gì cũng được.</li>
                <li>Chịu học bảng giá, chịu đi thực địa, chịu gọi khách.</li>
                <li>Quen với việc theo khách dài ngày - không bỏ giữa chừng.</li>
                <li>Muốn có người dẫn thật, không phải tự mò.</li>
              </ul>
            </div>
          </div>
          <LeadForm />
        </div>
      </section>

      <section className="links-section">
        <div className="links-grid-inner">
          <div>
            <p className="section-label">Liên hệ trực tiếp</p>
            <h2>Trao đổi nhanh qua Zalo, điện thoại hoặc Facebook</h2>
          </div>
          <div className="links-cards">
            <a href={links.zaloRoom} target="_blank" rel="noreferrer"><MessageCircle size={20} /> Nhắn Zalo trực tiếp <ExternalLink size={14} /></a>
            <a href={`tel:${links.phone}`}><Phone size={20} /> Gọi 0947 939 224</a>
            <a href={`mailto:${links.email}`}><Mail size={20} /> Gửi email</a>
            <a href={links.facebook} target="_blank" rel="noreferrer"><Users size={20} /> Facebook Nhã Trúc <ExternalLink size={14} /></a>
          </div>
        </div>
      </section>

      <FooterLinks />

      <div className="sticky-cta" aria-hidden="true">
        <a className="btn btn-primary" href="#apply">Kết nối ngay <ArrowRight size={18} /></a>
      </div>
    </main>
  );
}
