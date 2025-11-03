---
title: "DOM"
description: "Popups displayed within the graphical user interface"
date: "2004-03-28T13:24:01+02:00"
---


The DOM Content popup allows you to add an element *DOM* in a popup window. This allows you to add a JS element to a popup.

```javascript
var domElement = document.createElement('div'); 
domElement.innerHTML = "Hello world"; 
var popup = JSAPI.get().getPopupAPI().buildDOM(domElement);
popup.show();
```

