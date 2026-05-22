# Thuy Duong SSI Recruitment Landing

Landing/bio tuyen dung cho Thuy Duong Invest — SSI Recruitment 2026.

---

## Status

![Status](https://img.shields.io/badge/status-in--development-yellow)
![Version](https://img.shields.io/badge/version-0.1.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15+-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript)
![React](https://img.shields.io/badge/React-19+-61dafb?logo=react)
![Deploy](https://img.shields.io/badge/deploy-Vercel-black?logo=vercel)

**Live:** [thuy-duong-invest.vercel.app](https://thuy-duong-invest.vercel.app)

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15+ (App Router) |
| Language | TypeScript (strict mode) |
| UI | React 19+, Lucide React icons |
| Validation | Zod (server-side) |
| Styling | Plain CSS with custom properties (938 lines) |
| Fonts | Playfair Display + Manrope (Google Fonts) |
| Backend | Lark Bitable API (lead storage) |
| Analytics | Vercel Analytics + custom events |
| Hosting | Vercel |

---

## Features

| Feature | Status |
|---------|--------|
| Single-page landing with 9 sections | ✅ Live |
| Scroll-aware navigation with blur backdrop | ✅ Live |
| Lead capture form (7 fields, 4 states) | ✅ Live |
| Lark Bitable integration (lead storage) | ✅ Live |
| UTM campaign tracking | ✅ Live |
| Responsive design (3 breakpoints) | ✅ Live |
| Vietnamese-first UI with graceful degradation | ✅ Live |
| Content/UI separation (all copy in landing.ts) | ✅ Live |
| Bio-link hub (Zalo, TikTok, Facebook, SSI) | ✅ Live |

---

## Run Local

```powershell
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:3000
```

---

## Env

Copy `.env.example` to `.env.local` and fill:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_SHEET_ID=
```

When Google Sheets env is missing, `/api/leads` returns `503` with a safe public message.

---

## Verify

```powershell
npm run lint          # tsc --noEmit (type-check)
npm run build         # Full production build
```

---

## Project Structure

```
app/
├── page.tsx           # Single-page landing (247 lines)
├── layout.tsx         # Root layout: metadata, fonts, analytics
├── globals.css        # Complete design system (938 lines)
└── api/leads/route.ts # POST endpoint: Zod → Lark

src/
├── components/landing/
│   ├── LeadForm.tsx      # Client form: 7 fields, 4 states
│   └── FooterLinks.tsx   # Footer with disclaimer + links
├── content/
│   └── landing.ts        # All copy in one file (single source of truth)
├── lib/
│   ├── env.ts            # Lark env validator
│   ├── lark.ts           # Lark API: token + Bitable record
│   ├── lead-schema.ts    # Zod validation schema
│   └── tracking.ts       # UTM reader + custom events
└── styles/
    └── design-tokens.ts  # Design token export
```

---

## Data Flow

```
Form submit → POST /api/leads → Zod validate
  → Lark tenant token → Create Bitable record → 200 OK
  → trackEvent("form_submit") → form.reset()
```

Graceful fallbacks:
- Missing Lark env → **503** "Form dang cho ket noi Lark..."
- Validation error → **400** with Vietnamese field-level messages
- Lark API error → **502** "Chua gui duoc thong tin..."

---

## Key Links

- Zalo room: `https://zalo.me/g/pmlijy761`
- TikTok: `https://www.tiktok.com/@tranthuyduong1987`
- Facebook: `https://www.facebook.com/thuy.duong.40234`
- SSI open account: `https://iboard.ssi.com.vn/open-account/?moigioi=2122`

---

## Documentation

| Document | Description |
|----------|-------------|
| [Project Overview & PDR](docs/project-overview-pdr.md) | Business goals, features, personas, timeline |
| [Codebase Summary](docs/codebase-summary.md) | File tree, LOC, module responsibilities, data flow |
| [Code Standards](docs/code-standards.md) | Naming, patterns, styling, what's followed vs missing |
| [System Architecture](docs/system-architecture.md) | Architecture diagram, component tree, deployment |
| [Plan](docs/superpowers/plans/) | Phase-by-phase project plan (5 phases, 5.5 days) |
