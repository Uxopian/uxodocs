---
title: Documents
description: Manage your electronic documents.
date: "2018-03-02T13:20:01+02:00"
last_update:
    date: "2025-12-02T14:38:43.134Z"
    author: CI/CD Bot
content_hash: d5a7b687825a05770d097f5e5e6dbbd216d10fda6c671159d51fb965f96930c9
---

A document is a component in its own right, with the distinctive feature of having one or more contents. These are also known as files.

<br/>
In order to restrict access to, or modifications of, a document's content, a number of permissions are available to control possible operations:

- Viewing content: `READ_CONTENT`
- Adding or deleting content from a document: `UPDATE_CONTENT`
- Downloading document content: `DOWNLOAD_CONTENT`
- Enable printing in the viewer: `PRINT`
- Viewing document content annotations: `READ_ANNOTATION`
- Annotating document content: `CREATE_ANNOTATION`
- Document composition: `BUILD_NEW_DOCUMENT`

<br/>

Some actions are only available if the user has write access to the document. To do this, he/she must have the `UPDATE` permission and have reserved the document (see [Reservation](/docs/flowerdocs/concepts/reservations).

- Attaching the document to a folder: `ATTACH`
- To delete the document/folder link, the `DETACH` permission is evaluated on the folder, not on the document

:::info
To go further, consult the Javadoc:

- `Document`
- `Document class`
  :::
