export function getUtmCampaign() {
  if (typeof window === "undefined") {
    return "";
  }

  return new URLSearchParams(window.location.search).get("utm_campaign") || "";
}

export function trackEvent(name: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent("landing:event", { detail: { name } }));
}
