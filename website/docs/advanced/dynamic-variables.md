---
id: dynamic-variables
title: Dynamic variables
---

:::tip
Check out this article about mutations [Arrays, Objects and Mutations](https://medium.com/@fknussel/arrays-objects-and-mutations-6b23348b54aa)
:::

Dynamic variables basically means the variable mutates. Mutations basically means the variable changes ([A good article about mutations](https://medium.com/@fknussel/arrays-objects-and-mutations-6b23348b54aa)).

Because it mutates there are some stuff to be careful about. The main thing is where you copy the variable from.

## Example 1

<details><summary>Panel json</summary>
<p>

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
  "css": "* {\n  font-family: Open Sans;\n}\n\n.box {\n  border: solid #555 2px;\n  border-radius: 10px;\n  padding: 10px 20px;\n}\n",
  "html": "",
  "renderOnMount": true,
  "onRender": "",
  "dynamicHtmlGraphics": true,
  "dynamicData": false,
  "dynamicFieldDisplayValues": false,
  "dynamicProps": false,
  "panelupdateOnMount": true,
  "onInitOnResize": false,
  "onInit": "console.log(\"ONINIT RELOAD\");\n\nconst data1 = htmlGraphics.data;\n\nfunction update() {\n  console.log(\"htmlGraphics\", htmlGraphics.data.series[0].fields[1].state.calcs.last);\n  console.log(\"data1\", data1.series[0].fields[1].state.calcs.last);\n}\n\nhtmlNode.addEventListener(\"panelupdate\", update);\n"
}
```

</p>
</details>

Let's say the first time you refresh the value is 10 and the second time the value is 20.

`onInit`

```js
console.log('ONINIT RELOAD');

const data1 = htmlGraphics.data;

function update() {
  console.log('htmlGraphics', htmlGraphics.data.series[0].fields[1].state.calcs.last);
  console.log('data1', data1.series[0].fields[1].state.calcs.last);
}

htmlNode.addEventListener('panelupdate', update);
```

`Console`

```
htmlGraphics 10
data1 10

htmlGraphics 20
data1 10
```

Notice the first time it logs both htmlGraphics and data1 are 10, but the second time htmlGraphics is 20 and data1 is 10. The reason for this is because `htmlGraphics.data` is assigned to `data1` and `htmlGraphics` is the one with the dynamic variable.

For `data1` to be dynamic [Dynamic data object](../options.md#dynamic-data) must be true.
