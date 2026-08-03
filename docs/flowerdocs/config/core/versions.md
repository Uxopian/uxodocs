---
sidebar_position: 4
title: Lifecycle
description: Manage document versions
date: "2020-02-01"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: c9a3a46af4a2ca2525e78c464b2d6c894547c1dc549e761b21e86873e58f25b5
---

:::info
The FlowerDocs platform manages the lifecycle of documents from creation to destruction.
Several features are implemented to ensure this lifecycle management.
:::

## Reservations

A reservation allows you to temporarily give write access to a component in the graphical user interface in order to avoid concurrent modifications.

A component is reserved when it is opened in read/write mode by a user of the graphical user interface.
If a reserved component is opened by another user, the form is displayed as read-only.

Reservations are automatically deleted when:

- the user exits the screen from which the component was reserved (by taking an action or closing the browser)
- their session expires
- the user logs out

From the graphical user interface, the current user's reservations can be consulted using:

GET /rest/session/reservations

## Version management

### A version

During the life of a document, various changes may be made to its tags or content. A version of a document is the image of a document at a given moment. It contains both the tags and the content of a document.

It can be created manually or automatically, depending on the configuration.

To track the different versions, each version has:

- A unique identifier
- A label

### Version tracking

Document version tracking allows you to view and manage the different versions of a document.

#### Creating a version

Creating a version involves saving the current state of a document. Creating a version can also be seen as promoting the document as a version.

#### Restoring a version

Restoring a version allows you to return to a version of a document. The document, with its tags and content, is then in the same state as when the version was created.

#### Comparing two versions

You can compare two versions of a document using the document viewer. ARender provides a textual comparison, highlighting differences to make it easier to identify text additions, modifications or deletions.

### Tracking modes

Document version tracking is configured using a version tracking mode for each document class.
Several modes are available to control how document versions are managed:

- `None`: no version is stored
- `Manual`: document versions are created manually: via the user interface or the exposed APIs
- `Auto`: a version is created automatically each time the content of a document is modified

    Content modification only takes effect when the document is saved, and no longer when content is uploaded

This mode is defined by document class to configure how versions are managed.

### Version label

By default, the `NumberedVersionLabelStrategy` strategy is used for each automatic version creation. It automatically defines the label of a new version as a minor version, incremented with each new version.

From the document version consultation popup, you can manually create document versions. This action is accessible only if manual or automatic tracking is enabled and the user has permission to update content. [Different strategies](/docs/flowerdocs/apis/jsapi/version) are therefore available for naming versions.

### Storage

Document versions are stored and retained until the document is permanently deleted.

A purge policy can be defined to reduce the volume of stored data.

<!--# Status

### Draft

### Live

### Closed-->
