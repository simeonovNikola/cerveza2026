# Final QA — submission snapshot

## Repository checks

| Check | Result |
|---|---|
| npm run lint | PASS |
| npm run typecheck | PASS |
| npm test | PASS — 46 deterministic tests, no live Gemini calls |
| npm run build | PASS |
| npm run test:e2e | PASS — all 24 Chrome browser tests |
| python scripts/validate_data.py | PASS — sealed baseline, Q01–Q10, financial/condition checks and all 64 indexed original hashes |

Browser coverage includes FR/EN pages and auth, role/API protection, custom-question safeguards, source/locator navigation and all 64 original HTTP hashes, Ask NOVA/search, reviewed Impact before/after with unchanged baseline, print/export, mascot, support fallback, focus and outside-click dismissal. Test-generated update events/PDFs are excluded from this package. The shipped one-page FR/EN PDFs are the existing verified baseline briefs.

## Clean packaged-app setup

Fresh npm ci, npm run db:setup (both migrations, seed, exact fixture verification), repeated seed/verification, local dev startup and a second production build passed in submission/.validation/app. Temporary random admin credentials/session secret and a new SQLite database were used only there; neither is shipped. The main working database hash was unchanged.

HTTP checks: all 32 normal FR/EN routes returned 200; both guest admin routes redirected to locale login. Fresh public registration ignored a supplied ADMIN role and created USER. Guest/user admin APIs returned 401/403. The fresh ADMIN signed in and reached both locales of Question Bank and User Management and its users API. Mascot returned 200. FR/EN local navigation replies and disabled-provider open-ended fallback returned 200. No live paid/provider call was made.

Routes checked (both /fr and /en): homepage, login, register, questions, evidence, documents, project/overview, project/timeline, project/decisions, project/contradictions, actions, impact, ask, brief, team and search; authenticated admin/admin/users. Five fresh browser screenshots are included under deliverables/screenshots.

## Reproduce startup

From app/: npm ci; copy .env.example to .env; choose ADMIN_EMAIL, a new ADMIN_PASSWORD (10+ characters) and random SESSION_SECRET (32+ characters); retain DATABASE_URL; leave API key blank or disable Gemini. Run npm run db:setup, then npm run dev. Open http://127.0.0.1:3000/fr or /en. An occupied port can use npm run dev -- --port 3002. Production: npm run build then npm run start. Do not run db:reset against a working database.

## Limitations / manual checks

npm ci reported nine high-severity dependency advisories against the existing lockfile. No dependency upgrades or automatic audit fixes were applied during packaging; review advisories before public deployment. SDK/Gemini availability is optional and was not tested with a live key in this final packaging run. The supplied example has no key; local assistance is expected and intentional for known help intents. HTTPS/persistent SQLite storage are required for deployment. No public deployment, demo video or Devpost upload is provided. Rehearse the actual judge event and confirm event-specific upload rules manually.

Secrets/originals/archive results are in SECRET_SCAN.md, SOURCE_INTEGRITY.json and ARCHIVE_VERIFICATION.md. No commit/push or core product changes were performed.
