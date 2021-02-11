import { getType } from 'utils/getType';

const enum Types {
  Null = 'Null',
  Undefined = 'Undefined',
  Boolean = 'Boolean',
  String = 'String',
  Number = 'Number',
  Array = 'Array',
  Object = 'Object',
}

describe('getType', () => {
  it('returns Null', () => {
    expect(getType(null)).toEqual(Types.Null);
  });
  it('returns Undefined', () => {
    expect(getType(undefined)).toEqual(Types.Undefined);
  });
  it('returns Boolean', () => {
    expect(getType(false)).toEqual(Types.Boolean);
    expect(getType(true)).toEqual(Types.Boolean);
  });
  it('returns String', () => {
    expect(getType('test')).toEqual(Types.String);
    expect(getType('10')).toEqual(Types.String);
    expect(getType('undefined')).toEqual(Types.String);
    expect(getType('null')).toEqual(Types.String);
  });
  it('returns Number', () => {
    expect(getType(0)).toEqual(Types.Number);
    expect(getType(1)).toEqual(Types.Number);
    expect(getType(1.5)).toEqual(Types.Number);
    expect(getType(1000)).toEqual(Types.Number);
    expect(getType(-1000)).toEqual(Types.Number);
    expect(getType(Infinity)).toEqual(Types.Number);
    expect(getType(-Infinity)).toEqual(Types.Number);
  });
  it('returns Array', () => {
    expect(getType([])).toEqual(Types.Array);
    expect(getType([1, 2, 3, 4])).toEqual(Types.Array);
    expect(getType(Array(5))).toEqual(Types.Array);
    expect(getType(Array(5).fill(null))).toEqual(Types.Array);
    expect(getType([{ a: 1 }])).toEqual(Types.Array);
  });
  it('returns Object', () => {
    expect(getType({})).toEqual(Types.Object);
    expect(getType({ a: 2 })).toEqual(Types.Object);
  });
});
