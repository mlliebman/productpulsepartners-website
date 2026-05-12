# /audits/

Phase 0 baseline captures and subsequent post-Phase 1 re-runs for the Tier 1 SEO / schema / on-page execution. Directory naming convention: `baseline-YYYY-MM-DD/` for the pre-change capture, `post-phase-1-YYYY-MM-DD/` for the after capture.

Each directory contains:
- `baseline.md` — the human-readable summary
- `page-metadata-baseline.csv` — machine-readable per-page metadata
- `em-dash-inventory.md` — full per-file inventory
- `lighthouse-mobile-{page}.json` — raw Lighthouse JSON per priority page

Do not delete prior baselines; the comparison is the whole point.
