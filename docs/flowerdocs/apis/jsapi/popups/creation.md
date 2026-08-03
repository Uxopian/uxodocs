---
title: Components creation
sidebar_position: 3
description: Popup allowing creation of a component from an indexing form.
date: "2004-03-28T13:20:01+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: f6f5a3dd22367db28c06b59d97dddc1b185558ce40fb299e0d8cd315883c78f9
---

:::info
This type of popup allows you to launch the creation of a component by displaying an indexing form in a popup.
:::

To instantiate a creation popup, it is necessary to provide it with an input component (here `newTask`):

```javascript
var newTask = new Task();
var popup = JSAPI.get().getPopupAPI().buildComponentCreation(newTask);
```

A callback can be provided to this method to react to the creation of the component:

```javascript
var newTask = new Task();
newTask.setClassId("ClaimProcess_Start");
var popup = JSAPI.get()
    .getPopupAPI()
    .buildComponentCreation(newTask, function (saved) {
        console.info("The task has been created: " + saved.getId());
    });
popup.show();
```

&nbsp;

## File selector

In the case of document creation, it is also possible to display a popup without a file selector. This instantiates a blank document with no content.

To do this, use the `buildDocumentCreation()` document-specific function. This function has a parameter `allowFileAttachments`, which allows the file selector to be displayed or not within the popup.

```javascript
var newDocument = new Document();
var popup = JSAPI.get().getPopupAPI().buildDocumentCreation(newDocument, false);
```
