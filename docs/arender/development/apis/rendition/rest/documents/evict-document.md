---
title: "DELETE Document"
---








This API allows you to evict (remove) a document from the system.

## API Description

Endpoint:

```bash
DELETE /documents/{documentId}
```

Resource path:

| Variable    | Required | Description           |
|:------------|:---------|:----------------------|
| documentId  | Yes      | The ID of a document  |

## Example

### Evict a Document

The following example evicts (removes) a document with the specified document ID.

```bash
curl -X DELETE 'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237'
```