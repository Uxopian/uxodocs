---
title: Tag references
sidebar_position: 2
description: Tag your components by referencing tags on a component class.
date: "2018-03-02T12:00:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: 62568b304837691a7f06f3a03dfa725a77730898c38c89956b79ca4e0642aa1e
---

A tag referenced to a component class can be characterized by the following parameters:

- Mandatory: indicates whether a value is mandatory for validation
- Technical: indicates whether the user has access to this tag
- Read-only: indicates whether or not the user can modify the tag value
- Multivalued: indicates whether or not the tag can have several values
- Default value: the default value when the tag is not filled in
- A validation mask (regular expression): if defined, overrides the one defined in the tag class
- Display order
- A description to display a tooltip

:::info
The default value is set by **FlowerDocs Core** only at the time of creation: if the tag value is emptied, the default value will not be set.<br/>
On creation, the default value is set if the tag is non-mandatory and not present. If it is non-mandatory with an empty value, then the empty value is set.<br/>
On the GUI side, the default value is set when the component creation form is opened.
:::

# Default value

Default values are only valid at creation: if the tag value is empty, the default value will not be set.

Variables can be used as default values:

- ``$`dayDate```: the current date
- `${user.id}`: the identifier of the connected user
