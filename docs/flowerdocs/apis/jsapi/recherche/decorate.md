---
title: Decorations
description: Decorating your search results
date: '2005-03-28T13:21:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 3dcdc66f44b0ba943095fd364534e7260af3ec8d8d23b0fe425074dea9e55e05
---




# Date format search results

The date format can be adapted to suit your needs, depending on tags and results. 
To do this, simply define the JS function ``getSearchResultDateFormat`` to return the desired date format. 

The settings are string as follows: 

* ``tagClassId``: tag class identifier 
* ``result``: the search result 

An example of use:

```javascript
function getSearchResultDateFormat(tagClassId, result){
	if(tagClassId == "MonTagAModifier"){
		return 'dd/MM/yyyyy';

    return 'dd MM yyyy HH:mm';

```

# Decorate your search results

You can decorate your search results: modifying the displayed value of a given field.
To do this, simply define a decorator for the tag to be decorated. 

In the following example, we define a decorator for the field ``fieldName`` which will be called to resolve the value to be displayed for this field.

```javascript
function decorate(fieldName){
	var decorators = JSAPI.get().getHelperFactory().getSearchDecoratorsAPI();
	decorators.register(fieldName, function(result, callback){		
		callback.onSuccess("decorated: " + result.getField(fieldName).getValue());
	});

decorate("Personal number");
```

# Formatting tag values

To display a tag, FlowerDocs formats its values: 

- for dates, according to the defined format 
- for value lists, according to defined labels

This mechanism can be used through the JS API, as shown in the following example: 

```javascript
var formatter = JSAPI.get().getHelperFactory().getFieldFormatter("DOCUMENT");
formatter.format(result.getField(fieldName), function(formattedValue){
	console.log("Formatted value: " + formattedValue);
});
```
