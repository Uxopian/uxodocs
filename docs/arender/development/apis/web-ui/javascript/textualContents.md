---
title: Textual content
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 6cef7004237a637b632f2819f31a8a9e8d9063d7d2dc64fc8428065c55dd48d4
---

## Using lasso feature

- Object : getARenderJS()

The lasso feature is available since version 4.5. The principle is to register for an event, then to activate the lasso mode, which will allow the user to select a text in the document which will be retrieved with the registered event. For example, this text can be used subsequently to automatically fill in a text field.

| Function                                       | Description                                                                                | Argument                                                                                                         |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| registerNotifyLassoSelectedTextEvent(callback) | Registers a callback function to call in case of text retrieval with the lasso             | **callback :** The callback function to call in case of text retrieval with the lasso                            |
| askActivateLassoMode(lassoID)                  | Activate lasso mode with an id that will be returned at the same time as the selected text | **lassoID :** ID to identify where the activation of the lasso mode comes from for the use of the retrieved text |
| askDeactivateLassoMode()                       | Deactivate the lasso mode                                                                  |                                                                                                                  |

```js
var arenderjs;

function arenderjs_init(arenderjs_) {
  arenderjs = arenderjs_
  arenderjs.registerNotifyLassoSelectedTextEvent(function (text, lassoID) {
    armt_onSubmitNotifyLassoSelectedTextEvent(text, lassoID);
  });
}

function armt_onSubmitNotifyLassoSelectedTextEvent(text, lassoID) {
  var elem = document.getElementById(lassoID);
  elem.innerHTML = text;
}

function armt_activatingLasso(lassoID) {
  arenderjs.askActivateLassoMode(lassoID);
}

function armt_deactivatingLasso() {
  arenderjs.askDeactivateLassoMode();
}
```
