import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const bannerSchema = z
  .union([
    z.boolean().transform((enabled) =>
      enabled
        ? {
            type: 'warning' as const,
            title: '时效性提示',
            content:
              '本文撰写于较早时期，随着时间推移与技术更新，部分内容可能已发生变化，请注意甄别并以最新官方资料为准。',
          }
        : undefined
    ),
    z.string().transform((content) => ({
      type: 'warning' as const,
      title: '时效性提示',
      content,
    })),
    z
      .object({
        type: z.enum(['warning', 'info', 'tip', 'caution', 'danger']).default('warning'),
        title: z.string().default('时效性提示'),
        content: z.string().optional(),
        message: z.string().optional(),
      })
      .transform((val) => ({
        type: val.type,
        title: val.title,
        content:
          val.content ||
          val.message ||
          '本文具有时效性，部分信息可能已发生变更，请参考最新官方资料。',
      })),
  ])
  .optional();

export type ArticleBannerData = z.infer<typeof bannerSchema>;

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,mdoc}', base: './src/content/posts' }),
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      lastModified: z.coerce.date().optional(),
      banner: bannerSchema,
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
    })
    .transform((data) => {
      const effectiveUpdated = data.lastModified ?? data.updatedDate;
      return {
        ...data,
        updatedDate: effectiveUpdated,
        lastModified: effectiveUpdated,
      };
    }),
});

export const collections = { posts };

