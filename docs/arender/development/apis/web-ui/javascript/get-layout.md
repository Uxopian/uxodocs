---
title: "Document layout"
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