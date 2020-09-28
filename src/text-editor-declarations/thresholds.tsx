export default `
interface Threshold {
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
declare enum ThresholdsMode {
  Absolute = "absolute",
  /**
   *  between 0 and 1 (based on min/max)
   */
  Percentage = "percentage"
}
/**
*  Config that is passed to the ThresholdsEditor
*/
interface ThresholdsConfig {
  mode: ThresholdsMode;
  /**
   *  Must be sorted by 'value', first value is always -Infinity
   */
  steps: Threshold[];
}
`;
