# Phase 04 - Lead Capture Lark

## Context links
- Parent plan: [plan.md](C:/Users/Mr.D/Desktop/ThuyDuongSSi/docs/superpowers/plans/2026-05-22-thuy-duong-ssi-recruitment-landing/plan.md)
- Tech report: [researcher-02-tech-report.md](C:/Users/Mr.D/Desktop/ThuyDuongSSi/docs/superpowers/plans/2026-05-22-thuy-duong-ssi-recruitment-landing/research/researcher-02-tech-report.md)
- UI phase: [phase-03-landing-ui-content.md](C:/Users/Mr.D/Desktop/ThuyDuongSSi/docs/superpowers/plans/2026-05-22-thuy-duong-ssi-recruitment-landing/phase-03-landing-ui-content.md)

## Overview
- Date: 2026-05-22
- Description: Submit recruitment leads from Next.js server route into Lark Base.
- Priority: P1
- Implementation status: pending
- Review status: pending

## Key Insights
- Lark credentials are not available yet.
- Route must validate input and fail closed.
- Lark schema should support follow-up workflow, not just raw capture.

## Requirements
- Validate input with Zod.
- Required fields: full_name, email, phone_zalo, role_interest.
- Optional fields: experience_level, social_link, source, utm_campaign, notes.
- Store server timestamp.
- Return safe success/error messages to client.

## Architecture
- `/api/leads` handles POST only.
- `src/lib/lark.ts` gets tenant access token and creates Base record.
- `src/lib/lead-schema.ts` defines validation schema and normalized payload.
- `src/lib/env.ts` reads required env vars.

## Related code files
- Modify: `app/api/leads/route.ts`
- Create: `src/lib/lead-schema.ts`
- Create: `src/lib/lark.ts`
- Create: `src/lib/env.ts`
- Modify: `.env.example`

## Implementation Steps
1. Add env vars: `LARK_APP_ID`, `LARK_APP_SECRET`, `LARK_BASE_APP_TOKEN`, `LARK_TABLE_ID`.
2. Define `leadSchema` with trimmed strings and email validation.
3. Implement Lark tenant token fetch server-side.
4. Implement `createLeadRecord(payload)` to map fields to Lark.
5. Implement `/api/leads` POST route with validation, Lark call, and safe response.
6. Add rate-limit guard if simple in-memory limiter is acceptable for V1; otherwise add honeypot and timestamp delay check.
7. Test configured and unconfigured states.

## Todo list
- [ ] Define lead schema.
- [ ] Implement env reader.
- [ ] Implement Lark token call.
- [ ] Implement Base record creation.
- [ ] Wire API route.
- [ ] Test missing env and successful submit.

## Success Criteria
- Invalid form returns 400 with safe message.
- Missing Lark config returns 503 without secrets.
- Valid submit creates a Lark Base row.
- Client success state appears only after server confirms.

## Risk Assessment
- Risk: Lark field names mismatch actual table.
- Mitigation: keep mapping centralized and test against one real row.
- Risk: spam submissions.
- Mitigation: honeypot and basic server validation in V1; add stronger rate limit if traffic grows.

## Security Considerations
- Never expose Lark secrets to client.
- Do not print tokens or full lead payload in logs.
- Keep `.env.local` ignored.

## Next steps
- Add analytics and deploy verification.
