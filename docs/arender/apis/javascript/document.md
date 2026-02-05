---
title: "Opening a document"
sidebar_position: 2
last_update:
  date: '2026-02-05T15:05:05.898Z'
  author: CI/CD Bot
content_hash: 17200aa4f0fc1e9e893b97dac2eb8258328906e50fef41bafa2d52639bd2a6f8
---

## Opening documents

- Object: getARenderJS()

    | Function                             | Description                                                                                                                                                                                     | Arguments                                                                                                                                                    |
    | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
    | loadDocument(url , callback)         | ***Note**: This is purely a server-side operation, asynchronous at client side.*<br/>Loads a document providing an URL. It will provide an ARender Id back. | **url:** the URL to open ;<br/>**callback:** the callback function to call when the Id is provided by the server. |
    | openDocument(id)                     | Opens a document.                                                                                                                                                                               | **id:** ARender id                                                                                                                                           |
    | askChangePage(type , index)          | Changes the current page.                                                                                                                                                                       | **type:** 'Relative', 'Index' or 'Absolute';<br/>**index:** -1 or 1 for 'Relative' or 'Absolute', otherwise the page number |
    | enablePDFDocumentHyperlinks(boolean) | Activate/de-activate the internal hyperlinks of a document                                                                                                                                      | **boolean:** Load internal hyperlinks of a document if true, unload them otherwise.                                                                          |
    | disallowClickOnHyperlinks(boolean)   | Allow/disallow clicks on a document hyperlink for ARender                                                                                                                                       | **boolean:** if true, disallow internal hyperlinks of a document, allow them otherwise.                                                                      |

```js title="srcipts/example.js"
// Loads the PDF reference document
getARenderJS().loadDocument(
    "loadingQuery?url=http://www.arender.fr/pdf/pdf/PDFReference15_v5.pdf", 
    function(id) { getARenderJS().openDocument(id); }
  );
// Move to page 24 (note that page index is starting at 0. So page 1 has index 0)
getARenderJS().askChangePage('Index',23);
// Move to last page
getARenderJS().askChangePage('Absolute',1);
```

## Multiple document opening

ARender provides the possibility to open several documents by loading a list of documents which will be provided via JSON in order to define the tree structure. All the technical details can be found [here](/docs/arender/cookbook/composite-accessors.md)
