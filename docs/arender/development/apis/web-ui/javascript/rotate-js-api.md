---
title: Rotate
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 7ed8bd87460a38b75c782289847e787cf02c98609a3c6b3327679736ff768e94
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
    - pageNumber : : The page number of the document to rotate
    - documentId : The id of the document
    - rotation : The rotation to apply (ex : 90, 180 or 270)
    - clockwise : If true page rotate to the right, if false page rotate to the left

```js
// Rotate page 3 of the document with id "test" by 90° to the right
getARenderJS().getRotateJSAPI().askRotatePage(2, "test", 90, true);

// Rotate page 3 of the document with id "test" by 270° to the left
getARenderJS().getRotateJSAPI().askRotatePage(2, "test", 270, false);
```
