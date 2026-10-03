# Question administration

Routes: `/fr/admin`, `/en/admin`, accessible under Tools. This is a clearly labelled **local demonstration interface without authentication**. Keep it bound to localhost; production authentication is on the roadmap.

The question bank lists both languages, official/custom type, active state, updated time and edit controls. Q01–Q10 are read-only, enforced by API and SQLite triggers. Only custom questions can be created/edited, reordered or deactivated. There is no source/baseline/fact editor and no official deletion control.

Create a custom question with both questions and answers, optional bilingual nuance, topic tags, display order, information state, active flag and citation checkboxes. Citations are selected by stable ID and retain their original locator. Without a linked citation the status must be **To confirm**. Linked evidence does not automatically prove a custom claim; custom content carries a team-curated/moderate-or-uncertain label.

Save persists a single bilingual Question and QuestionEvidence records in a transaction. Each modification has timestamps, source `admin` and a before/after AdminAudit entry. Deactivation hides the question from public pages/search; the record and audit history remain.

API: GET/POST `/api/admin/questions`; PUT `/api/admin/questions/:id`. Inputs are bounded, bilingual fields and citation IDs validated. Protected official content returns 403. This is intentionally a narrow CMS; custom actions and broader narrative editing are deferred.

The service whitelists editable fields even when a UI/API caller supplies read-only row metadata. Official protection occurs before editable-body validation. Empty/whitespace-only bilingual required fields are refused; optional nuance must be bilingual when supplied.
