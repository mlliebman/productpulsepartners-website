// insights-manifest.js
//
// SOURCE OF TRUTH for which Operator Insights appear on /insights.html.
// Edit this file to publish, unpublish, or reorder cards on the index page.
//
// ─────────────────────────────────────────────────────────────────────────────
// THE RULE
// ─────────────────────────────────────────────────────────────────────────────
// An insight article is either:
//   PUBLISHED   = linked from /insights.html AND no noindex tag in its HTML
//   UNPUBLISHED = not linked from /insights.html AND noindex tag in place
//
// Nothing in between. Don't link a page that's still noindexed (search engines
// see a dead end), and don't strip noindex on a page that isn't linked yet
// (the article is exposed without the index introducing it).
//
// ─────────────────────────────────────────────────────────────────────────────
// PUBLISHING WORKFLOW
// ─────────────────────────────────────────────────────────────────────────────
// To publish an insight on /insights.html:
//   1. Set its `published` field below to true.
//   2. Fill in `publishDate` (ISO format, e.g. "2026-04-27") — used for sorting.
//   3. Fill in `displayDate` (human-readable, e.g. "April 2026") — shown on card.
//   4. Open the insight's HTML file and DELETE this line:
//        <meta name="robots" content="noindex, nofollow">
//      Required, not optional. Removing this is what makes the article
//      indexable by search engines, which is the whole point of publishing.
//   5. Commit and push.
//
// To unpublish an insight:
//   1. Set `published` back to false (card disappears from /insights.html).
//   2. Restore <meta name="robots" content="noindex, nofollow"> in the
//      insight's HTML file. Search engines will drop it from the index on
//      next crawl. The URL still works for anyone with a direct link.
//
// Card sort order: newest publishDate first.
//
// ─────────────────────────────────────────────────────────────────────────────
// TAGS / COLORED PILLS
// ─────────────────────────────────────────────────────────────────────────────
// Each insight has a `tags` array. Each tag renders as a colored pill on the
// card. Use 1 or 2 tags per insight. Adding a new tag string adds a generic
// gray pill; for a custom color, add a CSS rule in /insights.html:
//
//   .insight-pill--my-new-tag { background: #...; color: #...; }
//
// Current tag palette:
//   "AI Investment"  → teal
//   "Data Quality"   → amber
//   "Diligence"      → red
//   "Product Org"    → slate-purple
//   "Roadmap"        → orange
//
// ─────────────────────────────────────────────────────────────────────────────

const INSIGHTS = [
  {
    slug: 'ai-as-cost-vs-lever',
    title: 'You paid for the AI. Nobody built the system.',
    summary: 'Why AI investment inside PE-backed product orgs has no defensible return, and the three gaps causing it.',
    audience: 'For PE operating partners',
    tags: ['AI Investment'],
    publishDate: '2026-04-27',
    displayDate: 'April 2026',
    published: true,
  },
  {
    slug: 'data-as-the-ai-bottleneck',
    title: 'The data underneath is where the failure actually lives.',
    summary: 'Five data-quality failure modes that make AI investments unworkable, and what a forensic audit surfaces.',
    audience: 'For PE diligence teams',
    tags: ['AI Investment', 'Data Quality'],
    publishDate: '',
    displayDate: '',
    published: false,
  },
  {
    slug: 'the-drift-problem',
    title: 'The metric the AI trained on may not mean what it means today.',
    summary: 'Schema drift is the data quality failure mode that breaks AI investments quietly.',
    audience: 'For PE diligence teams',
    tags: ['Data Quality'],
    publishDate: '',
    displayDate: '',
    published: false,
  },
  {
    slug: 'the-execution-gap',
    title: 'PE diligence rarely asks whether the team can deliver the thesis.',
    summary: 'The execution gap is where most value creation plans fail. Six diligence questions that would have surfaced it.',
    audience: 'For PE operating partners',
    tags: ['Diligence'],
    publishDate: '',
    displayDate: '',
    published: false,
  },
  {
    slug: 'the-political-roadmap',
    title: 'A product roadmap is a political document.',
    summary: "Why one roadmap can't serve four readers, and what specialization looks like in practice.",
    audience: 'For product leaders and CEOs',
    tags: ['Product Org', 'Roadmap'],
    publishDate: '',
    displayDate: '',
    published: false,
  },
  {
    slug: 'the-cim-cracks',
    title: 'The most useful information in a CIM is in the cracks between sections.',
    summary: "The diligence work of finding the story the CIM didn't tell. Six common cracks, one worked example, and what systematic crack-finding produces.",
    audience: 'For deal teams and advisory partners',
    tags: ['Diligence'],
    publishDate: '2026-04-28',
    displayDate: 'April 2026',
    published: true,
  },
  {
    slug: 'the-three-lens-framework',
    title: 'Most AI evaluations conflate three different questions.',
    summary: 'Three lenses for AI investment: Opportunity, Readiness, Deployment. Applied in sequence, before capital commits.',
    audience: 'For PE operating partners and CAIOs',
    tags: ['AI Investment'],
    publishDate: '2026-04-30',
    displayDate: 'April 2026',
    published: true,
  },
];
