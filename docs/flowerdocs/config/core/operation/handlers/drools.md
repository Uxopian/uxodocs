---
title: Decision table
description: React to an operation through a Drools decision table
date: '2002-01-28T13:20:01+02:00'
custom_edit_url: null
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 48105ab3bd1369bdcd5dc092461f3ffc9a5c3c9fb1c17104bc51983463d3752b
---




# Principle

This operation manager relies on the [Drools] rules engine (https://www.drools.org/) to execute a decision table.
A decision table is a Microsoft Excel file with two types of columns: 

* conditions: determines the cases in which to apply a rule 
* actions: the actions to be executed for a given rule

For each defined rule (or line), the defined actions are executed if all conditions are met. 

The decision table is stored as the content of the document used to configure subscription to the execution of an operation.

# Conditions & Actions

The conditions and actions defined must be Java code that can be compiled within **FlowerDocs Core**'s JVM.
To facilitate their development, an object accessible through the variable `util` is made available whose exposed methods are listed [here](/config/core/appendices/context-util.md).

In order to contextualize decision-making, the `context` and `component` variables are provided when evaluating a decision table. They can therefore be used in conditions or actions. The `context` variable contains a [`com.flower.docs.operation.api.OperationContext`](#javadoc-com-flower-docs-operation-api-OperationContext) object storing the operation execution context.
<br/>
It is possible to retrieve the component before the action using the `getOld()` method available on the `UpdateComponentOperationContext` or `TaskOperationContext` type `context` variable.
<br/>
The `component` variable contains the component (see [`com.flower.docs.domain.component.Component`](#javadoc-com-flower-docs-domain-component-Component)) concerned by the operation (if available).

:::info
To manually define this operation handler, the `com.flower.docs.core.tsp.operation.DroolsOperationHandler` identifier can be used as the value of the `OperationHandler` tag.
:::



Drools-type operation managers do not support certain execution contexts:
* on administration objects (component classes, security objects, etc.)
* on document version modification
