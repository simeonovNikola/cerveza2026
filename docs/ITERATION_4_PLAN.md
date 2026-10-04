# Iteration 4 plan — 2026-10-04

Provider correction (2026-10-04): user resources are Gemini, so current implementation uses Google GenAI generateContent, GEMINI_API_KEY/GOOGLE_API_KEY, GEMINI_MODEL and GEMINI_SUPPORT_ENABLED. The original audit/plan below records the initial OpenAI request; see AI_SUPPORT.md for current behavior.

Audit: support-chat is a bounded mock POST; panel is a native dialog with mascot/fallback/keyboard wrapping; short history stays client-local. Next 16, Prisma/SQLite, next-intl and DB sessions are retained. No OpenAI SDK currently installed. Existing normal tools public; server/admin guards remain unchanged. Working tree was clean at start of this iteration.

Official OpenAI documentation confirms Responses API, text.format strict JSON schema, official Node SDK and requested gpt-6-luna model. Install official openai and server-only. Model configured once via OPENAI_MODEL; default gpt-6-luna. User supplies OPENAI_API_KEY manually in ignored .env; never read its value into tool output.

Architecture: canonical shared app route paths; bilingual support knowledge/allowlist; keyword intent classifier; targeted official question/fact/condition/event summaries (no source corpus/password/session/users). Canonical replay preserves baseline/current distinctions. Server derives GUEST/USER/ADMIN. Strict model schema emits route/source keys, server resolves localized links and drops unknown/inaccessible keys. No model tools or mutations.

Bound requests/history/context/output; process-local session and IP quotas; same-origin cost protection; 12-second server deadline, no SDK retries; mock on disabled/missing/error/timeout/malformed output. Deterministic secret/injection refusal; read-only retrieval and plain text responses. Keep existing UI, add localized loading/retry/local-mode/source display and current pathname/view/history. No chat DB schema or streaming this iteration.

Tests: mock provider/SDK only, no live tests; missing/disabled/error/malformed/timeout, routes/roles/secret redaction, compact history, FR/EN and DB event truth; browser guest/USER/ADMIN, current page, fallback and injection. Run full lint/typecheck/unit/build/browser/data checks. Live test only when user's key is configured; otherwise document pending. Docs after meaningful phases. No commit/push.
