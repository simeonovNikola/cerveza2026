# Product roadmap

## Done before iteration 2
- Reviewed corpus, official Q01–Q10, fact ledger, evidence, history/contradictions, Impact semantics, local Ask NOVA, printable brief.

## Done — iteration 2
- Portable canonical SQLite/Prisma runtime, verified seed/equivalence.
- Full French/English presentation, grouped navigation and task-oriented homepage.
- Interactive all-entity search and protected bilingual custom question management.
- Regression/accessibility/browser validation and team documentation (18 unit / 13 browser tests).

## Current
- Demo rehearsal and team review; no implementation blocker.

## Next
- Expand deterministic query synonyms and ranking; current facts and event-journal text are already searchable.
- Review custom-question evidence quality, optionally expose audit history in the UI.
- Expand bilingual content editing to team recommendations with scoped permissions.
- Deployment with writable persistent SQLite storage and backup procedures.

## Future Phase — NOVA Navigation Assistant
Help users find pages and workflows in French and English: invoice details, date-change explanations, open launch conditions, INV-003, baseline comparison. It uses existing routes, structured evidence and search. This is separate from **Ask NOVA**, which answers what is true about the project.

Optional external AI API integration only after deterministic retrieval and navigation are reliable; require explicit scope, citations, uncertainty and bilingual interaction. No API/key integration in this iteration. Additional source ingestion, richer admin, optional authentication if productized and deployment improvements follow user priorities.
