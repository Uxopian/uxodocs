---
title: Subscription
sidebar_position: 3
description: Subscribing to the execution of a search
date: "2005-03-28T13:22:01+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: 0d202d62320e10b51773e83370f2394790bb97a76bad6a189444d5412b6ee4cb
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
