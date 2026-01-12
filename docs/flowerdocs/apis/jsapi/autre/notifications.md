---
title: Notifications
date: "2018-03-28T13:20:01+02:00"
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 794cbcc3639d590dda628fe317b1088ea8b7b6810087639a230da8ec1503f894
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
