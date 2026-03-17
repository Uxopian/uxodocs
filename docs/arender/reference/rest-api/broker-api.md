---
title: Broker REST API
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /reference/rest-api/broker-api
sidebar_position: 1
content_hash: 74a824487b9afc1553ad7fe7c4d2411379f3e748505f9806ad648d79270d995c
---

# Broker REST API

The service broker exposes the main REST API for document operations. The interactive Swagger UI is available at:

```
http://{broker-host}:8761/swagger-ui/index.html
```

The OpenAPI spec is available at `http://{broker-host}:8761/v3/api-docs`.

Base URL: `http://{broker-host}:8761`

## Document operations

### Upload a document

```
POST /documents
Content-Type: application/octet-stream
```

Upload a document as raw binary content.

| Parameter | In | Required | Description |
|-----------|----|----------|-------------|
| `documentId` | query | no | Assign a specific document ID |
| `documentTitle` | query | no | Document title |
| `documentUrl` | query | no | Document URL (alternative to binary body) |
| `failOnUnsupported` | query | no | If true (default), throws an exception for unsupported formats |

**Example:**

```bash
curl -X POST http://localhost:8761/documents \
  -H "Content-Type: application/octet-stream" \
  --data-binary @my-document.pdf
```

**Response:**

```json
{
  "id": "b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw"
}
```

### Upload a document and get its layout

```
POST /documents/layout
Content-Type: application/octet-stream
```

Uploads a document and returns its layout in a single call. The response format is the same as `GET /documents/{documentId}/layout`.

### Get document metadata

```
GET /documents/{documentId}
```

Returns document metadata including MIME type, format, rendered format, and conversion order IDs.

**Response:**

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

### Get document file

```
GET /documents/{documentId}/file
```

Returns the raw document content as a binary stream.

| Parameter | In | Required | Description |
|-----------|----|----------|-------------|
| `format` | query | no | Requested format (e.g. `pdf` to get the converted version) |

**Response:** binary content with the document's MIME type.

### Stream document file (chunked)

```
GET /documents/{documentId}/file/chunk
```

Returns the document content in chunks for large files.

| Parameter | In | Required | Description |
|-----------|----|----------|-------------|
| `format` | query | no | Document format |
| `Range` | header | yes | Byte range, format: `bytes=x-y` |

**Response:** binary content for the requested byte range.

### Delete a document

```
DELETE /documents/{documentId}
```

Evicts the document from the cache/storage. Returns `200 OK` with no body.

### Check document availability

```
GET /documents/{documentId}/check
```

Checks whether the document is available and accessible. Returns `200 OK` with an empty body if the document exists.

### Get document layout

```
GET /documents/{documentId}/layout
```

Returns the document structure: page count, page dimensions, rotation, and DPI per page.

**Response:**

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

### Get page image

```
GET /documents/{documentId}/pages/{page}/image?pageImageDescription={descriptor}
```

Returns a rendered image (PNG) for the specified page.

| Parameter | In | Required | Description |
|-----------|----|----------|-------------|
| `page` | path | yes | Page number (0-based) |
| `pageImageDescription` | query | no | Image descriptor specifying width, rotation, and optional filters |

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

**Example:**

```bash
curl "http://localhost:8761/documents/{documentId}/pages/0/image?pageImageDescription=IM_800_0" \
  --output page0.png
```

**Response:** binary PNG image (`Content-Type: image/png`).

### Get text positions

```
GET /documents/{documentId}/pages/{page}/text/position
```

Returns extracted text with character-level positions for the specified page.

**Response:**

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

### Search text in a page

```
GET /documents/{documentId}/pages/{page}/text
```

Searches for text positions in a specific page.

| Parameter | In | Required | Description |
|-----------|----|----------|-------------|
| `page` | path | yes | Page number (0-based) |
| `searchText` | query | yes | Text to search |
| `caseSensitive` | query | no | Case-sensitive search (default: false) |
| `accentSensitive` | query | no | Accent-sensitive search (default: false) |
| `regex` | query | no | Treat `searchText` as a regular expression |

**Response:**

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

### Search text across the document

```
GET /documents/{documentId}/search
```

Searches for text positions across multiple pages.

| Parameter | In | Required | Description |
|-----------|----|----------|-------------|
| `fromPage` | query | yes | Start page (0-based) |
| `toPage` | query | no | End page (0-based). If absent, searches to the last page |
| `searchText` | query | yes | Text to search |
| `caseSensitive` | query | no | Case-sensitive search |
| `accentSensitive` | query | no | Accent-sensitive search |
| `regex` | query | no | Treat `searchText` as a regular expression |

**Response:**

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

### Get pages containing text

```
GET /documents/{documentId}/pages
```

Returns a list of page numbers that contain the search text.

| Parameter | In | Required | Description |
|-----------|----|----------|-------------|
| `searchText` | query | yes | Text to search |
| `caseSensitive` | query | no | Case-sensitive search |
| `accentSensitive` | query | no | Accent-sensitive search |
| `regex` | query | no | Treat `searchText` as a regular expression |

**Response:**

```json
{
  "uuid": {"id": "b64_..."},
  "searchText": "hello",
  "pageList": [0, 2, 5]
}
```

### Get bookmarks

```
GET /documents/{documentId}/bookmarks
```

Returns the document outline (table of contents).

**Response:**

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

### Get named destinations

```
GET /documents/{documentId}/destinations
```

Returns named destinations (internal document links).

**Response:**

```json
{
  "documentId": {"id": "b64_..."},
  "namedDestinations": [
    {"name": "section1", "page": 3}
  ]
}
```

### Get digital signatures

```
GET /documents/{documentId}/signatures
```

Returns digital signature information and validation status.

**Response:**

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

### Get printable document

```
GET /documents/{documentId}/printable
```

Returns a print-ready version of the document as binary content.

### Get document annotations file

```
GET /documents/{documentId}/file/annotations
```

Returns the XFDF annotations file associated with the document.

### Get document conversions

```
GET /documents/{documentId}/conversions
```

Returns conversion order IDs associated with a specific document.

**Response:**

```json
[
  {"id": "b26207dc-22b8-4cc4-a448-9b377ad5b706"}
]
```

## Conversion operations

### Queue a conversion

```
POST /conversions
Content-Type: application/json
```

Submits a document for asynchronous format conversion.

**Request body:**

```json
{
  "documentId": {"id": "b64_..."},
  "format": "pdf"
}
```

**Response:**

```json
{
  "conversionOrderId": {"id": "b26207dc-22b8-4cc4-a448-9b377ad5b706"}
}
```

### Get all conversion orders

```
GET /conversions
```

**Response:**

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

### Poll conversion status

```
GET /conversions/{conversionOrderId}
```

Returns the current order status.

**Response:**

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

Possible states: `QUEUED`, `PROCESSING`, `PROCESSED`, `FAILED`.

### Cancel a conversion

```
DELETE /conversions/{conversionOrderId}
```

### Delete all conversion orders

```
DELETE /conversions
```

## Comparison operations

### Queue a comparison

```
POST /comparisons
Content-Type: application/json
```

Compares two documents asynchronously.

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

**Response:**

```json
{
  "comparisonOrderId": {"id": "d8fcc984-a163-4d89-8735-30583fb8f829"}
}
```

### Poll comparison status

```
GET /comparisons/{comparisonOrderId}
```

| Parameter | In | Required | Description |
|-----------|----|----------|-------------|
| `comparisonOrderId` | path | yes | The comparison order ID |
| `timeoutMs` | query | no | Maximum wait time (ms) before returning the current status |

**Response:**

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

### Get comparison differences

```
GET /difference
```

Returns detailed text differences between two documents.

| Parameter | In | Required | Description |
|-----------|----|----------|-------------|
| `leftDocumentId` | query | yes | First document ID |
| `rightDocumentId` | query | yes | Second document ID |

**Response:**

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

## Transformation operations

### Queue a transformation

```
POST /transformations
Content-Type: application/json
```

Submits a document transformation (merge, split, reorder, redact).

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

**Response:**

```json
{
  "transformationOrderId": {"id": "abc123-def456"}
}
```

### Get all transformation orders

```
GET /transformations
```

**Response:**

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

### Poll transformation status

```
GET /transformations/{transformationOrderId}
```

| Parameter | In | Required | Description |
|-----------|----|----------|-------------|
| `transformationOrderId` | path | yes | The transformation order ID |
| `timeoutMs` | query | no | Maximum wait time (ms) before returning |

Possible states: `QUEUED`, `PROCESSING`, `PROCESSED`, `FAILED`.

### Cancel a transformation

```
DELETE /transformations/{transformationOrderId}
```

### Delete all transformation orders

```
DELETE /transformations
```

## Annotation operations

Annotation endpoints are at the root path `/annotation`. All require a `documentId` query parameter.

### Get annotations

```
GET /annotation?documentId={documentId}
```

Returns all annotations for a document.

**Response:**

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

### Create annotations

```
PUT /annotation?documentId={documentId}
Content-Type: application/json
```

Creates new annotations. The request body is an `Annotations` object.

### Update annotations

```
POST /annotation?documentId={documentId}
Content-Type: application/json
```

Updates existing annotations.

### Delete annotations

```
DELETE /annotation?documentId={documentId}
Content-Type: application/json
```

Deletes annotations. The request body specifies which annotations to delete.

### Get annotation creation policy

```
GET /annotation/policy?documentId={documentId}
```

Returns the annotation creation policy for a document: what the user is allowed to create, available templates, security levels, and redaction reasons.

**Response (abbreviated):**

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

### Convert annotations between formats

```
POST /annotations/conversion
Content-Type: application/octet-stream
```

Converts annotations between formats.

| Parameter | In | Required | Description |
|-----------|----|----------|-------------|
| `sourceType` | query | yes | Source format: `FDF` or `XFDF` |
| `targetType` | query | yes | Target format: `FDF` or `XFDF` |
| `documentId` | query | yes | Document ID |
| `Accept` | header | yes | Expected response content type |

**Response:** annotation data in the target format.

## Document loading

### Load from URL

```
POST /accessor/load
Content-Type: application/json
```

Loads a document from a URL or file path. The request body is a `DocumentAccessor` object.

## Administration

### Health

```
GET /health/readiness
```

Returns `200 OK` with an empty body when the broker is ready to serve requests.

```
GET /health/records
```

Returns an HTML dashboard showing the health status of all registered microservices.

```
GET /health/records/raw
```

Returns raw health record data as JSON.

**Response:**

```json
{
  "serviceStates": {
    "document-converter": {"serviceStatus": "UP", "restarted": false},
    "document-renderer": {"serviceStatus": "UP", "restarted": false},
    "document-text-handler": {"serviceStatus": "UP", "restarted": false}
  }
}
```

### System info

```
GET /version
```

Returns installed tool versions.

**Response:**

```json
{
  "Wkhtmltopdf": "0.12.6",
  "FFmpeg": "4.2.3",
  "LibreOffice": "25.8.2",
  "ImageMagick": "7.1.1-21",
  "ARender": "2026.0.0-rc0"
}
```

```
GET /metadata
```

Returns broker metadata as a key-value map.

```
GET /weather
```

Returns a performance score as a floating-point number (lower is better).

**Response:** `3.15`

### Admin UI

```
GET /admin
```

Browser-based administration interface for uploads, conversions, and transformations.

## Next steps

- [Swagger UI (local)](http://localhost:8761/swagger-ui/index.html)
