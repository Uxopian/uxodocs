---
title: Print Document
last_update:
  date: '2026-02-27T09:15:17.464Z'
  author: CI/CD Bot
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