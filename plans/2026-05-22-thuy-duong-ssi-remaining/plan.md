---
title: "Thuy Duong SSI — Complete Remaining Features"
description: "Complete CSRF protection, rate limiting, email notifications, tests, token caching, and polish for ThuyDuongSSi landing page"
status: pending
priority: P2
effort: 3d
branch: master
tags: [nextjs, security, testing, lark, polish]
created: 2026-05-22
---

# Thuy Duong SSI — Remaining Work Plan

## Summary

Single-page recruitment landing for SSI securities advisory. All 16 landing features complete. 9 items remain across security, integration, testing, and polish.

**Repo:** https://github.com/console-ai-vn/thuy-duong-ssi-landing
**Live:** https://thuy-duong-invest.vercel.app

---

## Phase Overview

| # | Phase | Status | Effort | Priority |
|---|-------|--------|--------|----------|
| 01 | [Security Hardening](./phase-01-security-hardening.md) | pending | 4h | P1 |
| 02 | [Lark Polish](./phase-02-lark-polish.md) | pending | 4h | P1/P2 |
| 03 | [Testing](./phase-03-testing.md) | pending | 8h | P2 |
| 04 | [Final Polish](./phase-04-final-polish.md) | pending | 4h | P3 |

**Total effort: ~3 days**

---

## Execution Order

```
Phase 01 (P1) → Phase 02 (P1/P2) → Phase 03 (P2) → Phase 04 (P3)
```

Phases 01+02 can run partially in parallel (different files). Phase 03 after all logic is stable. Phase 04 is cleanup after everything else is verified.

---

## What's Already Done

16 features complete: Hero, authority stats, proof/role cards, training section, lead form (7 fields, 4 states, UTM tracking), bio links, footer, Lark Base POST API with Zod validation, content/UI separation, Vercel Analytics, responsive design, SEO metadata, design tokens, Playfair+Manrope typography.

---

## Risk Summary

| Risk | Impact | Mitigation |
|------|--------|------------|
| Lark env vars not configured | Form submits fail (503) | Env check middleware, fallback log |
| CSRF token breaks existing form | Form broken | Feature flag / gradual rollout |
| In-memory rate limiting lost on cold start | Rate limit resets | Acceptable for MVP; Upstash if needed |

---

## Gate Checklist (Pre-Build)

- [ ] All phase files reviewed
- [ ] Dependencies identified (csrf, upstash/ratelimit, resend, vitest, testing-library)
- [ ] Branch strategy: work on `feat/remaining-polish`
- [ ] Lark Base credentials verified in Vercel dashboard
