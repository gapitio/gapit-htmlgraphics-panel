export default `
declare type InterpolateFunction = (value: string, scopedVars?: ScopedVars, format?: string | Function) => string;

interface FieldConfigSource<TOptions extends object = any> {
  defaults: FieldConfig<TOptions>;
  overrides: ConfigOverrideRule[];
}

interface AbsoluteTimeRange {
  from: number;
  to: number;
}

declare enum NullValueMode {
  Null = "null",
  Ignore = "connected",
  AsZero = "null as zero"
}

interface FieldConfig<TOptions extends object = any> {
  /**
   * The display value for this field.  This supports template variables blank is auto
   */
  displayName?: string;
  /**
   * This can be used by data sources that return and explicit naming structure for values and labels
   * When this property is configured, this value is used rather than the default naming strategy.
   */
  displayNameFromDS?: string;
  /**
   * Human readable field metadata
   */
  description?: string;
  /**
   * An explict path to the field in the datasource
   *
   * When defined, this value can be used as an identifier within the datasource scope, and
   * may be used to update the results
   */
  path?: string;
  /**
   * True if data source can write a value to the path.  Auth/authz are supported separately
   */
  writeable?: boolean;
  /**
   * True if data source field supports ad-hoc filters
   */
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

interface PanelProps<T = any> {
  /** ID of the panel within the current dashboard */
  id: number;
  /** Result set of panel queries */
  data: PanelData;
  /** Time range of the current dashboard */
  timeRange: TimeRange;
  /** Time zone of the current dashboard */
  timeZone: TimeZone;
  /** Panel options */
  options: T;
  /** Indicates whether or not panel should be rendered transparent */
  transparent: boolean;
  /** Current width of the panel */
  width: number;
  /** Current height of the panel */
  height: number;
  /** Field options configuration */
  fieldConfig: FieldConfigSource;
  /** @internal */
  renderCounter: number;
  /** Panel title */
  title: string;
  /** EventBus  */
  eventBus: EventBus;
  /** Panel options change handler */
  onOptionsChange: (options: T) => void;
  /** Field config change handler */
  onFieldConfigChange: (config: FieldConfigSource) => void;
  /** Template variables interpolation function */
  replaceVariables: InterpolateFunction;
  /** Time range change handler */
  onChangeTimeRange: (timeRange: AbsoluteTimeRange) => void;
}
`;
