export default `
interface SelectableValue<T = any> {
  label?: string;
  ariaLabel?: string;
  value?: T;
  imgUrl?: string;
  icon?: string;
  description?: string;
  [key: string]: any;
}
interface RegistrySelectInfo {
  options: Array<SelectableValue<string>>;
  current: Array<SelectableValue<string>>;
}
declare class Registry<T extends RegistryItem> {
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

declare enum PluginState {
  alpha = "alpha",
  beta = "beta",
  stable = "stable",
  deprecated = "deprecated"
}

interface RegistryItem {
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

declare enum ReducerID {
  sum = "sum",
  max = "max",
  min = "min",
  logmin = "logmin",
  mean = "mean",
  last = "last",
  first = "first",
  count = "count",
  range = "range",
  diff = "diff",
  diffperc = "diffperc",
  delta = "delta",
  step = "step",
  firstNotNull = "firstNotNull",
  lastNotNull = "lastNotNull",
  changeCount = "changeCount",
  distinctCount = "distinctCount",
  allIsZero = "allIsZero",
  allIsNull = "allIsNull",
  allValues = "allValues"
}

declare type FieldReducer = (field: Field, ignoreNulls: boolean, nullAsZero: boolean) => FieldCalcs

interface FieldReducerInfo extends RegistryItem {
  emptyInputResult?: any;
  standard: boolean;
  reduce?: FieldReducer;
}
`;
