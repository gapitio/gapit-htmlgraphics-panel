---
id: projects
title: Projects
---

## Bundlers

There are currently 3 different bundler templates [svg](https://github.com/gapitio/htmlgraphics-svg-bundler-template), [svelte](https://github.com/gapitio/htmlgraphics-svelte-bundler-template) and [react](https://github.com/gapitio/htmlgraphics-react-bundler-template)

SVG and Svelte are both highly recommended to use _(React has a high build size)_.

There is an [example](https://github.com/gapitio/htmlgraphics-svg-bundler-example).
The example contains a [panel-options.json](https://github.com/gapitio/htmlgraphics-svg-bundler-example/blob/master/dist/panel-options.json) file which contains the bundled code. This can be imported to the panel in the import/export option _(almost at the bottom)_.

The main difference between the svg bundler and svelte bundler is how and where the data is used. In the svg bundler the data is used in onRender, which is executed when new data is available. In the svelte bundler the data is used inside the svelte files (onInit) and updates when the panelupdate event is triggered _(panelupdate triggers when new data is available)_.

:::caution
Remember to turn `Dynamic data object` to true when using React or Svelte bundler
:::

:::tip
Unsure how to use a template? Check out [How to use a template](guides/how-to-use-a-template.md).
:::

### SVG

[htmlgraphics svg bundler template](https://github.com/gapitio/htmlgraphics-svg-bundler-template)

[htmlgraphics svg bundler example](https://github.com/gapitio/htmlgraphics-svg-bundler-example)

Useful if you're making SVG drawings and need to use the grafana data object to retrieve data.

### Svelte

[htmlgraphics svelte bundler template](https://github.com/gapitio/htmlgraphics-svelte-bundler-template)

Useful if you're making a reactive panel and need to use a lot of reactivity.

### React

[htmlgraphics react bundler template](https://github.com/gapitio/htmlgraphics-react-bundler-template)

## NPM packages

- [grafana-metric](https://www.npmjs.com/package/@gapit/grafana-metric)
- [sld-component](https://www.npmjs.com/package/@gapit/sld-component)
- [ga-component](https://www.npmjs.com/package/@gapit/ga-component)

## Project repos

- [grafana-360-viewer](https://github.com/gapitio/grafana-360-viewer)
- [htmlgraphics-video-example](https://github.com/gapitio/htmlgraphics-video-example)
- [htmlgraphics-video.js-example](https://github.com/gapitio/htmlgraphics-video.js-example)
- [htmlgraphics-react-radar-example](https://github.com/gapitio/htmlgraphics-react-radar-example)
