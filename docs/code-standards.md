# Code Standards — Thuy Duong SSI Landing

> **Last updated:** 2026-05-22 &nbsp;|&nbsp; **Version:** 0.1.0

---

## 1. TypeScript Configuration

- **Strict mode:** `tsconfig.json` → `"strict": true`
- **Target:** ES2017
- **Module resolution:** bundler
- **JSX:** react-jsx
- **Path alias:** `@/*` → project root (`"."`)
- **Lint:** `npm run lint` → `tsc --noEmit` (type-check only)
- **No ESLint:** Project does not have an ESLint config

---

## 2. File Naming Conventions

| Convention | Pattern | Examples |
|------------|---------|----------|
| Components | PascalCase `.tsx` | `LeadForm.tsx`, `FooterLinks.tsx` |
| Content/data | kebab-case `.ts` | `landing.ts` |
| Lib utilities | kebab-case `.ts` | `lead-schema.ts`, `env.ts`, `lark.ts`, `tracking.ts` |
| Styles | kebab-case `.ts` | `design-tokens.ts` |
| API routes | Next.js convention | `app/api/leads/route.ts` |
| Images | kebab-case descriptive | `hero-portrait.png`, `proof-kol-2025.jpg` |

---

## 3. Component Architecture

### "use client" Boundary

The project minimizes client-side JavaScript. Only two files use `"use client"`:

| File | Reason |
|------|--------|
| `app/page.tsx` | Scroll listener (useState/useEffect for nav blur) |
| `src/components/landing/LeadForm.tsx` | Form state management (useState + fetch) |

All other components are Server Components by default (Next.js App Router convention).

### Content/UI Separation

All copy lives in `src/content/landing.ts` as a single export `landingContent`. Components are pure renderers that consume this object:

```typescript
// landing.ts — data only, no JSX
export const landingContent = {
  links: { ... },
  stats: [ ... ],
  proofs: [ ... ],
  roles: [ ... ],
  training: [ ... ]
};

// page.tsx — renders from data
import { landingContent } from "@/src/content/landing";
// ... map over landingContent.stats, .proofs, .roles, .training
```

### Icon Mapping Pattern

Lucide icons are dynamically resolved via a `Record<string, ComponentType>` map:

```typescript
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BriefcaseBusiness, GraduationCap, Network, Award
};
// Usage: const Icon = iconMap[role.icon.name ?? ""] ?? Award;
```

---

## 4. Styling Approach

- **No CSS framework** — no Tailwind, no CSS-in-JS, no CSS modules
- **Single stylesheet:** `app/globals.css` (938 lines)
- **Design system:** 27 CSS custom properties in `:root` (16 colors, 4 radii, 3 shadows, 3 spacing + max-width)
- **Fonts:** Playfair Display (headings) + Manrope (body) via Google Fonts CDN
- **Responsive:** 3 breakpoints — 1024px, 860px, 560px — using `@media` queries
- **Spacing:** Clamp-based values for fluid scaling (e.g., `--space-x: clamp(20px, 5vw, 80px)`)
- **Naming:** Flat BEM-like class names (`.hero-grid`, `.hero-copy`, `.hero-eyebrow`), no nesting

**Note:** `design-tokens.json` and `src/styles/design-tokens.ts` exist but are **not consumed** by the CSS. The actual design tokens live in `:root` custom properties in `globals.css`. The JSON file is **gitignored**.

---

## 5. API Route Conventions

### Single POST endpoint: `app/api/leads/route.ts`

```
POST /api/leads
Content-Type: application/json

Response codes:
  200 — Lead created in Lark Base
  400 — Zod validation failed (Vietnamese error message)
  502 — Lark API error (transient)
  503 — Lark env not configured (misconfiguration)
```

### Error Handling Pattern

```typescript
// 1. Parse & validate
const parsed = leadSchema.safeParse(await request.json());

// 2. Check dependencies
const env = getLarkEnv();
if (!env.configured) return 503;

// 3. Execute with catch-all
try {
  await createLeadRecord(parsed.data);
  return 200;
} catch {
  return 502;
}
```

**Graceful degradation:** When Lark is unavailable, the API returns a 503 with a user-friendly Vietnamese message that directs users to contact via Zalo. No internal error details are leaked.

---

## 6. Lark Integration Patterns

- **Token fetched per-request:** `getTenantAccessToken()` is called on every `createLeadRecord()` — no caching
- **Field mapping:** camelCase (TypeScript) → snake_case (Lark) in `createLeadRecord()`
- **Static fields:** `status: "new"`, `source: "landing"` (default), `created_at: new Date().toISOString()`
- **Error handling:** Errors thrown as generic `Error` objects, caught by API route catch block

---

## 7. State Management

- **No global state library** — no Redux, Zustand, Context API
- **Page-level state:** `useState(true/false)` for `scrolled` nav flag
- **Form state:** `useState<FormState>` with discriminated union `{ status: "idle"|"loading"|"success"|"error", message: string }`
- **No routing state** — single-page, no client-side router, anchor-based navigation only

---

## 8. What's Followed vs What's Missing

### What's Followed

| Practice | Evidence |
|----------|----------|
| TypeScript strict mode | `tsconfig.json` `"strict": true` |
| Content/UI separation | `landing.ts` → components consume data |
| Graceful degradation | Lark API returns 503 with user message |
| Server/Client boundary discipline | Only 2 files marked `"use client"` |
| Semantic HTML | `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` |
| Accessibility basics | `aria-label` on nav/stats, `htmlFor` on labels, `alt` on images |
| Vietnamese-first copy | All UI text, error messages, SEO in Vietnamese |

### What's Missing

| Gap | Impact | Priority |
|-----|--------|----------|
| No test files | 0% coverage, no regression safety | P2 |
| No CSRF protection | Form vulnerable to cross-site request forgery | P1 |
| No rate limiting | API open to abuse without throttling | P2 |
| No ESLint | Only type-checking, no code style enforcement | P3 |
| No email notifications | No alert on new leads | P2 |
| No Lark token caching | 2 API calls per lead instead of 1 | P3 |
| No image optimization | `images.unoptimized: true` — all images served raw | P3 |
| No input sanitization beyond Zod | XSS risk if Lark Base renders HTML | P2 |
| `design-tokens.json` gitignored | Team sync issue for design system | P3 |
