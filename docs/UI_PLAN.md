# Bilingual product UX

Reference study: Loto-Québec public lotteries site, observed in Chrome 2026-10-03. See LOTOQUEBEC_DESIGN_SYSTEM.md for exact computed values and adaptation choices. Central tokens use observed navy/indigo/blue, white surfaces and pill controls; Arial fallback avoids redistributing proprietary LotoQc fonts.

Iteration 3 homepage: concise title/subtitle; six factual cards (independent launch conditions, decisions, approved launch date, responsible people, historical contradictions, remaining actions), compact timeline and original documents. About block removed. Header natural-language form routes to Ask NOVA; no competing home search. Bottom Ask NOVA CTA gives next-step access.

Primary navigation is a left sidebar: overview, timeline, Q01–Q10, decisions, actions, risks/history, traceable evidence, documents, team; ADMIN also gets Question Bank and Users. Existing Impact, Ask NOVA and brief remain reachable. Strong blue header includes profile/auth, subtle global locale and prominent question field. Mobile drawer and stacked cards. Support button stays bottom-right, opening a native focus-trapped dialog. Duplicate evidence locale controls removed; Question Bank table shows global language and 16px extra content separation.

Existing detailed evidence, typed events, Decision DNA, documented/recommended actions, contradiction comparisons and original questions remain accessible. Default cards prioritize fact/state/relevance; disclosures preserve deep locators/relationships. Source titles and exact locator text remain original. English source view explicitly distinguishes original French evidence from translated summaries.

Search uses a native-dialog command palette, 180ms debounce, typed results/filters/snippets and keyboard arrows/Enter/Escape. Admin provides side-by-side bilingual content fields and a bounded citation picker. Official records are protected and visibly read-only.

Accessibility: locale html.lang, semantic headings, labelled controls, native-dialog focus/Escape, visible focus rings, skip link, written status labels, reduced motion and adequate contrast. Validate at 390px, 820px and desktop with no body overflow. Preserve the one-page print brief; print hides all new navigation.

Custom questions follow the protected official bank in a separate team section. Navigation uses human labels; full IDs remain in link targets. Active custom content is tested at mobile width. Baseline/current/original/event/team scopes are explicit in search.

Iteration 3 final accessibility: support explicitly wraps Tab and returns focus to the input after sending; Escape closes. Auth labels/autocomplete/error association and mobile registration verified. Advanced source relationships/metadata are inside View details; original source/locator remain visible.
