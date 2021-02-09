import formatSI from './components/format-si';

/**
 * Calculates a calculation string. E.g "100+200-100*2"
 */
const calculateString = (string: string) => {
  return new Function('return ' + string)();
};

/**
 * Gets a random number
 */
const getShowcaseMetric = () => {
  // Return a random number
  return Math.random() * 2000000;
};

/**
 * Calculates a metric string. E.g "random-metric-1"+"random-metric-2"
 */
const getCalculationMetric = (metricCalculationString: string) => {
  // Replace the metric names the metric value
  const splitMetricCalculation = metricCalculationString.replace(
    /["']([^"']*)["']/g,
    (metricName: string) => {
      return getMetric(metricName.replace(/["']/g, ''), 0);
    }
  );
  return calculateString(splitMetricCalculation);
};

/**
 * Gets a metric value by name/alias
 */
const getMetricByName = (metricName: string, noDataValue: string) => {
  const filteredSeries = data.series.filter(
    (series) => series.name == metricName
  );
  if (filteredSeries.length > 0) {
    return filteredSeries[0].fields[1].state.calcs.last;
  }
  return noDataValue;
};

const getMetric = (metric: string, noDataValue: any = 'No data') => {
  /*
    Since the codeData is parsed as an Object in the plugin,
    it can be used as a normal javascript dictionary.
  */

  if (codeData.showcase) {
    return getShowcaseMetric();
  } else if (metric.includes('"') || metric.includes("'")) {
    return getCalculationMetric(metric);
  }

  return getMetricByName(metric, noDataValue);
};

/**
 * Updates the sidebar values
 */
const updateSidebarValues = () => {
  htmlNode.getElementById(
    codeData.sidebar['total-it-load'].id
  ).textContent = formatSI(
    getMetric(codeData.sidebar['total-it-load'].metric)
  ).join(' ');
  htmlNode.getElementById(
    codeData.sidebar['total-cooling'].id
  ).textContent = formatSI(
    getMetric(codeData.sidebar['total-cooling'].metric)
  ).join(' ');

  let pueValue = getMetric(codeData.sidebar['total-pue'].metric);
  if (pueValue !== 'No data') {
    pueValue = pueValue.toFixed(2);
  }
  htmlNode.getElementById(
    codeData.sidebar['total-pue'].id
  ).textContent = pueValue;
};

/**
 * Updates the data hall values
 */
const updateDataHalls = () => {
  for (const dataHall of codeData.dataHalls) {
    const value = getMetric(`${dataHall.metric}`);
    const valueSI = formatSI(value);

    htmlNode.getElementById(`${dataHall.id}-value`).textContent = valueSI.join(
      ' '
    );
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
