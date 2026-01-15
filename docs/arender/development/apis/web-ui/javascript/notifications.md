---
title: Notifications
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: a576a94272235015399e5614f2510211cad484de34f7171d7dbc9c9a457c9b44
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
