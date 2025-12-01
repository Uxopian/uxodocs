---
title: Tasks & processes
description: Handling tasks in JavaScript
date: '2004-02-03'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 7129f5b67bc7db44ccf1621407badb983d4d6e04319801ba8334bdda0eb2c8aa
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';




# Handling attachments

To contextualize task processing, components can be attached to a task. This is the notion of an attachment. 
Task attachments can be manipulated using the JS API. 

The following two functions can be used to add components as task attachments: 

* `addAttachment(attachmentId, componentId, category)` to attach a single component from its identifier `componentId`
* `addAttachments(attachmentId, componentIds, category)` to attach several components based on their identifier provided in an array `componentIds`

Use of these functions requires input of the attachment identifier and the expected component category (defined in the task class).
Changes to task attachments need to be saved using the `create` or `update` functions exposed by the `JSAPI.get().task()` object.

<Tabs>
  <TabItem value="attach-document-to-a-task" label="Attach document to a task">

```javascript
JSAPI.get().task().get([id], function (tasks) {
    let task = tasks[0];
    task.addAttachments('Appendices', documentId, 'DOCUMENT');
    JSAPI.get().task().update([task], function (updated) {
        console.info('The document has been attached to task');
    });
});
```

  </TabItem>
</Tabs>



Based on the same principle, the following function retrieves existing attachments: 

* `getAttachmentIds(attachmentId)` to retrieve the component identifiers linked to this attachment.

# Responding to tasks

The notion of task responses enables users to make decisions about task processing. 
For each decision taken, a specific behavior can thus be added to take account of this decision and apply the appropriate treatment. 

An answer can be applied to one or more tasks using the function `answer(ids, answer)` with the following parameters : 

* a table of task identifiers
* a `Answer` (or `ReasonedAnswer`) object representing the answer to be applied

<Tabs>
  <TabItem value="answer-to-a-task" label="Answer to a task">

```javascript
var taskAPI = JSAPI.get().task();
taskAPI.answer([id], new Answer("Validate"), function(){
    JSAPI.get().getNotificationAPI().sendInformation("Answer was applied");
});
```

  </TabItem>
</Tabs>


# How to assign tasks

## Assigning tasks

A task must be assigned to a user in order to be processed. FlowerDocs provides several assignment mechanisms, including the JS API. 
The `assign(ids, userId)` function lets you assign one or more tasks to a user using : 

* a table of task identifiers
* user ID to assign tasks to

<Tabs>
  <TabItem value="assign-task-to-a-user" label="Assign task to a user">

```javascript
JSAPI.get().task().assign([id], 'sarah.hubert', function () {
    console.info('The task ' + id + ' has been assigned');
});
```

  </TabItem>
</Tabs>


The user to whom a task is assigned can be retrieved using the `getAssignee()` function exposed on the `Task` object.

## Responding to an assignment 

Assigning a task to a user may in some cases require actions to be taken in the graphical user interface. 
To achieve this, the JS API provides hooks that allow you to react to the launch of the assignment process with a native GUI action: 

* from an indexing form with assignment and appropriation actions
* from the context menu opened from search results with these same actions

<br/>
These hooks can be used to react or interrupt the process, either before the request is sent to **FlowerDocs Core** or afterwards. 
An assignment hook is a function taking as input the following three parameters (supplied by **FlowerDocs GUI**) : 

* a table of tasks to be assigned
* user ID to assign tasks to
* a `executor` object to block execution of the assignment and/or resume it later with its context




<Tabs>
  <TabItem value="react-before-assign" label="React before assign">

```javascript
JSAPI.get().task().registerBeforeAssign(function(tasks, assignee, executor){
  // Action to be taken before assignment
});
```

  </TabItem>
  <TabItem value="react-after-assign" label="React after assign">

```javascript
JSAPI.get().task().registerAfterAssign(function(tasks, assignee, executor){
  // Action to be taken after the assignment process
});
```

  </TabItem>
</Tabs>


The `executor` object supplied as hook input is used to block the assignment process in order to wait for asynchronous processing. 
In fact, when asynchronous processing needs to be finalized before the assignment process is resumed, it can be interrupted by calling the `executor.hold()` function and resumed once completed with `executor.resume()`.

In the examples below, asynchronous processing is simulated by using a 5-second timeout: 

<Tabs>
  <TabItem value="react-before-assign" label="React before assign">

```javascript
JSAPI.get().task().registerBeforeAssign(function(tasks, assignee, executor){
    executor.hold();
    setTimeout(function(){
      executor.resume();
    }, 5000);
});
```

  </TabItem>
  <TabItem value="react-after-assign" label="React after assign">

```javascript
JSAPI.get().task().registerAfterAssign(function(tasks, assignee, executor){
    executor.hold();
    setTimeout(function(){
      executor.resume();
    }, 5000);
});
```

  </TabItem>
</Tabs>


# Process information

| Functions                                                                   | Description                                                                    |
|-----------------------------------------------------------------------------|--------------------------------------------------------------------------------|
|getWorkflow()                                                                | Determine task processing identifier                             |
|setWorkflow(String workflow)                                                 | Define task processing identifier                                |                
|getParticipants()                                                            | Identify the identities involved in processing                       |        
|addParticipant(String participant)                                           | Adding a participant to a task                                             |        
