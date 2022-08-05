---
id: performance
title: Performance
---

Some options drastically decrease the execution time of the code.

There are two different code executions. One executes when the panel is loaded (onInit), and the other when a new metric is available (onRender).

The code which executes when a new metric is available (onRender) also executes when the panel is loaded.

Try to keep your code efficient and small. The code size dramatically impacts the load time.

## Value options (calcs)

Mutate calcs (calcs) has a significant impact if there are a lot of metrics. Setting this to "No mutations" or only choosing the calcs you will use will help with the performance.

Using the [getFieldDisplayValues](./references.md#getfielddisplayvalues) would also be better if you have a mix of calcs and only need a few metrics changed, but this requires a bit more coding.
