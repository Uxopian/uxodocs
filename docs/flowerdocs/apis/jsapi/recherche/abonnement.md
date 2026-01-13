---
title: Subscription
description: Subscribing to the execution of a search
date: "2005-03-28T13:22:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 3f8af8cc170d4f0bf63358804b54de072f61ec86bbe6f2cfbb7777fe0b9bd511
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
