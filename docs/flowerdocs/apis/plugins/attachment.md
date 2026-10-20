---
title: Attachment action
sidebar_position: 3
description: Actions on a task attachment
date: "2021-12-02T10:20:01+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: 5049aef733894f10d7757ca5897e0d09d273093471af1d50310f051d221cfdeb
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Principle

Attachment plugins allow an action to be added to the configured attachment insert. This action allows to attach a component to the task, enabling it to be viewed in the viewer.

Several attachment plugins are thus available:

- `SearchAttachmentPlugin`
- `TemplateAttachmentPlugin`
- `CreateHTMLAttachmentPlugin`

A plugin for viewing attachment metadata is also available.

The constructors of these plugins accept a collection of options enabling them to be configured.
<Tabs>
<TabItem value="define-an-option" label="Define an option">

```javascript
new SearchAttachmentPlugin({
    '<option name>': <option value>
});
```

  </TabItem>
</Tabs>

The following options are common to the various attachment plugins:

| Key             | Type     | Description                                                                                                                                                                                  |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `attachmentId`  | String   | Attachment definition identifier. When set, the action is only added to the card of this attachment. When omitted, the action is added to every attachment card of the task and attaches the component to the attachment whose card was clicked |
| `classId`       | String   | Task class identifier: when set, the action is only added on tasks of this class                                                                                                            |
| `workflow`      | String   | Workflow identifier: when set, the action is only added on tasks of this workflow                                                                                                           |
| `title`         | String   | Action title (title of the selection popup in the case of `SearchAttachmentPlugin`)                                                                                                         |
| `icon`          | String   | Action Icon (Icon of the selection popup in the case of `SearchAttachmentPlugin`)                                                                                                           |
| `allowedPhases` | Table    | Task form phases in which the action is available, among `INSERT`, `MODIFY` and `READONLY` (default: `['MODIFY']`). Not used by `MetadataVisualizationAttachmentPlugin`, which is available in the `MODIFY` phase only |
| `postProcessor` | Function | Function called after attaching the attachment, with the arguments `(card, formAPI, component)`                                                                                             |
| `canAttach`     | Function | Function defining when the action must be present, called with the arguments `(card, definition, formAPI)` and returning a boolean                                                          |

The actions of `SearchAttachmentPlugin`, `TemplateAttachmentPlugin` and `CreateHTMLAttachmentPlugin` are only added to an empty attachment card whose definition is not read-only.

Each plugin instance stays on its own attachment: two plugins of the same kind bound to different attachments, through `attachmentId`, each drive the action of their own card only.

## SearchAttachmentPlugin

The plugin `SearchAttachmentPlugin` adds a search action to an attachment insert. This action opens a popup allowing you to select, from the results of a search, a component to be added as a task attachment.

When the attachment definition is multivalued, the popup allows several components to be selected: all of them are attached to the task at once, and `postProcessor` is called once for each attached component. When the definition is single-valued, a single component can be selected.

| Key               | Type     | Description                                                                                                                       |
| ----------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `template`        | String   | Identifier of the search form to be displayed in the selection popup (default: `DefaultSearch`)                                   |
| `category`        | String   | Component category to search (default: `DOCUMENT`)                                                                                |
| `description`     | String   | Description displayed in the selection popup header                                                                               |
| `criteriaBuilder` | Function | Function building the list of search criteria from the task context, called with the arguments `(card, task, definition, formAPI)` |
| `criteria`        | Table    | Static list of search criteria. **Deprecated**: use `criteriaBuilder`                                                              |

The search executed by the popup is restricted with:

- the class of the attachment definition, when the definition is not open to every class (`*`)
- the criteria of the `criteria` option, if any
- the criteria returned by `criteriaBuilder`

`criteriaBuilder` is called each time the user opens the selection popup from an attachment card, so the criteria reflect the task as it is at that moment. Its arguments are:

| Argument     | Description                                                     |
| ------------ | --------------------------------------------------------------- |
| `card`       | Attachment card on which the action was clicked                 |
| `task`       | Task being displayed                                            |
| `definition` | Attachment definition of the card                               |
| `formAPI`    | API of the task form, to read the values being entered          |

The function must return a table of criteria, an empty table when no criterion applies.

<Tabs>
  <TabItem value="basic" label="Basic">

```javascript
new SearchAttachmentPlugin({
    attachmentId: '<AttachmentId>',
    title: 'Search for an attachment',
    postProcessor: function(card, formAPI, component) {
        console.info('Component has been attached: ', component.getId());
    }
}).bind();
```

  </TabItem>
  <TabItem value="with-criteria-builder" label="With dynamic criteria">

The search only returns documents whose `Reference` tag holds the same value as the task:

```javascript
new SearchAttachmentPlugin({
    attachmentId: '<AttachmentId>',
    title: 'Search for an attachment',
    category: 'DOCUMENT',
    allowedPhases: ['INSERT', 'MODIFY'],
    criteriaBuilder: function(card, task, definition, formAPI) {
        var reference = task.getTagValue('Reference');
        if (!reference) {
            return [];
        }

        var criterion = new Criterion();
        criterion.setName('Reference');
        criterion.setOperator('EQUALS_TO');
        criterion.addValue(reference);

        return [criterion];
    }
}).bind();
```

  </TabItem>
  <TabItem value="with-criteria" label="With static criteria (deprecated)">

```javascript
var criterion = new Criterion();
criterion.setName('classid');
criterion.setOperator('EQUALS_TO');
criterion.addValue('OutgoingMail');

new SearchAttachmentPlugin({
    attachmentId: '<AttachmentId>',
    title: 'Search for an attachment',
    criteria: [criterion],
    category: 'DOCUMENT'
}).bind();
```

  </TabItem>
</Tabs>

:::info
The plugins are JavaScript scripts deployed in the scope as `Script` documents: `attachmentPlugin.js` declares the classes the plugins extend and must be registered before `searchAttachmentPlugin.js`, itself registered before the scripts instantiating the plugin. The eProcess scope carries both scripts and uses `SearchAttachmentPlugin` to attach existing documents to its tasks.
:::

## TemplateAttachmentPlugin

The plugin `TemplateAttachmentPlugin` adds an action for attaching a document generated from a Microsft Word template. By default, the plugin opens the template in FlowerDocs Companion, if installed on the user workstation. If this is not the case, or if download mode is enabled, then the generated document is downloaded.

| Key            | Type     | Description                                                 |
| -------------- | -------- | ----------------------------------------------------------- |
| `downloadMode` | Boolean  | Indicates whether the created document should be downloaded |
| `instanciator` | Function | Function for programmatically indexing the component        |

## MetadataVisualizationAttachmentPlugin

This plugin allows you to view the data in the attachment without changing its location. The data to be visualized is opened in an OffMenu.

| Key    | Type    | Description                                                                  |
| ------ | ------- | ---------------------------------------------------------------------------- |
| `over` | Boolean | Indicates whether the OffMenu should be displayed on top of the current page |

The plugin's OffMenu is closed when it is relocated.
