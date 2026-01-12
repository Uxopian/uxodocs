---
title: Reasoned answer
date: "2001-03-28T13:22:01+02:00"
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: f48adccaa6e17aebc854e293247b8e8e207316f333c7b88688a05db1772165a0
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
