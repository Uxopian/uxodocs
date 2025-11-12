import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'UXO Docs',
  tagline: 'Documentation produits',
  favicon: 'static/img/uxo.png',

  url: 'https://corentinlebas45.github.io',
  baseUrl: '/uxodocs/',
  organizationName: 'corentinlebas45',
  projectName: 'uxodocs',
  deploymentBranch: 'gh-pages',

  trailingSlash: false,

  // Désactiver i18n pour utiliser une seule locale
  // i18n: {
  //   defaultLocale: 'en',
  //   locales: ['en'],
  // },

  onBrokenLinks: 'warn',
  markdown: {
    hooks: { onBrokenMarkdownLinks: 'warn', onBrokenMarkdownImages: 'warn' },
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: { customCss: './src/css/custom.css' },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'default',
        path: 'docs_default',
        routeBasePath: 'docs-default',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'fast2',
        path: 'docs/fast2',
        routeBasePath: 'docs/fast2',
        sidebarPath: require.resolve('./sidebars_fast2.ts'),
        lastVersion: 'current',
        versions: { current: { label: 'v2025.x.x' } },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'arender',
        path: 'docs/arender',
        routeBasePath: 'docs/arender',
        sidebarPath: require.resolve('./sidebars_arender.ts'),
        lastVersion: 'current',
        versions: { current: { label: 'v2023.14.0' } },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'flowerdocs',
        path: 'docs/flowerdocs',
        routeBasePath: 'docs/flowerdocs',
        sidebarPath: require.resolve('./sidebars_flowerdocs.ts'),
        lastVersion: 'current',
        versions: { current: { label: 'v2025.3.0' } },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'uxopian-ai',
        path: 'docs/uxopian-ai',
        routeBasePath: 'docs/uxopian-ai',
        sidebarPath: require.resolve('./sidebars_uxopian-ai.ts'),
        lastVersion: 'current',
        versions: { current: { label: 'current' } },
      },
    ],
    // Plugin de recherche placé EN DERNIER après tous les plugins de docs
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        indexDocs: true,
        indexPages: true,
        hashed: true,
        docsRouteBasePath: ['docs-default', 'docs/fast2', 'docs/arender', 'docs/flowerdocs', 'docs/uxopian-ai'],
        // N'indexer que la version actuelle pour éviter les erreurs de fichiers manquants
        docsPluginIdForPreferredVersion: ['fast2', 'arender', 'flowerdocs', 'uxopian-ai'],
        indexDocSidebarParentCategories: 0,
        searchContextByPaths: [
          {
            label: 'Toutes les documentations',
            path: 'docs/',
          },
          {
            label: 'Fast2',
            path: 'docs/fast2',
          },
          {
            label: 'ARender',
            path: 'docs/arender',
          },
          {
            label: 'FlowerDocs',
            path: 'docs/flowerdocs',
          },
          {
            label: 'Uxopian AI',
            path: 'docs/uxopian-ai',
          },
        ],
        searchBarShortcut: true,
        searchBarShortcutHint: true,
        searchBarPosition: 'right',
        // language: ['en'],
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
        explicitSearchResultPath: false,
      },
    ],
  ],

  themeConfig: {
    navbar: {
      logo: { alt: 'UXO', src: 'img/uxo.png' },
      items: [
        { type: 'docsVersionDropdown', docsPluginId: 'fast2', position: 'left', className: 'verdd verdd--fast2' },
        { type: 'docsVersionDropdown', docsPluginId: 'arender', position: 'left', className: 'verdd verdd--arender' },
        { type: 'docsVersionDropdown', docsPluginId: 'flowerdocs', position: 'left', className: 'verdd verdd--flowerdocs' },
        { type: 'docsVersionDropdown', docsPluginId: 'uxopian-ai', position: 'left', className: 'verdd verdd--uxopian-ai' },

        { type: 'search', position: 'right' },

        { href: 'https://github.com/corentinlebas45/uxodocs', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `© ${new Date().getFullYear()} UXO Docs`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;