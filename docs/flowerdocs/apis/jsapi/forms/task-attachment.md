---
title: Task attachments
sidebar_position: 5
date: "2001-03-29T13:22:01+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: 9854a19b638a46e618bdcf30a1bce7b82e59347c655a5fbcc8fe52928a2355ef
---

## Document as attachment without indexing

It is possible to use the old mode of document creation as an attachment without an indexing form by defining a strategy to activate the *Legacy*mode.

In the following example, attachments with the identifier `Appendices` use the old mode, the others the new.

```javascript
LegacyDocumentAttachmentCreationStrategy.registerStrategy(function(task,attachment){
	if("Appendices" == attachment.getId()){
		return true;

    return false;
});
```

## Summary

Attachment summaries can be overloaded using the `TaskAttachmentSynopsisHelper` API.

**Example:** Define part summary based on parent task tags

```javascript
helper = JSAPI.get().getHelperFactory().getTaskAttachmentSynopsisHelper();
helper.register(function (task, definition, attachedComponent, callback) {
    new TemplateResolver("TASK").resolveTemplate(task, "${Priority}", function (resolved) {
        console.log("Resolved template: " + resolved);
        callback.onSuccess(resolved);
    });
});
```

**Example:** Define the summary of an unsigned attachment

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
