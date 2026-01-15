---
title: DOM
description: Popups displayed within the graphical user interface
date: "2004-03-28T13:24:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: a80b5971c8d5d89df5fcc6defd7e13d3f3e26b41d23e07f8788618384d36e571
---

The DOM Content popup allows you to add an element _DOM_ in a popup window. This allows you to add a JS element to a popup.

```javascript
var domElement = document.createElement("div");
domElement.innerHTML = "Hello world";
var popup = JSAPI.get().getPopupAPI().buildDOM(domElement);
popup.show();
```
