# Phase 04 — Final Polish

**Status:** pending
**Effort:** 4h
**Priority:** P3
**Depends on:** Phase 01, Phase 02, Phase 03

---

## Overview

Cleanup tasks: re-enable image optimization, fix version control, add GTM placeholder, run Lighthouse audit, update README.

---

## Requirements

- [ ] Next.js image optimization enabled (remove `images.unoptimized`)
- [ ] `design-tokens.json` tracked in git
- [ ] GTM/GA4 placeholder added (optional, config-driven)
- [ ] Lighthouse score ≥ 90 on all categories
- [ ] Updated README with project status and architecture

---

## Related Code Files

| File | What to change |
|------|----------------|
| `next.config.ts` (or `.mjs`) | Remove `images: { unoptimized: true }` |
| `.gitignore` | Remove `design-tokens.json` entry |
| `src/lib/tracking.ts` (15 lines) | Add GTM script injection helper |
| `app/layout.tsx` (39 lines) | Conditionally render GTM `<Script>` |
| `README.md` | Update with final project status |
| `design-tokens.json` | Ensure committed (currently gitignored) |

---

## Implementation Steps

### Step 1: Re-enable image optimization
- Remove `images: { unoptimized: true }` from `next.config.ts`
- Ensure all `<Image>` components have proper `width`/`height` or `fill`
- Verify images render correctly in dev and production
- Check: Hero portrait, proof card images, SSI logo

### Step 2: Un-gitignore design-tokens.json
- Remove `design-tokens.json` from `.gitignore`
- `git add design-tokens.json && git commit -m "chore: track design tokens"`
- Verify file content is current and matches `src/styles/design-tokens.ts`

### Step 3: Add GTM/GA4 placeholder
```ts
// src/lib/tracking.ts — add:
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';
```

```tsx
// app/layout.tsx — add:
import Script from 'next/script';
import { GTM_ID, GA_ID } from '@/lib/tracking';

// Inside <head>:
{GTM_ID && (
  <Script id="gtm" strategy="afterInteractive">
    {`(function(w,d,s,l,i){...})(window,document,'script','dataLayer','${GTM_ID}');`}
  </Script>
)}
```
- Add `NEXT_PUBLIC_GTM_ID` and `NEXT_PUBLIC_GA_ID` to Vercel env vars (empty by default)
- GA4 via `next/script` with `strategy="afterInteractive"`

### Step 4: Lighthouse audit
- Run in Chrome DevTools → Lighthouse → Desktop + Mobile
- Target: Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90
- Common Next.js fixes if below target:
  - Font preload (`Playfair Display`, `Manrope`)
  - Above-fold image priority hint
  - Reduce CSS (938 lines — check for unused)
  - Add `aria-label` to icon buttons/links
- Document any trade-offs (e.g., Keep Google Fonts CDN for simplicity vs self-hosting)

### Step 5: Update README
Sections to add/update:
- Project status badge (all features complete)
- Architecture diagram (ASCII or Mermaid)
- Local setup instructions
- Environment variables table
- Deployment guide (Vercel)
- Test instructions

### Step 6: Final verification
- [ ] `npm run build` passes (no type errors, no ESLint errors)
- [ ] `npm test` passes with coverage
- [ ] Manual test: full form submit flow on production
- [ ] Cross-browser check: Chrome, Safari, Firefox, mobile Safari
- [ ] All env vars verified in Vercel production dashboard

---

## Success Criteria

- [ ] `images.unoptimized` removed; all images load with Next.js optimization
- [ ] `design-tokens.json` tracked in git
- [ ] GTM/GA4 fires for page views (when ID configured)
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90
- [ ] README updated with final status and architecture
- [ ] Production build passes all checks

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Re-enabling image optimization breaks existing images | Low | Medium | Test all 5+ images across breakpoints before merging |
| design-tokens.json conflicts with source of truth | Low | Low | Ensure generation script syncs both files |
| GTM script blocks render if misconfigured | Low | Medium | Use `strategy="afterInteractive"`; only inject if ID present |
| Lighthouse score improvement requires significant refactor | Medium | Low | Document trade-offs if target not met; prioritize above-fold metrics |
