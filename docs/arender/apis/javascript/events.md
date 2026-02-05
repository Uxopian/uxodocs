---
title: "Events"
sidebar_position: 3
last_update:
  date: '2026-02-05T15:05:05.898Z'
  author: CI/CD Bot
content_hash: 0fc5e72239c93bc8c40471ae1b630bfdb0fe2ed72c9f67160246c9d697b8b27c
---

## Register to error events while loading documents

- Object: getARenderJS()

    | Function                                  | Description                                                                                                                                                   |
    | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | registerNotifyLoadingErrorEvent(callback) | Register a callback function that will be called when an error occurs when loading documents. Arguments: - the callback function to call when an error occurs. |

```js title="scripts/exemple.js"
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

## Setup plugin events and plugin parameters

- Object: getARenderJS()

    | Function                                 | Description                                                                                 |
    | ---------------------------------------- | ------------------------------------------------------------------------------------------- |
    | preparePluginEvent(key,value,pluginName) | Insert a (Key,Value) couple in the target URL of the next plugin Event of name pluginName   |
    | clearPluginEvent(pluginName)             | Clear all couple (Key,Value) stored in for the name pluginName                              |
    | openPlugin(pluginName,openInMultiView)   | Open the plugin pluginName in ARender, in multiView or not with the boolean openInMultiView |

Those functions allow to prepare an event before opening the plugin in order to setup a correct URL for parameterizing the plugin from ARender
ahead of time.

``` javascript
function arenderjs_init(ajs)
{
    // this line prepare an URL such as http://plumeURL/?To=toto@tutu.com
    ajs.preparePluginEvent("To","toto@tutu.com","plume");
    // Here, we clear all stored values for this plugin,
    // can be useful if called from a "clear" button
    ajs.clearPluginEvent("plume");
}
```