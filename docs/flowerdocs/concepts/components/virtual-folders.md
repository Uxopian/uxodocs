---
title: Virtual folders
sidebar_position: 4
description: Dynamically organize your components.
date: "2018-03-04T13:20:01+02:00"
last_update:
  date: '2026-01-29T08:27:50.243Z'
  author: CI/CD Bot
content_hash: 9b8980de1d95b8680c615fbefed27777a2d76fc077fec442f8028d8479602d3a
---

Virtual folders are a key concept in FlowerDocs. This type of component defines a folder whose contents are dynamically resolved. Its content is therefore said to be "virtual".

<br/>

# The content

The contents of a virtual folder are determined by component searches. The contents of a folder are therefore dynamically resolved according to the user's context. These searches can also be used to organize content into sub-level : the `aggregations`. These are used to aggregate (or group) components found according to their tags.

<br/>
These searches and aggregations can be modified at any time, so that the organization of your components can evolve according to your needs.

We recommend not aggregating more than 3 levels, using tags with defined values (such as choice list tags) and not exceeding 100 possible values.

When the tree structure of a virtual folder is in `View` mode, we recommend not exceeding 100 documents displayed in ARender.

# Adding components

Via the interface, depending on the search parameters set (category searched and `classid` criteria), a `Create a {component category}` is used to create the desired component.

When indexing, it is possible to select the component class. All tags in common are listed on the write indexing form.

**Note:** If there is only one component class, this is automatically selected.

# Permissions

To restrict access or modifications to a virtual folder, several permissions are available to control the operations that can be carried out:

- Download the contents of a virtual folder as a zip archive: `DOWNLOAD_CONTENT`

- Attach the virtual folder to a folder : `ATTACH`

Some actions are only available if the user has write access to the virtual folder. To do this, the permission has to be set on `UPDATE` for this user and this user should have reserved the virtual folder (see [Reservation](/docs/flowerdocs/concepts/reservations)).

:::info
To go further, consult the Javadoc:

- [Virtual folder](https://flowerdocs.com/javadocs/domain/com/flower/docs/domain/virtualfolder/VirtualFolder.html)
- [Virtual folder class](https://flowerdocs.com/javadocs/domain/com/flower/docs/domain/virtualfolderclass/VirtualFolderClass.html)
  :::
