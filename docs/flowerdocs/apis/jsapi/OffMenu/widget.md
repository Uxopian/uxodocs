---
title: WidgetOffMenu
date: "2001-03-01"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: d0569a674469e35464e42972bf1a0bae2dfe24c1bcc3eea6b4d8b25267571759
---

Widget OffMenus allow you to view and interact with this widget to the menu. The [attachment metadata viewer plugin] (/documentation/apis/plugins/attachment.md) is based on this type of menu.

To instantiate a WidgetOffMenu, you need to provide it with the Widget to be included in the menu:

```javascript
var menu = new IFrameOffMenu("MenuTitle", Widget);
JSAPI.get().addOffMenu(menu);
```
