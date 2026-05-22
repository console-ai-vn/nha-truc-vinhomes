"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { getUtmCampaign, trackEvent } from "@/src/lib/tracking";

type FormState = {
  status: "idle" | "loading" | "success" | "error";
  message: string;
};

export function LeadForm() {
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });
  const csrfRef = useRef<string | null>(null);

  useEffect(() => {
    fetch("/api/csrf")
      .then((res) => res.json())
      .then((data) => {
        csrfRef.current = data.token;
      })
      .catch(() => {
        csrfRef.current = null;
      });
  }, []);

  const submitLead = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      fullName: String(data.get("fullName") || ""),
      email: String(data.get("email") || ""),
      phoneZalo: String(data.get("phoneZalo") || ""),
      roleInterest: String(data.get("roleInterest") || ""),
      experienceLevel: String(data.get("experienceLevel") || ""),
      socialLink: String(data.get("socialLink") || ""),
      note: String(data.get("note") || ""),
      source: "landing",
      utmCampaign: getUtmCampaign()
    };

    setState({ status: "loading", message: "Đang gửi thông tin..." });

    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (csrfRef.current) {
      headers["X-CSRF-Token"] = csrfRef.current;
    }

    const response = await fetch("/api/leads", {
      method: "POST",
      headers,
      credentials: "same-origin",
      body: JSON.stringify(payload)
    });

    const body = (await response.json().catch(() => null)) as { message?: string } | null;

    if (response.status === 403) {
      setState({
        status: "error",
        message: body?.message || "Phiên đã hết hạn. Vui lòng tải lại trang."
      });
      return;
    }

    if (response.status === 429) {
      setState({
        status: "error",
        message: body?.message || "Quá nhiều yêu cầu. Vui lòng thử lại sau 1 phút."
      });
      return;
    }

    if (!response.ok) {
      setState({
        status: "error",
        message: body?.message || "Chưa gửi được. Vui lòng thử lại hoặc liên hệ Zalo."
      });
      return;
    }

    trackEvent("form_submit");
    form.reset();
    setState({
      status: "success",
      message: "Đã nhận thông tin. Đội ngũ sẽ liên hệ qua Zalo/email để trao đổi bước tiếp theo."
    });
  }, []);

  return (
    <form className="lead-form" onSubmit={submitLead}>
      <div className="field-row">
        <div className="form-field">
          <label htmlFor="fullName">Họ tên</label>
          <input id="fullName" name="fullName" autoComplete="name" required />
        </div>
        <div className="form-field">
          <label htmlFor="phoneZalo">Phone/Zalo</label>
          <input id="phoneZalo" name="phoneZalo" autoComplete="tel" required />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="form-field">
          <label htmlFor="roleInterest">Vị trí quan tâm</label>
          <select id="roleInterest" name="roleInterest" required defaultValue="">
            <option value="" disabled>Chọn vị trí</option>
            <option>Tư vấn chứng khoán</option>
            <option>Học việc / Thực tập sinh</option>
            <option>CTV / Đội ngũ liên kết</option>
            <option>Định hướng Leader</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="experienceLevel">Kinh nghiệm hiện tại</label>
          <select id="experienceLevel" name="experienceLevel" defaultValue="">
            <option value="">Chọn nếu phù hợp</option>
            <option>Chưa có kinh nghiệm</option>
            <option>Đã làm sales</option>
            <option>Đã làm tài chính/chứng khoán</option>
            <option>Đã có team/CTV</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="socialLink">Facebook/TikTok</label>
          <input id="socialLink" name="socialLink" placeholder="Link profile nếu có" />
        </div>
        <div className="form-field full">
          <label htmlFor="note">Ghi chú ngắn</label>
          <textarea id="note" name="note" placeholder="Mục tiêu, thời gian bắt đầu, câu hỏi..." />
        </div>
      </div>
      <button className="form-btn" type="submit" disabled={state.status === "loading"}>
        Gửi thông tin ứng tuyển <Send size={18} />
      </button>
      <p className={`form-msg${state.status === "error" ? " error" : ""}${state.status === "success" ? " success" : ""}`}>
        {state.message}
      </p>
    </form>
  );
}
