---
title: Overview
sidebar_position: 1
description: Open your own popups.
date: "2001-03-28T13:19:01+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: 0bab98860f75898b7c952f2a198959a2a7ff8de6d0d9e224931bef8c6f06559b
---

Different types of popup can be instantiated or modified:

- Components creation
- Displaying existing component metadata
- Activity
- Search
- DOM content
- Linking a document to a parent folder
- Confirmation of a user choice

<br/>

These popups can be instantiated using the JS API:

```javascript
JSAPI.get().getPopupAPI();
```

<br/>

The following functions are available to modify the various common attributes of popups:

| Function                                      | Description                                                       |
| --------------------------------------------- | ----------------------------------------------------------------- |
| `setIcon(String iconStyle)`                   | Popup icon definition                                             |
| `setTitle(String title)`                      | Popup Title definition                                            |
| `setDescription(String description)`          | Popup description definition                                      |
| `addStyle(String style)`                      | Adding a style to the popup                                       |
| `setContent(Element content)`                 | Overwrites existing popup body content                            |
| `addContent(Element element)`                 | Adding an element to the popup body                               |
| `clearContent()`                              | Overwrites popup body content                                     |
| `setClosable()`                               | Enables the possibility of closing the popup with the popup cross |
| `addCloseHandler(CloseCallback callback)`     | Add a callback on popup closure                                   |
| `show()`                                      | Popup opening                                                     |
| `close()`                                     | Popup closing                                                     |
| `setAutoCloseOnEnter(boolean autoCloseOnEnter)` | Popup closing by pressing Enter                                   |

<!---
 |setScrollable()                                        | Activates scroll on popup body                                      |
-->
