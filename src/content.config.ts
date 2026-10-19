import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,mdoc}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    series: z
      .union([
        z.string().transform((name) => ({ name, order: 1 })),
        z.object({
          name: z.string(),
          order: z.number().default(1),
        }),
      ])
      .optional(),
    draft: z.boolean().default(false),
    image: z.string().optional(),
  }),
});

export const collections = { posts };
