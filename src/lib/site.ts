import { getCollection } from 'astro:content';

export const SITE = {
  name: 'Shrutika',
  description:
    'Essays on everyday life, the society around us, and the films that stay with us. Written by Shrutika.',
  email: 'hello@example.com', // change this
};

export const TOPICS = {
  life: { name: 'Life', blurb: 'Things that happened, and what they meant.' },
  society: { name: 'Society', blurb: 'How we live together, and why it is the way it is.' },
  movies: { name: 'Movies', blurb: 'Films, characters, and the minds behind them.' },
} as const;

export type Topic = keyof typeof TOPICS;

export function url(path = '') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '');
  return `${base}/${clean}`;
}

export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(d: Date) {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function readingTime(body: string) {
  const words = body.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}
