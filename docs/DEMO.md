# Bilingual demo — 6 minutes

Prepare: `npm ci`, `npm run db:setup`, `npm run build`, `npm run start`; open http://127.0.0.1:3000/fr. **A separate browser no longer isolates demo events: persistence is in SQLite.** Rehearse with a copied database via `NOVA_DATABASE_URL`, or back up the real DB before an intentional reset. Browser tests use an isolated DB.

1. **Home, one sentence**: “NOVA 360 rassemble l’état opérationnel du projet, ses preuves et ce qui reste à faire.” Explain fictional NOVA and 64 fragmented sources. Show three things to know.
2. **Click 1 — current state**: “Voir l’état actuel”. October 22 conditional; Nicolas since September 16; authorized $204,000; unapproved $18,000 in INV-003. Baseline has **0/3** final confirmations, not an estimated health score.
3. **Click 2 — why**: approved date → Pourquoi? Show committee approval and precise locator. Original text remains French. The evidence dialog offers FR/EN; English summaries are labelled translations. The same citation/context remain selected.
4. **Global search in English**: Ctrl/Cmd K, “INV-003”, filter Questions, arrows and Enter. Q06: $54,000 under review, including $18,000 unapproved; $36,000 balance; corrected invoice/credit is a recommendation, not an issued document.
5. **History you can explain**: Project → Contradictions: plan v3 still says October 15; R-01 retains old follow-up despite validated INT-101. Decisions/Timeline: September 8 proposal differs from September 10 committee approval at 15:25. Formal authority and fact dates resolve the conflict; newer filenames alone do not.
6. **Admin / persistence**: Tools → Administration, add bilingual custom question “Où vérifier le problème d’INV-003 ?” / “Where can I verify the INV-003 issue?” Answer FR: “INV-003 inclut une ligne CR-04 de 18 000 $ sans approbation; consulter la facture et la demande de Finances.” Answer EN: “INV-003 includes an unapproved $18,000 CR-04 line; review the invoice and Finance request.” Link CIT-017 / CIT-018; keep team-curated status; save. Search the custom question, switch language, reload. It persists in SQLite. Official questions remain protected.
7. **Ask NOVA remains factual**: “Has security been accepted?” Sourced baseline answer plus current-event overlays. Unsupported queries remain insufficient; no external API.
8. **Judge event — strongest moment**: Tools → Impact, paste actual received content, source/locator, author/authority and date after baseline. Review candidates; confirm authority/validation only when the event establishes it. Compare changed/new/unchanged/pending facts, affected actions and recommendations. Save; show baseline/current; open raw event evidence. One validation cannot close unrelated conditions. Proposal ≠ approval; delivery ≠ validation.
9. **Handoff**: Tools → Takeover brief; print A4. Export journal when moving between separate databases. Browsers attached to the same server already share DB content.

## Synthetic rehearsal cases — never project evidence

Label each “Simulation — non corpus”; use a separate DB. Fact date must be after September 30, 09:00 Montréal.

- “Julien propose de revenir au 15 octobre.” Proposal: no approved decision replaced.
- “Sophie confirme SEC-210 accepté après re-test.” Simulated validation: security closes; accessibility/runbook remain open.
- “ACC-303 correction announced for the next build.” Uncertain announcement: no accepted correction.
- “ACC-303 validated and accepted by Mélissa after keyboard retest.” Explicit simulated validation: only that condition closes.
- “L’équipe propose un atelier de reprise.” Manually name a new fact, Proposal; no supersession or automatic action closure.

## Factual anchors

Q01 October 22 conditional. Q02 INT-101 validated September 17, no automatic date rollback. Q03 proposal September 8, committee approval September 10 at 15:25. Q04 Nicolas since September 16. Q05 $204,000 before tax. Q06 $18,000 unapproved in $54,000 invoice. Q07 Canada Central implemented and architecture-verified. Q08 delivered ≠ accepted. Q09 ACC-303 keyboard remains, labels/contrast closed. Q10 security + ACC-303 + approved runbook, missing rollback and post-deployment functional validation.
