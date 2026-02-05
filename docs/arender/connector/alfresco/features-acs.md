---
title: Features Alfresco Content Services
sidebar_position: 2
last_update:
  date: '2026-02-05T15:05:05.898Z'
  author: CI/CD Bot
content_hash: ee3f310799d296a1fc882023ea872370e9cbe8fad5de12bb212226dab5e62779
---

## Use Alfresco roles and permissions in ARender

### Introduction

Alfresco offers a permission system: a user has a role that determines what he can and cannot do in a specific site. Each role has a default set of permissions.
The following sections describe these permissions. In general:

- **Managers** have full rights to all site content - what they have created themselves and what other site members have created.
- **Collaborators** have full rights to the site content that they own; they have rights to edit but not delete content created by other site members.
- **Contributors** have full rights to the site content that they own; they cannot edit or delete content created by other site members.
- **Consumers** have view-only rights in a site : they cannot create their own content.

### User roles for ARender

ARender can take these into account by disabling some functionalities according to the logged user role.

- **Managers** and **Collaborators** have all the ARender features.
- **Contributors** can only modify and delete their own annotations. They also can’t delete the redact content.
- **Consumers** cannot create, modify or delete annotations, use the document builder, create a bookmark or use the redact functionality.

To enable the use of Alfresco roles, use the following property :

```cfg
arender.server.alfresco.use.roles=true
```

### Customization of Alfresco roles

Rights for each role can be changed applying configuration on ARender side to customize alfresco roles:

#### arender-server.properties

This file contains various ARender rights with properties and are associated with Alfresco roles, by default:

```cfg title="arender-server.properties"
arender.server.alfresco.role.create.annotation=SiteManager,SiteCollaborator,SiteContributor
arender.server.alfresco.role.modify.annotation=SiteManager,SiteCollaborator
arender.server.alfresco.role.modify.own.annotation=SiteContributor
arender.server.alfresco.role.create.redaction=SiteManager,SiteCollaborator,SiteContributor
arender.server.alfresco.role.delete.redaction=SiteManager,SiteCollaborator
```

| Property                                              | Right                                  |
| ----------------------------------------------------- | -------------------------------------- |
| arender.server.alfresco.role.create.annotation        | Allows the creation of annotations     |
| arender.server.alfresco.role.modify.annotation        | Allows the modification of annotations |
| arender.server.alfresco.role.modify.own.annotation    | Allows modification of own annotations |
| arender.server.alfresco.role.create.redaction         | Allows the creation of redact content  |
| arender.server.alfresco.role.delete.redaction         | Allows the deletion of redact content  |

These properties can be overridden to, for example, to restrict annotation creation to the manager and contributor roles.

```cfg title="arender-server-custom-alfresco.properties"
arender.server.alfresco.role.create.annotation=SiteManager,SiteContributor
```

To configure the use of the document builder and bookmarks, another file must be configured: **role-*roles*.properties**

For example, the creation of bookmarks for the role manager can be enabled by adding the following line to the **role-sitemanager.properties**
file:

```cfg title="arender-sitemanager.properties"
bookmarkexplorer.add.bookmark.enabled=true
```

### Using roles with permissions

In Alfresco, specific roles can be assigned for each user or group for individual files or folders from the permissions management.

It is possible to find the list of permissions linked to a node from the alfresco API : */alfresco/s/slingshot/doclib/permissions/workspace/SpacesStore/node*

To activate the use of permissions :
```cfg
arender.server.alfresco.use.permissions=true
```

When a document is open, all the permissions associated with the current user are retrieved:

- The permissions directly associated with the user.
- The permissions associated with the groups to which the user belongs.
- The permissions inherited from the parent folder.
- The role associated with the site user.

To choose the role to apply according to the permissions retrieved, a hierarchical configuration exists:
```cfg
arender.server.alfresco.role.hierarchy=SiteManager,SiteCollaborator,SiteContributor,SiteConsumer
```

Roles are written there from highest priority to lowest.

The applied role will be the highest role in the list corresponding to the roles of the permissions found.

If none of the roles found are matching a role in the **arender.server.alfresco.role.hierarchy** list, then the lowest role in the list is applied.
If the **arender.server.alfresco.role.hierarchy** list is empty, then a default list is taken into account and has the value : 
```cfg
SiteManager,SiteCollaborator,SiteContributor,SiteConsumer
```

## Document Builder

### Annotations transfer through the document builder

When creating or updating a new document on the document builder, the annotations on the current document can be transferred to the new document.
To do this, the **arender.server.alfresco.document.builder.transfer.annotations** property must be enabled :

```cfg title="arender-server-custom-alfresco.properties (Located in WEB-INF\classes)"
arender.server.alfresco.document.builder.transfer.annotations=true
```

### Update all in the document builder

By using the document builder, updating all documents is allowed with the property :

```cfg title="arender.properties"
documentbuilder.button.updateAll.enabled=true
```

Several versions of the original document will be created corresponding to the documents made in the document builder. Annotation transfer is possible with this feature.

### Number of renamed built documents

When a user saves a new document using ARender Document Builder, the document title can already exist. In that case, ARender will rename the title with a number. Example: *documentName(1).pdf*

The number of renaming is by default: 5. To change this value add the below property:

```cfg title="arender-server-custom-alfresco.properties (located in WEB-INF\classes)"
arender.server.alfresco.document.builder.number.try.rename.document=5
```

## Feed the document view activity

By default, the activity of viewing a document in Alfresco is displayed in the *My activities* board.

To have this event with ARender, properties must be set in the ARender configuration files.

```cfg title="arender-server-custom-alfresco.properties"
arender.preview.activity.feed.enabled=true
```

```cfg title="arender.properties"
arenderjs.startupScript = scripts/feedAlfrescoActivity.js
```

## Show Alfresco metadata in ARender

To enable the display of metadata while hovering the document thumbnail, the **arender.server.alfresco.show.metadatas**
property must be enabled.

```cfg title="arender-server-custom-alfresco.properties"
arender.server.alfresco.show.metadatas=true
```

To specify which metadata will be displayed in the thumbnail, their names will need to be set in the *arender.server.alfresco.included.metadatas* property

They should match the name of the properties located in the *properties* field when calling the Alfresco metadata retrieval URL *http://127.0.0.1:8080/alfresco/service/api/metadata?nodeRef=XXX&shortQNames*

Multiple properties can be displayed separated by a comma, so to display the creation date of a document and its version type, the property is :

```cfg title="arender-server-custom-alfresco.properties"
arender.server.alfresco.included.metadatas=cm:created,cm:version_type
```

The formatting of the display of creation and modification dates can be changed with the *date.format* property, by default :

```cfg title="arender-server-custom-alfresco.properties" 
date.format=dd-MM-yyyy HH:mm:ss
```