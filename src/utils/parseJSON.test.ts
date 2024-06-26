import { parseJSON } from 'utils/parseJSON';

describe('parseJSON', () => {
  describe('dummy dict', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
      jest.spyOn(console, 'error').mockRestore();
    });

    const DUMMY_DICT = {
      number: 1,
      string: 'test',
      array: [1, 2, 3],
      object: { test: 100 },
    };

    const dummyJSON = JSON.stringify(DUMMY_DICT);
    const { json, isError } = parseJSON(dummyJSON);

    it('returns parsed json', () => {
      expect({ json, isError }).toEqual({ json: DUMMY_DICT, isError: false });
    });

    it('does not log when the json can be parsed', () => {
      parseJSON(dummyJSON);
      expect(console.error).not.toHaveBeenCalled();
    });
  });

  describe('unparsable input', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
      jest.spyOn(console, 'error').mockRestore();
    });

    it('returns null and error on unparsable input', () => {
      {
        const { json, isError, error } = parseJSON('{');
        expect({ json, isError }).toEqual({ json: null, isError: true });
        expect(error).toBeInstanceOf(SyntaxError);
      }
      {
        const { json, isError, error } = parseJSON('.');
        expect({ json, isError }).toEqual({ json: null, isError: true });
        expect(error).toBeInstanceOf(SyntaxError);
      }
      {
        const { json, isError, error } = parseJSON('{a = 2}');
        expect({ json, isError }).toEqual({ json: null, isError: true });
        expect(error).toBeInstanceOf(SyntaxError);
      }
    });

    it('logs error when there is unparsable input', () => {
      parseJSON('{');

      expect(console.error).toHaveBeenCalledTimes(1);
    });
  });

  describe('empty input', () => {
    it('returns null and not error on empty input', () => {
      expect(parseJSON('')).toEqual({ json: null, isError: false });
    });
  });

  describe('logOptions', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
      jest.spyOn(console, 'error').mockRestore();
    });

    it('default logs error', () => {
      parseJSON('{');
      expect(console.error).toHaveBeenCalled();
    });

    it('does not log error when logError is false', () => {
      parseJSON('{', { logError: false });

      expect(console.error).not.toHaveBeenCalled();
    });
  });
});
