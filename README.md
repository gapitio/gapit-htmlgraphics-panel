# HTML graphics

Grafana panel for displaying metric sensitive HTML or SVG graphics.

This plugin is highly inspired by [marcuscalidus-svg-panel](https://github.com/MarcusCalidus/marcuscalidus-svg-panel), [aidanmountford-html-panel](https://github.com/AidanMountford/aidanmountford-html-panel), and [aceiot-svg-panel](https://github.com/ACE-IoT-Solutions/ace-svg-react).

## Options

- Display
  - Add 100% - This is mostly for SVG, as it will scale the content based on the size of the panel
  - Center align content - Vertically and horizontally aligns the panel content to the center
- SVG base fix - Fixes an issue in Firefox where xlink:href needs the url to be able to find the link
- Code data - Easily toggle values to use in your code (onRender and onInit)
- CSS - The style which can be used to style the HTML/SVG document
- HTML/SVG document - The html/svg code which is displayed on the panel
- On render JS - Executes the code every render (when new data is available)
- On init JS - Executes when the panel loads

## Execution environment variables

- `htmlNode` is the [shadow root](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot). It contains the elements added in the HTML/SVG document (works similarly to document).
- `codeData` is the parsed json object (also available as a json string in options.codeData). It can be used to easily change values if multiple people are working on it. E.g.
  - Change the range of a color.
  - Toggle between showcase and production mode, to show how it would look if there were values there.
  - Toggle between themes.
  - Increase the max value of a bar.
- `data` is the [PanelData interface](https://grafana.com/docs/grafana/latest/packages_api/data/paneldata/) passed in to the panel by Grafana. It is used to get the values from the DataFrame.
- `options` is the options object that can be edited in the edit menu. All the options are stored in the object (onRender, htmlNode, ETC).
- `theme` is the [GrafanaTheme](https://grafana.com/docs/grafana/latest/packages_api/data/grafanatheme/) interface. It stores the current theme (light/dark), colors used by grafana, ETC.

## Learn more

- [ShadowRoot](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot) - If you want to know how to use the htmlNode.
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - The editor used.
- [Grafana documentation](https://grafana.com/docs/)
- [Font added](https://fonts.google.com/specimen/Open+Sans?sidebar.open=true&selection.family=Open+Sans:wght@300;400;600;700) - The font added by this plugin
