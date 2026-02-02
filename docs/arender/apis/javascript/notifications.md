---
title: "Notifications"
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: ec3c84a9c6f61d5d491bccccf8db530387c64f57fbf4b3daa44377f1609f3b36
---

## Change notifications

- Objet: getARenderJS()

    | function                     | Description                                              | Arguments                           |
    | ---------------------------- | -------------------------------------------------------- | ----------------------------------- |
    | registerNotifyLogEvent(hook) | Trigger a hook function when a notification is displayed | **hook:** The hook function to call |

The following functions allow to alterate the received notification event caught by the hook function.

- Object: getARenderJS()

    | Function                           | Description                                  | Argument                                                                                                                                                                                  |
    | ---------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | setLogEventMessage(event, message) | Change the notification message by "message" | **event:** The notification event;<br/>**message:** the new message                                                                                    |
    | setLogEventDisplay(event, boolean) | Allow the notification display               | **event:** The notification event;<br/>**boolean:** Display the notification if true, hide it if false                                                  |
    | setLogEventLevel(event, level)     | Change the notification level                | **event:** The notification event;<br/>**level:** the new level (*"SEVERE", "WARNING", "INFO", "CONFIG", "FINE", "FINER",* ou *"FINEST"*) |


``` javascript
getARenderJS().registerNotifyLogEvent(function(event, level, message){
  getARenderJS().setLogEventMessage(event, "Error: " + message);
  getARenderJS().setLogEventLevel(event, "SEVERE");
  getARenderJS().setLogEventDisplay(event, true);
});
```