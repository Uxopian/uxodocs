---
title: Script execution
description: Respond to an operation by executing a JavaScript script
date: "2002-03-28T13:20:01+02:00"
custom_edit_url: null
last_update:
    date: "2025-12-02T14:29:22.460Z"
    author: CI/CD Bot
content_hash: 252e151292b4f22f62e49b001d02e8330c57e4c5df252d93366b886a4d192cfe
---

# Principle

This operation manager allows you to react to the execution of an operation by executing a JavaScript script.
The JavaScript script is executed using the [Graal] engine (/documentation/config/core/appendices/graal.md) embedded in the **FlowerDocs Core** JVM.

The script is stored as the content of the document used to configure subscription to the execution of an operation.

# Variables

## Context-related

The [`com.flower.docs.operation.api.OperationContext`](#javadoc-com-flower-docs-operation-api-OperationContext) object is supplied through the `context` variable to provide information related to the context in which the operation is executed.
<br/>
When an operation is performed on a particular component (see [`com.flower.docs.domain.component.Component`](#javadoc-com-flower-docs-domain-component-Component)) , it is supplied through a `component` variable.
<br/>
When a search is run, the request and the response (if available) are provided using the `request` (see [`com.flower.docs.domain.search.SearchRequest`](#javadoc-com-flower-docs-domain-search-SearchRequest)) and `response` (see [`com.flower.docs.domain.search.SearchResponse`](#javadoc-com-flower-docs-domain-search-SearchResponse)) variables respectively.

## Utilities

To facilitate their development, an object accessible through the `util` variable is made available whose exposed methods are listed [here](/docs/flowerdocs/config/core/appendices/context-util).

:::note[Creating a folder when creating a document]

```javascript
var folder = ComponentBuilder.folder().classId("Folder").build();
folder.setName("Dossier " + component.getName());
util.getFolderService().create(Lists.newArrayList(folder));
util.getFolderService().addChildren(
    folder.getId(),
    Lists.newArrayList(ReferenceBuilder.from(component)),
    false
);
```

:::

:::info
To manually define this operation handler, the `com.flower.docs.core.tsp.operation.script.ScriptOperationHandler` identifier can be used as the value of the `OperationHandler` tag.
:::
