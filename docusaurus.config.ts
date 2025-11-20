import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'UXO Docs',
  tagline: 'Product Documentation',
  favicon: 'img/uxopian-o.png',

  url: 'https://corentinlebas45.github.io',
  baseUrl: '/uxodocs/',
  organizationName: 'corentinlebas45',
  projectName: 'uxodocs',
  deploymentBranch: 'gh-pages',

  trailingSlash: false,

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

  // Client scripts
  scripts: [
    { src: '/uxodocs/js/augment-version-dropdowns.js', async: false },
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
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        indexDocs: true,
        indexPages: true,
        hashed: true,
        docsRouteBasePath: ['docs/fast2', 'docs/arender', 'docs/flowerdocs', 'docs/uxopian-ai'],
        ignoreFiles: [],
        removeDefaultStopWordFilter: true,
      },
    ],
  ],

  themeConfig: {
    navbar: {
      logo: { alt: 'UXO', src: 'img/uxopian-o.png' },
      items: [
        { type: 'docsVersionDropdown', docsPluginId: 'fast2', position: 'left', className: 'verdd verdd--fast2' },
        { type: 'docsVersionDropdown', docsPluginId: 'arender', position: 'left', className: 'verdd verdd--arender' },
        { type: 'docsVersionDropdown', docsPluginId: 'flowerdocs', position: 'left', className: 'verdd verdd--flowerdocs' },
        { type: 'docsVersionDropdown', docsPluginId: 'uxopian-ai', position: 'left', className: 'verdd verdd--uxopian-ai' },

        { type: 'search', position: 'right' },

      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Resources',
          items: [
            {
              label: 'Support',
              href: 'https://support.uxopian.com', // À remplacer
            },
            {
              label: 'Contact',
              href: 'https://uxopian.com/contact', // À remplacer
            },
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'About Uxopian',
              href: 'https://uxopian.com', // À remplacer
            },
            {
              label: 'Privacy Policy',
              to: '/privacy-policy',
            },
          ],
        },
        {
          title: 'Follow Us',
          items: [
            {
              label: 'LinkedIn',
              href: 'https://linkedin.com/company/uxopian', // À remplacer
            },
            {
              label: 'YouTube',
              href: 'https://youtube.com/@uxopian', // À remplacer
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/uxopian', // À remplacer
            },
            {
              label: 'GitHub',
              href: 'https://github.com/uxopian', // À remplacer
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Uxopian Software. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;