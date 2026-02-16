---
title: Configuration
sidebar_position: 2
date: "2020-02-01T13:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: df12171bb38862d9e70b85175212fd6dda4ad82acf1d51fc3a6b86929cdbafe6
---

# Goal

This section explains how to configure the plugin and implement it on a scope integrating the GEC module.  
We want to apply it to the `Response` attachment of the `GEC_Step2_ToBeProcessed` tasks. Here we want a new document to be created directly from a Word template and associated with the `Response` attachment.

# Prerequisites

You need a FlowerDocs environment with a scope that includes the GEC module.  
Check that `TemplateAttachmentPlugin` is present on the scope. It can be found in the administration, in the **Display > Scripts**tab.

# Configuration

The plugin must be configured for a specific element before it can be used.
To do this, follow these steps:

- Create a new JavaScript script in the **Display > Scripts** tab of FlowerDocs administration. You can name this script TemplateAttachmentConfiguration.
- The contents of this script will be as follows:

```javascript
new TemplateAttachmentPlugin({
	attachmentId: ‘Response',
  	classId: 'GEC_Step2_ATraiter',
	instantiator:
		function(fileId) {
			var doc = new Document();
			doc.addFile(fileId);
			doc.setClassId('CourrierSortant');
			TagOracle.predict(this.formAPI.getComponent(), doc);
			return doc;
		},
}).bind();
```

- Save the script, then purge the application cache. This takes into account any changes made to the scope configuration.

:::note[Script explanation]
1 We use the `TemplateAttachmentPlugin` as expected.

2-3 The plugin is only applied to `Response` attachments for `GEC_Step2_ToBeProcessed` tasks.

4 The `instantiator` function generates a document from a file whose id is supplied.

6 The document is instantiated.

7-8 The document receives its file and the desired document class.

9 The document is returned when called by the API.
:::

<br/>
You can add options to this script:

:::note[Script options]

```javascript
	canAttach:
		function(card, definition, formAPI) {
			return formAPI.getComponent().getAssignee() == JSAPI.get().getUserAPI().getId();
		},
```

Restricts plugin use to the user to whom the task is assigned.

<br/>
```javascript
	nameBuilder:
		function() {
			return 'Réponse-' + new Date().toLocaleDateString() + '.docx';
		},
```
This function gives the document the name of the added file.
It must be called in the `instantiator` function as follows (after document instantiation):

<br/>
```javascript
			var name = this.nameBuilder();
			doc.setName(name);
```
:::
