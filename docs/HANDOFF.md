# Team handoff

## Current architecture

Existing Next.js/React components, Prisma SQLite repositories, next-intl /fr and /en routes, a grouped task navigation, interactive search and bilingual custom-question admin. Verified evidence, Q01–Q10 and baseline are unchanged. See ITERATION_2_PLAN.md for audit and risks.

## Install and run

Node 24 recommended (used for all tests; test fixtures use node:sqlite). npm ci, then npm run db:setup, then npm run dev. Open http://127.0.0.1:3000/fr or /en. Stable demo: npm run build, npm run start. No credentials/account/Docker required. Keep the original corpus alongside the app for original previews.

## Database

Commands: db:generate, db:migrate, db:seed, db:verify; db:setup combines them. Canonical runtime file: data/runtime/nova.db, ignored by Git. Stop the app before db:reset: it backs up the generated DB under data/backups, then reconstructs the verified initial state, clearing runtime custom questions/events. Copy a stopped DB plus corpus to move the demo. Do not seed over mismatched original records: the import aborts deliberately.

## Localization

messages/fr.json and en.json must have identical keys. Add both dictionary entries for every UI string. Existing UI catalog is ui.textNNN; new modules use semantic namespaces. Derived English narratives seed from scripts/english-content.mjs; there is one fact/question identity and evidence set. Source quotations and locators stay original; English summaries are labelled translations. Switch preserves route/query/hash. See I18N.md.

## Admin and search

/fr/admin or /en/admin under Tools: create/edit/reorder/deactivate bilingual custom questions, link citations and tags. Q01–Q10, evidence and baseline are read-only in API and DB. Every custom write has an audit record. The CMS has no authentication and is intended for localhost. Details: ADMIN.md.

Search is primary navigation and Ctrl/Cmd K palette: typeahead, categories/status, highlighted snippets, arrows/Enter/Escape. Both-language narratives match shared entities. Original source text may remain French. Details: SEARCH.md.

## Existing features retained

Overview, precise evidence and all 64 originals, timeline/history, Decision DNA, commitments/recommendations, six contradictions, Q01–Q10, Ask NOVA, Impact candidate review/new named facts/baseline comparison/journal import-export and A4 brief. Events now persist in SQLite across browser sessions. Candidates still require explicit human confirmation and declared authority; new delivery cannot close a condition.

## Test

npm run lint; npm run typecheck; npm test; npm run db:verify; python scripts/validate_data.py; npm run build; npm run test:e2e. Chrome required for browser tests. E2E creates data/runtime/e2e.db and uses port 3001; unit DB tests use unit-test.db. Synthetic events never enter nova.db. Native compiler/test runners may require execution permission in this managed sandbox.

## Important paths and safe next work

src/lib/repositories: runtime DB access. src/lib/impact.ts: canonical semantics. src/lib/project-context.tsx: localized presentation adapter. prisma/: schema/migrations/protection. src/styles/: researched tokens and responsive design. data/generated/: reviewed seed fixtures only. docs/QUESTION_ANSWERS.md and baseline.sha256: factual reference. scripts/: ingestion/import/verification.

Safe next tasks: richer query synonyms, event-journal search, audit-history display, scoped team-recommendation editing. Future navigation assistant remains separate from Ask NOVA, with no external API implemented. See ROADMAP.md. Broader admin/auth/cloud/file ingestion remain out of scope. Existing browser localStorage is detected; use the explicit import banner or journal export/import.

Final regression and visual checks are recorded in PROJECT_STATUS.md / QA_REPORT.md. Never modify the original corpus, count copies as corroboration, rewrite Git history, automatically commit/push or silently revise official answers.

Final QA: 18 unit tests and 13 browser tests pass, plus lint/typecheck/build, db:verify and the corpus audit. Bilingual one-page baseline exports: NOVA_BRIEF.pdf / NOVA_BRIEF_EN.pdf. QA_REPORT.md records exact checks; GIT_STATUS.txt records uncommitted work.
