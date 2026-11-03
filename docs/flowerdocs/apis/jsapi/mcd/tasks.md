---
title: Tasks & processes
sidebar_position: 5
description: Handling tasks in JavaScript
date: "2004-02-03"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: 42fbfb1be27a92a3dac2c1f529c32ce8f405ddef5ffe2aa803a71c21f3d550cb
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Handling attachments

To contextualize task processing, components can be attached to a task. This is the notion of an attachment.
Task attachments can be manipulated using the JS API.

The following two functions can be used to add components as task attachments:

- `addAttachment(attachmentId, componentId, category)` to attach a single component from its identifier `componentId`
- `addAttachments(attachmentId, componentIds, category)` to attach several components based on their identifier provided in an array `componentIds`

Use of these functions requires input of the attachment identifier and the expected component category (defined in the task class).
Changes to task attachments need to be saved using the `create` or `update` functions exposed by the `JSAPI.get().task()` object.

<Tabs>
  <TabItem value="attach-document-to-a-task" label="Attach document to a task">

```javascript
JSAPI.get().task().get([id], function (tasks) {
    let task = tasks[0];
    task.addAttachments("Appendices", documentId, "DOCUMENT");

    JSAPI.get().task().update([task], function (updated) {
        console.info("The document has been attached to task");
    });
});
```

  </TabItem>
</Tabs>

Based on the same principle, the following function retrieves existing attachments:

- `getAttachmentIds(attachmentId)` to retrieve the component identifiers linked to this attachment.

## Responding to tasks

### Applying an answer

The notion of task responses enables users to make decisions about task processing.
For each decision taken, a specific behavior can thus be added to take account of this decision and apply the appropriate treatment.

An answer can be applied to one or more tasks using the function `answer(ids, answer)` with the following parameters :

- a table of task identifiers
- a `Answer` (or `ReasonedAnswer`) object representing the answer to be applied

<Tabs>
  <TabItem value="answer-to-a-task" label="Answer to a task">

```javascript
var taskAPI = JSAPI.get().task();
taskAPI.answer([id], new Answer("Validate"), function () {
    JSAPI.get().getNotificationAPI().sendInformation("Answer was applied");
});
```

  </TabItem>
</Tabs>

### Reacting to an answer

The JS API provides two hooks that run a function around the application of an answer, whether triggered from a task form or from `answer(ids, answer)`:

| Function | Description |
| --- | --- |
| `registerBeforeAnswer(function)` | Called before the answer is sent to **FlowerDocs Core**: once the task has been saved from a task form, once the tasks have been loaded from `answer(ids, answer)` |
| `registerAfterAnswer(function)` | Called once **FlowerDocs Core** has applied the answer: before the task form is closed, or before the success callback of `answer(ids, answer)` is called |

Each registered function receives:

- `tasks`: the tasks the answer is applied to
- `answer`: the `Answer` object being applied — `getId()` returns its identifier
- `executor`: controls whether the process continues immediately or waits

By default the process continues once the function returns. To delay it, call `executor.hold()`: the process waits until `executor.resume()` is called. While held, a `registerBeforeAnswer` function delays the answer being sent; a `registerAfterAnswer` function keeps the task form open.

The hooks are called for every answer of every task class: test `answer.getId()` or `getClassId()` to react only to the relevant ones. Several functions can be registered and are called in order. Register them once, from a script loaded at startup.

In the example below, the current user is recorded on the task before the `Validate` answer is sent, and a notification is displayed once the answer has been applied:

<Tabs>
  <TabItem value="react-before-answer-example" label="React before answer">

```javascript
JSAPI.get().task().registerBeforeAnswer(function (tasks, answer, executor) {
    if (answer.getId() != "Validate") {
        return;
    }

    executor.hold();

    var userId = JSAPI.get().getUserAPI().getUserId();
    tasks.forEach(function (task) {
        task.addTag("Reviewer", userId, false);
    });

    JSAPI.get().task().update(tasks, function () {
        executor.resume();
    }, function (error) {
        console.error("Cannot record the reviewer: " + error);
        executor.resume();
    });
});
```

  </TabItem>
  <TabItem value="react-after-answer-example" label="React after answer">

```javascript
JSAPI.get().task().registerAfterAnswer(function (tasks, answer, executor) {
    if (answer.getId() == "Validate") {
        JSAPI.get().getNotificationAPI().sendInformation(tasks.length + " task(s) validated");
    }
});
```

  </TabItem>
</Tabs>

:::warning
- An answer hook cannot cancel an answer — `executor` can only delay it. To prevent users from giving an answer, hide its action instead: in a task form, remove it from `formAPI.getActions().getTaskActions()` (see [Actions](/docs/flowerdocs/apis/jsapi/actions)); in the contextual menu, use `registerForActionDisplayResolution` on the `answers` group (see [Shortcuts](/docs/flowerdocs/apis/jsapi/shortcut)).
- A function calling `executor.hold()` must call `executor.resume()` on every path, including on error — otherwise the process never ends.
- An error thrown by a function stops the process: the following functions and the answer are not run. Catch errors inside the function.
- When **FlowerDocs Core** refuses the answer, `registerAfterAnswer` functions are not called: the error is displayed to the user from a task form, or passed to the error callback of `answer(ids, answer)`.
- When an answer is applied asynchronously from a task form, the form closes before the answer is sent and `executor.hold()` no longer delays anything visible.
:::

### Choosing synchronous or asynchronous execution

When a user clicks an answer on a task form, the answer is applied in one of two ways:

- **asynchronously**: the form is closed at once, the user is notified that the answer is in progress, and an error is notified on the task if the answer fails
- **synchronously**: a loading screen is displayed until the answer has been applied, then the form is closed

By default, the answers clicked on a task form are applied asynchronously.

The `TaskAnswerExecutionAPI` helper lets a script choose the mode for each answer with its `registerForAsyncAnswerResolution(function)` function.
The function takes as input the `tasks` table, the `answer` object and a `callback` object, and must call `callback.onSuccess(value)` with:

- `true` to apply the answer asynchronously
- `false` to apply it synchronously
- `null` to keep the default mode

<Tabs>
  <TabItem value="resolve-answer-execution" label="Choose the execution mode">

```javascript
var answerExecution = JSAPI.get().getHelperFactory().getTaskAnswerExecutionAPI();

answerExecution.registerForAsyncAnswerResolution(function (tasks, answer, callback) {
    if (answer.getId() == "Validate") {
        callback.onSuccess(false);
        return;
    }

    callback.onSuccess(null);
});
```

  </TabItem>
</Tabs>

The function is called after the `registerBeforeAnswer` functions, and the answer is not applied until `callback.onSuccess(value)` is called.
Only one function can be registered: registering a new one replaces the previous one.
It only applies to the answers clicked on a task form: the `answer(ids, answer)` function always waits for the answer to be applied before calling its success callback.

## How to assign tasks

### Assigning tasks

A task must be assigned to a user in order to be processed. FlowerDocs provides several assignment mechanisms, including the JS API.
The `assign(ids, userId)` function lets you assign one or more tasks to a user using :

- a table of task identifiers
- user ID to assign tasks to

<Tabs>
  <TabItem value="assign-task-to-a-user" label="Assign task to a user">

```javascript
JSAPI.get().task().assign([id], "sarah.hubert", function () {
    console.info("The task " + id + " has been assigned");
});
```

  </TabItem>
</Tabs>

The user to whom a task is assigned can be retrieved using the `getAssignee()` function exposed on the `Task` object.

### Responding to an assignment

Assigning a task to a user may in some cases require actions to be taken in the graphical user interface.
To achieve this, the JS API provides hooks that allow you to react to the launch of the assignment process with a native GUI action:

- from an indexing form with assignment and appropriation actions
- from the context menu opened from search results with these same actions

<br/>
These hooks can be used to react or interrupt the process, either before the request is sent to **FlowerDocs Core** or afterwards. 
An assignment hook is a function taking as input the following three parameters (supplied by **FlowerDocs GUI**) :

- a table of tasks to be assigned
- user ID to assign tasks to
- a `executor` object to block execution of the assignment and/or resume it later with its context

<Tabs>
  <TabItem value="react-before-assign" label="React before assign">

```javascript
JSAPI.get().task().registerBeforeAssign(function (tasks, assignee, executor) {
    // Action to be taken before assignment
});
```

  </TabItem>
  <TabItem value="react-after-assign" label="React after assign">

```javascript
JSAPI.get().task().registerAfterAssign(function (tasks, assignee, executor) {
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
JSAPI.get().task().registerBeforeAssign(function (tasks, assignee, executor) {
    executor.hold();
    setTimeout(function () {
        executor.resume();
    }, 5000);
});
```

  </TabItem>
  <TabItem value="react-after-assign" label="React after assign">

```javascript
JSAPI.get().task().registerAfterAssign(function (tasks, assignee, executor) {
    executor.hold();
    setTimeout(function () {
        executor.resume();
    }, 5000);
});
```

  </TabItem>
</Tabs>

## Process information

| Functions                          | Description                                    |
| ---------------------------------- | ---------------------------------------------- |
| `getWorkflow()`                    | Determine task processing identifier           |
| `setWorkflow(String workflow)`     | Define task processing identifier              |
| `getParticipants()`                | Identify the identities involved in processing |
| `addParticipant(String participant)` | Adding a participant to a task                 |
