export interface DateTimeBuiltinFormat {
  __momentBuiltinFormatBrand: any;
}
export declare const ISO_8601: DateTimeBuiltinFormat;
export declare type DateTimeInput = Date | string | number | Array<string | number> | DateTime | null;
export declare type FormatInput = string | DateTimeBuiltinFormat | undefined;
export declare type DurationInput = string | number | DateTimeDuration;
export declare type DurationUnit =
  | 'year'
  | 'years'
  | 'y'
  | 'month'
  | 'months'
  | 'M'
  | 'week'
  | 'weeks'
  | 'isoWeek'
  | 'w'
  | 'day'
  | 'days'
  | 'd'
  | 'hour'
  | 'hours'
  | 'h'
  | 'minute'
  | 'minutes'
  | 'm'
  | 'second'
  | 'seconds'
  | 's'
  | 'millisecond'
  | 'milliseconds'
  | 'ms'
  | 'quarter'
  | 'quarters'
  | 'Q';
export interface DateTimeLocale {
  firstDayOfWeek: () => number;
}
export interface DateTimeDuration {
  asHours: () => number;
  hours: () => number;
  minutes: () => number;
  seconds: () => number;
  asSeconds: () => number;
}
export interface DateTime extends Object {
  add: (amount?: DateTimeInput, unit?: DurationUnit) => DateTime;
  set: (unit: DurationUnit, amount: DateTimeInput) => void;
  diff: (amount: DateTimeInput, unit?: DurationUnit, truncate?: boolean) => number;
  endOf: (unitOfTime: DurationUnit) => DateTime;
  format: (formatInput?: FormatInput) => string;
  fromNow: (withoutSuffix?: boolean) => string;
  from: (formaInput: DateTimeInput) => string;
  isSame: (input?: DateTimeInput, granularity?: DurationUnit) => boolean;
  isBefore: (input?: DateTimeInput) => boolean;
  isValid: () => boolean;
  local: () => DateTime;
  locale: (locale: string) => DateTime;
  startOf: (unitOfTime: DurationUnit) => DateTime;
  subtract: (amount?: DateTimeInput, unit?: DurationUnit) => DateTime;
  toDate: () => Date;
  toISOString: () => string;
  isoWeekday: (day?: number | string) => number | string;
  valueOf: () => number;
  unix: () => number;
  utc: () => DateTime;
  utcOffset: () => number;
  hour?: () => number;
  minute?: () => number;
}

/**
 * Type to represent the value of a single query variable.
 *
 * @public
 */
declare type UrlQueryValue = string | number | boolean | string[] | number[] | boolean[] | undefined | null;
/**
 * Type to represent the values parsed from the query string.
 *
 * @public
 */
export declare type UrlQueryMap = Record<string, UrlQueryValue>;

export interface ScopedVar<T = any> {
  text: any;
  value: T;
  [key: string]: any;
}
export interface ScopedVars extends Record<string, ScopedVar> {}

export declare type VariableType =
  | 'query'
  | 'adhoc'
  | 'constant'
  | 'datasource'
  | 'interval'
  | 'textbox'
  | 'custom'
  | 'system';
export interface VariableModel {
  type: VariableType;
  name: string;
  label?: string;
}

export interface RawTimeRange {
  from: DateTime | string;
  to: DateTime | string;
}
export interface TimeRange {
  from: DateTime;
  to: DateTime;
  raw: RawTimeRange;
}
/**
 * Type to describe relative time to now in seconds.
 * @internal
 */
export interface RelativeTimeRange {
  from: number;
  to: number;
}
export interface AbsoluteTimeRange {
  from: number;
  to: number;
}
export interface IntervalValues {
  interval: string;
  intervalMs: number;
}
export declare type TimeZoneUtc = 'utc';
export declare type TimeZoneBrowser = 'browser';
export declare type TimeZone = TimeZoneBrowser | TimeZoneUtc | string;
export declare const DefaultTimeZone: TimeZone;
export interface TimeOption {
  from: string;
  to: string;
  display: string;
}
export interface TimeOptions {
  [key: string]: TimeOption[];
}
export declare type TimeFragment = string | DateTime;
export declare const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export declare function getDefaultTimeRange(): TimeRange;
/**
 * Returns the default realtive time range.
 *
 * @public
 */
export declare function getDefaultRelativeTimeRange(): RelativeTimeRange;

export interface Threshold {
  value: number;
  color: string;
  /**
   *  Warning, Error, LowLow, Low, OK, High, HighHigh etc
   */
  state?: string;
}
/**
 *  Display mode
 */
export declare enum ThresholdsMode {
  Absolute = 'absolute',
  /**
   *  between 0 and 1 (based on min/max)
   */
  Percentage = 'percentage',
}
/**
 *  Config that is passed to the ThresholdsEditor
 */
export interface ThresholdsConfig {
  mode: ThresholdsMode;
  /**
   *  Must be sorted by 'value', first value is always -Infinity
   */
  steps: Threshold[];
}

/**
 * @public
 */
export declare enum FieldColorModeId {
  Thresholds = 'thresholds',
  PaletteClassic = 'palette-classic',
  PaletteSaturated = 'palette-saturated',
  ContinuousGrYlRd = 'continuous-GrYlRd',
  Fixed = 'fixed',
}
/**
 * @public
 */
export interface FieldColor {
  /** The main color scheme mode */
  mode: FieldColorModeId | string;
  /** Stores the fixed color value if mode is fixed */
  fixedColor?: string;
  /** Some visualizations need to know how to assign a series color from by value color schemes */
  seriesBy?: FieldColorSeriesByMode;
}
/**
 * @beta
 */
export declare type FieldColorSeriesByMode = 'min' | 'max' | 'last';

export declare enum NullValueMode {
  Null = 'null',
  Ignore = 'connected',
  AsZero = 'null as zero',
}

/**
 * Attached to query results (not persisted)
 *
 * @public
 */
export declare enum DataTopic {
  Annotations = 'annotations',
}
/**
 * @public
 */
export interface DataSourceRef {
  /** The plugin type-id */
  type?: string;
  /** Specific datasource instance */
  uid?: string;
}
/**
 * These are the common properties available to all queries in all datasources
 * Specific implementations will *extend* this interface adding the required properties
 * for the given context
 *
 * @public
 */
export interface DataQuery {
  /**
   * A - Z
   */
  refId: string;
  /**
   * true if query is disabled (ie should not be returned to the dashboard)
   */
  hide?: boolean;
  /**
   * Unique, guid like, string used in explore mode
   */
  key?: string;
  /**
   * Specify the query flavor
   */
  queryType?: string;
  /**
   * For mixed data sources the selected datasource is on the query level.
   * For non mixed scenarios this is undefined.
   */
  datasource?: DataSourceRef | null;
}

export interface ExplorePanelsState extends Partial<Record<PreferredVisualisationType, {}>> {
  trace?: ExploreTracePanelState;
}
export interface ExploreTracePanelState {
  spanId?: string;
}

/**
 * Callback info for DataLink click events
 */
export interface DataLinkClickEvent<T = any> {
  origin: T;
  replaceVariables: InterpolateFunction | undefined;
  e?: any;
}
/**
 * Link configuration. The values may contain variables that need to be
 * processed before showing the link to user.
 *
 * TODO: <T extends DataQuery> is not strictly true for internal links as we do not need refId for example but all
 *  data source defined queries extend this so this is more for documentation.
 */
export interface DataLink<T extends DataQuery = any> {
  title: string;
  targetBlank?: boolean;
  url: string;
  onBuildUrl?: (event: DataLinkClickEvent) => string;
  onClick?: (event: DataLinkClickEvent) => void;
  internal?: InternalDataLink<T>;
}
/** @internal */
export interface InternalDataLink<T extends DataQuery = any> {
  query: T;
  datasourceUid: string;
  datasourceName: string;
  panelsState?: ExplorePanelsState;
}
export declare type LinkTarget = '_blank' | '_self' | undefined;
/**
 * Processed Link Model. The values are ready to use
 */
export interface LinkModel<T = any> {
  href: string;
  title: string;
  target: LinkTarget;
  origin: T;
  onClick?: (e: any, origin?: any) => void;
}

export interface FormattedValue {
  text: string;
  prefix?: string;
  suffix?: string;
}

export declare type DisplayProcessor = (value: any) => DisplayValue;
export interface DisplayValue extends FormattedValue {
  /**
   *  Use isNaN to check if it is a real number
   */
  numeric: number;
  /**
   *  0-1 between min & max
   */
  percent?: number;
  /**
   *  Color based on mappings or threshold
   */
  color?: string;
  /**
   *  Icon based on mappings or threshold
   */
  icon?: string;
  title?: string;
  /**
   * Used in limited scenarios like legend reducer calculations
   */
  description?: string;
}
/**
 * These represents the display value with the longest title and text.
 * Used to align widths and heights when displaying multiple DisplayValues
 */
export interface DisplayValueAlignmentFactors extends FormattedValue {
  title: string;
}
export declare type DecimalCount = number | null | undefined;
export interface DecimalInfo {
  decimals: DecimalCount;
  scaledDecimals: DecimalCount;
}

export interface Vector<T = any> {
  length: number;
  /**
   * Access the value by index (Like an array)
   */
  get(index: number): T;
  /**
   * Get the results as an array.
   */
  toArray(): T[];
}

/** @public */
export declare abstract class FunctionalVector<T = any> implements Vector<T>, Iterable<T> {
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

/**
 * This abstraction will present the contents of a DataFrame as if
 * it were a well typed javascript object Vector.
 *
 * @remarks
 * The {@link DataFrameView.get} is optimized for use in a loop and will return same object.
 * See function for more details.
 *
 * @typeParam T - Type of object stored in the DataFrame.
 * @beta
 */
export declare class DataFrameView<T = any> extends FunctionalVector<T> {
  private data;
  private index;
  private obj;
  readonly fields: {
    readonly [Property in keyof T]: Field<T[Property]>;
  };
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
   * ```typescript
   *   // `first`, `second` and `third` will all point to the same contents at index 2:
   *   const first = view.get(0);
   *   const second = view.get(1);
   *   const third = view.get(2);
   *
   *   // If you need three different objects, consider something like:
   *   const first = { ...view.get(0) };
   *   const second = { ...view.get(1) };
   *   const third = { ...view.get(2) };
   * ```
   * @param idx - The index of the object you currently are inspecting
   */
  get(idx: number): T;
  toArray(): T[];
}

/** Describes plugins life cycle status */
export declare enum PluginState {
  alpha = 'alpha',
  beta = 'beta',
  stable = 'stable',
  deprecated = 'deprecated',
}

export declare enum ReducerID {
  sum = 'sum',
  max = 'max',
  min = 'min',
  logmin = 'logmin',
  mean = 'mean',
  last = 'last',
  first = 'first',
  count = 'count',
  range = 'range',
  diff = 'diff',
  diffperc = 'diffperc',
  delta = 'delta',
  step = 'step',
  firstNotNull = 'firstNotNull',
  lastNotNull = 'lastNotNull',
  changeCount = 'changeCount',
  distinctCount = 'distinctCount',
  allIsZero = 'allIsZero',
  allIsNull = 'allIsNull',
  allValues = 'allValues',
  uniqueValues = 'uniqueValues',
}
declare type FieldReducer = (field: Field, ignoreNulls: boolean, nullAsZero: boolean) => FieldCalcs;
export interface FieldReducerInfo extends RegistryItem {
  emptyInputResult?: any;
  standard: boolean;
  reduce?: FieldReducer;
}

/**
 * @internal
 */
export declare enum AlertState {
  NoData = 'no_data',
  Paused = 'paused',
  Alerting = 'alerting',
  OK = 'ok',
  Pending = 'pending',
  Unknown = 'unknown',
}
/**
 * @internal
 */
export interface AlertStateInfo {
  id: number;
  dashboardId: number;
  panelId: number;
  state: AlertState;
}

/**
 * @public
 * The app container that is loading another plugin (panel or query editor)
 * */
export declare enum CoreApp {
  CloudAlerting = 'cloud-alerting',
  UnifiedAlerting = 'unified-alerting',
  Dashboard = 'dashboard',
  Explore = 'explore',
  Unknown = 'unknown',
  PanelEditor = 'panel-editor',
  PanelViewer = 'panel-viewer',
}

export declare enum DataQueryErrorType {
  Cancelled = 'cancelled',
  Timeout = 'timeout',
  Unknown = 'unknown',
}
export interface DataQueryError {
  data?: {
    /**
     * Short information about the error
     */
    message?: string;
    /**
     * Detailed information about the error. Only returned when app_mode is development.
     */
    error?: string;
  };
  message?: string;
  status?: number;
  statusText?: string;
  refId?: string;
  type?: DataQueryErrorType;
}
export interface DataQueryRequest<TQuery extends DataQuery = DataQuery> {
  requestId: string;
  interval: string;
  intervalMs: number;
  maxDataPoints?: number;
  range: TimeRange;
  scopedVars: ScopedVars;
  targets: TQuery[];
  timezone: string;
  app: CoreApp | string;
  cacheTimeout?: string | null;
  rangeRaw?: RawTimeRange;
  timeInfo?: string;
  panelId?: number;
  dashboardId?: number;
  startTime: number;
  endTime?: number;
  liveStreaming?: boolean;
}
export interface DataQueryTimings {
  dataProcessingTime: number;
}

export interface MatcherConfig<TOptions = any> {
  id: string;
  options?: TOptions;
}

export interface DynamicConfigValue {
  id: string;
  value?: any;
}
export interface ConfigOverrideRule {
  matcher: MatcherConfig;
  properties: DynamicConfigValue[];
}
export interface FieldConfigSource<TOptions = any> {
  defaults: FieldConfig<TOptions>;
  overrides: ConfigOverrideRule[];
}

export interface Unsubscribable {
  unsubscribe(): void;
}

/**
 * A representation of any set of values over any amount of time. This is the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
export type Observable<T> = any;

/**
 * @alpha
 * internal interface
 */
export interface BusEvent {
  readonly type: string;
  readonly payload?: any;
  readonly origin?: EventBus;
}
/**
 * @alpha
 * Base event type
 */
export declare abstract class BusEventBase implements BusEvent {
  readonly type: string;
  readonly payload?: any;
  readonly origin?: EventBus;
  constructor();
}
/**
 * @alpha
 * Base event type with payload
 */
export declare abstract class BusEventWithPayload<T> extends BusEventBase {
  readonly payload: T;
  constructor(payload: T);
}
export interface BusEventType<T extends BusEvent> {
  type: string;
  new (...args: any[]): T;
}
/**
 * @alpha
 * Event callback/handler type
 */
export interface BusEventHandler<T extends BusEvent> {
  (event: T): void;
}
/**
 * @alpha
 * Main minimal interface
 */
export interface EventFilterOptions {
  onlyLocal: boolean;
}
/**
 * @alpha
 * Main minimal interface
 */
export interface EventBus {
  /**
   * Publish single vent
   */
  publish<T extends BusEvent>(event: T): void;
  /**
   * Get observable of events
   */
  getStream<T extends BusEvent>(eventType: BusEventType<T>): Observable<T>;
  /**
   * Subscribe to an event stream
   *
   * This function is a wrapper around the `getStream(...)` function
   */
  subscribe<T extends BusEvent>(eventType: BusEventType<T>, handler: BusEventHandler<T>): Unsubscribable;
  /**
   * Remove all event subscriptions
   */
  removeAllListeners(): void;
  /**
   * Returns a new bus scoped that knows where it exists in a heiarchy
   *
   * @internal -- This is included for internal use only should not be used directly
   */
  newScopedBus(key: string, filter: EventFilterOptions): EventBus;
}

/**
 * Used in select elements
 */
export interface SelectableValue<T = any> {
  label?: string;
  ariaLabel?: string;
  value?: T;
  imgUrl?: string;
  icon?: string;
  description?: string;
  title?: string;
  component?: React.ComponentType<any>;
  [key: string]: any;
}

export interface RegistryItem {
  id: string;
  name: string;
  description?: string;
  aliasIds?: string[];
  /**
   * Some extensions should not be user selectable
   *  like: 'all' and 'any' matchers;
   */
  excludeFromPicker?: boolean;
  /**
   * Optional feature state
   */
  state?: PluginState;
}
export interface RegistryItemWithOptions<TOptions = any> extends RegistryItem {
  /**
   * Convert the options to a string
   */
  getOptionsDisplayText?: (options: TOptions) => string;
  /**
   * Default options used if nothing else is specified
   */
  defaultOptions?: TOptions;
}
interface RegistrySelectInfo {
  options: Array<SelectableValue<string>>;
  current: Array<SelectableValue<string>>;
}
export declare class Registry<T extends RegistryItem> {
  private init?;
  private ordered;
  private byId;
  private initialized;
  constructor(init?: (() => T[]) | undefined);
  setInit: (init: () => T[]) => void;
  getIfExists(id: string | undefined): T | undefined;
  private initialize;
  get(id: string): T;
  selectOptions(current?: string[], filter?: (ext: T) => boolean): RegistrySelectInfo;
  /**
   * Return a list of values by ID, or all values if not specified
   */
  list(ids?: any[]): T[];
  isEmpty(): boolean;
  register(ext: T): void;
  private sort;
}

/**
 * @alpha
 */
export declare enum MappingType {
  ValueToText = 'value',
  RangeToText = 'range',
  RegexToText = 'regex',
  SpecialValue = 'special',
}
/**
 * @alpha
 */
export interface ValueMappingResult {
  text?: string;
  color?: string;
  icon?: string;
  index?: number;
}
/**
 * @alpha
 */
interface BaseValueMap<T> {
  type: MappingType;
  options: T;
}
/**
 * @alpha
 */
export interface ValueMap extends BaseValueMap<Record<string, ValueMappingResult>> {
  type: MappingType.ValueToText;
}
/**
 * @alpha
 */
export interface RangeMapOptions {
  from: number | null;
  to: number | null;
  result: ValueMappingResult;
}
/**
 * @alpha
 */
export interface RangeMap extends BaseValueMap<RangeMapOptions> {
  type: MappingType.RangeToText;
}
/**
 * @alpha
 */
export interface RegexMapOptions {
  pattern: string;
  result: ValueMappingResult;
}
/**
 * @alpha
 */
export interface RegexMap extends BaseValueMap<RegexMapOptions> {
  type: MappingType.RegexToText;
}
/**
 * @alpha
 */
export interface SpecialValueOptions {
  match: SpecialValueMatch;
  result: ValueMappingResult;
}
/**
 * @alpha
 */
export declare enum SpecialValueMatch {
  True = 'true',
  False = 'false',
  Null = 'null',
  NaN = 'nan',
  NullAndNaN = 'null+nan',
  Empty = 'empty',
}
/**
 * @alpha
 */
export interface SpecialValueMap extends BaseValueMap<SpecialValueOptions> {
  type: MappingType.SpecialValue;
}
/**
 * @alpha
 */
export declare type ValueMapping = ValueMap | RangeMap | RegexMap | SpecialValueMap;

export interface ReduceDataOptions {
  values?: boolean;
  /** if showing all values limit */
  limit?: number;
  /** When !values, pick one value for the whole field */
  calcs: string[];
  /** Which fields to show.  By default this is only numeric fields */
  fields?: string;
}

export interface FieldSparkline {
  y: Field;
  x?: Field;
  timeRange?: TimeRange;
  highlightIndex?: number;
}

export interface FieldDisplay {
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

export declare type InterpolateFunction = (
  value: string,
  scopedVars?: ScopedVars,
  format?: string | Function
) => string;

export interface PanelData {
  /** State of the data (loading, done, error, streaming) */
  state: LoadingState;
  /** Contains data frames with field overrides applied */
  series: DataFrame[];
  /**
   * This is a key that will change when the DataFrame[] structure changes.
   * The revision is a useful way to know if only data has changed or data+structure
   */
  structureRev?: number;
  /** A list of annotation items */
  annotations?: DataFrame[];
  /**
   * @internal
   */
  alertState?: AlertStateInfo;
  /** Request contains the queries and properties sent to the datasource */
  request?: DataQueryRequest;
  /** Timing measurements */
  timings?: DataQueryTimings;
  /** Any query errors */
  error?: DataQueryError;
  /** Contains the range from the request or a shifted time range if a request uses relative time */
  timeRange: TimeRange;
}
export interface PanelProps<T = any> {
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

/** @public */
export declare enum FieldType {
  time = 'time',
  number = 'number',
  string = 'string',
  boolean = 'boolean',
  trace = 'trace',
  geo = 'geo',
  other = 'other',
}
/**
 * @public
 * Every property is optional
 *
 * Plugins may extend this with additional properties. Something like series overrides
 */
export interface FieldConfig<TOptions = any> {
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
   * An explict path to the field in the datasource.  When the frame meta includes a path,
   * This will default to `${frame.meta.path}/${field.name}
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
  interval?: number | null;
  mappings?: ValueMapping[];
  thresholds?: ThresholdsConfig;
  color?: FieldColor;
  nullValueMode?: NullValueMode;
  links?: DataLink[];
  noValue?: string;
  custom?: TOptions;
}
/** @public */
export interface ValueLinkConfig {
  /**
   * Result of field reduction
   */
  calculatedValue?: DisplayValue;
  /**
   * Index of the value row within Field. Should be provided only when value is not a result of a reduction
   */
  valueRowIndex?: number;
}
export interface Field<T = any, V = Vector<T>> {
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
  labels?: Labels;
  /**
   * Cached values with appropriate display and id values
   */
  state?: FieldState | null;
  /**
   * Convert a value for display
   */
  display?: DisplayProcessor;
  /**
   * Get value data links with variables interpolated
   */
  getLinks?: (config: ValueLinkConfig) => Array<LinkModel<Field>>;
}
/** @alpha */
export interface FieldState {
  /**
   * An appropriate name for the field (does not include frame info)
   */
  displayName?: string | null;
  /**
   * Cache of reduced values
   */
  calcs?: FieldCalcs;
  /**
   * The numeric range for values in this field.  This value will respect the min/max
   * set in field config, or when set to `auto` this will have the min/max for all data
   * in the response
   */
  range?: NumericRange;
  /**
   * Appropriate values for templating
   */
  scopedVars?: ScopedVars;
  /**
   * Series index is index for this field in a larger data set that can span multiple DataFrames
   * Useful for assigning color to series by looking up a color in a palette using this index
   */
  seriesIndex?: number;
  /**
   * Location of this field within the context frames results
   *
   * @internal -- we will try to make this unnecessary
   */
  origin?: DataFrameFieldIndex;
  /**
   * Boolean value is true if field is in a larger data set with multiple frames.
   * This is only related to the cached displayName property above.
   */
  multipleFrames?: boolean;
  /**
   * Boolean value is true if a null filling threshold has been applied
   * against the frame of the field. This is used to avoid cases in which
   * this would applied more than one time.
   */
  nullThresholdApplied?: boolean;
}
/** @public */
export interface NumericRange {
  min?: number | null;
  max?: number | null;
  delta: number;
}
export interface DataFrame extends QueryResultBase {
  name?: string;
  fields: Field[];
  length: number;
}
/**
 * @public
 * Like a field, but properties are optional and values may be a simple array
 */
export interface FieldDTO<T = any> {
  name: string;
  type?: FieldType;
  config?: FieldConfig;
  values?: Vector<T> | T[];
  labels?: Labels;
}
/**
 * @public
 * Like a DataFrame, but fields may be a FieldDTO
 */
export interface DataFrameDTO extends QueryResultBase {
  name?: string;
  fields: Array<FieldDTO | Field>;
}
export interface FieldCalcs extends Record<string, any> {}
/**
 * Describes where a specific data frame field is located within a
 * dataset of type DataFrame[]
 *
 * @internal -- we will try to make this unnecessary
 */
export interface DataFrameFieldIndex {
  frameIndex: number;
  fieldIndex: number;
}

/**
 * See also:
 * https://github.com/grafana/grafana-plugin-sdk-go/blob/main/data/frame_type.go
 *
 * @public
 */
export declare enum DataFrameType {
  TimeSeriesWide = 'timeseries-wide',
  TimeSeriesLong = 'timeseries-long',
  TimeSeriesMany = 'timeseries-many',
  /** Directory listing */
  DirectoryListing = 'directory-listing',
  /**
   * First field is X, the rest are ordinal values used as rows in the heatmap
   */
  HeatmapRows = 'heatmap-rows',
  /**
   * Explicit fields for:
   *  xMin, yMin, count, ...
   *
   * All values in the grid exist and have regular spacing
   *
   * If the y value is actually ordinal, use `meta.custom` to specify the bucket lookup values
   */
  HeatmapCells = 'heatmap-cells',
}

export declare type KeyValue<T = any> = Record<string, T>;
/**
 * Represent panel data loading state.
 * @public
 */
export declare enum LoadingState {
  NotStarted = 'NotStarted',
  Loading = 'Loading',
  Streaming = 'Streaming',
  Done = 'Done',
  Error = 'Error',
}
export declare const preferredVisualizationTypes: readonly ['graph', 'table', 'logs', 'trace', 'nodeGraph'];
export declare type PreferredVisualisationType = typeof preferredVisualizationTypes[number];
/**
 * @public
 */
export interface QueryResultMeta {
  type?: DataFrameType;
  /** DatasSource Specific Values */
  custom?: Record<string, any>;
  /** Stats */
  stats?: QueryResultMetaStat[];
  /** Meta Notices */
  notices?: QueryResultMetaNotice[];
  /** Used to track transformation ids that where part of the processing */
  transformations?: string[];
  /** Currently used to show results in Explore only in preferred visualisation option */
  preferredVisualisationType?: PreferredVisualisationType;
  /** The path for live stream updates for this frame */
  channel?: string;
  /** Did the query response come from the cache */
  isCachedResponse?: boolean;
  /**
   * Optionally identify which topic the frame should be assigned to.
   * A value specified in the response will override what the request asked for.
   */
  dataTopic?: DataTopic;
  /**
   * This is the raw query sent to the underlying system.  All macros and templating
   * as been applied.  When metadata contains this value, it will be shown in the query inspector
   */
  executedQueryString?: string;
  /**
   * A browsable path on the datasource
   */
  path?: string;
  /**
   * defaults to '/'
   */
  pathSeparator?: string;
  /**
   * Legacy data source specific, should be moved to custom
   * */
  alignmentPeriod?: number;
  searchWords?: string[];
  limit?: number;
  json?: boolean;
  instant?: boolean;
}
export interface QueryResultMetaStat extends FieldConfig {
  displayName: string;
  value: number;
}
/**
 * QueryResultMetaNotice is a structure that provides user notices for query result data
 * @public
 */
export interface QueryResultMetaNotice {
  /**
   * Specify the notice severity
   */
  severity: 'info' | 'warning' | 'error';
  /**
   * Notice descriptive text
   */
  text: string;
  /**
   * An optional link that may be displayed in the UI.
   * This value may be an absolute URL or relative to grafana root
   */
  link?: string;
  /**
   * Optionally suggest an appropriate tab for the panel inspector
   */
  inspect?: 'meta' | 'error' | 'data' | 'stats';
}
/**
 * @public
 */
export interface QueryResultBase {
  /**
   * Matches the query target refId
   */
  refId?: string;
  /**
   * Used by some backend data sources to communicate back info about the execution (generated sql, timing)
   */
  meta?: QueryResultMeta;
}
export interface Labels {
  [key: string]: string;
}
export interface Column {
  text: string;
  filterable?: boolean;
  unit?: string;
  custom?: Record<string, any>;
}

/**
 * @alpha
 */
export interface ThemeVisualizationColors {
  /** Only for internal use by color schemes */
  palette: string[];
  /** Lookup the real color given the name */
  getColorByName: (color: string) => string;
  /** Colors organized by hue */
  hues: ThemeVizHue[];
}
/**
 * @alpha
 */
export interface ThemeVizColor {
  color: string;
  name: string;
  aliases?: string[];
  primary?: boolean;
}
/**
 * @alpha
 */
export interface ThemeVizHue {
  name: string;
  shades: ThemeVizColor[];
}

export declare enum GrafanaThemeType {
  Light = 'light',
  Dark = 'dark',
}
export interface GrafanaThemeCommons {
  name: string;
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  typography: {
    fontFamily: {
      sansSerif: string;
      monospace: string;
    };
    size: {
      base: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
    };
    weight: {
      light: number;
      regular: number;
      semibold: number;
      bold: number;
    };
    lineHeight: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
    };
    heading: {
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      h5: string;
      h6: string;
    };
    link: {
      decoration: string;
      hoverDecoration: string;
    };
  };
  spacing: {
    base: number;
    insetSquishMd: string;
    d: string;
    xxs: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    gutter: string;
    formSpacingBase: number;
    formMargin: string;
    formFieldsetMargin: string;
    formInputHeight: number;
    formButtonHeight: number;
    formInputPaddingHorizontal: string;
    formInputAffixPaddingHorizontal: string;
    formInputMargin: string;
    formLabelPadding: string;
    formLabelMargin: string;
    formValidationMessagePadding: string;
    formValidationMessageMargin: string;
    inlineFormMargin: string;
  };
  border: {
    radius: {
      sm: string;
      md: string;
      lg: string;
    };
    width: {
      sm: string;
    };
  };
  height: {
    sm: number;
    md: number;
    lg: number;
  };
  panelPadding: number;
  panelHeaderHeight: number;
  zIndex: {
    dropdown: number;
    navbarFixed: number;
    sidemenu: number;
    tooltip: number;
    modalBackdrop: number;
    modal: number;
    portal: number;
    typeahead: number;
  };
}
export interface GrafanaTheme extends GrafanaThemeCommons {
  type: GrafanaThemeType;
  isDark: boolean;
  isLight: boolean;
  palette: {
    black: string;
    white: string;
    dark1: string;
    dark2: string;
    dark3: string;
    dark4: string;
    dark5: string;
    dark6: string;
    dark7: string;
    dark8: string;
    dark9: string;
    dark10: string;
    gray1: string;
    gray2: string;
    gray3: string;
    gray4: string;
    gray5: string;
    gray6: string;
    gray7: string;
    gray98: string;
    gray97: string;
    gray95: string;
    gray90: string;
    gray85: string;
    gray70: string;
    gray60: string;
    gray33: string;
    gray25: string;
    gray15: string;
    gray10: string;
    gray05: string;
    blue95: string;
    blue85: string;
    blue80: string;
    blue77: string;
    red88: string;
    redBase: string;
    redShade: string;
    greenBase: string;
    greenShade: string;
    red: string;
    yellow: string;
    purple: string;
    orange: string;
    orangeDark: string;
    queryRed: string;
    queryGreen: string;
    queryPurple: string;
    queryOrange: string;
    brandPrimary: string;
    brandSuccess: string;
    brandWarning: string;
    brandDanger: string;
    online: string;
    warn: string;
    critical: string;
  };
  colors: {
    bg1: string;
    bg2: string;
    bg3: string;
    border1: string;
    border2: string;
    border3: string;
    bgBlue1: string;
    bgBlue2: string;
    dashboardBg: string;
    bodyBg: string;
    panelBg: string;
    panelBorder: string;
    pageHeaderBg: string;
    pageHeaderBorder: string;
    dropdownBg: string;
    dropdownShadow: string;
    dropdownOptionHoverBg: string;
    link: string;
    linkDisabled: string;
    linkHover: string;
    linkExternal: string;
    textStrong: string;
    textHeading: string;
    text: string;
    textSemiWeak: string;
    textWeak: string;
    textFaint: string;
    textBlue: string;
    formLabel: string;
    formDescription: string;
    formInputBg: string;
    formInputBgDisabled: string;
    formInputBorder: string;
    formInputBorderHover: string;
    formInputBorderActive: string;
    formInputBorderInvalid: string;
    formFocusOutline: string;
    formInputText: string;
    formInputDisabledText: string;
    formInputPlaceholderText: string;
    formValidationMessageText: string;
    formValidationMessageBg: string;
  };
  shadows: {
    listItem: string;
  };
  visualization: ThemeVisualizationColors;
}

/**
 * @beta
 * Next gen theme model introduced in Grafana v8.
 */
export interface GrafanaTheme2 {
  name: string;
  isDark: boolean;
  isLight: boolean;
  colors: ThemeColors;
  breakpoints: ThemeBreakpoints;
  spacing: ThemeSpacing;
  shape: ThemeShape;
  components: ThemeComponents;
  typography: ThemeTypography;
  zIndex: ThemeZIndices;
  shadows: ThemeShadows;
  visualization: ThemeVisualizationColors;
  transitions: ThemeTransitions;
  v1: GrafanaTheme;
}
/** @alpha */
export interface ThemeRichColor {
  /** color intent (primary, secondary, info, error, etc) */
  name: string;
  /** Main color */
  main: string;
  /** Used for hover */
  shade: string;
  /** Used for text */
  text: string;
  /** Used for borders */
  border: string;
  /** Used subtly colored backgrounds */
  transparent: string;
  /** Text color for text ontop of main */
  contrastText: string;
}
/** @internal */
export declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

/** @internal */
export declare type ThemeColorsMode = 'light' | 'dark';
/** @internal */
export interface ThemeColorsBase<TColor> {
  mode: ThemeColorsMode;
  primary: TColor;
  secondary: TColor;
  info: TColor;
  error: TColor;
  success: TColor;
  warning: TColor;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    link: string;
    /** Used for auto white or dark text on colored backgrounds */
    maxContrast: string;
  };
  background: {
    /** Dashboard and body background */
    canvas: string;
    /** Primary content pane background (panels etc) */
    primary: string;
    /** Cards and elements that need to stand out on the primary background */
    secondary: string;
  };
  border: {
    weak: string;
    medium: string;
    strong: string;
  };
  gradients: {
    brandVertical: string;
    brandHorizontal: string;
  };
  action: {
    /** Used for selected menu item / select option */
    selected: string;
    /** Used for hovered menu item / select option */
    hover: string;
    /** Used for button/colored background hover opacity */
    hoverOpacity: number;
    /** Used focused menu item / select option */
    focus: string;
    /** Used for disabled buttons and inputs */
    disabledBackground: string;
    /** Disabled text */
    disabledText: string;
    /** Disablerd opacity */
    disabledOpacity: number;
  };
  hoverFactor: number;
  contrastThreshold: number;
  tonalOffset: number;
}
export interface ThemeHoverStrengh {}
/** @beta */
export interface ThemeColors extends ThemeColorsBase<ThemeRichColor> {
  /** Returns a text color for the background */
  getContrastText(background: string, threshold?: number): string;
  emphasize(color: string, amount?: number): string;
}

/** @beta */
export interface ThemeBreakpointValues {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}
/** @beta */
export declare type ThemeBreakpointsKey = keyof ThemeBreakpointValues;
/** @beta */
export interface ThemeBreakpoints {
  values: ThemeBreakpointValues;
  keys: string[];
  unit: string;
  up: (key: ThemeBreakpointsKey) => string;
  down: (key: ThemeBreakpointsKey) => string;
}

/** @internal */
export declare type ThemeSpacingOptions = {
  gridSize?: number;
};
/** @internal */
export declare type ThemeSpacingArgument = number | string;
/**
 * @beta
 * The different signatures imply different meaning for their arguments that can't be expressed structurally.
 * We express the difference with variable names.
 * tslint:disable:unified-signatures */
export interface ThemeSpacing {
  (): string;
  (value: ThemeSpacingArgument): string;
  (topBottom: ThemeSpacingArgument, rightLeft: ThemeSpacingArgument): string;
  (top: ThemeSpacingArgument, rightLeft: ThemeSpacingArgument, bottom: ThemeSpacingArgument): string;
  (
    top: ThemeSpacingArgument,
    right: ThemeSpacingArgument,
    bottom: ThemeSpacingArgument,
    left: ThemeSpacingArgument
  ): string;
  gridSize: number;
}

/** @beta */
export interface ThemeShape {
  borderRadius: (amount?: number) => string;
}
/** @internal */
export interface ThemeShapeInput {
  borderRadius?: number;
}

/** @beta */
export interface ThemeComponents {
  /** Applies to normal buttons, inputs, radio buttons, etc */
  height: {
    sm: number;
    md: number;
    lg: number;
  };
  input: {
    background: string;
    borderColor: string;
    borderHover: string;
    text: string;
  };
  tooltip: {
    text: string;
    background: string;
  };
  panel: {
    padding: number;
    headerHeight: number;
    borderColor: string;
    boxShadow: string;
    background: string;
  };
  dropdown: {
    background: string;
  };
  overlay: {
    background: string;
  };
  dashboard: {
    background: string;
    padding: number;
  };
  textHighlight: {
    background: string;
    text: string;
  };
  sidemenu: {
    width: number;
  };
  menuTabs: {
    height: number;
  };
  horizontalDrawer: {
    defaultHeight: number;
  };
}

/** @beta */
export interface ThemeTypography {
  fontFamily: string;
  fontFamilyMonospace: string;
  fontSize: number;
  fontWeightLight: number;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
  htmlFontSize?: number;
  h1: ThemeTypographyVariant;
  h2: ThemeTypographyVariant;
  h3: ThemeTypographyVariant;
  h4: ThemeTypographyVariant;
  h5: ThemeTypographyVariant;
  h6: ThemeTypographyVariant;
  body: ThemeTypographyVariant;
  bodySmall: ThemeTypographyVariant;
  /**
   * @deprecated
   * from legacy old theme
   * */
  size: {
    base: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
  pxToRem: (px: number) => string;
}
export interface ThemeTypographyVariant {
  fontSize: string;
  fontWeight: number;
  lineHeight: number;
  fontFamily: string;
  letterSpacing?: string;
}

export declare const zIndex: {
  navbarFixed: number;
  sidemenu: number;
  dropdown: number;
  typeahead: number;
  tooltip: number;
  modalBackdrop: number;
  modal: number;
  portal: number;
};
/** @beta */
export declare type ThemeZIndices = typeof zIndex;

/** @beta */
export interface ThemeShadows {
  z1: string;
  z2: string;
  z3: string;
}

declare const easing: {
  easeInOut: string;
  easeOut: string;
  easeIn: string;
  sharp: string;
};
declare const duration: {
  shortest: number;
  shorter: number;
  short: number;
  standard: number;
  complex: number;
  enteringScreen: number;
  leavingScreen: number;
};
/** @alpha */
export interface CreateTransitionOptions {
  duration?: number | string;
  easing?: string;
  delay?: number | string;
}
/** @alpha */
export declare function create(props?: string | string[], options?: CreateTransitionOptions): string;
export declare function getAutoHeightDuration(height: number): number;
/** @alpha */
export interface ThemeTransitions {
  create: typeof create;
  duration: typeof duration;
  easing: typeof easing;
  getAutoHeightDuration: typeof getAutoHeightDuration;
}
