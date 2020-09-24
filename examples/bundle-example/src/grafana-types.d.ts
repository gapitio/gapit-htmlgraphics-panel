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

declare enum FieldType {
  time = 'time',
  number = 'number',
  string = 'string',
  boolean = 'boolean',
  trace = 'trace',
  other = 'other'
}

interface FieldCalcs extends Record<string, any> {}

interface Field<T = any, V = Vector<T>> {
  /**
   * Name of the field (column)
   */
  name: string;
  /**
   *  Field value type (string, number, etc)
   */
  type: FieldType;
  /**
   *  Meta info about how field and how to display it
   */
  config: { [key: string]: any };
  values: V;
  labels?: { [key: string]: string };
  /**
   * Cached values with appropriate display and id values
   */
  state?: {
    /**
     * An appropriate name for the field (does not include frame info)
     */
    displayName?: string | null;
    /**
     * Cache of reduced values
     */
    calcs?: FieldCalcs;
    /**
     * Appropriate values for templating
     */
    scopedVars?: { [key: string]: any };
  } | null;
  /**
   * Convert text to the field value
   */
  parse?: (value: any) => T;
  /**
   * Convert a value for display
   */
  display?: Function;
  /**
   * Get value data links with variables interpolated
   */
  getLinks?: Function;
}

interface Vector<T = any> {
  length: number;
  /**
   * Access the value by index (Like an array)
   */
  get(index: number): T;
  /**
   * Get the results as an array.
   */
  toArray(): T[];
}

declare const data: {
  [key: string]: any;
  series: {
    name?: string;
    fields: Field[];
    length: number;
    refId: string;
    meta: any;
  }[];
};

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

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.json' {
  const content: any;
  export default content;
}

interface Window {
  svgData: string;
  htmlNode: typeof htmlNode;
  codeData: typeof codeData;
  data: typeof data;
  options: typeof options;
  theme: typeof theme;
}
