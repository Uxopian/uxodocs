---
title: Operation context
sidebar_position: 1
description: Use the operation context of an operation
date: "2002-01-27T13:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: 88a72f7cc37b22b2f6af25f61132b126b7729fcbdd1b7a79358613e457523165
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
