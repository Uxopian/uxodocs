---
title: Notifications
sidebar_position: 2
date: "2018-03-28T13:20:01+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: 93aac17726966293945c44cbe026999667e01ac243b88e1f3daac2404848075c
---

To send notifications, the Notification API can be accessed using the `JSAPI.get().getNotificationAPI()` function.
It features the following functions:

- `sendInformation(String message)`
- `sendWarning(String message)`
- `sendError(String message)`

These three functions open modal windows.

To send a notification to FlowerDocs, you can use the `sendNotification(String message)` function.

**Example:**

```javascript
JSAPI.get().getNotificationAPI().sendError("An error has occurred");
```
