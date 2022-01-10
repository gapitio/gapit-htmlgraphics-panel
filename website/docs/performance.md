---
id: performance
title: Performance
---

Some options drastically decrease the execution time of the code.

There are two different code executions. One that is done when the panel is loaded and one that is done when new metric is available.

The code execution done when new metric is available is also done when the panel is loaded.

Try to keep your code efficient and small. The code size has a big impact on the load time for people with slow internet.

## Value options (calcs)

This has a big impact if there's a lot of metrics. Setting this to "No mutations" or only choosing the calcs you're gonna will help a lot with the performance.

Using the [getFieldDisplayValues](./references.md#getfielddisplayvalues) would also be better if you have a mix of calcs and only need a few metrics changed, but this require a bit more coding.
