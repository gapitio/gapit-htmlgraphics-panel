export default `
declare enum MappingType {
  ValueToText = 1,
  RangeToText = 2,
}
interface BaseMap {
  id: number;
  text: string;
  type: MappingType;
}
declare type ValueMapping = ValueMap | RangeMap;
interface ValueMap extends BaseMap {
  value: string;
}
interface RangeMap extends BaseMap {
  from: string;
  to: string;
}
`;
