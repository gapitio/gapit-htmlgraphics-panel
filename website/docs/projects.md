---
id: projects
title: Projects
---

## Bundlers

The main difference between the bundler using a framework like [Svelte](https://svelte.dev/) or [React](https://reactjs.org/) and those who doesn't is how and where the data is used. In the svg bundler the data is used in onRender, which is executed when new data is available. In the svelte bundler the data is used inside the svelte files (onInit) and updates when the panelupdate event is triggered _(panelupdate triggers when new data is available)_.

### Bundler templates

:::tip
Unsure how to use a template? Check out [How to use a template](guides/how-to-use-a-template.md).
:::

- [htmlgraphics svg bundler template](https://github.com/gapitio/htmlgraphics-svg-bundler-template)
- [htmlgraphics html bundler template](https://github.com/gapitio/htmlgraphics-html-bundler-template)

#### Bundlers using a framework

:::caution
Remember to turn [Dynamic data object](options.md#dynamic-data) to true when using the bundlers below
:::

- [htmlgraphics svelte bundler template](https://github.com/gapitio/htmlgraphics-svelte-bundler-template)
- [htmlgraphics react bundler template](https://github.com/gapitio/htmlgraphics-react-bundler-template)

## NPM packages

- [grafana-metric](https://www.npmjs.com/package/@gapit/grafana-metric)
- [sld-component](https://www.npmjs.com/package/@gapit/sld-component)
- [ga-component](https://www.npmjs.com/package/@gapit/ga-component)

## Project repos

- [grafana-360-viewer](https://github.com/gapitio/grafana-360-viewer)

### Examples

- [htmlgraphics-video-example](https://github.com/gapitio/htmlgraphics-video-example)
- [htmlgraphics-video.js-example](https://github.com/gapitio/htmlgraphics-video.js-example)
- [htmlgraphics-react-radar-example](https://github.com/gapitio/htmlgraphics-react-radar-example)
- [htmlgraphics svg bundler example](https://github.com/gapitio/htmlgraphics-svg-bundler-example)
