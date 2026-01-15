---
title: POST Document
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: cabc1fca0f3a2d4b969775ce637ab4c866c307674b60672da8e3f09431b51163
---

This API allows you to upload a document.

## API Description

Endpoint:

```bash
POST /documents
```

Query params:

| Variable          | Required | Description                                                                                                                                                                                                                |
| :---------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| documentId        | No       | The reference ID for the document                                                                                                                                                                                          |
| documentTitle     | No       | The title of the document                                                                                                                                                                                                  |
| documentUrl       | No       | The URL of the document                                                                                                                                                                                                    |
| failOnUnsupported | No       | **Introduced in 2023.12.0 version.** If the value is **true** or not specified, loading an unsupported document will return an error. If the value is **false**, loading an unsupported document will not return an error. |

Request body:

| Variable    | Description                                      |
| :---------- | :----------------------------------------------- |
| inputStream | The input stream containing the document content |

Responses:

| Type       | Description                                                                                  |
| :--------- | :------------------------------------------------------------------------------------------- |
| DocumentId | The ID of the document. A new documentId is generated if not provided in the query parameter |

## Examples

### Upload a Document

The following example uploads a document from a file named "example.pdf"
without specifying a document title or URL.

```bash
curl -X 'POST' \
  'http://localhost:8761/documents' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/octet-stream' \
  --data-binary '@example.pdf'
```

The following example uploads a document from URL.

```bash
curl -X 'POST' \
  'http://localhost:8761/documents?documentUrl=https%3A%2F%2Fdemo.arender.io%2Fdocs%2Fdemo%2FPDFReference15_v5.pdf' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/octet-stream' \
  -d ''
```
