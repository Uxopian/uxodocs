---
title: "GET a document metadata"
---








This API allows you to retrieve a document metadata.

## API Description

Endpoint :
```bash
GET /documents/{documentId}
```

Resource path:

| Variable    | Required | Description           |
|:------------|:---------|:----------------------|
| documentId  | Yes      | The ID of a document  |

Response :

| Type                | Description            |
|:--------------------|:-----------------------|
| DFSDocumentAccessor | The document accessor  |

## Examples

### Retrieve a document

The call below generates a request to retrieve the metadata of the document with id _b64_bm9yZS92SDMtMS0xMTh1735080237_.

```bash
curl -X 'GET' \
  'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237' \
  -H 'accept: */*'
```
