---
title: Operation context
description: Use the operation context of an operation
date: "2002-01-27T13:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 3948c99a07db883a7b4b9ae14c7555b3c60ab9a1ea27248f47758d6d6fe02ea4
---

# Principle

When an operation is executed, the context in which it was performed is provided as input, and its type differs according to the original action. The variable `context` contains an object inherited from [`com.flower.docs.operation.api.OperationContext`](#javadoc-com-flower-docs-operation-api-OperationContext).
<br/>

# Action context definition

Depending on the action to which the operation is subscribed, the operation context changes:
<br/>
-- `CREATE`: [`com.flower.docs.operation.api.UpdateComponentOperationContext`](#javadoc-com-flower-docs-operation-api-UpdateComponentOperationContext).
<br/>
-- `UPDATE`: [`com.flower.docs.operation.api.UpdateComponentOperationContext`](#javadoc-com-flower-docs-operation-api-UpdateComponentOperationContext).
<br/>
-- `UPDATE_CONTENT`: [`com.flower.docs.operation.api.UpdateContentOperationContext`](#javadoc-com-flower-docs-operation-api-UpdateContentOperationContext).
<br/>
-- `ANSWER`: [`com.flower.docs.operation.api.TaskOperationContext`](#javadoc-com-flower-docs-operation-api-TaskOperationContext).
<br/>
-- `ASSIGN`: [`com.flower.docs.operation.api.TaskOperationContext`](#javadoc-com-flower-docs-operation-api-TaskOperationContext).
