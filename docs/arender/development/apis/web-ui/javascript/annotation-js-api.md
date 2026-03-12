---
title: Annotations
last_update:
  date: '2026-03-12T20:43:52.809Z'
  author: CI/CD Bot
content_hash: b2c6ba8e1a9f18dbed722e061934b1ac38ba3009451d64f80a13113d7eee1726
---

### Register to added annotation event

- Object: getARenderJS().getAnnotationJSAPI()

    | Function                                     | Description                                                                   |
    | -------------------------------------------- | ----------------------------------------------------------------------------- |
    | registerNotifyAnnotationAddedEvent(callback) | Register a callback function that will be called when an annotation is added. |

```js
/*
 * Register to added annotation event
 *
 * @param {string} documentId - ID of the document
 * @param {string} annotation - The json of the added annotation to the document
 * @param {boolean} isFromDocumentParsing - True if the added annotation came from parsing of the document
 */
getARenderJS()
  .getAnnotationJSAPI()
  .registerNotifyAnnotationAddedEvent(function (documentId, annotation, isFromDocumentParsing) {
    console.log(
      "Annotation added. DocumentId " +
      documentId +
      " annotation: " +
      annotation +
      " isFromDocumentParsing: " +
      isFromDocumentParsing
    );
  });
```

### Register to deleted annotation event

- Object: getARenderJS().getAnnotationJSAPI()

    | Function                                       | Description                                                                     |
    | ---------------------------------------------- | ------------------------------------------------------------------------------- |
    | registerNotifyAnnotationDeletedEvent(callback) | Register a callback function that will be called when an annotation is deleted. |

```js
/*
* Register to deleted annotation event
*
* @param {string} documentId - ID of the document
* @param {string} annotation - The json of the deleted annotation from the document
*/
getARenderJS().getAnnotationJSAPI().registerNotifyAnnotationDeletedEvent(function (documentId, annotation) {
  console.log("Annotation deleted. DocumentId " + documentId + " annotation: " + annotation);
});
```

### Register to updated annotation event

- Object: getARenderJS().getAnnotationJSAPI()

    | Function                                       | Description                                                                     |
    | ---------------------------------------------- | ------------------------------------------------------------------------------- |
    | registerNotifyAnnotationUpdatedEvent(callback) | Register a callback function that will be called when an annotation is updated. |

```js
/*
* Register to updated annotation event
*
* @param {string} documentId - ID of the document
* @param {string} annotation - Updated annotation from the document
*/
getARenderJS().getAnnotationJSAPI().registerNotifyAnnotationUpdatedEvent(function (documentId, annotation) {
  console.log("Annotation updated. DocumentId " + documentId + " annotation: " + annotation);
});
```

### Register to Page rotated event

- Object: getARenderJS().getRotateJSAPI()

    | Function                                 | Description                                                             |
    | ---------------------------------------- | ----------------------------------------------------------------------- |
    | registerNotifyPageRotatedEvent(callback) | Register a callback function that will be called when a page is rotated |

```js
/*
 * Subscribe a function to the page rotated event
 *
 * @param {string} documentId - ID of the document
 * @param {integer} pageNumber - The page rotated
 * @param {integer} rotation - Rotation of the page in degree
 */
getARenderJS()
  .getRotateJSAPI()
  .registerNotifyPageRotatedEvent(function (documentId, pageNumber, rotation) {
    console.log(
      "Page rotated. DocumentId: " +
      documentId +
      " pageNumber: " +
      pageNumber +
      " rotation: " +
      rotation
    );
  });
```

### Intercept Hyperlinks

- Object: getARenderJS().getAnnotationJSAPI()

Here is an example of JS code allowing to register a method that will be
called each time that an hyperlink is clicked.

```javascript
var annotationjs;

function arenderjs_init(ajs) {
  ajs.onAnnotationModuleReady(
    function (annotjs) {
      annotationjs = annotjs;
      annotjs.registerFollowLinkHandler(followLink);
      console.log(annotationjs.getDestinationTypes());
      console.log(annotationjs.getActionTypes());
    }
  );
}

function followLink(docId, pageNumber, destination, action) {
  console.log([
    "docId=" + docId,
    "pageNumber=" + pageNumber,
    "dest=" + destination, "action=" + action
  ].join());
  console.log(annotationjs.getPropertyFromDestination(destination, "PAGE_TARGET"));
  console.log(annotationjs.getPropertyFromAction(action, "GOTO"));
}
```

In this example, you can also observe how to visualize all existing properties in hyperlinks.

_annotationjs.getDestinationTypes()_ and _annotationjs.getActionTypes()_
contains the list of properties that can be asked for hyperlinks
destinations and actions.

_annotationjs.getPropertyFromDestination(destination,property)_ and
_annotationjs.getPropertyFromAction(action,property)_ allow to ask for a
particular property once the action or destination have been received.

You will find following the list of properties for _destinations_ :

| Type        | Description                      |
| ----------- | -------------------------------- |
| PAGE_TARGET | Page number of the page targeted |
| URI         | URI address to go to             |

You will find following the list of properties for _actions_ that will indicate the type of fields you will find in the destination :

| Type | Description                      |
| ---- | -------------------------------- |
| GOTO | The destination is a page number |
| URI  | The destination is an URI        |

### Create an highlight annotation

- Object: getARenderJS().getAnnotationJSAPI()

| Function                                                  | Description                                                          |
| --------------------------------------------------------- | -------------------------------------------------------------------- |
| addAnnotation(id, type, x, y, w, h, page, color, opacity) | Create an annotation at the desired position to the given documentId |

```js
/*
 * Add a highlight annotation
 *
 * @param {string} documentId - ID of the document
 * @param {string} type - the annotation type (only "Highlight" is supported)
 * @param {integer} x - the annotation x coordinate (number of pixels on the left)
 * @param {integer} y - the annotation y coordinate (number of pixels above)
 * @param {integer} w - the annotation width (in pixels)
 * @param {integer} h - the annotation height (in pixels)
 * @param {page} page - the annotation page number - 1. Note that the page numbers start from 0.
 * @param {string} color - the annotation color
 * @param {float} opacity - the annotation opacity (1 = Total opacity, 0 = Total transparency).
 */

var documentId = getARenderJS().getCurrentDocumentId(); // Retrieve the ID of the document currently being viewed
var type = "Highlight";
var x = 50;
var y = 150;
var w = 100;
var h = 50;
var page = 0;
var color = "#FF0000";
var opacity = 0.4;

getARenderJS()
  .getAnnotationJSAPI()
  .addAnnotation(documentId, type, x, y, w, h, page, color, opacity);
```

### DocLink mode functions

- Object: getARenderJS().getAnnotationJSAPI()

    | Function                                    | Description                                                                                                           |
    | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
    | registerDocLinkTextSelectionEvent(callback) | Register a callback function that will be called when a text is selected in docLink mode                              |
    | registerDocLinkStateChange(callback)        | Register a callback function that will be called when a state change in docLink mode                                  |
    | registerCloseMultiView(callback)            | Register a callback function that will be called on closing the multi-view                                            |
    | getTargetDocLinkDocumentId()                | Get the target document Id in docLink mode                                                                            |
    | getAvailableDocLinkDocumentId()             | Get the available document Id in docLink mode to know which document is not disabled                                  |
    | createDocLink(pageNumber)                   | Create the docLink at the desired page. The value of _pageNumber_ starts from 0, which corresponds to the first page. |

```js
/*
* Register to a selected text in docLink mode
*
*/
getARenderJS().getAnnotationJSAPI().registerDocLinkTextSelectionEvent(function () {
  console.log("Some text is selected");
});

/*
* Register to a state change in docLink mode
*
*/
getARenderJS().getAnnotationJSAPI().registerDocLinkStateChange(function () {
  console.log("Action in docLink has occurred");
});

/*
* Register to closing multi-view event
*
*/
getARenderJS().getAnnotationJSAPI().registerCloseMultiView(function () {
  console.log("Multi-view has been closed");
});

/*
* Get the target document Id in docLink mode
*
*/
getARenderJS().getAnnotationJSAPI().getTargetDocLinkDocumentId();

/*
* Get the available document Id in docLink mode to know which document is not disabled
*
*/
getARenderJS().getAnnotationJSAPI().getAvailableDocLinkDocumentId();

/*
* Create a docLink at the 4th page
*
* @param {integer} pageNumber -Tthe page to create the target docLink
*/
var pageNumber = 3; // This value is corresponding to the 4th page
getARenderJS().getAnnotationJSAPI().createDocLink(pageNumber);
```
