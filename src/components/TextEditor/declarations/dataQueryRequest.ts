export default `
declare enum CoreApp {
  Dashboard = "dashboard",
  Explore = "explore",
}

declare enum ExploreMode {
  Logs = "Logs",
  Metrics = "Metrics",
  Tracing = "Tracing",
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
`;
