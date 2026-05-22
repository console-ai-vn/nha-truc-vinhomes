# Phase 02 - Project Bootstrap

## Context links
- Parent plan: [plan.md](C:/Users/Mr.D/Desktop/ThuyDuongSSi/docs/superpowers/plans/2026-05-22-thuy-duong-ssi-recruitment-landing/plan.md)
- Tech report: [researcher-02-tech-report.md](C:/Users/Mr.D/Desktop/ThuyDuongSSi/docs/superpowers/plans/2026-05-22-thuy-duong-ssi-recruitment-landing/research/researcher-02-tech-report.md)
- Asset phase: [phase-01-asset-selection.md](C:/Users/Mr.D/Desktop/ThuyDuongSSi/docs/superpowers/plans/2026-05-22-thuy-duong-ssi-recruitment-landing/phase-01-asset-selection.md)

## Overview
- Date: 2026-05-22
- Description: Create a new production-ready Next.js app scaffold.
- Priority: P1
- Implementation status: pending
- Review status: pending

## Key Insights
- Workspace has no `package.json` or app source.
- Keep V1 simple: one landing page, one form route, one data/content layer.
- Use TypeScript and Tailwind for fast Vercel deployment.

## Requirements
- Create Next.js App Router app in workspace root.
- Add TypeScript, Tailwind CSS, ESLint, Zod.
- Add predictable folders for content, assets, lead capture, and analytics.
- Do not add CMS, database, auth, or dashboard in V1.

## Architecture
- `app/page.tsx` renders the landing.
- `app/api/leads/route.ts` receives lead submissions.
- `src/lib/lark.ts` owns Lark API calls.
- `src/lib/tracking.ts` owns UTM/event helpers.
- `src/content/landing.ts` owns copy and links.

## Related code files
- Create: `package.json`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/api/leads/route.ts`
- Create: `src/content/landing.ts`
- Create: `src/lib/lark.ts`
- Create: `src/lib/tracking.ts`
- Create: `src/components/*`
- Create: `.env.example`

## Implementation Steps
1. Run `npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir false`.
2. Install `zod` and `@vercel/analytics`.
3. Add `.env.example` with Lark and analytics variables.
4. Create content file with social links and SSI account link.
5. Add empty API route that returns 503 until Lark env vars are configured.
6. Run `npm run lint` and `npm run build`.

## Todo list
- [ ] Bootstrap app.
- [ ] Install minimal dependencies.
- [ ] Add content/config files with clear responsibility.
- [ ] Add env example.
- [ ] Add health response for lead API.
- [ ] Verify lint/build.

## Success Criteria
- `npm run build` passes.
- App opens locally.
- Root page can render basic content.
- Lead API does not expose secrets when not configured.

## Risk Assessment
- Risk: create-next-app changes defaults.
- Mitigation: inspect generated files before editing.
- Risk: dependency bloat.
- Mitigation: only install `zod` and analytics package unless required.

## Security Considerations
- `.env.local` must not be committed.
- `.env.example` must contain only variable names.
- API route must not log lead payloads with sensitive data in production.

## Next steps
- Build landing UI once scaffold is stable.
