# Architecture

Next.js 16.3.8 App Router, React 19.3, strict TypeScript, Lucide, CSS tokens, next-intl 4, Prisma 6.19 / SQLite. Existing evidence components and Impact semantics were adapted, not replaced. The original repository demonstration remains intact outside this curated runnable package.

Locale routes /fr and /en share neutral module slugs. Request dictionaries and server-loaded localized DB presentations are passed through NextIntlClientProvider and ProjectProvider. Hub coordinates grouped routes, baseline/current view, evidence modal and journal. Source previews retain original text and exact locators.

The canonical runtime store is data/runtime/nova.db. src/lib/repositories/project.ts loads all normalized records and the protected snapshot; questions.ts manages custom bilingual content; impact.ts validates and appends events transactionally; search.ts ranks typed entities from DB-derived records. Runtime components never import generated JSON values. The type-only definitions in lib/data.ts are erased contracts.

Ingestion remains the original read-only Python pipeline. Generated JSON retains reviewed facts/locators and reproducible seed fixtures. Prisma migration foreign keys and triggers protect original records and the baseline. English overlays are presentation only; canonical French payloads remain exact. db:verify checks equivalence, official question evidence/fact sets and source relationships.

State engine: createImpactEngine(canonicalBaseline) injects the immutable snapshot. It replays append-only events on a copy, preserving proposal/approval and delivery/validation distinctions. The UI translates rule explanations separately. Each condition closes only when its linked current fact is validated. Event raw text/provenance remains original, with declared moderate evidence. Current question pages retain baseline answers with changed-fact overlays; initial decision/contradiction history remains initial history.

Persistence moved from browser localStorage to server SQLite. Every browser sees the local database journal. Export/import remains available; imports merge exact duplicate IDs and refuse conflicting content atomically. Existing browser journals are detected and offered for explicit import into SQLite; the original browser journal remains untouched. No original document or baseline write route exists.

Search uses deterministic normalized token matching across DB records, both languages, typed filters and snippets. A native-dialog command palette supplies keyboard entry. Ask NOVA remains a separate local factual question matcher; navigation support uses a separate grounded provider with a preserved local fallback. Gemini credentials are server-only; Ask NOVA remains local.

Admin is a narrow local demo CMS for custom questions, bilingual validation, evidence links, ordering/deactivation and audit. Official questions are fully protected. Local DB-backed auth now protects admin; no external auth/cloud/distributed infrastructure.

Deployment: local Node server with writable persistent SQLite file and corpus folder. Initialize with npm ci and npm run db:setup. Tests use independent databases and port 3001; production app uses 3000. SQLite portability excludes ephemeral filesystem hosting unless persistence is separately configured. See DATABASE.md, I18N.md and HANDOFF.md.

Search uses the same canonical event replay as Impact to display current fact/action states; official question/decision/history records retain explicit Baseline scope. Received event evidence/timeline records are indexed, and changed facts open their event proof rather than an old citation.


## Iteration 3
Additive User/Role/Session models; Node scrypt password helpers shared with seed; HMAC-digested opaque DB sessions and Next httpOnly cookies. Server catch-all route guards admin children and query aliases; API guards verify session, ADMIN and same-origin mutation. No edge Prisma dependency added to locale proxy. Public judge project flow retained. User management is separate from Person (project responsible people).

Hub retains the existing engine/context/modals with a sidebar/grid shell and server-passed safe user DTO. Header question form submits to existing Ask NOVA; Ctrl/Cmd K retains interactive search. Native support dialog calls POST /api/support-chat and lib/support-assistant provider. Navigation-only deterministic replies with localized route CTAs; no factual generation or external provider. Auth details in AUTH.md; no canonical schema/payload modifications.

## Iteration 4

`src/lib/navigation.ts` supplies canonical path slugs to Hub/mock/support. `src/lib/support-ai/routes.ts` supplies bilingual product knowledge and role-aware route allowlist. The support POST resolves the existing session server-side, validates locale/page/history/view and applies same-origin/session-IP cost controls.

A bounded intent classifier selects relevant product sections. Known help is local; factual questions redirect to Ask NOVA before DB retrieval. Current values use the unchanged canonical Impact replay; Baseline answers stay explicitly separate. No user/session rows, full documents or source corpus enter provider context. No schema migration or write tools were added.

One lazy server-only official Google GenAI SDK client calls Gemini generateContent with strict JSON schema, output cap and deadline. Environment controls provider/model; service validates output and resolves only known authorized route/source IDs. Disabled/missing/error/unsafe modes use the retained mock. Client receives plaintext, safe localized actions/sources and mode; current page and bounded memory history improve help without client role authority.

Native chat/mascot remains; loading/retry/local-mode/source states added. No streaming or persisted chat logs this iteration. Automated provider/SDK tests use injected/fake transports; browser server forces local mode. See AI_SUPPORT.md and QA_REPORT.md. The original Iteration 3 description above records the pre-AI support architecture.

Support config.ts is a pure metadata/timeout resolver. diagnostics.ts extracts only redacted, bounded Google JSON error status/code/message fields; full payloads/stacks remain unlogged. index.ts reads process.env and logs safe configuration. service.ts reports selection/attempt/fallback and timeout source through an internal observer; the API serializes only public reply/actions/fallback. client.ts refreshes on credential changes, uses Gemini 3 Flash-family MINIMAL thinking, no candidateCount, a 2,048-token cap and SDK deadline of 10 seconds. App/browser deadlines are 10/15 seconds. response.ts accepts completed text and parses JSON; output grounding/role/source validation remains unchanged. scripts/support-check.ts, ai-smoke.ts and ai-support-stages.ts are explicitly invoked developer diagnostics, separate from automated tests.

## Separate document library and evidence explorer

`/fr/documents` and `/en/documents` show a metadata-searchable, category-filtered original document library using the existing read-only ProjectProvider. Each card opens its original through `/api/sources/:id` or links to `/[locale]/evidence?source=:id` with baseline view preserved. The existing evidence explorer and citation deep links remain intact. The sidebar, homepage CTA and support route registry distinguish these pages; only the current sidebar route is active. No database or authentication changes were required.


## Final latency policy
Known NAVIGATION/ADMIN_HELP/AUTH_HELP/SEARCH_HELP/IMPACT_HELP and known feature explanations are deterministic local replies. Project-fact requests redirect locally to Ask NOVA without retrieval. Optional Gemini is limited to general/unknown/open-ended feature help, with Flash-Lite and a 10-second budget. Existing retrieval/grounding helpers are retained but not used for project-fact generation in this mode.
