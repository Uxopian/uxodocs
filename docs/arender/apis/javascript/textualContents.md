---
title: "Textual content"
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: 3879bbdee01e1d2f96958cab5e4636474cfd5436f5db13a1c98f6f6b1a7e62ea
---

## Using lasso feature

- Object : getARenderJS()

The lasso feature is available since version 4.5. The principle is to register for an event, then to activate the lasso mode, which will allow the user to select a text in the document which will be retrieved with the registered event. For example, this text can be used subsequently to automatically fill in a text field.

| Function                                           | Description                                                                                | Argument                                                                                                          |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| registerNotifyLassoSelectedTextEvent(callback)     | Registers a callback function to call in case of text retrieval with the lasso             | **callback :** The callback function to call in case of text retrieval with the lasso                             |
| askActivateLassoMode(lassoID)                      | Activate lasso mode with an id that will be returned at the same time as the selected text | **lassoID :** ID to identify where the activation of the lasso mode comes from for the use of the retrieved text  |
| askDeactivateLassoMode()                           | Deactivate the lasso mode                                                                  |                                                                                                                   |

```js title="scripts/example.js"
var arenderjs;

function arenderjs_init(arenderjs_)
{
  arenderjs = arenderjs_
  arenderjs.registerNotifyLassoSelectedTextEvent(function(text, lassoID){
    armt_onSubmitNotifyLassoSelectedTextEvent(text,lassoID);
  });
}

function armt_onSubmitNotifyLassoSelectedTextEvent(text,lassoID)
{
  var elem = document.getElementById(lassoID);
  elem.innerHTML = text;
}

function armt_activatingLasso(lassoID)
{
  arenderjs.askActivateLassoMode(lassoID); 
}

function armt_deactivatingLasso()
{
  arenderjs.askDeactivateLassoMode();
}
```
