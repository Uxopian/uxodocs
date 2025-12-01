---
title: DOMOffMenu
date: '2001-03-01'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: c3eed991ab6c0f22064bbe96818b455593e3b3be0fb1c50be85e9c8f6549aa46
---


DOM Content OffMenus are used to add a DOM element to the menu.

This allows you to add a JS element to the menu. 

```javascript
var domElement = document.createElement('div'); 
domElement.innerHTML = "Hello world"; 
var menu = new DOMOffMenu("MenuTitle", domElement);
JSAPI.get().addOffMenu(menu);
```
