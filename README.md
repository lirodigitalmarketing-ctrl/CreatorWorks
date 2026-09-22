# Creator Works — Website

Marketing site for **Creator Works** (*Ideas Into Income*) — a product studio that
turns creators' content into digital products at zero upfront cost.

Static HTML/CSS/JS. No build step, no dependencies.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home — hero, niche marquee, "hiding inside your content", niches, decision guide, 5-step process, free playbook banner |
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

- The "Get it free on Whop" buttons (home page banner and `playbook.html` hero) point at
  `https://whop.com/creator-works-48b7/creator-works-playbook/`.
- Every playbook call to action across the site now routes to `playbook.html` rather than the PDF,
  so the Whop store is the single delivery point.
- `assets/downloads/creator-product-playbook.pdf` is kept in the repo but is no longer linked;
  delivery happens through Whop.
- Home hero: `assets/img/hero-bg.webp` (and `-sm` for phones) is the supplied desk photograph, anchored
  bottom-centre and darkened by a left-to-right gradient so the headline holds while the laptop, desk and city
  keep the right of the frame. Hero text and buttons on the home page are the light-on-dark variants.
- Niche imagery: `assets/img/niche-*.webp` are the supplied product shots (one per niche on the home page's
  Find your niche grid), resized to 1000px wide WebP. They replace the icon tiles on those six cards.
  Note `.card__shot` sets `height: auto` — without it the HTML `height` attribute overrides `aspect-ratio`
  and the cards render a tall centre crop.
- Book: `assets/img/Playbook Image.png` is the supplied 3D render. `playbook-book.png` is that file cropped
  to its artwork and scaled to 1100px tall, shown flat via `.book-shot` on `playbook.html` and `blog.html`.
  The render carries its own spine, page edges and shadow, so no CSS mockup is applied over it.
- Logo: `assets/img/Creator Works Image Logo.jpeg` is the supplied original. `logo-mark.png` is that file with
  the white background keyed out, squared and scaled to 512px (used in the header and as the favicon), and
  `logo-mark-light.png` is the same mark with the black recoloured to cream for the ink footer. Regenerate both
  from the source if the logo ever changes.
- The brief form on `start.html` is front-end only — it shows a confirmation and resets.
  Point it at a form handler (Formspree, Netlify Forms, your own endpoint) before going live.
- Courses are presented as **coming soon** everywhere (services card, niche lists, decision guide, footer,
  brief form, FAQs) because filming hasn't started yet. When the studio launches, drop the `soon` /
  `is-soon` / `card--soon` classes and restore the full course copy in `services.html#courses`.
- The header hides on scroll down via `.is-tucked`, deliberately **not** `.is-hidden` — that class is the
  projects filter's `display: none !important`, which killed the transition and caused a scroll-jump loop.
- Contact address `hello@creatorworks.co` is a placeholder.
- The Our Projects case studies, its stat row and the blog posts are sample content — swap in real numbers before launch.
