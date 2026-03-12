---
title: Notifications
last_update:
  date: '2026-03-12T20:43:52.809Z'
  author: CI/CD Bot
content_hash: 3d5e660a79eb5b981c9af11a7e64a0b955f8d0d252adfc8296252b3d97d53b10
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
