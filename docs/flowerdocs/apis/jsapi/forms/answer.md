---
title: Reasoned answer
sidebar_position: 4
date: "2001-03-28T13:22:01+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: 1475cbac5dd3a10c519e78e31814d8ca68d618721fed74128292ff40fa1b956f
---

The functions available on reasoned answers API are:

| Function                                                    | Description                                                 |
| ----------------------------------------------------------- | ----------------------------------------------------------- |
| getPopup()                                                  | Retrieves response popup                                    |
| registerForFieldChange(String fieldName, function callback) | Allows subscription to field modification in response popup |
| getReasonedAnswerId()                                       | Retrieves action identifier                                 |
| getTasks()                                                  | Retrieves the list of tasks associated with the response    |

**Examples:**

```javascript
JSAPI.get().registerForReasonedAnswerOpen(function (reasonedAnswerAPI, reasonedAnswerId) {
    console.log("Opened reasoned answer Id: " + reasonedAnswerAPI.getReasonedAnswerId());
});
```

```javascript
JSAPI.get().getReasonedAnswerAPI(<answer identifier>).registerForFieldChange("Comments", function(fieldName, fieldValue) {
    console.log("Value of " + fieldName + " changed to: " + fieldValue);
});
```

**Note:** In this part, the variable `reasonedAnswerId` is used to identify the response just opened

**Please note:** When displaying several reasoned answers forms, it may be necessary to access a particular form: `JSAPI.get().getReasonedAnswerAPI(<answer identifier>)`.
