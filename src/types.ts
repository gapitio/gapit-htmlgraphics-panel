import { ReduceDataOptions } from '@grafana/data';

export const enum CalcsMutation {
  All = 'all',
  Standard = 'standard',
  Custom = 'custom',
  None = 'none',
}

export type EditorCodeType = string | undefined;
export type EditorLanguageType = 'javascript' | 'html' | 'json' | undefined;
export type setErrorStatusType = React.Dispatch<React.SetStateAction<boolean>>;

export interface OptionsInterface {
  add100Percentage: boolean;
  centerAlignContent: boolean;
  overflow: 'Visible' | 'Auto' | 'Overlay' | 'Hidden';
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
  onInit: EditorCodeType;
  codeData: EditorCodeType;
  importedPanelOptions: EditorCodeType;
  reduceOptions: ReduceDataOptions;
  calcsMutation: CalcsMutation;
}
