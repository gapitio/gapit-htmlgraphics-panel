---
id: simple-example
title: Simple example
---

![Simple example](../../static/img/simple-example.png)

`CSS`

```css
* {
  font-family: Open Sans;
}

.box {
  border: solid #555 2px;
  border-radius: 10px;
  padding: 10px 20px;
}
```

`HTML/SVG`

```html
<div style="text-align: center;">
  <div class="box" id="htmlgraphics-text"></div>
  <br />
  <div class="box" id="htmlgraphics-value"></div>
</div>
```

`onRender`

```javascript
// Sets the value from the first series on every refresh
const htmlgraphicsValue = htmlNode.getElementById('htmlgraphics-value');

if (htmlgraphicsValue) {
  const valueField = data.series[0].fields[1];
  const length = valueField.values.length;
  htmlgraphicsValue.textContent = valueField.values.get(length - 1);
}
```

`onInit`

```javascript
// Sets the text from customProperties
const htmlgraphicsText = htmlNode.getElementById('htmlgraphics-text');

if (htmlgraphicsText) {
  htmlgraphicsText.textContent = customProperties.text;

  // Change the text color based on the theme
  if (theme.isDark) {
    htmlgraphicsText.style.color = 'green';
  } else {
    htmlgraphicsText.style.color = 'red';
  }
}
```

`Custom properties`

```json
{
  "text": "Random text"
}
```

`Panel options` (import/export)

```json
{
  "add100Percentage": true,
  "centerAlignContent": true,
  "overflow": "visible",
  "SVGBaseFix": true,
  "codeData": "{\n  \"text\": \"Random text\"\n}",
  "css": "* {\n  font-family: Open Sans;\n}\n\n.box {\n  border: solid #555 2px;\n  border-radius: 10px;\n  padding: 10px 20px;\n}\n",
  "html": "<div style=\"text-align: center;\">\n  <div class=\"box\" id=\"htmlgraphics-text\"></div>\n  <br />\n  <div class=\"box\" id=\"htmlgraphics-value\"></div>\n</div>\n",
  "renderOnMount": true,
  "onRender": "// Sets the value from the first series on every refresh\nconst htmlgraphicsValue = htmlNode.getElementById('htmlgraphics-value');\n\nif (htmlgraphicsValue) {\n  const valueField = data.series[0].fields[1];\n  const length = valueField.values.length;\n  htmlgraphicsValue.textContent = valueField.values.get(length - 1);\n}",
  "dynamicData": false,
  "panelupdateOnMount": true,
  "onInit": "// Sets the text from customProperties\nconst htmlgraphicsText = htmlNode.getElementById('htmlgraphics-text');\n\nif (htmlgraphicsText) {\n  htmlgraphicsText.textContent = customProperties.text;\n\n  // Change the text color based on the theme\n  if (theme.isDark) {\n    htmlgraphicsText.style.color = 'green';\n  } else {\n    htmlgraphicsText.style.color = 'red';\n  }\n}\n"
}
```
