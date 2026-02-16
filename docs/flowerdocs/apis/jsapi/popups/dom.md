---
title: DOM
sidebar_position: 6
description: Popups displayed within the graphical user interface
date: "2004-03-28T13:24:01+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: f53185bdc5f43bb6f74c3f0179ab8e085d15cb20733a2834ef59c3f075df5175
---

The DOM Content popup allows you to add an element _DOM_ in a popup window. This allows you to add a JS element to a popup.

```javascript
var domElement = document.createElement("div");
domElement.innerHTML = "Hello world";
var popup = JSAPI.get().getPopupAPI().buildDOM(domElement);
popup.show();
```
