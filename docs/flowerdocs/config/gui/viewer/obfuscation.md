---
title: Obfuscation
description: Obfuscate sensitive data within documents.
date: "2005-08-29T13:20:01+02:00"
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 5a90d136a3008ffb0b6f29f5fec5c58d430c1544274b8a731b8be91919bc7427
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Principle

Obfuscation is used to hide data within the content of a document. This feature leverages the annotation mechanism of the ARender viewer to:

- select the areas or text to be hidden
- restore hidden areas

This feature is particularly useful in contexts where documents contain sensitive data. This data can be hidden from certain users, depending on their document permissions.

# Data obfuscation

This section describes how to initiate the obfuscation process.

## Security

The obfuscation feature can be used if the user has the `OBFUSCATE` permission on the document, in addition to the `CREATE_ANNOTATION` permission.

## From the graphical user interface

From the document viewer, obfuscation can be performed by selecting:

- text
- an area of the document being viewed

The document viewer's advanced search also allows you to obfuscate any results found by using the `search and strikeout` action.

:::info
When downloaded, the document is converted to PDF with masking annotations if the user does not have the `OBFUSCATE` permission.
:::

## REST API

String obfuscation can be automated using a REST web service.
This web service allows you to define:

- the character string (or regular expression) to be obfuscated
- if the string to be obfuscated is a regular expression
- if the search is case-sensitive
- if the search is sensitive to accents

For each occurrence found, an obfuscation annotation is automatically created.

<Tabs>
  <TabItem value="rest" label="REST">

```http
POST <core>/rest/documents/{id}/obfuscations HTTP/1.1
Host: {core}
token: {token}
Content-Type: application/json

  "text": "string",
  "accentSensitive": true,
  "caseSensitive": true,
  "regex": false

```

  </TabItem>
</Tabs>

# Access to document content

## Access concerned

Obfuscation management is handled cross-functionally by **FlowerDocs Core**. All access points to the content of a document with obfuscations provide the content, taking into account the obfuscations and their security:

- view
- download via **FlowerDocs GUI**
- access via web services

The `OBFUSCATE` permission on an obfuscation annotation allows authorized users to view obfuscated data.
If content data is obfuscated for a user, a PDF version is generated on the fly for each access.

The obfuscation process involves no modification of the stored content.

## Content generation with obfuscation

In certain situations, it is necessary to have access to the contents of a document with all the obfuscations, even if the user has the right to see the obfuscated data.
To achieve this, the REST web service for accessing document content can be used to specify whether obfuscations are to be included.

<Tabs>
  <TabItem value="rest" label="REST">

```http
GET: <core>/rest/documents/{id}/files/{file}/content?includeObfuscations=true HTTP/1.1
Host: {core}
token: {token}
```

  </TabItem>
</Tabs>

If the content obtained includes obfuscations, the HTTP header `X-ALTERED HTTP` with the `true` value is added to the HTTP response.
