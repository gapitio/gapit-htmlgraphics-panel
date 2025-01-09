import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const config: Config = {
  title: 'HTMLGraphics',
  tagline: 'Grafana panel for displaying metric sensitive HTML or SVG graphics.',
  url: 'https://gapit-htmlgraphics-panel.gapit.io/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'favicon.ico',
  organizationName: 'gapitio',
  projectName: 'gapit-htmlgraphics-panel',
  trailingSlash: true,

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/gapitio/gapit-htmlgraphics-panel/edit/main/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'HTMLGraphics',
        logo: {
          alt: 'HTMLGraphics',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'installation',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/gapitio/gapit-htmlgraphics-panel',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://grafana.com/grafana/plugins/gapit-htmlgraphics-panel/',
            label: 'Marketplace',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting started',
                to: '/docs/installation',
              },
              {
                label: 'References',
                to: '/docs/references',
              },
              {
                label: 'How to contribute',
                to: '/docs/contributing',
              },
            ],
          },
          {
            title: 'Help',
            items: [
              {
                label: 'Guides',
                to: '/docs/guides/how-to-add-the-panel',
              },
              {
                label: 'Ask a question',
                href: 'https://github.com/gapitio/gapit-htmlgraphics-panel/discussions/categories/q-a',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/gapitio/gapit-htmlgraphics-panel',
              },
              {
                label: 'Discussions',
                href: 'https://github.com/gapitio/gapit-htmlgraphics-panel/discussions',
              },
              {
                label: 'Issues',
                href: 'https://github.com/gapitio/gapit-htmlgraphics-panel/issues',
              },
              {
                label: 'Contribute',
                href: 'https://github.com/gapitio/gapit-htmlgraphics-panel/pulls',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Gapit AS`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    } satisfies Preset.ThemeConfig,
};

export default config;
