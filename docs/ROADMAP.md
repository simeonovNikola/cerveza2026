# Product roadmap

Completed: original evidence/Q01–Q10/baseline/Impact/Ask NOVA/brief; Iteration 2 Prisma persistence, bilingual search/custom questions; Iteration 3 local users/sessions/admin protection, user activation management, simplified dashboard and mascot support; Iteration 4 server-only grounded Gemini generateContent support with role/page context, route/source allowlist and local fallback. Current SDK/request compatibility and live text/context/schema success demonstrated; upstream 504 deadlines remain intermittent.

Next recommended iteration (5): run credentialed FR/EN support grounding evaluations, including roles, current page, INV-003 and injection/refusal; expand targeted follow-up/synonym retrieval using that evidence. Add deployment-ready trusted-proxy/shared rate limiting and auth operations (credential recovery/rotation, email verification, expired-session cleanup), HTTPS, persistent SQLite backups and fallback monitoring.

Keep role editing behind explicit self/last-admin rules/tests; current roles remain read-only. Audit-history UI and improved deterministic search/navigation synonyms remain useful follow-ups. Streaming and persisted chat logs are optional after privacy/retention requirements are decided; neither is needed for the current demo.

Support must remain read-only, grounded and distinct from factual Ask NOVA. Model/provider changes must preserve server-only keys, compact context, safe localized route/source resolution, bilingual tests and graceful fallback. Broader project editing/new-source ingestion requires separate reviewed work; baseline/original evidence and official Q01–Q10 remain protected.
