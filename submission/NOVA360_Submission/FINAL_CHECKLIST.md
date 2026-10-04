# Final submission checklist

Checkboxes below are for the presenter's final rehearsal and manual upload. Automated results are recorded separately in `docs/FINAL_QA.md`; these boxes do not claim an upload has happened.

## Judging criteria

- [ ] **Ten factual answers** — `/fr/questions` / `/en/questions`, anchors Q01–Q10; `deliverables/QUESTION_ANSWERS.md`. Open question 6, read the answer and nuance, and show that official cards are protected.
- [ ] **Evidence and navigation** — `/fr/evidence?citation=CIT-017`, `/fr/documents`; preserved originals in `app/loto-quebec-nova-participants/`. Click an exact invoice/page locator; distinguish the library from the explorer.
- [ ] **Timeline and contradictions** — `/fr/project/timeline`, `/fr/project/contradictions`, `/fr/project/decisions`. Show September proposal versus committee approval; historical contradictions do not imply every risk is still unresolved.
- [ ] **Brief and actions** — `/fr/brief`, `/fr/actions`; `deliverables/NOVA_BRIEF.pdf` and `NOVA_BRIEF_EN.pdf`. Show confirmed responsibility versus a proposed owner, and commitments versus recommendations.
- [ ] **Usage and uncertainty** — `/fr/ask`, `/fr/search`, question details; `deliverables/USAGE_GUIDE.md`, `docs/KNOWN_UNCERTAINTIES.md`. Show a supported query, a missing-information response, and the global language switch.
- [ ] **Update after event** — `/fr/impact`, `DEMO_FLOW.md`. Use the actual judge event; review source/authority/date, confirm candidates, compare and explicitly save. Show unchanged Baseline and raw event evidence. Rehearse synthetic examples only in an isolated DB.

## Technical and packaging readiness

- [x] Build passes — `npm run build`; measured result in `docs/FINAL_QA.md`.
- [x] Lint passes — `npm run lint`.
- [x] Typecheck passes — `npm run typecheck`.
- [x] Tests pass — `npm test`; optional browser suite `npm run test:e2e` with Chrome.
- [x] Secrets scan passes — `docs/SECRET_SCAN.md`; no live credentials or tokens shipped. Isolated test-only fixtures are explicitly nonproduction.
- [x] `.env` excluded — only `.env.example` is shipped; choose your own local credentials.
- [x] Challenge originals unchanged — `docs/SOURCE_INTEGRITY.json` and corpus hash verification.
- [x] DB setup works — clean install/seed verification in `docs/FINAL_QA.md`; do not use db:reset on a working DB.
- [x] FR/EN works — `/fr`, `/en`, both login/register routes and matching source identities.
- [x] Admin works — seed local ADMIN, login, `/fr/admin`, `/en/admin`, and `/admin/users`; USER/guest denial checked.
- [x] Impact Mode works — reviewed event analysis and before/after; baseline and independent conditions preserved.
- [x] AI fallback works — known UI help is local by design; missing key is acceptable; optional generation has a 10-second budget.
- [x] ZIP opens and matches the source folder — `docs/ARCHIVE_VERIFICATION.md` and file hashes.

## Manual Devpost steps

- [ ] Check the event's attachment/file-size and required-field rules.
- [ ] Paste/edit DEVPOST_TEXT.md; add correct team members and contact details.
- [ ] Add an accessible demo/repository link if the event requires it; none is deployed/published by this package.
- [ ] Record/upload a short demo video if required; use DEMO_FLOW.md.
- [ ] Select screenshots and upload the ZIP/PDFs where appropriate.
- [ ] Confirm links/access, save/preview the entry, then submit before your event deadline.
