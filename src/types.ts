type EditorCodeType = string | undefined;
type EditorLanguageType = 'javascript' | 'html' | 'json' | undefined;
type setErrorStatusType = React.Dispatch<React.SetStateAction<boolean>>;

interface OptionsInterface {
  add100Percentage: boolean;
  centerAlignContent: boolean;
  overflow: 'Visible' | 'Auto' | 'Overlay' | 'Hidden';
  SVGBaseFix: boolean;
  css: EditorCodeType;
  html: EditorCodeType;
  onRender: EditorCodeType;
  onInit: EditorCodeType;
  codeData: EditorCodeType;
  importedPanelOptions: EditorCodeType;
}

export { EditorCodeType, EditorLanguageType, setErrorStatusType, OptionsInterface };
