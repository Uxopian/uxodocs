---
title: Export results
description: Export search results
date: "2020-02-01"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: c26552a2fa4a95fa9b04d9e2f7d62eecbf29e6647a0ae55613debc64569e2339
---

This section describes how to configure the download of search results in CSV format.

# Presentation

Users can download this list in CSV format from the search results. All tags used for the search, including technical tags that are not visible, are exported to the file.

For `USER` tags, the user identifiers are exported.

# Configuration

The following configurations are possible and can be set in the `core.properties` file:

| Property name                         | Description                                    | Default value        |
| ------------------------------------- | ---------------------------------------------- | -------------------- |
| `search.export.hiddenColumns`         | Columns to exclude from the CSV file           | `context,acl,status` |
| `search.export.separator`             | Separator used between columns                 | `;`                  |
| `search.export.multivalued.separator` | Separator used between multi-valued tag values | `,`                  |
| `search.export.fileEncoding`          | File encoding                                  | `windows-1252`       |
