import type { APIRoute } from 'astro';
import { getPublishedPosts } from '@/utils/posts';

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();

  const searchIndex = posts.map((post) => ({
    id: post.id,
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.pubDate,
    tags: post.data.tags || [],
    category: post.data.category || '',
    body: post.body
      ? post.body
          .replace(/<[^>]*>/g, '')
          .replace(/```[\s\S]*?```/g, '')
          .replace(/[#*`_~\[\]]/g, '')
          .slice(0, 300)
      : '',
  }));

  return new Response(JSON.stringify(searchIndex), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
