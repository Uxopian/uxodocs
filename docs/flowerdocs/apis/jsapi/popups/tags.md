---
title: "Tags"
description: "Displaying component tags in a popup window."
date: "2004-03-28T13:21:01+02:00"
---


:::info
This type of popup displays the tags of an existing component within a popup.
:::



To instantiate this type of popup, you need to supply the API with an existing component: 

```javascript
var popup = JSAPI.get().getPopupAPI().buildComponentFields(document);
```

__Example :__ Displaying document tags in a popup window

```javascript

JSAPI.get().document().get(["documentId"], function(documents){
	var document = documents[0];
	console.info("Got: "+document.getId());
	var popup = JSAPI.get().getPopupAPI().buildComponentFields(document);
	popup.setTitle("My document");
	popup.setDescription("View document tags");
	popup.setIcon("fa fa-book");
	popup.show();

	},
	function(error){
		console.error("Documents could not be get: " + error);
	});
```
