---
title: Operation
sidebar_position: 8
description: Reacting to operations.
date: "2008-01-03T13:22:01+02:00"
custom_edit_url: null
last_update:
  date: '2026-01-29T08:27:50.243Z'
  author: CI/CD Bot
content_hash: 05c91c12ff27131b716e6989871ed19752360f881b7824e253a3c1541e3cdc85
---

## Principle

The Operation API reacts to the execution of operations within **FlowerDocs Core**. An **operation** is an action performed by a user on a component.

The **operations managers** (or `com.flower.docs.operation.api.OperationHandler`) are called when an operation is executed to react to it and apply specific processing. They can be called before (_pre-processing_) or after (_post-processing_) the execution of the operation.

<br/>
The execution of an *operation* can be divided into three phases:

1. The **OperationHandler** recorded in the pre-processing phase are called
2. The **Operation** is executed
3. The **OperationHandler** recorded in the post-processing phase are called

:::info
The following steps may be interrupted by an exception raised by an operation handler, if this behavior is enabled.
:::

## Registration

In order for an operation manager to react to the execution of an operation, it must be registered. Registering an operation manager involves creating a configuration document of class `OperationHandlerRegistration`.

The registration defines the type of operations to which the manager must react by configuring a (creation, update...) and a .
Its (_before_ or _after_) indicates whether the manager should react before or after execution of the operation.

<br/>
In addition, the registration determines whether the reaction to the execution of an operation is synchronous or asynchronous (executed in another thread so as not to block the operation performed by the user).

<br/>
To limit the number of calls, it is possible to define an execution filter that FlowerDocs will resolve to trigger or not the call to the operation manager depending on the context.
<br/>
The fields on which filters can be applied depend on the  chosen. Here is an exhaustive list :

- **Document, folder and virtual folder** : tag list, component class
- **Tasks** : tag list, component class, assigned user, process identifier
- **Task class** : identifier, process identifier
- **Others** : identifier

Via the administration interface, it is possible to select other fields (for example on administration components), but they will not be taken into account.

## OperationHandler

An **OperationHandler** is a code fragment called when an operation is executed.
They can be divided into two categories:

- native: provided natively by **FlowerDocs Core** and executed within its JVM, either as a [Drools decision table](/docs/flowerdocs/config/core/operation/handlers/drools) or a [Script](/docs/flowerdocs/config/core/operation/handlers/script) based on GraalJS

- [RestOperationHandler](/docs/flowerdocs/config/core/operation/handlers/rest-operation-handler): exposed as REST web services

<br/>
To contextualize their execution, an object `com.flower.docs.operation.api.OperationContext` is provided as input. The context can be used to retrieve information concerning the execution of the operation, such as the component concerned or the modifications made.
