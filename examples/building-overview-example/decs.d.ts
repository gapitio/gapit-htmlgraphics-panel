/*
  Simple declaration file for the Execution environment variables from htmlgraphics plugin.
  Makes it so htmlNode, codeData, data, options, and theme can be suggested/autocompleted/hinted by your editor.

  jsconfig.json makes this directory the root of the project.
  https://code.visualstudio.com/docs/languages/jsconfig
*/

/**
 * The HTML node from the HTML/SVG code.
 *
 * It's a shadow root https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM.
 */
declare const htmlNode: ShadowRoot;

/**
 * The codeData as a dictionary.
 */
declare const codeData: { [key: string]: any };

/**
 * PanelData for the panel.
 * https://grafana.com/docs/grafana/latest/packages_api/data/paneldata/.
 */
declare const data: { [key: string]: any };

/**
 * The panel options you've set (codeData, SVGBaseFix, onInit, ETC).
 */
declare const options: { [key: string]: any };

/**
 * Grafana theme.
 * Here you can get theme current theme, colors, sizes, ETC.
 *
 * https://grafana.com/docs/grafana/latest/packages_api/data/grafanatheme/
 */
declare const theme: { [key: string]: any; isDark: boolean; isLight: boolean };
