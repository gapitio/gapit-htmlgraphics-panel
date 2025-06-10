import { ReduceDataOptions } from '@grafana/data';

export type JSONObject = {
  [key in string]: JSONValue;
};
export type JSONValue = string | number | boolean | null | JSONObject | JSONValue[];
export type JSONType = JSONObject | JSONValue[];

export const enum CalcsMutation {
  All = 'all',
  Standard = 'standard',
  Custom = 'custom',
  None = 'none',
}

export const enum EditorLanguage {
  Javascript = 'javascript',
  Html = 'html',
  Json = 'json',
  Css = 'css',
}

export interface CodeEditorOptionSettings {
  language: EditorLanguage;
  htmlGraphicsDeclarationState?: {
    enabled: true;
    declarationsLoaded: boolean;
    handlingCustomPropertiesUpdate: boolean;
  };
}

export interface OptionsInterface {
  add100Percentage: boolean;
  centerAlignContent: boolean;
  overflow: 'visible' | 'auto' | 'overlay' | 'hidden';
  useGrafanaScrollbar: boolean;
  SVGBaseFix: boolean;
  rootCSS: string;
  css: string;
  html: string;
  renderOnMount: boolean;
  panelupdateOnMount: boolean;
  onRender: string;
  dynamicData: boolean;
  dynamicFieldDisplayValues: boolean;
  dynamicProps: boolean;
  dynamicHtmlGraphics: boolean;
  onInitOnResize: boolean;
  onInit: string;
  codeData: string;
  importedPanelOptions: string;
  reduceOptions: ReduceDataOptions;
  calcsMutation: CalcsMutation;
}

export interface ErrorObj {
  scope: string;
  isError: boolean;
  error?: unknown;
}

export interface HTMLNodeElement extends ShadowRoot {
  onpanelupdate: () => void;
  onpanelwillunmount: () => void;
}
