# Interactive project search

Search is a primary route (`/fr/search`, `/en/search`) and a modal command palette opened with the header control or Ctrl/Cmd K. Empty queries offer launch, conditions, INV-003, security, accessibility, budget and owner shortcuts.

The service queries DB repositories for sources, facts, questions, decisions, actions, timeline, contradictions and people. Matching normalizes case and diacritics. All query tokens must occur in the record's title/ID/content or other-language derived presentation. Both French and English queries find the same underlying entity.

Ranking prioritizes exact ID/title matches, then title matches, then narrative text; other-language matches receive lower weight. Results have type, state, highlighted terms, snippet and destination. Filters select category and useful information states; counts reflect matching records. The local corpus is small enough for deterministic in-memory matching over DB query results; no embeddings or external AI.

Client requests debounce 180ms and cancel obsolete requests. ↑/↓ selects, Enter opens from the input, Escape closes the palette; native dialog focus trapping and labelled combobox/listbox expose keyboard state. Source results select the source explorer, question/entity results target their anchor, fact results open their citation. Result limits are 40, while counts report all matches.

Original source snippets may be French on English pages and are labelled as original evidence. Search is factual retrieval, not a generated answer. Search replays DB events to retrieve current facts/action states; changed facts open their event evidence. Original question/decision/history results carry a Baseline scope label; custom items carry a Team content label. Received journal evidence/timeline records are also searchable and keep their original input language. Semantic synonyms remain a future improvement.
