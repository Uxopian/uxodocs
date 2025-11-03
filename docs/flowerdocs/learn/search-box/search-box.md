---
title: "Search box"
description: "Use the `SearchBox` plugin to make it easier to open components."
date: "2000-02-01T12:20:01+02:00"
---


# Goal

![Search box](/img/flowerdocs/documentation/learn/searchbox.png)

The `SearchBoxPlugin` plugin makes life easier for users by adding a search bar that can be accessed at any time.
This search bar can display results from different searches.

# An example in practice


In this module, we will configure this plugin to search for a client's folder.
To do this, we will use the `ClientFolder` virtual folder class with a *USER* `Accounting` tag.

# Set up

In order to display the client folders that match the value entered, we will define a search that finds every virtual folder whose name contains the value entered in the search bar.
For each result, we customize the display: 

* an orange folder icon is used
* description displays the value of the `Accounting` tag

<br/>
The `SearchBoxPlugin` plugin can be activated with the script: 
```javascript
var searchBox = new SearchBoxPlugin([{
    category: 'VIRTUAL_FOLDER',
    fields: ['name', ‘Accounting'],
    criterion: 'name',
    max: 10,
    icon: function(component, callback){
        callback('orange ti-folder');
    },
    description: function(component, callback){
        var formatter = JSAPI.get().getHelperFactory().getFieldFormatter('VIRTUAL_FOLDER');
        formatter.format(component.getField(‘Accounting'), function(formattedValue){
            callback(‘File managed by' + formattedValue);
        });

}]);
searchBox.start();
```

<!--:::info
Find the scope module corresponding to this training [here]("".md)
:::
-->

