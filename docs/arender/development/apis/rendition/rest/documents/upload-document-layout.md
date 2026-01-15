---
title: POST Document Layout
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 822f82eccc2db86bef63e5a42cf14d22d6e4e3606c939c7c2ee5458befa78e96
---

This API allows you to upload the layout information for a document.

## API Description

Endpoint:

```bash
POST /documents/layout
```

Request body:

| Parameter      | Description                            |
| :------------- | :------------------------------------- |
| documentLayout | The layout information of the document |

## Example

### Upload Document Layout

The following example demonstrates how to upload the layout information

```javascript
for a document "document_layout.json".
```

```bash
curl -X 'POST' \
  'http://localhost:8761/documents/layout' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  --data-binary '@document_layout.json'
```
