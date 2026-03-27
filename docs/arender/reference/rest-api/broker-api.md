---
title: Broker API
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /reference/rest-api/broker-api
sidebar_position: 1
content_hash: 74a824487b9afc1553ad7fe7c4d2411379f3e748505f9806ad648d79270d995c
---

# Broker API

The Document Service Broker exposes the main REST API for document operations.

The interactive Swagger UI is available at:

```
http://{broker-host}:8761/swagger-ui/index.html
```

The OpenAPI spec is available at `http://{broker-host}:8761/v3/api-docs`.

**Base URL:** `http://{broker-host}:8761`

---

## Document operations

---

### Upload a document

`POST` `/documents`

Upload a document as raw binary content. The request body is the raw file bytes.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | query | string | No | Assign a specific document ID |
| `documentTitle` | query | string | No | Document title |
| `documentUrl` | query | string | No | Document URL (alternative to binary body) |
| `failOnUnsupported` | query | boolean | No | If true (default), throws an exception for unsupported formats |
| `Content-Type` | header | string | Yes | Must be `application/octet-stream` |

#### Response

Returns the assigned document ID.

```json
{
  "id": "b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw"
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Document uploaded successfully |
| 400 | Bad request (invalid parameters or unsupported format) |
| 409 | Conflict — a document with the same ID is already registered (binary upload only) |

#### Example request

```bash
curl -X POST http://localhost:8761/documents \
  -H "Content-Type: application/octet-stream" \
  --data-binary @my-document.pdf
```

#### Example response

```json
{
  "id": "b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw"
}
```

---

### Upload a document layout

`POST` `/documents/layout`

Registers a document in the broker from a pre-computed `DocumentLayout` object, without uploading the actual file. This is useful when the layout is already known and rendition can be bypassed entirely. The `documentId` field inside the body must be set.

#### Request body

A `DocumentLayout` JSON object. The `documentId` field is required.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `Content-Type` | header | string | Yes | Must be `application/json` |

#### Response

Empty body on success.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Layout registered successfully |
| 400 | Bad request — body is null or `documentId` is missing |
| 409 | Conflict — a document with the same ID is already registered |

#### Example request

```bash
curl -X POST http://localhost:8761/documents/layout \
  -H "Content-Type: application/json" \
  -d '{"documentId": {"id": "my-doc-id"}, "pageCount": 2, "pages": [...]}'
```

---

### Get document metadata

`GET` `/documents/{documentId}`

Returns document metadata including MIME type, format, rendered format, and conversion order IDs.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | path | string | Yes | The document ID |

#### Response

Returns full document metadata.

```json
{
  "documentId": {
    "id": "b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw"
  },
  "mimeType": "text/plain",
  "format": "txt",
  "renderedMimeType": "application/pdf",
  "renderedFormat": "pdf",
  "conversionOrderIds": {
    "pdf": {
      "id": "b26207dc-22b8-4cc4-a448-9b377ad5b706"
    }
  },
  "documentTitle": null,
  "documentMetadata": "eyJtZXRhZGF0YU1hcCI6e319",
  "urlParameters": []
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Metadata returned successfully |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl http://localhost:8761/documents/b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw
```

#### Example response

```json
{
  "documentId": {
    "id": "b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw"
  },
  "mimeType": "text/plain",
  "format": "txt",
  "renderedMimeType": "application/pdf",
  "renderedFormat": "pdf",
  "conversionOrderIds": {
    "pdf": {
      "id": "b26207dc-22b8-4cc4-a448-9b377ad5b706"
    }
  },
  "documentTitle": null,
  "documentMetadata": "eyJtZXRhZGF0YU1hcCI6e319",
  "urlParameters": []
}
```

---

### Get document file

`GET` `/documents/{documentId}/file`

Returns the raw document content as a binary stream.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | path | string | Yes | The document ID |
| `format` | query | string | No | Requested format. Plain format (e.g. `pdf`) waits for conversion and returns the converted file. Special values: `rendered` (equivalent to `pdf`) and `compressed` (returns a ZIP archive of the document). Omit to get the original file. |

#### Response

Binary content with the document's MIME type.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Document file returned |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl http://localhost:8761/documents/b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw/file \
  --output document.pdf
```

---

### Stream document file (chunked)

`GET` `/documents/{documentId}/file/chunk`

Returns the document content in chunks for large files. Use the `Range` header to specify the byte range.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | path | string | Yes | The document ID |
| `format` | query | string | No | Document format |
| `Range` | header | string | Yes | Byte range, format: `bytes=x-y` |

#### Response

Binary content for the requested byte range.

#### Errors

| Status | Description |
|--------|-------------|
| 206 | Partial content returned |
| 404 | Document not found |
| 416 | Range not satisfiable |
| 500 | Internal server error |

#### Example request

```bash
curl http://localhost:8761/documents/b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw/file/chunk \
  -H "Range: bytes=0-1023"
```

---

### Delete a document

`DELETE` `/documents/{documentId}`

Evicts the document from the cache/storage.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | path | string | Yes | The document ID |

#### Response

Returns `200 OK` with no body.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Document evicted, or document was not found (idempotent) |

#### Example request

```bash
curl -X DELETE http://localhost:8761/documents/b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw
```

---

### Check document availability

`GET` `/documents/{documentId}/check`

Checks whether the document is available and accessible.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | path | string | Yes | The document ID |

#### Response

Returns `200 OK` with an empty body if the document exists.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Document is available |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl http://localhost:8761/documents/b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw/check
```

---

### Get document layout

`GET` `/documents/{documentId}/layout`

Returns the document structure: page count, page dimensions, rotation, and DPI per page.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | path | string | Yes | The document ID |

#### Response

Returns page dimensions, rotation, and DPI for each page.

```json
{
  "documentId": {
    "id": "b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw"
  },
  "mimeType": "text/plain",
  "pageDimensionsList": [
    {
      "width": 1191.0,
      "height": 842.0,
      "rotation": 0,
      "dpi": 72,
      "pageLayers": null
    }
  ]
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Layout returned successfully |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl http://localhost:8761/documents/b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw/layout
```

#### Example response

```json
{
  "documentId": {
    "id": "b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw"
  },
  "mimeType": "text/plain",
  "pageDimensionsList": [
    {
      "width": 1191.0,
      "height": 842.0,
      "rotation": 0,
      "dpi": 72,
      "pageLayers": null
    }
  ]
}
```

---

### Get page image

`GET` `/documents/{documentId}/pages/{page}/image`

Returns a rendered image (PNG) for the specified page.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | path | string | Yes | The document ID |
| `page` | path | integer | Yes | Page number (0-based) |
| `pageImageDescription` | query | string | No | Image descriptor specifying width, rotation, and optional filters |

The `pageImageDescription` parameter uses the format `IM_{width}_{rotation}` with optional filters appended as `_FILTERS~{type}~{value}`.

**Width and rotation:**

```
IM_200_90
```

Requests an image of width 200 pixels with a 90-degree rotation.

**With a single filter:**

```
IM_200_90_FILTERS~C~35
```

Same image but with a contrast filter of 35.

**With multiple filters:**

```
IM_200_90_FILTERS~C~35~B~-100~I~50
```

Same image with contrast 35, brightness -100, and invert 50.

Available filter types:

| Filter | Code | Description |
|--------|------|-------------|
| Contrast | `C` | Adjust contrast |
| Brightness | `B` | Adjust brightness |
| Invert | `I` | Invert colors |

#### Response

Binary PNG image (`Content-Type: image/png`).

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Image returned successfully |
| 400 | Invalid page number or descriptor |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl "http://localhost:8761/documents/{documentId}/pages/0/image?pageImageDescription=IM_800_0" \
  --output page0.png
```

---

### Get text positions

`GET` `/documents/{documentId}/pages/{page}/text/position`

Returns extracted text with character-level positions for the specified page.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | path | string | Yes | The document ID |
| `page` | path | integer | Yes | Page number (0-based) |

#### Response

Returns text elements with their bounding boxes, font information, and paragraph IDs.

```json
{
  "pageNumber": 0,
  "positionTextList": [
    {
      "pageNumber": 0,
      "position": {
        "x": 36.0,
        "y": 41.6,
        "w": 288.6,
        "h": 12.0
      },
      "text": "Hello world",
      "individualWidths": [7.8, 7.8, 7.8],
      "fontSize": 13.0,
      "font": "Courier",
      "clickableDestination": null,
      "paragraphId": 0,
      "rightToLeftText": false,
      "rotation": 0
    }
  ],
  "imageHyperlinkPositionList": []
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Text positions returned |
| 400 | Invalid page number |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl http://localhost:8761/documents/b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw/pages/0/text/position
```

#### Example response

```json
{
  "pageNumber": 0,
  "positionTextList": [
    {
      "pageNumber": 0,
      "position": {
        "x": 36.0,
        "y": 41.6,
        "w": 288.6,
        "h": 12.0
      },
      "text": "Hello world",
      "individualWidths": [7.8, 7.8, 7.8],
      "fontSize": 13.0,
      "font": "Courier",
      "clickableDestination": null,
      "paragraphId": 0,
      "rightToLeftText": false,
      "rotation": 0
    }
  ],
  "imageHyperlinkPositionList": []
}
```

---

### Search text in a page

`GET` `/documents/{documentId}/pages/{page}/text`

Searches for text positions in a specific page.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | path | string | Yes | The document ID |
| `page` | path | integer | Yes | Page number (0-based) |
| `searchText` | query | string | Yes | Text to search |
| `caseSensitive` | query | boolean | No | Case-sensitive search (default: false) |
| `accentSensitive` | query | boolean | No | Accent-sensitive search (default: false) |
| `regex` | query | boolean | No | Treat `searchText` as a regular expression |

#### Response

Returns matching text positions with character ranges.

```json
{
  "searchResults": [
    {
      "positionText": {
        "pageNumber": 0,
        "position": {"x": 36.0, "y": 41.6, "w": 55.0, "h": 12.0},
        "text": "Hello"
      },
      "textRangeList": [
        {"firstCharacter": 0, "lastCharacter": 5}
      ]
    }
  ]
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Search results returned |
| 400 | Invalid page number or missing search text |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl "http://localhost:8761/documents/b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw/pages/0/text?searchText=Hello"
```

#### Example response

```json
{
  "searchResults": [
    {
      "positionText": {
        "pageNumber": 0,
        "position": {"x": 36.0, "y": 41.6, "w": 55.0, "h": 12.0},
        "text": "Hello"
      },
      "textRangeList": [
        {"firstCharacter": 0, "lastCharacter": 5}
      ]
    }
  ]
}
```

---

### Search text across the document

`GET` `/documents/{documentId}/search`

Searches for text positions across multiple pages.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | path | string | Yes | The document ID |
| `fromPage` | query | integer | Yes | Start page (0-based) |
| `toPage` | query | integer | No | End page (0-based). If absent, searches to the last page |
| `searchText` | query | string | Yes | Text to search |
| `caseSensitive` | query | boolean | No | Case-sensitive search |
| `accentSensitive` | query | boolean | No | Accent-sensitive search |
| `regex` | query | boolean | No | Treat `searchText` as a regular expression |

#### Response

Returns search results grouped by page, along with completion status.

```json
{
  "documentId": {"id": "b64_..."},
  "searchText": "hello",
  "searchStatus": "COMPLETED",
  "lastPageSearched": 5,
  "pagesResults": {
    "0": [{"positionText": {"text": "hello", "position": {"x": 36.0, "y": 41.6, "w": 39.0, "h": 12.0}}}]
  }
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Search results returned |
| 400 | Missing required parameters |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl "http://localhost:8761/documents/b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw/search?fromPage=0&searchText=hello"
```

#### Example response

```json
{
  "documentId": {"id": "b64_..."},
  "searchText": "hello",
  "searchStatus": "COMPLETED",
  "lastPageSearched": 5,
  "pagesResults": {
    "0": [{"positionText": {"text": "hello", "position": {"x": 36.0, "y": 41.6, "w": 39.0, "h": 12.0}}}]
  }
}
```

---

### Get pages containing text

`GET` `/documents/{documentId}/pages`

Returns a list of page numbers that contain the search text.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | path | string | Yes | The document ID |
| `searchText` | query | string | Yes | Text to search |
| `caseSensitive` | query | boolean | No | Case-sensitive search |
| `accentSensitive` | query | boolean | No | Accent-sensitive search |
| `regex` | query | boolean | No | Treat `searchText` as a regular expression |

#### Response

Returns the document ID, the searched text, and a list of matching page numbers.

```json
{
  "uuid": {"id": "b64_..."},
  "searchText": "hello",
  "pageList": [0, 2, 5]
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Page list returned |
| 400 | Missing search text |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl "http://localhost:8761/documents/b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw/pages?searchText=hello"
```

#### Example response

```json
{
  "uuid": {"id": "b64_..."},
  "searchText": "hello",
  "pageList": [0, 2, 5]
}
```

---

### Get bookmarks

`GET` `/documents/{documentId}/bookmarks`

Returns the document outline (table of contents).

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | path | string | Yes | The document ID |

#### Response

Returns a tree of bookmarks with page targets and child nodes.

```json
{
  "bookmarks": [
    {
      "title": "Chapter 1",
      "page": 0,
      "textPosition": 0.0,
      "nodeOpen": true,
      "children": [],
      "namedDestination": null,
      "fileName": null,
      "shouldOpenInNewWindow": false
    }
  ]
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Bookmarks returned |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl http://localhost:8761/documents/b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw/bookmarks
```

#### Example response

```json
{
  "bookmarks": [
    {
      "title": "Chapter 1",
      "page": 0,
      "textPosition": 0.0,
      "nodeOpen": true,
      "children": [],
      "namedDestination": null,
      "fileName": null,
      "shouldOpenInNewWindow": false
    }
  ]
}
```

---

### Get named destinations

`GET` `/documents/{documentId}/destinations`

Returns named destinations (internal document links).

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | path | string | Yes | The document ID |

#### Response

Returns a list of named destinations with their target pages.

```json
{
  "documentId": {"id": "b64_..."},
  "namedDestinations": [
    {"name": "section1", "page": 3}
  ]
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Destinations returned |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl http://localhost:8761/documents/b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw/destinations
```

#### Example response

```json
{
  "documentId": {"id": "b64_..."},
  "namedDestinations": [
    {"name": "section1", "page": 3}
  ]
}
```

---

### Get digital signatures

`GET` `/documents/{documentId}/signatures`

Returns digital signature information and validation status.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | path | string | Yes | The document ID |

#### Response

Returns signature details including signer, date, reason, and integrity status.

```json
{
  "signatures": [
    {
      "name": "Signature1",
      "signer": "CN=John Doe",
      "date": "2026-01-15T10:30:00Z",
      "reason": "Approval",
      "location": "Paris",
      "wrongIntegrity": false,
      "unknownCertificate": false,
      "signatureException": false
    }
  ],
  "wronglySigned": false,
  "integrity": true
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Signatures returned |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl http://localhost:8761/documents/b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw/signatures
```

#### Example response

```json
{
  "signatures": [
    {
      "name": "Signature1",
      "signer": "CN=John Doe",
      "date": "2026-01-15T10:30:00Z",
      "reason": "Approval",
      "location": "Paris",
      "wrongIntegrity": false,
      "unknownCertificate": false,
      "signatureException": false
    }
  ],
  "wronglySigned": false,
  "integrity": true
}
```

---

### Get printable document

`GET` `/documents/{documentId}/printable`

Returns a print-ready version of the document as binary content.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | path | string | Yes | The document ID |

#### Response

Binary content suitable for printing.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Printable document returned |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl http://localhost:8761/documents/b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw/printable \
  --output printable.pdf
```

---

### Get document annotations file

`GET` `/documents/{documentId}/file/annotations`

Returns the XFDF annotations file associated with the document.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | path | string | Yes | The document ID |

#### Response

XFDF annotations file content.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Annotations file returned |
| 404 | Document not found or no annotations |
| 500 | Internal server error |

#### Example request

```bash
curl http://localhost:8761/documents/b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw/file/annotations
```

---

### Get document conversions

`GET` `/documents/{documentId}/conversions`

Returns conversion order IDs associated with a specific document.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | path | string | Yes | The document ID |

#### Response

Returns an array of conversion order IDs.

```json
[
  {"id": "b26207dc-22b8-4cc4-a448-9b377ad5b706"}
]
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Conversion IDs returned |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl http://localhost:8761/documents/b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw/conversions
```

#### Example response

```json
[
  {"id": "b26207dc-22b8-4cc4-a448-9b377ad5b706"}
]
```

---

## Conversion operations

---

### Queue a conversion

`POST` `/conversions`

Submits a document for asynchronous format conversion.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `Content-Type` | header | string | Yes | Must be `application/json` |

**Request body:**

```json
{
  "documentId": {"id": "b64_..."},
  "format": "pdf"
}
```

#### Response

Returns the conversion order ID for polling.

```json
{
  "conversionOrderId": {"id": "b26207dc-22b8-4cc4-a448-9b377ad5b706"}
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Conversion queued |
| 400 | Bad request (invalid body or format) |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl -X POST http://localhost:8761/conversions \
  -H "Content-Type: application/json" \
  -d '{"documentId": {"id": "b64_..."}, "format": "pdf"}'
```

#### Example response

```json
{
  "conversionOrderId": {"id": "b26207dc-22b8-4cc4-a448-9b377ad5b706"}
}
```

---

### Get all conversion orders

`GET` `/conversions`

Returns all conversion orders currently tracked by the broker.

#### Parameters

None.

#### Response

Returns an array of conversion order objects with their current state.

```json
[
  {
    "conversionOrderId": {"id": "b26207dc-..."},
    "documentId": {"id": "b64_..."},
    "currentState": "PROCESSED",
    "format": "pdf",
    "queuedDate": "2026-03-16T14:00:00Z",
    "processedDate": "2026-03-16T14:00:02Z",
    "processingTime": 2000,
    "errorMessage": null
  }
]
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Orders returned |
| 500 | Internal server error |

#### Example request

```bash
curl http://localhost:8761/conversions
```

#### Example response

```json
[
  {
    "conversionOrderId": {"id": "b26207dc-..."},
    "documentId": {"id": "b64_..."},
    "currentState": "PROCESSED",
    "format": "pdf",
    "queuedDate": "2026-03-16T14:00:00Z",
    "processedDate": "2026-03-16T14:00:02Z",
    "processingTime": 2000,
    "errorMessage": null
  }
]
```

---

### Poll conversion status

`GET` `/conversions/{conversionOrderId}`

Returns the current status of a conversion order. Possible states: `QUEUED`, `PROCESSING`, `PROCESSED`, `FAILED`.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `conversionOrderId` | path | string | Yes | The conversion order ID |

#### Response

Returns the full conversion order with timing details.

```json
{
  "conversionOrderId": {"id": "b26207dc-..."},
  "documentId": {"id": "b64_..."},
  "currentState": "PROCESSED",
  "format": "pdf",
  "queuedDate": "2026-03-16T14:00:00Z",
  "processedDate": "2026-03-16T14:00:02Z",
  "processingTime": 2000,
  "queuedTime": 50,
  "errorMessage": null
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Conversion order returned |
| 404 | Conversion order not found |
| 500 | Internal server error |

#### Example request

```bash
curl http://localhost:8761/conversions/b26207dc-22b8-4cc4-a448-9b377ad5b706
```

#### Example response

```json
{
  "conversionOrderId": {"id": "b26207dc-..."},
  "documentId": {"id": "b64_..."},
  "currentState": "PROCESSED",
  "format": "pdf",
  "queuedDate": "2026-03-16T14:00:00Z",
  "processedDate": "2026-03-16T14:00:02Z",
  "processingTime": 2000,
  "queuedTime": 50,
  "errorMessage": null
}
```

---

### Cancel a conversion

`DELETE` `/conversions/{conversionOrderId}`

Cancels and removes a specific conversion order.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `conversionOrderId` | path | string | Yes | The conversion order ID |

#### Response

Returns `200 OK` with no body.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Conversion cancelled |
| 404 | Conversion order not found |
| 500 | Internal server error |

#### Example request

```bash
curl -X DELETE http://localhost:8761/conversions/b26207dc-22b8-4cc4-a448-9b377ad5b706
```

---

### Delete all conversion orders

`DELETE` `/conversions`

Deletes all conversion orders tracked by the broker.

#### Parameters

None.

#### Response

Returns `200 OK` with no body.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | All conversions deleted |
| 500 | Internal server error |

#### Example request

```bash
curl -X DELETE http://localhost:8761/conversions
```

---

## Comparison operations

---

### Queue a comparison

`POST` `/comparisons`

Compares two documents asynchronously using image-based comparison.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `Content-Type` | header | string | Yes | Must be `application/json` |

**Request body:**

```json
{
  "leftDocumentId": {"id": "b64_doc1"},
  "rightDocumentId": {"id": "b64_doc2"},
  "fuzz": 10,
  "highlightColor": "#FF0000",
  "lowlightColor": "#00FF00"
}
```

All fields except `leftDocumentId` and `rightDocumentId` are optional. `fuzz` controls the sensitivity of image comparison. `highlightColor` and `lowlightColor` set the colors for differences.

#### Response

Returns the comparison order ID for polling.

```json
{
  "comparisonOrderId": {"id": "d8fcc984-a163-4d89-8735-30583fb8f829"}
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Comparison queued |
| 400 | Bad request (missing document IDs) |
| 404 | One or both documents not found |
| 500 | Internal server error |

#### Example request

```bash
curl -X POST http://localhost:8761/comparisons \
  -H "Content-Type: application/json" \
  -d '{"leftDocumentId": {"id": "b64_doc1"}, "rightDocumentId": {"id": "b64_doc2"}}'
```

#### Example response

```json
{
  "comparisonOrderId": {"id": "d8fcc984-a163-4d89-8735-30583fb8f829"}
}
```

---

### Poll comparison status

`GET` `/comparisons/{comparisonOrderId}`

Returns the current status of a comparison order.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `comparisonOrderId` | path | string | Yes | The comparison order ID |
| `timeoutMs` | query | integer | No | Maximum wait time (ms) before returning the current status |

#### Response

Returns the full comparison order including result document ID on completion.

```json
{
  "comparisonOrderId": {"id": "d8fcc984-..."},
  "leftDocumentId": {"id": "b64_doc1"},
  "rightDocumentId": {"id": "b64_doc2"},
  "targetDocumentId": {"id": "b64_result"},
  "currentState": "PROCESSED",
  "fuzz": 10,
  "highlightColor": "#FF0000",
  "lowlightColor": "#00FF00",
  "queuedDate": "2026-03-16T14:28:52Z",
  "processedDate": "2026-03-16T14:28:55Z",
  "processingTime": 3000,
  "errorMessage": null
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Comparison order returned |
| 404 | Comparison order not found |
| 500 | Internal server error |

#### Example request

```bash
curl http://localhost:8761/comparisons/d8fcc984-a163-4d89-8735-30583fb8f829
```

#### Example response

```json
{
  "comparisonOrderId": {"id": "d8fcc984-..."},
  "leftDocumentId": {"id": "b64_doc1"},
  "rightDocumentId": {"id": "b64_doc2"},
  "targetDocumentId": {"id": "b64_result"},
  "currentState": "PROCESSED",
  "fuzz": 10,
  "highlightColor": "#FF0000",
  "lowlightColor": "#00FF00",
  "queuedDate": "2026-03-16T14:28:52Z",
  "processedDate": "2026-03-16T14:28:55Z",
  "processingTime": 3000,
  "errorMessage": null
}
```

---

### Get comparison differences

`GET` `/difference`

Returns detailed text differences between two documents.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `leftDocumentId` | query | string | Yes | First document ID |
| `rightDocumentId` | query | string | Yes | Second document ID |

#### Response

Returns text changes with their positions and change fragments.

```json
{
  "leftDocumentId": {"id": "b64_doc1"},
  "rightDocumentId": {"id": "b64_doc2"},
  "textChanges": [
    {
      "changeType": "MODIFIED",
      "left": {"text": "old text", "pageNumber": 0, "position": {"x": 36.0, "y": 41.6, "w": 60.0, "h": 12.0}},
      "right": {"text": "new text", "pageNumber": 0, "position": {"x": 36.0, "y": 41.6, "w": 60.0, "h": 12.0}},
      "fragments": [
        {"text": "old", "type": "DELETED", "pageNumber": 0, "endOfLine": false},
        {"text": "new", "type": "INSERTED", "pageNumber": 0, "endOfLine": false}
      ]
    }
  ]
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Differences returned |
| 400 | Missing required document IDs |
| 404 | One or both documents not found |
| 500 | Internal server error |

#### Example request

```bash
curl "http://localhost:8761/difference?leftDocumentId=b64_doc1&rightDocumentId=b64_doc2"
```

#### Example response

```json
{
  "leftDocumentId": {"id": "b64_doc1"},
  "rightDocumentId": {"id": "b64_doc2"},
  "textChanges": [
    {
      "changeType": "MODIFIED",
      "left": {"text": "old text", "pageNumber": 0, "position": {"x": 36.0, "y": 41.6, "w": 60.0, "h": 12.0}},
      "right": {"text": "new text", "pageNumber": 0, "position": {"x": 36.0, "y": 41.6, "w": 60.0, "h": 12.0}},
      "fragments": [
        {"text": "old", "type": "DELETED", "pageNumber": 0, "endOfLine": false},
        {"text": "new", "type": "INSERTED", "pageNumber": 0, "endOfLine": false}
      ]
    }
  ]
}
```

---

## Transformation operations

---

### Queue a transformation

`POST` `/transformations`

Submits a document transformation (merge, split, reorder, redact).

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `Content-Type` | header | string | Yes | Must be `application/json` |

**Request body:**

```json
{
  "format": "pdf",
  "transformationDetails": [
    {
      "documentTitle": "Merged document",
      "transformationElements": [
        {
          "documentId": {"id": "b64_doc1"},
          "documentTitle": "Part 1",
          "pagesSelectionList": [{"minPage": 0, "maxPage": 2}]
        },
        {
          "documentId": {"id": "b64_doc2"},
          "documentTitle": "Part 2",
          "pagesSelectionList": [{"minPage": 0, "maxPage": 5}]
        }
      ]
    }
  ],
  "annotations": {"annotations": []}
}
```

#### Response

Returns the transformation order ID for polling.

```json
{
  "transformationOrderId": {"id": "abc123-def456"}
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Transformation queued |
| 400 | Bad request (invalid body or format) |
| 404 | One or more documents not found |
| 500 | Internal server error |

#### Example request

```bash
curl -X POST http://localhost:8761/transformations \
  -H "Content-Type: application/json" \
  -d '{
    "format": "pdf",
    "transformationDetails": [
      {
        "documentTitle": "Merged document",
        "transformationElements": [
          {
            "documentId": {"id": "b64_doc1"},
            "documentTitle": "Part 1",
            "pagesSelectionList": [{"minPage": 0, "maxPage": 2}]
          }
        ]
      }
    ],
    "annotations": {"annotations": []}
  }'
```

#### Example response

```json
{
  "transformationOrderId": {"id": "abc123-def456"}
}
```

---

### Get all transformation orders

`GET` `/transformations`

Returns all transformation orders currently tracked by the broker.

#### Parameters

None.

#### Response

Returns an array of transformation order objects with their current state.

```json
[
  {
    "transformationOrderId": {"id": "abc123-..."},
    "currentState": "PROCESSED",
    "format": "pdf",
    "transformationResultDocumentID": {"id": "b64_result"},
    "queuedDate": "2026-03-16T14:30:00Z",
    "processedDate": "2026-03-16T14:30:05Z",
    "processingTime": 5000,
    "errorMessage": null
  }
]
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Orders returned |
| 500 | Internal server error |

#### Example request

```bash
curl http://localhost:8761/transformations
```

#### Example response

```json
[
  {
    "transformationOrderId": {"id": "abc123-..."},
    "currentState": "PROCESSED",
    "format": "pdf",
    "transformationResultDocumentID": {"id": "b64_result"},
    "queuedDate": "2026-03-16T14:30:00Z",
    "processedDate": "2026-03-16T14:30:05Z",
    "processingTime": 5000,
    "errorMessage": null
  }
]
```

---

### Poll transformation status

`GET` `/transformations/{transformationOrderId}`

Returns the current status of a transformation order. Possible states: `QUEUED`, `PROCESSING`, `PROCESSED`, `FAILED`.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `transformationOrderId` | path | string | Yes | The transformation order ID |
| `timeoutMs` | query | integer | No | Maximum wait time (ms) before returning |

#### Response

Returns the full transformation order with timing details and result document ID.

```json
{
  "transformationOrderId": {"id": "abc123-..."},
  "currentState": "PROCESSED",
  "format": "pdf",
  "transformationResultDocumentID": {"id": "b64_result"},
  "queuedDate": "2026-03-16T14:30:00Z",
  "processedDate": "2026-03-16T14:30:05Z",
  "processingTime": 5000,
  "errorMessage": null
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Transformation order returned |
| 404 | Transformation order not found |
| 500 | Internal server error |

#### Example request

```bash
curl http://localhost:8761/transformations/abc123-def456
```

#### Example response

```json
{
  "transformationOrderId": {"id": "abc123-..."},
  "currentState": "PROCESSED",
  "format": "pdf",
  "transformationResultDocumentID": {"id": "b64_result"},
  "queuedDate": "2026-03-16T14:30:00Z",
  "processedDate": "2026-03-16T14:30:05Z",
  "processingTime": 5000,
  "errorMessage": null
}
```

---

### Cancel a transformation

`DELETE` `/transformations/{transformationOrderId}`

Cancels and removes a specific transformation order.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `transformationOrderId` | path | string | Yes | The transformation order ID |

#### Response

Returns `200 OK` with no body.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Transformation cancelled |
| 404 | Transformation order not found |
| 500 | Internal server error |

#### Example request

```bash
curl -X DELETE http://localhost:8761/transformations/abc123-def456
```

---

### Delete all transformation orders

`DELETE` `/transformations`

Deletes all transformation orders tracked by the broker.

#### Parameters

None.

#### Response

Returns `200 OK` with no body.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | All transformations deleted |
| 500 | Internal server error |

#### Example request

```bash
curl -X DELETE http://localhost:8761/transformations
```

---

## Annotation operations

Annotation endpoints are at the root path `/annotation`. All require a `documentId` query parameter.

---

### Get annotations

`GET` `/annotation?documentId={documentId}`

Returns all annotations for a document.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | query | string | Yes | The document ID |

#### Response

Returns an array of annotation objects with position, style, and metadata.

```json
{
  "annotations": [
    {
      "id": {"id": "annot-001"},
      "type": "Highlight",
      "page": 0,
      "position": {"x": 100.0, "y": 200.0, "w": 150.0, "h": 20.0},
      "color": {"r": 255, "g": 255, "b": 0},
      "opacity": 0.5,
      "creator": "john.doe",
      "subject": "highlight",
      "date": "2026-03-16T10:00:00Z",
      "creationDate": "2026-03-16T10:00:00Z",
      "documentId": {"id": "b64_..."},
      "flags": {"hidden": false, "readonly": false, "locked": false, "print": false}
    }
  ]
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Annotations returned |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl "http://localhost:8761/annotation?documentId=b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw"
```

#### Example response

```json
{
  "annotations": [
    {
      "id": {"id": "annot-001"},
      "type": "Highlight",
      "page": 0,
      "position": {"x": 100.0, "y": 200.0, "w": 150.0, "h": 20.0},
      "color": {"r": 255, "g": 255, "b": 0},
      "opacity": 0.5,
      "creator": "john.doe",
      "subject": "highlight",
      "date": "2026-03-16T10:00:00Z",
      "creationDate": "2026-03-16T10:00:00Z",
      "documentId": {"id": "b64_..."},
      "flags": {"hidden": false, "readonly": false, "locked": false, "print": false}
    }
  ]
}
```

---

### Create annotations

`PUT` `/annotation?documentId={documentId}`

Creates new annotations for a document. The request body is an `Annotations` object.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | query | string | Yes | The document ID |
| `Content-Type` | header | string | Yes | Must be `application/json` |

#### Response

Returns `200 OK` on success.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Annotations created |
| 400 | Bad request (invalid annotation data) |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl -X PUT "http://localhost:8761/annotation?documentId=b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw" \
  -H "Content-Type: application/json" \
  -d '{"annotations": [{"type": "Highlight", "page": 0, "position": {"x": 100, "y": 200, "w": 150, "h": 20}}]}'
```

---

### Update annotations

`POST` `/annotation?documentId={documentId}`

Updates existing annotations for a document.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | query | string | Yes | The document ID |
| `Content-Type` | header | string | Yes | Must be `application/json` |

#### Response

Returns `200 OK` on success.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Annotations updated |
| 400 | Bad request (invalid annotation data) |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl -X POST "http://localhost:8761/annotation?documentId=b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw" \
  -H "Content-Type: application/json" \
  -d '{"annotations": [{"id": {"id": "annot-001"}, "type": "Highlight", "page": 0, "position": {"x": 110, "y": 200, "w": 150, "h": 20}}]}'
```

---

### Delete annotations

`DELETE` `/annotation?documentId={documentId}`

Deletes annotations from a document. The request body specifies which annotations to delete.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | query | string | Yes | The document ID |
| `Content-Type` | header | string | Yes | Must be `application/json` |

#### Response

Returns `200 OK` on success.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Annotations deleted |
| 400 | Bad request (invalid annotation data) |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl -X DELETE "http://localhost:8761/annotation?documentId=b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw" \
  -H "Content-Type: application/json" \
  -d '{"annotations": [{"id": {"id": "annot-001"}}]}'
```

---

### Get annotation creation policy

`GET` `/annotation/policy?documentId={documentId}`

Returns the annotation creation policy for a document: what the user is allowed to create, available templates, security levels, and redaction reasons.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | query | string | Yes | The document ID |

#### Response

Returns the full policy including creation rules, templates, security levels, and redaction reasons.

```json
{
  "canCreateAnnotations": true,
  "textAnnotationsSupportHtml": true,
  "textAnnotationsSupportReply": true,
  "textAnnotationsSupportStatus": true,
  "textAnnotationsCommentSupportReply": true,
  "annotationsSupportSecurity": false,
  "availableSecurityLevels": [
    {
      "symbolicName": "private",
      "localizedDisplayNames": {"fr": "Prive", "en": "Private"}
    }
  ],
  "annotationTemplateCatalog": {
    "annotationTemplates": [
      {
        "name": "Urgent",
        "annotationType": "Stamp",
        "contentTemplate": "Urgent",
        "annotationStyle": {"fontColor": "#e50000", "fontSize": 30, "rotation": 350}
      }
    ],
    "waterMarkTemplates": [
      {
        "name": "CONFIDENTIAL",
        "annotationType": "Stamp",
        "contentTemplate": "CONFIDENTIAL"
      }
    ]
  },
  "annotationCreationRuleCatalog": {
    "annotationCreationRules": [
      {
        "ruleId": "annotationCreationRuleRedactMailsAllPages",
        "ruleName": "Redact all e-mail addresses",
        "annotationTemplate": {"annotationType": "RedactText"},
        "searchOptions": {"searchText": "^\\w+@\\w+\\.\\w+$", "regex": true, "searchAction": "ALL_PAGES"}
      }
    ]
  },
  "availableRedactReasons": [
    {
      "symbolicName": "(b)(1)",
      "displayName": {"en": "Information that is classified to protect national security."}
    }
  ],
  "defaultRedactReasons": null
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Policy returned |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl "http://localhost:8761/annotation/policy?documentId=b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw"
```

#### Example response

```json
{
  "canCreateAnnotations": true,
  "textAnnotationsSupportHtml": true,
  "textAnnotationsSupportReply": true,
  "textAnnotationsSupportStatus": true,
  "textAnnotationsCommentSupportReply": true,
  "annotationsSupportSecurity": false,
  "availableSecurityLevels": [
    {
      "symbolicName": "private",
      "localizedDisplayNames": {"fr": "Prive", "en": "Private"}
    }
  ],
  "annotationTemplateCatalog": {
    "annotationTemplates": [
      {
        "name": "Urgent",
        "annotationType": "Stamp",
        "contentTemplate": "Urgent",
        "annotationStyle": {"fontColor": "#e50000", "fontSize": 30, "rotation": 350}
      }
    ],
    "waterMarkTemplates": [
      {
        "name": "CONFIDENTIAL",
        "annotationType": "Stamp",
        "contentTemplate": "CONFIDENTIAL"
      }
    ]
  },
  "annotationCreationRuleCatalog": {
    "annotationCreationRules": [
      {
        "ruleId": "annotationCreationRuleRedactMailsAllPages",
        "ruleName": "Redact all e-mail addresses",
        "annotationTemplate": {"annotationType": "RedactText"},
        "searchOptions": {"searchText": "^\\w+@\\w+\\.\\w+$", "regex": true, "searchAction": "ALL_PAGES"}
      }
    ]
  },
  "availableRedactReasons": [
    {
      "symbolicName": "(b)(1)",
      "displayName": {"en": "Information that is classified to protect national security."}
    }
  ],
  "defaultRedactReasons": null
}
```

---

### Convert annotations between formats

`POST` `/annotations/conversion`

Converts annotations between FDF and XFDF formats.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `sourceType` | query | string | Yes | Source format: `FDF` or `XFDF` |
| `targetType` | query | string | Yes | Target format: `FDF` or `XFDF` |
| `documentId` | query | string | Yes | The document ID |
| `Accept` | header | string | Yes | Expected response content type |
| `Content-Type` | header | string | Yes | Must be `application/octet-stream` |

#### Response

Annotation data in the target format.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Conversion successful |
| 400 | Bad request (invalid source/target type) |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl -X POST "http://localhost:8761/annotations/conversion?sourceType=XFDF&targetType=FDF&documentId=b64_..." \
  -H "Content-Type: application/octet-stream" \
  -H "Accept: application/octet-stream" \
  --data-binary @annotations.xfdf
```

---

## Document loading

---

### Load document from URL

`POST` `/accessor/load`

Loads a document from a URL or file path. The request body is a `DocumentAccessor` object.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `Content-Type` | header | string | Yes | Must be `application/json` |

#### Response

Returns the document ID of the loaded document.

```json
{
  "id": "b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw"
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Document loaded |
| 400 | Bad request (invalid accessor) |
| 500 | Internal server error (URL unreachable, etc.) |

#### Example request

```bash
curl -X POST http://localhost:8761/accessor/load \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/document.pdf"}'
```

#### Example response

```json
{
  "id": "b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw"
}
```

---

## Connector operations

These endpoints are used by the React UI to open documents through REST connector providers and manage annotations on provider-loaded documents. For the provider-side API contract, see [Provider API](./provider-api.md).

---

### Open document through provider

`POST` `/connector/documents`

Opens a document through a registered REST connector provider. The broker resolves the provider from the `X-Provider-ID` header, forwards the request parameters to the provider's `GET /documents` endpoint, caches the result, and returns a `DocumentId`.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `X-Provider-ID` | header | string | No | Provider name (e.g., `filenet`, `alfresco`). If omitted, the broker uses the `connector.defaultRegistry` configuration value |
| `Content-Type` | header | string | Yes | Must be `application/x-www-form-urlencoded` |

**Request body:** Form-encoded parameters specific to the connector (e.g., `id=DOC123&objectStoreName=OS1` for FileNet).

#### Response

Returns a `DocumentId` object.

```json
{
  "id": "b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw"
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Document opened |
| 400 | Bad request (missing or invalid parameters) |
| 403 | Access denied by the connector provider |
| 404 | Document not found in the provider |
| 500 | Internal server error |
| 502 | Provider unreachable |

#### Example request

```bash
curl -X POST "http://broker:8761/connector/documents" \
  -H "X-Provider-ID: filenet" \
  -d "id=DOC123&objectStoreName=OS1"
```

#### Example response

```json
{
  "id": "b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw"
}
```

---

### List annotation IDs (connector)

`GET` `/documents/{documentId}/annotations/ids`

Retrieves the list of annotation identifiers for a document opened via `POST /connector/documents`. The broker proxies the request to the provider's `GET /annotations/ids` endpoint.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | path | string | Yes | Internal document ID returned by `POST /connector/documents` |

#### Response

JSON array of annotation ID objects.

```json
[
  {"id": "annot-001"},
  {"id": "annot-002"}
]
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Annotation IDs returned |
| 403 | Access denied by the connector provider |
| 404 | Document not found |
| 500 | Internal server error |
| 502 | Provider unreachable |

#### Example request

```bash
curl http://localhost:8761/documents/b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw/annotations/ids
```

#### Example response

```json
[
  {"id": "annot-001"},
  {"id": "annot-002"}
]
```

---

### Get annotation (connector)

`GET` `/documents/{documentId}/annotations/{annotationId}`

Retrieves a single annotation. The broker proxies the request to the provider and applies annotation position transformations when the document has a composite layout.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | path | string | Yes | Internal document ID |
| `annotationId` | path | string | Yes | Annotation identifier |

#### Response

Annotation object.

```json
{
  "id": {"id": "annot-001"},
  "type": "Highlight",
  "page": 0,
  "position": {"x": 100.0, "y": 200.0, "w": 150.0, "h": 20.0}
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Annotation returned |
| 403 | Access denied by the connector provider |
| 404 | Document or annotation not found |
| 500 | Internal server error |
| 502 | Provider unreachable |

#### Example request

```bash
curl http://localhost:8761/documents/b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw/annotations/annot-001
```

#### Example response

```json
{
  "id": {"id": "annot-001"},
  "type": "Highlight",
  "page": 0,
  "position": {"x": 100.0, "y": 200.0, "w": 150.0, "h": 20.0}
}
```

---

### Create annotation (connector)

`POST` `/documents/{documentId}/annotations`

Creates a new annotation. The broker applies position transformations and proxies the request to the provider's `POST /annotations` endpoint.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | path | string | Yes | Internal document ID |

**Request body:** Annotation object (JSON).

#### Response

The created annotation object.

```json
{
  "id": {"id": "annot-003"},
  "type": "Highlight",
  "page": 0,
  "position": {"x": 100.0, "y": 200.0, "w": 150.0, "h": 20.0}
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Annotation created |
| 400 | Bad request (invalid annotation data) |
| 403 | Access denied by the connector provider |
| 404 | Document not found |
| 500 | Internal server error |
| 502 | Provider unreachable |

#### Example request

```bash
curl -X POST http://localhost:8761/documents/b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw/annotations \
  -H "Content-Type: application/json" \
  -d '{"type": "Highlight", "page": 0, "position": {"x": 100, "y": 200, "w": 150, "h": 20}}'
```

#### Example response

```json
{
  "id": {"id": "annot-003"},
  "type": "Highlight",
  "page": 0,
  "position": {"x": 100.0, "y": 200.0, "w": 150.0, "h": 20.0}
}
```

---

### Update annotation (connector)

`PUT` `/documents/{documentId}/annotations/{annotationId}`

Updates an existing annotation.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | path | string | Yes | Internal document ID |
| `annotationId` | path | string | Yes | Annotation identifier |

**Request body:** Updated annotation object (JSON).

#### Response

The updated annotation object.

```json
{
  "id": {"id": "annot-001"},
  "type": "Highlight",
  "page": 0,
  "position": {"x": 110.0, "y": 200.0, "w": 150.0, "h": 20.0}
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Annotation updated |
| 400 | Bad request (invalid annotation data) |
| 403 | Access denied by the connector provider |
| 404 | Document or annotation not found |
| 500 | Internal server error |
| 502 | Provider unreachable |

#### Example request

```bash
curl -X PUT http://localhost:8761/documents/b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw/annotations/annot-001 \
  -H "Content-Type: application/json" \
  -d '{"type": "Highlight", "page": 0, "position": {"x": 110, "y": 200, "w": 150, "h": 20}}'
```

#### Example response

```json
{
  "id": {"id": "annot-001"},
  "type": "Highlight",
  "page": 0,
  "position": {"x": 110.0, "y": 200.0, "w": 150.0, "h": 20.0}
}
```

---

### Delete annotation (connector)

`DELETE` `/documents/{documentId}/annotations/{annotationId}`

Deletes an annotation.

#### Parameters

| Name | In | Type | Required | Description |
|------|----|------|----------|-------------|
| `documentId` | path | string | Yes | Internal document ID |
| `annotationId` | path | string | Yes | Annotation identifier |

#### Response

Returns `200 OK` with no body.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Annotation deleted |
| 403 | Access denied by the connector provider |
| 404 | Document or annotation not found |
| 500 | Internal server error |
| 502 | Provider unreachable |

#### Example request

```bash
curl -X DELETE http://localhost:8761/documents/b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw/annotations/annot-001
```

---

:::note
These annotation endpoints only apply to documents opened via `POST /connector/documents`. For documents opened via `POST /documents`, use the [annotation endpoints](#annotation-operations) documented above.
:::

---

## Administration

---

### Health readiness

`GET` `/health/readiness`

Returns `200 OK` with an empty body when the broker is ready to serve requests. Use this endpoint for container health checks and load balancer probes.

#### Parameters

None.

#### Response

Empty body with `200 OK` status.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Broker is ready |
| 503 | Broker is not ready |

#### Example request

```bash
curl http://localhost:8761/health/readiness
```

---

### Health records (HTML)

`GET` `/health/records`

Returns an HTML dashboard showing the health status of all registered microservices.

#### Parameters

None.

#### Response

HTML page (`Content-Type: text/html`).

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Health dashboard returned |
| 500 | Internal server error |

#### Example request

```bash
curl http://localhost:8761/health/records
```

---

### Health records (raw)

`GET` `/health/records/raw`

Returns raw health record data as JSON.

#### Parameters

None.

#### Response

Returns service states with their current status.

```json
{
  "serviceStates": {
    "document-converter": {"serviceStatus": "UP", "restarted": false},
    "document-renderer": {"serviceStatus": "UP", "restarted": false},
    "document-text-handler": {"serviceStatus": "UP", "restarted": false}
  }
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Health records returned |
| 500 | Internal server error |

#### Example request

```bash
curl http://localhost:8761/health/records/raw
```

#### Example response

```json
{
  "serviceStates": {
    "document-converter": {"serviceStatus": "UP", "restarted": false},
    "document-renderer": {"serviceStatus": "UP", "restarted": false},
    "document-text-handler": {"serviceStatus": "UP", "restarted": false}
  }
}
```

---

### Get version

`GET` `/version`

Returns installed tool versions for all components in the ARender stack.

#### Parameters

None.

#### Response

Returns a key-value map of tool names and their versions.

```json
{
  "Wkhtmltopdf": "0.12.6",
  "FFmpeg": "4.2.3",
  "LibreOffice": "25.8.2",
  "ImageMagick": "7.1.1-21",
  "ARender": "2026.0.0-rc0"
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Versions returned |
| 500 | Internal server error |

#### Example request

```bash
curl http://localhost:8761/version
```

#### Example response

```json
{
  "Wkhtmltopdf": "0.12.6",
  "FFmpeg": "4.2.3",
  "LibreOffice": "25.8.2",
  "ImageMagick": "7.1.1-21",
  "ARender": "2026.0.0-rc0"
}
```

---

### Get metadata

`GET` `/metadata`

Returns broker metadata as a key-value map.

#### Parameters

None.

#### Response

Key-value map of metadata properties.

```json
{
  "broker.version": "2026.0.0-rc0",
  "broker.uptime": "3h 15m"
}
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Metadata returned |
| 500 | Internal server error |

#### Example request

```bash
curl http://localhost:8761/metadata
```

---

### Get weather score

`GET` `/weather`

Returns a performance score as a floating-point number (lower is better). This endpoint measures the current load on the broker.

#### Parameters

None.

#### Response

A floating-point number representing the current performance score.

```
3.15
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Score returned |
| 500 | Internal server error |

#### Example request

```bash
curl http://localhost:8761/weather
```

#### Example response

```
3.15
```

---

### Admin UI

`GET` `/admin`

Browser-based administration interface for uploads, conversions, and transformations. Open this URL in a browser.

#### Parameters

None.

#### Response

HTML page (`Content-Type: text/html`).

#### Example request

Open in a browser:

```
http://localhost:8761/admin
```

---

## Next steps

- [Swagger UI (local)](http://localhost:8761/swagger-ui/index.html)
