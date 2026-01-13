---
title: Notifications
date: "2018-03-28T13:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 158e29e228f1644906643d94e9140e04f74d656204502b47d13737aacc08a42d
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
