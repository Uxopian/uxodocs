---
title: IFrameOffMenu
sidebar_position: 3
date: "2001-03-01"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: adcac44f9f0d84a69beb86d32e4072eadf93dba8257b8630418b8eabd4b77a81
---

IFrame OffMenus allow you to add an IFrame to the menu.

To instantiate an IFrameOffMenu, you need to provide it with the url of the IFrame to be built:

```javascript
var menu = new IFrameOffMenu("MenuTitle", url);
JSAPI.get().addOffMenu(menu);
```

A callback can be provided to this method to react to the loading of the IFrame:

```javascript
var menu = new IFrameOffMenu("MenuTitle", url, (window) => {
    console.info("The IFrame has been loaded");
});
JSAPI.get().addOffMenu(menu);
```
