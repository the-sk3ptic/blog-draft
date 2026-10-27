import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://username.github.io',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [mdx(), markdoc(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      transformers: [
        {
          name: 'code-title-transformer',
          root(root) {
            const raw = this.options.meta?.__raw;
            let title = null;
            if (raw) {
              const match = raw.match(/title=(?:["']([^"']+)["']|([^\s]+))/);
              if (match) {
                title = match[1] || match[2];
              }
            }
            let lang = this.options.lang;
            if (!title && lang && lang.includes(':')) {
              const colonIdx = lang.indexOf(':');
              title = lang.slice(colonIdx + 1);
            }

            if (root.children[0]?.tagName === 'pre') {
              const pre = root.children[0];
              const children = [];

              if (title) {
                const header = {
                  type: 'element',
                  tagName: 'div',
                  properties: {
                    className:
                      'code-block-header flex items-center justify-between px-4 py-2 border-b border-[var(--color-border)] bg-[var(--color-surface)] dark:bg-[var(--color-surface-alt)] text-xs text-[var(--color-text-secondary)] font-mono',
                  },
                  children: [
                    {
                      type: 'element',
                      tagName: 'div',
                      properties: { className: 'flex items-center gap-2 font-medium truncate' },
                      children: [
                        {
                          type: 'element',
                          tagName: 'svg',
                          properties: {
                            className: 'w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                            ariaHidden: 'true',
                          },
                          children: [
                            {
                              type: 'element',
                              tagName: 'path',
                              properties: { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' },
                            },
                            {
                              type: 'element',
                              tagName: 'polyline',
                              properties: { points: '14 2 14 8 20 8' },
                            },
                          ],
                        },
                        {
                          type: 'element',
                          tagName: 'span',
                          properties: { className: 'truncate' },
                          children: [{ type: 'text', value: title }],
                        },
                      ],
                    },
                    {
                      type: 'element',
                      tagName: 'div',
                      properties: { className: 'code-block-actions flex items-center gap-2' },
                      children:
                        lang && lang !== 'plaintext'
                          ? [
                              {
                                type: 'element',
                                tagName: 'span',
                                properties: {
                                  className:
                                    'text-[10px] uppercase font-semibold text-[var(--color-text-muted)] tracking-wider px-1.5 py-0.5 rounded bg-[var(--color-surface-hover)]',
                                },
                                children: [{ type: 'text', value: lang }],
                              },
                            ]
                          : [],
                    },
                  ],
                };
                children.push(header);
              }

              children.push(pre);

              const wrapper = {
                type: 'element',
                tagName: 'div',
                properties: {
                  className: `code-block-wrapper relative group my-6 rounded-xl border border-[var(--color-border)] overflow-hidden bg-[var(--color-surface-alt)] shadow-xs ${title ? 'has-title' : ''}`,
                },
                children,
              };
              root.children = [wrapper];
            }
          },
        },
      ],
    },
  },
});
