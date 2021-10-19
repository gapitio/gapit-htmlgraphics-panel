export default `
declare abstract class FunctionalVector<T = any> implements Vector<T>, Iterable<T> {
  abstract get length(): number;
  abstract get(index: number): T;
  iterator(): Generator<T, void, unknown>;
  [Symbol.iterator](): Generator<T, void, unknown>;
  forEach(iterator: (row: T) => void): void;
  map<V>(transform: (item: T, index: number) => V): V[];
  filter(predicate: (item: T) => boolean): T[];
  toArray(): T[];
  toJSON(): any;
}

declare class DataFrameView<T = any> extends FunctionalVector<T> {
  private data;
  private index;
  private obj;
  constructor(data: DataFrame);
  get dataFrame(): DataFrame;
  get length(): number;
  /**
   * Helper function to return the {@link DisplayProcessor} for a given field column.
   * @param colIndex - the field column index for the data frame.
   */
  getFieldDisplayProcessor(colIndex: number): DisplayProcessor | undefined;
  /**
   * The contents of the object returned from this function
   * are optimized for use in a loop. All calls return the same object
   * but the index has changed.
   *
   * @example
   * \`\`\`typescript
   *   // \`first\`, \`second\` and \`third\` will all point to the same contents at index 2:
   *   const first = view.get(0);
   *   const second = view.get(1);
   *   const third = view.get(2);
   *
   *   // If you need three different objects, consider something like:
   *   const first = { ...view.get(0) };
   *   const second = { ...view.get(1) };
   *   const third = { ...view.get(2) };
   * \`\`\`
   * @param idx - The index of the object you currently are inspecting
   */
  get(idx: number): T;
  toArray(): T[];
}

interface MatcherConfig<TOptions = any> {
  id: string;
  options?: TOptions;
}
interface DynamicConfigValue {
  id: string;
  value?: any;
}
interface ConfigOverrideRule {
  matcher: MatcherConfig;
  properties: DynamicConfigValue[];
}

interface ReduceDataOptions {
  values?: boolean;
  /** if showing all values limit */
  limit?: number;
  /** When !values, pick one value for the whole field */
  calcs: string[];
  /** Which fields to show.  By default this is only numeric fields */
  fields?: string;
}

/**
 * Options for how to turn DataFrames into an array of display values
 */
interface ReduceDataOptions {
  values?: boolean;
  /** if showing all values limit */
  limit?: number;
  /** When !values, pick one value for the whole field */
  calcs: string[];
  /** Which fields to show.  By default this is only numeric fields */
  fields?: string;
}
interface FieldSparkline {
  y: Field;
  x?: Field;
  timeRange?: TimeRange;
  highlightIndex?: number;
}
interface FieldDisplay {
  name: string;
  field: FieldConfig;
  display: DisplayValue;
  sparkline?: FieldSparkline;
  view?: DataFrameView;
  colIndex?: number;
  rowIndex?: number;
  getLinks?: () => LinkModel[];
  hasLinks: boolean;
}
interface GetFieldDisplayValuesOptions {
  data?: DataFrame[];
  reduceOptions: ReduceDataOptions;
  fieldConfig: FieldConfigSource;
  replaceVariables: InterpolateFunction;
  sparkline?: boolean;
  theme: GrafanaTheme2;
  timeZone?: TimeZone;
}
interface PopulatedGetFieldDisplayValuesOptions {
  series?: GetFieldDisplayValuesOptions['data'];
  reduceOptions?: GetFieldDisplayValuesOptions['reduceOptions'];
  fieldConfig?: GetFieldDisplayValuesOptions['fieldConfig'];
  replaceVariables?: GetFieldDisplayValuesOptions['replaceVariables'];
  sparkline?: GetFieldDisplayValuesOptions['sparkline'];
  theme?: GetFieldDisplayValuesOptions['theme'];
  timeZone?: GetFieldDisplayValuesOptions['timeZone'];
}
`;
