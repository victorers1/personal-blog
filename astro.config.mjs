import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import icon from "astro-icon";

import rehypeSlug from 'rehype-slug';
import rehypeToc from 'rehype-toc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkToc from 'remark-toc';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap(), icon(), mdx()],
  markdown: {
    remarkPlugins: [
      remarkMath,
      [remarkToc, {ordered: true}]
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'prepend' }],
      [rehypeToc, { headings: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
      rehypeKatex,
    ],

  }
});