---
title: "DOMOffMenu"
date: "2001-03-01"
---


DOM Content OffMenus are used to add a DOM element to the menu.

This allows you to add a JS element to the menu. 

```javascript
var domElement = document.createElement('div'); 
domElement.innerHTML = "Hello world"; 
var menu = new DOMOffMenu("MenuTitle", domElement);
JSAPI.get().addOffMenu(menu);
```