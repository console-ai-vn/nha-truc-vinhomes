# Phase 01 - Asset Selection

## Context links
- Parent plan: [plan.md](C:/Users/Mr.D/Desktop/ThuyDuongSSi/docs/superpowers/plans/2026-05-22-thuy-duong-ssi-recruitment-landing/plan.md)
- Scout report: [scout-01-codebase-assets-report.md](C:/Users/Mr.D/Desktop/ThuyDuongSSi/docs/superpowers/plans/2026-05-22-thuy-duong-ssi-recruitment-landing/scout/scout-01-codebase-assets-report.md)
- Source assets: [assets](C:/Users/Mr.D/Desktop/ThuyDuongSSi/assets)

## Overview
- Date: 2026-05-22
- Description: Select production-ready images and proof assets before any UI build.
- Priority: P1
- Implementation status: pending
- Review status: pending owner review

## Key Insights
- Existing raw library has 1013 photos, but landing needs 8-12 curated assets only.
- Title evidence supports "Giam doc Tu van Chung khoan 09 - SSI Hoi so" as current primary title.
- Awards and recruitment images are enough for trust, but need human review for professionalism.

## Requirements
- Select 1 hero portrait, 3 proof/award images, 2 recruitment/policy images, 3 team/event/social proof images.
- Store chosen copies under `assets/selected`.
- Create `assets/selected/asset-manifest.json` with filename, section, alt text, source path, and usage note.
- Keep raw assets untouched.

## Architecture
- Raw folders remain source of truth.
- `assets/selected` becomes the only asset folder referenced by the app.
- Manifest drives UI imports/copy so later swaps do not require content rewrites.

## Related code files
- Create later: `assets/selected/asset-manifest.json`
- Read: `assets/photo-index.json`
- Read: `assets/contact-sheets/*.jpg`

## Implementation Steps
1. Open `assets/contact-sheets/portrait-candidates-montage.jpg` and shortlist 5 portrait candidates.
2. Open `assets/contact-sheets/awards-montage.jpg` and shortlist 3 award/proof candidates.
3. Open `assets/contact-sheets/recruitment-montage.jpg` and shortlist 2 offer/proof candidates.
4. Copy selected files into `assets/selected` with names `hero-01.jpg`, `proof-award-01.jpg`, `recruitment-01.jpg`, `event-01.jpg`.
5. Write manifest with alt text that does not overclaim awards.
6. Record title decision in `assets/selected/content-notes.md`.

## Todo list
- [ ] Select hero portrait.
- [ ] Select awards/proof assets.
- [ ] Select recruitment and event assets.
- [ ] Create `asset-manifest.json`.
- [ ] Create `content-notes.md`.
- [ ] Review selected folder with owner before Phase 03.

## Success Criteria
- `assets/selected` has 8-12 curated files.
- Manifest includes section, alt text, and source path for each asset.
- No raw Facebook URL is required at runtime.
- Owner accepts title and hero image.

## Risk Assessment
- Risk: Facebook-compressed photos may look soft in hero.
- Mitigation: use best local portrait now; replace later with Drive original without changing layout.
- Risk: award copy overclaims.
- Mitigation: phrase as recognition/proof, not official legal claim unless source image confirms exact wording.

## Security Considerations
- Do not publish private metadata beyond already-public assets.
- Do not expose Apify token or datasets in public app.
- Do not include private lead data in asset files.

## Next steps
- After approval, bootstrap Next.js app and import only `assets/selected`.
