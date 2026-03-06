---
title: Print Document
last_update:
  date: '2026-03-06T18:23:33.786Z'
  author: CI/CD Bot
content_hash: d61c6cda44eabbd09dfdbecfb81439bce3e90fed68a9277f78ef54837d3f1c7e
---

### Print documents

- Object: getARenderJS().getPrintJSAPI()

    | Function                                                              | Description                                                |
    | --------------------------------------------------------------------- | ---------------------------------------------------------- |
    | askShowPrintDialog()                                                  | Show the print popup                                       |
    | askPrintAllDocumentPages()                                            | Ask a print of all documents                               |
    | registerNotifyDocumentPrintEvent(notifyDocumentPrintTriggeredHandler) | Trigger a callback function when a document print is asked |

#### Example

```javascript title="scripts/example.js"
function arenderjs_init(arenderjs_)
{
  arenderjs_.getPrintJSAPI().registerNotifyDocumentPrintEvent(
    function(documentId, action, isAnnotationsIncluded, isWatermarksIncluded) {
      arenderjs_.getCurrentUserName(function(name) {
        var currentDate = new Date();
        console.info(
          "The user " + name +
          " triggered a download document of type " + action +
          " on documentId=" + documentId +
          " are annotations included=" + isAnnotationsIncluded +
          " are watermarks included=" + isWatermarksIncluded +
          " at " + currentDate
        );
      });
    }
  );
}
```