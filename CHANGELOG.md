# Change Log

## v1.2.0 (2020-12-18)

### Features / enhancements

- **Options**: Add overflow radio option [#8](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/8)
- **Options**: Add import and export of panel options [#9](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/9)

## v1.1.0 (2020-12-4)

### Features / enhancements

- **Repo**: Add default configuration to show how to connect CSS, HTML, JS, and customProperties.
- **Repo**: codeData has been renamed customProperties. codeData is still available, and most of the internal code still uses codeData for backwards compatibility.
- **Options**: Simplify field names and description.
- **Options**: Move CSS, HTML, onRender, and onInit to the Display category.

### Bug fixes

- **HTML/SVG document**: Fix html not updating after removing all code
- **Fit content to panel**: Fix html elements not fitting to panel

### Breaking changes

- Panels made from older versions will add default values to CSS, HTML/SVG document, onInit, onRender, and customProperties if they are unchanged (If the field/option has been changed, they will not be overridden by the default value).

## v1.0.0 (2020-11-20)

### Features / enhancements

- **Repo**: Use the new [package format](https://grafana.com/docs/grafana/latest/developers/plugins/package-a-plugin/)
- **Repo**: [Sign the plugin](https://grafana.com/docs/grafana/latest/developers/plugins/sign-a-plugin/)

### Breaking changes

- Since the new package format, there might be problems unpacking it.

## v0.0.4 (2020-10-22)

### Features / enhancements

- **Text editor**: Support offline

## v0.0.3 (2020-10-06)

### Features / enhancements

- **Text editor**: Better Grafana types for autocompletion
- **codeData**: Add a collapse header icon

## v0.0.2 (2020-09-28)

### Features / enhancements

- **Examples**: Add bundle and Grafana variable example
- **Scripts**: Add support for Grafana/template variables

### Bug fixes

- **SimpleOptions/codeData**: Fix number showing string option
- **SVGBaseFix**: Fix problem with multiple href.

## v0.0.1 (2020-09-10)

### Features / enhancements

- **Readme**: Add more information.
- **plugin.json**: Add author url and keywords.
- **SVGBaseFix**: Update links used in the comments.
- **Screenshots**: Add open-sans-font-weight, building-overview, building-overview-edit and text-editor screenshot.

### Bug fixes

- **plugin.json**: Fix wrong date format.

## v0.0.0 (2020-09-07)

Initial
