import {
  FieldDisplay,
  FieldReducerInfo,
  GrafanaTheme,
  GrafanaTheme2,
  PanelData,
  PanelProps,
  Registry,
} from '@grafana/data';
import {
  getLocationSrv as getLocationSrvType,
  getTemplateSrv as getTemplateSrvType,
  LocationService,
} from '@grafana/runtime';
import { HTMLNode, JSONType, OptionsInterface, PopulatedGetFieldDisplayValuesOptions } from './index';

declare global {
  /**
   * The [ShadowRoot](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot) which contains the elements added in the HTML/SVG document.
   */
  const htmlNode: HTMLNode;
  /**
   * The parsed JSON object from the Custom properties option.
   *
   * @deprecated in favor of {@link customProperties}
   */
  const codeData: JSONType;
  /**
   * The parsed JSON object from the Custom properties option.
   */
  const customProperties: typeof codeData;
  /**
   * The PanelData interface passed into the panel by Grafana.
   */
  const data: PanelData;
  /**
   * The options object.
   */
  const options: OptionsInterface;
  /**
   * The GrafanaTheme object. It stores the current theme (light/dark), colors used by grafana, ETC.
   */
  const theme: GrafanaTheme;
  /**
   * Used to retrieve the {@link TemplateSrv} that can be used to fetch available
   * template variables.
   *
   */
  const getTemplateSrv: typeof getTemplateSrvType;
  /**
   * Used to retrieve the {@link LocationSrv} that can be used to automatically navigate
   * the user to a new place in Grafana.
   *
   * @deprecated in favor of {@link locationService} and will be removed in Grafana 9
   */
  const getLocationSrv: typeof getLocationSrvType;

  const htmlGraphics: {
    /**
     * The [ShadowRoot](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot) which contains the elements added in the HTML/SVG document.
     */
    htmlNode: typeof htmlNode;
    /**
     * The parsed JSON object from the Custom properties option.
     *
     * @deprecated in favor of {@link customProperties}
     */
    codeData: typeof codeData;
    /**
     * The parsed JSON object from the Custom properties option.
     */
    customProperties: typeof customProperties;
    /**
     * The PanelData interface passed into the panel by Grafana.
     */
    data: typeof data;
    /**
     * The options object.
     */
    options: typeof options;
    /**
     * The GrafanaTheme object. It stores the current theme (light/dark), colors used by grafana, ETC.
     */
    theme: typeof theme;
    /**
     * The new GrafanaTheme2 object introduced in Grafana v8. It stores the current theme (light/dark), colors used by grafana, ETC.
     */
    theme2: GrafanaTheme2;
    /**
     * Used to retrieve the {@link TemplateSrv} that can be used to fetch available
     * template variables.
     *
     */
    getTemplateSrv: typeof getTemplateSrv;
    /**
     * Used to retrieve the {@link LocationSrv} that can be used to automatically navigate
     * the user to a new place in Grafana.
     *
     * @deprecated in favor of {@link locationService} and will be removed in Grafana 9
     */
    getLocationSrv: typeof getLocationSrv;
    /**
     * A wrapper to help work with browser location and history.
     */
    locationService: LocationService;
    /**
     * Containing all the props from the panel PanelProps.
     */
    props: PanelProps<OptionsInterface>;
    /**
     * The width of the panel
     */
    width: number;
    /**
     * The height of the panel
     */
    height: number;
    /**
     * Returns a list of reduced values.
     */
    getFieldDisplayValues: (options: PopulatedGetFieldDisplayValuesOptions) => FieldDisplay[];
    /**
     * List of reduced values.
     */
    fieldDisplayValues: FieldDisplay[];
    /**
     * A list of the reducers.
     */
    fieldReducers: Registry<FieldReducerInfo>;
  };
}
