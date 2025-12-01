---
title: Task's serial processing
description: Process a list of tasks without going back to the search
date: '2005-04-28T13:20:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: af6f49ccf121c0ab422fc1634a48a9cac6e54af14b253ec1338d4fab660c6d47
---


For more efficient processing of a task list, it is possible to define serial processing sessions. During these sessions, the user will move on to the next task without going back to the search that initiated the session. 

The start of these processing sessions is configured using the JS API: 
```javascript
JSAPI.get().batchSession().registerBuilder(function(session, callback){
		callback.enable(session);
});
```
The context at the start of the processing session (search request) is retained during the processing session.
However, the JS API allows you to modify the session by exposing the following methods: 

| Function                                      | Description                                                        |
|-----------------------------------------------|--------------------------------------------------------------------|
|getRequest()                                   | Retrieves the query executed during the processing session  		 |        
|setRequest(SearchRequest request)              | Modifies the query executed during the processing session        	 |        
|getPlace()                                     | Retrieves the current place        								 |        
|getSourcePlace()                               | Retrieves the place at the origin of the processing session        |        
|getComponentSource()                           | Retrieves the component at the origin of the processing session    |        
|getLast()                                  	| Retrieves the identifier of the last component opened during the processing session |        
|setEnabled(boolean enabled)                    | Disables the treatment session				      				 |        
|isEnabled()                                  	| Determines whether the processing session is active or inactive    |        
