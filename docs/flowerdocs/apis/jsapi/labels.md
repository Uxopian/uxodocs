---
title: "Labels"
date: "2004-02-28T13:20:01+02:00"
---


:::info
The purpose of this section is to describe how to override product labels. 
	
   <br/>
   
   The following API is available for this purpose: 

```javascript
JSAPI.get().getLabelsAPI();
```

<br/>

This functionality is also available by overloading part of the labels via property files. Documentation for this part is available [here](../../config/gui/labels.md).
:::



# Labels modification

This API can be used to modify native labels. To do this, you need to subscribe to the retrieval of labels from the server: 

```javascript
var api = JSAPI.get().getLabelsAPI();
api.registerForLoad(function(language, callback){
   callback.onSuccess();
});
```

Within the subscription, it is then possible to modify the native labels: 


```javascript
var api = JSAPI.get().getLabelsAPI();
api.registerForLoad(function(language, callback){
	api.setLabel("home", "Dashboard");
	callback.onSuccess();
});
```

To retrieve all available labels : 


```javascript
var api = JSAPI.get().getLabelsAPI();
api.registerForLoad(function(language, callback){
	console.info("labels: "+api.getLabelsNames());
	callback.onSuccess();
});
```


# Using labels

The following functions are available for modifying or retrieving existing labels: 


| Function                                                               | Description                                                                      |
|------------------------------------------------------------------------|----------------------------------------------------------------------------------|
|getLabel(String labelName)                                              | Retrieves the value of a label                                                  |        
|getLabelWithParams(String labelName, Object... params)                  | Retrieves the value of a label with input parameters                   |
|getLabelWithPlural(String labelName, int pluralCount, Object... params) | Retrieves the value of a label with input parameters, taking the application of plural or not with the value of the parameter ``pluralCount``                                                                                                    |