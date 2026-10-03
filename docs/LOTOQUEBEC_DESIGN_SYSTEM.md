# Loto-Québec reference study

Observed 2026-10-03 using Chrome desktop (1440px) and mobile (390px) at https://loteries.lotoquebec.com/fr/loteries. Reproduce with `node scripts/design-research.mjs`. Computed style samples and screenshots are generated under ignored `artifacts/`.

## Observed values

| Computed reference | Value | NOVA role |
|---|---|---|
| Heading / dark text | rgb(0,2,51), `#000233` | navy headings/header |
| Main link / button | rgb(25,18,164), `#1912a4` | primary indigo |
| Blue link | rgb(0,8,255), `#0008ff` | selective interactive accent |
| Pill border | rgb(153,156,255), `#999cff` | control border |
| Surface | white, `#ffffff` | cards and content |
| Muted control text | rgb(83,83,83), `#535353` | secondary text |
| Body | LotoQc, sans-serif, 16px/400 | Arial/Helvetica/system sans 16px |
| Buttons | ~15px, weight 676/700 | 15px/700 |
| Pill radius | 21.825px or 9999px | rounded controls |
| Hero heading | 36px observed | responsive NOVA heading |

The official site combines layered navigation, pale-blue areas, white surfaces, navy/indigo text and cards, rounded outline controls, selective accents and large readable headings. Some header content loaded incompletely in the captured session; undocumented exact values are not claimed as measured brand standards. NOVA's pale backgrounds, border grays, spacing and semantic status colors are adaptation choices, explicitly distinct from measured colors.

## Adaptation

`src/styles/tokens.css` centralizes observed navy/indigo/blue/white/muted values and NOVA-specific background, border, status, spacing and radii. An institution strip sits above a product navigation bar; project context/baseline remains visible underneath. Five primary tasks (Home, Project, Actions, Evidence, Search) expose grouped secondary pages. Tools contains Impact, Ask, brief and admin.

Headings and body copy are larger than the original dense dashboard. Cards first show fact/state/relevance; detailed locators/history remain behind disclosures. Focus rings, keyboard navigation and text status labels retain accessible meaning without color dependence. Mobile gets a compact explicit menu.

No official HTML, logos, imagery or proprietary font binaries are copied. The institution name identifies the challenge context; NOVA is clearly a separate fictional-project intelligence tool, not the public lottery product.
