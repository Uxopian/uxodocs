---
title: GET Signatures
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 19e92d32e4861f73e6e36b161bd49eab9d5baab2b59735f4713cccf058b312a2
---







This API allows you to retrieve the signatures of a specific document.

## API Description

Endpoint:
```bash
GET /documents/{documentId}/signatures
```

Resource path:

| Variable    | Required | Description           |
|:------------|:---------|:----------------------|
| documentId  | Yes      | The ID of a document  |

Response :

| Type       | Description                    |
| :--------- |:-------------------------------|
| Signatures | The signatures of the document |

## Examples

### Retrieve Signatures

The call below generates a request to retrieve the signatures for a document with the ID _b64_bm9yZS92SDMtMS0xMTh1735080237_.

```bash
curl -X 'GET' \
  'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/signatures' \
  -H 'accept: */*'
```
