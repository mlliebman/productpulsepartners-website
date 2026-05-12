# The Product Operator

**Precise product leadership for PE-backed B2B SaaS.**

Fractional CPO and buy-side advisor to PE-backed B2B SaaS companies. Due diligence, embedded product leadership, and a purpose-built agentic workflow platform deployed directly into portfolio company operations.

Live: [theproductoperator.ai](https://theproductoperator.ai)

---

## Structure

```
/
├── index.html              Homepage
├── due-diligence.html      Pre-close · technical & product due diligence
├── leadership.html         Advisory & Chief Product Officer engagements
├── ai-platform.html        The agentic workflow platform
├── approach.html           About Marc
├── insights.html           Operator Insights index
├── contact.html            Contact form (FormSubmit.co)
├── thank-you.html          Form confirmation
├── privacy.html · terms.html
├── about.html · fractional-cpo.html   noindex redirect stubs
├── the-*.html · ai-as-cost-vs-lever.html · data-as-the-ai-bottleneck.html
│                           Operator Insights articles
├── insights-manifest.js    Source of truth for which insights appear on /insights
├── styles.css              Shared design system
├── app.js                  Nav, mobile menu, scroll-reveal
├── marc-headshot.jpg
├── favicon.svg             Site favicon (teal dot, matches .nav-dot)
├── linkedin_logo_500.png   apple-touch-icon and OG image fallback
├── sitemap.xml             Submitted to GSC and Bing
├── robots.txt
├── CNAME                   GitHub Pages custom domain
├── assets/                 Static assets
│   └── og-default-insights.png   Fallback OG image for insight articles
├── audits/                 Phase 0 baseline and post-Phase-1 Lighthouse runs
├── schema/                 JSON-LD shared schema source files
│   └── shared/             Person, Organization, WebSite (single source of truth)
├── scripts/                Build helpers (run manually)
│   ├── assemble-schema.sh  Injects shared JSON-LD into pages with SCHEMA:SHARED markers
│   └── generate-og-default.py   Regenerates /assets/og-default-insights.png
└── legacy/                 Archived Product Pulse Partners site
```

## Schema architecture

JSON-LD is split into shared and page-specific blocks.

**Shared (Person, Organization, WebSite)** lives in `/schema/shared/*.json` and is the
single source of truth. Each indexable page contains marker comments:

```html
<!-- SCHEMA:SHARED:START -->
<!-- SCHEMA:SHARED:END -->
```

To re-sync every page after editing any shared file, run:

```bash
bash scripts/assemble-schema.sh
```

The script reads the three shared JSON files, wraps each in
`<script type="application/ld+json">`, and replaces the content between the
markers in every `*.html` file at the repo root. Idempotent. No Node or Python
required (bash + awk only). To onboard a new page, add the marker pair
inside its `<head>` and re-run.

**Page-specific schema** (Service, SoftwareApplication, AboutPage, ContactPage,
CollectionPage, Article + BreadcrumbList, FAQPage when added) sits inline in each
page below the SCHEMA:SHARED:END marker. Page-specific schemas reference the
shared Person and Organization by `@id` to avoid duplication.

## Editorial: zero em-dashes

No em-dashes (U+2014) anywhere in copy or metadata. Em-dash audit before commit:

```bash
grep -P -c -- '\x{2014}' <file>
```

Result must be `0` on every file touched in a change set.

## Design system

- **Fonts:** DM Serif Display (headlines) + DM Sans 300/400/500 (body)
- **Palette:** white `#ffffff`, black `#0a0a0a`, teal `#009e85` / `#00c9a7`, off-white `#f8f7f4`, slate `#6b7280`
- All shared styles in `styles.css`. No frameworks. Vanilla JS only.

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Deployment

Hosted on GitHub Pages from `main`. The `CNAME` file pins the custom domain. Pushes to `main` deploy automatically.

## Contact form

Uses [FormSubmit.co](https://formsubmit.co) as a no-backend handler. Submissions route to `marclliebman@gmail.com` and redirect to `thank-you.html`. The email address is never displayed on the site. Contact happens via the form or a hidden mailto link.

---

© 2026 Marc Liebman · theproductoperator.ai
