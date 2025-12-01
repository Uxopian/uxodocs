---
title: IFrameOffMenu
date: '2001-03-01'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: e93e6434457d6ad8ac2ec72218e9bb03465b04eb0bce537248905a35edadad74
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
