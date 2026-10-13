import { defineConfig } from 'astro/config';

// GitHub Pages setup:
// 1. Replace YOUR-USERNAME with the GitHub username.
// 2. If the repo is named YOUR-USERNAME.github.io, keep base as '/'.
//    Otherwise set base to '/repo-name' (for example '/shrutika').
export default defineConfig({
  site: 'https://aayushmk.github.io',
  base: '/swebsite',
  trailingSlash: 'always',
});