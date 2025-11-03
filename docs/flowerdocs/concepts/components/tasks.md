---
title: "The tasks"
description: "Manage your business or technical processes."
date: "2018-03-05T13:20:01+02:00"
---


:::info
FlowerDocs can be integrated with any workflow engine on the market.

In FlowerDocs terms, a workflow is a logical sequence of several classes of tasks where each step corresponds to a type of task (a class of tasks).

<br/>
__Example:__ ``1. Invoice import`` --> ``2. Accounting validation --> ``3. Overhead validation --> ``4. Payment``

These three stages correspond to three classes of tasks, each of which has two types of response: 

* Confirm
* Refuse
:::



# Attachments

When processing a task, it may be necessary for the user to add one or more components.
These documents are called task attachments and are globally defined by task class. 

In order to perform actions on attachments, the following permissions may be required: 

* Add attachment: `CREATE` for the component class to be created
* Update the content of an attachment: `UPDATE_CONTENT` for the component class to be created
* Delete an attachment: `DELETE_CONTENT`

_Note:__ These actions are not possible if the attachment definition is read-only. 
 
# Answers

When a user has finished filling in the necessary information for a task, they can select an answer from among those proposed.
These answers enable a workflow to move in one of the proposed directions.

To apply a response to a task, the ``APPLY_ANSWER`` permission is required.

<br/>
When applying a response, it is possible via API or WS to add parameters that will not be persisted on the task. 
This information can then be used within the operation subscriptions activated on the response.

# Assignment

To edit a task, the user must: 

* have the right to update the task: `UPDATE`
* be assigned to the processing of the task 

In order to assign a user to process a task, several means are available. 
From a technical point of view, all you need to do is fill in the task's ``assignee`` field with the identifier of the user, group or team to which the task should be assigned.

## Appropriation

From a user point of view, appropriating a task means assigning it to oneself. 
A task can be appropriated if it is not assigned to any user or to a team to which the logged-in user does not belong.
This type of assignment requires the ``APPROPRIATE`` permission.

It is also possible to assign a task to yourself that has already been assigned to another user if you have the ``APPROPRIATE_ALREADY_ASSIGNED`` permission.

<br/>

By task class, it is possible to<b>activate the self-assignment option</b>. So when a user opens an unassigned task and has the ``APPROPRIATE`` or ``APPROPRIATE_ALREADY_ASSIGNED`` right, the task will automatically be assigned to them.

Auto-assignment on task classes is disabled by default.

## Assignment

Assigning a task to a user consists in assigning a task from user A to user B.
This type of assignment can be made even if the task is already assigned to another user.

This type of assignment requires the ``ASSIGN`` permission.

:::info
To find out more, take a look at some references: 

* `Task`
* `Task class`
:::
