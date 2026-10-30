import fs from 'node:fs';
import type { MarkdownInstance } from 'astro';

export const SITE = {
  name: 'Shrutika',
  description:
    'Shrutika is a psychology graduate, writer and speaker. She writes about everyday life, society and film, in English and German.',
  email: 'hello@example.com', // change this
  linkedin: '', // full LinkedIn URL; the link is hidden while this is empty
};

export const TOPICS = {
  life: 'Life',
  society: 'Society',
  movies: 'Movies',
} as const;

export type Topic = keyof typeof TOPICS;

export function url(path = '') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '');
  return `${base}/${clean}`;
}

// Optional files in public/. Each one shows up on the site once it exists.
export const HAS_CV = fs.existsSync(new URL('../../public/cv.pdf', import.meta.url));
export const HAS_PORTRAIT = fs.existsSync(new URL('../../public/portrait.jpg', import.meta.url));

type Frontmatter = {
  title: string;
  description: string;
  date: string | Date;
  topic: Topic;
  draft?: boolean;
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: Date;
  topic: Topic;
  words: number;
  Content: MarkdownInstance<Frontmatter>['Content'];
};

// Articles live in the main site's src/content/blog, shared by both designs.
const files = import.meta.glob<MarkdownInstance<Frontmatter>>('../../../src/content/blog/*.md', {
  eager: true,
});

export function getPosts(): Post[] {
  return Object.entries(files)
    .filter(([, file]) => !file.frontmatter.draft)
    .map(([path, file]) => ({
      slug: path.split('/').pop()!.replace(/\.md$/, ''),
      title: file.frontmatter.title,
      description: file.frontmatter.description,
      date: new Date(file.frontmatter.date),
      topic: file.frontmatter.topic,
      words: file.rawContent().trim().split(/\s+/).length,
      Content: file.Content,
    }))
    .sort((a, b) => b.date.valueOf() - a.date.valueOf());
}

export function formatDate(d: Date) {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function shortDate(d: Date) {
  return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}

export function readingTime(words: number) {
  return `${Math.max(1, Math.round(words / 220))} min read`;
}
