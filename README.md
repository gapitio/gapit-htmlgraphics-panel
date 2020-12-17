# HTML graphics

Grafana panel for displaying metric sensitive HTML and SVG graphics.

![Preview](https://raw.githubusercontent.com/gapitio/gapit-htmlgraphics-panel/master/src/img/screenshot-building-overview-edit.png)

This plugin is highly inspired by [marcuscalidus-svg-panel](https://github.com/MarcusCalidus/marcuscalidus-svg-panel), [aidanmountford-html-panel](https://github.com/AidanMountford/aidanmountford-html-panel), and [aceiot-svg-panel](https://github.com/ACE-IoT-Solutions/ace-svg-react).

## Table of contents

- [HTML graphics](#html-graphics)
  - [Table of contents](#table-of-contents)
  - [Goals for this plugin](#goals-for-this-plugin)
  - [Installation](#installation)
    - [Grafana-cli (recommended)](#grafana-cli-recommended)
    - [Docker compose file](#docker-compose-file)
    - [Manual](#manual)
  - [Getting started](#getting-started)
  - [Options](#options)
    - [Display](#display)
      - [Fit content to panel](#fit-content-to-panel)
      - [Center align content](#center-align-content)
      - [Overflow](#overflow)
    - [Polyfill](#polyfill)
      - [SVG base fix](#svg-base-fix)
    - [Custom properties](#custom-properties)
    - [CSS](#css)
    - [HTML/SVG document](#htmlsvg-document)
    - [On render JS](#on-render-js)
    - [On init JS](#on-init-js)
  - [Execution Environment Interfaces](#execution-environment-interfaces)
    - [htmlNode](#htmlnode)
    - [customProperties](#customproperties)
    - [codeData](#codedata)
    - [data](#data)
    - [options](#options-1)
    - [theme](#theme)
    - [getTemplateSrv](#gettemplatesrv)
    - [getLocationSrv](#getlocationsrv)
  - [Fonts](#fonts)
  - [Learn more](#learn-more)

## Goals for this plugin

Display metric sensitive HTML and SVG graphics.

Give the user/programmer the ability to use the new [Grafana API](https://grafana.com/docs/grafana/latest/packages_api/).

Make it easy for the user/programmer to change values and repeat code (with the addition of Custom properties).

## Installation

You can get all the releases [here](https://github.com/gapitio/gapit-htmlgraphics-panel/releases).
The version is written at the left side with the following format `vX.X.X`.

> **WARNING**: Examples used is written with `{version}` instead of the version number and needs to be replaced with a version number.

### Grafana-cli (recommended)

```bash
grafana-cli --pluginUrl https://github.com/gapitio/gapit-htmlgraphics-panel/archive/{version}.zip plugins install gapit-htmlgraphics-plugin
```

To install v0.0.4

```bash
grafana-cli --pluginUrl https://github.com/gapitio/gapit-htmlgraphics-panel/archive/v0.0.4.zip plugins install gapit-htmlgraphics-plugin
```

### Docker compose file

```docker
version: '2'
services:

  grafana:
    image: grafana/grafana:7.2.0
    container_name: grafana
    restart: always
    networks:
      - grafana
    ports:
      - 3000:3000
    environment:
      - GF_INSTALL_PLUGINS=https://github.com/gapitio/gapit-htmlgraphics-panel/archive/{version};gapit-htmlgraphics-panel

networks:
    grafana:
      external:
            name: grafana
```

### Manual

1. Go to <https://github.com/gapitio/gapit-htmlgraphics-panel/releases>.
2. Download the zip file.
3. Uncompress the file into the Grafana plugins directory.

## Getting started

It is recommended to use a text editor like [Visual studio code](https://code.visualstudio.com/) and [Atom](https://atom.io/) to have it saved on your computer incase the panel crashes (haven't had any crashes, but you never know what can happen), or you create an unescapable loop. It also makes it easier to add extensions and those things in a local editor. Instead of coding directly into the panels text editor.

To update the panel, press ctrl+s inside the text editor or click outside the text editor, when new code is written in the panels text editor.

1. Read what the [Options](#options) are and how to use them.
2. Read what the [Execution Environment Interfaces](#execution-environment-interfaces) are and how to use them.
3. Check out the [Examples](https://github.com/gapitio/gapit-htmlgraphics-panel/tree/master/examples).
4. Create a graphical drawing in HTML or SVG. Creating SVG graphic is easiest to do in a vector graphics software like [Inkscape](https://inkscape.org/) and [Adobe Illustrator](https://www.adobe.com/products/illustrator.html).
5. Create a bew panel and select HTML Graphics in the visualization option.
6. Paste the HTML/SVG code into the HTML/SVG document text editor.
7. Write code that you want to run once when the dashboard loads in the onInit text editor.
8. Write code that you want to run when new data is available in the onRender text editor.
9. Add options into the Custom properties text editor.
10. Make good use of the [developer console](https://developers.google.com/web/tools/chrome-devtools) (ctrl+shift+j) and console.log().

## Options

### Display

#### Fit content to panel

This is mostly for SVG, as it will scale the content based on the size of the panel.
Adds 100% height and width attribute to the document.

#### Center align content

Vertically and horizontally aligns the panel content to the center.
Adds "display: flex; justify-content: center; align-items: center" to the shadow root container.

#### Overflow

Chooses what happens if content overflows outside the panel.
"Fit content to panel" is recommended to turn on with some of these options, as some of these won't work without it.

![Overflow options](https://raw.githubusercontent.com/gapitio/gapit-htmlgraphics-panel/master/src/img/screenshot-overflow.png)

### Polyfill

#### SVG base fix

Fixes an issue in Firefox where xlink:href needs the url to be able to find the link.
<https://stackoverflow.com/a/18265336>
<https://www.w3.org/TR/SVG/linking.html>

### Custom properties

Custom properties can be used to easily change values when multiple people are working on it. E.g.

- Change the range of a color.
- Toggle between showcase and production mode, to show how it would look if there were values there.
- Toggle between themes.
- Increase the max value of a bar.

Having a json file sort of as a configuration file makes it much easier to copy a panel and change some values in the json file instead of going through the javascripts for it.

Think of this scenario: You have three dashboards with similar graphics. The only difference is a value range. You can create one code for all three panels, and have a configuration file (Custom properties) with the ranges. Also makes it much easier to change later on (bugs, changes and additions) when the code is similar on all the panels.

### CSS

The style which can be used to style the HTML/SVG document.
Gets added next to the html document.

```html
#shadow-root
<style>
  /* The CSS */
</style>
<div>
  HTML/SVG document
</div>
```

### HTML/SVG document

The html/svg code which is displayed on the panel.

### On render JS

Executes the code every render (when new data is available).

### On init JS

Executes when the panel loads

## Execution Environment Interfaces

The plugin makes several interfaces to the HTML/SVG document and Grafana in the execution context of onRender and onInit functions/javascripts. Below are details for each. Remember, you can always use the [developer console](https://developers.google.com/web/tools/chrome-devtools/console) (ctrl+shift+j) and [console.log()](https://developer.mozilla.org/en-US/docs/Web/API/Console/log).

```javascript
// Log this in onRender or onInit, and look at developer console (ctrl+shift+j).
console.log('htmlNode', htmlNode);
console.log('customProperties', customProperties);
console.log('data', data);
console.log('options', options);
console.log('theme', theme);
```

### htmlNode

The [shadow root](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot) which contains the elements added in the HTML/SVG document (works similarly to document).

Used to get elements and their properties.

```javascript
const randomTextElt = htmlNode.getElementById('random-text-elt');
randomTextElt.textContent = 'Something';
randomTextElt.style.fill = '#08f';
```

### customProperties

The parsed json object (_also available as a JSON string in options.codeData_) from the Custom properties (named codeData for backwards compatibility) option.

Used to get the json object values.

```json
customProperties (remember, comments are not allowed in json)

{
  "something": false
}
```

```javascript
// onRender or onInit

console.log(customProperties.something);
```

### codeData

**Note**: codeData is here for backwards compatibility. Please use customProperties instead.

The parsed json object (_also available as a JSON string in options.codeData_) from the Custom properties (named codeData for backwards compatibility) option.

Used to get the json object values.

```json
codeData (remember, comments are not allowed in json)

{
  "something": false
}
```

```javascript
// onRender or onInit

console.log(codeData.something);
```

### data

The [PanelData interface](https://grafana.com/docs/grafana/latest/packages_api/data/paneldata/) passed in to the panel by Grafana. It is used to get the values from the DataFrame.

Can be used to retrieve metric values.

```javascript
// Used in onRender as it updates every time new data is available
const getMetricByName = (metricName, noDataValue = 'No data') => {
  const filteredSeries = data.series.filter(series => series.name == metricName);
  if (filteredSeries.length > 0) {
    return filteredSeries[0].fields[1].state.calcs.last;
  }
  return noDataValue;
};

getMetricByName('random-metric-name');
```

### options

The options object that can be edited in the edit menu. All the options are stored in the object (onRender, htmlNode, ETC).

```javascript
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

### theme

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

### getTemplateSrv

Used to retrieve the [TemplateSrv](https://grafana.com/docs/grafana/latest/packages_api/runtime/templatesrv/) that can be used to fetch available template variables.

```javascript
getTemplateSrv().replace(`$randomVariable`);
```

### getLocationSrv

Used to retrieve the [LocationSrv](https://grafana.com/docs/grafana/latest/packages_api/runtime/locationsrv/) that can be used to automatically navigate the user to a new place in Grafana.

Can be used to update a variable in Grafana.

- [Grafana templates and variables](https://grafana.com/docs/grafana/latest/developers/plugins/add-support-for-variables/)
- [Example](https://github.com/gapitio/gapit-htmlgraphics-panel/tree/master/examples/update-grafana-variable-example)

```javascript
getLocationSrv().update({
  query: {
    'var-randomVariable': 'randomValue',
  },
  partial: true,
  replace: true,
});
```

## Fonts

[Open Sans](https://fonts.google.com/specimen/Open+Sans) is added by this plugin, with four different font weights.

This makes it easier to use a font that can be used on most devices and have multiple font weights (Grafana already adds [Roboto](https://fonts.google.com/specimen/Roboto), but it doesn't have light).

It doesn't mean that you can't use different fonts, just means that [Open Sans](https://fonts.google.com/specimen/Open+Sans) is added by this plugin. If you want to make it look most like Grafana, you should use [Roboto](https://fonts.google.com/specimen/Roboto) as Grafana uses it as the default font.

![Open Sans font weights](https://raw.githubusercontent.com/gapitio/gapit-htmlgraphics-panel/master/src/img/screenshot-open-sans-font-weights.png)

## Learn more

- [ShadowRoot](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot) - If you want to know how to use the htmlNode.
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - The editor used.
- [Grafana documentation](https://grafana.com/docs/)
- [Grafana templates and variables](https://grafana.com/docs/grafana/latest/developers/plugins/add-support-for-variables/)
- [Font added](https://fonts.google.com/specimen/Open+Sans?sidebar.open=true&selection.family=Open+Sans:wght@300;400;600;700) - The font added by this plugin
