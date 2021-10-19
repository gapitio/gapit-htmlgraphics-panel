export default `
declare const htmlGraphics: {
  codeData: typeof codeData;
  customProperties: typeof customProperties;
  data: typeof data;
  getLocationSrv: typeof getLocationSrv;
  getTemplateSrv: typeof getTemplateSrv;
  htmlNode: typeof htmlNode;
  options: typeof options;
  theme: typeof theme;
  theme2: typeof theme2;
  props: PanelProps<OptionsInterface>;
  width: number;
  height: number;
  getFieldDisplayValues: (options: PopulatedGetFieldDisplayValuesOptions) => FieldDisplay[];
  fieldDisplayValues: FieldDisplay[];
  fieldReducers: Registry<FieldReducerInfo>;
};
`;
