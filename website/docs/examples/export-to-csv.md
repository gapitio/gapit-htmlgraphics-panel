---
id: export-to-csv
title: Export to CSV
---

:::info
Huge thanks to [neshorg](https://github.com/neshorg) ([Grafana profile](https://community.grafana.com/u/neshorg/)) for the [original post](https://community.grafana.com/t/download-csv-button/38688/6?u=zuperzee).
:::

![Example: export to CSV](../../static/gif/example-export-to-csv.gif)

:::note
Some data sources needs some tweaks to work. Please [create an issue](https://github.com/gapitio/gapit-htmlgraphics-panel/issues/new/choose) on which data sources doesn't work so it can be listed. Thanks :D
:::

This works by using the [data object](../references.md#data-global), which makes it possible to use _most_ data sources provided by Grafana.

:::tip
The query can be "hidden" by pressing the "Enable/disable query" button _(small eye icon)_. Which makes the query not run until the button is pressed.
:::

**Remember to add a query!!!**

Example query using the influx database:
![Example: export to CSV query](../../static/img/example-export-to-csv-query.png)

`HTML/SVG`

```html
<button>Export to CSV</button>
```

`onInit`

```javascript
const btn = htmlNode.querySelector('button');

const timeoutLength = 3000;
const defaultButtonText = 'Export to CSV';

const toCsv = (resultsData) => {
  const [
    {
      frames: [
        {
          schema: { fields },
          data: { values },
        },
      ],
    },
  ] = Object.values(resultsData.results);

  if (values.length <= 0) {
    btn.textContent = 'Export failed... (Found no values).';
    console.warn('Got no values');
    return;
  }

  // Ensure time is first
  const orderFieldsAndValues = (values, fields) => {
    const timeIndex = fields.findIndex(({ type, name }) => [type, name.toLowerCase()].includes('time'));
    const timeField = fields[timeIndex];
    const timeValues = values[timeIndex].map((v) => new Date(v).toISOString()); // Format time as iso string

    const orderedFields = [timeField, ...fields.filter((_, i) => i !== timeIndex)];
    const orderedValues = [timeValues, ...values.filter((_, i) => i !== timeIndex)];
    return { orderedFields, orderedValues };
  };

  const { orderedFields, orderedValues } = orderFieldsAndValues(values, fields);

  const fieldNames = orderedFields.map((field) => field.name);
  const [first, ...rest] = orderedValues; // Need first for indexing
  const csv = [
    fieldNames.join(','),
    ...first.map((firstValue, i) => [firstValue, ...rest.map((v) => v[i])].join(',')),
  ].join('\r\n');

  return csv;
};

const saveCsvFile = (csv, filename) => {
  const elt = document.createElement('a');
  elt.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
  elt.setAttribute('download', filename);

  elt.style.display = 'none';
  htmlNode.appendChild(elt);

  elt.click();

  htmlNode.removeChild(elt);
};

btn.onclick = () => {
  clearTimeout(btn.timeout);
  btn.textContent = 'Exporting...';
  // The refId (query name) only updates after a page refresh.
  const [{ query, refId, datasource }] = data.request.targets;
  const { from, to } = data.timeRange;

  const filename = [refId, from.toISOString(), to.toISOString()].join('-') + '.csv';

  const body = {
    queries: [
      {
        datasource,
        query,
        refId,
        intervalMs: 0,
        maxDataPoints: 1e9, // 1E9 = 1_000_000_000 (Max allowed 1E20)
      },
    ],
    from: String(from.valueOf()),
    to: String(to.valueOf()),
  };

  fetch('/api/ds/query', {
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
    method: 'POST',
  })
    .then((res) =>
      res.json().then((data) => {
        const csv = toCsv(data);
        if (csv) {
          saveCsvFile(toCsv(data), filename);
          btn.textContent = 'Export finished';
        }

        btn.timeout = setTimeout(() => {
          btn.textContent = defaultButtonText;
        }, timeoutLength);
      })
    )
    .catch((e) => {
      btn.textContent = 'Export failed... (Failed retrieving data)';
      console.warn(e);

      btn.timeout = setTimeout(() => {
        btn.textContent = defaultButtonText;
      }, timeoutLength);
    });
};
```

`Panel options` (import/export)

```json
{
  "add100Percentage": true,
  "centerAlignContent": true,
  "overflow": "visible",
  "SVGBaseFix": true,
  "codeData": "{\n  \"text\": \"Random text\"\n}",
  "rootCSS": "",
  "css": "* {\n  font-family: Open Sans;\n}\n",
  "html": "<button>Export to CSV</button>",
  "renderOnMount": true,
  "onRender": "",
  "dynamicHtmlGraphics": false,
  "dynamicData": true,
  "dynamicFieldDisplayValues": false,
  "dynamicProps": false,
  "panelupdateOnMount": true,
  "onInitOnResize": false,
  "onInit": "const btn = htmlNode.querySelector('button');\n\nconst timeoutLength = 3000;\nconst defaultButtonText = 'Export to CSV';\n\nconst toCsv = (resultsData) => {\n  const [\n    {\n      frames: [\n        {\n          schema: { fields },\n          data: { values },\n        },\n      ],\n    },\n  ] = Object.values(resultsData.results);\n\n  if (values.length <= 0) {\n    btn.textContent = 'Export failed... (Found no values).';\n    console.warn('Got no values');\n    return;\n  }\n\n  // Ensure time is first\n  const orderFieldsAndValues = (values, fields) => {\n    const timeIndex = fields.findIndex(({ type, name }) => [type, name.toLowerCase()].includes('time'));\n    const timeField = fields[timeIndex];\n    const timeValues = values[timeIndex].map((v) => new Date(v).toISOString()); // Format time as iso string\n\n    const orderedFields = [timeField, ...fields.filter((_, i) => i !== timeIndex)];\n    const orderedValues = [timeValues, ...values.filter((_, i) => i !== timeIndex)];\n    return { orderedFields, orderedValues };\n  };\n\n  const { orderedFields, orderedValues } = orderFieldsAndValues(values, fields);\n\n  const fieldNames = orderedFields.map((field) => field.name);\n  const [first, ...rest] = orderedValues; // Need first for indexing\n  const csv = [\n    fieldNames.join(','),\n    ...first.map((firstValue, i) => [firstValue, ...rest.map((v) => v[i])].join(',')),\n  ].join('\\r\\n');\n\n  return csv;\n};\n\nconst saveCsvFile = (csv, filename) => {\n  const elt = document.createElement('a');\n  elt.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));\n  elt.setAttribute('download', filename);\n\n  elt.style.display = 'none';\n  htmlNode.appendChild(elt);\n\n  elt.click();\n\n  htmlNode.removeChild(elt);\n};\n\nbtn.onclick = () => {\n  clearTimeout(btn.timeout);\n  btn.textContent = 'Exporting...';\n  // The refId (query name) only updates after a page refresh.\n  const [{ query, refId, datasource }] = data.request.targets;\n  const { from, to } = data.timeRange;\n\n  const filename = [refId, from.toISOString(), to.toISOString()].join('-') + '.csv';\n\n  const body = {\n    queries: [\n      {\n        datasource,\n        query,\n        refId,\n        intervalMs: 0,\n        maxDataPoints: 1e9, // 1E9 = 1_000_000_000 (Max allowed 1E20)\n      },\n    ],\n    from: String(from.valueOf()),\n    to: String(to.valueOf()),\n  };\n\n  fetch('/api/ds/query', {\n    headers: {\n      'cache-control': 'no-cache',\n      'content-type': 'application/json',\n    },\n    body: JSON.stringify(body),\n    method: 'POST',\n  })\n    .then((res) =>\n      res.json().then((data) => {\n        const csv = toCsv(data);\n        if (csv) {\n          saveCsvFile(toCsv(data), filename);\n          btn.textContent = 'Export finished';\n        }\n\n        btn.timeout = setTimeout(() => {\n          btn.textContent = defaultButtonText;\n        }, timeoutLength);\n      })\n    )\n    .catch((e) => {\n      btn.textContent = 'Export failed... (Failed retrieving data)';\n      console.warn(e);\n\n      btn.timeout = setTimeout(() => {\n        btn.textContent = defaultButtonText;\n      }, timeoutLength);\n    });\n};"
}
```
