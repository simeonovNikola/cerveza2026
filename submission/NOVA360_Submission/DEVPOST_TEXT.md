# Devpost draft — edit team details before posting

## Project title
NOVA 360 — Project Intelligence Hub

## Short tagline
Traceable project memory: verified answers, evidence and explainable updates.

## Summary
NOVA 360 brings the challenge's fragmented emails, meetings, tickets, plans and financial records into a clean bilingual project dashboard. Ten verified answers link to exact original evidence; a timeline and contradictions view distinguish historical information from valid decisions. A protected baseline, reviewed Impact Mode updates and a printable takeover brief help someone inherit the project without confusing proposal with approval or delivery with validation. Local authentication protects administrative tools, while a friendly support assistant helps users navigate and falls back locally when optional Gemini is unavailable.

## Problem
Project information is scattered and sometimes outdated or contradictory. A person taking over must understand responsibilities, decisions, conditions, uncertainty and next actions without relying on whichever document looks newest.

## Solution
We organized the supplied corpus into reviewed structured facts, citations and relationships, then exposed them through a simple operational interface. Every official answer can be traced to exact evidence. New events are inspected before being accepted; the app explains changed, unchanged, new and pending facts while preserving the original snapshot.

## Key features
- Ten sourced answers with nuance and explicit uncertainty.
- Original file previews and precise page/line/cell/image locators.
- Timeline, decisions, historical contradictions and actionable handover.
- Bilingual FR/EN interface and deterministic project search/Ask NOVA.
- Baseline/Current comparison and reviewed, append-only Impact updates.
- SQLite-backed users/sessions and server-protected ADMIN tools.
- Separate document library and bottom-right mascot support panel.
- Instant deterministic UI help; optional server-only Flash-Lite for open-ended support with a 10-second fallback budget.

## Architecture
Next.js App Router, React and TypeScript provide the interface; next-intl supplies localization. Prisma/SQLite stores the reviewed project representation, evidence relationships, protected snapshot, events and local users/sessions. Read-only source endpoints serve allowlisted original files. Search, Ask NOVA and Impact use deterministic project logic. The optional official Google Gen AI SDK is server-only; structured answers pass role, link, source and output guards. No paid API is needed for the judged project tools.

## What makes it different
Evidence is part of the interaction rather than an afterthought. We keep approval, delivery, implementation and validation distinct; financial authorization, invoicing and payment are not interchangeable. Baseline/history stays protected when a new event arrives. Support AI helps navigate; it does not replace verified project analysis.

## Challenges encountered
Reconciling conflicting and stale sources, interpreting screenshots and exact spreadsheet locators, keeping French/English identities aligned, preserving baseline integrity during event replay, and adding authentication without disturbing existing project behavior. Gemini latency also required a pragmatic split between instant local help and bounded optional generation.

## Accomplishments
A runnable bilingual project hub with ten verified answers, preserved original evidence, explainable updates and a takeover brief. Final measured test/build results are in FINAL_QA.md; no external awards, adoption or performance metrics are claimed.

## What we learned
Source authority and fact dates matter more than filenames. Uncertainty must remain visible, and a proposal or delivered correction cannot be treated as approval. Deterministic local responses improve demo reliability where generative help adds little value.

## What's next
Broader grounded bilingual support evaluation, follow-up search improvements, trusted-proxy/shared rate limiting, operational authentication recovery/verification and production HTTPS/persistent storage. Multi-project support is future work, not a current feature.

## Add manually in Devpost
Team/member details, event/category selections, requested source/demo links, presentation video and screenshots. Use the supplied ZIP only where the event accepts source attachments. This package does not create a public repository or deployment.
