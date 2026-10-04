# Gemini request/deadline QA — 2026-10-04

Latest results supersede the earlier HTTP 401 investigation. Official installed/npm-latest SDK is @google/genai 2.27.0. Minimal default-thinking request returned Google 504/DEADLINE_EXCEEDED ("Deadline expired before operation could complete."), without the local abort firing. MINIMAL thinking smoke succeeded and final npm run ai:smoke returned success=true/providerStatus=200. Staged system instruction, actual NOVA context and full production JSON client/guard passed. Simple normal-message probe and later complete ADMIN_HELP/NAVIGATION wrapper calls still received Google 504 around 29.6 seconds; timeoutOrigin=google and localTimeoutFired=false. Live service reliability remains limited, not a credential or demonstrated schema incompatibility.

Validation: lint/typecheck/build pass, all 45 mocked/deterministic unit tests pass, all six support/document browser tests pass. New tests cover raw Google code/redacted message, Google versus SDK/application timeout, completed plain text and guarded JSON. No real provider calls in automated tests. No protected auth/DB/fact/Q01–Q10/baseline/evidence/Impact code changed.

Changes: support-ai client/config/diagnostics/service/types and new response parser; support-chat browser timeout; package developer commands; scripts/ai-smoke.ts, ai-support-stages.ts, support-check.ts; SDK fixture/unit tests; AI_SUPPORT/architecture/handoff/status/roadmap/devlog/QA documentation. SDK/application/browser deadlines 30/32/40 seconds. Gemini 3 Flash-family models use MINIMAL thinking, no candidateCount, 2,048-token cap. No SDK upgrade, env key/model edit, commit or push. Restart npm run dev. Historical QA follows.

---
# Gemini live tracing fix — final QA 2026-10-04

Current result: provider selection works. Exactly one authorized live diagnostic with root .env made a Gemini request and received HTTP 401 ApiError. Config resolved enabled=true, hasApiKey=true and model=gemini-3.5-flash. No key/raw error payload was logged. The prior model:null/fallback=true log masked all provider failures and was not evidence of a skipped call.

| Check | Result |
|---|---|
| lint / typecheck / production build | Pass |
| npm test | All 42 pass; provider transport mocked, never real API |
| npm run test:e2e | All 22 pass; key aliases cleared and Gemini disabled in isolated harness |
| Config | true/false parsing/whitespace/case, aliases, default/explicit model, OPENAI independence tested |
| Trace | Selection bypass vs attempt/success/failure/timeout/context/guard/refusal reasons distinguished |
| Credentials | SDK client refreshes when in-process key changes; actual key never in safe metadata |
| Errors | Status/type/static message only; raw message/stack/payload excluded, HTTP 401 reproduced once |
| UI | Explicit public fallback boolean controls local assistance label; simulated Gemini success has no indicator |
| Preserved | No Q01–Q10/fact/baseline/evidence/corpus/auth/Impact/schema diff; original regressions pass |
| Live success | Pending accepted Gemini credentials/resource access; current local key rejected by provider |

Changed files: src/lib/support-ai/config.ts, diagnostics.ts, client.ts, index.ts, service.ts, types.ts; src/app/api/support-chat/route.ts; src/components/support-chat.tsx; scripts/support-check.ts; tests/support-ai.test.ts, tests/fixtures/support-sdk.ts, tests/e2e/iteration4.spec.ts; docs/AI_SUPPORT.md, ARCHITECTURE.md, HANDOFF.md, PROJECT_STATUS.md, DEVLOG.md, QA_REPORT.md. next-env.d.ts contains normal build-generated production type references. No commit/push; whitespace check clean.

Restart npm run dev after environment changes; validate the key/resource in Google AI Studio before another explicit manual live check. scripts/support-check.ts is never run by automated tests. Exact log fields/reasons and command are documented in AI_SUPPORT.md. Historical reports follow.

---

# Iteration 4 Gemini correction — final QA 2026-10-04

Current provider is Google Gemini, following the user’s resource correction. Earlier provider reports below are historical.

| Check | Result |
|---|---|
| lint / typecheck | Pass |
| npm test | 39 passed; official @google/genai uses mocked HTTP only |
| npm run build | Pass with server-only Gemini SDK |
| npm run test:e2e | Full 22 passed; Gemini disabled and both accepted keys cleared by harness |
| Provider | Native generateContent, system context, user/model history, JSON schema, completed STOP requirement, no tools |
| Configuration | GEMINI_API_KEY preferred; GOOGLE_API_KEY alias; GEMINI_MODEL default gemini-3.5-flash-lite; false flag forces local, otherwise key enables provider |
| Reliability | One HTTP attempt, 12-second timeout/abort; errors, safety blocks, incomplete or invalid text fall back |
| Security | Server-only import guard; key not in request body/URL/client; Google key patterns scrubbed, role/action/source guards retained |
| Data | db:verify and corpus audit pass; baseline/Q01–Q10/64 originals unchanged; no schema migration |
| Existing app | FR/EN, auth/admin, search, Ask NOVA, Impact, evidence, brief, chat/mascot and responsive regressions pass |
| Live Gemini | Pending: neither accepted key variable configured locally; no real API call made |
| Git | Changes uncommitted/unstaged; no push; local secrets/DB/artifacts ignored |

The official SDK test verifies the actual Google endpoint, header-only fake API key, native request/response format, model default and aliases, no retries on 503, blocked/incomplete fallback and abort. Real key permissions/model availability/quota must still be checked locally after configuration and restart. Current architecture/setup is AI_SUPPORT.md.

---

# Original Iteration 4 OpenAI QA — historical 2026-10-04

| Check | Result |
|---|---|
| npm run lint | Pass, no errors/warnings |
| npm run typecheck | Pass |
| npm test | 38 passed, including existing regressions and mocked SDK/provider/retrieval/security tests |
| npm run build | Pass, production server-only Responses route and localized app |
| npm run test:e2e | All 22 passed; final focused support run 4 passed after retrieval-error refinement; no paid API requests |
| npm run db:verify | Pass; original records, official answers/relations, sealed baseline and foreign keys unchanged |
| python scripts/validate_data.py | Pass; all 64 original hashes, Q01–Q10, baseline, graph, evidence and arithmetic |
| Provider configuration | Disabled flag/missing key bypass provider; env adapter tested using official SDK fake transport |
| Provider reliability | Strict schema request, store=false, output cap, zero retries; error/malformed/unsafe/incomplete output and deadline use local fallback |
| Grounding | Only targeted official questions/linked facts and evidence; unknown entity ID not substituted; current accepted security closes its condition only, baseline answers unchanged |
| Role/security | API derives GUEST/USER/ADMIN from DB session; forged client ADMIN/system history cannot grant admin CTA; actual ADMIN gets Users/Question Bank |
| Navigation | Known localized keys only; arbitrary URLs/unknown keys dropped, sources must be retrieved; Baseline query/anchors preserved |
| Secret handling | Server-only import guard; prompt/body excludes key/session/user secrets; generated known secret rejected; injection refuses before provider |
| Cost controls | Same-origin hostile POST rejected, 15/min session and 30/min IP quota, bounded map/history/context/output, localized 429 and Retry-After |
| FR/EN | Local/current-page/Impact/auth/admin/support replies, welcome/quick prompts/loading/retry/local-mode/source labels verified |
| UI | Existing mascot/button/native dialog/fallback, Tab/Escape, loading/retry/source links; 390px no page overflow; heading retained and user text contrast fixed |
| Existing flows | Auth/register/login/logout/admin protection, user activation, custom questions, Q01–Q10, evidence hashes/locators, search, Impact, Ask NOVA and brief PDF pass |
| Live OpenAI | Pending: local key presence check false. No live call attempted; exact manual steps in AI_SUPPORT.md |
| Git/data | Uncommitted intended changes only; no push; env/DB/artifacts ignored; no schema/migration/corpus/mascot/canonical-fixture changes |

The official SDK is exercised with replaced HTTP transport, never a real key or network API. Browser harness explicitly clears the key and sets OPENAI_SUPPORT_ENABLED=false. Real provider behavior/cost/latency must still be checked after the user configures a key and true flag, then restarts.

Screenshots reviewed: ignored artifacts/iteration4-chat-en.png and iteration4-chat-mobile.png, plus existing dashboard/auth/admin/mascot artifacts from regression runs. Initial 37-unit/22-browser pass was followed by final 38-unit/22-browser pass after view/classification/condition and visual refinements. A test double originally replaced global fetch after SDK initialization; it was corrected to change the captured mock transport behavior, then the full suite passed. No production workaround or real API request was involved.

Current limits: bounded keyword retrieval and model interpretation, memory-only history, no streaming, no chat persistence, process-local quotas and trusted forwarded IP requirement. This is not a distributed production abuse system or a factual approval engine. See AI_SUPPORT.md/ROADMAP.md.

---

# Iteration 3 final QA — 2026-10-04

Historical Iteration 3 results; current Iteration 4 results are above.

| Check | Result |
|---|---|
| npm run lint | Pass, no errors/warnings |
| npm run typecheck | Pass |
| npm test | 25 passed; all 18 existing tests plus auth/session/seed/support coverage |
| npm run build | Pass, production dynamic localized pages and protected APIs |
| npm run test:e2e | All 18 passed; final focused Iteration 3 run: 5 passed |
| npm run db:setup | Pass; additive migration and repeat admin seed preserve canonical data/users |
| npm run db:verify | Pass; original entities, official answers/evidence relationships, baseline and foreign keys identical |
| python scripts/validate_data.py | Pass; 64 original hashes, Q01–Q10, baseline, citations, graph, conditions and arithmetic |
| Auth | FR/EN login/register succeed; invalid/nonexistent/disabled login and duplicate email rejected; public role USER, salted hash verified |
| Sessions | httpOnly/Lax/production Secure cookie verified; opaque digest storage, expiry and logout invalidation; deactivation revokes sessions |
| Admin security | Anonymous redirect for children/aliases; USER denied; ADMIN allowed; APIs enforce role, reject hostile Origin, omit passwordHash from user responses |
| Admin features | User search/deactivation/self-lockout; question create/edit/deactivate and official write denial; table uses global locale |
| Support | FR/EN intents/unknown fallback/localized existing-route CTAs; mascot loads and fallback tested; Tab containment and Escape verified |
| Existing behavior | Search typeahead/filter/keyboard/scopes, Ask NOVA sourced/uncertain responses, Impact independent conditions/new facts/history/persistence/imports, evidence source-byte hashes and brief PDF preserved |
| UI | About absent, six concise cards, role-aware sidebar, one global evidence locale switch, precise locator remains visible, source metadata disclosed on demand |
| Responsive/visual | 390px mobile, 820px tablet and desktop; auth mobile no horizontal overflow; screenshots reviewed for auth/dashboard/chat/admin |
| Git/data | No generated factual data, QUESTION_ANSWERS.md or main.py diff; no commit/push; .env/DB/backup/artifacts ignored |

Browser screenshots under ignored artifacts/: iteration3-home-fr/en-desktop.png, iteration3-fr/en-mobile.png, iteration3-login-fr/en.png, iteration3-register-fr/en.png, iteration3-chat-fr/en.png, iteration3-question-bank.png. Source originals and old PDFs remain unchanged; brief export regression still runs.

Issues found and fixed: Windows PowerShell new-file encoding and lost new punctuation; Next internal hostname versus actual Origin/Host validation; HTTP API test clients omitting Secure cookies; ambiguous sidebar/route-announcer test selectors; tablet sidebar overlap; card/auth padding; missing-image test intercepted wrong optimized URL; send disabling dropped focus (explicit return to input plus Tab wrapping). Windows compiler/test runner required sandbox escalation. Running Prisma generation while a server held its DLL caused EPERM; repeat setup with servers stopped passed. Stop servers before db:setup on Windows.

Security/product limits: public judge-friendly project tools, local process limiter only, no credential recovery/email verification/MFA/role editing, manual expired-session cleanup, deterministic support only. See AUTH.md/ROADMAP.md. No fabricated project status or live unresolved-risk count: contradictions explicitly historical.

---

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
