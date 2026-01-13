---
title: IFrameOffMenu
date: "2001-03-01"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 08ea402cc8eef64caf5b5dc3845cd8889b9de341e1df7659d73dbfc33d82d71f
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
