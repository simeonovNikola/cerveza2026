# NOVA 360 handoff — Iteration 4

The existing Next/Prisma/next-intl app was extended. Q01–Q10, source originals, baseline protections, citations, search, Ask NOVA, Impact and printable brief remain intact.

## Run

Node 24 recommended. npm ci; configure ignored .env using .env.example; npm run db:setup; npm run dev. Open http://127.0.0.1:3000/fr or /en. Production: npm run build then npm run start. Set DATABASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD and SESSION_SECRET. This workspace already has ignored random local credentials in .env, admin email admin@example.com; read its password locally. Fresh checkout users choose their own credentials.

## Database and admin

Stop server before migrations/backup; copy data/runtime/nova.db (plus any journal files if using a live backup; prefer stopped DB). Iteration 3 retained a backup at data/backups/nova-before-iteration3.db. Iteration 4 adds no schema migration. db:setup generates Prisma, deploys additive migrations, seeds, verifies. Seeding preserves project records, custom questions, events and users. Admin inserted only if missing, hashed from env. Existing admin credentials are preserved. db:reset is explicitly destructive: backs up DB and recreates it, clearing users/sessions/custom questions/events; do not use for normal setup.

Login/register pages exist in both locales. Registration creates USER and signs in. Server sessions expire after seven days; logout revokes DB token. ADMIN gets Question Bank and Users navigation. USER gets normal project tools and access denied on admin routes. All admin APIs separately enforce ADMIN; no client-only protection. Users page /fr/admin/users or /en/admin/users searches name/email, shows role/active/created, activates/deactivates safely. Roles read-only; no deletion. See AUTH.md and ADMIN.md.

## UI and support assistant

Sidebar, strong blue bar, one natural-language header field routing to Ask NOVA (q parameter), Ctrl/Cmd K interactive search, six concise fact-derived cards, timeline and documents. About removed. Only global module locale switch retained; bilingual editor fields remain. Advanced existing screens remain a click deeper.

NOVA Support now uses the official Gemini generateContent API when a server-side `GEMINI_API_KEY` (or `GOOGLE_API_KEY` alias) is configured and `GEMINI_SUPPORT_ENABLED` is not false. Add the key manually to ignored `D:\cerveza2026\.env`, never the browser or Git. `GEMINI_MODEL` defaults to `gemini-3.5-flash-lite`. Restart after env changes. Disable the flag or omit the key to retain local assistance. No real key is configured at handoff; live verification is pending.

POST /api/support-chat accepts `{message,locale,currentPath,view,history}`. The server derives role from the existing session, selects compact bilingual product/page context and limited official DB facts, and requests strict structured output. Known route/source keys become localized CTAs; unknown URLs/admin links are rejected. History is bounded and memory-only, no new chat schema. Quotas, same-origin checks, timeouts and safe fallback protect the demo. Ask NOVA remains the factual project flow and is not merged with support.

`src/lib/support-ai/` separates client/context/retrieval/prompt/validation/provider orchestration; `src/lib/support-assistant/mock.ts` remains the fallback. The shared path map is `src/lib/navigation.ts`. Current page/view and roles are included without account secrets. Source documents, baseline and Q01–Q10 are unchanged; support is read-only.

The existing native dialog/mascot remains, with loading/retry, sources, local-mode indicator and five bilingual prompts. Mascot: `public/nova-support-mascot.png` with star fallback; original `public/nova-support-mascot.png.png` preserved. No external asset URL or new generated image. Change models through env; replace providers only behind guarded orchestration, retaining safe route/source contracts. See AI_SUPPORT.md for architecture, limitations and exact live QA steps.

Incomplete/future: live credentialed check, stronger follow-up retrieval/evaluations, distributed rate limiting/trusted proxy setup, operational authentication recovery/verification/session cleanup and HTTPS/persistence readiness. Role editing remains deferred.

## Validation and paths

npm run lint; npm run typecheck; npm test; npm run build; npm run test:e2e; npm run db:verify; python scripts/validate_data.py. E2E uses isolated e2e.db and test-only credentials/secret, Chrome, port 3001. The browser harness forces local mode and clears the Gemini key; no paid API calls occur in automated tests. Unit DB/auth tests use separate unit-test.db/auth-test.db. Stop running servers before Prisma generation on Windows to avoid a locked native DLL. Managed Windows sandbox may require permission for native compiler/Chrome/test runner.

src/lib/repositories holds project truth; src/lib/auth guards sessions; prisma migrations preserve canonical triggers. messages/fr.json and en.json must have matching keys and UTF-8 encoding. Evidence original language/locators remain unchanged. docs/QA_REPORT.md and PROJECT_STATUS.md record final results. Do not commit/push unless requested.
