# Iteration 2 — audit and implementation plan

## Verified current state (2026-10-03)

- Next.js 16.3.8 / React 19.3.0, strict TypeScript 5.9.3, App Router. One client Hub selected by `?page=`; source endpoint is server-only.
- `src/lib/data.ts` imports generated JSON into client bundles. These are build-time fixtures, not runtime persistence. No database/ORM exists.
- Impact engine replays browser localStorage events over a deep copy of baseline. Tests cover proposal/approval, delivery/validation, chronology, independent conditions and new facts.
- All visible UI and derived narratives are French literals. No locale router or translation library exists. Evidence is French and must stay French.
- Search is a small client substring list of eight documents plus keyword-based Ask NOVA. No shared multi-entity index, ranking or keyboard palette.
- Nine primary navigation buttons expose internal architecture; homepage assumes user understands NOVA. CSS has 390px responsive rules but small dense copy.
- Data audit passes: 64 original hashes, 25 facts, 40 citations, ten official questions, three conditions and sealed baseline match. Existing tests: ten engine tests / six browser tests. No teammate edits or AGENTS.md found; existing additions are untracked and must be preserved.

## Risks and controls

1. Database import must preserve exact canonical JSON payloads, original SHA-256 and Q01–Q10 wording/evidence. Verify equivalence before switching runtime readers.
2. Language is presentation only: one underlying fact and evidence relationship; English overlays never become original evidence.
3. Refactoring the engine must change dependency injection, not its decision rules. Retain all assertions and add English parsing coverage.
4. Browser journals cannot be silently lost. Provide validated, explicit legacy import into append-only DB events; keep export/import.
5. DB seed is idempotent and must not delete custom questions or events. Baseline, evidence, official questions and canonical tables protected against writes.
6. Admin local-demo scope: custom bilingual question CRUD/activation/order only; no source or baseline mutation. Audit changes and validate evidence links.

## Sequence

A/B — audit and this plan, status/handoff/log updates before installing packages.

C/D — SQLite + Prisma 6 schema, checked-in SQL migration, deterministic seed from existing fixtures, equivalence verification, protected baseline and read-only evidence relations.

E — typed repository/service layer, request-scoped project provider, DB event persistence; fixtures remain ingestion/test/export inputs only.

F/G — next-intl dictionaries and `/fr`, `/en` locale routes, context-preserving language switch; localized derived DB overlays, original-evidence labeling, Intl dates/numbers. Fully localize existing modules and engine result reasons.

H/I/J — inspect public official Loto-Québec site in actual browser and capture computed styles; document observations and tokens. Simplify to Home / Project / Actions / Evidence / Search with project subnavigation and Tools. Add onboarding, three factual priorities and task entry points.

K — typed multi-entity DB search, bilingual matching, ranking, filtered result types, command palette with keyboard navigation, snippets and highlights.

L — bilingual custom question manager, protected official rows, validated citation relationships, timestamps/audit log.

M–P — accessibility/responsive review, preserved engine and adapted browser regression tests, database/i18n/admin/search tests, full docs/demo/handoff and final QA.

## Implementation choices

Prisma 6 is intentionally pinned: stable SQLite support without introducing another native database adapter. JSON payload columns preserve lossless provenance while entity tables, searchable/localized fields and relation tables form the canonical DB model. Generated JSON stays reproducible input; runtime never reads it.

next-intl handles locale dictionaries and formatting; URL locale prefixes preserve route/query/hash context. Existing modules are refactored in place around a typed project context and localized data; no feature is discarded.

No external AI/API integration. Future bilingual NOVA Navigation Assistant remains separate from factual Ask NOVA and is documented in roadmap.
