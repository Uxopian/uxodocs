---
title: "Subscription"
description: "Subscribing to the execution of a search"
date: "2005-03-28T13:22:01+02:00"
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