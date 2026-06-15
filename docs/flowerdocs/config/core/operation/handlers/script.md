---
title: Script execution
sidebar_position: 3
description: Respond to an operation by executing a JavaScript script
date: "2002-03-28T13:20:01+02:00"
custom_edit_url: null
last_update:
  date: '2026-02-17T14:41:59.174Z'
  author: CI/CD Bot
content_hash: 7551598729d89b54b5c30a646eb3edb119d294d9a25bcb24236d502c631f399f
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Principle

This operation manager allows you to react to the execution of an operation by executing a JavaScript script.
The JavaScript script is executed using the [Graal](/docs/flowerdocs/config/core/appendices/graal) engine embedded in the FlowerDocs Core JVM.

The script is stored as the content (attached `.js` file) of the `OperationHandlerRegistration` document used to configure the [subscription](/docs/flowerdocs/config/core/operation/registration).

# Variables

## Context-related

The following variables are injected into the script depending on the type of operation:

| Variable | Type | Availability | Description |
|----------|------|--------------|-------------|
| `context` | `OperationContext` | Always | Operation execution context (scope, user, phase, etc.) |
| `component` | `Component` | Component operations (CREATE, UPDATE, DELETE, READ, ANSWER, ASSIGN) | The component being operated on |
| `request` | `SearchRequest` | Search operations | The search request being executed |
| `response` | `SearchResponse` | Search operations (AFTER phase only) | The search response |
| `logger` | SLF4J Logger | Always | Logger for writing to the FlowerDocs Core log |
| `util` | [ContextUtil](/docs/flowerdocs/config/core/appendices/context-util) | Always | Utility object for service access and component persistence |

In **BEFORE** phase scripts, modifications to the `component` object are applied to the operation before it executes. In **AFTER** phase scripts, the component reflects its state after the operation completed.

## Utilities

Two utility objects are available — they serve different purposes:

- **`util`** is an **instance** of `RuleContextUtil`. Use it for any operation that **calls FlowerDocs Core services**: accessing services (`util.getDocumentService()`, `util.getFolderService()`, ...), persisting components (`util.create()`, `util.update()`), changing classes (`util.changeClass()`), and creating facts (`util.createFact()`).

- **`RuleUtil`** is a **static class reference**. Use it for **in-memory operations** on the `component` object without making service calls: reading and writing tags (`RuleUtil.getTagValue()`, `RuleUtil.setTagValue()`), class identifiers (`RuleUtil.getClassId()`, `RuleUtil.setClassId()`), and statuses (`RuleUtil.getStatus()`, `RuleUtil.setStatus()`).

The full method reference for both objects is documented [here](/docs/flowerdocs/config/core/appendices/context-util).

:::info
Since `util` is an instance of a class that extends `RuleUtil`, calling static methods through `util` (e.g., `util.setTagValue(...)`) also works. However, the recommended convention is `RuleUtil.method()` for static helpers and `util.method()` for service calls.
:::

## Pre-imported classes

To simplify script development, the following classes are available by their short name without needing a full package reference:

<Tabs>
  <TabItem value="builders" label="Builders">

| Class | Description |
|-------|-------------|
| `ComponentBuilder` | Build Document, Folder, Task, or VirtualFolder instances |
| `TagBuilder` | Build Tag instances |
| `CriterionBuilder` | Build search criteria |
| `FilterClauseBuilder` | Build AND/OR filter clauses |
| `SearchRequestBuilder` | Build search requests |
| `SearchBuilder` | Build virtual folder searches |
| `FactBuilder` | Build audit facts |
| `ReferenceBuilder` | Build component references |
| `ExceptionBuilder` | Build functional or technical exceptions |

  </TabItem>
  <TabItem value="domain" label="Domain">

| Class | Description |
|-------|-------------|
| `Document`, `Folder`, `Task`, `VirtualFolder` | Component types |
| `DocumentFile` | File attachment |
| `Id`, `Ids` | Identifier types |
| `Tag`, `Tags` | Tag and tag collection |
| `Status` | Component status |
| `Category` | Component category enum |
| `ComponentData` | Component metadata |
| `ComponentReference` | Reference to a component |
| `Attachment` | Task attachment |
| `Answer`, `ReasonedAnswer` | Task answer types |
| `User`, `Group` | Security principals |
| `Fact`, `Action`, `ObjectType` | Audit fact types |

  </TabItem>
  <TabItem value="search" label="Search">

| Class | Description |
|-------|-------------|
| `SearchRequest` | Search request object |
| `Criterion`, `Criteria` | Search criterion |
| `AndClause`, `OrClause` | Logical clause combinators |
| `Operators` | Search operators (EQUALS_TO, CONTAINS, etc.) |
| `Types` | Criterion data types (STRING, DATE, etc.) |
| `OrderClause` | Sort order |
| `FlowerFields` | Standard field names |
| `SearchContexts` | Search context types |
| `FieldAggregation` | Aggregation configuration |
| `ResultField` | Result field selection |

  </TabItem>
  <TabItem value="utilities" label="Utilities">

| Class | Description |
|-------|-------------|
| `RuleUtil` | Static helpers for tags, classes, and statuses |
| `ComponentHelper` | Component utility methods |
| `TagHelper` | Tag utility methods |
| `Lists`, `Sets`, `Maps` | Guava collection factories |
| `String`, `Boolean`, `Float`, `Integer`, `Date` | Java standard types |
| `IdentifiableString` | Identifiable string wrapper |
| `InternalFeatures` | Internal feature flags |

  </TabItem>
  <TabItem value="exceptions" label="Exceptions">

| Class | Description |
|-------|-------------|
| `ExceptionBuilder` | Create functional or technical exceptions |
| `FunctionalErrorCode` | Functional error code enum |
| `TechnicalErrorCode` | Technical error code enum |

  </TabItem>
</Tabs>

# Examples

## Creating a folder when creating a document

**AFTER / CREATE / DOCUMENT**

```javascript
var folder = ComponentBuilder.folder().classId('Folder').build();
folder.setName("Dossier " + component.getName());
util.getFolderService().create(Lists.newArrayList(folder));
util.getFolderService().addChildren(folder.getId(), Lists.newArrayList(ReferenceBuilder.from(component)), false);
```

## Creating an audit fact

**AFTER / CREATE / DOCUMENT — Record a business fact for traceability**

```javascript
logger.info("[CreateFactOnCreation] Build facts for " + component.getId());

var builder = FactBuilder.objectId(component.getId()).type(ObjectType.DOCUMENT);
builder.action("CREATE").description("Processing has been started.");
util.createFact(builder.build());
```

## Workflow state machine (task class transitions)

**BEFORE / ANSWER / TASK — Change task class based on the answer given**

```javascript
logger.info("[Workflow_OH] START");
var classId = RuleUtil.getClassId(component);
var answerId = component.getAnswer().getId().getValue();
logger.info("[Workflow_OH] classId=" + classId + ", answerId=" + answerId);

var start = "WKF_Step0_Creation";
var step1 = "WKF_Step1_Treatment";
var end = "WKF_Step2_End";

switch (classId) {
  case start:
    changeClassOnAnswer(answerId, "Initiate", step1);
    break;
  case step1:
    if (!changeClassOnAnswer(answerId, "Validate", end)) {
      changeClassOnAnswer(answerId, "Adjourn", start);
    }
    break;
  default:
}
logger.info("[Workflow_OH] END");

function changeClassOnAnswer(appliedAnswer, expectedAnswer, classToApply) {
  if (appliedAnswer === expectedAnswer) {
    util.changeClass(component, classToApply);
    logger.info("[Workflow_OH] Class changed to " + classToApply);
    return true;
  }
  return false;
}
```

## Search and conditionally create a virtual folder

**AFTER / CREATE / DOCUMENT — Create a business folder if it does not already exist**

```javascript
let refValue = RuleUtil.getTagValue(component, "NumReference");
let clientValue = RuleUtil.getTagValue(component, "NomClient");

let refCriterion = CriterionBuilder.name("NumReference").operator(Operators.EQUALS_TO)
    .type(Types.STRING).value(refValue).build();
let clientCriterion = CriterionBuilder.name("NomClient").operator(Operators.EQUALS_TO)
    .type(Types.STRING).value(clientValue).build();
let request = SearchRequestBuilder.init()
    .filter(FilterClauseBuilder.and().criterion(refCriterion).criterion(clientCriterion).build())
    .build();

let response = util.getVirtualFolderService().search(request);
if (response.getFound() == 0) {
  let vf = ComponentBuilder.virtualFolder().classId("BusinessFolder")
      .name(refValue + " - " + clientValue).build();
  vf.getTags().getTags().add(TagBuilder.name("NomClient").value(clientValue).build());
  vf.getTags().getTags().add(TagBuilder.name("NumReference").value(refValue).build());
  util.getVirtualFolderService().create([vf]);
}
```

## Modifying tags and ACLs

**BEFORE / ANSWER / TASK — Update tags and ACL on workflow step transition**

```javascript
var classId = RuleUtil.getClassId(component);
var answerId = component.getAnswer().getId().getValue();

if (classId == "Step0_Creation" && answerId === "Initiate") {
  util.changeClass(component, "Step1_Treatment");
  component.setAssignee("");
  component.getData().setACL("acl-treatment");
  util.setTagValue(component, "Status", "In Progress");
}
```

## Throwing exceptions

A BEFORE-phase script can prevent the operation from executing by throwing an exception. This only works when `StopOnException` is set to `true` in the registration.

**BEFORE — Reject the operation with a functional error**

```javascript
// Throw a functional exception (business rule violation)
throw ExceptionBuilder.createFunctionalException(FunctionalErrorCode.F00008);

// Throw a technical exception (system error)
throw ExceptionBuilder.createTechnicalException(TechnicalErrorCode.T00008);
```

:::info
To manually define this operation handler, the `com.flower.docs.core.tsp.operation.script.ScriptOperationHandler` identifier can be used as the value of the `OperationHandler` tag.
:::