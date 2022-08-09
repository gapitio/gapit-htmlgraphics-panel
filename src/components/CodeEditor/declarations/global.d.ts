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
   * The ShadowRoot containing the HTML/SVG and CSS code.
   *
   * The htmlNode is a shadow root https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM.
   */
  const htmlNode: HTMLNode;
  const codeData: JSONType;
  const customProperties: typeof codeData;
  const data: PanelData;
  const options: OptionsInterface;
  const theme: GrafanaTheme;
  const getTemplateSrv: typeof getTemplateSrvType;
  const getLocationSrv: typeof getLocationSrvType;

  const htmlGraphics: {
    /**
     * The ShadowRoot containing the HTML/SVG and CSS code.
     *
     * The htmlNode is a shadow root https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM.
     */
    htmlNode: typeof htmlNode;
    codeData: typeof codeData;
    customProperties: typeof customProperties;
    data: typeof data;
    options: typeof options;
    theme: typeof theme;
    theme2: GrafanaTheme2;
    getTemplateSrv: typeof getTemplateSrv;
    getLocationSrv: typeof getLocationSrv;
    locationService: LocationService;
    props: PanelProps<OptionsInterface>;
    width: number;
    height: number;
    getFieldDisplayValues: (options: PopulatedGetFieldDisplayValuesOptions) => FieldDisplay[];
    fieldDisplayValues: FieldDisplay[];
    fieldReducers: Registry<FieldReducerInfo>;
  };
}
