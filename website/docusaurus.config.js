const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: 'HTMLGraphics',
    tagline: 'Grafana panel for displaying metric sensitive HTML or SVG graphics.',
    url: 'https://gapit-htmlgraphics-panel.gapit.io/',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'favicon.ico',
    organizationName: 'gapitio', // Usually your GitHub org/user name.
    projectName: 'gapit-htmlgraphics-panel', // Usually your repo name.
    trailingSlash: true,
    presets: [
      [
        '@docusaurus/preset-classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            sidebarPath: require.resolve('./sidebars.js'),
            // Please change this to your repo.
            editUrl: 'https://github.com/gapitio/gapit-htmlgraphics-panel/edit/main/website/',
          },
          theme: {
            customCss: require.resolve('./src/css/custom.css'),
          },
        }),
      ],
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
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
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
        },
      }),
  }
);
