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
      source: "nha-truc-vinhomes-landing",
      utmCampaign: getUtmCampaign()
    };

    setState({ status: "loading", message: "Đang gửi thông tin cho đội Nhã Trúc..." });

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
      message: "Đã nhận thông tin. Nhã Trúc sẽ phản hồi qua Zalo/điện thoại nếu phù hợp lịch trao đổi."
    });
  }, []);

  return (
    <form className="lead-form" onSubmit={submitLead}>
      <div className="form-tabs" aria-label="Nhóm nhu cầu">
        <button type="button" className="active">Ứng tuyển</button>
        <button type="button">Mua ở / đầu tư</button>
      </div>
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
          <label htmlFor="roleInterest">Nhu cầu quan tâm</label>
          <select id="roleInterest" name="roleInterest" required defaultValue="">
            <option value="" disabled>Chọn mục tiêu của bạn</option>
            <option>Ứng tuyển CVKD Vinhomes</option>
            <option>Hợp tác CTV Vinhomes</option>
            <option>Đã có kinh nghiệm sales/BĐS - muốn vào đội</option>
            <option>Muốn mua ở / đầu tư Vinhomes</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="experienceLevel">Kinh nghiệm hiện tại</label>
          <select id="experienceLevel" name="experienceLevel" defaultValue="">
            <option value="">Chọn gần đúng nhất</option>
            <option>Chưa có kinh nghiệm BĐS</option>
            <option>Đã làm sales</option>
            <option>Đã làm bất động sản</option>
            <option>Đã có team/CTV</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="socialLink">Facebook/Zalo/TikTok</label>
          <input id="socialLink" name="socialLink" placeholder="Link profile nếu có" />
        </div>
        <div className="form-field full">
          <label htmlFor="note">Ghi chú ngắn</label>
          <textarea id="note" name="note" placeholder="Bạn muốn ứng tuyển hay hợp tác? Đã từng làm sales gì, khi nào bắt đầu được, khu vực quan tâm..." />
        </div>
      </div>
      <button className="form-btn" type="submit" disabled={state.status === "loading"}>
        Gửi thông tin cho Nhã Trúc <Send size={18} />
      </button>
      <p className={`form-msg${state.status === "error" ? " error" : ""}${state.status === "success" ? " success" : ""}`}>
        {state.message}
      </p>
    </form>
  );
}
