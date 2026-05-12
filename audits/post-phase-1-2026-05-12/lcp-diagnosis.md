# LCP diagnosis for index.html

## Measured

- Baseline (live, mobile): LCP 3.9 s
- Post-Phase-1 (local, mobile): LCP 3.6 s
- Target: < 2.0 s

Phase 1 head changes (titles, canonicals, JSON-LD, OG/Twitter, favicon swap) added ~5–6 KB to the document and a small parse cost. These do not affect LCP materially. The 3.6–3.9 s LCP persists from baseline and is not caused by Phase 1 work. The +5 Performance category jump on index.html (77 to 82) appears to come from the smaller favicon (16.7 KB to 0.18 KB SVG) and the removal of the duplicate-purpose PNG favicon download.

## Root cause (one paragraph)

The LCP element on index.html is the hero H1 ("Establishing the product operating model..."), which renders in DM Serif Display loaded from Google Fonts. Two contributors stack up: (1) the DM Serif Display woff2 file is requested via the asynchronous-stylesheet pattern (`media="print" onload="this.media='all'"`) and is not preloaded, so its fetch starts only after the stylesheet parses, costing roughly 400–600 ms of latency that an explicit `<link rel="preload" as="font">` would eliminate; (2) the Google Analytics gtag.js bundle is 158 KB and parses on the main thread early in page load, competing with the hero canvas init for CPU and pushing the time-to-paint of the H1 back by another 200–400 ms. The hero canvas itself is not the LCP element but contributes main-thread blocking before the H1 paints.

## Three fix options

| # | Option | Effort | Expected LCP win | Recommendation |
|---|---|---|---:|---|
| 1 | Preload DM Serif Display woff2 directly with `<link rel="preload" as="font" type="font/woff2" crossorigin>` and DM Sans 400. Keep Google Fonts as the source. | Low (~30 min) | 0.5–1.0 s | **Try first.** Cheapest test, no infra change. |
| 2 | Self-host the two woff2 files used above the fold (DM Serif Display 400, DM Sans 300/400). Drops 2 DNS + connect round trips to fonts.googleapis.com and fonts.gstatic.com. | Medium (~2 h) | 0.8–1.5 s | Do if option 1 leaves LCP > 2.5 s. |
| 3 | Inline critical above-the-fold CSS, defer the rest of styles.css. Move to a CSS extraction workflow (likely a small Node tool or hand-curated split). | High (~4–6 h) | 0.3–0.7 s incremental on top of options 1+2 | Skip unless absolutely necessary. ROI vs. effort is poor for a static site of this size. |

## Out of scope for Phase 1

Per item 2 of the revised plan, fixing this is your call. Not absorbed into Phase 1.
