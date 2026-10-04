# Iteration 3 plan — 2026-10-04

Audit verified Next 16 App Router catch-all locale page, next-intl proxy, Prisma 6 SQLite, deterministic protected seed, 18 unit tests and 13 browser tests. No auth exists. `/fr/admin`, `/en/admin` and GET/POST/PUT `/api/admin/questions` are exposed. Query `?page=admin` also selects administration and must be guarded. Docs correctly describe Iteration 2 but their auth/assistant roadmap is superseded here.

## Architecture and phases
- Add additive User (unique normalized email, name, passwordHash, ADMIN/USER, active, timestamps) and Session (hashed opaque token, user relation, expiration) migration. Keep project tables/triggers unchanged. Back up runtime DB before migration.
- Use Node crypto scrypt password hashing and random opaque server-side sessions; httpOnly, SameSite=Lax, production Secure, seven-day expiration. SESSION_SECRET keys token HMAC. Logout deletes DB session. Server checks role and active state on every request. Same-origin mutation validation prevents CSRF.
- Seed admin only from ADMIN_EMAIL/ADMIN_PASSWORD; never reset existing passwords/users on ordinary seed. Public registration always USER. Keep normal dashboard readable for judges; all admin route aliases/children and APIs require ADMIN.
- Add bilingual login/register/logout and user management. Roles read-only this iteration; deny deactivating yourself or last active admin transactionally.
- Simplify existing shell with sidebar, prominent search, six concise factual cards, timeline/documents; remove About and evidence-dialog locale buttons. Keep global locale and detailed existing modules.
- Reuse inspected original blue orb asset at public/nova-support-mascot.png before support UI implementation. Separate deterministic bilingual support provider, bounded mock API, existing-route CTAs, native dialog keyboard/focus behavior and asset fallback. No external AI.

## Validation
Auth service/API/browser coverage: registration validation/duplicates/hash/default role; login invalid/nonexistent/disabled; session cookie/logout/expiry; admin server/API denial; seed admin and self-lockout. Support FR/EN/intents/fallback/CTAs. Update stale UI expectations while preserving factual regressions. Run lint, typecheck, full unit/browser tests, build, db:verify and source validation. Check responsive FR/EN auth/dashboard/admin/chat.

## Risks and limits
Existing e2e/unit harness applies initial SQL directly: extend to all migrations. SQLite requires persistent disk; no distributed rate limiter/email verification/recovery in local demo. Reference dashboard screenshot was not attached; use the supplied written hierarchy. No invented green project status/deadline counts: derive from preserved records. No commit/push. Record meaningful phases in DEVLOG and update handoff/security documentation.


## Final outcome
All planned phases complete. Implemented scrypt rather than an added bcrypt dependency, DB-backed opaque sessions, read-only roles with activation management, public normal judge tools and protected admin children/aliases/APIs. Reused original asset; generated ignored local demo env credentials. Global header form routes to Ask NOVA; bottom CTA avoids a competing search. 25 unit / 18 browser tests plus final focused mobile/admin checks pass. Final details and limits in AUTH.md, HANDOFF.md and QA_REPORT.md.
