type EditorCodeType = string | undefined;
type EditorLanguageType = 'javascript' | 'html' | 'json' | undefined;
type setErrorStatusType = React.Dispatch<React.SetStateAction<boolean>>;

interface OptionsInterface {
  add100Percentage: boolean;
  centerAlignContent: boolean;
  SVGBaseFix: boolean;
  css: EditorCodeType;
  html: EditorCodeType;
  onRender: EditorCodeType;
  onInit: EditorCodeType;
  codeData: EditorCodeType;
}

export { EditorCodeType, EditorLanguageType, setErrorStatusType, OptionsInterface };
