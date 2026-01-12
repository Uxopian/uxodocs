---
title: Subscribing to an operation
description: Determine which operations to respond to
date: "2001-03-28T13:20:01+02:00"
custom_edit_url: null
last_update:
    date: "2025-12-02T14:38:43.134Z"
    author: CI/CD Bot
content_hash: 301d955b5b50390ac0a2cf33fbb9579d40f30940fe81eff2f677065a3076b239
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Subscription

An operation subscription is a `OperationHandlerRegistration` class technical document.
The tags referenced by this class are used to configure the subscription:

<Tabs>
  <TabItem value="configuration" label="Configuration">

| Tag                 | Type         | Description                                                                                                                                                  |
| ------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OperationHandler`  | _string_     | OperationHandler Java class or OperationHook URL                                                                                                             |
| `ExecutionPhase`    | _choicelist_ | Operation execution phase                                                                                                                                    |
| `Action`            | _choicelist_ | Operation action                                                                                                                                             |
| `ObjectType`        | _choicelist_ | Object type to respond to                                                                                                                                    |
| `Enabled`           | _boolean_    | Determines whether the subscription is active or inactive                                                                                                    |
| `Asynchronous`      | _boolean_    | Determines whether the OperationHandler should be executed asynchronously or not                                                                             |
| `RegistrationOrder` | _integer_    | Scheduling different subscriptions to the same operation                                                                                                     |
| `StopOnException`   | _boolean_    | Determines whether operation execution should be stopped in the event of an exception (_only if synchronous_)                                                |
| `Authorization`     | _string_     | basic authorization string to be supplied to the hook (generated online using [blitter](https://www.blitter.se/utils/basic-authentication-header-generator/) |

  </TabItem>
</Tabs>

# Filters

## Filter evaluation

For each operation subscription, execution filters can be defined through a [`com.flower.docs.domain.search.SearchRequest`](#javadoc-com-flower-docs-domain-search-SearchRequest) object. These filters can be used to restrict the contexts in which an operation handler is executed. In this way, a subscription can be limited to components that meet the configured criteria.

:::info
To restrict the triggering of a billing process to invoices, the administrator sets the class filter equal to `Bill`.
:::

Filters are evaluated according to the context in which an operation is performed. The data that can be used to filter operations differs according to the type of operation.

An operation performed on a component exposes the component concerned through its context. In this way, its data (tags, owner, class, etc.) can be used to evaluate the defined filters. Whereas when a search is run, filters are evaluated on its criteria.

## Storage

Filters are stored through a [`com.flower.docs.domain.search.SearchRequest`](#javadoc-com-flower-docs-domain-search-SearchRequest) object. When saved, this object is serialized (XML) and saved as the document file used to define the subscription.
The naming of the file containing the filters is imposed. Its name should be `request`.

## Special features

Some operations allow the use of specific criteria.

### Assignment

The `Id` criterion corresponds to the identifier of the user to whom the task has been assigned.
Whereas the `criterion assigned to` corresponds to the user to whom the task was assigned before the operation.

### Task response

The `Id` criterion corresponds to the identifier of the user to whom the task has been assigned.

### Folder contents

When performing an operation on the contents of a folder (addition or deletion), the `Id` criterion corresponds to the class identifier of the component added to or deleted from the folder.

### Search

During a search, subscription filters can be used to react to the execution of specific searches. The filters are then compared with the search criteria.

Filter operators are interpreted as follows:

- `EQUALS_TO` presence of the criterion in the request with the indicated value.
- `CONTAINS`: presence of the criterion in the request with a value containing the string indicated in the filter.
- `STARTS_WITH`: presence of the criterion in the request with a value starting with the character string indicated in the filter.
- `ENDS_WITH`: presence of the criterion in the request with a value ending in the string indicated in the filter.
- `DIFFERENT` no criterion or present with a value different from that indicated in the filter.

For Date criteria, specific operators are used and resolved, such as :

- `GREATER_THAN` presence of the criterion in the request with a value greater than that indicated in the filter.
- `LESS_THAN` presence of the criterion in the request with a value lower than that indicated in the filter.
- `BETWEEN`: The criterion must be present in the SearchRequest with a value between the two specified.

:::info

- The `EQUALS_TO` and `DIFFERENT` operators are case-sensitive.
  <br/>
- For criteria representing user identifiers, the `${user.id}` value can be defined. This value indicates the current user ID for the session.
  :::
