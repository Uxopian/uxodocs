---
title: Document download
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: fe6270bcd4569ecbaa1440d73e604ee1dbb585a226e3b6f69bfd1a9c6e18a7d7
---

### Download documents

- Object: getARenderJS().getDownloadDocumentJSAPI()

    | Function                                                                    | Description                                                   |
    | --------------------------------------------------------------------------- | ------------------------------------------------------------- |
    | askDownloadDocumentPDF()                                                    | Download the current document in PDF                          |
    | askDownloadDocumentSource()                                                 | Download the current document in source format                |
    | askDownloadAllDocuments()                                                   | Download a single PDF with all opened documents               |
    | registerNotifyDocumentDownloadEvent(notifyDocumentDownloadTriggeredHandler) | Trigger a callback function when a document download is asked |


#### Example

```javascript title="scripts/example.js"
function arenderjs_init(arenderjs_)
{
  arenderjs_.getDownloadDocumentJSAPI().registerNotifyDocumentDownloadEvent(
    function(documentId, action) {
      getARenderJS().getCurrentUserName(function(name) {
        var currentDate = new Date();
        console.info("The user " + name + 
          " triggered a download document of type " + action + 
          " on documentId=" + documentId + 
          " at " + currentDate);
      });
    }
  );
}