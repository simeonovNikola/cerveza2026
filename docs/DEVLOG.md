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

## 2026-10-04 03:03 — Iteration 4 audit, SDK and grounded provider

### What changed
- Audited the existing support dialog/mock, auth, roles, route map, repositories, tests and current documentation; created ITERATION_4_PLAN.md before implementation.
- Added the official OpenAI SDK and server-only markers, shared navigation paths, compact bilingual support knowledge and read-only targeted question/fact retrieval.

### OpenAI integration
- Responses API with strict JSON schema, configurable gpt-6-luna fallback, store=false, no tools, output cap, no automatic retries and 12-second deadline.

### Context/retrieval
- Server-derived role, normalized page, locale and Baseline/Current; at most two official questions, four associated facts and six evidence references. No full documents or account records.

### Security
- Same-origin POST, session/IP quotas, secret redaction/refusal, allowlisted route keys, validated output and grounded-source guards. Missing/disabled/error/timeout modes retain local assistance.

### UI
- Preserved support dialog/mascot; added bounded memory-only history, loading/retry, localized local-mode indicator and sources. Global navigation now shares canonical paths with support.

### Tests
- Initial lint and typecheck pass. Deterministic provider, retrieval, API and browser regression coverage in progress.

### Limitations
- No live API call yet; key remains user-managed in ignored .env. Process-local quotas and short client history are intentional hackathon choices.

### Next
- Complete mocked SDK/security tests, browser regression, documentation and final QA.

## 2026-10-04 03:12 — Iteration 4 provider/security and browser validation

### What changed
- Completed provider abstraction, official SDK mocked transport, API role/origin/quotas and bilingual support state regression tests.
- Current project status retrieves all three independent launch conditions; unsupported named IDs do not substitute a known invoice. Baseline links preserve view and anchors.

### OpenAI integration
- Official SDK request verified with fake HTTP only; real API disabled during automated browser runs. Local .env presence check confirms no API key configured.

### Context/retrieval
- Current events remain separate from official baseline prose; source references resolve to questions, originals or event evidence. Feature classification handles “What is Impact Mode/Ask NOVA?”.

### Security
- Forged client roles/system history cannot grant admin support actions. Refusal, redaction, unknown links/sources, provider failure and timeout tested. Session/IP quota and hostile Origin tested against production route.

### UI
- Existing mascot/native dialog preserved. Loading/retry/source/local states work; visual review prompted fixed heading/layout and user-message contrast polish.

### Tests
- Initial full suite: 37 unit tests, production build and 22 browser tests passed; DB verify and original 64-source corpus validation passed. Final expanded unit/browser checks follow visual polish.

### Limitations
- Live Responses check awaits user-provided key and true flag; no streaming, chat persistence or distributed limiter. Model prose is bounded interpretation, not approval or evidence.

### Next
- Finish final checks and current handoff/status/QA documentation. No commit or push.

## 2026-10-04 03:22 — Iteration 4 final QA and handoff

### What changed
- Completed AI_SUPPORT.md, architecture/handoff/status/roadmap/QA/env docs and README/i18n/UI notes; preserved all existing factual data and auth behavior.

### OpenAI integration
- Official Responses SDK, strict schema, configurable model, server-only key, bounded request/output and zero automatic retries. Mocked transport verifies actual SDK calls and env bypass/error behavior.

### Context/retrieval
- Read-only targeted official answers, facts/independent conditions and original/event references; current page/view and trusted role. Known internal route/source resolution and Baseline context preserved.

### Security
- Secret refusal/redaction/output guard, role-aware actions, same-origin check, session/IP quotas and no-store responses. No secret/prompt payload logs, tools, writes or new schema.

### UI
- Mascot/button/dialog retained; localized loading/retry/local indicator/source CTAs and quick prompts, stable heading, readable user messages and mobile keyboard behavior verified.

### Tests
- Final lint/typecheck pass; 38 unit tests, production build and all 22 browser tests pass. DB verify and 64-source/Q01–Q10/baseline corpus validation pass; whitespace check clean. Official SDK fetch is mocked; automated browser AI disabled.

### Limitations
- No local OpenAI key; credentialed live QA remains pending. No streaming/chat DB, keyword retrieval, memory history and process-local quotas. Test transport failure simulation corrected before final pass. No commit/push.

### Next
- User adds OPENAI_API_KEY and true flag locally, restarts and completes AI_SUPPORT.md live checklist. Iteration 5: evaluation/follow-up retrieval and production auth/proxy/limiter/HTTPS/backup readiness.

## 2026-10-04 03:38 — Retrieval-error guard and final production check

### What changed
- Local fallback retains classified factual intent even when DB context retrieval fails, directing to Ask NOVA without substituting an invoice.

### OpenAI integration
- No provider call on unavailable context; model configuration and server-only boundary unchanged.

### Context/retrieval
- Added deterministic unavailable-context regression to existing grounded-fact test.

### Security
- No DB/provider error details or unsupported invoice claims reach the user.

### UI
- Preserved final chat layout, mascot and navigation states.

### Tests
- Final lint/typecheck, all 38 unit tests and production build pass; final focused browser run 4/4 passes after full 22/22 pass. Git: 22 modified, 18 new, zero staged; no commit/push.

### Limitations
- Credentialed live OpenAI check remains pending; local key absent at verification.

### Next
- Configure local key and true flag, restart and run AI_SUPPORT.md live checklist.

## 2026-10-04 03:45 — Gemini resource correction

### What changed
- Replaced the OpenAI provider/dependency with Google’s official @google/genai 2.27.0 after the user identified a Gemini API key as the available resource. Preserved context, roles, routes, evidence guards, fallback and chat/mascot.

### OpenAI integration
- Original OpenAI integration superseded by server-only Gemini Developer API generateContent; no Vertex/OAuth. GEMINI_API_KEY with GOOGLE_API_KEY alias, GEMINI_MODEL default gemini-3.5-flash-lite, GEMINI_SUPPORT_ENABLED=false forces local mode. Configured key enables Gemini by default.

### Context/retrieval
- Existing compact read-only retrieval unchanged; trusted role/page context in systemInstruction, bounded history maps to Gemini user/model roles, same JSON schema and server validation.

### Security
- Google key patterns/aliases scrubbed; no key in body/URL/client/logs. One SDK attempt, 12-second timeout and abort; only completed STOP text accepted, blocks/partial/error responses fall back.

### UI
- Successful response mode changed to gemini; existing local indicator, loading/retry, sources, bilingual prompts and mascot unchanged.

### Tests
- Lint/typecheck, 39 unit tests and production build pass; mocked official SDK covers aliases, schema, secret isolation, default model, errors, safety blocks, incomplete output and cancellation. Full browser regression ongoing with Gemini disabled and both keys cleared.

### Limitations
- No local Gemini/Google key configured; credentialed live check pending. Provider abort does not guarantee cancellation of remote processing/charges.

### Next
- Complete browser QA and updated Gemini handoff; user adds key locally and restarts. No commit/push.

## 2026-10-04 03:48 — Gemini final regression and handoff

### What changed
- Current AI_SUPPORT/HANDOFF/ARCHITECTURE/STATUS/ROADMAP/QA/README and env example now describe Gemini; original provider history retained in DEVLOG/QA/plan.

### OpenAI integration
- OpenAI SDK removed. Google GenAI generateContent is the only live provider; GEMINI/GOOGLE key aliases accepted server-side.

### Context/retrieval
- Existing role-aware grounded context and read-only project summaries unchanged.

### Security
- Both Gemini key aliases cleared and Gemini disabled in automated browser harness; provider tests fully mocked. Real secrets remain user-managed in ignored .env.

### UI
- Existing bilingual support panel, mascot, retry/fallback/sources and accessibility pass.

### Tests
- All 39 unit tests, production build and all 22 browser tests pass; lint/typecheck and DB/corpus/whitespace verification pass.

### Limitations
- No local Gemini/Google key configured; live provider check pending. Existing process-local quota/history/keyword retrieval limits retained.

### Next
- Add GEMINI_API_KEY (or GOOGLE_API_KEY) locally, optionally set GEMINI_MODEL/flag, restart and complete AI_SUPPORT.md live checklist. No commit/push.

## 2026-10-04 04:28 — Gemini live selection and hidden error tracing

### What changed
- Traced root environment, flag/key/model resolution, selection, SDK and UI. Root metadata enabled/key presence true, model gemini-3.5-flash; no old OpenAI selection gate.
- Old API logger set model=null for every local fallback, including real provider failures. Added pure config and private execution diagnostics; public fallback boolean drives the label.

### OpenAI integration
- No OpenAI provider/dependency introduced; old key referenced only for secret scrubbing, never activation.

### Context/retrieval
- Existing grounded read-only context, role derivation and allowlisted routes unchanged.

### Security
- Static safe provider error messages/status/type; no raw SDK message/stack/payload/key logging. Manual diagnostic makes at most one live request; client refreshes on in-process key changes.

### UI
- Local assistance label only for fallback=true; successful Gemini output has fallback=false and no local indicator.

### Tests
- Lint/typecheck, 42 deterministic unit tests and production build pass. Browser regression ongoing with Gemini disabled/keys cleared. Exactly one controlled live check: providerAttempted=true, provider_error, HTTP 401 ApiError. No secret output.

### Limitations
- Current credential rejected by Gemini; accepted live response cannot be verified until credential/resource configuration is corrected locally. Do not rerun live calls in automated tests.

### Next
- Finish browser regression/QA docs; user verifies or replaces key privately and restarts npm run dev.

## 2026-10-04 04:32 — Gemini trace final validation

### What changed
- Completed private provider execution metadata and explicit public fallback contract; updated current handoff/architecture/status/QA and safe manual diagnostic instructions.

### OpenAI integration
- No OpenAI activation dependency; configured Gemini model persists in logs even when fallback is used.

### Context/retrieval
- No project/role/evidence semantics changed.

### Security
- Exactly one authorized live call returned HTTP 401; no credential/raw error logged. Automated tests remain fully mocked/disabled.

### UI
- Browser tests confirm fallback label appears only for fallback=true and is absent on simulated Gemini success.

### Tests
- Lint/typecheck, 42 unit tests, production build and all 22 browser tests pass. Protected factual/auth/Impact/schema paths have no diff; whitespace check clean.

### Limitations
- Gemini rejects the currently configured credential. This cannot be repaired by ignoring provider authentication or falsely reporting live success.

### Next
- Verify/correct local Gemini key/resource access, restart npm run dev, then explicitly rerun manual diagnostic. No commit/push.

## 2026-10-04 — Support panel outside-click dismissal

### What changed
- Clicking or tapping anywhere outside the AI Support panel closes it; clicks inside keep it open. Close button and Escape remain available.
### Files changed
- src/components/support-chat.tsx; tests/e2e/iteration4.spec.ts; docs/DEVLOG.md.
### UI changes
- Added a temporary document pointer listener while the dialog is open, removed on close or unmount.
### Validation
- Lint, typecheck and production build passed. Targeted Playwright check passed on desktop and mobile viewport layouts.
### Known limitations
- No changes to support provider, auth, project data or evidence.
### Next
- None required for this interaction.

## 2026-10-04 — Plain question numbers

### What changed
- Official question badges and jump links display 1 through 10 instead of Q01 through Q10 in both locales.
### Files changed
- src/components/project-pages.tsx; docs/DEVLOG.md.
### UI changes
- Presentation only; original question IDs and anchor destinations remain intact.
### Validation
- Lint and typecheck passed.
### Known limitations
- None for this display change.
### Next
- None required.

## 2026-10-04 — Separate document library and evidence navigation

### What changed
- Removed the sidebar Documents alias to Evidence. Both tabs now have distinct routes and exactly one active sidebar item.
- Added /fr/documents and /en/documents: searchable document cards, category filter, original-file links, and contextual View evidence links preserving baseline view.
- Homepage document CTA and both support route registries now direct users to the library.
### Files changed
- src/components/documents-page.tsx; src/components/hub.tsx; src/components/home.tsx; src/lib/navigation.ts; src/lib/support-ai/routes.ts; src/lib/support-assistant/mock.ts; messages/fr.json; messages/en.json; tests/support.test.ts; tests/e2e/iteration4.spec.ts; docs/DEVLOG.md; docs/ARCHITECTURE.md.
### Schema changes
- None.
### Auth changes
- None.
### UI changes
- Documents provides the library; Traceable Evidence retains the existing source previews, locators, citation modal and deep links.
### i18n changes
- Added matching documentLibrary translations in both locales.
### Validation
- Lint, typecheck, all 42 unit tests and production build passed. Targeted browser test passed for FR/EN routes, all 64 documents, ID search, active sidebar and evidence links preserving baseline.
### Known limitations
- Library search matches metadata; full original-content search remains in Traceable Evidence.
### Next
- None required for this navigation fix.

## 2026-10-04 — Consistent document cards

### What changed
- Document cards now reuse dashboard-card padding and title styling, with a compact file icon/metadata header, consistent content gaps, wrapped titles and bottom-aligned actions.
### Files changed
- src/components/documents-page.tsx; src/styles/enterprise.css; docs/DEVLOG.md.
### Schema changes
- None.
### Auth changes
- None.
### UI changes
- Scoped document-card styling inherits the existing responsive dashboard grid and card padding. Original-file and evidence links remain available.
### i18n changes
- None; existing bilingual labels retained.
### Validation
- Lint, typecheck, production build and existing FR/EN Documents-page browser test passed.
### Known limitations
- No functional changes.
### Next
- None required for this styling adjustment.

## 2026-10-04 — Rechecked live Gemini fallback

### What changed
- Rechecked current root environment using the existing server-only manual diagnostic. No application/configuration changes made.
### OpenAI integration
- None; Gemini remains the configured provider.
### Context/retrieval
- One static navigation/admin-help request only; project corpus unchanged.
### Security
- Logged only enabled/key-presence/model and safe status metadata. No credentials or raw provider errors printed.
### UI
- Local assistance mode is correct for the observed fallback.
### Tests
- Controlled live result: Gemini enabled, key present, model gemini-3.5-flash, providerAttempted true, providerStatus 401, fallbackReason provider_error.
### Limitations
- Google rejected configured credentials. The live assistant requires an accepted Gemini API credential/resource access; restarting alone does not fix authentication rejection.
### Next
- Verify/correct local Gemini credential configuration, restart the dev server, then run the explicit diagnostic again.
