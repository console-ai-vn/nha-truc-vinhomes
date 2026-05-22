# Phase 03 — Testing

**Status:** pending
**Effort:** 8h
**Priority:** P2
**Depends on:** Phase 01, Phase 02

---

## Overview

Add comprehensive tests. Currently 0 test files — only `tsc --noEmit` lint. Need unit tests for lib utilities, integration tests for API route, component tests for LeadForm, and a smoke E2E test.

**Stack:** Vitest + @testing-library/react + @testing-library/jest-dom (component) + Playwright (E2E)

---

## Requirements

- [ ] Unit tests for `src/lib/` (lead-schema, env, csrf, rate-limit, tracking, lark)
- [ ] Integration tests for `POST /api/leads`
- [ ] Component tests for `LeadForm` (4 states: idle, submitting, success, error)
- [ ] E2E smoke test: full form submit flow in Playwright
- [ ] `npm test` runs all tests; `npm run test:e2e` runs Playwright
- [ ] ≥80% coverage on `src/lib/`
- [ ] Tests run in CI (GitHub Actions)

---

## Architecture

```
  /tests
  ├── unit/
  │   ├── lib/
  │   │   ├── lead-schema.test.ts      (Zod validation)
  │   │   ├── env.test.ts              (env var detection)
  │   │   ├── csrf.test.ts             (token gen + validate)
  │   │   ├── rate-limit.test.ts       (sliding window)
  │   │   ├── tracking.test.ts         (custom events)
  │   │   └── lark.test.ts             (token cache + record create — mock fetch)
  ├── integration/
  │   ├── api-leads.test.ts            (POST /api/leads — happy + error paths)
  ├── component/
  │   └── LeadForm.test.tsx            (render states, form interaction)
  └── e2e/
      └── submit-flow.spec.ts          (Playwright full flow)
```

### Vitest Config (`vitest.config.ts`)
```ts
import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    environment: 'jsdom',          // for component tests
    include: ['tests/**/*.test.{ts,tsx}'],
    coverage: { provider: 'v8', include: ['src/lib/**'] },
    setupFiles: ['tests/setup.ts'], // global mocks, DOM setup
  },
});
```

---

## Related Code Files

| File | What to change |
|------|----------------|
| `package.json` | Add vitest, @testing-library/*, playwright, test scripts |
| **NEW** `vitest.config.ts` | Vitest configuration |
| **NEW** `tests/setup.ts` | Global test setup (jsdom, env mocks) |
| **NEW** `tests/unit/lib/lead-schema.test.ts` | Zod schema tests |
| **NEW** `tests/unit/lib/env.test.ts` | Env detection tests |
| **NEW** `tests/unit/lib/csrf.test.ts` | CSRF token tests |
| **NEW** `tests/unit/lib/rate-limit.test.ts` | Rate limiter tests |
| **NEW** `tests/unit/lib/tracking.test.ts` | Tracking function tests |
| **NEW** `tests/unit/lib/lark.test.ts` | Lark client tests (mocked) |
| **NEW** `tests/integration/api-leads.test.ts` | API route integration tests |
| **NEW** `tests/component/LeadForm.test.tsx` | Component tests |
| **NEW** `tests/e2e/submit-flow.spec.ts` | Playwright E2E |
| **NEW** `.github/workflows/test.yml` | CI test runner |

---

## Implementation Steps

### Step 1: Setup Vitest + dependencies
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
npm install -D @vitest/coverage-v8
```
Add scripts to `package.json`:
```json
"test": "vitest run",
"test:watch": "vitest",
"test:coverage": "vitest run --coverage"
```

### Step 2: Write unit tests

#### `lead-schema.test.ts`
- Valid data parses successfully
- Missing required field → Zod error
- Invalid email format → Zod error
- Invalid phone format → Zod error
- Extra fields stripped

#### `env.test.ts`
- All vars set → `checkLarkEnv()` returns `{ valid: true }`
- One var missing → returns `{ valid: false, missing: ['LARK_APP_ID'] }`
- Approach: mock `process.env` before each test

#### `csrf.test.ts`
- `generateToken()` returns 64-char hex string
- Two calls return different tokens
- `validateToken(match, match)` → true
- `validateToken(mismatch, match)` → false
- Timing-safe comparison (no early exit)

#### `rate-limit.test.ts`
- 5 requests within window → all succeed
- 6th request within window → blocked
- After window expires → requests succeed again
- Different IPs tracked independently
- Returns correct `{ success, remaining, reset }`

#### `tracking.test.ts`
- Mocks `window.gtag` / `window.customEvent`
- `trackLeadSubmit(data)` calls custom event
- `trackUTM()` reads URL params
- Handles missing UTM gracefully

#### `lark.test.ts`
- Mock `fetch` globally
- `getTenantToken()` returns mock token
- Second call returns cached token (no second fetch)
- `createRecord()` calls correct Lark API endpoint
- Handles API error responses

### Step 3: Write integration test (`api-leads.test.ts`)
- `describe('POST /api/leads')`
  - Valid payload → 200, record created
  - Missing field → 400 with Zod errors
  - Invalid email → 400
  - CSRF token missing → 403
  - Rate limit exceeded → 429
  - Lark API down → 503, does not crash
- Use `next-test-api-route-handler` or direct handler import

### Step 4: Write component tests (`LeadForm.test.tsx`)
- `describe('LeadForm')`
  - Renders all 7 form fields
  - Submit button disabled when empty
  - Shows validation errors on empty submit
  - `Submitting...` state during fetch
  - Success state: form hidden, thank-you message shown
  - Error state: error message shown, can retry
  - CSRF token fetched on mount
  - Checkbox required

### Step 5: Write E2E smoke test (`submit-flow.spec.ts`)
- Install Playwright: `npm install -D @playwright/test`
- Test: open page → fill form → submit → verify success message
- Test: open page → submit empty → verify validation errors
- Test: mobile viewport form layout
- Script: `"test:e2e": "playwright test"`

### Step 6: Add CI workflow (`.github/workflows/test.yml`)
```yaml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm test
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
```

---

## Success Criteria

- [ ] `npm test` passes with ≥80% coverage on `src/lib/`
- [ ] All Zod validation cases covered (valid, invalid, edge)
- [ ] CSRF validation integration test passes
- [ ] Rate limiting integration test passes
- [ ] LeadForm renders all 4 states correctly
- [ ] E2E test completes successful form submit
- [ ] CI passes on push

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| jsdom doesn't support fetch/FormData well | Medium | Medium | Use `msw` or `vitest-fetch-mock` for API mocking |
| next-test-api-route-handler version incompatibility | Low | Medium | Test handler directly via imported POST function |
| Vitest + Next.js App Router edge cases | Medium | Medium | Separate unit/integration tests; don't test Next.js framework |
| Playwright E2E slow in CI | Medium | Low | Run E2E only on PR merge, not per-commit |
| Test time exceeds 8h estimate | Medium | Low | Prioritize lib unit tests + API integration; defer component tests if needed |
