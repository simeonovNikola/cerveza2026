# Engineering log

## 2026-10-03 15:00 — Phase 0 repository audit and ingestion preparation

### What changed
- Inspected repository, source tree, README, CSV manifest and package manifest. Prepared read-only ingestion.
### Files changed
- `.gitignore`, `requirements.txt`, `scripts/ingest.py`, initial `docs/` files.
### Why
- Establish evidence and team documentation before application development.
### Validation performed
- `git status --short`, `rg --files`, Python/Node/npm version checks; source enumeration.
### Known limitations
- No existing web app. PDF/XLSX parser dependencies need installation; screenshots require visual review.
### Next recommended step
- Complete extraction, read PDF instructions, reconcile manifest and identify embedded duplicates.

## 2026-10-03 14:50 — Phases 0–1: corpus inventory complete

### What changed
- 64 sources indexed; 5 embedded attachments and one archived email duplicate identified; instructions and all text reviewed; 8 screenshots visually reviewed.

### Files changed
- scripts/ingest.py, data/generated/documents.json, inventory-report.json, challenge-instructions.json, docs/

### Why
- Evidence first; source originals read-only.

### Validation performed
- python scripts/ingest.py; manual source and screenshot review

### Known limitations
- README actual size 5741 differs from manifest 7103; consignes PDF has damaged extracted accented glyphs; README provides clean full instructions.

### Next recommended step
- Verify ten answers and curate fact ledger

## 2026-10-03 14:50 — Phase 2: Q01–Q10 verified

### What changed
- Ten nuanced answers with precise line, page, cell and screenshot-region locators; financial distinctions and independent corroboration.

### Files changed
- scripts/curate.py, questions.json, citations.json, docs/QUESTION_ANSWERS.md

### Why
- Factual scoring is the primary objective.

### Validation performed
- python scripts/validate_data.py; cross-read all cited passages and screenshots

### Known limitations
- Final dates for retests, CR-04 accounting mechanism and invoice remainder payment unconfirmed.

### Next recommended step
- Represent facts independently and preserve history

## 2026-10-03 14:50 — Phases 3–5: operational model and sealed baseline

### What changed
- 25 facts, 10 people, 4 decisions, 7 actions, 19 timeline events, 6 contradictions; immutable baseline and integrity digest.

### Files changed
- facts.json, people.json, decisions.json, actions.json, timeline.json, contradictions.json, conditions.json, baseline.json, baseline.sha256, scripts/validate_data.py

### Why
- Explain authoritative current state while retaining historical decisions; independently track go-live conditions.

### Validation performed
- python scripts/curate.py; python scripts/validate_data.py

### Known limitations
- Curation is manually reviewed and deterministic; no automatic document authority inference.

### Next recommended step
- Phase 6 application shell using corpus-derived facts

## 2026-10-03 15:15 — Phases 6–9: application and evidence modules

### What changed
- French navy-blue responsive shell, factual dashboard, source explorer/dialog, Decision DNA, timeline, actions, contradictions and ten judge-ready question cards.

### Files changed
- src/app/, src/components/, src/lib/data.ts, package.json, package-lock.json, tsconfig.json, eslint.config.mjs, next.config.ts, docs/

### Why
- Make every major project claim reviewable against precise original evidence.

### Validation performed
- npm run typecheck passed; npm run build passed; lint identified image warning subsequently fixed with unoptimized original Image.

### Known limitations
- PDF preview depends on browser PDF support; extracted text remains available. Original corpus must accompany app for downloads.

### Next recommended step
- Validate event semantics and browser navigation

## 2026-10-03 15:15 — Phase 10: deterministic impact workflow

### What changed
- Clause-based candidates, manual classification/provenance confirmation, conservative state guards, immutable baseline, independent action closure, journal export/import and before-after compare.

### Files changed
- src/lib/impact.ts, src/components/impact-page.tsx, tests/impact.test.ts, src/components/hub.tsx

### Why
- Judge updates must not conflate proposals, approvals, delivery or validation.

### Validation performed
- npm test: nine tests passed after case-insensitive ticket parsing fix; strict typecheck passed.

### Known limitations
- LocalStorage is browser-local; unknown facts require manual subject selection. Node runner requires sandbox escalation here.

### Next recommended step
- Browser-test proposal and single-condition validation flows

## 2026-10-03 15:15 — Phases 11–13: search, takeover brief and accessible polish

### What changed
- Local Ask NOVA question matching/full-text source search; printable one-page brief and text export; responsive navigation, keyboard focus, native evidence dialog, readable state badges.

### Files changed
- src/components/ask-page.tsx, brief.tsx, src/app/globals.css, playwright.config.ts, tests/e2e/hub.spec.ts, docs/

### Why
- No paid API required; uncertain searches remain explicit; portable brief supports takeover.

### Validation performed
- Production build and strict typecheck passed; browser/PDF QA launched.

### Known limitations
- Ask NOVA keyword matching is intentionally limited; no generated unsupported answers.

### Next recommended step
- Phase 14 final browser tests, exact source hashes and printed PDF page count

## 2026-10-03 15:33 — Phase 14: final QA and complete handoff

### What changed
- All modules validated; 64 raw source endpoint hashes checked; one-page A4 PDF exported; metadata and visual-review inventory completed; new named facts and raw event evidence added; timeline appends events; action impacts show before-after status.

### Files changed
- scripts/ingest.py, scripts/validate_data.py, src/lib/impact.ts, src/components/, tests/, docs/PROJECT_STATUS.md, HANDOFF.md, DATA_MODEL.md, QA_REPORT.md, DEMO.md, NOVA_BRIEF.pdf, README.md, data/generated/documents.json

### Why
- Deliver a trustworthy reproducible demo with preserved baseline and explicit limits for teammates.

### Validation performed
- Clean lint; strict typecheck; production build; 10 unit tests; 6 browser tests; 64 source hashes; sealed baseline and canonical data equality; PDF page count = 1; package PDF/illustration hashes match.

### Known limitations
- Keyword matching and human-reviewed impact classification; browser-local event journal; no public deployment or automatic commit.

### Next recommended step
- Rehearse docs/DEMO.md; review locally; export journal for teammate sharing

## 2026-10-03 16:29 — Iteration 2 A/B — audit and refactor plan

### What changed
- Read existing documentation and actual modules/config/tests; verified fixture and immutable source integrity; documented staged DB/i18n/UX/search/admin migration.

### Files changed
- docs/ITERATION_2_PLAN.md, PROJECT_STATUS.md, HANDOFF.md, DEVLOG.md

### Why
- Preserve working evidence semantics before changing persistence or language.

### Validation performed
- python scripts/validate_data.py passes; inspected package versions, routes, engine and existing assertions

### Known limitations
- No DB or i18n exists; events browser-local; original additions untracked.

### Next recommended step
- Phase C Prisma SQLite schema and deterministic equivalence-tested import

## 2026-10-03 16:47 — Phases C-D: verified SQLite import

### What changed
- Added Prisma SQLite schema, protected immutable evidence and baseline, deterministic bilingual seed and exact equivalence checks. Two successive imports passed.

### Files changed
- prisma/, scripts/db-*.mjs, scripts/english-content.mjs, package.json, src/lib/db.ts

### Data/schema changes
- See current phase and DATABASE/DATA_MODEL documentation; original evidence and sealed baseline untouched.

### UI changes
- Existing functionality preserved; details above.

### i18n changes
- Locale changes described above; evidence originals retain their language.

### Validation performed
- Migration, seed, db:verify, repeated seed and db:verify passed; all 10 official answers and 40 citations preserved.

### Known limitations
- Remaining work listed in PROJECT_STATUS and KNOWN_UNCERTAINTIES.

### Next recommended step
- Complete runtime repository migration and full locale routing.

## 2026-10-03 17:03 — Phase E: database runtime repositories

### What changed
- Connected derived project reads, append-only Impact journal, read-only originals and protected custom-question writes to typed Prisma repositories. Original engine assertions remain intact.

### Files changed
- src/lib/repositories/, src/lib/project-context.tsx, src/lib/impact.ts, src/app/api/, tests/fixtures/

### Data/schema changes
- See current phase and DATABASE/DATA_MODEL documentation; original evidence and sealed baseline untouched.

### UI changes
- Existing functionality preserved; details above.

### i18n changes
- Locale changes described above; evidence originals retain their language.

### Validation performed
- All 10 existing engine regression tests passed. DB fixture equivalence passed before runtime switch.

### Known limitations
- Remaining work listed in PROJECT_STATUS and KNOWN_UNCERTAINTIES.

### Next recommended step
- Complete localization and design integration, then browser regressions.

## 2026-10-03 17:03 — Phases F-G: bilingual locale foundation

### What changed
- Added next-intl FR/EN URLs, context-preserving switch, complete UI catalogs and shared localized database presentations.

### Files changed
- messages/, src/i18n/, src/proxy.ts, src/app/[locale]/, src/components/, docs/I18N.md

### Data/schema changes
- See current phase and DATABASE/DATA_MODEL documentation; original evidence and sealed baseline untouched.

### UI changes
- Existing functionality preserved; details above.

### i18n changes
- Locale changes described above; evidence originals retain their language.

### Validation performed
- Dictionary counts checked; English derived records seeded without altering original payloads. Full screen validation remains in final QA.

### Known limitations
- Remaining work listed in PROJECT_STATUS and KNOWN_UNCERTAINTIES.

### Next recommended step
- Apply observed design tokens and verify all routes in the browser.

## 2026-10-03 17:19 — Phases H-J: researched design and simpler navigation

### What changed
- Observed official computed styles in Chrome; applied measured navy/indigo/pill tokens, task-oriented bilingual homepage, five primary destinations and grouped secondary navigation.

### Files changed
- src/styles/, src/components/home.tsx, src/components/hub.tsx, docs/LOTOQUEBEC_DESIGN_SYSTEM.md

### Data/schema changes
- See current phase and DATABASE/DATA_MODEL documentation; original evidence and sealed baseline untouched.

### UI changes
- Existing functionality preserved; details above.

### i18n changes
- Locale changes described above; evidence originals retain their language.

### Validation performed
- Production build passed. Desktop/mobile official reference captured; accessibility and responsive browser suite running.

### Known limitations
- Remaining work listed in PROJECT_STATUS and KNOWN_UNCERTAINTIES.

### Next recommended step
- Finish interactive search/admin browser validation and regression fixes.

## 2026-10-03 17:19 — Phases K-L: interactive search and question bank

### What changed
- Implemented debounced all-entity bilingual search with keyboard palette, counts, filters and snippets; added bilingual custom-question create/edit/deactivate/order/evidence selection with audit trail and official protection.

### Files changed
- src/components/search.tsx, src/components/admin.tsx, src/lib/repositories/, src/app/api/, docs/ADMIN.md, docs/SEARCH.md

### Data/schema changes
- See current phase and DATABASE/DATA_MODEL documentation; original evidence and sealed baseline untouched.

### UI changes
- Existing functionality preserved; details above.

### i18n changes
- Locale changes described above; evidence originals retain their language.

### Validation performed
- 16 unit tests passed including deterministic seed, official protection, custom CRUD, cross-language search and append-only Impact. Isolated E2E suite running.

### Known limitations
- Remaining work listed in PROJECT_STATUS and KNOWN_UNCERTAINTIES.

### Next recommended step
- Resolve browser findings and finalize accessibility, docs and QA.

## 2026-10-03 17:42 — Phases M-N: browser-driven regression fixes

### What changed
- Fixed admin field whitelisting, official protection, whole-word English date parsing, stable-ID Ask matching, canonical condition ordering, contextual locale switching, legacy journal import, updated priority/brief and baseline history notices.

### Files changed
- src/components/, src/lib/, messages/, tests/, docs/

### Data/schema changes
- See current phase and DATABASE/DATA_MODEL documentation; original evidence and sealed baseline untouched.

### UI changes
- Existing functionality preserved; details above.

### i18n changes
- Locale changes described above; evidence originals retain their language.

### Validation performed
- 18 unit tests and corpus/DB verification passed; production build passed. Browser suite exposed issues that have explicit regressions; final rerun follows.

### Known limitations
- Remaining work listed in PROJECT_STATUS and KNOWN_UNCERTAINTIES.

### Next recommended step
- Complete final browser/visual/print QA and demo documentation.

## 2026-10-03 18:39 — Phase N: current-state search and content scopes

### What changed
- Search now replays DB events for current facts/actions, links updated values to event evidence, indexes received journal entries, and distinguishes baseline/current/original/team content. Custom questions are grouped after Q01-Q10 with human-readable navigation.

### Files changed
- src/lib/repositories/search.ts, src/components/project-pages.tsx, src/components/search.tsx, messages/, tests/, docs/SEARCH.md

### Data/schema changes
- See current phase and DATABASE/DATA_MODEL documentation; original evidence and sealed baseline untouched.

### UI changes
- Existing functionality preserved; details above.

### i18n changes
- Locale changes described above; evidence originals retain their language.

### Validation performed
- 18 unit regressions including current search/event evidence passed; lint and strict types passed. Final production/browser rerun in progress.

### Known limitations
- Remaining work listed in PROJECT_STATUS and KNOWN_UNCERTAINTIES.

### Next recommended step
- Finalize QA report, updated one-page bilingual exports, demo guide and handoff.

## 2026-10-03 18:50 — Phases O-P: final documentation and QA complete

### What changed
- Saved current architecture/model/i18n/admin/search/design/roadmap documentation, bilingual demo, final QA and Git status; refreshed both one-page baseline PDFs. All requested runtime features and existing semantics verified.

### Files changed
- docs/, README.md, src/, prisma/, messages/, scripts/, tests/, package/config files

### Data/schema changes
- See current phase and DATABASE/DATA_MODEL documentation; original evidence and sealed baseline untouched.

### UI changes
- Existing functionality preserved; details above.

### i18n changes
- Locale changes described above; evidence originals retain their language.

### Validation performed
- 18 unit tests; 13 browser tests; lint/typecheck/build; repeated migration/seed/db:verify; 64 source byte hashes and baseline audit; package PDF/image hashes; manual FR/EN context/layout; one A4 page in each language; main.py unchanged.

### Known limitations
- Remaining work listed in PROJECT_STATUS and KNOWN_UNCERTAINTIES.

### Next recommended step
- Rehearse the bilingual demo using a separate simulation database; future assistant remains roadmap-only.

## 2026-10-04 02:02 — Audit and additive auth schema

### What changed
- Audited actual routes/docs; backed up runtime DB; added User/Role/Session without altering project tables. Seed admin from env without resetting existing users.

### Files changed
- docs/ITERATION_3_PLAN.md, prisma/, scripts/password.mjs, scripts/db-seed.mjs, .env.example

### Schema changes
- Additive auth tables only; canonical project records unchanged.

### Auth changes
- Server-side DB sessions and role enforcement; see AUTH.md.

### UI changes
- Compact dashboard and localized account/support flows.

### i18n changes
- Matching auth/support/dashboard namespaces in FR and EN.

### Validation
- Initial typecheck passed; 24 unit tests passed. Browser/build QA ongoing.

### Known limitations
- Local mock only; role editing deferred.

### Next
- Complete browser/security/responsive regression and final documentation.

## 2026-10-04 02:02 — Authentication and admin access

### What changed
- Added salted scrypt, DB sessions, server guards including query aliases, same-origin mutations, local attempt limit, bilingual auth and read-only-role user management with lockout guards.

### Files changed
- src/lib/auth/, src/app/api/auth/, src/app/api/admin/, src/components/auth-page.tsx, users-page.tsx

### Schema changes
- Additive auth tables only; canonical project records unchanged.

### Auth changes
- Server-side DB sessions and role enforcement; see AUTH.md.

### UI changes
- Compact dashboard and localized account/support flows.

### i18n changes
- Matching auth/support/dashboard namespaces in FR and EN.

### Validation
- Initial typecheck passed; 24 unit tests passed. Browser/build QA ongoing.

### Known limitations
- Local mock only; role editing deferred.

### Next
- Complete browser/security/responsive regression and final documentation.

## 2026-10-04 02:02 — Dashboard and mock support

### What changed
- Added sidebar, six DB-derived cards, timeline/documents, removed About and module locale controls, simplified admin table; reused inspected mascot and added separate navigation mock API/native dialog.

### Files changed
- src/components/, src/lib/support-assistant/, messages/, src/styles/, public/nova-support-mascot.png

### Schema changes
- Additive auth tables only; canonical project records unchanged.

### Auth changes
- Server-side DB sessions and role enforcement; see AUTH.md.

### UI changes
- Compact dashboard and localized account/support flows.

### i18n changes
- Matching auth/support/dashboard namespaces in FR and EN.

### Validation
- Initial typecheck passed; 24 unit tests passed. Browser/build QA ongoing.

### Known limitations
- Local mock only; role editing deferred.

### Next
- Complete browser/security/responsive regression and final documentation.

## 2026-10-04 02:31 — Iteration 3 responsive, security and final QA

### What changed
- Completed accessible chat focus wrapping/restoration, evidence metadata disclosure, real header question submission, mobile auth and visual spacing fixes.
- Verified production auth/role behavior and original project truth; finished current documentation and handoff.

### Files changed
- src/components/, src/lib/auth/, src/lib/support-assistant/, src/app/api/, scripts/, messages/, tests/, docs/, README.md, next-env.d.ts (generated production type references).

### Schema changes
- Additive 202610040001_auth only; original data/triggers/Q01–Q10/baseline unchanged. Pre-change DB backup retained under ignored data/backups.

### Auth changes
- Seeded admin@example.com with random credentials in ignored local .env. Same-origin validation uses actual Host and protocol. API audits attribute the admin ID. Expired sessions show localized login guidance. Default-only reset path guarded.

### UI changes
- Sidebar/grid responsive spacing, six compact factual cards, advanced evidence on demand, clean Question Bank; auth card padding and separate support prompt chips. Missing asset fallback tested.

### i18n changes
- Auth/support/dashboard dictionaries match; UTF-8 normalized, FR accents and EN punctuation reviewed. Global locale retained; module switches removed.

### Validation
- npm run lint/typecheck/build pass; npm test 25 passed; full npm run test:e2e 18 passed and final focused Iteration 3 run 5 passed.
- Repeated db:setup/db:verify and corpus audit pass; all 64 sources byte-identical, official answers/baseline unchanged. Desktop/mobile auth/dashboard/chat/admin screenshots reviewed.
- git diff --check clean; no factual-data/main.py/QUESTION_ANSWERS diff; secrets/DB/backups ignored. No commit/push.

### Known limitations
- Normal judge project access remains public. Roles read-only; password recovery/email verification/MFA/session cleanup/distributed rate limiter deferred. Support uses mock only. SQLite persistence and production HTTPS required.
- Windows Prisma generation requires stopped servers to avoid DLL lock; native tooling required sandbox approvals.

### Next
- Iteration 4: credential recovery/rotation, email verification, expired-session cleanup, production rate limiting/HTTPS and backup readiness; optional audited role editing afterward.
