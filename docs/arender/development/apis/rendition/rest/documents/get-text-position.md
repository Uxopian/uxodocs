---
title: "GET text positions"
---







This API allows you to retrieve the text position of a page.

## API Description

Endpoint:
```bash
GET /documents/{documentId}/pages/{page}/text/position
```

Resource path:

| Variable   | Required | Description                        |
|:-----------|:---------|:-----------------------------------|
| documentId | Yes      | The ID of a document               |
| page       | Yes      | The page where the text is located |

Response :

| Type         | Description          |
|:-------------|:---------------------|
| PageContents | The text of the page |

## Examples

### Retrieve Signatures

The call below generates a request to retrieve the first page text of document with ID _b64_bm9yZS92SDMtMS0xMTh1735080237_.

```bash
curl -X 'GET' \
  'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/pages/0/text/position' \
  -H 'accept: */*'
```
