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
├── fractional-cpo.html     Post-close · embedded product leadership
├── ai-platform.html        The agentic workflow platform
├── about.html              About Marc
├── contact.html            Contact form (FormSubmit.co)
├── thank-you.html          Form confirmation
├── styles.css              Shared design system
├── app.js                  Nav, mobile menu, scroll-reveal
├── marc-headshot.jpg
├── CNAME                   GitHub Pages custom domain
└── legacy/                 Archived Product Pulse Partners site
```

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

Uses [FormSubmit.co](https://formsubmit.co) as a no-backend handler. Submissions route to `marclliebman@gmail.com` and redirect to `thank-you.html`. The email address is never displayed on the site — contact happens via the form or a hidden mailto link.

---

© 2026 Marc Liebman · theproductoperator.ai
