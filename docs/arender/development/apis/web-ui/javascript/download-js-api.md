---
title: Document download
last_update:
  date: '2026-03-06T18:23:33.786Z'
  author: CI/CD Bot
content_hash: 08c5ac6093ef7e9b60eb03817e212232822da802d82cee146b281a5cfcd6afb3
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