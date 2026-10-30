import { defineConfig } from 'astro/config';

// A second design for the same site. It reads the articles from the main
// site's src/content/blog, so both versions always show the same writing.
// Published next to the main site at /swebsite/v2/. To make it the main site, set base to '/swebsite'.
export default defineConfig({
  site: 'https://aayushmk.github.io',
  base: '/swebsite/v2',
  trailingSlash: 'ignore',
  vite: {
    server: { fs: { allow: ['..'] } },
  },
});
