import { postPath } from './post-path';
import { getCollection, type CollectionEntry } from 'astro:content';
import config from './config';
import type { Locale } from '../types/config';
import { canDiscover, canRender } from './policy';
import {
  chooseVariants,
  assertUniqueSlugs,
  assertMatchingSlugs,
} from './content-variants';
import { href } from './i18n';
import { introPageSlug, introRoutes } from './intro-config';

export type Post = CollectionEntry<'posts'>;
export type TextEntry = CollectionEntry<'pages'>;
const choose = <
  T extends { data: { _key: string; _locale?: string; slug: string } },
>(
  entries: T[],
  lang: Locale,
  kind: string,
) =>
  assertUniqueSlugs(
    chooseVariants(
      entries,
      lang,
      config.site.defaultLocale,
      config.site.locales,
    ),
    `${lang}/${kind}`,
  );
export async function postsFor(
  lang: Locale,
  includeHidden = false,
): Promise<Post[]> {
  const posts = assertMatchingSlugs(await getCollection('posts')).filter(
    (post) =>
      canRender(post.data, import.meta.env.DEV, config.posts.showDraftsInDev),
  );
  return choose(posts, lang, 'posts')
    .filter((post) => includeHidden || !post.data.hidden)
    .sort(
      (a, b) =>
        Number(b.data.featured) - Number(a.data.featured) ||
        b.data.date.getTime() - a.data.date.getTime(),
    );
}
export async function textEntriesFor(
  kind: 'pages',
  lang: Locale,
) {
  const entries = assertMatchingSlugs(await getCollection(kind));
  return choose(
    entries.filter(
      (entry) =>
        !entry.data.draft ||
        (import.meta.env.DEV && config.posts.showDraftsInDev),
    ),
    lang,
    kind,
  );
}
export async function pageFor(slug: string, lang: Locale) {
  const pages = await textEntriesFor('pages', lang);
  return pages.find((page) => page.data.slug === slug);
}
function introSlug(route: string): string | undefined {
  return introPageSlug(config, route);
}
export async function introFor(route: string, lang: Locale) {
  const slug = introSlug(route);
  if (!slug) return undefined;
  const page = await pageFor(slug, lang);
  if (!page)
    throw new Error(`Missing pages content for ${route}: ${slug} (${lang}).`);
  return page;
}
export function isReservedPage(slug: string) {
  return /^(404|posts|tags|search|history|page-og|og|search-data\.json)(\/|$)/.test(
    slug,
  );
}
export function isIntroOnly(slug: string) {
  return (
    introRoutes.some((route) => route === slug) ||
    (introRoutes.some((route) => introSlug(route) === slug) &&
      isReservedPage(slug))
  );
}
export async function discoverablePosts(lang: Locale): Promise<Post[]> {
  return (await postsFor(lang)).filter((post) => canDiscover(post.data));
}
export const encodedSlug = (slug: string) =>
  slug.split('/').map(encodeURIComponent).join('/');
export function postHref(post: Post, lang: Locale): string {
  return href(
    lang,
    `posts/${encodedSlug(postPath(post.data, config.posts.pathPrefix, config.site.timezone))}/`,
  );
}

export async function taxonomy(
  kind: 'tags',
  lang: Locale,
  includeHidden = false,
) {
  const groups = new Map<string, Post[]>();
  const hiddenReferences = new Set<string>();
  for (const post of await postsFor(lang, true))
    for (const key of post.data[kind]) {
      if (!groups.has(key)) groups.set(key, []);
      if (post.data.hidden) hiddenReferences.add(key);
      else groups.get(key)!.push(post);
    }
  return [...groups]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([slug, posts]) => ({
      slug,
      posts,
      entry: undefined,
      hidden: hiddenReferences.has(slug) && posts.length === 0,
    }))
    .filter((group) => includeHidden || !group.hidden);
}
