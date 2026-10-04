# SQLite application store

NOVA 360 uses SQLite through Prisma 6.19. SQLite is a local file at `data/runtime/nova.db`; it requires no account, Docker, server or credentials. `DATABASE_URL` configures Prisma migrations and runtime; defaults to file:../data/runtime/nova.db in setup scripts. `NOVA_DATABASE_URL` overrides runtime/seed clients for isolated tests.

## Sources of truth

The original 64 challenge files are immutable evidence. Generated JSON is the reviewed, reproducible import fixture. **Runtime screens read database repositories**, not these JSON files. The DB stores normalized derived entities and their lossless reviewed payloads, citations, localized summaries, custom questions, and an append-only event journal. Source binaries stay on disk and are served by stable ID through a path-restricted read-only endpoint.

`src/lib/repositories/project.ts` loads the sealed canonical snapshot and localized presentation records. `questions.ts` manages custom content. `impact.ts` replays the preserved engine over DB events. `search.ts` searches database-derived entities. Type-only JSON imports establish existing TypeScript contracts; they are erased and do not load runtime data.

## Setup and maintenance

```sh
npm ci
npm run db:setup
npm run dev
```

Individual commands: `db:generate`, `db:migrate`, `db:seed`, `db:verify`. Migrations live in `prisma/migrations`; schema in `prisma/schema.prisma`. Seeding is deterministic and insert-only for verified records: a mismatch aborts rather than overwriting evidence. It preserves custom questions and events. English derived overlays come from `scripts/english-content.mjs`.

`npm run db:reset` backs up the generated DB, removes only the resolved file under `data/runtime`, migrates, seeds and verifies. **Stop the app first.** Reset intentionally clears runtime custom content/events; existing backups remain under ignored `data/backups`. For portable backup, stop the app and copy `nova.db`; copy the corpus separately to retain source previews. Impact also exports/imports its journal through the UI. No DB binaries or backups belong in Git.

## Integrity

Foreign keys protect QuestionEvidence, QuestionFact and FactEvidence. SQLite triggers reject edits/deletes of verified facts, citations, documents, decisions, actions, timeline, people, conditions, official questions and baseline snapshots. Events are append-only. Custom question edits record before/after AdminAudit entries. They cannot modify Q01–Q10, evidence or the baseline.

`db:verify` compares every original entity payload, official answer/nuance/evidence/fact relationship and baseline checksum with reviewed fixtures, verifies `QUESTION_ANSWERS.md` and checks foreign keys. A second seed/verify proves repeatability. Events use one identity regardless of locale; French and English facts are never duplicated.

This is a single-process local hackathon database. Deployments need writable persistent disk; ephemeral serverless filesystems require a different hosting arrangement. No external database was added.

The db:migrate wrapper explicitly creates the generated runtime directory before applying Prisma migrations, including a fresh checkout with ignored runtime files absent. Final repeat seed/verification passed with the existing user DB; test writes are isolated in separate files.


## Iteration 3 additive migration
202610040001_auth adds User and Session only. Role is ADMIN/USER; email unique; password hashes and opaque session digests are stored separately. Project Person remains the factual team model. Existing canonical triggers and project data were preserved and verified. Backup: data/backups/nova-before-iteration3.db. Run npm run db:migrate (Prisma migrate deploy), then db:seed/db:verify or db:setup. Scripts load ignored .env without overriding process environment. User seed only inserts absent env-admin; preserves all existing users/sessions/passwords. Explicit db:reset clears auth tables too. See AUTH.md.
