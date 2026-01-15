---
title: DOMOffMenu
date: "2001-03-01"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: ef3433997df1a4f05cb6c987b5b107eb2c56958086680b43d7230a7b9a1ec2c6
---

DOM Content OffMenus are used to add a DOM element to the menu.

This allows you to add a JS element to the menu.

```javascript
var domElement = document.createElement("div");
domElement.innerHTML = "Hello world";
var menu = new DOMOffMenu("MenuTitle", domElement);
JSAPI.get().addOffMenu(menu);
```
