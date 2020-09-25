import valueMapping from './valueMapping';
import thresholds from './thresholds';
import fieldColor from './fieldColor';

export default `
interface QueryResultBase {
  /**
   * Matches the query target refId
   */
  refId?: string;
  /**
   * Used by some backend data sources to communicate back info about the execution (generated sql, timing)
   */
  meta?: {[key: string]: any};
}

declare enum FieldType {
  time = "time",
  number = "number",
  string = "string",
  boolean = "boolean",
  trace = "trace",
  other = "other"
}

declare enum NullValueMode {
  Null = "null",
  Ignore = "connected",
  AsZero = "null as zero"
}

interface DataLink<T extends DataQuery = any> {
  title: string;
  targetBlank?: boolean;
  url: string;
  onBuildUrl?: (event: DataLinkClickEvent) => string;
  onClick?: (event: DataLinkClickEvent) => void;
  internal?: {
      query: T;
      datasourceUid: string;
  };
}

interface FieldConfig<TOptions extends object = any> {
  displayName?: string;
  filterable?: boolean;
  unit?: string;
  decimals?: number | null;
  min?: number | null;
  max?: number | null;
  mappings?: ValueMapping[];
  thresholds?: ThresholdsConfig;
  color?: FieldColor;
  nullValueMode?: NullValueMode;
  links?: DataLink[];
  noValue?: string;
  custom?: TOptions;
}

interface FieldCalcs extends Record<string, any> {}

interface FieldState {
  /**
   * An appropriate name for the field (does not include frame info)
   */
  displayName?: string | null;
  /**
   * Cache of reduced values
   */
  calcs?: FieldCalcs;
  /**
   * Appropriate values for templating
   */
  scopedVars?: ScopedVars;
}

interface FormattedValue {
  text: string;
  prefix?: string;
  suffix?: string;
}

interface DisplayValue extends FormattedValue {
  /**
   *  Use isNaN to check if it is a real number
   */
  numeric: number;
  /**
   *  0-1 between min & max
   */
  percent?: number;
  /**
   *  Color based on configs or Threshold
   */
  color?: string;
  title?: string;
}

declare type DisplayProcessor = (value: any) => DisplayValue;

interface ValueLinkConfig {
  /**
   * Result of field reduction
   */
  calculatedValue?: DisplayValue;
  /**
   * Index of the value row within Field. Should be provided only when value is not a result of a reduction
   */
  valueRowIndex?: number;
}

declare type LinkTarget = '_blank' | '_self' | undefined;

/**
 * Processed Link Model. The values are ready to use
 */
interface LinkModel<T = any> {
    href: string;
    title: string;
    target: LinkTarget;
    origin: T;
    onClick?: (e: any) => void;
}

interface Field<T = any, V = Vector<T>> {
  /**
   * Name of the field (column)
   */
  name: string;
  /**
   *  Field value type (string, number, etc)
   */
  type: FieldType;
  /**
   *  Meta info about how field and how to display it
   */
  config: FieldConfig;
  values: V;
  labels?: [key: string]: string;
  /**
   * Cached values with appropriate display and id values
   */
  state?: FieldState | null;
  /**
   * Convert text to the field value
   */
  parse?: (value: any) => T;
  /**
   * Convert a value for display
   */
  display?: DisplayProcessor;
  /**
   * Get value data links with variables interpolated
   */
  getLinks?: (config: ValueLinkConfig) => Array<LinkModel<Field>>;
}

interface DataFrame extends QueryResultBase {
  name?: string;
  fields: Field[];
  length: number;
}
` +
  valueMapping +
  thresholds +
  fieldColor;
