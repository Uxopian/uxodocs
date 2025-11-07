---
title: "Rotate"
---







### Rotate pages

- Object: getARenderJS().getRotateJSAPI()

    | Function                                                                          | Description                                    |
    | --------------------------------------------------------------------------------- | ---------------------------------------------- |
    | askRotateCurrentPageLeft()                                                        | Rotate current page left (counter-clockwise)   |
    | askRotateCurrentPageRight()                                                       | Rotate current page right (clockwise)          |
    | askRotateAllPageLeft()                                                            | Rotate all pages of the current document left  |
    | askRotateAllPageRight()                                                           | Rotate all pages of the current document right |
    | askRotatePage(int pageNumber, String documentId, int rotation, boolean clockwise) | Rotate a page of a document                    |
    
    * pageNumber : : The page number of the document to rotate
    * documentId : The id of the document
    * rotation : The rotation to apply (ex : 90, 180 or 270)
    * clockwise : If true page rotate to the right, if false page rotate to the left



```js
// Rotate page 3 of the document with id "test" by 90° to the right
getARenderJS().getRotateJSAPI().askRotatePage(2, "test", 90, true);

// Rotate page 3 of the document with id "test" by 270° to the left
getARenderJS().getRotateJSAPI().askRotatePage(2, "test", 270, false);
```

