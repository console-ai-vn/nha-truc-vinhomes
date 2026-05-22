"use client";

import { useState } from "react";
import {
  ArrowRight, BarChart3, BookOpen, Download,
  MessageCircle, Phone, ShieldCheck, Sparkles, Users, TrendingUp
} from "lucide-react";

export default function FunnelPage() {
  const [form, setForm] = useState({ fullName: "", email: "", phoneZalo: "", interest: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("Đang gửi...");

    try {
      const r = await fetch("/api/funnel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await r.json();
      if (r.ok) {
        setStatus("success");
        setMessage(data.message || "Thành công! Kiểm tra email của bạn.");
      } else {
        setStatus("error");
        setMessage(data.message || "Có lỗi xảy ra.");
      }
    } catch {
      setStatus("error");
      setMessage("Không thể kết nối. Vui lòng thử lại.");
    }
  };

  return (
    <main style={{ background: "var(--warm-white)", overflow: "hidden" }}>
      {/* ── Hero ──────────────────────── */}
      <section style={{
        padding: "100px var(--space-x) 80px",
        background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(215,25,32,0.06), transparent 60%), var(--warm-white)",
        textAlign: "center"
      }}>
        <p style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          fontSize: 12, fontWeight: 800, textTransform: "uppercase",
          letterSpacing: "0.12em", color: "var(--red)", marginBottom: 16
        }}>
          <span style={{ width: 28, height: 1, background: "var(--red)" }} />
          Dành cho nhà đầu tư
        </p>
        <h1 style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900,
          lineHeight: 1.05, color: "var(--ink)", maxWidth: 700, margin: "0 auto"
        }}>
          Bắt đầu đầu tư chứng khoán <em style={{ fontWeight: 500 }}>bài bản và tự tin</em>
        </h1>
        <p style={{
          maxWidth: 560, margin: "20px auto 0",
          fontSize: 18, color: "var(--muted)", lineHeight: 1.6
        }}>
          Nhận bộ tài liệu miễn phí, tham gia cộng đồng nhà đầu tư và đặt lịch tư vấn riêng
          cùng đội ngũ chuyên viên SSI do Giám đốc Trần Thị Thùy Dương dẫn dắt.
        </p>
      </section>

      {/* ── 3 Columns ─────────────────── */}
      <section style={{ padding: "0 var(--space-x) 80px", maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 20
        }}>
          {/* Card 1: Tài liệu */}
          <div style={{
            background: "#fff", border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-lg)", padding: "36px 28px",
            display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: "var(--radius-md)",
              background: "var(--paper)", display: "grid", placeItems: "center", marginBottom: 20
            }}>
              <BookOpen size={28} color="var(--red)" />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 10px", fontFamily: "Manrope, sans-serif" }}>
              Bộ tài liệu đầu tư
            </h3>
            <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, margin: "0 0 16px" }}>
              Ebook &quot;7 sai lầm nhà đầu tư mới&quot; + Template Excel theo dõi danh mục + Video hướng dẫn mở tài khoản SSI
            </p>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <input
                type="text" placeholder="Họ tên" required
                value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })}
                style={inputStyle}
              />
              <input
                type="email" placeholder="Email" required
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
              />
              <input
                type="tel" placeholder="Số điện thoại/Zalo" required
                value={form.phoneZalo} onChange={e => setForm({ ...form, phoneZalo: e.target.value })}
                style={inputStyle}
              />
              <input type="hidden" value="Tài liệu miễn phí" />
              <button type="submit" disabled={status === "loading"} style={{
                width: "100%", minHeight: 48, border: "none", borderRadius: "var(--radius-md)",
                background: "var(--red)", color: "#fff", fontWeight: 700, fontSize: 15,
                cursor: "pointer", marginTop: 12, display: "flex", alignItems: "center",
                justifyContent: "center", gap: 8
              }}>
                {status === "loading" ? "Đang gửi..." : <>Tải tài liệu miễn phí <Download size={16} /></>}
              </button>
              {status !== "idle" && (
                <p style={{
                  marginTop: 10, fontSize: 13, textAlign: "center",
                  color: status === "success" ? "var(--success)" : status === "error" ? "var(--red-deep)" : "var(--muted)"
                }}>{message}</p>
              )}
            </form>
          </div>

          {/* Card 2: Zalo Group */}
          <div style={{
            background: "#fff", border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-lg)", padding: "36px 28px",
            display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: "var(--radius-md)",
              background: "var(--paper)", display: "grid", placeItems: "center", marginBottom: 20
            }}>
              <Users size={28} color="var(--red)" />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 10px", fontFamily: "Manrope, sans-serif" }}>
              Group Zalo VIP
            </h3>
            <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, margin: "0 0 16px" }}>
              Nhận tín hiệu thị trường, nhận định xu hướng và cơ hội đầu tư hàng ngày từ đội ngũ chuyên viên SSI.
            </p>
            <a
              href="https://zalo.me/g/pmlijy761" target="_blank" rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 24px", borderRadius: "var(--radius-md)",
                background: "#0068FF", color: "#fff", fontWeight: 700,
                fontSize: 15, textDecoration: "none", width: "100%",
                justifyContent: "center", boxSizing: "border-box"
              }}
            >
              <MessageCircle size={18} /> Tham gia group Zalo
            </a>
          </div>

          {/* Card 3: Tư vấn 1:1 */}
          <div style={{
            background: "#fff", border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-lg)", padding: "36px 28px",
            display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: "var(--radius-md)",
              background: "var(--paper)", display: "grid", placeItems: "center", marginBottom: 20
            }}>
              <Phone size={28} color="var(--red)" />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 10px", fontFamily: "Manrope, sans-serif" }}>
              Tư vấn 1:1 miễn phí
            </h3>
            <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, margin: "0 0 16px" }}>
              Gửi danh mục hiện tại — nhận đánh giá và tư vấn chiến lược đầu tư phù hợp trong 15 phút cùng chuyên viên.
            </p>
            <a
              href="https://zalo.me/0933153333" target="_blank" rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 24px", borderRadius: "var(--radius-md)",
                border: "1px solid var(--red)", color: "var(--red)",
                fontWeight: 700, fontSize: 15, textDecoration: "none",
                width: "100%", justifyContent: "center", boxSizing: "border-box"
              }}
            >
              <MessageCircle size={18} /> Nhắn Zalo đặt lịch
            </a>
          </div>
        </div>
      </section>

      {/* ── Trust badges ──────────────── */}
      <section style={{ padding: "0 var(--space-x) 80px", maxWidth: "var(--max-w)", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: 15, color: "var(--muted)" }}>
          <ShieldCheck size={16} style={{ marginRight: 6 }} />
          Thông tin của bạn được bảo mật tuyệt đối. Không spam, không chia sẻ cho bên thứ ba.
        </p>
      </section>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", minHeight: 44, border: "1px solid var(--border-light)",
  borderRadius: "var(--radius-md)", padding: "0 14px", fontSize: 15,
  marginBottom: 10, background: "var(--warm-white)", boxSizing: "border-box"
};
