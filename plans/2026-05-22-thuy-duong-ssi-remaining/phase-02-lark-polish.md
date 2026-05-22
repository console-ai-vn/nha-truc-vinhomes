# Phase 02 — Lark Polish

**Status:** pending
**Effort:** 4h
**Priority:** P1 (env vars) / P2 (token cache + email)
**Depends on:** Phase 01 (optional — can run in parallel)

---

## Overview

Three Lark-related improvements:
1. **Token caching** — cache tenant access token to avoid 2 API calls per lead
2. **Email notifications** — notify on new lead via Resend or Lark webhook
3. **Prod env configuration** — verify all 4 Lark env vars are set in Vercel

---

## Requirements

- [ ] Lark tenant token cached with TTL, reused across requests
- [ ] Email sent to recruiter on each new lead submission
- [ ] All 4 `LARK_*` env vars configured in Vercel production
- [ ] API gracefully handles missing env vars (clear 503 message)

---

## Architecture

### Token Caching

```
  POST /api/leads
    │
    ├── getLarkToken()
    │     ├── cache hit? → return cached token
    │     └── cache miss → POST Lark OAuth → cache(token, TTL=110min) → return
    │
    └── createLarkRecord(token, leadData)
```

Cache store: module-level variable or `globalThis` (persists across Vercel warm requests). TTL 110 minutes (Lark tokens expire in 120 min — 10 min safety margin).

### Email Notification

```
  POST /api/leads success
    │
    └── sendNotification(leadData)
          ├── Resend API → email to configured address
          └── (fallback) Lark webhook → message to Lark chat
```

**Provider:** Resend (https://resend.com) — free tier 100 emails/day, simple React Email templates. Fallback: Lark incoming webhook posts to a group chat.

---

## Related Code Files

| File | What to change |
|------|----------------|
| `src/lib/lark.ts` (74 lines) | Add token caching; refactor `getTenantToken()` |
| `src/lib/env.ts` (18 lines) | Better error messages for missing vars |
| `app/api/leads/route.ts` (34 lines) | Add notification call after successful record creation |
| **NEW** `src/lib/email.ts` | Resend client + send notification function |
| **NEW** `src/lib/lark-webhook.ts` | Lark incoming webhook sender (optional fallback) |

---

## Implementation Steps

### Step 1: Refactor Lark token caching (`src/lib/lark.ts`)
```ts
// Module-level cache
let cachedToken: { token: string; expiresAt: number } | null = null;

export async function getTenantToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 600_000) { // >10min remaining
    return cachedToken.token;
  }
  // ... existing OAuth fetch logic ...
  cachedToken = { token, expiresAt: now + (expire * 1000) };
  return token;
}
```
- Token expire from Lark API response → `expiresAt = Date.now() + (expire - 600) * 1000`
- Export `clearTokenCache()` for testing

### Step 2: Create email notification module (`src/lib/email.ts`)
- Initialize Resend client with `RESEND_API_KEY` env var
- `sendLeadNotification(data: LeadData)` function
- Template: plain text summarizing lead info (name, phone, email, role, source)
- Recipient: `NOTIFICATION_EMAIL` env var
- Wrap in try/catch — never fail the API response if email fails
- Log success/failure to console

### Step 3: Add notification call to route (`app/api/leads/route.ts`)
```ts
// After successful Lark record creation
try {
  await sendLeadNotification(validated.data);
} catch (e) {
  console.error('Email notification failed:', e);
  // Don't fail the request
}
```

### Step 4: Improve env error messages (`src/lib/env.ts`)
Replace generic "Missing Lark configuration" with specifics:
```ts
const missing = [];
if (!process.env.LARK_APP_ID) missing.push('LARK_APP_ID');
if (!process.env.LARK_APP_SECRET) missing.push('LARK_APP_SECRET');
if (!process.env.LARK_BITABLE_APP_TOKEN) missing.push('LARK_BITABLE_APP_TOKEN');
if (!process.env.LARK_BITABLE_TABLE_ID) missing.push('LARK_BITABLE_TABLE_ID');
// Return 503 with { error: 'Missing config: ...', missing }
```

### Step 5: Configure Vercel env vars
Add to Vercel project dashboard (Settings → Environment Variables):
- `LARK_APP_ID`
- `LARK_APP_SECRET`
- `LARK_BITABLE_APP_TOKEN`
- `LARK_BITABLE_TABLE_ID`
- `RESEND_API_KEY` (new)
- `NOTIFICATION_EMAIL` (new)

### Step 6: Test
- Submit form twice → second request uses cached token (verify via logs)
- Check email inbox for notification after form submit
- Remove one env var locally → verify specific 503 message

---

## Success Criteria

- [ ] Token cached: 2 consecutive form submits = 1 Lark OAuth call + 2 record creates
- [ ] Email arrives within 10s of form submission
- [ ] Email contains: name, phone, email, role, UTM source
- [ ] Missing env var returns `{ error: "Missing config: LARK_APP_ID, ..." }`
- [ ] Failed email notification does NOT block API response
- [ ] All 6 env vars configured in Vercel production

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Resend free tier exhausted (100/day) | Low | Medium | Add Lark webhook fallback; monitor usage |
| Stale cached token (Vercel cold start timing) | Low | High | 10min safety margin on TTL; retry on 401 |
| Missing env vars in Vercel after deploy | Medium | High | Add health check endpoint; deploy checklist |
| Email notification blocks API response | Low | High | try/catch wrapper; non-blocking Promise |
