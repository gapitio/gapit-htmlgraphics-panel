export default `
const enum CalcsMutation {
  All = 'all',
  Standard = 'standard',
  Custom = 'custom',
  None = 'none',
}

type EditorCodeType = string | undefined;

interface OptionsInterface {
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

/**
 * The panel options set.
 */
declare const options: OptionsInterface;
`;
