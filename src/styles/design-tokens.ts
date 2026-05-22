export const designTokens = {
  colors: {
    canvas: "#fff7f7",
    surface: "#ffffff",
    surfaceSoft: "#fff0f4",
    ink: "#171114",
    muted: "#6d5c62",
    line: "#ead8dc",
    ssiRed: "#d71920",
    ssiRedDark: "#8e0f17",
    blush: "#f6c4d5",
    charcoal: "#241a1d",
    gold: "#b9842d",
    success: "#176b3a"
  },
  radius: {
    sm: "6px",
    md: "8px",
    lg: "12px"
  },
  shadow: {
    media: "0 24px 80px rgba(74, 23, 34, 0.14)",
    card: "0 18px 50px rgba(84, 30, 44, 0.08)",
    cta: "0 14px 38px rgba(215, 25, 32, 0.28)"
  },
  typography: {
    fontSans: "Arial, Helvetica, sans-serif",
    hero: "clamp(42px, 7vw, 86px)",
    sectionTitle: "clamp(32px, 5vw, 56px)",
    body: "18px"
  },
  spacing: {
    pageX: "clamp(18px, 4vw, 64px)",
    sectionY: "clamp(64px, 9vw, 110px)",
    gridGap: "clamp(28px, 6vw, 78px)"
  }
} as const;
