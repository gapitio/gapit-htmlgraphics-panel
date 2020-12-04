// Sets the value from the first series on every refresh
htmlNode.getElementById('htmlgraphics-value').textContent = data.series[0].fields[1].state.calcs.last;
