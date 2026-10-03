# Architecture

Next.js 16.3.8 App Router, React 19.3, strict TypeScript, Lucide, CSS tokens, next-intl 4, Prisma 6.19 / SQLite. Existing evidence components and Impact semantics were adapted, not replaced. The original repository demonstration main.py remains intact.

Locale routes /fr and /en share neutral module slugs. Request dictionaries and server-loaded localized DB presentations are passed through NextIntlClientProvider and ProjectProvider. Hub coordinates grouped routes, baseline/current view, evidence modal and journal. Source previews retain original text and exact locators.

The canonical runtime store is data/runtime/nova.db. src/lib/repositories/project.ts loads all normalized records and the protected snapshot; questions.ts manages custom bilingual content; impact.ts validates and appends events transactionally; search.ts ranks typed entities from DB-derived records. Runtime components never import generated JSON values. The type-only definitions in lib/data.ts are erased contracts.

Ingestion remains the original read-only Python pipeline. Generated JSON retains reviewed facts/locators and reproducible seed fixtures. Prisma migration foreign keys and triggers protect original records and the baseline. English overlays are presentation only; canonical French payloads remain exact. db:verify checks equivalence, official question evidence/fact sets and source relationships.

State engine: createImpactEngine(canonicalBaseline) injects the immutable snapshot. It replays append-only events on a copy, preserving proposal/approval and delivery/validation distinctions. The UI translates rule explanations separately. Each condition closes only when its linked current fact is validated. Event raw text/provenance remains original, with declared moderate evidence. Current question pages retain baseline answers with changed-fact overlays; initial decision/contradiction history remains initial history.

Persistence moved from browser localStorage to server SQLite. Every browser sees the local database journal. Export/import remains available; imports merge exact duplicate IDs and refuse conflicting content atomically. Existing browser journals are detected and offered for explicit import into SQLite; the original browser journal remains untouched. No original document or baseline write route exists.

Search uses deterministic normalized token matching across DB records, both languages, typed filters and snippets. A native-dialog command palette supplies keyboard entry. Ask NOVA remains a separate local factual question matcher; future navigation AI is roadmap-only. No external AI/API credentials.

Admin is a narrow local demo CMS for custom questions, bilingual validation, evidence links, ordering/deactivation and audit. Official questions are fully protected. No enterprise authentication, cloud or distributed infrastructure.

Deployment: local Node server with writable persistent SQLite file and corpus folder. Initialize with npm ci and npm run db:setup. Tests use independent databases and port 3001; production app uses 3000. SQLite portability excludes ephemeral filesystem hosting unless persistence is separately configured. See DATABASE.md, I18N.md and HANDOFF.md.

Search uses the same canonical event replay as Impact to display current fact/action states; official question/decision/history records retain explicit Baseline scope. Received event evidence/timeline records are indexed, and changed facts open their event proof rather than an old citation.
