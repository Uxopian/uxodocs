---
title: Lookups
sidebar_position: 13
date: "2011-03-28T13:20:01+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: 0ec72b3a5068b3fe503e580ddade0fbc52f365fc57c82c7eec21560ad69b03ee
---

A lookup involves retrieving data from a third-party or other repository, and building dynamic lists of values. This mechanism enhances the user experience and enriches the data stored or retrieved through FlowerDocs.

This functionality is based on the notion of plug-ins, which can be used to execute different types of calls/queries (database, web services, etc.).

## Lookup plugins

**Example :**

A lookup plugin can be defined in JavaScript using the API provided. To do this, you need to instantiate a `LookupPlugin` object, as shown in the example below. A plugin of this type has a `LookupHandler` called when the lookup is executed to provide FlowerDocs with a list of matching results.

```javascript
var lookupPlugin = new LookupPlugin();
lookupPlugin.setLookupHandler(function (fieldName, fieldValue, callback) {
    var results = new Array();
    callback.onSuccess(results);
});
```

Each plugin must then be made available to the application. The snipet below shows how to register the plugin where `lookupId` corresponds to the lookup name.

```javascript
var lookupAPI = JSAPI.get().getLookupAPI();
lookupAPI.register("lookupId", lookupPlugin);
```

## Using a lookup

Lookups stored in the application can be used in a variety of ways, depending on your needs.

### Dynamic call

Here's the code for executing a lookup:

**Example :** Executing a lookup `SampleLookup`

```javascript
JSAPI.get()
    .getLookupAPI()
    .lookup("SampleLookup", "BusinessReference", "ref123", function (results) {
        // Using lookup results
    });
```

The `results` object is an array of `LookupResult` objects exposing the methods:

| Functions  | Description                                        |
| ---------- | -------------------------------------------------- |
| `getKey()` | Retrieves the key of a result (i.e. symbolic name) |
| `getValue()` | Retrieves the value or label of a result           |

In this example, we execute the `LookupPlugin` whose identifier is `SampleLookup` with the tag name and value as parameters. By reacting to the modification of its value, it is then possible to modify the list of proposed values according to the user's input.

<br/>
*In these examples, the `SampleLookup` lookup is used to suggest values for the `Amount` tag, (either as a suggestion or as a closed list).*

**Example :** Suggested value for a tag

```javascript
formAPI.registerForFieldChange(“Amount", function(fieldName, fieldValue) {
	JSAPI.get().getLookupAPI().lookup(“SampleLookup”,”Amount", fieldValue, function(results) {
		formAPI.suggest("Amount", results);
	});
});
```

**Example:** Definition of allowed values in a list

```javascript
formAPI.registerForFieldChange(“Amount", function(fieldName, fieldValue) {
	JSAPI.get().getLookupAPI().lookup(“SampleLookup”,”Amount", fieldValue, function(results) {
		var restrictedAllowedValues = new Array();
		for ( var i in results) {
			result = results[i];
			var allowedValue = buildAllowedValue(result.getName(), result.getValue());
			restrictedAllowedValues[i] = allowedValue;

		formAPI.setAllowedValues("EDS", restrictedAllowedValues);
	});
});

function buildAllowedValue(symbolicName, label) {
	var language = new Language("EN");

	var allowedValue = new AllowedValueDefinition();
	allowedValue.setSymbolicName(symbolicName);

	var displayNames = new I18NLabel()
	displayNames.setLabel(language, label);
	allowedValue.setDisplayNames(displayNames);
	return allowedValue;

```

### Link with a tag

This JS API also provides the ability to automatically link a tag from the return of a `LookupPlugin`.
This can be done using the `function bindFieldOnLookup(String tagName, String lookupId)` where :

- `tagName` is the identifier of the tag concerned
- `lookupId` is the identifier of the `LookupPlugin` to be used.

**Example :** Binding a tag on the lookup `userLookup`

```javascript
formAPI.bindFieldOnLookup("DestinatairePourInfo", "userLookup");
```
