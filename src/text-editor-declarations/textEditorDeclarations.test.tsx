import textEditorDeclarations from './';

describe('Text editor declarations', () => {
  it('is a valid string', () => {
    expect(textEditorDeclarations).toEqual(expect.any(String));
  });
  describe('Contains the needed declarations', () => {
    it('contains htmlNode', () => {
      expect(textEditorDeclarations).toEqual(expect.stringContaining('declare const htmlNode'));
      expect(textEditorDeclarations).toEqual(expect.stringContaining('declare const data'));
      expect(textEditorDeclarations).toEqual(expect.stringContaining('declare const codeData'));
      expect(textEditorDeclarations).toEqual(expect.stringContaining('declare const options'));
      expect(textEditorDeclarations).toEqual(expect.stringContaining('declare const theme'));
      expect(textEditorDeclarations).toEqual(expect.stringContaining('declare const getTemplateSrv'));
      expect(textEditorDeclarations).toEqual(expect.stringContaining('declare function getLocationSrv'));
    });
  });
});
