# Creator Works — Website

Marketing site for **Creator Works** (*Create. Build. Impact. / Ideas Into Income*) — a product studio that
turns creators' content into digital products at zero upfront cost.

Static HTML/CSS/JS. No build step, no dependencies.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home — hero, niche marquee, "hiding inside your content", niches, decision guide, 5-step process, stats, testimonials, free playbook |
| `about.html` | About Us — why we exist, values, studio team, the deal |
| `services.html` | Services — product types, build process, launch support, FAQ |
| `projects.html` | Our Projects — filterable case-study grid + stats |
| `playbook.html` | The Creator Product Playbook — free product landing page with the Whop call to action |
| `blog.html` | Blog — featured post and article grid |
| `start.html` | Start Your Project — brief form, what happens next, FAQ |

## Brand

Taken from the logo and *The Creator Product Playbook*:

- **Ink** `#111110` · **Gold** `#c2924e` · **Cream** `#f7f3ec` · **Sand** `#ece1d1`
- Display type: Plus Jakarta Sans 800 (heavy, tight, uppercase headlines)
- Body: Inter · Handwritten gold accents: Caveat
- Tokens live at the top of `assets/css/style.css` (`:root`)

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Deploy by uploading the folder to any static host (GitHub Pages, Netlify, Vercel, S3).

## Notes

- **Whop link placeholder:** every "Get it free on Whop" button on `playbook.html` points at
  `https://whop.com/creator-works/`. Replace both occurrences with your real Whop product URL.
- Every playbook call to action across the site now routes to `playbook.html` rather than the PDF,
  so the Whop store is the single delivery point.
- `assets/downloads/creator-product-playbook.pdf` is kept in the repo but is no longer linked;
  delivery happens through Whop.
- `assets/img/playbook-cover.jpg` is the playbook cover, extracted from page 1 of the PDF and shown in a
  CSS 3D book mockup (`.book3d`) on `playbook.html` and `blog.html`. To use a rendered mockup image
  instead, drop it in and remove the `.book3d__inner` spine/page pseudo-elements.
- `assets/img/logo-mark.svg` is a vector rebuild of the logo mark used in the nav, footer and favicon.
  Drop in the original brand artwork if you prefer the exact file.
- The brief form on `start.html` is front-end only — it shows a confirmation and resets.
  Point it at a form handler (Formspree, Netlify Forms, your own endpoint) before going live.
- Courses are presented as **coming soon** everywhere (services card, niche lists, decision guide, footer,
  brief form, FAQs) because filming hasn't started yet. When the studio launches, drop the `soon` /
  `is-soon` / `card--soon` classes and restore the full course copy in `services.html#courses`.
- Contact address `hello@creatorworks.co` and the social/DM calls to action are placeholders.
- Project stats, testimonials and blog posts are sample content — swap in real numbers before launch.
