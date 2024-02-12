import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import icon from "astro-icon";
import remarkToc from 'remark-toc';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap(), icon(), mdx()],
  markdown: {
    rehypePlugins: [
          'rehype-slug',
          ['rehype-autolink-headings', { behavior: 'append' }],
          ['rehype-toc', { headings: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ],
  }
});