const getShowcaseMetric = () => {
  // Return a random number
  return Math.random() * 100;
};

const getMetricByName = (alias) => {
  const filteredAliasSeries = data.series.filter((series) => series.name == alias);
  if (filteredAliasSeries.length > 0) {
    return filteredAliasSeries[0].fields[1].state.calcs.last;
  }
  return 'No data';
};

const getMetric = (alias) => {
  /*
    Since the codeData is parsed as an Object in the plugin,
    it can be used as a normal javascript dictionary.
  */
  if (codeData.showcase) {
    return getShowcaseMetric();
  }
  return getMetricByName(alias);
};

htmlNode.getElementById('random-metric').children[1].textContent = getMetric('random-metric');
