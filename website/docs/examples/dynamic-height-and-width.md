---
id: dynamic-height-and-width
title: Dynamic height and width
---

![Dynamic height and width](../../static/gif/example-dynamic-height-and-width.gif)

`CSS`

```css
* {
  font-family: Open Sans;
}

div {
  text-align: center;
}
```

`HTML/SVG`

```html
<div>
  <p><span>Height: </span><span class="value-field" /></p>
  <p><span>Width: </span><span class="value-field" /></p>
</div>
```

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

`Panel options` (import/export)

```json
{
  "calcsMutation": "standard",
  "reduceOptions": {
    "calcs": [
      "lastNotNull",
      "last",
      "first",
      "firstNotNull",
      "min",
      "max",
      "mean",
      "sum",
      "count",
      "range",
      "delta",
      "step",
      "diff",
      "logmin",
      "allIsZero",
      "allIsNull",
      "diffperc"
    ]
  },
  "add100Percentage": true,
  "centerAlignContent": true,
  "overflow": "visible",
  "SVGBaseFix": true,
  "codeData": "{\n  \"text\": \"Random text\"\n}",
  "rootCSS": "",
  "css": "* {\n  font-family: Open Sans;\n}\n\ndiv {\n  text-align: center;\n}",
  "html": "<div>\n  <p><span>Height: </span><span class=\"value-field\" /></p>\n  <p><span>Width: </span><span class=\"value-field\" /></p>\n</div>\n",
  "renderOnMount": true,
  "onRender": "",
  "dynamicData": false,
  "dynamicHtmlGraphics": false,
  "dynamicFieldDisplayValues": false,
  "dynamicProps": false,
  "panelupdateOnMount": true,
  "onInitOnResize": true,
  "onInit": "// REMEMBER TO TURN DYNAMIC HTMLGRAPHICS AND TRIGGER ONINIT ON RESIZE TO TRUE\n\nconst [heightValueElt, widthValueElt] = htmlNode.querySelectorAll(\".value-field\");\n\nconst updateValueText = () => {\n  heightValueElt.textContent = htmlGraphics.height;\n  widthValueElt.textContent = htmlGraphics.width;\n}\n\nupdateValueText();\n\n"
}
```
