---
title: Document layout
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 1ae7b8e7d1ba8c4fdaabcb7fde7dcbc4209fbf6038c7f20120d4cc0a578fa0e1
---







### Retrieve document layout

- Object: getARenderJS().getDocumentLayout()

| Function                                                    | Description                                                                                                          | Arguments                                                                                                                                                                                                             |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| getDocumentLayout(documentId, handler, errorHandler)        | Retrieve a flattened document layout                                                                                 |  |
| getShallowDocumentLayout(documentId, handler, errorHandler) | Retrieve a document layout. If the layout is a container then the children have only the document id as information. |  |

```js
// Retrieve a document layout
getARenderJS().getDocumentLayout().getShallowDocumentLayout(getARenderJS().getMasterDocumentId(), function(layout) {
            // Check if layout is a document container
            if (layout.isDocumentContainer()) {
                var children = layout.getChildren();
                for (var i=0; i<children.length; i++)

                    var child = children[i];
                    // Print child document ID
                    console.info("child id = " + child.getDocumentId());


        });
```
