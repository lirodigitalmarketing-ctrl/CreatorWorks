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

- `assets/downloads/creator-product-playbook.pdf` is the free lead magnet linked across the site.
- `assets/img/logo-mark.svg` is a vector rebuild of the logo mark used in the nav, footer and favicon.
  Drop in the original brand artwork if you prefer the exact file.
- The brief form on `start.html` is front-end only — it shows a confirmation and resets.
  Point it at a form handler (Formspree, Netlify Forms, your own endpoint) before going live.
- Contact address `hello@creatorworks.co` and the social/DM calls to action are placeholders.
- Project stats, testimonials and blog posts are sample content — swap in real numbers before launch.
