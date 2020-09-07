const UNIT_PREFIXES = {
  '24': 'Y',
  '21': 'Z',
  '18': 'E',
  '15': 'P',
  '12': 'T',
  '9': 'G',
  '6': 'M',
  '3': 'k',
  '0': '',
  '-3': 'm',
  '-6': 'µ',
  '-9': 'n',
  '-12': 'p',
  '-15': 'f',
  '-18': 'a',
  '-21': 'z',
  '-24': 'y',
};

/**
 * Formats num into SI metric prefixes
 * https://en.wikipedia.org/wiki/Metric_prefix
 *
 * @param {any} num - The number that will be formatted as SI metric prefix
 * @param {number} [digits=1] - Amount of digits
 * @param {string} [unit=codeData.unit] - The unit which will be returned before the unit prefix
 * @param {boolean} [precision=false] - Use toExponential (true) or toFixed (false)
 * @return {Array<string, string>} [value, unit]
 */

const formatSI = (num, digits = 1, unit = codeData.unit, precision = false) => {
  if ([0, '0'].includes(num)) {
    return ['0', unit];
  } else if (num == 'No data' || !num) {
    return ['No data', ''];
  }

  let sig = Math.abs(num); // Significant figure
  let exponent = 0;

  while (sig >= 1000 && exponent < 24) {
    sig /= 1000;
    exponent += 3;
  }
  while (sig < 1 && exponent > -24) {
    sig *= 1000;
    exponent -= 3;
  }

  const signPrefix = num < 0 ? '-' : '';

  // If the Significant figure is more than 1000 Y (10^27)
  if (sig > 1000) {
    return [signPrefix + sig.toExponential(1), UNIT_PREFIXES[exponent] + unit];
  }

  const formattedSig = precision ? sig.toPrecision(digits) : sig.toFixed(digits);
  return [signPrefix + formattedSig, UNIT_PREFIXES[exponent] + unit];
};

/**
 * Calculates a calculation string. E.g "100+200-100*2"
 *
 * @param {string} string - Calculation string ("10+3*5")
 * @return {number} Calculated string value
 */
const calculateString = string => {
  return new Function('return ' + string)();
};

/**
 * Gets a random number
 *
 * @return {number} Random number
 */
const getShowcaseMetric = () => {
  // Return a random number
  return Math.random() * 2000000;
};

/**
 * Calculates a metric string. E.g "random-metric-1"+"random-metric-2"
 *
 * @param {string} metricCalculationString - The metric calculation string E.g "random-metric-1"+"random-metric-2"
 * @return {number} Calculated string
 */
const getCalculationMetric = metricCalculationString => {
  // Replace the metric names the metric value
  const splitMetricCalculation = metricCalculationString.replace(/["']([^"']*)["']/g, metricName => {
    return getMetric(metricName.replace(/["']/g, ''), 0);
  });
  return calculateString(splitMetricCalculation);
};

/**
 * Gets a metric value by name/alias
 *
 * @param {string} metricName - Metric name
 * @param {any} noDataValue - The value to return when there is no data
 * @return {any} - Metric value
 */
const getMetricByName = (metricName, noDataValue) => {
  const filteredSeries = data.series.filter(series => series.name == metricName);
  if (filteredSeries.length > 0) {
    return filteredSeries[0].fields[1].state.calcs.last;
  }
  return noDataValue;
};

/**
 *
 *
 * @param {string} metric
 * @param {string} [noDataValue='No data']
 * @return {any} - Metric value
 */
const getMetric = (metric, noDataValue = 'No data') => {
  /*
    Since the codeData is parsed as an Object in the plugin,
    it can be used as a normal javascript dictionary.
  */

  if (codeData.showcase) {
    return getShowcaseMetric();
  } else if (metric.includes('"') || metric.includes('\'')) {
    return getCalculationMetric(metric);
  }

  return getMetricByName(metric, noDataValue);
};

/**
 * Updates the sidebar values
 */
const updateSidebarValues = () => {
  htmlNode.getElementById(codeData.sidebar['total-it-load'].id).textContent = formatSI(
    getMetric(codeData.sidebar['total-it-load'].metric)
  ).join(' ');
  htmlNode.getElementById(codeData.sidebar['total-cooling'].id).textContent = formatSI(
    getMetric(codeData.sidebar['total-cooling'].metric)
  ).join(' ');

  let pueValue = getMetric(codeData.sidebar['total-pue'].metric);
  if (pueValue !== 'No data') {
    pueValue = pueValue.toFixed(2);
  }
  htmlNode.getElementById(codeData.sidebar['total-pue'].id).textContent = pueValue;
};

/**
 * Updates the data hall values
 */
const updateDataHalls = () => {
  for (const dataHall of codeData.dataHalls) {
    const value = getMetric(`${dataHall.metric}`);
    const valueSI = formatSI(value);

    htmlNode.getElementById(`${dataHall.id}-value`).textContent = valueSI.join(' ');
  }
};

/**
 * Updates the pod values
 */
const updatePods = () => {
  for (const pod of codeData.pods) {
    const value = getMetric(`${pod.metric}`);
    const valueSI = formatSI(value);

    htmlNode.getElementById(`${pod.id}-value`).textContent = valueSI.join(' ');
  }
};

const initialize = () => {
  updateSidebarValues();
  updateDataHalls();
  updatePods();
};

initialize();
