# Calculator Landing Pages — Design (SEO Tier 2a)

**Date:** 2026-06-28
**Status:** Approved, ready for implementation
**Context:** First programmatic-SEO build for 6Pack NZ. Follows the SEO Tier 1
cleanup (`seo-tier-1-technical-cleanup` branch).

## Goal

Add a small pilot of high-quality, intent-specific landing pages built on the
existing fitness calculators, to capture high-intent long-tail search ("TDEE
calculator NZ", "macro calculator for weight loss", etc.) and establish a
reusable, data-driven page system we can scale once indexing/ranking is proven.

**Non-goal:** mass-producing thin "swap-the-keyword" doorway pages. Every page
must carry genuinely distinct, useful content or it risks a helpful-content
penalty — especially on a freshly-cleaned site.

## Key decisions (agreed)

- **First build:** calculator landing pages (not gym/location pages — the static
  gym dataset is only 12 gyms and would need a live-data strategy first).
- **URL structure:** nested under each calculator, `/calculators/<calc>/<variant>/`.
- **Launch size:** small pilot (~5 pages), verify indexing, then scale.
- **Content:** written in full as part of this work (genuinely distinct per page).

## Pilot pages

| URL | Target query |
|---|---|
| `/calculators/bmr/tdee-calculator/` | TDEE calculator NZ |
| `/calculators/macro/weight-loss/` | macro calculator for weight loss |
| `/calculators/macro/muscle-gain/` | macro calculator for muscle gain / bulking |
| `/calculators/body-fat/navy-method/` | navy body fat calculator |
| `/calculators/one-rep-max/bench-press/` | bench press 1RM calculator |

## Architecture

### Constraint
Each existing calculator (`src/app/calculators/<name>/page.jsx`) is a single
large client component (`<Name>CalculatorContent`, ~470–650 lines) that bundles
the interactive tool **and** its own marketing/intro content. Nothing is
currently extractable.

### Routing (data-driven, nested)
A dynamic `[variant]` segment per calculator folder:

```
src/app/calculators/bmr/[variant]/page.jsx
src/app/calculators/macro/[variant]/page.jsx
src/app/calculators/body-fat/[variant]/page.jsx
src/app/calculators/one-rep-max/[variant]/page.jsx
```

Each route: `generateStaticParams()` builds pages from the data module;
`generateMetadata()` pulls title/description/canonical from the same data.
Adding a future page = adding a data entry (no new files).

### Widget extraction (the crux / main risk)
Extract just the **interactive tool** (form + results + share) from each existing
page into a shared component, e.g. `src/components/calculators/BmrCalculator.jsx`,
accepting optional `prefill` / `variant` props.

- Existing `/calculators/<name>/page.jsx` keeps its marketing content and renders
  `<NameCalculator />` — behavior unchanged.
- Landing page renders variant-specific content (H1, intro, how-to, FAQ) +
  `<NameCalculator prefill={...} />`.

Trade-off: refactors 4 working calculators (regression risk), but it is the only
DRY option and benefits the whole site. Mitigated by extracting one at a time and
verifying after each.

## Data model — `src/data/calculatorLandingPages.js`

```js
export const calculatorLandingPages = {
  bmr: [
    {
      slug: 'tdee-calculator',          // -> /calculators/bmr/tdee-calculator/
      metaTitle: 'TDEE Calculator NZ – Daily Calorie Needs | 6Pack NZ',
      metaDescription: '...',           // ~155 chars, NZ-targeted
      h1: 'TDEE Calculator',
      intro: '...',                     // 2-3 paras, intent-specific
      prefill: {},                      // optional widget defaults
      sections: [                       // unique educational body
        { heading: 'How TDEE is calculated', body: '...' },
        { heading: 'TDEE vs BMR', body: '...' },
      ],
      faqs: [ { q: '...', a: '...' } ], // on-page FAQ + FAQ schema
      relatedArticles: ['nutrition-timing-optimal-performance-recovery'],
      relatedCalculators: ['macro', 'bmi'],
    },
  ],
  macro: [ /* weight-loss, muscle-gain */ ],
  'body-fat': [ /* navy-method */ ],
  'one-rep-max': [ /* bench-press */ ],
};
```

## Page template (`[variant]/page.jsx`, top → bottom)

1. Breadcrumbs (Home → Calculators → Parent → Variant) + `BreadcrumbList` schema
2. H1 + intro (variant-specific)
3. Calculator widget — `<NameCalculator prefill={variant.prefill} />` (high on page)
4. Educational `sections` (the unique long-form content)
5. FAQ section from `faqs[]` (doubles as `FAQPage` schema)
6. Related articles + related calculators (internal linking)
7. `MedicalDisclaimer` (reuse) on health calculators

## SEO layer

### Reusable schema components (in `src/components/SEO.jsx`)
- `FAQPageSchema` — from `variant.faqs[]` (highest value; FAQ rich snippets).
- `SoftwareApplicationSchema` — calculator as free web app
  (`applicationCategory: HealthApplication`, `offers` price 0).
- `BreadcrumbListSchema` — the breadcrumb trail.

### Sitemap
`app/sitemap.js` imports `calculatorLandingPages` and generates variant URLs
(same pattern it already uses for articles). Priority ~0.8, `monthly`, trailing
slashes.

### Internal linking (what makes them rank)
- Parent → variant: "Specialized calculators" block on each parent page.
- Variant → siblings & articles: `relatedCalculators` + `relatedArticles` blocks.
- Articles → variants: a couple of high-relevance links in the pilot (not a
  site-wide sweep yet).

### Canonicals
Each variant self-canonicals to its own trailing-slash URL. No
cross-canonicalization — these are distinct-intent pages, not duplicates.

## Testing & risk

- Extract one calculator at a time, verbatim; `npm run build` + manual dev
  smoke test (inputs, results, sharing, URL-param prefill) after each.
- Landing pages are all-new files — zero risk to existing routes.
- Build verification confirms `generateStaticParams` resolves all variants
  (build output lists the 5 new paths).
- Validate one FAQ page + one SoftwareApplication page in Google's Rich Results
  Test before scaling.
- No unit-test harness exists in the repo; build + manual + Rich Results is the
  proportionate bar for a content feature.

## Implementation sequence

1. Reusable schema components (`FAQPageSchema`, `SoftwareApplicationSchema`,
   `BreadcrumbListSchema`).
2. Extract widget #1 (BMR) → verify → create its `[variant]` route + TDEE data
   entry → verify end-to-end. **Validates the whole pattern on one calculator.**
3. Repeat extraction + variant for macro (×2), body-fat, one-rep-max.
4. Wire sitemap + parent→variant internal links.
5. Full build + manual smoke + Rich Results check.

## Future (out of scope for this pilot)

- Scale calculator variants once pilot pages are indexed and ranking.
- Tier 2b: location/gym pages (needs a live Google Places data strategy).
- `<img>` → `next/image` migration (separate performance pass).
