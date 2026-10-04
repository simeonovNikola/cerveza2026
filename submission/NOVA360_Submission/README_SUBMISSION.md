# NOVA 360 — Project Intelligence Hub

NOVA 360 turns the challenge's fragmented project information into a bilingual operational memory: ten verified answers, exact source navigation, decisions and contradictions, a takeover brief, and reviewed before/after updates. Its value is traceability: users can see what is known, why it is supported, what remains uncertain, and what an accepted event changes without rewriting the original baseline.

## Run locally

Use Node.js 24 and npm. Internet is needed for dependency installation; no paid service or Gemini key is required to use the project tools. From this extracted folder:

```powershell
cd app
npm ci
Copy-Item .env.example .env
```

Edit your new `.env` locally: choose an admin email, replace ADMIN_PASSWORD with your own password of at least 10 characters, and replace SESSION_SECRET with at least 32 random characters. Keep DATABASE_URL as supplied. Leave GEMINI_API_KEY blank for reliable local support. The example password/session placeholders must be replaced; they are not login credentials. Then:

```powershell
npm run db:setup
npm run dev
```

Open **http://127.0.0.1:3000/fr** or **http://127.0.0.1:3000/en**. For production presentation, stop dev, run `npm run build`, then `npm run start`. If port 3000 is occupied, pass `-- --port 3002` to dev/start and use that port. Run commands from `app/`; its generated fixtures, original challenge directory and required answer-verification document must stay in place.

## Judge navigation

Replace `/fr` with `/en` for the same English route.

| Judged area | Route / submission file | What to inspect |
|---|---|---|
| Dashboard / detailed state | `/fr`, `/fr/project/overview` | Concise cards and independent launch conditions |
| Ten factual answers | `/fr/questions`, `deliverables/QUESTION_ANSWERS.md` | Badges show 1–10; stable anchors remain Q01–Q10 |
| Exact evidence | `/fr/evidence?citation=CIT-017` | Original, exact locator and related facts |
| Document library | `/fr/documents` | Separate searchable file library linking to evidence |
| Timeline | `/fr/project/timeline` | Dates, provenance and project evolution |
| Contradictions / Risks | `/fr/project/contradictions` | Historical contradictions and their resolutions |
| Decisions / actions | `/fr/project/decisions`, `/fr/actions` | Approval versus proposal; commitments versus recommendations |
| Search / factual questions | `/fr/search`, `/fr/ask` | Ctrl/Cmd K search; Ask NOVA with uncertainty and sources |
| Update after event | `/fr/impact` | Review candidates, compare, explicitly save, inspect raw event proof |
| Takeover brief | `/fr/brief`, `deliverables/NOVA_BRIEF.pdf`, `deliverables/NOVA_BRIEF_EN.pdf` | Printable one-page FR/EN baseline brief and text export |
| Auth / administration | `/fr/login`, `/fr/register`, `/fr/admin`, `/fr/admin/users` | ADMIN-only question/user tools; public registration creates USER |

The sidebar's **Risks** opens the contradictions route. **Documents and sources** is `/documents`, distinct from `/evidence`. All these neutral route slugs are shared by both locales. The main header question field opens Ask NOVA; its adjacent search control/Ctrl/Cmd K opens interactive search.

## Auth and AI support

Normal project pages are accessible to judges without login. Seed creates an ADMIN using the credentials you choose in your local `.env`; no existing users, session tokens, passwords or runtime database are shipped. Admin manages bilingual custom questions and user activation; official questions are protected and role editing is read-only. Registration creates USER. Logout revokes the database session. See `docs/AUTH.md` and `docs/ADMIN.md`.

NOVA Support is the bottom-right mascot panel, separate from factual Ask NOVA. Known navigation, admin, auth, search and Impact questions answer locally immediately. Optional open-ended assistance uses server-only Gemini with `gemini-3.5-flash-lite` and a 10-second provider budget; missing/disabled keys, provider failures or timeouts use local fallback. "Local assistance mode" is expected for intentional local answers, not automatically an error. No real Gemini request is part of automated tests. See `docs/AI_SUPPORT.md`.

## Package and limitations

- `deliverables/`: verified answers, baseline FR/EN PDFs, current demo, usage and QA summaries.
- `docs/`: technical handoff, auth, data/localization/search/AI details, build and final verification records.
- `app/`: clean runnable source, locked dependencies, migrations, seed fixtures and untouched challenge originals; no installed dependencies or runtime DB.
- `DEMO_FLOW.md`: five-minute presentation. `DEVPOST_TEXT.md`: editable submission text.

One project, a local writable SQLite database, bounded keyword search/intent matching, and human-reviewed update candidates. Historical contradiction pages and official answers retain baseline scope; current overlays are separate. Exact outstanding project dates remain uncertain where the evidence does not establish them. Support is read-only and may fall back; streaming and persistent chat logs are absent. Production needs HTTPS, persistent storage and stronger distributed abuse/auth operations. No live deployment URL, video or Devpost upload is included. Fresh installation reports nine high-severity dependency advisories against the existing lockfile; see FINAL_QA.md before public deployment.

See `FINAL_CHECKLIST.md` and `docs/FINAL_QA.md` for measured checks and manual submission tasks.
