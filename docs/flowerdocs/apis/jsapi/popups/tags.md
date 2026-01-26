---
title: Tags
sidebar_position: 4
description: Displaying component tags in a popup window.
date: "2004-03-28T13:21:01+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: e6708e6891e878df93d6e8a36e4942c9bdd0c48f5a56f330c3bc3d3c436e6b07
---

:::info
This type of popup displays the tags of an existing component within a popup.
:::

To instantiate this type of popup, you need to supply the API with an existing component:

```javascript
var popup = JSAPI.get().getPopupAPI().buildComponentFields(document);
```

**Example :** Displaying document tags in a popup window

```javascript
JSAPI.get()
    .document()
    .get(
        ["documentId"],
        function (documents) {
            var document = documents[0];
            console.info("Got: " + document.getId());
            var popup = JSAPI.get().getPopupAPI().buildComponentFields(document);
            popup.setTitle("My document");
            popup.setDescription("View document tags");
            popup.setIcon("fa fa-book");
            popup.show();
        },
        function (error) {
            console.error("Documents could not be get: " + error);
        }
    );
```
