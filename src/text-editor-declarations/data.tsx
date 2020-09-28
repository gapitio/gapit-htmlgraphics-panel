import dataFrame from './dataFrame';
import dataQueryRequest from './dataQueryRequest';

export default `
/**
 * Represent panel data loading state.
 */
declare enum LoadingState {
    NotStarted = "NotStarted",
    Loading = "Loading",
    Streaming = "Streaming",
    Done = "Done",
    Error = "Error"
}

interface DataQueryTimings {
  dataProcessingTime: number;
}

declare enum DataQueryErrorType {
  Cancelled = "cancelled",
  Timeout = "timeout",
  Unknown = "unknown"
}

interface DataQueryError {
  data?: {
      message?: string;
      error?: string;
  };
  message?: string;
  status?: string;
  statusText?: string;
  refId?: string;
  type?: DataQueryErrorType;
}

interface PanelData {
  /** State of the data (loading, done, error, streaming) */
  state: LoadingState;
  /** Contains data frames with field overrides applied */
  series: DataFrame[];
  /** Request contains the queries and properties sent to the datasource */
  request?: DataQueryRequest;
  /** Timing measurements */
  timings?: DataQueryTimings;
  /** Any query errors */
  error?: DataQueryError;
  /** Contains the range from the request or a shifted time range if a request uses relative time */
  timeRange: TimeRange;
}

/**
 * Result set of panel queries
 * https://grafana.com/docs/grafana/latest/packages_api/data/paneldata/.
 */
declare const data: PanelData;
` +
  dataFrame +
  dataQueryRequest;
