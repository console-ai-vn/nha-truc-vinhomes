# Phase 05 - Analytics Verification Deploy

## Context links
- Parent plan: [plan.md](C:/Users/Mr.D/Desktop/ThuyDuongSSi/docs/superpowers/plans/2026-05-22-thuy-duong-ssi-recruitment-landing/plan.md)
- Tech report: [researcher-02-tech-report.md](C:/Users/Mr.D/Desktop/ThuyDuongSSi/docs/superpowers/plans/2026-05-22-thuy-duong-ssi-recruitment-landing/research/researcher-02-tech-report.md)
- Lark phase: [phase-04-lead-capture-lark.md](C:/Users/Mr.D/Desktop/ThuyDuongSSi/docs/superpowers/plans/2026-05-22-thuy-duong-ssi-recruitment-landing/phase-04-lead-capture-lark.md)

## Overview
- Date: 2026-05-22
- Description: Add UTM/event tracking, verify UX/API, and deploy to Vercel preview.
- Priority: P2
- Implementation status: pending
- Review status: pending

## Key Insights
- Tracking should not block lead submission.
- Vercel preview is enough before custom domain.
- Browser verification matters because page is visual and mobile-first.

## Requirements
- Track CTA clicks: form_submit, zalo_click, tiktok_click, facebook_click, open_account_click.
- Preserve UTM params in lead payload.
- Run lint/build.
- Verify desktop and mobile layouts.
- Verify one test lead appears in Lark.

## Architecture
- `src/lib/tracking.ts` wraps event calls.
- UTM extracted client-side and passed with form payload.
- Vercel Analytics integrated in layout.
- Deployment uses Vercel preview first.

## Related code files
- Modify: `app/layout.tsx`
- Modify: `src/lib/tracking.ts`
- Modify: `src/components/landing/LeadForm.tsx`
- Modify: `src/components/landing/FooterLinks.tsx`
- Create: `README.md`

## Implementation Steps
1. Add Vercel Analytics provider to layout.
2. Add click tracking wrapper for external CTAs.
3. Capture UTM query params in LeadForm.
4. Run `npm run lint`.
5. Run `npm run build`.
6. Start local dev server and verify desktop/mobile in browser.
7. Deploy Vercel preview.
8. Submit test lead and confirm Lark row.
9. Add README with env vars and deploy instructions.

## Todo list
- [ ] Add analytics provider.
- [ ] Add CTA event tracking.
- [ ] Capture UTM params.
- [ ] Run lint/build.
- [ ] Browser verify desktop/mobile.
- [ ] Deploy preview.
- [ ] Confirm Lark row.
- [ ] Document env/deploy steps.

## Success Criteria
- Build passes locally.
- Browser verification finds no blank screen or broken layout.
- All external CTA URLs work.
- Vercel preview URL is ready for owner review.
- Test lead exists in Lark Base.

## Risk Assessment
- Risk: analytics package adds client overhead.
- Mitigation: use Vercel Analytics first; PostHog only if needed.
- Risk: custom domain delays ship.
- Mitigation: ship preview first, attach domain later.

## Security Considerations
- Do not include live secrets in README.
- Do not expose test lead personal data in screenshots.
- Use HTTPS-only deployed URLs.

## Next steps
- Owner review preview, then decide domain and final copy tweaks.
