---
title: "Task attachments"
date: "2001-03-29T13:22:01+02:00"
---


# Document as attachment without indexing

It is possible to use the old mode of document creation as an attachment without an indexing form by defining a strategy to activate the *Legacy*mode.

In the following example, attachments with the identifier `Appendices` use the old mode, the others the new.  

```javascript
LegacyDocumentAttachmentCreationStrategy.registerStrategy(function(task,attachment){
	if("Appendices" == attachment.getId()){ 
		return true;

    return false;
});
```

# Summary

Attachment summaries can be overloaded using the `TaskAttachmentSynopsisHelper` API. 

__Example:__ Define part summary based on parent task tags

```javascript
helper = JSAPI.get().getHelperFactory().getTaskAttachmentSynopsisHelper();
helper.register(function(task, definition, attachedComponent, callback){
	new TemplateResolver("TASK").resolveTemplate(task, "${Priority}", function(resolved){
	    console.log("Resolved template: " + resolved); 
	    callback.onSuccess(resolved);
	});
});
```

__Example:__ Define the summary of an unsigned attachment

```javascript
helper = JSAPI.get().getHelperFactory().getTaskAttachmentSynopsisHelper();
helper.register(function(task, definition, attachedComponent, callback){
	if(!attachedComponent){
		callback.onSuccess("Attachment to define");

	else{
		//Using the default summary
		callback.onSuccess();

});
```