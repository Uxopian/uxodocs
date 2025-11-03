---
title: "Outgoing email"
date: "2003-03-29T13:20:01+02:00"
---


# Indexing outgoing mail

Emails written in Plume can be stored in FlowerDocs. To do this, it may be necessary to index them to be able to find them again.

Outgoing mail is indexed using a `PreProcessor`. This object is used to manipulate the email on the client side, before it is sent to the server side for processing.

<br/>

In the example below, we index the email written from the open component: 

```javascript
context.setPreProcessor(function(email){ 
	var component = formAPI.getComponent();
	email.properties={};
	email.properties.classid="OutgoingMail";
	email.properties.name=email.subject;
	email.properties.CanalEntree=component.getTagValue("CanalEntree");
	email.properties.RefClient=component.getTagValue("RefClient");
});
```
