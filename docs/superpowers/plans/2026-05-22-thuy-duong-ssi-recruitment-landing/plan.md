---
title: "SSI Recruitment Landing"
description: "Plan build landing/bio tuyen dung Next.js + Vercel + Lark cho Thuy Duong Invest."
status: pending
priority: P2
effort: 5.5d
branch: no-git-repo
tags: [nextjs, vercel, lark, landing-page, recruitment]
created: 2026-05-22
---
# SSI Recruitment Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` or `superpowers:executing-plans` to implement task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Build landing/bio tuyen dung cho Tran Thi Thuy Duong / Thuy Duong Invest, nhan manh uy tin ca nhan + SSI, thu lead ung vien chat luong vao Lark Base.

**Architecture:** Workspace chua co app. Tao moi Next.js App Router deploy tren Vercel, dung asset manifest de chi publish anh da chon, form submit qua route handler server-side sang Lark Base, analytics va UTM tach rieng khoi logic lead capture.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, Zod, Vercel, Lark Base API, `next/image`, Vercel Analytics or PostHog.

---

## Overview
- Funnel: authority page + low-friction CTA, uu tien lead tuyen dung, khong hua loi nhuan dau tu.
- Hien trang: chua co app, chua co domain, chua co Lark credentials, thu vien anh `assets/` can chon loc truoc khi build.
- Title chinh tam dung: "Giam doc Tu van Chung khoan 09 - SSI Hoi so".
- Sources: [researcher-01-funnel-copy-report.md](C:/Users/Mr.D/Desktop/ThuyDuongSSi/docs/superpowers/plans/2026-05-22-thuy-duong-ssi-recruitment-landing/research/researcher-01-funnel-copy-report.md), [researcher-02-tech-report.md](C:/Users/Mr.D/Desktop/ThuyDuongSSi/docs/superpowers/plans/2026-05-22-thuy-duong-ssi-recruitment-landing/research/researcher-02-tech-report.md), [scout-01-codebase-assets-report.md](C:/Users/Mr.D/Desktop/ThuyDuongSSi/docs/superpowers/plans/2026-05-22-thuy-duong-ssi-recruitment-landing/scout/scout-01-codebase-assets-report.md)

## Phases
1. [Phase 01 - Asset Selection](C:/Users/Mr.D/Desktop/ThuyDuongSSi/docs/superpowers/plans/2026-05-22-thuy-duong-ssi-recruitment-landing/phase-01-asset-selection.md) - status: pending, progress: 0%
2. [Phase 02 - Project Bootstrap](C:/Users/Mr.D/Desktop/ThuyDuongSSi/docs/superpowers/plans/2026-05-22-thuy-duong-ssi-recruitment-landing/phase-02-project-bootstrap.md) - status: pending, progress: 0%
3. [Phase 03 - Landing UI Content](C:/Users/Mr.D/Desktop/ThuyDuongSSi/docs/superpowers/plans/2026-05-22-thuy-duong-ssi-recruitment-landing/phase-03-landing-ui-content.md) - status: pending, progress: 0%
4. [Phase 04 - Lead Capture Lark](C:/Users/Mr.D/Desktop/ThuyDuongSSi/docs/superpowers/plans/2026-05-22-thuy-duong-ssi-recruitment-landing/phase-04-lead-capture-lark.md) - status: pending, progress: 0%
5. [Phase 05 - Analytics Verification Deploy](C:/Users/Mr.D/Desktop/ThuyDuongSSi/docs/superpowers/plans/2026-05-22-thuy-duong-ssi-recruitment-landing/phase-05-analytics-verification-deploy.md) - status: pending, progress: 0%

## Execution Notes
- Phase 01 must lock images, title proof, disclaimer, and CTA hierarchy before UI build.
- Phase 02 creates a new app because scout confirms no `package.json`, `README.md`, or source code exists.
- Phase 04 fails closed when Lark secrets are missing or invalid; client must not receive token/upstream details.
- Phase 05 is done only when preview deploy loads, form submits, and a test record appears in Lark Base.

## Dependencies
- Lark App ID/Secret, Base app token, table ID.
- Vercel project and final domain decision.
- Final owner approval for public title and image set.

## Unresolved Questions
- Confirm final displayed title: "Giam doc Tu van Chung khoan 09 - SSI Hoi so" vs "Giam doc kinh doanh, Phong TVCK 09 - Hoi so SSI".
- Choose Vercel Analytics only or PostHog for richer dashboard.
