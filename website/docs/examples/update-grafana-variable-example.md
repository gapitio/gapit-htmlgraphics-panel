---
id: update-grafana-variable-example
title: Update grafana variable example
---

![Update grafana variable example](../../static/gif/update-grafana-variable-example.gif)
![testVariable used](../../static/img/test-variable-used.png)

`HTML/SVG`

```html
<button></button>
```

`onInit`

```javascript
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
    partial: true, // partial: true makes the update only affect the query parameters listed in query, and leaves the other query parameters unchanged.
    replace: true, // replace: true tells Grafana to update the current URL state, rather than creating a new history entry.
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
};

/*
  When the variable changes panelupdate will trigger.
  The panelupdate is used to update the button text so the text is the same as the variable.
*/
htmlNode.addEventListener('panelupdate', () => {
  updateButtonText();
});
```

`Panel options` (import/export)

```json
{
  "add100Percentage": true,
  "centerAlignContent": true,
  "overflow": "visible",
  "SVGBaseFix": true,
  "codeData": "{\n  \"text\": \"Random text\"\n}",
  "css": "",
  "html": "<button>Update variable</button>\n",
  "renderOnMount": true,
  "onRender": "",
  "dynamicData": false,
  "panelupdateOnMount": true,
  "onInit": "const VARIABLE_NAME = 'testVariable';\nconst buttonElt = htmlNode.querySelector('button');\n\n/*\n  Update a grafana variable\n\n  More information in the grafana docs\n  https://grafana.com/docs/grafana/latest/developers/plugins/add-support-for-variables/\n*/\nfunction updateGrafanaVariable(variableName, value) {\n  getLocationSrv().update({\n    query: {\n      [`var-${variableName}`]: value,\n    },\n    partial: true, // partial: true makes the update only affect the query parameters listed in query, and leaves the other query parameters unchanged.\n    replace: true, // replace: true tells Grafana to update the current URL state, rather than creating a new history entry.\n  });\n}\n\nfunction getGrafanaVariableValue(variableName) {\n  return getTemplateSrv().replace(`$${variableName}`);\n}\n\nfunction updateButtonText() {\n  buttonElt.textContent = `${VARIABLE_NAME}'s current value is: ${getGrafanaVariableValue(VARIABLE_NAME)}`;\n}\n\nbuttonElt.onclick = function () {\n  updateGrafanaVariable(VARIABLE_NAME, getGrafanaVariableValue(VARIABLE_NAME) == 'b' ? 'a' : 'b');\n};\n\n/*\n  When the variable changes panelupdate will trigger.\n  The panelupdate is used to update the button text so the text is the same as the variable.\n*/\nhtmlNode.addEventListener('panelupdate', () => {\n  updateButtonText();\n});"
}
```
