---
title: ContextUtil
sidebar_position: 1
date: "2002-03-28T13:20:01+02:00"
custom_edit_url: null
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: 38c1236e75557d60ff8b4407853f1c89161414a3273ba62755c78f455567a1a9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Overview

Two utility objects are available in operation handler scripts. They serve different purposes:

| Object | Access | Purpose |
|--------|--------|---------|
| `util` | Instance variable | Service access, component persistence, fact creation — any operation that **interacts with FlowerDocs Core** |
| `RuleUtil` | Static class reference | In-memory component helpers — read/write tags, classes, and statuses **without calling FlowerDocs Core services** |

`util` is an instance of `RuleContextUtil` (which extends `RuleUtil`). Because it is an instance, call its methods as `util.methodName(...)`.

`RuleUtil` is a static class reference injected by the script engine. Because all its methods are static, call them as `RuleUtil.methodName(...)`.

:::info
Since `RuleContextUtil` extends `RuleUtil`, calling static methods through the `util` instance (e.g., `util.setTagValue(...)`) also works in GraalJS. However, the recommended convention is to use `RuleUtil` for static calls and `util` for instance calls, to make the intent clear.
:::

# Access to services


This object exposes methods for accessing and interacting with the services exposed by **FlowerDocs Core**:

<Tabs>
  <TabItem value="services" label="Services">

| Name                              | Description                                                   |
| --------------------------------- | --------------------------------------------------------------|
| `getDocumentService()`            | Get document management service                               |
| `getVersionService()`             | Get document version management service                       |
| `getFolderService()`              | Get folder management service                                 |
| `getTaskService()`                | Get task management service                                   |
| `getVirtualFolderService()`       | Get virtual folder management service                         |
| `getService(Component component)` | Get the appropriate management service for the component type |

  </TabItem>
  <TabItem value="data-model" label="Data model">

| Name                                   | Description                            |
| -------------------------------------- | -------------------------------------- |
| `getClassService(Component component)` | Get component class management service |
| `getTagClassService()`                 | Get tag class management service       |
| `getAclService()`                      | Get ACL management service             |

  </TabItem>
  <TabItem value="identity" label="Identity">

| Name                | Description                  |
| ------------------- | ---------------------------- |
| `getUserService()`  | Get users management service |
| `getGroupService()` | Get group management service |

  </TabItem>
  <TabItem value="others" label="Others">

| Methods                   | Description                                                             |
| ------------------------- | ----------------------------------------------------------------------- |
| `createFact(Fact fact)`   | Create a business fact                                                  |
| `getNotificationService()`| Get push notification service                                           |
| `getFeatureService()`     | Get the service accessing information from FlowerDocs internal features |
| `getReservationService()` | Get reservation management service                                      |

  </TabItem>
</Tabs>

# Component persistence

The following methods can be used to persist or transform a component:

<Tabs>
  <TabItem value="save" label="Save">

| Methods                       | Description                                                                |
| ----------------------------- | -------------------------------------------------------------------------- |
| `create(Component component)` | Create the component and return the one actually created                   |
| `update(Component component)` | Modify the component and return the updated version                        |

  </TabItem>
  <TabItem value="data" label="Data">

| Methods                                            | Description                                                                                                                         |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `changeClass(Component component, String classId)` | Modify the class of the component and propagate only the tags in common between the initial class and the new one                   |
| `createDocument(Task task, String classId)`        | Create a new Document from a task's attached files, with the given class                                                            |

  </TabItem>
  <TabItem value="task" label="Task">

| Methods                     | Description                             |
| --------------------------- | --------------------------------------- |
| `getAttachments(Task task)` | Get the components attached to the task |

  </TabItem>
</Tabs>

# RuleUtil - Static helpers

`RuleUtil` methods are **static**: they operate on objects already in memory without making service calls. Use them to read or modify tag values, class identifiers, and statuses on the `component` variable.

<Tabs>
  <TabItem value="data" label="Data">

| Methods | Description |
|-----|-------------|
|`getClassId(Component component)` | Get component class value otherwise empty|
|`setClassId(Component component, String classId)` | Set component class|
|`getStatus(Component component)` | Get component status value|
|`setStatus(Component component, Status status)` | Set component status value|

  </TabItem>
  <TabItem value="tags" label="Tags">

| Methods | Description |
|-----|-------------|
|`getTagValue(Component component, String tagName)` | Get the first tag value otherwise null|
|`getTagValues(Component component, String tagName)` | Get the list of tag values otherwise null|
|`setTagValue(Component component, String tagName, String value)` | Set a tag value by modifying its value if it exists, otherwise by adding a tag|
|`setTagValues(Component component, String tagName, List<String> values)` | Set the list of tag values by modifying its value if it exists, otherwise by adding a tag|
|`setTagReadOnly(Component component, String tagName, boolean readonly)` | Set a tag to read-only or read-write|
|`addTagValue(Component component, String tagName, String value)` | Add a value to an existing tag or add the tag|
|`addTagValues(Component component, String tagName, List<String> values)` | Add a list of values to an existing tag or add the tag|

  </TabItem>
  <TabItem value="task" label="Task">

| Methods | Description |
|-----|-------------|
|`getAnswerId(Task task)` | Get the last answer applied to a task|

  </TabItem>
  <TabItem value="others" label="Others">

| Methods | Description |
|-----|-------------|
|`log(String message)` | Display in logs a message prefixed by `[Drools] ` in `INFO`|

  </TabItem>
</Tabs>

# Usage examples

**Reading tags and calling services**

```javascript
// RuleUtil: read tag values in memory (static call)
var clientName = RuleUtil.getTagValue(component, "NomClient");
var classId = RuleUtil.getClassId(component);

// util: call services (instance call)
util.changeClass(component, "NewClass");
util.update(component);

// util: access a service and perform a search
var request = SearchRequestBuilder.init()
    .filter(FilterClauseBuilder.and()
        .criterion(CriterionBuilder.name("NomClient").operator(Operators.EQUALS_TO)
            .type(Types.STRING).value(clientName).build())
        .build())
    .build();
var response = util.getVirtualFolderService().search(request);
```
