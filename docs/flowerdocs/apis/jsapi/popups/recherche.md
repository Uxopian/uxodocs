---
title: Search
description: Search form within a popup.
date: '2004-03-28T13:23:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 653a6a31cf2b1f173d4fa7f50755e591c3c19812b71fb648a7ebf68caea0f684
---


:::info
This type of popup opens a search form in a popup.
:::


To open a search form in a popup, the following parameters are required as string: 

* ``category`` : Category to be searched
* ``template`` : Name of template to be used for search

The `callback` parameter can also be added, but is optional. It allows you to select a component that can, for example, be added as an attachment to a task.  


```javascript
popup = JSAPI.get().getPopupAPI().buildSearch(category, template, function(component){ 
	console.log("Selected component id="+ component.getId());
}); 
```

<br/>

# Search configuration 

Once the popup has been built, you can access or modify the various parameters using the following functions: 

| Function                 					| Description                                                             |
|-------------------------------------------|-------------------------------------------------------------------------|
|getHiddenRequest()           				| Retrieving the hidden query from the search form            			  | 
|setHiddenRequest(SearchRequest request)    | Update of the search form's hidden query             					  |
|getHiddenColumns()          		  		| Retrieving the list of hidden columns from the search form 			  |
|setHiddenColumns(String[] columns)  		| Update the list of hidden columns in the search form  				  |
|setOpenOnCategoryClick(boolean open) 		| Activate/deactivate component opening when category icon is clicked. <br/> _Enabled by default_|
