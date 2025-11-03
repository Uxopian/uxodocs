---
title: "Operation context"
description: "Use the operation context of an operation"
date: "2002-01-27T13:20:01+02:00"
---


# Principle

When an operation is executed, the context in which it was performed is provided as input, and its type differs according to the original action. The variable `context` contains an object inherited from [`com.flower.docs.operation.api.OperationContext`](#javadoc-com-flower-docs-operation-api-OperationContext).
<br/>

# Action context definition 

Depending on the action to which the operation is subscribed, the operation context changes:
<br/>
-- ``CREATE``: [`com.flower.docs.operation.api.UpdateComponentOperationContext`](#javadoc-com-flower-docs-operation-api-UpdateComponentOperationContext). 
<br/>
-- ``UPDATE``: [`com.flower.docs.operation.api.UpdateComponentOperationContext`](#javadoc-com-flower-docs-operation-api-UpdateComponentOperationContext). 
<br/>
-- ``UPDATE_CONTENT``: [`com.flower.docs.operation.api.UpdateContentOperationContext`](#javadoc-com-flower-docs-operation-api-UpdateContentOperationContext). 
<br/>
-- ``ANSWER``: [`com.flower.docs.operation.api.TaskOperationContext`](#javadoc-com-flower-docs-operation-api-TaskOperationContext). 
<br/>
-- ``ASSIGN``: [`com.flower.docs.operation.api.TaskOperationContext`](#javadoc-com-flower-docs-operation-api-TaskOperationContext). 
