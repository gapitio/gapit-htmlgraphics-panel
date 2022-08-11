import { GetFieldDisplayValuesOptions, ReduceDataOptions } from '@grafana/data';

export type EditorCodeType = string | undefined;

export const enum CalcsMutation {
  All = 'all',
  Standard = 'standard',
  Custom = 'custom',
  None = 'none',
}

export interface OptionsInterface {
  add100Percentage: boolean;
  centerAlignContent: boolean;
  overflow: 'visible' | 'auto' | 'overlay' | 'hidden';
  useGrafanaScrollbar: boolean;
  SVGBaseFix: boolean;
  rootCSS: EditorCodeType;
  css: EditorCodeType;
  html: EditorCodeType;
  renderOnMount: boolean;
  panelupdateOnMount: boolean;
  onRender: EditorCodeType;
  dynamicData: boolean;
  dynamicFieldDisplayValues: boolean;
  dynamicProps: boolean;
  dynamicHtmlGraphics: boolean;
  onInitOnResize: boolean;
  onInit: EditorCodeType;
  codeData: EditorCodeType;
  importedPanelOptions: EditorCodeType;
  reduceOptions: ReduceDataOptions;
  calcsMutation: CalcsMutation;
}

export interface HTMLNode extends ShadowRoot {
  /**
   * Triggers when new data is available (like onRender).
   */
  onpanelupdate: () => void;
  /**
   * Triggers when the panel will unmount [componentWillUnmount](https://reactjs.org/docs/react-component.html#componentwillunmount).
   */
  onpanelwillunmount: () => void;
}

export type JSONObject = {
  [key in string]: JSONValue;
};
export type JSONValue = string | number | boolean | null | JSONObject | JSONValue[];
export type JSONType = JSONObject | JSONValue[];

export interface PopulatedGetFieldDisplayValuesOptions {
  series?: GetFieldDisplayValuesOptions['data'];
  reduceOptions?: GetFieldDisplayValuesOptions['reduceOptions'];
  fieldConfig?: GetFieldDisplayValuesOptions['fieldConfig'];
  replaceVariables?: GetFieldDisplayValuesOptions['replaceVariables'];
  sparkline?: GetFieldDisplayValuesOptions['sparkline'];
  theme?: GetFieldDisplayValuesOptions['theme'];
  timeZone?: GetFieldDisplayValuesOptions['timeZone'];
}
