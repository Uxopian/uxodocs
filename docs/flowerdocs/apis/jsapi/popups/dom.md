---
title: DOM
description: Popups displayed within the graphical user interface
date: "2004-03-28T13:24:01+02:00"
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 8b6057471bb3b0a2ed7dcffb6c9ab64a6c7af5f9122ed95f50925170489d1705
---

The DOM Content popup allows you to add an element _DOM_ in a popup window. This allows you to add a JS element to a popup.

```javascript
var domElement = document.createElement("div");
domElement.innerHTML = "Hello world";
var popup = JSAPI.get().getPopupAPI().buildDOM(domElement);
popup.show();
```
