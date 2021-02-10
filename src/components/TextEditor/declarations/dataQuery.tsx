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
`;
