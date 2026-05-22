# Phase 03 - Landing UI Content

## Context links
- Parent plan: [plan.md](C:/Users/Mr.D/Desktop/ThuyDuongSSi/docs/superpowers/plans/2026-05-22-thuy-duong-ssi-recruitment-landing/plan.md)
- Funnel report: [researcher-01-funnel-copy-report.md](C:/Users/Mr.D/Desktop/ThuyDuongSSi/docs/superpowers/plans/2026-05-22-thuy-duong-ssi-recruitment-landing/research/researcher-01-funnel-copy-report.md)
- Selected assets: [phase-01-asset-selection.md](C:/Users/Mr.D/Desktop/ThuyDuongSSi/docs/superpowers/plans/2026-05-22-thuy-duong-ssi-recruitment-landing/phase-01-asset-selection.md)

## Overview
- Date: 2026-05-22
- Description: Build the one-page authority recruitment landing experience.
- Priority: P1
- Implementation status: pending
- Review status: pending

## Key Insights
- Page should feel like a director's personal authority page, not HR job board.
- Primary conversion is recruitment lead, secondary links support trust.
- Mobile traffic from Facebook/TikTok/Zalo is likely primary.

## Requirements
- Sections: hero, authority strip, proof gallery, opportunity, training path, lead form, social/footer.
- Title: "Giam doc Tu van Chung khoan 09 - SSI Hoi so" unless owner changes it.
- CTA primary: "Nhan lo trinh ung tuyen".
- CTA secondary: Zalo contact/community, TikTok, Facebook, SSI open-account link.
- Include disclaimer: recruitment info will be confirmed directly by team; investment content is informational, not profit promise.

## Architecture
- Componentized page sections under `src/components/landing`.
- Content centralized in `src/content/landing.ts`.
- Images imported from `assets/selected` or copied to `public/assets/selected`.
- Form component posts to `/api/leads`.

## Related code files
- Modify: `app/page.tsx`
- Create: `src/components/landing/Hero.tsx`
- Create: `src/components/landing/AuthorityStrip.tsx`
- Create: `src/components/landing/ProofGallery.tsx`
- Create: `src/components/landing/Opportunity.tsx`
- Create: `src/components/landing/TrainingPath.tsx`
- Create: `src/components/landing/LeadForm.tsx`
- Create: `src/components/landing/FooterLinks.tsx`
- Modify: `src/content/landing.ts`

## Implementation Steps
1. Define copy blocks and social links in `src/content/landing.ts`.
2. Build hero with image, title, subtitle, CTA pair.
3. Build authority strip with 4-5 proof points.
4. Build opportunity cards for director, consultant, intern/CTV.
5. Build training path with FA, TA, social selling, personal brand.
6. Build lead form UI with client validation and loading/success/error states.
7. Build footer links and disclaimer.
8. Verify mobile and desktop with browser screenshots.

## Todo list
- [ ] Write content config.
- [ ] Build landing sections.
- [ ] Wire form UI to API.
- [ ] Add responsive styling.
- [ ] Add disclaimer and external links.
- [ ] Verify no text overlap on mobile.

## Success Criteria
- Page loads as a polished landing, not a scaffold/demo page.
- Mobile view has visible CTA above fold.
- User can submit the form and see a clear state.
- External links open correctly.

## Risk Assessment
- Risk: design too pink or too corporate.
- Mitigation: balance SSI red/white/charcoal with soft pink accents.
- Risk: copy sounds like guaranteed income.
- Mitigation: use opportunity language and confirmation disclaimer.

## Security Considerations
- Form should avoid collecting unnecessary personal data.
- External links should use safe attributes.
- Do not embed Apify dataset JSON in client bundle.

## Next steps
- Connect lead route to Lark Base.
