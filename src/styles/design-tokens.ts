export const designTokens = {
  colors: {
    canvas: "#ffffff",
    surface: "#ffffff",
    surfaceSoft: "#f0f4f8",
    pearl: "#f8f6f0",
    ink: "#152c4a",
    muted: "#7b8a9e",
    line: "#e2e8f0",
    vinhomesNavy: "#1e3a5f",
    vinhomesNavyDark: "#0f2035",
    vinhomesBlue: "#2b5089",
    gold: "#c9a24c",
    goldLight: "#dbba6a",
    success: "#176b3a"
  },
  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px"
  },
  shadow: {
    media: "0 30px 90px rgba(15, 32, 53, 0.16)",
    card: "0 14px 42px rgba(15, 32, 53, 0.08)",
    cta: "0 16px 40px rgba(30, 58, 95, 0.24)"
  },
  typography: {
    fontSans: "Be Vietnam Pro, system-ui, sans-serif",
    fontDisplay: "Playfair Display, Georgia, serif",
    hero: "clamp(42px, 5vw, 74px)",
    sectionTitle: "clamp(34px, 4.8vw, 56px)",
    body: "18px"
  },
  spacing: {
    pageX: "clamp(20px, 5vw, 80px)",
    sectionY: "clamp(76px, 12vh, 128px)",
    gridGap: "clamp(40px, 8vw, 90px)"
  }
} as const;
