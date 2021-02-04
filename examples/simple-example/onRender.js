// Sets the value from the first series on every refresh
const htmlgraphicsValue = htmlNode.getElementById('htmlgraphics-value');

if (htmlgraphicsValue) {
  htmlgraphicsValue.textContent = data.series[0].fields[1].state.calcs.last;
}
