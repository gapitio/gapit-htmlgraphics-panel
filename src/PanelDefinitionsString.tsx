export const PanelDefinitionsString = `
/**
 * The HTML node from the HTML/SVG code.
 *
 * It's a shadow root https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM.
 */
declare const htmlNode: ShadowRoot;

/**
 * The codeData as a dictionary.
 */
declare const codeData: {[key: string]: any};

/**
 * PanelData for the panel.
 * https://grafana.com/docs/grafana/latest/packages_api/data/paneldata/.
 */
declare const data: {[key: string]: any};

/**
 * The panel options you've set (codeData, SVGBaseFix, onInit, ETC).
 */
declare const options: {[key: string]: any};

/**
 * Grafana theme.
 * Here you can get theme current theme, colors, sizes, ETC.
 *
 * https://grafana.com/docs/grafana/latest/packages_api/data/grafanatheme/
 */
declare const theme: {[key: string]: any; isDark: boolean; isLight: boolean};

/**
 * Via the TemplateSrv consumers get access to all the available template variables
 * that can be used within the current active dashboard.
 *
 * For a more in-depth description visit: https://grafana.com/docs/grafana/latest/reference/templating
 */
interface TemplateSrv {
  /**
   * List the dashboard variables
   */
  getVariables(): {
    type: 'query' | 'adhoc' | 'constant' | 'datasource' | 'interval' | 'textbox' | 'custom' | 'system';
    name: string;
    label: string | null;
  }[];
  /**
   * Replace the values within the target string
   */
  replace(target: string, scopedVars?: any, format?: string | Function): string;
}

/**
 * Used to retrieve the TemplateSrv that can be used to fetch available template variables.
 *
 * https://grafana.com/docs/grafana/latest/packages_api/runtime/gettemplatesrv/
 */
declare const getTemplateSrv: () => TemplateSrv;

/**
 * Type to represent the value of a single query variable.
 */
declare type UrlQueryValue = string | number | boolean | string[] | number[] | boolean[] | undefined | null;

/**
 * Type to represent the values parsed from the query string.
 */
declare type UrlQueryMap = Record<string, UrlQueryValue>;

/**
 * Passed as options to the {@link LocationSrv} to describe how the automatically navigation
 * should be performed.
 *
 * @public
 */
interface LocationUpdate {
  /**
   * Target path where you automatically wants to navigate the user.
   */
  path?: string;
  /**
   * Specify this value if you want to add values to the query string of the URL.
   */
  query?: UrlQueryMap;
  /**
   * If set to true, the query argument will be added to the existing URL.
   */
  partial?: boolean;
  /**
   * Used internally to sync the Redux state from Angular to make sure that the Redux location
   * state is in sync when navigating using the Angular router.
   *
   * @remarks
   * Do not change this unless you are the Angular router.
   *
   * @internal
   */
  routeParams?: UrlQueryMap;
  replace?: boolean;
}

/**
 * If you need to automatically navigate the user to a new place in the application this should
 * be done via the LocationSrv and it will make sure to update the application state accordingly.
 */
interface LocationSrv {
  update(options: LocationUpdate): void;
}

/**
 * Used to retrieve the LocationSrv that can be used to automatically navigate the user to a new place in Grafana.
 *
 * https://grafana.com/docs/grafana/latest/packages_api/data/grafanatheme/
 */
declare function getLocationSrv(): LocationSrv;
`;
