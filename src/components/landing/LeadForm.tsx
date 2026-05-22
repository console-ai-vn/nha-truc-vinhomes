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

    setState({ status: "loading", message: "Dang gui thong tin..." });

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
        message: body?.message || "Phien da het han. Vui long tai lai trang."
      });
      return;
    }

    if (response.status === 429) {
      setState({
        status: "error",
        message: body?.message || "Qua nhieu yeu cau. Vui long thu lai sau 1 phut."
      });
      return;
    }

    if (!response.ok) {
      setState({
        status: "error",
        message: body?.message || "Chua gui duoc. Vui long thu lai hoac lien he Zalo."
      });
      return;
    }

    trackEvent("form_submit");
    form.reset();
    setState({
      status: "success",
      message: "Da nhan thong tin. Doi ngu se lien he qua Zalo/email de trao doi buoc tiep theo."
    });
  }, []);

  return (
    <form className="lead-form" onSubmit={submitLead}>
      <div className="field-row">
        <div className="form-field">
          <label htmlFor="fullName">Ho ten</label>
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
          <label htmlFor="roleInterest">Vi tri quan tam</label>
          <select id="roleInterest" name="roleInterest" required defaultValue="">
            <option value="" disabled>Chon vi tri</option>
            <option>Tu van chung khoan</option>
            <option>Hoc viec / thuc tap sinh</option>
            <option>CTV / doi ngu lien ket</option>
            <option>Dinh huong leader</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="experienceLevel">Kinh nghiem hien tai</label>
          <select id="experienceLevel" name="experienceLevel" defaultValue="">
            <option value="">Chon neu phu hop</option>
            <option>Chua co kinh nghiem</option>
            <option>Da lam sales</option>
            <option>Da lam tai chinh/chung khoan</option>
            <option>Da co team/CTV</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="socialLink">Facebook/TikTok</label>
          <input id="socialLink" name="socialLink" placeholder="Link profile neu co" />
        </div>
        <div className="form-field full">
          <label htmlFor="note">Ghi chu ngan</label>
          <textarea id="note" name="note" placeholder="Muc tieu, thoi gian bat dau, cau hoi..." />
        </div>
      </div>
      <button className="form-btn" type="submit" disabled={state.status === "loading"}>
        Gui thong tin ung tuyen <Send size={18} />
      </button>
      <p className={`form-msg${state.status === "error" ? " error" : ""}${state.status === "success" ? " success" : ""}`}>
        {state.message}
      </p>
    </form>
  );
}
