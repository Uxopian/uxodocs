---
title: Standard jobs
date: '2004-03-21T13:21:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 7272a8aeab8f29eb1c3148748bdbcf2308d00137fd7bdf531c41a12f98c29e4c
---



# Create

The CLM can be used to create a scope from a [template](/install/clm/template.md) using the `create` job.  

```properties
<clm> create --template=<template> --scope=<scope> --admin=<admin>
```
<br/>
__Parameters:__

| Parameter       | Description                                                                |
|-----------------|----------------------------------------------------------------------------|
| template        | Template identifier (name of the folder in which it is located)            |
| scope           | Identifier of the scope to be created                                      |
| admin           | Name of the user who owns the new scope                                    |
| ws.url          | The FlowerDocs CORE url. Example : localhost:8081/core/services            |
| user            | The admin account ID                                                       |
| password        | The password for the admin account                                         |

# Delete

To delete a scope, you can use the ``delete`` job, such as: 

```properties
<clm> delete --scope=<scope>
```

# Reset

Jobs can be merged; resetting a scope can be done using the `delete` and `create` jobs: 

```properties
<clm> delete create --template=<template> --scope=<scope>
```
	
# Update

The ``update`` job is used to update an existing scope.

* Components present in the template but absent from the initial scope will be added.
* Components that differ from the initial scope will be updated.
* Documents present in the initial scope but absent from the template will not be deleted.

This job can be used, for example, to update a scope's configuration without deleting existing documents.

The update can proceed even if the template doesn't include a scope.xml file. In this case, objects that may be configured in this file, as teams, and which have been created after the scope initialisation will not be removed.

<br/>
__Example:__ Update ``HR`` scope

```properties
<clm> update --template=simple --scope=HR
```

There are also more specific update jobs. These allow you to update only a certain type of configuration.

| Job                    | Description                                                                                    |
|------------------------|------------------------------------------------------------------------------|
| update-config          | Updating configuration files                                                 |
| update-model           | Update component classes, tags, categories and workflow                      |
| update-content         | Updating content (documents, folders, virtual folders and tasks)             |
| update-scope           | Update scope.xml file (which manages ACLs, display names, scope teams, etc.) |

# Export

A scope can be exported using the ``export`` job. This job creates a template from an existing scope.

```properties
<clm> export --scope=<scope> --template=<template>
```

<br/>
__Parameters:__

| Parameter       | Description                                                                |
|-----------------|----------------------------------------------------------------------------|
| scope           | Identifier of the scope to be exported                                     |
| template        | Identifier of the template to be created (name of the folder in which it is located) |
| ws.url          | The FlowerDocs CORE url. Example : localhost:8081/core/services            |
| user            | The admin account ID                                                       |
| password        | The password for the admin account                                         |

By default, the scope will be exported to a ``data`` folder in the runtime directory.

To change the directory where the export will be stored, add the `` --data.dir=&lt;chemin&gt;`` parameter to the command ``&lt;clm&gt;``

<br/>
There are also more specific export jobs. 

| Job                    | Description                                                                  |
|------------------------|------------------------------------------------------------------------------|
| export-config          | Export configuration files                                                   |
| export-model           | Export component classes, tags, categories and workflow                      |
| export-content         | Export content (documents, folders, virtual folders and tasks)               |
| export-scope           | Export scope.xml file (which manages ACLs, display names, scope teams, etc.) |
| export-annotations     | Export document's annotations                                                |


The ``export`` or ``export-config`` jobs do not get annotations. Only the ``export-annotations`` job export it.
Before version 2025.2.0, annotations were exported by ``export-config`` job.

# Job list

Only some of the operations can be carried out. Below is a complete list of possible operations:

| Import                         | Export				           | Merge                           |
|--------------------------------|---------------------------------|---------------------------------|
| scope-import                   | scope-export                    | scope-merge                     |
| tag-category-import            | tag-category-export             | tag-category-merge              |
| tag-class-import               | tag-class-export                | tag-class-merge                 |
| document-class-import          | document-class-export           | document-class-merge            |
| folder-class-import            | folder-class-export             | folder-class-merge              |
| task-class-import              | task-class-export               | task-class-merge                |
| workflow-import                | workflow-export                 | workflow-merge                  |
| virtual-folder-class-import    | virtual-folder-class-export     | virtual-folder-class-merge      |
| acl-import                     | acl-export                      | acl-merge                       |
| technical-document-import      | technical-document-export       | technical-document-merge        |
| document-import                | document-export                 | document-merge                  |
| folder-import                  | folder-export                   | folder-merge                    |
| virtual-folder-import          | virtual-folder-export           | virtual-folder-merge            |
| task-import                    | task-export                     | task-merge                      |
| facts-import                   |                                 | facts-merge                     |

In addition to these operations, there is a job to purge the caches of the **FlowerDocs Core** part named ``purge-cache``.  

<br/>

__Example:__ Import tag classes only

```properties
<clm> tag-class-import --scope=<scope>
```
