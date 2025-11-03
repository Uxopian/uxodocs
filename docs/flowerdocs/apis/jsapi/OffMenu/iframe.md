---
title: "IFrameOffMenu"
date: "2001-03-01"
---


IFrame OffMenus allow you to add an IFrame to the menu. 

To instantiate an IFrameOffMenu, you need to provide it with the url of the IFrame to be built: 
```javascript
var menu = new IFrameOffMenu("MenuTitle", url);
JSAPI.get().addOffMenu(menu);
```

A callback can be provided to this method to react to the loading of the IFrame: 
```javascript
var menu = new IFrameOffMenu("MenuTitle", url, window => { 
	console.info("The IFrame has been loaded");
 });
JSAPI.get().addOffMenu(menu);
```