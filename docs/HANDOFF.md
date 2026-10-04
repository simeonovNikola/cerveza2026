# NOVA 360 handoff — Iteration 3

The existing Next/Prisma/next-intl app was extended. Q01–Q10, source originals, baseline protections, citations, search, Ask NOVA, Impact and printable brief remain intact.

## Run

Node 24 recommended. npm ci; configure ignored .env using .env.example; npm run db:setup; npm run dev. Open http://127.0.0.1:3000/fr or /en. Production: npm run build then npm run start. Set DATABASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD and SESSION_SECRET. This workspace already has ignored random local credentials in .env, admin email admin@example.com; read its password locally. Fresh checkout users choose their own credentials.

## Database and admin

Stop server before migrations/backup; copy data/runtime/nova.db (plus any journal files if using a live backup; prefer stopped DB). This iteration backed it up at data/backups/nova-before-iteration3.db. db:setup generates Prisma, deploys additive migrations, seeds, verifies. Seeding preserves project records, custom questions, events and users. Admin inserted only if missing, hashed from env. Existing admin credentials are preserved. db:reset is explicitly destructive: backs up DB and recreates it, clearing users/sessions/custom questions/events; do not use for normal setup.

Login/register pages exist in both locales. Registration creates USER and signs in. Server sessions expire after seven days; logout revokes DB token. ADMIN gets Question Bank and Users navigation. USER gets normal project tools and access denied on admin routes. All admin APIs separately enforce ADMIN; no client-only protection. Users page /fr/admin/users or /en/admin/users searches name/email, shows role/active/created, activates/deactivates safely. Roles read-only; no deletion. See AUTH.md and ADMIN.md.

## UI and support assistant

Sidebar, strong blue bar, one natural-language header field routing to Ask NOVA (q parameter), Ctrl/Cmd K interactive search, six concise fact-derived cards, timeline and documents. About removed. Only global module locale switch retained; bilingual editor fields remain. Advanced existing screens remain a click deeper.

POST /api/support-chat accepts {message,locale}, bounded to 1000 characters, returning reply and suggestedActions. lib/support-assistant/types.ts defines provider contract; mock.ts recognizes bilingual navigation/workflow/auth intents; index.ts selects mock. No paid/external AI. Chat is UI help, separate from factual Ask NOVA. Native dialog gives keyboard focus trapping/Escape and bottom-right responsive positioning. Messages stay client-local and are not persisted. Mascot is public/nova-support-mascot.png, copied unchanged from the inspected existing public/nova-support-mascot.png.png; fallback star if loading fails. No external image URL. No new generation prompt/tool was used.

Future AI: implement another provider behind this contract, make orchestration async if needed, preserve safe existing-route allowlist and navigation-only boundary, add privacy/rate-limit/provider tests. Do not let support overwrite factual answers or evidence. Current semantic search/synonyms, role editing, password recovery/email verification and public deployment remain future work; see ROADMAP.md.

## Validation and paths

npm run lint; npm run typecheck; npm test; npm run build; npm run test:e2e; npm run db:verify; python scripts/validate_data.py. E2E uses isolated e2e.db and test-only credentials/secret, Chrome, port 3001. Unit DB/auth tests use separate unit-test.db/auth-test.db. Stop running servers before Prisma generation on Windows to avoid a locked native DLL. Managed Windows sandbox may require permission for native compiler/Chrome/test runner.

src/lib/repositories holds project truth; src/lib/auth guards sessions; prisma migrations preserve canonical triggers. messages/fr.json and en.json must have matching keys and UTF-8 encoding. Evidence original language/locators remain unchanged. docs/QA_REPORT.md and PROJECT_STATUS.md record final results. Do not commit/push unless requested.
