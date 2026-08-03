---
title: Export results
sidebar_position: 3
description: Export search results
date: "2020-02-01"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: 282aee6a4206ffe08b92b2b74617fac2632db0f75a0893f62a69b15aa5af92cd
---

This section describes how to configure the download of search results in CSV format.

## Presentation

Users can download this list in CSV format from the search results. All tags used for the search, including technical tags that are not visible, are exported to the file.

For `USER` tags, the user identifiers are exported.

## Configuration

The following configurations are possible and can be set in the `core.properties` file:

| Property name                         | Description                                    | Default value        |
| ------------------------------------- | ---------------------------------------------- | -------------------- |
| `search.export.hiddenColumns`         | Columns to exclude from the CSV file           | `context,acl,status` |
| `search.export.separator`             | Separator used between columns                 | `;`                  |
| `search.export.multivalued.separator` | Separator used between multi-valued tag values | `,`                  |
| `search.export.fileEncoding`          | File encoding                                  | `windows-1252`       |
