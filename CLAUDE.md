# Project notes for Claude Code

Personal blog for Shrutika, a psychology graduate who writes about her experiences,
society, and movies. Astro 4 static site, deployed to GitHub Pages via
.github/workflows/deploy.yml.

## Structure
- Articles: src/content/blog/*.md, schema in src/content/config.ts
  (title, description, date, topic: life|society|movies, draft)
- Shared config and helpers: src/lib/site.ts (always build links with url() so the
  GitHub Pages base path works)
- Inkblot.astro: deterministic symmetric inkblot generated at build time from a seed.
  It is the signature visual of the site. No client-side JS.
- Styles: src/styles/global.css (color tokens with a dark mode, Literata self-hosted
  via @fontsource-variable)

## Design rules
- Typography is the star: Literata only, generous line height, body measure about 38rem.
- One accent color (raspberry), indigo ink, cool lilac paper. No cards, no gradients.
- The only animation is the inkblot unfolding on load; respect reduced motion.
- Copy is plain and warm, in Shrutika's first-person voice. No em-dashes.
