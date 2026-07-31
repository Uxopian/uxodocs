---
title: Interactions with fields
sidebar_position: 1
date: "2001-03-28T13:19:01+02:00"
last_update:
  date: '2026-02-05T13:50:19.106Z'
  author: CI/CD Bot
content_hash: 4c52bc5258404a6941737ddaf5eb6ad9fdec1a8bef2d8b3eecc425c18db6c93d
---

:::info
Forms are the basis of the screens presented in the graphical user interface.
This section lists how to acquire a `formAPI` object for interacting with a form, and the associated functions.
:::

# Simple fields

**Note:** In this section, the variable `fieldName` corresponds, in the case of a tag, to the value of its identifier.
If this is the component class, use `Class`.

| Function                                             | Description                                       |
| ---------------------------------------------------- | ------------------------------------------------- |
| `hasField(String fieldName)`                           | Determines whether the field exists in the form   |
| `setObjectValue(String fieldName, Object fieldValue)`  | Modifies the value of a field                     |
| `getObjectValue(String fieldName)`                     | Retrieves the value of a field                    |
| `suggest(String fieldName, LookupResult suggestions)`  | Displays a list of suggestions for a STRING field |
| `setDescription(String fieldName, String description)` | Modifies the value of a field description         |

**Some examples:**

- Modification of a `EndDate` tag of type `TIMESTAMP`:

```javascript
// Set value from a Date object
formAPI.setObjectValue("EndDate", new Date(2016, 11, 04));
// Definition based on a timestamp (number of milliseconds elapsed since 01/01/1970)
formAPI.setObjectValue("EndDate", 0);
```

- Modification of a `Received` tag of type `BOOLEAN`:

```javascript
// Set the value from a Boolean
formAPI.setObjectValue("Received", true);
```

- Modification of class identifier:

```javascript
formAPI.setObjectValue("Class", "Document");
```

**Suggestion of values**

To suggest values for a field to the user, you can use the function `suggest(fieldName, suggestions)`.

The `suggestions` to be passed as parameters are composed of a symbolic name (`setValue(symbolicName)`) and a label (`setName(displayName)`).
So if the user selects one of the suggestions, the form will be submitted with the symbolic name.

```javascript
function buildSuggestion(name, value){
	var suggestion = new LookupResult();
	suggestion.setName(name);
	suggestion.setValue(value);
	return suggestion;

var suggestions = new Array();

suggestions[0] = buildSuggestion("name1", "value1");
suggestions[1] = buildSuggestion("name2", "value2");

formAPI.suggest("MailObject", suggestions);

```

# Choice lists


| Function               								                     | Description                                             |
|----------------------------------------------------------------------------|---------------------------------------------------------|
|`getAllowedValues(String fieldName)`          						         | Retrieves all permitted values for a CHOICELIST field   |
|`setAllowedValues(String fieldName, AllowedValueDefinition[] allowedValues)`  | Modifies the allowed values for a CHOICELIST field      |

```javascript
function buildAllowedValue(symbolicName, label) {
	var language = new Language("EN");

	var allowedValue = new AllowedValueDefinition();
	allowedValue.setSymbolicName(symbolicName);

	var displayNames = new I18NLabel()
	displayNames.setLabel(language, label);
	allowedValue.setDisplayNames(displayNames);
	return allowedValue;

var restrictedAllowedValues = new Array();

restrictedAllowedValues[0] = buildAllowedValue("symbolicName1", "firstLabel");
restrictedAllowedValues[1] = buildAllowedValue("symbolicName2", "secondLabel");

formAPI.setAllowedValues("BillType", restrictedAllowedValues);

```

# Field status

Several functions can be used to change the status of a field within a form. They are used with the parameters:

* ``fieldName`` corresponding to the field identifier
* ``boolean`` corresponding to state activation

| Function                               		    | Description                                                                    |
|---------------------------------------------------|--------------------------------------------------------------------------------|
|`setReadOnly(String fieldName, boolean isReadOnly)`	| Defines whether the field is read-only or not                                  |
|`getTagValidity(String fieldName)`					| Retrieves the validity of a field                                              |
|`setValid(String fieldName, boolean valid)`          | Modifies the validity of a field If the parameter ``valid`` is <br/> ``false`` then the form submission cannot be validated |
|`setVisible(String fieldName, boolean isVisible)`    | Defines whether the field is visible or hidden                                 |


__Example:__ Changing the visibility of a field in an indexing form

```javascript
formAPI.setVisible("BillType", false);
```

## Form validity change subscription

Various functions allow you to subscribe to changes in the validity of a form, depending on your needs:

- Validity of the complete form, i.e. fields and content:

```javascript
formAPI.registerForValidity(function (isValid, invalidFields, invalidTypes) {
    console.log(
        "Component is valid=" +
            isValid +
            ", invalidFields=" +
            invalidFields +
            ", invalidTypes=" +
            invalidTypes
    );
});
```

- Partial validity of the form:

This function allows you to subscribe only to the validity of a part of the form, either the fields (`FIELDS`), or the content (`CONTENT`).
<br/>
In the following example, we only subscribe to changes in field validity.

```javascript
formAPI.registerForPartialValidity("FIELDS", function (isValid, type, invalidFields) {
    console.log(
        "Component is valid=" + isValid + ", invalidFields=" + invalidFields + ", type=" + type
    );
});
```

<br/>

The following functions are also available to find out the status of the current form:

| Function                    | Description                                                                                                                 |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `getInvalidType(String type)` | Retrieves validity from the name of a form part: `FIELDS` for invalid fields or `CONTENT` for invalid content / attachments |
| `getInvalidTypes()`           | Retrieves names of invalid parts of the form                                                                                |

# List form fields

The `formAPI.getFields()` function on a form retrieves the list of field identifiers present in the form.

# Value change

To provide your users with interactive forms, it is possible to subscribe to changes in the value of a field in order to modify its status or modify another field.

```javascript
formAPI.registerForFieldChange("Amount", function (fieldName, fieldValue) {
    // Use the new value of a field
});
```
