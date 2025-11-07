---
title: "POST Document Layout"
---







This API allows you to upload the layout information for a document.

## API Description

Endpoint:
```bash
POST /documents/layout
```

Request body:

| Parameter      | Description                            |
| :------------- |:---------------------------------------|
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