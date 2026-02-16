---
title: Component selection
sidebar_position: 2
description: Offer users a library of models
date: "2021-11-17T10:20:01+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: f66912135ed0771e642b1749a04347daef0344183324d25da7ad2f528f411dc9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Principle

The `SelectComponentPlugin` makes it easy for users to select a component corresponding to a set of criteria.
The criteria defined are used to execute a component search, the results of which are displayed in a selection popup.

# Use

| Key              | Type     | Description                                         |
| ---------------- | -------- | --------------------------------------------------- |
| `icon`           | String   | Selection popup icon                                |
| `title`          | String   | Selection popup title                               |
| `description`    | String   | Description displayed in selection popup header     |
| `category`       | String   | Component category to search (default: `DOCUMENT`)  |
| `criteria`       | Table    | List of search criteria                             |
| `fieldToDisplay` | String   | Field used to display a component (default: `name`) |
| `callback`       | Function | Function called after the selection validation      |

<Tabs>
  <TabItem value="basic" label="Basic">

```javascript
new SelectComponentPlugin({
    title: "My title",
    description: "Select a component",
    callback: (id, label) => {
        console.log("selected document: " + id);
    },
}).show();
```

  </TabItem>
  <TabItem value="with-criteria" label="With criteria">

```javascript
var criterion = new Criterion();
criterion.setName("classid");
criterion.setOperator("EQUALS_TO");
criterion.addValue("Folder");

new SelectComponentPlugin({
    icon: "fa fa-folder",
    title: "My title",
    description: "Select a folder",
    category: "FOLDER",
    criteria: [criterion],
    callback: (id, label) => {
        console.log("selected folder: " + id);
    },
}).show();
```

  </TabItem>
</Tabs>

# Model selection

Based on the `SelectComponentPlugin` plugin, the `SelectTemplatePlugin` plugin offers users a library of document templates.
By defining the type of model to be proposed, users can select the model to be used from the library.

<Tabs>
  <TabItem value="define-an-option" label="Define an option">

```javascript
new SelectTemplatePlugin({
  'type': 'MSWord',
  'callback': function(id, label){
    new DownloadWordPlugin({'template': id, 'filename': label}).download();

}).show();
```

  </TabItem>
</Tabs>
