---
id: options
title: Options
---

## Value options

### Mutate calcs

:::note
Reducer id and calcs are sometimes referred to as the same thing. Calcs here are referred to as the values in the calcs object inside the [data object](./references.md#data-global).
:::

:::caution
This doesn't remove existing calcs. It only adds to it. Changing from "All calcs" to "No mutation" will show all calcs until "Refresh dashboard" button is clicked. _The data object needs to be updated to remove "previous" calcs_
:::

Some data sources doesn't add the desired calc (some doesn't add calcs at all), which in some cases makes it harder to get the desired value from this plugin.

Calcs like max, min, diff, ETC adds all standard calcs, which means that only some custom calcs are allowed.

You can check the calcs properties with [fieldReducers](./references.md#fieldreducers).

`Standard calcs` _(calcs with `{standard: true}`)_

```json
{
  "allIsNull": false,
  "allIsZero": false,
  "count": 1081,
  "delta": 5160.296223387697,
  "diff": -27.562124876418547,
  "diffperc": -0.7987191943927379,
  "first": 34.50790349088066,
  "firstNotNull": 34.50790349088066,
  "last": 6.945778614462109,
  "lastNotNull": 6.945778614462109,
  "logmin": 6.606859716238607,
  "max": 35.886042023999536,
  "mean": 19.436556881379083,
  "min": 6.606859716238607,
  "nonNullCount": 1081,
  "previousDeltaUp": false,
  "range": 29.27918230776093,
  "step": -0.4993308915394312,
  "sum": 21010.917988770787
}
```

`All calcs`

```json
{
  "allIsNull": false,
  "allIsZero": false,
  "count": 720,
  "delta": -715.3035540645247,
  "diff": -7.021496923427495,
  "diffperc": -4.946144132468452,
  "first": 1.4195900352631468,
  "firstNotNull": 1.4195900352631468,
  "last": -5.601906888164349,
  "lastNotNull": -5.601906888164349,
  "logmin": 0.07720417385470929,
  "max": 3.184124812796603,
  "mean": -4.219071496932824,
  "min": -11.131454766473656,
  "nonNullCount": 720,
  "previousDeltaUp": false,
  "range": 14.31557957927026,
  "step": -0.49997734159248264,
  "sum": -3037.7314777916336,

  // Different from standard
  "allValues": [
    1.4195900352631468,
    1.6835262754797644,
    1.655662138180408,
    ... // 717 more values
  ],
  "changeCount": 719,
  "distinctCount": 720,
}
```

`allValues`, `changeCount`, and `distinctCount` are not standard calcs.

## HTML graphics

### Fit content to panel

This is mostly for SVG, as it will scale the content based on the size of the panel.
Adds the height and width of the first element to 100% in the HTML/SVG code.

```html
<!-- style is not needed here. It's only used to show that it overwrites the existing style as well. -->
<div style="height: 10px">First element</div>
<div style="height: 20px">Second element</div>
<div style="height: 30px">Third element</div>
```

becomes

```html
<div height="100%" width="100%" style="height: 100%; width: 100%;">First element</div>
<div style="height: 20px">Second element</div>
<div style="height: 30px">Third element</div>
```

### Center align content

Vertically and horizontally aligns the panel content to the center.
Adds "display: flex; justify-content: center; align-items: center" to the shadow root container.

### Overflow

Chooses what happens if content overflows outside the panel.
"Fit content to panel" is recommended to turn on with some of these options, as some of these won't work without it.

![Overflow options](https://github.com/gapitio/gapit-htmlgraphics-panel/raw/879c71528a1a7360895f6b1de002b06a00f1be5b/src/img/screenshot-overflow.png)

### Use Grafana scrollbar

Requires [Overflow](#overflow) to be `Visible`. Wraps the [scrollbar from Grafana](https://grafana.com/docs/grafana/latest/packages_api/ui/customscrollbar/) around the ShadowRoot container.

### Root CSS

CSS that's loaded outside the shadow root. Useful for font faces and imports.

Below code imports the [Stick No Bills](https://fonts.google.com/specimen/Stick+No+Bills) font

`Root CSS`

```css
@import url('https://fonts.googleapis.com/css2?family=Stick+No+Bills:wght@200&display=swap');
```

The font can be used inside the `CSS` code.

`CSS`

```css
* {
  font-family: 'Stick No Bills', sans-serif;
}
```

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

### Dynamic htmlGraphics

:::tip
Check out [Dynamic variables](advanced/dynamic-variables.md) for more info.
:::

Update [htmlGraphics](references.md#htmlgraphics-global) when new data is available.

### Dynamic data

Update the [data object](references.md#data) when new data is available. The code will not execute again, it will only update the [data object](references.md#data). This is only for onInit, onRender will update like normal.

### Dynamic fieldDisplayValues

Update [fieldDisplayValues](references.md#fielddisplayvalues) when new data is available.

### Dynamic props

:::caution
Only values under `htmlGraphics.props` becomes dynamic. Internally the `htmlGraphics.width` comes from props, but it does not become dynamic, because it's mapped to the int value.
:::

Update [props](references.md#props) when new data is available.

### Trigger panelupdate when mounted

Trigger the panelupdate event (htmlNode.onpanelupdate) when the panel is first loaded (in most cases, this should be true)

### Trigger onInit on resize

:::caution
This doesn't trigger any cleanup or [onpanelwillunmount](references.md#panelwillunmount-event). It will only trigger `onInit`.
:::

Trigger the `onInit` code when the panels width/height changes.

Without `onInitOnResize`

`onInit`

```js
// REMEMBER TO TURN DYNAMIC HTMLGRAPHICS TO TRUE

const [heightValueElt, widthValueElt] = htmlNode.querySelectorAll('.value-field');

// Used to store the initial
const storedPanelSize = {
  height: htmlGraphics.height,
  width: htmlGraphics.width,
};

const updateValueText = () => {
  // Important that htmlGraphics.height or width is used inside the function.
  // If height or width is destructured outside the function they will not get the new height.
  heightValueElt.textContent = htmlGraphics.height;
  widthValueElt.textContent = htmlGraphics.width;
};

const updateStoredPanelSize = () => {
  storedPanelSize.height = htmlGraphics.height;
  storedPanelSize.width = htmlGraphics.width;
};

// Show the height and width right away.
updateValueText();

htmlNode.onpanelupdate = () => {
  const isPanelSizeUpdate = !(
    htmlGraphics.height == storedPanelSize.height && htmlGraphics.width === storedPanelSize.width
  );

  if (isPanelSizeUpdate) {
    updateValueText();

    // Update the previous stored values with the new height and witdth
    updateStoredPanelSize();
  }
};
```

With `onInitOnResize`

`onInit`

```js
// REMEMBER TO TURN DYNAMIC HTMLGRAPHICS AND TRIGGER ONINIT ON RESIZE TO TRUE

const [heightValueElt, widthValueElt] = htmlNode.querySelectorAll('.value-field');

const updateValueText = () => {
  heightValueElt.textContent = htmlGraphics.height;
  widthValueElt.textContent = htmlGraphics.width;
};

updateValueText();
```

Full code example [dynamic-height-and-width](examples/dynamic-height-and-width.md)

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

Shows the JSON code in a code editor

## Import/export

Import a file with the file picker _(a file can be dragged to it)_ or paste the json code into the code editor.

All the options and code can be easily copied _(exported)_ or imported with this.

The bundlers generate a panel-options.json file which makes it pretty easy to copy the generated code into the panel.
