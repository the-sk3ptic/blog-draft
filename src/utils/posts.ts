import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export interface SeriesNav {
  seriesName: string;
  currentIndex: number;
  total: number;
  prevPost: { title: string; slug: string } | null;
  nextPost: { title: string; slug: string } | null;
}

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

/**
 * 获取所有合集及其文章（按合集阅读顺序升序排序）
 */
export function getAllSeries(posts: Post[]): Map<string, Post[]> {
  const seriesMap = new Map<string, Post[]>();

  posts.forEach((post) => {
    const series = post.data.series;
    if (series?.name) {
      if (!seriesMap.has(series.name)) {
        seriesMap.set(series.name, []);
      }
      seriesMap.get(series.name)!.push(post);
    }
  });

  // 每个合集内部按 order 升序，若 order 相同按 pubDate 升序
  seriesMap.forEach((seriesPosts, name) => {
    seriesMap.set(
      name,
      seriesPosts.sort((a, b) => {
        const orderA = a.data.series?.order ?? 1;
        const orderB = b.data.series?.order ?? 1;
        if (orderA !== orderB) return orderA - orderB;
        return a.data.pubDate.valueOf() - b.data.pubDate.valueOf();
      })
    );
  });

  return seriesMap;
}

/**
 * 根据合集名称获取排序好的文章列表
 */
export function getPostsBySeries(posts: Post[], seriesName: string): Post[] {
  const allSeries = getAllSeries(posts);
  return allSeries.get(seriesName) || [];
}

/**
 * 计算某篇文章在合集内的导航信息（仅当文章属于合集时返回上一篇/下一篇）
 */
export function getSeriesNavigation(posts: Post[], currentPost: Post): SeriesNav | null {
  const series = currentPost.data.series;
  if (!series?.name) return null;

  const seriesPosts = getPostsBySeries(posts, series.name);
  const currentIndex = seriesPosts.findIndex((p) => p.id === currentPost.id);

  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? seriesPosts[currentIndex - 1] : null;
  const next = currentIndex < seriesPosts.length - 1 ? seriesPosts[currentIndex + 1] : null;

  return {
    seriesName: series.name,
    currentIndex: currentIndex + 1,
    total: seriesPosts.length,
    prevPost: prev ? { title: prev.data.title, slug: prev.id } : null,
    nextPost: next ? { title: next.data.title, slug: next.id } : null,
  };
}
