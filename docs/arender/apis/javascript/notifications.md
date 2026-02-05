---
title: "Notifications"
sidebar_position: 4
last_update:
  date: '2026-02-05T15:05:05.898Z'
  author: CI/CD Bot
content_hash: 85082f04ba0b871832bf478b6c9cea79b1a36232192ecb0a62d890ef7c96871b
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