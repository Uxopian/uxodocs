---
title: Recovery bin
sidebar_position: 12
description: Restore or purge deleted components.
date: "2026-10-20"
---

:::info
The recovery bin holds the components deleted by a user and not yet purged. From the bin, they can be restored or permanently removed.
:::

## What goes to the recovery bin

When a user deletes a document, a folder, a task or a virtual folder from **FlowerDocs GUI**, the component is not removed: its status is set to `DELETED` and it moves to the recovery bin of its category. Each category (documents, folders, tasks, virtual folders) has its own bin.

The same happens when any client updates a component with the `DELETED` status, through the REST API, the Java client or the JS API. Putting a component into the bin requires the `DELETE` permission on its ACL.

A component in the bin:

- no longer appears in ordinary searches
- keeps its identifier, class, tags, ACL and content, so it can be restored as it was

The following deletions are permanent and do not go through the bin:

- a `DELETE` request on the component endpoint, for example `DELETE /rest/documents/{ids}` (see [Handling a document](/docs/flowerdocs/apis/core/examples/document))
- the JS API `doDelete` function (see [Services](/docs/flowerdocs/apis/jsapi/mcd/services))
- a deletion from the GUI by a member of a team carrying the property `gui.delete.physical` set to `true`

## Who can work the recovery bin

Working the bin is reserved to the following [roles](/docs/flowerdocs/concepts/securite/identities#roles):

| Role                  | Description                                                   |
| --------------------- | ------------------------------------------------------------- |
| `RECOVERYBIN_MANAGER` | Lists, opens, restores and purges the components of the bins  |
| `ADMIN`               | Scope administrator, holds every right of `RECOVERYBIN_MANAGER` |
| `SYSTEM_ADMIN`        | Platform administrator, holds every right of `RECOVERYBIN_MANAGER` |

A recovery bin manager sees every component of the bin, including the ones their own ACLs do not grant: deciding what to restore or purge is the purpose of the role. Outside the bin, the role grants nothing: the manager's access to live components still depends on their ACLs.

A recovery bin manager can open any component of the bin. Downloading the content of a document in the bin is reserved to these roles.

A user holding none of these roles gets the error `F00328` (HTTP 403), which names the required roles.

## Restore

Restoring a component takes it out of the bin: its status is changed from `DELETED` to another status, and the component appears again in ordinary searches.

The **Restore** action of the GUI sets the status to `INVALID`. Through the APIs, restoring is an ordinary update of the component on its category endpoint, for example `POST /rest/documents/{ids}`, with a status other than `DELETED`. Change only the status: any other change carried by the same update is checked against the component's ACL as usual.

## Purge

Purging a component removes it permanently. It cannot be undone.

The **Purge** action of the GUI deletes the selected components. Through the APIs, purging is an ordinary delete on the category endpoint, for example `DELETE /rest/documents/{ids}`, on a component whose status is `DELETED`.

## Recovery bin in the GUI

The bins are available in the administration under **Bins**, with one screen per category: documents, folders, tasks and virtual folders. They are displayed to the users holding one of the roles above.

Each screen lists the components of the bin with their name, class, creation date and last update date, and offers two actions on the selected components:

- **Restore**
- **Purge**

Both ask for a confirmation.

## Recovery bin through the APIs

| Operation | Endpoint                                     | Required role                                         |
| --------- | -------------------------------------------- | ----------------------------------------------------- |
| List      | `POST /rest/{category}/recoverybin/search`   | `ADMIN`, `SYSTEM_ADMIN` or `RECOVERYBIN_MANAGER`       |
| Restore   | `POST /rest/{category}/{ids}`, status other than `DELETED` | `ADMIN`, `SYSTEM_ADMIN` or `RECOVERYBIN_MANAGER` |
| Purge     | `DELETE /rest/{category}/{ids}`              | `ADMIN`, `SYSTEM_ADMIN` or `RECOVERYBIN_MANAGER`       |

`{category}` is one of `documents`, `folders`, `tasks` or `virtualFolder`.

The listing endpoint is described in [Search the recovery bin](/docs/flowerdocs/apis/core/examples/recoveryBin).
