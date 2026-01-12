---
title: Subscription
description: Subscribing to the execution of a search
date: "2005-03-28T13:22:01+02:00"
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 5109f737477c8bb64c174def0cb0158471176e9e64ba3ca41f8ff4ce9160e5bd
---

Subscription to the execution of a search request is based on the search template.
The information available when subscribing is the template name, request, response and response callback.
The response can be manipulated before the callback is executed.

In the following example, a component creation popup is displayed if the search returns no results:

```javascript
JSAPI.get().getComponentSearchAPI().registerForExecution("DefaultSearch",function(request, response, callback){
    callback.onProcessed(response);
    if(response.getFound() == 0){
        JSAPI.get().getPopupAPI().buildComponentCreationFromSearchRequest("DOCUMENT", request, null).show();

});
```
