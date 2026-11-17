import type { BlogConfig } from './src/types/config';

/** Frequent identity, copy and content settings come first; optional services follow reading defaults. */
const config: BlogConfig = {
  site: {
    title: 'ViGPT',
    baseUrl: 'https://victorbot.netlify.app/', // Include the deployment directory, e.g. https://example.com/blog/.
    defaultLocale: 'en',
    locales: ['en', 'pt'],
    localePrefixPolicy: 'redirect-to-default', // Recommended: unprefixed pages refresh directly to the default language.
    timezone: 'America/Sao_Paulo',
  },
  author: {
    name: 'Victor Emanuel',
    bio: {
      en: 'Free',
      pt: 'Grátis',
    },
    avatar: '/images/avatar.jpeg',
    socials: [
      {
        label: 'GitHub',
        icon: 'simple-icons:github',
        href: 'https://github.com/victorers1',
      },
      {
        label: 'LinkedIn',
        icon: 'simple-icons:linkedin',
        href: 'https://www.linkedin.com/in/victor-emanuel-809b7a196/',
      },
      {
        label: {
          pt: 'Email',
          en: 'Email',
        },
        icon: 'lucide:mail',
        href: 'victorers2@gmail.com',
      },
    ],
  },
  text: {
    siteDescription: {
      en: 'My personal notes',
      pt: 'Minhas notas pessoais.',
    },
    tabs: {
      search: {
        en: 'Search',
        pt: 'Pesquisar',
      },
      posts: {
        en: 'Notes',
        pt: 'Notas',
      },
    },
    homeHeading: {
      en: 'What would you like to read today?',
      pt: 'O que quer fazer hoje?',
    },
    searchHeading: {
      en: 'Enter keywords to discover an article',
      pt: 'Insira palavras chaves para buscar uma nota',
    },
    searchPlaceholder: {
      en: 'Search articles, ideas and keywords',
      pt: 'Pesquise notas, ideias e palavras',
    },
    notFoundMessage: {
      en: 'This page has no story yet.',
      pt: 'Essa página não tem conteúdo ainda.',
    },
  },
  posts: {
    perPage: 5,
    homeLimit: 4,
    menuLimit: 12, // Plus-menu articles; use 99999 to include all.
    randomLimit: 12, // Independent candidate count for the random button and /random.
    pathPrefix: '', // Optional date directory, e.g. [year]/ or [year]/[month]/.
    dateFormat: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    showDraftsInDev: true,
  },
  sidebar: {
    items: [
      {
        id: 'home',
        type: 'builtin',
        route: 'home',
        label: {
          en: 'Home',
          pt: 'Início',
        },
        icon: 'square-pen',
      },
      {
        id: 'notes',
        type: 'builtin',
        route: 'notes',
        page: 'notes',
        label: {
          en: 'Notes',
          pt: 'Notas',
        },
        icon: 'archive',
      },
      {
        id: 'about',
        type: 'page',
        page: 'about',
        label: {
          en: 'About me',
          pt: 'Sobre mim',
        },
        icon: 'info',
      },
      {
        id: 'theme-github',
        type: 'external',
        href: 'https://github.com/victorers1/personal-blog',
        newTab: true,
        label: {
          en: 'Repository',
          pt: 'Repositório',
        },
        icon: 'simple-icons:github',
      },
    ],
    menu: [
      {
        id: 'home',
        type: 'builtin',
        route: 'home',
        label: {
          en: 'Home',
          pt: 'Home',
        },
        description: {
          en: 'Search and recent articles',
          pt: 'Search and recent articles',
        },
      },
      {
        id: 'notes',
        type: 'builtin',
        route: 'notes',
        page: 'notes',
        label: {
          en: 'Notes',
          pt: 'Notas',
        },
        description: {
          en: 'Browse all notes',
          pt: 'Explore todas as notas',
        },
      },
      {
        id: 'about',
        type: 'page',
        page: 'about',
        label: {
          en: 'About',
          pt: 'About',
        },
        description: {
          en: 'About this demo',
          pt: 'About this demo',
        },
      },
      {
        id: 'theme-github',
        type: 'external',
        href: 'https://github.com/victorers1/personal-blog',
        newTab: true,
        label: {
          en: 'GitHub repository',
          pt: 'Repositório GitHub',
        },
      },
    ],
    width: {
      default: 340,
      min: 240,
      max: 480,
    },
  },
  appearance: {
    defaultTheme: 'system',
    pageTransition: 'fade',
    codeThemes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    showCodeLineNumbers: false,
    categoryCoverStyle: 'thumbnail',
  },
  article: {
    display: {
      author: true,
      published: true,
      updated: true,
      tags: true,
      share: true,
      navigation: true,
      title: true,
    },
    math: true,
    mermaid: true,
    lightbox: true,
    callouts: true,
    toc: {
      enabled: true,
      minDepth: 2,
      maxDepth: 4,
      expandDelay: 1000,
      hideDelay: 800,
    },
    shareCover: {
      enabled: true,
      width: 1200,
      height: 630,
      background: '#f5f5f5',
      foreground: '#171717',
      accent: '#3b82f6',
    },
  },
  footer: {
    since: 2024,
    author: 'Astro Theme BlogGPT',
    showAttribution: true,
    license: {
      label: 'CC BY-NC-SA 4.0',
      url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    },
  },
  sharing: {
    copyFormat: '{title}\n{description}\n{author} · {blog}\n{url}',
    platforms: [
      {
        name: 'X',
        icon: 'simple-icons:x',
        href: 'https://twitter.com/intent/tweet?text={title}&url={url}',
      },
      {
        name: 'Facebook',
        icon: 'simple-icons:facebook',
        href: 'https://www.facebook.com/sharer/sharer.php?u={url}',
      },
      {
        name: 'LinkedIn',
        icon: 'simple-icons:linkedin',
        href: 'https://www.linkedin.com/sharing/share-offsite/?url={url}',
      },
      {
        name: 'Reddit',
        icon: 'simple-icons:reddit',
        href: 'https://www.reddit.com/submit?url={url}&title={title}',
      },
      {
        name: 'Bluesky',
        icon: 'simple-icons:bluesky',
        href: 'https://bsky.app/intent/compose?text={text}',
      },
      {
        name: 'Threads',
        icon: 'simple-icons:threads',
        href: 'https://www.threads.net/intent/post?text={text}',
      },
      {
        name: 'Telegram',
        icon: 'simple-icons:telegram',
        href: 'https://t.me/share/url?url={url}&text={title}',
      },
      {
        name: 'WhatsApp',
        icon: 'simple-icons:whatsapp',
        href: 'https://wa.me/?text={text}',
      },
      {
        name: 'LINE',
        icon: 'simple-icons:line',
        href: 'https://social-plugins.line.me/lineit/share?url={url}',
      },
      {
        name: {
          en: 'Weibo',
          pt: 'Weibo',
        },
        icon: 'simple-icons:sinaweibo',
        href: 'https://service.weibo.com/share/share.php?url={url}&title={title}&pic={image}',
      },
      {
        name: 'QQ',
        icon: 'simple-icons:qq',
        href: 'https://connect.qq.com/widget/shareqq/index.html?url={url}&title={title}&summary={description}&desc={description}&site={blog}&pics={image}',
      },
      {
        name: {
          en: 'QQ Space',
          pt: 'QQ Space',
        },
        icon: 'simple-icons:qzone',
        href: 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}&summary={description}&pics={image}',
      },
      {
        name: 'Tumblr',
        icon: 'simple-icons:tumblr',
        href: 'https://www.tumblr.com/widgets/share/tool?canonicalUrl={url}&title={title}&caption={description}&posttype=link',
      },
      {
        name: 'Pinterest',
        icon: 'simple-icons:pinterest',
        href: 'https://www.pinterest.com/pin/create/button/?url={url}&media={image}&description={title}',
      },
      {
        name: {
          en: 'Email',
          pt: 'Email',
        },
        icon: 'lucide:mail',
        href: 'mailto:?subject={title}&body={text}',
      },
    ],
  },
  statistics: {
    enabled: true,
    articleCount: true,
    wordCount: true,
    days: true,
    languages: true,
    averageWords: true,
    updateFrequency: true,
    firstPublication: true,
    lastUpdate: true,
    heatmap: true,
    recentWords: true,
    recentLimit: 12,
  },
};

export default config;
