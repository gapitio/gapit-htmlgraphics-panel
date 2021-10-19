---
id: references
title: References
---

:::warning
All references are in htmlGraphics, but not every reference is global.
:::

The plugin makes several references to the HTML/SVG document and Grafana in the execution context of onRender and onInit functions/javascripts. Below are details for each. Remember, you can always use the [developer console](https://developers.google.com/web/tools/chrome-devtools/console) (ctrl+shift+j) and [console.log()](https://developer.mozilla.org/en-US/docs/Web/API/Console/log).

```javascript
// Log this in onRender or onInit, and look at developer console (ctrl+shift+j).
console.log('htmlGraphics', htmlGraphics);
```

## htmlGraphics (global)

An object (dict) containing all the variables.

### htmlNode

Same as [htmlNode](#htmlnode-global)

```javascript
console.log(htmlGraphics.htmlNode);
```

### data

Same as [data](#data-global)

```javascript
console.log(htmlGraphics.data);
```

### customProperties

Same as [customProperties](#customproperties-global)

```javascript
console.log(htmlGraphics.customProperties);
```

### codeData

Same as [codeData](#codedata-global)

```javascript
console.log(htmlGraphics.codeData);
```

### options

Same as [options](#options-global)

```javascript
console.log(htmlGraphics.options);
```

### theme

Same as [theme](#theme-global)

```javascript
console.log(htmlGraphics.theme);
```

### getTemplateSrv

Same as [getTemplateSrv](#gettemplatesrv-global)

```javascript
console.log(htmlGraphics.getTemplateSrv());
```

### getLocationSrv

Same as [getLocationSrv](#getlocationsrv-global)

```javascript
console.log(htmlGraphics.getLocationSrv());
```

### props

Containing all the props from the panel [panelprops](https://grafana.com/docs/grafana/latest/packages_api/data/panelprops/)

```javascript
console.log(htmlGraphics.props);
```

### width

The width of the panel

```javascript
console.log(htmlGraphics.width);
```

### height

The height of the panel

```javascript
console.log(htmlGraphics.height);
```

### getFieldDisplayValues

This is the same command that is used for mutating calcs in the Value options [Mutate calcs](./options.md#mutate-calcs).

This command returns a list of the values specified in the reduceOptions.

_If nothing is specified it will use the same options as the [Mutate calcs](./options.md#mutate-calcs) and [props](#props)_

```js
console.log(htmlGraphics.getFieldDisplayValues({ reduceOptions: { calcs: ['last', 'first'] } }));
```

![Field display values](../static/img/field-display-values.png)

### fieldDisplayValues

[Mutate calcs](./options.md#mutate-calcs) uses [getFieldDisplayValues](#getFieldDisplayValues) to mutate the calcs and this is the returned values.

```js
console.log(htmlGraphics.fieldDisplayValues);
```

### fieldReducers

A list of the reducers. Useful for checking the calcs properties.

```js
console.log(htmlGraphics.fieldReducers);
```

![Field display values](../static/img/field-reducers.png)

## htmlNode (global)

The [shadow root](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot) which contains the elements added in the HTML/SVG document (works similarly to document).

Used to get elements and their properties.

```javascript
const randomTextElt = htmlNode.querySelector('#random-text-elt');
randomTextElt.textContent = 'Something';
randomTextElt.style.fill = '#08f';
```

### panelupdate event

`panelupdate` will trigger when new data is available (like onRender).

```js
function onPanelUpdate() {
  console.log(data);
}

htmlNode.addEventListener('panelupdate', onPanelUpdate); // Triggers when new data is available (like onRender)
htmlNode.onpanelupdate = onPanelUpdate; // A function that triggers at the same time as the panelupdate event
```

Because of the panelupdate event, frameworks like [React](https://reactjs.org/), [Svelte](https://svelte.dev/), ETC are easier to work with. Check out the [Bundlers](./projects.md#bundlers) for more information.

### panelwillunmount event

`panelwillunmount` will trigger when the panel will unmount <https://reactjs.org/docs/react-component.html#componentwillunmount>.

```js
function onPanelWillUnmount() {
  console.log('Bye');
}

htmlNode.addEventListener('panelwillunmount', onPanelWillUnmount);
htmlNode.onpanelwillunmount = onPanelWillUnmount;
```

## customProperties (global)

The parsed json object _(also available as a JSON string in options.codeData)_ from the Custom properties option _(named codeData in the options for backwards compatibility)_.

Used to get the json object values.

`Custom properties`

```json
{
  "something": true
}
```

```javascript
// onRender or onInit

console.log(customProperties.something); // true
```

## codeData (global)

:::caution
codeData is here for backwards compatibility. Please use customProperties instead.
:::

Same as [customProperties](#customProperties-global)

`Custom properties`

```json
{
  "something": true
}
```

```javascript
// onRender or onInit

console.log(codeData.something); // true
```

## data (global)

The [PanelData interface](https://grafana.com/docs/grafana/latest/packages_api/data/paneldata/) passed in to the panel by Grafana. It is used to get the values from the DataFrame.

Can be used to retrieve metric values.

```javascript
// Used in onRender as it updates every time new data is available
const getMetricByName = (metricName, noDataValue = 'No data') => {
  const filteredSeries = data.series.filter((series) => series.name == metricName);
  if (filteredSeries.length > 0) {
    return filteredSeries[0].fields[1].state.calcs.last;
  }
  return noDataValue;
};

getMetricByName('random-metric-name');
```

## options (global)

The options object that can be edited in the edit menu. All the options are stored in the object (onRender, htmlNode, ETC).

```javascript
console.log(options);

// Looks something like this, when logged in the console.

{
  SVGBaseFix: true,
  add100Percentage: true,
  centerAlignContent: true,
  codeData: "{\"randomKey\": \"randomValue\"}",
  css: undefined,
  html: undefined,
  onInit: "console.log(options)",
  onRender: undefined
}
```

## theme (global)

The [GrafanaTheme](https://grafana.com/docs/grafana/latest/packages_api/data/grafanatheme/) interface. It stores the current theme (light/dark), colors used by grafana, ETC.

Very useful when you're making a dark mode and light mode.

```javascript
const darkTheme = () => {
  ...
};

if (theme.isDark) {
  darkTheme();
}
```

## getTemplateSrv (global)

Used to retrieve the [TemplateSrv](https://grafana.com/docs/grafana/latest/packages_api/runtime/templatesrv/) that can be used to fetch available template variables.

```javascript
getTemplateSrv().replace(`$randomVariable`);
```

## getLocationSrv (global)

Used to retrieve the [LocationSrv](https://grafana.com/docs/grafana/latest/packages_api/runtime/locationsrv/) that can be used to update the template variables.

```javascript
getLocationSrv().update({
  query: {
    'var-randomVariable': 'randomValue',
  },
  partial: true,
  replace: false,
});
```
