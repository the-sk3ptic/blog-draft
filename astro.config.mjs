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
    },
  },
});
