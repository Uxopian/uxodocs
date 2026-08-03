---
title: Loading panel
sidebar_position: 3
date: "2018-03-28T13:21:01+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: a91cf8de7731a8a6008a55e42e7c22670471bb60ff02f93cae86dc5fdeafe72f
---

To notify the user of ongoing processing during JavaScript execution, the loading panel can be displayed and then hidden at the end of processing with the following functions available from the `FlowerJSAPI.get()` API:

| Function           | Description                |
| ------------------ | -------------------------- |
| `showLoadingPanel()` | Displays the loading panel |
| `hideLoadingPanel()` | Hide loading panel         |

\_example of loading panel display for 3 seconds\_\_

```javascript
JSAPI.get().showLoadingPanel();
setTimeout(function () {
    JSAPI.get().hideLoadingPanel();
}, 3000);
```
