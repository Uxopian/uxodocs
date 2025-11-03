---
title: "Reasoned answer"
date: "2001-03-28T13:22:01+02:00"
---


The functions available on reasoned answers API are: 


| Function                                                   | Description                                                      |
|------------------------------------------------------------|------------------------------------------------------------------|
|getPopup()                                                  | Retrieves response popup                                         |
|registerForFieldChange(String fieldName, function callback) | Allows subscription to field modification in response popup      |
|getReasonedAnswerId()                                       | Retrieves action identifier                                      |
|getTasks()                                                  | Retrieves the list of tasks associated with the response         |


__Examples:__  

```javascript
JSAPI.get().registerForReasonedAnswerOpen(function(reasonedAnswerAPI, reasonedAnswerId) {
	console.log("Opened reasoned answer Id: " + reasonedAnswerAPI.getReasonedAnswerId());
});
```

```javascript
JSAPI.get().getReasonedAnswerAPI(<answer identifier>).registerForFieldChange("Comments", function(fieldName, fieldValue) {
    console.log("Value of " + fieldName + " changed to: " + fieldValue);
});
```
	
__Note:__ In this part, the variable ``reasonedAnswerId`` is used to identify the response just opened

__Please note:__ When displaying several reasoned answers forms, it may be necessary to access a particular form: ``JSAPI.get().getReasonedAnswerAPI(<answer identifier>)``. 
