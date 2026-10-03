# Data model

Document: stable source ID, path, format, SHA-256, metadata, topics, exact extraction sections, embedded attachments and duplicate references.

Citation: document ID plus exact page/cell/line/comment/image region and evidence summary.

Fact: subject, predicate, value, topic, lifecycle state, temporal validity, authority, explained confidence, citations, supersession and linked questions/actions/decisions.

Decision: proposal and approval separately, cause, implementation and validation with independent citations.

Action: documented commitment versus team recommendation; confirmed/proposed owner; known/to-confirm deadline; go-live relation and evidence.

Contradiction: claims, resolution basis, current/historical facts and evidence. Timeline: dated typed events linked to facts and citations.

Baseline: frozen 2026-09-30T09:00:00-04:00 snapshot. Event: separately stored judge content, candidate facts, human-confirmed classification, impacts and provenance. Current state derives from baseline plus accepted events.

Files: `documents.json`, `citations.json`, `questions.json`, `facts.json`, `people.json`, `decisions.json`, `actions.json`, `contradictions.json`, `timeline.json`, `conditions.json`, `baseline.json` and `baseline.sha256`. All are generated from read-only originals and manually reviewed curation. `inventory-report.json` retains original byte hashes and MIME attachment matches.

Fact references use stable `FACT-nnn` IDs. Citation IDs reference stable source IDs rather than a UI row. Decisions link affected facts/actions; questions link facts/citations; actions link condition and fact IDs. Historical facts have validity bounds and supersession links. Contradictions identify current and historical facts.

Event schema (runtime): `id`, `receivedAt`, `occurredAt`, `source` (including precise locator), `author` (declared authority), `text` (unchanged received content), `candidates[]`. Candidate: `factId`, `value`, `state`, `excerpt`, `confirmed`, optional `newSubject`. Existing ledger subjects use their fact ID. New subjects use `NEW-<uuid>` and require an explicit name; they never imply supersession.

Derived fact adds `eventId` and `eventSource` and moderate confidence with explanation. Baseline citations remain its historical evidence; current “Pourquoi?” opens the raw judge event, not a baseline proof claiming to support the changed value. New facts have baselineValue “Absent du baseline” and no invented corpus source.

Impact entity: `changed[]` with before/after/reason, `newFacts[]`, `unchanged[]`, `pending[]` with reasons, `affectedActions[]`, and `recommendations[]`. Action closure for each go-live condition derives from only its linked current fact being validated. Other action states remain unchanged unless separately reviewed; finance events identify affected actions rather than inventing resolution.

## Iteration 2 database and locales

Prisma schema maps each existing reviewed entity to a stable-ID row with indexed/query fields plus a lossless canonical JSON payload. JSON here is a database column, not scattered runtime fixture reads. Citation→Source, FactEvidence and QuestionEvidence/QuestionFact are explicit foreign-key relations. Snapshot has kind/timestamp/checksum/immutable; baseline is update/delete protected. Runtime current state remains a replay, never a replacement snapshot.

Narrative English overlays share the same rows and relations. Question also has bilingual editable fields, isOfficial, active, sortOrder, tags, createdBy, createdAt and updatedAt. Custom rows have their own read-only source links; they never become baseline facts. AdminAudit captures before/after edits. ImpactEvent stores locale, sequence, original event data and timestamps; ImpactChange stores fact ID, before/after, state/type and explanation. Events are append-only. The full model is in prisma/schema.prisma; import/verification details in DATABASE.md.

SearchResult is a typed service DTO with kind, stable ID, title/snippet, lifecycle state, scope (baseline/current/original/event/custom), destination, optional anchor/source/citation and deterministic ranking score. It is derived at query time, not a second factual store.
