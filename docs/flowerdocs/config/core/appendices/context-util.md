---
title: ContextUtil
sidebar_position: 1
date: "2002-03-28T13:20:01+02:00"
custom_edit_url: null
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: 38c1236e75557d60ff8b4407853f1c89161414a3273ba62755c78f455567a1a9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Access to services

This object exposes methods for accessing and interacting with the services exposed by **FlowerDocs Core**:

<Tabs>
  <TabItem value="services" label="Services">

| Name                              | Description                             |
| --------------------------------- | --------------------------------------- |
| `getDocumentService()`            | Get document management service         |
| `getVersionService()`             | Get document version management service |
| `getFolderService()`              | Get folder management service           |
| `getTaskService()`                | Get task management service             |
| `getVirtualFolderService()`       | Get virtual folder management service   |
| `getService(Component component)` | Get component management service        |

  </TabItem>
  <TabItem value="data-model" label="Data model">

| Name                                   | Description                            |
| -------------------------------------- | -------------------------------------- |
| `getClassService(Component component)` | Get component class management service |
| `getTagClassService()`                 | Get tag class management service       |
| `getAclService()`                      | Get ACL management service             |

  </TabItem>
  <TabItem value="identity" label="Identity">

| Name                | Description                  |
| ------------------- | ---------------------------- |
| `getUserService()`  | Get users management service |
| `getGroupService()` | Get group management service |

  </TabItem>
  <TabItem value="others" label="Others">

| Methods                   | Description                                                             |
| ------------------------- | ----------------------------------------------------------------------- |
| `createFact(Fact fact)`   | Create a business fact                                                  |
| `getFeatureService()`     | Get the service accessing information from FlowerDocs internal features |
| `getReservationService()` | Get reservation management service                                      |

  </TabItem>
</Tabs>

# Component persistence

The following methods can be used to modify a component:

<Tabs>
  <TabItem value="save" label="Save">

| Methods                       | Description                                                                |
| ----------------------------- | -------------------------------------------------------------------------- |
| `create(Component component)` | Create the component supplied as input and return the one actually created |
| `update(Component component)` | Modify the component supplied as input                                     |

  </TabItem>
  <TabItem value="data" label="Data">

| Methods                                            | Description                                                                                                                         |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `changeClass(Component component, String classId)` | Modify the class of the component supplied as input and propagate only the tags in common between the initial class and the new one |

  </TabItem>
  <TabItem value="task" label="Task">

| Methods                     | Description                             |
| --------------------------- | --------------------------------------- |
| `getAttachments(Task task)` | Get the components attached to the task |

  </TabItem>
</Tabs>

# RuleUtil

The other methods are exposed in another object named `RuleUtil`:
