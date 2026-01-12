---
title: WidgetOffMenu
date: "2001-03-01"
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 0b183c99585251f9128bd2a817282f54a0b1a9b07d27d5ab8010a3514a6d08f6
---

Widget OffMenus allow you to view and interact with this widget to the menu. The [attachment metadata viewer plugin] (/documentation/apis/plugins/attachment.md) is based on this type of menu.

To instantiate a WidgetOffMenu, you need to provide it with the Widget to be included in the menu:

```javascript
var menu = new IFrameOffMenu("MenuTitle", Widget);
JSAPI.get().addOffMenu(menu);
```
