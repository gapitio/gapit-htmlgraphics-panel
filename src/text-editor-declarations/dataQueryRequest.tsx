import timeRanges from './timeRanges';

export default `
interface DataQuery {
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
  datasource?: string | null;
}

declare enum CoreApp {
  Dashboard = "dashboard",
  Explore = "explore"
}

declare enum ExploreMode {
  Logs = "Logs",
  Metrics = "Metrics",
  Tracing = "Tracing"
}

interface DataQueryRequest<TQuery extends DataQuery = DataQuery> {
  requestId: string;
  interval: string;
  intervalMs: number;
  maxDataPoints?: number;
  range: TimeRange;
  reverse?: boolean;
  scopedVars: ScopedVars;
  targets: TQuery[];
  timezone: string;
  app: CoreApp | string;
  cacheTimeout?: string;
  exploreMode?: ExploreMode;
  rangeRaw?: RawTimeRange;
  timeInfo?: string;
  panelId?: number;
  dashboardId?: number;
  startTime: number;
  endTime?: number;
  liveStreaming?: boolean;
  showingGraph?: boolean;
  showingTable?: boolean;
}
` + timeRanges;
