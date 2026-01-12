---
title: Notifications
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 28e3e8a3da65225e50155e83f41ec8fd3c6d2bbd31fc8bf874e2d266711bfe4d
---

## Change notifications

- Objet: getARenderJS()

    | function                     | Description                                              | Arguments                           |
    | ---------------------------- | -------------------------------------------------------- | ----------------------------------- |
    | registerNotifyLogEvent(hook) | Trigger a hook function when a notification is displayed | **hook:** The hook function to call |

The following functions allow to alter the received notification event caught by the hook function.

- Object: getARenderJS()

    | Function                           | Description                                  | Argument |
    | ---------------------------------- | -------------------------------------------- | -------- |
    | setLogEventMessage(event, message) | Change the notification message by "message" |          |
    | setLogEventDisplay(event, boolean) | Allow the notification display               |          |
    | setLogEventLevel(event, level)     | Change the notification level                |          |

```javascript
getARenderJS().registerNotifyLogEvent(function (event, level, message) {
    getARenderJS().setLogEventMessage(event, "Error: " + message);
    getARenderJS().setLogEventLevel(event, "SEVERE");
    getARenderJS().setLogEventDisplay(event, true);
});
```
