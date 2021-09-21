---
id: options
title: Options
---

## HTML graphics

### Fit content to panel

This is mostly for SVG, as it will scale the content based on the size of the panel.
Adds 100% height and width attribute to the document.

### Center align content

Vertically and horizontally aligns the panel content to the center.
Adds "display: flex; justify-content: center; align-items: center" to the shadow root container.

### Overflow

Chooses what happens if content overflows outside the panel.
"Fit content to panel" is recommended to turn on with some of these options, as some of these won't work without it.

![Overflow options](https://raw.githubusercontent.com/gapitio/gapit-htmlgraphics-panel/master/src/img/screenshot-overflow.png)

### CSS

The style which can be used to style the HTML/SVG document.
Gets added next to the html document.

```html
#shadow-root
<style>
  /* The CSS */
</style>
<div>HTML/SVG document</div>
```

### HTML/SVG document

The html/svg code which is displayed on the panel.

### Run onRender when mounted

Run onRender when the panel is first loaded (in most cases, this should be true)

### onRender

Executes the code every render (when new data is available).

### Dynamic data

Update the data object when new data is available. The code will not execute again, it will only update the data object. This is only for onInit, onRender will update like normal.

### Trigger panelupdate when mounted

Trigger the panelupdate event (htmlNode.onpanelupdate) when the panel is first loaded (in most cases, this should be true)

### onInit

Executes when the panel loads

## Polyfill

### SVG base fix

Fixes an issue in Firefox where xlink:href needs the url to be able to find the link.
<https://stackoverflow.com/a/18265336>
<https://www.w3.org/TR/SVG/linking.html>

:::caution
Exiting and entering edit mode may cause it break, but pressing f5 fixes it.
:::

## Custom properties

Custom properties can be used to easily change values when multiple people are working on it. E.g.

- Change the range of a color.
- Toggle between showcase and production mode, to show how it would look if there were values there.
- Toggle between themes.
- Increase the max value of a bar.

Having a json file sort of as a configuration file makes it much easier to copy a panel and change some values in the json file instead of going through the javascript code for it.

Think of this scenario: You have three dashboards with similar graphics. The only difference is a value range. You can create one code for all three panels, and have a configuration file (Custom properties) with the ranges. Also makes it much easier to change later on (bugs, changes and additions) when the code is similar on all the panels.

### Edit as JSON

Shows the JSON code in a text editor

## Import/export

Import a file with the file picker _(a file can be dragged to it)_ or paste the json code into the text editor.

All the options and code can be easily copied _(exported)_ or imported with this.

The bundlers generate a panel-options.json file which makes it pretty easy to copy the generated code into the panel.
