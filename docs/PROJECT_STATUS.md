# NOVA 360 — Project status

Current phase: Iteration 4 implemented and locally validated — 2026-10-04. Credentialed live Gemini verification remains pending because the configured credential was rejected with HTTP 401 by the one controlled Gemini request.

Preserved: local auth/roles/admin guards, SQLite/Prisma, FR/EN, official Q01–Q10, citations/original sources, sealed baseline, Impact, Ask NOVA, search, custom-question/user management, printable brief and the existing mascot/dialog. No schema, reviewed payload or official answer changed.

Completed:
- Audited the existing mock/UI/routes/auth/repositories/docs and recorded ITERATION_4_PLAN.md; checked current official provider/structured-output/model docs.
- Official Google GenAI SDK 2.27.0 and server-only client, configurable gemini-3.5-flash-lite default and env feature flag.
- Compact bilingual product/page/role context; intent-first read-only official question/fact/condition/citation retrieval, preserving Baseline/Current and event proof.
- Strict structured output with server-resolved known routes/sources; no arbitrary model URLs or inaccessible admin CTAs. Client roles/history never grant authority.
- Mock retained for disabled/missing/error/timeout/malformed/unsafe output; secret refusal/redaction, same-origin POST, session/IP quotas, deadlines, output/history caps and metadata-only logging.
- Existing chat/mascot retained with loading/retry, local-mode indicator, source links, five quick prompts and stable accessible/mobile layout. History memory-only; no chat schema or streaming.
- Updated AI_SUPPORT, architecture, handoff, roadmap, status, devlog, QA and env documentation.

Validation: lint, strict typecheck, 42 unit tests, production build and all 22 browser tests pass. Official SDK uses fake HTTP in tests; browser harness disables AI and clears the key. DB verify, 64-source/Q01–Q10/baseline corpus audit and git diff whitespace check pass. Desktop/mobile support screenshots reviewed. Existing auth/admin/search/evidence/Impact/Ask NOVA/brief regressions remain green.

Run: npm ci; configure ignored .env from .env.example; npm run db:setup; npm run dev. Existing auth variables remain required. Add GEMINI_API_KEY manually, GEMINI_MODEL=gemini-3.5-flash-lite and GEMINI_SUPPORT_ENABLED=true to enable real support, then restart. Missing keys or GEMINI_SUPPORT_ENABLED=false keep local assistance; an unset flag allows a configured key. GOOGLE_API_KEY is an accepted alias. See HANDOFF.md/AI_SUPPORT.md for exact live QA steps. Existing local admin credentials remain in ignored .env; no password/secret is included in source/docs.

Known limits: no credentialed live provider check yet; keyword retrieval and generative interpretation are intentionally bounded; memory-only history, no streaming, process-local quotas/trusted proxy requirement. Normal project tools remain public for judges; auth recovery/verification/MFA/role editing/session cleanup remain future work. SQLite requires persistent disk and production HTTPS. Existing project uncertainties remain in KNOWN_UNCERTAINTIES.md.

Git: intended Iteration 4 changes remain uncommitted; nothing pushed/deployed. Production build updates generated next-env.d.ts type references. No source corpus, mascot, Prisma schema/migration or canonical fixture diff.

Next recommended iteration (5): credentialed bilingual support evaluation and improved follow-up retrieval, then trusted proxy/shared rate limiting, operational auth recovery/rotation/verification/session cleanup and production HTTPS/backup readiness.

Gemini tracing fix: root config is read correctly; no OpenAI gate. Old model:null logging masked a provider error. Safe config/attempt/reason/status metadata now distinguishes disabled/missing key/errors/timeouts; successful UI responses omit the local label via explicit fallback=false. Auth/corpus/baseline/Impact unchanged.
