import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function getAllTags(posts: Post[]): Map<string, number> {
  const tags = new Map<string, number>();
  posts.forEach((post) => {
    post.data.tags.forEach((tag) => {
      tags.set(tag, (tags.get(tag) ?? 0) + 1);
    });
  });
  return new Map([...tags.entries()].sort((a, b) => b[1] - a[1]));
}

export function getAllCategories(posts: Post[]): Map<string, number> {
  const categories = new Map<string, number>();
  posts.forEach((post) => {
    const cat = post.data.category;
    if (cat) {
      categories.set(cat, (categories.get(cat) ?? 0) + 1);
    }
  });
  return new Map([...categories.entries()].sort((a, b) => b[1] - a[1]));
}

export function getPostsByTag(posts: Post[], tag: string): Post[] {
  return posts.filter((post) => post.data.tags.includes(tag));
}

export function getPostsByCategory(posts: Post[], category: string): Post[] {
  return posts.filter((post) => post.data.category === category);
}

export function groupPostsByYear(posts: Post[]): Map<number, Post[]> {
  const grouped = new Map<number, Post[]>();
  posts.forEach((post) => {
    const year = post.data.pubDate.getFullYear();
    if (!grouped.has(year)) grouped.set(year, []);
    grouped.get(year)!.push(post);
  });
  return new Map([...grouped.entries()].sort((a, b) => b[0] - a[0]));
}
