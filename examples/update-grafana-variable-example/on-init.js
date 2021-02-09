const VARIABLE_NAME = 'testVariable';
const buttonElt = htmlNode.querySelector('button');

/*
  Update a grafana variable

  More information in the grafana docs
  https://grafana.com/docs/grafana/latest/developers/plugins/add-support-for-variables/
*/
function updateGrafanaVariable(variableName, value) {
  getLocationSrv().update({
    query: {
      [`var-${variableName}`]: value,
    },
    partial: true,
    replace: true,
  });
}

function getGrafanaVariableValue(variableName) {
  return getTemplateSrv().replace(`$${variableName}`);
}

function updateButtonText() {
  buttonElt.textContent = `${VARIABLE_NAME}'s current value is: ${getGrafanaVariableValue(VARIABLE_NAME)}`;
}

buttonElt.onclick = function () {
  updateGrafanaVariable(VARIABLE_NAME, getGrafanaVariableValue(VARIABLE_NAME) == 'b' ? 'a' : 'b');
  updateButtonText();
};

updateButtonText();
