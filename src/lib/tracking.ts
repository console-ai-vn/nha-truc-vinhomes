export function getUtmCampaign() {
  if (typeof window === "undefined") {
    return "";
  }

  return new URLSearchParams(window.location.search).get("utm_campaign") || "";
}

export function trackEvent(name: string, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("landing:event", { detail: { name, ...data } }));

  // Facebook Pixel
  if (typeof (window as any).fbq === "function") {
    (window as any).fbq("trackCustom", name, data);
  }

  // TikTok Pixel
  if (typeof (window as any).ttq === "object") {
    (window as any).ttq.track(name, data);
  }
}

  window.dispatchEvent(new CustomEvent("landing:event", { detail: { name } }));
}
