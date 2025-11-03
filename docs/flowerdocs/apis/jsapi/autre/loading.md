---
title: "Loading panel"
date: "2018-03-28T13:21:01+02:00"
---


To notify the user of ongoing processing during JavaScript execution, the loading panel can be displayed and then hidden at the end of processing with the following functions available from the ``FlowerJSAPI.get()`` API: 


| Function                                  | Description                                                                    |
|--------------------------------------------|--------------------------------------------------------------------------------|
|showLoadingPanel()                          | Displays the loading panel                                                 |        
|hideLoadingPanel()                          | Hide loading panel                                                   |


_example of loading panel display for 3 seconds__
```javascript
JSAPI.get().showLoadingPanel();
setTimeout(function() {
	JSAPI.get().hideLoadingPanel();
}, 3000)
```
 



