# Phase 0 Baseline — 2026-05-12

Pre-Tier 1 baseline capture for the Tier 1 SEO + schema + on-page execution. This document is the reference point against which Phase 1 (commit 2) and Phase 2 (commit 3) are measured. Per the agreed ROI window, GSC ranking impact is not expected to surface for 3–6 months; indexing of changes takes 2–4 weeks. Flat results at the 30-day mark are not a failure of the work.

## Scope

- 21 HTML files in the repository root
- 12 indexable pages (Tier 1 active SEO scope)
- 9 noindex pages: 2 redirect stubs (`about.html`, `fractional-cpo.html`), 3 legal/utility (`privacy.html`, `terms.html`, `thank-you.html`), 4 unpublished insights (`data-as-the-ai-bottleneck.html`, `the-drift-problem.html`, `the-execution-gap.html`, `the-political-roadmap.html`)

## Lighthouse mobile (live site, headless Chrome 148, lighthouse 11.x)

Raw JSON outputs saved as `lighthouse-mobile-{page}.json` in this directory.

| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---|---|---|
| index | 77 | 93 | 100 | 100 | 3.9 s | 0.001 | 290 ms |
| due-diligence | 93 | 93 | 100 | 100 | 1.5 s | 0.054 | 290 ms |
| leadership | 84 | 93 | 100 | 100 | 1.5 s | 0.02 | 620 ms |
| ai-platform | 96 | 95 | 100 | 100 | 1.6 s | 0.022 | 210 ms |

**Notes on baseline scores:**
- Performance: `index.html` is the weakest at 77, driven by 3.9s LCP. Likely culprits: hero canvas animation, Google Fonts blocking-render, font-display strategy. The other three pages are healthy.
- Accessibility 93–95: room to improve but not a Tier 1 priority.
- Best Practices 100 across the board.
- **SEO 100 is misleading.** Lighthouse's SEO category checks only basics (title present, meta description, mobile-friendly, indexable). It does NOT check uniqueness of titles, canonical presence, schema markup, or per-page differentiation. All four of those are absent today (see below). The Lighthouse SEO score will remain 100 after Tier 1 because it was never the limiting factor; the actual SEO lift will appear in GSC impressions/position/CTR over 3–6 months, not in this number.
- LCP target post-Phase 1: < 2.0s on index.html. Other pages already there.
- CLS target: all under 0.05. due-diligence at 0.054 marginally over.
- TBT target: under 300ms on all four. leadership.html at 620ms needs investigation.

## Metadata baseline — all 21 pages

Machine-readable version: `page-metadata-baseline.csv`.

**Aggregate findings:**

| Signal | Indexable pages (12) | All pages (21) |
|---|---:|---:|
| Pages with unique `<title>` (not "The Product Operator") | 1 of 12 (`insights.html`) | 1 of 21 |
| Pages with `<link rel="canonical">` | 0 of 12 | 2 of 21 (both on noindex stubs) |
| Pages with any JSON-LD schema | 0 of 12 | 0 of 21 |
| Pages with `og:title` | 12 of 12 (homepage propagates) | 13 of 21 |
| Pages with `twitter:card` | 5 of 12 (insights only) | 7 of 21 |
| Pages with em-dashes (U+2014) in content/meta | 11 of 12 | 16 of 21 |

**Specific issues to fix in Phase 1:**
1. 20 of 21 `<title>` tags are the literal string `The Product Operator`. Zero search differentiation.
2. Zero canonical tags on indexable pages. Risk of duplicate-content issues if/when GH Pages serves `/due-diligence` and `/due-diligence.html` as separate URLs.
3. Zero JSON-LD schema anywhere on the site. Largest single technical lever for Tier 1.
4. OG/Twitter meta tags are inconsistent — present on insights but missing or generic on service pages.
5. Open Graph URL pattern is already extensionless on some insights (e.g., `og:url` = `https://theproductoperator.ai/the-product-operator-profile`), which aligns with the agreed Tier 1 extensionless canonical convention.

## Em-dash inventory

- **Total occurrences: 102 across 16 files.**
- Heaviest concentrations: `privacy.html` (21), `ai-platform.html` (13), `leadership.html` (10), `index.html` (7), `due-diligence.html` (6).
- Most occur in body copy; some appear in `og:title`, `og:description`, and `meta description` tags.
- **Tier 1 rule:** zero em-dashes in any NEW copy produced (titles, canonicals, schema descriptions, OG/Twitter copy, FAQ answers, H1/lede rewrites).
- **Existing em-dashes:** flagged for editorial cleanup in a separate pass. Not blocking Tier 1. Full per-file inventory in `em-dash-inventory.md`.

## Schema validation baseline

Result: **no JSON-LD blocks present on any of the 21 HTML files.** Validator output therefore empty across the board. Recorded here as the explicit before-state; after Phase 1, every indexable page will validate against [validator.schema.org](https://validator.schema.org/) and Google's Rich Results Test with zero errors.

## Asset inventory

| Asset | Size | Notes |
|---|---:|---|
| `styles.css` | 52,885 B | Single design system stylesheet, no framework |
| `marc-headshot.jpg` | 118,605 B | Used on `/approach`, candidate for `Person.image` schema field |
| `linkedin_logo_500.png` | 16,677 B | Currently used as both favicon AND apple-touch-icon. **Phase 1 #8:** replace as favicon with SVG (target < 1 KB); keep PNG for `apple-touch-icon` |
| `app.js` | 11,495 B | Nav, mobile menu, scroll reveal |
| `insights-manifest.js` | 7,313 B | Source of truth for `/insights.html` cards |
| `sitemap.xml` | 2,283 B | 12 URLs, currently mixes `/` and `.html` paths. Phase 1: rewrite to extensionless |
| `robots.txt` | 95 B | Allow all, sitemap declared, `/legacy/` disallowed |

Asset totals are healthy. No Phase 1 optimization required beyond the favicon swap.

## Tooling decisions (recorded for Phase 1)

- **Schema source of truth:** option (b) from the revised plan. Shared schemas live in `/schema/shared/*.json`. A `scripts/assemble-schema.sh` script reads them and replaces a `<!-- SCHEMA:SHARED -->` marker in every page's `<head>` via `sed`. Idempotent, no Node/Python dependency, no git hook, documented in README. Per-page schemas (Service, SoftwareApplication, Article, BreadcrumbList, FAQPage) are inline but reference shared Person/Organization by `@id`.
- **Canonical URL convention:** extensionless (e.g., `https://theproductoperator.ai/due-diligence`). Sitemap will be rewritten in the same pass.
- **OG default image for insights:** `/assets/og-default-insights.png` (1200×630) generated programmatically with Pillow during Phase 1.
- **Lighthouse environment:** local headless Chrome via `@puppeteer/browsers` (Chrome 148, installed at `/tmp/chrome/`). PSI API rejected due to zero anonymous quota. Same setup will be used for the Phase 1 re-run.

## GSC / Bing baseline

Out of scope for codespace capture (requires user login). Captured separately by the operator; impressions / position / CTR for the 20 target keywords will be shared into this directory when collected.
