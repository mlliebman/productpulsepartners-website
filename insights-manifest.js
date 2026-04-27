// insights-manifest.js
//
// SOURCE OF TRUTH for which Operator Insights appear on /insights.html.
// Edit this file to publish, unpublish, or reorder cards on the index page.
//
// ─────────────────────────────────────────────────────────────────────────────
// PUBLISHING WORKFLOW
// ─────────────────────────────────────────────────────────────────────────────
// To publish an insight on /insights.html:
//   1. Set its `published` field to true.
//   2. Fill in `publishDate` (ISO format, e.g. "2026-04-27") — used for sorting.
//   3. Fill in `displayDate` (human-readable, e.g. "April 2026") — shown on card.
//   4. (Optional, for SEO) Open the insight's HTML file and remove the line:
//        <meta name="robots" content="noindex, nofollow">
//      This makes the insight indexable by search engines. Skip this step if
//      you want to keep the insight URL-only (e.g. for LinkedIn-driven traffic).
//   5. Commit and push.
//
// To unpublish an insight: set `published` back to false. The insight URL keeps
// working for anyone with the link, but the card disappears from /insights.html.
//
// Card sort order: newest publishDate first.
//
// ─────────────────────────────────────────────────────────────────────────────

const INSIGHTS = [
  {
    slug: 'ai-as-cost-vs-lever',
    title: 'You paid for the AI. Nobody built the system.',
    summary: 'Why AI investment inside PE-backed product orgs has no defensible return, and the three gaps causing it.',
    audience: 'For PE operating partners',
    publishDate: '',
    displayDate: '',
    published: false,
  },
  {
    slug: 'data-as-the-ai-bottleneck',
    title: 'The data underneath is where the failure actually lives.',
    summary: 'Five data-quality failure modes that make AI investments unworkable, and what a forensic audit surfaces.',
    audience: 'For PE diligence teams',
    publishDate: '',
    displayDate: '',
    published: false,
  },
  {
    slug: 'the-drift-problem',
    title: 'The metric the AI trained on may not mean what it means today.',
    summary: 'Schema drift is the data quality failure mode that breaks AI investments quietly.',
    audience: 'For PE diligence teams',
    publishDate: '',
    displayDate: '',
    published: false,
  },
  {
    slug: 'the-execution-gap',
    title: 'PE diligence rarely asks whether the team can deliver the thesis.',
    summary: 'The execution gap is where most value creation plans fail. Six diligence questions that would have surfaced it.',
    audience: 'For PE operating partners',
    publishDate: '',
    displayDate: '',
    published: false,
  },
  {
    slug: 'the-political-roadmap',
    title: 'A product roadmap is a political document.',
    summary: "Why one roadmap can't serve four readers, and what specialization looks like in practice.",
    audience: 'For product leaders and CEOs',
    publishDate: '',
    displayDate: '',
    published: false,
  },
  {
    slug: 'the-cim-cracks',
    title: 'The most useful information in a CIM is in the cracks between sections.',
    summary: "The diligence work of finding the story the CIM didn't tell. Six common cracks, one worked example, and what systematic crack-finding produces.",
    audience: 'For deal teams and advisory partners',
    publishDate: '',
    displayDate: '',
    published: false,
  },
];
