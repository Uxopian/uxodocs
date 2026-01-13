---
title: Components
date: "2000-02-01"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 52cda6f6072903111fc48f9a0b4492c9c5dcc2b11468bd4940615c25b65583c2
---

The objects manipulated through the interface and APIs are `components`. Each component is classified according to business or technical criteria using a [component class](/docs/flowerdocs/concepts/classes/getting-started).

:::info
Find out more about the different component categories:

- [Documents](/docs/flowerdocs/concepts/components/documents)
- [Folders](/docs/flowerdocs/concepts/components/folders)
- [Virtual folders](/docs/flowerdocs/concepts/components/virtual-folders)
- [Tasks](/docs/flowerdocs/concepts/components/virtual-folders)
  :::

# Component classes

A component class defines the common characteristics of a logical set of components. These sets are characterized by their own tags (or metadata), security, and business or technical rules.

This section defines the notion of component class, used to characterize the components (documents, folders, tasks, etc.) handled within the application. In this way, every component refers to a class of components via its identifier.

# Linking a tag to a component

When a tag is referenced on a component class, it can then be characterized with the following parameters:

- Mandatory: indicates whether a value is mandatory for validation
- Technical: indicates whether the user has access to this tag
- Read-only: indicates whether or not the user can modify the tag value
- Multivalued: indicates whether or not the tag can have several values
- Default value: the default value when the tag is not filled (variables can be used for dates, such as ``$`dayDate``)
- A validation mask (regular expression): if defined, overrides the one defined in the tag class
- Display order
- A description to display a tooltip

## In practice

Each FlowerDocs user can create one or more components according to their needs, for example:

- Create one or more documents.
- Create folders and store documents in them.
- Create tasks for your own needs, and/or assign them to collaborators.
