---
id: quick-start
title: Quick start
---

:::tip
It is recommended to use a text editor like [Visual Studio Code](https://code.visualstudio.com/) or [Atom](https://atom.io/) to have it saved on your computer in case you create an inescapable loop or something similar.
:::

To update the panel, press `ctrl+s` inside the text editor or click outside the text editor, the panel will only save if there are new changes.

1. Create a graphical drawing in HTML or SVG.
   :::tip
   Using a vector graphics software like [Inkscape](https://inkscape.org/) and [Adobe Illustrator](https://www.adobe.com/products/illustrator.html) makes creating graphics a lot easier.
   :::
2. Create a new panel and select HTML Graphics in the visualizations tab.
3. Paste the HTML/SVG code into the HTML/SVG document text editor.
4. Write code that you want to run once when the dashboard loads in the onInit text editor.
5. Write code that you want to run when new data is available in the onRender text editor.
6. Add options into the Custom properties text editor that you want to use in onInit or onRender.
7. Make good use of the [developer console](https://developers.google.com/web/tools/chrome-devtools) (ctrl+shift+j) and console.log().

Using a [bundler](./projects#bundlers) is highly encouraged.
