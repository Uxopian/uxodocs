---
title: DOMOffMenu
sidebar_position: 2
date: "2001-03-01"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: 5776c75d0e8be48094aa51b89b4e311e05f49d7357f3aa7f5e9a723b139ebd4b
---

DOM Content OffMenus are used to add a DOM element to the menu.

This allows you to add a JS element to the menu.

```javascript
var domElement = document.createElement("div");
domElement.innerHTML = "Hello world";
var menu = new DOMOffMenu("MenuTitle", domElement);
JSAPI.get().addOffMenu(menu);
```
