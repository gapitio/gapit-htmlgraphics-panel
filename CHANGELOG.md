# Changelog

## v2.1.1 (2022-08-11)

### Features / enhancements

- **Declarations**: Add missing declaration descriptions [301e69a](https://github.com/gapitio/gapit-htmlgraphics-panel/commit/301e69a862a4eb5621690732932620a4e25968e3)

## v2.1.0 (2022-08-09)

### Features / enhancements

- **Options**: Add Grafana scrollbar [#111](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/111)
- **Declarations**: More accurate declarations [#113](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/113)
- **Repo**: Add locationService [#117](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/117)

## v2.0.3 (2022-03-07)

### Features / enhancements

- **Repo**: Add release files without the version number [1a8b313](https://github.com/gapitio/gapit-htmlgraphics-panel/commit/1a8b313b03ee9f59edc10291a6d7ff5e5be69512)

## v2.0.2 (2022-01-31)

### Features / enhancements

- **Repo**: Update grafana packages to work with latest grafana version (8.3.4)

## v2.0.1 (2022-01-10)

### Bug fixes

- **Repo**: Fix inconsistency with dynamic variables [#77](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/77)
- **Repo**: Fix fieldDisplayValues is undefined on panel load [#72](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/72)
- **Options**: Fix wrong default calcs value [#75](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/75)

## v2.0.0 (2021-11-30)

[Release notes v2.0.0](https://gapit-htmlgraphics-panel.gapit.io/docs/release-notes/v2.0.0/)

### Features / enhancements

- **Repo**: Add better calcs mutation handler [a7abb76](https://github.com/gapitio/gapit-htmlgraphics-panel/commit/a7abb76aeedb1e40bfa5253695a0e4273bc4b0d5)
- **Repo!**: Don't save the import/export option (`importedPanelOptions`) [211e35b](https://github.com/gapitio/gapit-htmlgraphics-panel/commit/211e35b5d8e54d2a7f9863e40024ac56f8d8be7e)

### Breaking changes

#### Don't save the import/export option (`importedPanelOptions`)

Halves the size of the saved panel options. This might have some effects on code that checks this option. The options change doesn't happen until a change/save in the import/export section is triggered.

## v1.5.0 (2021-10-28)

### Features / enhancements

- **Repo**: Add dynamic props [#55](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/55)
- **Repo**: Add dynamic htmlGraphics [#56](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/56)
- **Repo**: Add onInitOnResize [#63](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/63)

### Bug fixes

- **Repo**: Fix onInit triggers when leaving edit mode [#59](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/59)

## v1.4.1 (2021-10-28)

### Features / enhancements

- **Repo**: Show error message in the alert component [#54](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/54)

### Bug fixes

- **Repo**: Fix default onRender code causes error [acec820](https://github.com/gapitio/gapit-htmlgraphics-panel/commit/acec8206b437111bdba71d0b7739f4f27a1c83b1)

## v1.4.0 (2021-10-20)

### Features / enhancements

- **Code editor**: Only load declarations in edit mode [#49](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/49)
- **Options**: Add stock field and overrides tabs [#24](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/24)
- **Options**: Add root css [#44](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/44)
- **Options**: Add calcs mutation [#47](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/47)
- **References**: Centralize references (htmlGraphics) [#30](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/30)
- **References**: Expose props [#36](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/36)
- **References**: Add panelwillunmount event [#37](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/37)
- **Website**: Add website [#39](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/39)

### Bug fixes

- **References**: Fix missing type on custom properties [#31](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/31)

### Breaking changes

- **Code editor**: Use the integrated code editor [#38](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/38). Latest version that works with this change requires v8.2.0+ of Grafana. This also fixes [#32](https://github.com/gapitio/gapit-htmlgraphics-panel/issues/32).

## v1.3.3 (2021-04-12)

### Bug fixes

- **Repo**: Fix errors not logged in the console [#22](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/22)

## v1.3.2 (2021-04-07)

### Bug fixes

- **Repo**: Fix editor not loading with sub path [#20](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/20)

## v1.3.1 (2021-02-12)

### Features / enhancements

- **Repo**: Change the grafana version to the earliest working for this plugin (7.1.0)

## v1.3.0 (2021-02-11)

### Features / enhancements

- **onInit**: Add onpanelupdate events, dynamicData option, and "Trigger panelupdate when mounted" option [#10](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/10)

### Bug fixes

- **Import/Export**: Fix panel options not updating when importing/changing values in the import option [#13](https://github.com/gapitio/gapit-htmlgraphics-panel/pull/13)

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

- **Code editor**: Support offline

## v0.0.3 (2020-10-06)

### Features / enhancements

- **Code editor**: Better Grafana types for autocompletion
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
- **Screenshots**: Add open-sans-font-weight, building-overview, building-overview-edit and code-editor screenshot.

### Bug fixes

- **plugin.json**: Fix wrong date format.

## v0.0.0 (2020-09-07)

Initial
