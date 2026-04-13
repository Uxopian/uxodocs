---
title: Serial processing
sidebar_position: 11
date: "2026-04-01"
---

# Serial processing

:::info
Serial processing allows users to navigate through a list of documents or tasks one by one without having to return to the search results between each item.
:::

This feature is designed to save time during repetitive operations such as document indexing or task processing, by eliminating unnecessary back-and-forth between the result list and the item form.

## Availability

Serial processing can be activated on the following contexts:

| Context | Available |
| ------- | --------- |
| Document search | ✅ |
| Virtual folder (Menus)  | ✅ |
| Physical folder | ✅ |
| Search (from the search menu) | ✅ |
| Dashlets | ❌ |
| Document opened from a task | ❌ |

## How it works

When serial processing is active, opening a component starts a **session**. The session retains the original search or virtual folder context (including its sort order) and pre-loads the next eligible components in the background. When the user saves, responds to a task, or clicks **Next**, the next eligible component is displayed automatically.

The session ends when there are no more eligible components. The current component window closes and the user is returned to the menu from which the session originated.

### For documents

A document is eligible for serial processing if:
- it is **not reserved** by another user
- the current user has the **Update** permission on the component

When the user saves or clicks **Next**, the next document in the session is the next unreserved document on which the user has Update permission.

### For tasks

Eligibility rules differ depending on whether the task class uses **auto-assignment** or not.

#### With auto-assignment

The serial processing option is displayed if the task is:
- assigned to the current user, **or**
- assigned to nobody

When the user saves, responds or clicks **Next**, the next task shown is a task assigned to the current user, or a task assigned to nobody.

:::note
If the first task opened is assigned to another user, serial processing is not available.
:::

Opening a task via serial processing assigns it to the current user, just as opening it normally from the result list would.

#### Without auto-assignment

The serial processing option is displayed if the task is:
- assigned to the current user, **or**
- assigned to nobody and the current user has the **Self-assign** right

When the user saves, responds or clicks **Next**, the next task shown is:
- a task assigned to the current user, or
- an unassigned task that the current user has the right to self-assign

If the first task opened is assigned to another user, or is a task the user cannot self-assign, serial processing is not available.

:::note
Serial processing does not support assigning a task to another user, or self-assigning a task already assigned to someone else. These actions are considered exceptional and fall outside the scope of serial processing.
:::

## Component ordering

The components proposed during a session follow the sort order of the originating search or virtual folder — either the default sort configured by the integrator, or the sort applied by the user at the time the session started.

If needed, integrators can override the session query via the JS API to apply a custom filter or sort order.

## Activation

Serial processing is activated through the JS API. See the [JS API reference](/docs/flowerdocs/apis/jsapi/recherche/list-processing) for configuration details and examples.
