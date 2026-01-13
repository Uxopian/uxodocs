---
title: Loading panel
date: "2018-03-28T13:21:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 1b622c33e0fb4e4b3bd6c0c66d4335064269ad09ef52c5225b6f67a5c088e845
---

To notify the user of ongoing processing during JavaScript execution, the loading panel can be displayed and then hidden at the end of processing with the following functions available from the `FlowerJSAPI.get()` API:

| Function           | Description                |
| ------------------ | -------------------------- |
| showLoadingPanel() | Displays the loading panel |
| hideLoadingPanel() | Hide loading panel         |

\_example of loading panel display for 3 seconds\_\_

```javascript
JSAPI.get().showLoadingPanel();
setTimeout(function () {
    JSAPI.get().hideLoadingPanel();
}, 3000);
```
