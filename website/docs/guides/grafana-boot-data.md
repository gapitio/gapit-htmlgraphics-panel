---
id: grafana-boot-data
title: Grafana boot data
---

:::caution
`window.grafanaBootData` is not created through the plugin but through Grafana itself. This means it can easily change based on the Grafana version.
:::

The [Grafana boot data](https://grafana.com/docs/grafana/latest/packages_api/runtime/grafanabootconfig/#bootdata-property) can be gotten through the window object. The [bootData property](https://grafana.com/docs/grafana/latest/packages_api/runtime/grafanabootconfig/#bootdata-property) type is any, but `window.grafanaBootData.settings` is [Grafana boot config](https://grafana.com/docs/grafana/latest/packages_api/runtime/grafanabootconfig/).

The easiest way to see what's useful is to log it.

```js
console.log(window.grafanaBootData);
```

In no particular order, here are a few things that can be gotten, _that I think are useful,_ from `window.grafanaBootData`.

- The users mail, name, orgRole and more. `window.grafanaBootData.user`.
- Check if there's an update ready for Grafana. `window.grafanaBootData.settings.buildInfo.hasUpdate`.
- Get data sources proxy url. `window.grafanaBootData.settings.datasources["data source name"].url`.
