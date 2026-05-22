# Phase 01 — Security Hardening

**Status:** pending
**Effort:** 4h
**Priority:** P1
**Depends on:** None

---

## Overview

Add CSRF protection and rate limiting to `POST /api/leads`. Form currently accepts unauthenticated POSTs with no throttle — vulnerable to CSRF attacks and abuse. Also add security headers to all responses.

---

## Requirements

- [ ] Every form submit includes a valid CSRF token
- [ ] Replayed / forged requests rejected with 403
- [ ] Max 5 requests per IP per minute on POST /api/leads
- [ ] Rate limit exceeded returns 429 with `Retry-After` header
- [ ] Security headers present on all HTML responses

---

## Architecture

```
                   ┌─────────────────┐
  GET /api/csrf ──►│  CSRF endpoint   │──► Set-Cookie: csrf-token (HttpOnly, SameSite=Strict)
                   └─────────────────┘

                   ┌─────────────────┐
  POST /api/leads ─►│ Rate limiter     │──► 429 if exceeded
                   └─────────────────┘
                         │ pass
                   ┌─────────────────┐
                   │ CSRF validator   │──► 403 if token mismatch
                   └─────────────────┘
                         │ pass
                   ┌─────────────────┐
                   │ Zod + Lark Base  │
                   └─────────────────┘

  LeadForm.tsx ────► fetch GET /api/csrf on mount
                ────► include X-CSRF-Token + cookie in POST fetch
```

**CSRF Pattern:** Double-submit cookie. Server sets `__Host-csrf` cookie + returns same token in response body. Client reads token from body, sends as `X-CSRF-Token` header on POST. Server compares header value to cookie value.

**Rate Limiter:** In-memory `Map<IP, {count, resetTime}>`. Optionally upgrade to `@upstash/ratelimit` + Redis if cold starts are a problem. For MVP traffic, in-memory is sufficient.

---

## Related Code Files

| File | What to change |
|------|----------------|
| `app/api/leads/route.ts` (34 lines) | Add CSRF validation + rate limiting middleware before Zod |
| `src/components/landing/LeadForm.tsx` (108 lines) | Fetch CSRF token on mount; include in POST headers |
| `app/layout.tsx` (39 lines) | Add security headers via metadata or middleware |
| **NEW** `src/lib/csrf.ts` | Token generate/validate utilities |
| **NEW** `src/lib/rate-limit.ts` | In-memory sliding window rate limiter |
| **NEW** `app/api/csrf/route.ts` | GET endpoint returning CSRF token |
| **NEW** `middleware.ts` (root) | Optional: security headers via Next.js middleware |

---

## Implementation Steps

### Step 1: Create CSRF utilities (`src/lib/csrf.ts`)
- `generateToken()` — crypto.randomBytes(32).toString('hex')
- `validateToken(cookieValue, headerValue)` — timing-safe comparison
- Token expires in 1 hour (checked via cookie maxAge)

### Step 2: Create CSRF endpoint (`app/api/csrf/route.ts`)
- `GET` handler: generate token, set `__Host-csrf` cookie with `httpOnly, sameSite=strict, path=/api, maxAge=3600`
- Return `{ token }` as JSON

### Step 3: Create rate limiter (`src/lib/rate-limit.ts`)
- `rateLimit(req: NextRequest, max: 5, windowMs: 60000)` → `{ success, remaining, reset }`
- Store: `Map<string, {count, resetTime}>` keyed by `x-forwarded-for` || `req.ip`
- Cleanup stale entries every 5 minutes via `setInterval` or on-access sweep
- Return `429` JSON response with `Retry-After` when exceeded

### Step 4: Update POST /api/leads (`app/api/leads/route.ts`)
- Before Zod parsing:
  1. Call `rateLimit(request)` — return 429 if blocked
  2. Call `validateCsrf(request)` — return 403 if invalid
- Wrap in try/catch to avoid leaking implementation details

### Step 5: Update LeadForm.tsx (`src/components/landing/LeadForm.tsx`)
- `useEffect` on mount: fetch `GET /api/csrf`
- Include `X-CSRF-Token` header and `credentials: 'same-origin'` in POST fetch
- Handle 403/429 responses with user-facing error messages
  - 403: "Phiên đã hết hạn. Vui lòng tải lại trang."
  - 429: "Quá nhiều yêu cầu. Vui lòng thử lại sau 1 phút."

### Step 6: Add security headers
**Option A (recommended - middleware.ts):**
```
Referrer-Policy: strict-origin-when-cross-origin
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Strict-Transport-Security: max-age=63072000
```

**Option B (layout metadata):** `app/layout.tsx` metadata object for simple headers. Less flexible but no new file.

### Step 7: Verify
- Test form submit without token → 403
- Test form submit with invalid token → 403
- Submit 6 requests in 1 min → 5th succeeds, 6th → 429
- Token expires after 1h → requires page reload

---

## Success Criteria

- [ ] CSRF token generated on page load, validated on submit
- [ ] Replayed form POST returns 403
- [ ] 6+ requests/min from same IP returns 429 with Retry-After
- [ ] Security headers visible in `curl -I` response
- [ ] Existing happy-path form submit still works
- [ ] No regressions on mobile form UX

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| In-memory rate limit lost on Vercel cold start | Medium | Low | Acceptable; short window reset on redeploy |
| CSRF cookie blocks form on some browsers | Low | Medium | Test Chrome, Safari, Firefox; use SameSite=Strict |
| Rate limit too aggressive for legitimate use | Low | Low | 5/min is generous for a lead form; adjust if needed |
| middleware.ts conflicts with existing routes | Low | High | Use matcher config to target only /api/leads |
