# Nha Truc Vinhomes Landing Design Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clone the SSI personal-authority landing into a Vinhomes recruitment/sales authority landing for Huynh Thanh Nha Truc.

**Architecture:** Keep the existing Next.js single-page landing structure. Replace SSI content, links, metadata, and selected assets with Vinhomes-specific content backed by Apify crawl evidence and Zalo images.

**Tech Stack:** Next.js App Router, React, TypeScript, plain CSS, existing lead form/API.

---

## Evidence Summary

Use these verified claims:

- Top 3 Truong phong Kinh doanh nam 2025.
- Truong phong Kinh doanh Vinhomes.
- Vinhomes activity visible from 2024-02-04 onward.
- Participates in recruiting Vinhomes Sales Inhouse / CVKD.
- Works across Vinhomes Grand Park, The Beverly, The Opus One, Vinhomes Green Paradise Can Gio, Vinhomes Saigon Park.
- Team milestone: Vinhomes Market Mien Nam reached 200 booking. Phrase as team/market milestone, not personal result.

Avoid these unless user gives stronger proof:

- Top sales ca nhan.
- Giai thuong ca nhan beyond Top 3 Truong phong.
- 200 booking ca nhan.
- Exact revenue/doanh so.

## Design Direction

Recommended approach: **Authority + Recruitment + Sales Proof**

- Same conversion pattern as SSI landing.
- Tone: premium, direct, Vinhomes red/gold/white, real estate consultant authority.
- First viewport must show Nha Truc, Vinhomes role, Top 3 proof, and CTAs.
- No marketing hero fluff. Visitor should immediately know: who she is, why trust her, what to do next.

Rejected alternatives:

- Pure sales landing for projects: too dependent on current inventory and policy updates.
- Pure recruitment landing: loses buyer/investor lead value.
- Luxury editorial profile: prettier but weaker conversion.

## Asset Plan

Use files from `C:\Users\Mr.D\Desktop\Nha Truc\Photos-3-001`:

- Hero portrait: `IMG_20260603_213109.jpg`
- Backup portrait: `IMG_20260603_211927.jpg`
- Main proof: `IMG_20260603_211947.jpg`
- Ranking proof: `IMG_20260603_211953.jpg`
- Team office: `IMG_20260603_211848.jpg`
- Team outdoor: `IMG_20260603_213045.jpg`
- Event/professional: `IMG_20260603_211850.jpg`
- Sales handover/proof: `IMG_20260603_211857.jpg`

Asset destination:

- `public/assets/selected/nha-truc-hero.jpg`
- `public/assets/selected/nha-truc-top-3-proof.jpg`
- `public/assets/selected/nha-truc-top-3-ranking.jpg`
- `public/assets/selected/vinhomes-team-office.jpg`
- `public/assets/selected/vinhomes-team-outdoor.jpg`
- `public/assets/selected/vinhomes-event.jpg`
- `public/assets/selected/the-opus-handover.jpg`

## Page Structure

### Section 1: Hero

Purpose: immediate credibility and CTA.

Copy:

- Eyebrow: `Truong phong Kinh doanh Vinhomes`
- Headline: `Dong hanh cung Nha Truc - xay su nghiep va tai san cung Vinhomes`
- Subheadline: `Top 3 Truong phong Kinh doanh nam 2025. Tu van chon san pham Vinhomes, dong hanh khach hang tu xem nha, chot coc, ky HDMB den nhan nha.`
- Badge: `Top 3 Truong phong Kinh doanh 2025`

Stats:

- `Top 3` / `Truong phong Kinh doanh Vinhomes`
- `2024+` / `Hoat dong Vinhomes Sales Inhouse`
- `200 booking` / `Cot moc doi ngu Vinhomes Market Mien Nam`
- `5+ du an` / `Grand Park, Opus, Beverly, Can Gio, Saigon Park`

CTAs:

- Primary: `Nhan tu van / ung tuyen`
- Secondary: `Xem bang chung Top 3`

### Section 2: Proof

Purpose: replace SSI certificates with Vinhomes proof.

Cards:

- `Top 3 Truong phong Kinh doanh 2025`
  - Image: `nha-truc-top-3-proof.jpg`
  - Text: `Vinhomes ghi nhan Top 3 Truong phong Kinh doanh nam 2025.`
- `Bang xep hang Top 3`
  - Image: `nha-truc-top-3-ranking.jpg`
  - Text: `Bang vinh danh Top 3 Truong phong Kinh doanh, dung ten Huynh Thanh Nha Truc o vi tri Top 3.`
- `Doi ngu va moi truong Vinhomes`
  - Image: `vinhomes-team-office.jpg`
  - Text: `Lam viec trong he thong Sales Inhouse Vinhomes, co team, van phong, dao tao va chien dich tuyen dung ro rang.`

### Section 3: Career Timeline

Purpose: show progression without overclaim.

Items:

- `2024`: `Gia nhap/hoat dong Sales Inhouse Vinhomes, tuyen dong doi CVKD truc tiep cho Vinhomes.`
- `2025`: `Tu van Vinhomes Grand Park, The Beverly, The Opus One, Green City, Green Paradise Can Gio.`
- `2025`: `Dat Top 3 Truong phong Kinh doanh Vinhomes.`
- `2026`: `Dong hanh Vinhomes Saigon Park va cac chien dich booking/tuyen dung moi.`

### Section 4: Buyer Value

Purpose: convert buyer/investor leads.

Cards:

- `Chon dung san pham`: so sanh nhu cau o, dau tu, dong tien.
- `Theo sat phap ly - tien do`: ban giao, HDMB, so hong, tien do xay dung.
- `Khai thac chinh sach`: vay, chiet khau, qua tang, booking, bang gia.

### Section 5: Recruitment

Purpose: keep SSI landing recruitment funnel but for Vinhomes.

Headline: `Gia nhap doi ngu kinh doanh Vinhomes cung Nha Truc`

Roles:

- `Chuyen vien Kinh doanh Inhouse`
- `CTV / Sale BDS moi vao nghe`
- `Ung vien co kinh nghiem BDS, tai chinh, ngan hang, bao hiem`

Benefits:

- Luong cung + phu cap.
- Hoa hong khong gioi han.
- Dao tao san pham va ky nang ban hang.
- Co hoi thang tien len quan ly.
- Lam viec voi cac du an Vinhomes tai TP.HCM va khu vuc phia Nam.

### Section 6: Projects

Purpose: make the current market focus concrete.

Use project chips/cards:

- Vinhomes Grand Park
- The Beverly
- The Opus One
- Vinhomes Green Paradise Can Gio
- Vinhomes Saigon Park
- Vinhomes Green City

### Section 7: Form

Purpose: capture both buyer and recruitment leads.

Change role options:

- `Can tu van mua nha / dau tu Vinhomes`
- `Muon ung tuyen CVKD Vinhomes`
- `Muon hop tac CTV`
- `Can bang gia / gio hang du an`

Keep fields:

- Full name
- Phone/Zalo
- Email optional
- Interest
- Experience level
- Social link
- Note

### Section 8: Links/Footer

Links:

- Facebook: `https://www.facebook.com/huynhthanhnhatruc`
- Zalo/phone: `0947939224` if user confirms public use.

Footer disclaimer:

- `Thong tin du an, chinh sach ban hang va gio hang co the thay doi theo chu dau tu tai tung thoi diem. Vui long lien he de nhan thong tin cap nhat.`

## Files To Modify

- `src/content/landing.ts`: replace all SSI content with Nha Truc/Vinhomes content.
- `app/page.tsx`: replace hardcoded SSI strings and adjust section labels if needed.
- `app/layout.tsx`: update metadata, JSON-LD, title, description, keywords.
- `src/components/landing/LeadForm.tsx`: adjust role options and placeholder copy.
- `src/components/landing/FooterLinks.tsx`: update disclaimer and links.
- `app/globals.css`: light theme color tuning only if SSI red clashes with Vinhomes assets.
- `README.md`: optional update only after implementation, if user asks.

## Implementation Tasks

### Task 1: Prepare Assets

- [ ] Copy selected photos into `public/assets/selected`.
- [ ] Rename files using the asset destination list.
- [ ] Verify all copied images open and dimensions are correct.
- [ ] Do not delete old SSI assets.

### Task 2: Replace Content Source

- [ ] Update `src/content/landing.ts` with Vinhomes links, hero, stats, proof, roles, timeline, projects.
- [ ] Keep copy evidence-safe.
- [ ] Do not claim personal 200 booking or top sales.

### Task 3: Update Page Hardcoded Copy

- [ ] Update `app/page.tsx` hero eyebrow, identity label, proof intro, timeline headline, CTA labels.
- [ ] Keep layout same unless content breaks.
- [ ] Ensure image `alt` text matches actual images.

### Task 4: Update SEO

- [ ] Update `app/layout.tsx` metadata.
- [ ] JSON-LD should say `Huynh Thanh Nha Truc`, `Truong phong Kinh doanh Vinhomes`.
- [ ] Remove SSI-specific organization/title.

### Task 5: Update Lead Form

- [ ] Replace SSI recruitment options with Vinhomes buyer/recruitment options.
- [ ] Keep validation schema unless field semantics break.
- [ ] Keep API unchanged.

### Task 6: Visual QA

- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Start dev server.
- [ ] Open desktop and mobile viewport.
- [ ] Check hero image crop, proof card readability, no text overlap.

## Open Questions

- Confirm public phone/Zalo number: use `0947939224`?
- Confirm exact title: `Truong phong Kinh doanh Vinhomes` or more formal wording?
- Confirm landing goal priority: buyer leads first, recruitment first, or 50/50?
