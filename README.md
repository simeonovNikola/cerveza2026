# NOVA 360 — Project Intelligence Hub

Une vérité projet traçable, évolutive et actionnable.

Bilingual operational memory for the Loto-Québec Projet 360 / NOVA challenge. Ten sourced answers, exact evidence navigation, historical decisions, contradictions and an immutable **30 September 2026, 09:00 Montréal (UTC−04:00)** baseline.

## Run locally

Node.js 24 and npm are recommended and used for validation (isolated database tests use node:sqlite).

```powershell
npm ci
# Configure .env using .env.example (see docs/AUTH.md)
npm run db:setup
npm run dev
```

Open **http://127.0.0.1:3000/fr** or **http://127.0.0.1:3000/en**. For a stable presentation build:

```powershell
npm run build
npm run start
```

No API key, account or paid service is required. Generated data is included; Python is only needed to regenerate or audit it. Keep `loto-quebec-nova-participants/` alongside the app to open original evidence. Sources are read-only and served through an allowlisted source-ID endpoint.

## Navigation

- **Vue d’ensemble**: responsible owner, approved date, authorized budget, disputed invoice and three actual go-live conditions.
- **Questions**: Q01–Q10, each with answer, nuance, state and exact locators. Click any source badge for the original and extracted passage.
- **Chronologie / Décisions / Actions / Contradictions**: proposal, approval, delivery and validation remain distinct; recommendations and documented commitments have separate badges.
- **Preuves**: search all 64 source files, preview PDF/images/text, inspect cells, duplicates and related facts.
- **Ask NOVA**: local matching against verified answers plus keyword search. Unsupported queries explicitly remain uncertain.
- **Impact**: paste a judge event, enter source/locator, author/authority and occurred date. Review candidate subjects/values/states and check confirmation only after reading the evidence. Unrecognized subjects can be added as new facts. Before/after results list changed, new, unchanged and pending facts plus affected actions.
- **Brief de reprise**: printable single-page A4 briefing; browser Print → Save as PDF or download plain text.

**Baseline / Actuel** switches the displayed facts; compare is available inside Impact. New proposals do not replace approved decisions. Delivery does not accept a condition. Validating one condition leaves the other two open.

## Event sharing

Events and custom questions persist in SQLite at data/runtime/nova.db across browser sessions. Use **Impact → Journal → Exporter** to move events between machines; import validates and merges without deleting events or changing conflicting IDs. Original evidence and the baseline remain immutable. Reset/migrations/backup: [DATABASE](docs/DATABASE.md).

Iteration 3 adds a sidebar, six concise dashboard cards, a header question field, role-aware admin and a bottom-right navigation support assistant. Ctrl/Cmd K retains interactive search. FR/EN is global. [Authentication](docs/AUTH.md) documents local registration/login, env-admin creation and sessions; [Admin](docs/ADMIN.md) covers protected custom questions and user activation. Iteration 4 adds server-only Gemini generateContent support with compact page/role/project context and safe navigation/evidence links; the local mock remains the fallback. Ask NOVA stays separate. Configure GEMINI_API_KEY, GEMINI_MODEL and GEMINI_SUPPORT_ENABLED in ignored .env; see [AI Support](docs/AI_SUPPORT.md) for setup, boundaries and pending credentialed live QA.

## Validation

```powershell
npm run lint
npm run typecheck
npm test
npm run db:verify
npm run build
npm run test:e2e
```

Browser tests use a separate SQLite database on port 3001 and an installed Chrome (configure `playwright.config.ts` if needed). On this managed Windows workspace, `tsx` requires execution outside the sandbox because Node cannot read the user profile inside it. This is an environment limitation, not a required app permission.

Data regeneration/audit:

```powershell
python -m pip install -r requirements.txt
python scripts/ingest.py
python scripts/curate.py
python scripts/validate_data.py
```

Optional project-local Python dependency location `.tools/python` is supported. `curate.py` refuses to overwrite a different baseline; `validate_data.py` checks baseline and source SHA-256, citations, entity references and financial arithmetic. Source IDs persist across ingestion reruns by path.

## Team documentation

Start with [PROJECT_STATUS](docs/PROJECT_STATUS.md), [HANDOFF](docs/HANDOFF.md) and [DEMO](docs/DEMO.md). Factual review: [QUESTION_ANSWERS](docs/QUESTION_ANSWERS.md), [CORPUS_INVENTORY](docs/CORPUS_INVENTORY.md), [EVIDENCE_METHOD](docs/EVIDENCE_METHOD.md), [KNOWN_UNCERTAINTIES](docs/KNOWN_UNCERTAINTIES.md). Implementation: [ARCHITECTURE](docs/ARCHITECTURE.md), [DATA_MODEL](docs/DATA_MODEL.md), [UI_PLAN](docs/UI_PLAN.md), [DEVLOG](docs/DEVLOG.md).

Tools used: Next.js, React, TypeScript, Prisma/SQLite, next-intl, Lucide, Python/pypdf/openpyxl/Pillow and Playwright. Corpus interpretation and screenshot regions were manually reviewed with Codex assistance. No runtime LLM, embeddings or outside information is used as NOVA evidence. No Git commit, push or public deployment was performed.
