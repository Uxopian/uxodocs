---
title: "Annotations"
sidebar_position: 6
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: d65a9ed2a19df7ca36240b09ce28d9d6d7f2b0f2a8e008d7db49de9da4fdc5ea
---

### Intercept Hyperlinks

- Object: getARenderJS().getAnnotationJSAPI()

Here is an example of JS code allowing to register a method that will be
called each time that an hyperlink is clicked.

```javascript
var annotationjs;

function arenderjs_init(ajs)
{
  ajs.onAnnotationModuleReady(
    function(annotjs){
      annotationjs=annotjs;
      annotjs.registerFollowLinkHandler(followLink);
      console.log(annotationjs.getDestinationTypes());
      console.log(annotationjs.getActionTypes());
    }
  );
}

function followLink(docId, pageNumber, destination, action)
{
  console.log([
    "docId=" + docId,
    "pageNumber=" + pageNumber,
    "dest=" + destination, "action=" + action
  ].join());
  console.log(annotationjs.getPropertyFromDestination(destination,"PAGE_TARGET"));
  console.log(annotationjs.getPropertyFromAction(action,"GOTO"));
}
```

In this example, you can also observe how to visualize all existing properties in hyperlinks.

*annotationjs.getDestinationTypes()* and *annotationjs.getActionTypes()*
contains the list of properties that can be asked for hyperlinks
destinations and actions.

*annotationjs.getPropertyFromDestination(destination,property)* and
*annotationjs.getPropertyFromAction(action,property)* allow to ask for a
particular property once the action or destination have been received.

You will find following the list of properties for *destinations* :

| Type              | Description                      |
| ----------------- | -------------------------------- |
| PAGE_TARGET       | Page number of the page targeted |
| URI               | URI adress to go to              |

You will find following the list of properties for *actions* that will indicate the type of fields you will find in the destination :

| Type                | Description                      |
| ------------------- | -------------------------------- |
| GOTO                | The destination is a page number |
| URI                 | The destination is an URI        |