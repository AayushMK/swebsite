# Shrutika's writing

A personal blog built with Astro and hosted on GitHub Pages. Every article gets its own
inkblot, generated from its title.

## Run it locally

    npm install
    npm run dev

Then open http://localhost:4321

## Publish an article

1. Add a new file in `src/content/blog/`, for example `my-new-article.md`.
   The file name becomes the link: `/writing/my-new-article/`.
2. Start the file like this:

       ---
       title: The title of the article
       description: One sentence that appears under the title.
       date: 2026-10-20
       topic: life        # life, society or movies
       ---

       The article starts here. Use a blank line between paragraphs.

       ## A subheading

       > A quote looks like this.

3. Commit and push to `main`. The site rebuilds itself in about a minute.

She can also do this without any code tools: on github.com, open `src/content/blog`,
click "Add file", then "Create new file", paste the article, and commit.

To keep an article hidden while it's unfinished, add `draft: true` under `topic`.

## Before going live

- Delete the three `sample-*.md` files in `src/content/blog/`.
- Rewrite the About page in `src/pages/about.astro` in her own words.
- Change the email in `src/lib/site.ts`.
- Set `site` and `base` in `astro.config.mjs` (instructions are in the file).
- On GitHub: Settings, then Pages, then set Source to "GitHub Actions".
# SWebsite
