# Nhã Trúc Vinhomes Design System

## Visual Theme & Atmosphere
Luxury real-estate recruitment brochure. The page should feel like a Vinhomes private invitation: bright, calm, expensive, evidence-first, and recruitment-oriented. Avoid dark dashboard aesthetics and generic SaaS hero patterns. Use real portraits, award proof, project handover photos, and structured advisory language.

## Color Palette & Roles
- Deep navy `#0F2035`: authority text, CTA, footer, proof ribbons.
- Vinhomes navy `#1E3A5F`: primary CTA, section anchors, active states.
- Bright navy `#2B5089`: gradients, hover surfaces, secondary depth.
- Champagne gold `#C9A24C`: recognition, Top 3 proof, small highlights.
- Soft gold `#DBBA6A`: badge accents, dividers, premium emphasis.
- Pearl `#F8F6F0`: luxury hero atmosphere and soft section background.
- Paper `#F5F7FA`: calm section background.
- White `#FFFFFF`: forms, readable cards, content surfaces.

## Typography Rules
- Display: Playfair Display, used only for hero and large section headings.
- Body/UI: Be Vietnam Pro for Vietnamese readability.
- All caps labels need tracking and should stay short.
- Do not use viewport-only font scaling that makes Vietnamese text clip on mobile.

## Component Stylings
- Buttons: 8px radius, navy/gold contrast, icon when action is concrete.
- Proof cards: image-first, restrained shadow, no fake metrics.
- Forms: operational, dense, and clear; recruitment options first.
- Contact blocks: phone/Zalo/email must be visible without hunting.

## Layout Principles
- First viewport must show Nhã Trúc, Vinhomes, recruitment CTA, and real portrait. Only one PKD label is allowed in the UI: `PKD Miền Nam`.
- Use dossier-style information panels: concise, labeled, proof-backed.
- Avoid nested cards. Use full-width bands and single-level proof cards.
- Recruitment comes before buyer advisory.

## Depth & Elevation
- Use one strong hero depth layer.
- Gold borders are thin and intentional.
- Shadows should be navy-tinted, not grey default.

## Do's and Don'ts
- Do use real Zalo photos and Top 3 proof.
- Do use industry terms: booking, HĐMB, PBT, giỏ hàng, chính sách vay, pháp lý, bàn giao.
- Do not invent achievements beyond gathered proof.
- Do not drift into SSI, finance, or generic coach content.
- Do not use purple gradients, emoji, or oversized decorative cards.

## Responsive Behavior
- Mobile hero must wrap cleanly at 390px width.
- CTA buttons become full width on small screens.
- Portrait appears after the recruitment brief on mobile.
- Sticky CTA must not cover essential form fields.

## Agent Prompt Guide
Design direction: "Vinhomes private invitation". Keep core Vinhomes navy/gold palette, proof-first hierarchy, and recruitment conversion. Prefer bright luxury, pearl surfaces, generous spacing, restrained gold accents, and real photo authority. Output production React/CSS in the existing Next.js project, preserving real content and lead form behavior.
