# Iteration 2 final QA — 2026-10-03

Validated with Node 24.21, Next.js 16.3.8, React 19.3, Prisma 6.19, next-intl 4.14.9 and installed Chrome. Existing features and official factual content are retained.

| Check | Result |
|---|---|
| npm run lint | Pass, no errors/warnings |
| npm run typecheck | Pass, strict TypeScript |
| npm test | 18 tests pass: 10 preserved engine tests + DB/i18n/search/admin/Ask/parser regressions |
| npm run build | Pass, dynamic locale pages and database API routes |
| npm run test:e2e | 13 browser tests pass |
| db:migrate / db:seed / db:verify | Pass; repeat import deterministic; all original records/evidence sets equal reviewed fixtures |
| python scripts/validate_data.py | 64 original hashes, sealed baseline, Q01–Q10, citations, graph and financial arithmetic pass |
| Source endpoint | All 64 responses byte-identical; unknown ID 404 |
| Challenge PDF/image | SHA-256 matches original package manifest; absent ZIP remains documented |
| Baseline and official protection | API plus SQL mutation rejection; unchanged snapshot and SHA-256 |
| Bilingual content | Shared IDs/evidence, matching dictionaries, all critical EN/FR screens, no key leakage |
| Custom questions | Create/edit/disable, bilingual validation, audit, fresh-browser DB persistence, mobile layout; official questions protected |
| Search | Eight entity types, bilingual matching, current-state replay, event-specific evidence, filters, highlights, counts, native keyboard controls |
| Locale context | Route/query/hash, source selection, search query/filter and proof citation retained; immediate Baseline switch race fixed |
| Impact | Proposal/delivery/validation distinctions, independently closed conditions, new facts, persistence, import/export and earlier-browser migration |
| Responsive | 390px mobile, 820px tablet and desktop; no tested body overflow |
| Print | French and English briefs each exactly one A4 page, counted with pypdf |
| Original code / Git | main.py unchanged; no commit/push/reset/history rewrite |

Browser coverage retains all six previous feature tests and adds bilingual onboarding/two-click evidence, modal language switching, command search, question CRUD, all English critical screens, English Impact, explicit legacy import and malformed legacy handling. Synthetic events and admin questions use data/runtime/e2e.db, never nova.db. Unit DB tests use unit-test.db.

Additional production browser review generated desktop/mobile FR/EN screenshots, checked baseline 0/3, exact proof/summary labels, source/search/citation context on switching, print exports and zero page/i18n errors. Artifacts live under ignored artifacts/. Reviewed images show layered navigation, measured navy/indigo controls and readable white surfaces.

Issues corrected during QA: admin metadata was accidentally submitted with editable fields (service now whitelists); English validated matched date (whole-word rule); official Ask lookup depended on list position (stable ID now); DB condition alphabetical order differed from snapshot (canonical order restored); locale switching could race the URL update (selected view now carried explicitly); native search selects needed their own keyboard behavior; custom question IDs/labels needed readable grouping.

Known scoped limits: local unauthenticated admin; no external AI/API; raw evidence/events stay in their original language; authority is declared and reviewed by a human; SQLite deployment needs writable persistent disk. No factual correction or source rewrite introduced. See KNOWN_UNCERTAINTIES.md and ROADMAP.md.
