/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  sidebar: [
    {
      type: 'category',
      label: 'Getting started',
      items: ['installation', 'quick-start'],
    },
    {
      type: 'doc',
      id: 'options',
    },
    {
      type: 'doc',
      id: 'references',
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/how-to-add-the-panel',
        'guides/how-to-import-export',
        'guides/how-to-get-metrics',
        'guides/how-to-use-a-template',
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      items: ['examples/simple-example', 'examples/font-example', 'examples/update-grafana-variable-example'],
    },
    {
      type: 'doc',
      id: 'projects',
    },
    {
      type: 'doc',
      id: 'contributing',
    },
  ],
};
