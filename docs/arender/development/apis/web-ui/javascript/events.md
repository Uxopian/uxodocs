---
title: Events
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 825aca859c86e90905a2b1464bcf1428914d7ffbd43dd4040a85b5b561eeb2d2
---







## Register to error events while loading documents

- Object: getARenderJS()

    | Function                                  | Description                                                                                                                                                    |
    | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | registerNotifyLoadingErrorEvent(callback) | Register a callback function that will be called when an error occurs when loading documents. Arguments: - the callback function to call when an error occurs. |



```js
// Subscribe a function to the errors
getARenderJS().registerNotifyLoadingErrorEvent(function(documentId,message) {
  console.log("error: "+message)
});
// Loads the PDF reference document
// If an error occurs I am notified on the function defined before!
getARenderJS().loadDocument(
  "loadingQuery?url=http://www.arender.fr/pdf/pdf/PDFReference15_v5.pdf",
  function(id) { getARenderJS().openDocument(id); }
);
```



## Know when ARender finished to load its modules

- Object: getARenderJS()

    | Function                                      | Description                                                                                                                                                                  |
    | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | registerAllAsyncModulesStartedEvent(callback) | Register a callback function that will be called when ARender finishes loading its modules. Arguments: - the callback function to call when asynchronous modules are loaded. |



``` javascript
// Subscribe a function to the loading. When asynchronous modules are loaded I am notified
getARenderJS().registerAllAsyncModulesStartedEvent(
  function() {console.log("modules are loaded")}
);
```



## Know when a page change occurs

- Object: getARenderJS()

| Function                                      | Description                                                                       |
| --------------------------------------------- | --------------------------------------------------------------------------------- |
| registerNotifyPageChangeEvent(callback)       | Register a callback function that will be called when a page change is requested. |



``` javascript
// I am notified to a page change request
getARenderJS().registerNotifyPageChangeEvent(
  function(currentPage, pageCount, documentId) {
    console.log("page " + currentPage + " change requested for document " + documentId)

);
```



## Setup plugin events and plugin parameters

- Object: getARenderJS()

    | Function                                 | Description                                                                                 |
    | ---------------------------------------- | ------------------------------------------------------------------------------------------- |
    | preparePluginEvent(key,value,pluginName) | Insert a (Key,Value) couple in the target URL of the next plugin Event of name pluginName   |
    | clearPluginEvent(pluginName)             | Clear all couple (Key,Value) stored in for the name pluginName                              |
    | openPlugin(pluginName,openInMultiView)   | Open the plugin pluginName in ARender, in multiView or not with the boolean openInMultiView |

These functions allow you to prepare a plugin opening event in order to enrich its launch in a contextualized way from ARender.

``` javascript
function arenderjs_init(ajs)

    // this line prepare an URL such as http://plumeURL/?To=toto@tutu.com
    ajs.preparePluginEvent("To","toto@tutu.com","plume");
    // Here, we clear all stored values for this plugin,
    // can be useful if called from a "clear" button
    ajs.clearPluginEvent("plume");

```

## Interact with anchor 

- Objet: getARenderJS()

    | Function                                                               | Description                            |
    | ---------------------------------------------------------------------- | -------------------------------------- |
    | askOpenAnchorModal(isFromThumbPresenter, documentId, x, y, w, h, page) | Ouvre la popup de création des ancres  |
    
    * isFromThumbPresenter : If true, generate an anchor from selected pictree thumbnails. If false generate an anchor from document view.
    * documentId: The ID of the document.
    * x: The x-coordinate for the anchor's position.
    * y: The y-coordinate for the anchor's position.
    * w: The anchor's width.
    * h: The anchor's height.
    * page: The page number where the anchor is located.



``` javascript
// To create an anchor from pictree in page 1 of a document
getARenderJS().askOpenAnchorModal(true, "documentId", 44, 26, 25, 30, 0);
```

