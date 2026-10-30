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

## v2/ (alternative design, not deployed)
- A separate Astro project in v2/ with its own package.json (`npm --prefix v2 run dev`, port 4322).
- Deployed by the same workflow to /swebsite/v2/ (base in v2/astro.config.mjs).
- Reads the same articles from src/content/blog via import.meta.glob in v2/src/lib/site.ts.
- Two colours only (Königsblau ink on cool white paper), Bricolage Grotesque + Newsreader.
- Signature: the name unscrambles on load (v2/src/lib/shuffle.ts), reused by the anagram section.
- public/cv.pdf and public/portrait.jpg appear on the site automatically once added.
