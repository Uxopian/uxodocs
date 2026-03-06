---
title: Textual content
last_update:
  date: '2026-03-06T18:23:33.786Z'
  author: CI/CD Bot
content_hash: 52c8a2fd6e0ad56653c4bb521643755c865b323320d6e190869fa7d2849db895
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
