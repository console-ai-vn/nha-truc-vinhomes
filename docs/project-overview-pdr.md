# Project Overview & PDR — Thuy Duong SSI Landing

> **Last updated:** 2026-05-22 &nbsp;|&nbsp; **Version:** 0.1.0 &nbsp;|&nbsp; **Status:** In Development

---

## 1. Executive Summary

**Project name:** Thuy Duong SSI Recruitment Landing

**Repository:** [github.com/console-ai-vn/thuy-duong-ssi-landing](https://github.com/console-ai-vn/thuy-duong-ssi-landing)

**Purpose:** A single-page recruitment landing page to capture leads for SSI securities advisory roles under Tran Thi Thuy Duong — Giam doc Tu van Chung khoan 09 at SSI Hoi so.

**Target audience:** Vietnamese professionals interested in securities advisory careers — new investors, salary earners seeking career change, experienced sales/finance people, and potential team-builders.

**Live URL:** `https://thuy-duong-invest.vercel.app`

---

## 2. Business Goals

| Goal | Metric | Status |
|------|--------|--------|
| Lead capture for SSI recruitment | Form submissions → Lark Base | Live |
| Brand authority display | Proof section (3 awards, 5 stats) | Live |
| Bio-link hub for social channels | Links section (Zalo, TikTok, Facebook, SSI open account) | Live |
| Training value proposition | Training section (5 checklist items) | Live |

---

## 3. Key Personas

From audience research:

| Persona | Description | Target Role |
|---------|-------------|-------------|
| **New investor** | Wants to understand securities, needs structured path | Hoc viec / thuc tap sinh |
| **Salary earner** | Looking for career switch, attracted to income potential | Tu van chung khoan |
| **Referral/social** | Came via TikTok/Zalo/Facebook, already trusts personal brand | CTV / xay team rieng |
| **Experienced recruit** | Has sales/finance background, wants leadership track | Dinh huong leader |

---

## 4. Feature List

### Completed

| Feature | File(s) | Description |
|---------|---------|-------------|
| Hero section | `app/page.tsx` L58-107 | Portrait, CTA buttons, SSI badge, stats strip |
| Navigation (scroll-aware) | `app/page.tsx` L45-55 | Fixed nav, blur backdrop on scroll, anchor links |
| Stats strip | `app/page.tsx` L110-117 | 5-column authority stats |
| Proof section | `app/page.tsx` L120-147 | 3 proof cards with images (KOL 2025, Retail 2024, Branch award) |
| Opportunity section | `app/page.tsx` L150-167 | 4 role cards with dynamic Lucide icons |
| Training section | `app/page.tsx` L170-195 | 2-column: image + 5 checklist items |
| Lead capture form | `src/components/landing/LeadForm.tsx` | 7 fields, 4 states, UTM tracking, custom events |
| Bio links section | `app/page.tsx` L221-241 | 4 links (SSI open account, Zalo, TikTok, Facebook) |
| Footer with disclaimer | `src/components/landing/FooterLinks.tsx` | Brand disclaimer + contact links |
| API: lead submission | `app/api/leads/route.ts` | Zod validation → Lark Base record creation |
| Lark integration | `src/lib/lark.ts` | Tenant token + Bitable record creation |
| Content/UI separation | `src/content/landing.ts` | Single source of truth for all copy |
| Vercel Analytics | `app/layout.tsx` L35 | Injected via `@vercel/analytics/next` |
| Responsive design | `app/globals.css` L852-938 | Breakpoints at 1024px, 860px, 560px |
| SEO metadata | `app/layout.tsx` L5-16 | OG tags, title, description |
| Design tokens | `design-tokens.json` + `src/styles/design-tokens.ts` | Colors, radii, shadows, typography, spacing |

### In Progress / Missing

| Item | Priority | Notes |
|------|----------|-------|
| Lark credentials configuration | P1 | 4 env vars needed; without them API returns 503 |
| Project plan execution | P2 | Phase 03 (Landing UI ~20%), Phase 04 (Lark ~40%), Phase 05 (0%) |
| `design-tokens.json` gitignored | P3 | File exists but excluded from version control (team sync issue) |

### Not Yet Implemented

| Item | Priority | Notes |
|------|----------|-------|
| CSRF protection on form | P1 | No token/double-submit protection |
| Rate limiting on POST /api/leads | P2 | No request throttling |
| Email notifications on new leads | P2 | No email integration |
| Unit/integration/E2E tests | P2 | 0 test files; only `tsc --noEmit` lint |
| Lark token caching | P3 | Token fetched fresh per request (2 API calls per lead) |
| Traditional analytics (GTM/GA4) | P3 | Only custom events + Vercel Analytics |
| Image optimization | P3 | `images.unoptimized: true` in next.config |

---

## 5. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | latest |
| UI Library | React | latest |
| Language | TypeScript (strict) | latest |
| Icons | Lucide React | latest |
| Validation | Zod | latest |
| Analytics | @vercel/analytics | latest |
| Fonts | Playfair Display + Manrope (Google Fonts CDN) | — |
| Styling | Plain CSS (938 lines, CSS custom properties) | — |
| Backend storage | Lark Base (Bitable API) | — |
| Hosting | Vercel | — |

---

## 6. Deployment

| Item | Detail |
|------|--------|
| Platform | Vercel |
| Domain | `thuy-duong-invest.vercel.app` |
| Build command | `npm run build` (Next.js build) |
| Output | Static + Serverless Functions (API route) |
| Env vars | `LARK_APP_ID`, `LARK_APP_SECRET`, `LARK_BASE_APP_TOKEN`, `LARK_TABLE_ID`, `NEXT_PUBLIC_ANALYTICS_PROVIDER=vercel` |

---

## 7. Project Timeline (from plan)

| Phase | Name | Status | Effort |
|-------|------|--------|--------|
| 01 | Asset Selection | ~80% | 0.5 day |
| 02 | Bootstrap | ~100% | 0.5 day |
| 03 | Landing UI | ~20% | 1.5 days |
| 04 | Lark Capture | ~40% | 2 days |
| 05 | Analytics + Deploy | ~0% | 1 day |

**Total estimated:** 5.5 days &nbsp;|&nbsp; **Priority:** P2
