---
title: WidgetOffMenu
sidebar_position: 4
date: "2001-03-01"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: cabdfdfda1d05df34f9250b6ebf2cd2ec0d9e516b34c1555c4215a836eebad1d
---

Widget OffMenus allow you to view and interact with this widget to the menu. The [attachment metadata viewer plugin] (/documentation/apis/plugins/attachment.md) is based on this type of menu.

To instantiate a WidgetOffMenu, you need to provide it with the Widget to be included in the menu:

```javascript
var menu = new IFrameOffMenu("MenuTitle", Widget);
JSAPI.get().addOffMenu(menu);
```
