# Research Report: Technical Implementation Plan

## Scope
- Target: Next.js + Vercel landing page for SSI recruitment.
- Features: lead capture, local asset library, analytics/UTM tracking, Lark Base submission.
- Constraint: use local/common knowledge only; no code changes in this report.

## Recommendation
- Use **Next.js App Router** on **Vercel**.
- Prefer **TypeScript + Zod** for input validation.
- Use **Tailwind CSS** for fast landing-page styling.
- Use **next/image** for image optimization and responsive delivery.
- Use **route handlers** for form submission and Lark integration.
- Use **PostHog or Vercel Analytics** for event tracking if allowed; otherwise keep a lightweight internal event log.

## Why This Stack
- App Router gives simple server/client split for forms and tracking.
- Vercel matches Next.js deployment and preview workflow.
- Route handlers avoid adding a separate backend.
- Zod reduces invalid lead payloads before hitting Lark.
- next/image keeps large asset sets usable without manual image optimization.

## Suggested Project Structure
- `app/`
  - `page.tsx` landing page shell
  - `layout.tsx` global metadata, fonts, analytics bootstrapping
  - `api/lead/route.ts` lead capture endpoint
  - `api/track/route.ts` optional event endpoint
- `components/`
  - hero, proof, timeline, form, CTA, footer, tracking helpers
- `lib/`
  - `lark-base.ts` Lark API client
  - `tracking.ts` UTM parsing, event payload normalization
  - `validation.ts` Zod schemas
  - `assets.ts` curated asset manifest helpers
- `data/`
  - `assets-manifest.json` selected images, captions, usage slots
  - `copy/` page copy, structured content, FAQs
- `assets/`
  - raw library stays local
  - use `assets/selected/` or manifest-driven selection for production picks
- `public/`
  - only final web-ready assets that must be addressable by URL

## Local Asset Library Strategy
- Keep the full photo bank in `assets/` as source of truth.
- Add a curated manifest for the landing page only.
- Derive final hero/gallery picks from the manifest, not from raw folder scans at runtime.
- If file count is large, avoid shipping the whole library to `public/`; only publish chosen assets.
- Store metadata alongside the asset list: `id`, `path`, `alt`, `usage`, `priority`, `credit`.

## Lark Base Integration
- Use a server-side route handler to receive form submissions.
- Validate payload with Zod before any external call.
- Map fields to Lark Base columns explicitly:
  - name
  - phone/email
  - role interest
  - source page
  - UTM fields
  - timestamp
  - consent flag
- Recommended flow:
  1. client submits form
  2. server validates and normalizes
  3. server enriches with UTM/referrer/session data
  4. server writes to Lark Base
  5. server returns success/failure to UI
- If Lark auth token is unavailable at build time, keep the client unaware and fail closed on the server.
- Add idempotency/dedupe using email or phone + campaign timestamp bucket.

## Env Vars
- `LARK_APP_ID`
- `LARK_APP_SECRET`
- `LARK_BASE_APP_TOKEN` or whichever token model the chosen Lark Base API requires
- `LARK_TABLE_ID`
- `LARK_RECORD_TEMPLATE_ID` if using templates
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_ANALYTICS_ID`
- `NEXT_PUBLIC_POSTHOG_KEY` if PostHog is used
- `NEXT_PUBLIC_POSTHOG_HOST` if needed
- `NEXT_PUBLIC_VERCEL_ENV` for runtime branching
- `LEAD_FORM_SECRET` for simple request hardening
- `RECAPTCHA_SECRET` or equivalent only if anti-bot is added

## Security
- Keep all Lark secrets server-side only.
- Never expose access tokens in client bundles or `NEXT_PUBLIC_*`.
- Validate and sanitize all lead fields.
- Rate limit form endpoints.
- Add basic bot friction: honeypot, minimum submit time, optional CAPTCHA.
- Log only non-sensitive metadata; avoid storing raw PII in analytics.
- Use strict CORS defaults; only accept same-origin browser posts.
- Return generic error messages to users; keep external API details in server logs.

## Analytics and UTM Tracking
- Capture `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`.
- Also capture `gclid` / `fbclid` if present.
- Persist attribution in hidden form fields or client state, then send with the lead.
- Fire events for:
  - page_view
  - CTA click
  - form_start
  - form_submit
  - form_success
  - form_error
- Keep analytics logic isolated from business logic so it can be swapped later.

## Testing
- Unit test:
  - Zod validation
  - UTM parser
  - payload normalization
  - Lark request mapping
- Integration test:
  - lead endpoint success path
  - validation failure path
  - external API failure path
- UI test:
  - form submit flow
  - responsive layout
  - image rendering fallback
- Smoke test on preview deploy:
  - page loads
  - form posts
  - record appears in Lark Base

## Deploy Risks
- Lark API rate limits or auth failures can block lead capture.
- Large unoptimized assets can hurt Lighthouse and TTFB.
- Missing `NEXT_PUBLIC_SITE_URL` can break canonical URLs and tracking.
- Preview and production env drift can cause form success in one and failure in the other.
- Analytics scripts can be blocked by consent or ad blockers; keep core lead capture independent.
- If asset selection is not curated, build size and image payload will grow fast.

## Implementation Order
- Bootstrap Next.js app and deploy baseline to Vercel.
- Add curated asset manifest and page composition.
- Add lead form + validation + Lark route handler.
- Wire UTM capture and analytics events.
- Add tests, preview smoke checks, and hardening.

## Bottom Line
- Best fit is a small Next.js App Router app on Vercel with server-side Lark Base writes, curated local assets, and explicit UTM capture.
- Main engineering risk is not framework choice; it is secrets handling, asset bloat, and broken lead delivery on deploy.
