---
title: POST Document Layout
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 608deeeca9bce31f4158335c404cf800abffd14cf73c4d777d10b09a74d8b1ec
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
