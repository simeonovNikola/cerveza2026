# NOVA 360 — Project status

Current phase: Iteration 3 complete — 2026-10-04.

Preserved: SQLite/Prisma, FR/EN, official Q01–Q10, citations/original sources, sealed September 30 09:00 Montréal baseline, Impact, Ask NOVA, interactive search, custom-question controls and printable brief. No reviewed payload or official answer changed.

Completed:
- Audited actual code/docs and recorded ITERATION_3_PLAN.md before changes.
- Additive User/Role/Session migration with stopped-runtime backup; deterministic seed preserves users and project data, creates env-admin once.
- Bilingual register/login/logout; salted scrypt hashes; opaque HMAC-digested seven-day sessions; httpOnly/Lax/production-Secure cookies, same-origin mutation protection and local attempt limiter.
- Server admin child/query-alias guards and independent API role checks. Role-aware navigation and searchable user activation management, self/last-admin lockout protection, audit attribution. Roles read-only.
- Simplified sidebar/blue header/question field/six-card dashboard/timeline/documents; removed About and duplicate evidence locale controls. Clean global-language admin table, bilingual forms, additional content spacing and evidence detail disclosure.
- Mock bilingual navigation support API/provider, bottom-right mascot dialog, keyboard wrapping/focus restoration/Escape, responsive layout and missing-image fallback.
- Updated auth/admin/database/architecture/i18n/UI/roadmap/handoff/devlog/QA documentation.

Validation: lint, strict typecheck, 25 unit tests, production build, all 18 browser tests and final focused 5 browser checks pass. Repeat db:setup/db:verify and 64-source/baseline/Q01–Q10 corpus validation pass. Visually reviewed desktop/mobile FR/EN dashboard, auth pages, support and admin artifacts. Tests use separate SQLite databases.

Run: npm ci; configure ignored .env from .env.example; npm run db:setup; npm run dev. This workspace already contains generated ignored credentials for admin@example.com in .env. Never print/commit its password or SESSION_SECRET. Production: npm run build; npm run start. See AUTH.md/HANDOFF.md.

In progress/blockers: none. No commit/push/deployment. Git contains the intended modified/new Iteration 3 files; original user mascot preserved. next-env.d.ts reflects Next's generated production type paths.

Known limits: normal project tools retain public judge access; only admin is gated. Roles read-only; no password reset/email verification/MFA/distributed limiter; expired rows need future cleanup. Support is deterministic navigation help, with no external AI. SQLite needs persistent disk and production HTTPS/proxy configuration. Existing project uncertainties remain in KNOWN_UNCERTAINTIES.md.

Next iteration 4: authentication operations (recovery/rotation, email verification, session cleanup, production rate limiting and HTTPS/backup readiness), then optional audited role management. Real AI remains a later provider swap with route/evidence boundaries.
