const getSeries = (alias, calc = 'last') => {
  /*
    Get the series with the correct alias.
    series.name is overwritten by the alias written in the alias section of the metric/query
  */
  const filteredAliasSeries = data.series.filter((series) => series.name == alias);
  // Check if it found any series with the alias
  if (filteredAliasSeries.length > 0) {
    // calc is default to last (in this function), which gets the last metric in the query
    return filteredAliasSeries[0].fields[1].state.calcs[calc];
  }
  // Return 'No data' if it didn't find any series with the correct alias
  return 'No data';
};

/*
  htmlNode is a ShadowRoot, which makes it able to use getElementById (can also use querySelector).

  This code gets the elements with the correct id (first-series and alias-series) from the htmlNode document.
  Then selects the second child (the first child already has text in it), and adds the series value to it.

  data.series[0].fields[1].state.calcs.last
  data is the PanelData. Link to PanelData documentation https://grafana.com/docs/grafana/latest/packages_api/data/paneldata/
  .series[0] retrieves the first series in the array
  .fields[1] retrieves the value (.fields[0] is the timing)
  .state.calcs contains all the calculated values
  .last is the last value from the series
*/
htmlNode.getElementById('first-series').children[1].textContent = data.series[0].fields[1].state.calcs.last;
htmlNode.getElementById('alias-series').children[1].textContent = getSeries('series');

// Feel free to open the console (ctrl + shift + j on windows/linux or option + ⌘ + J on macOS) and go through the variables
console.log(htmlNode, data);
