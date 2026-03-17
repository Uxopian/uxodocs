---
title: Provider API Reference
last_update:
  date: '2026-03-06T09:51:34.220Z'
  author: CI/CD Bot
sidebar_position: 2
content_hash: 8c8f5771c6c95a7d4ee9b273a6e8f74cb4b7a072debdc0d4e8d744995251877c
---

The Provider API defines the REST endpoints that every REST connector must implement. The Rendition calls these endpoints to fetch documents and manage annotations.

## Data Model

The connector API uses a polymorphic document model for composite document support. The `rest-provider-api` library provides the shared types.

### ProviderDocument

Abstract base class for all document types. Uses Jackson `@JsonTypeInfo` with a `type` property discriminator.

| Field | Type | Description |
|-------|------|-------------|
| `name` | `String` | Display name of the document or folder |
| `type` | `String` | Discriminator: `"file"` or `"folder"` |

### ProviderFile

Represents a single document.

| Field | Type | Description |
|-------|------|-------------|
| `name` | `String` | Document display name |
| `parameters` | `Map<String, String>` | Query parameters needed to fetch this document via `GET /documents` |

```json
{
  "type": "file",
  "name": "report.pdf",
  "parameters": {
    "id": "DOC123",
    "objectStoreName": "OS1"
  }
}
```

### ProviderFolder

Represents a folder containing files and/or subfolders.

| Field | Type | Description |
|-------|------|-------------|
| `name` | `String` | Folder display name |
| `parameters` | `Map<String, String>` | Optional parameters for this folder |
| `contents` | `List<ProviderDocument>` | Child files and folders |

```json
{
  "type": "folder",
  "name": "Root",
  "parameters": {},
  "contents": [
    {
      "type": "file",
      "name": "doc1.pdf",
      "parameters": { "document_path": "doc1" }
    },
    {
      "type": "file",
      "name": "doc2.pdf",
      "parameters": { "document_path": "doc2" }
    }
  ]
}
```

## Endpoints

### GET /documents

Fetches document content. Returns either a binary stream (single document) or a JSON `ProviderFolder` (composite document).

```bash
GET /documents?{connector-specific-params}
```

**Query parameters:** Connector-specific. These are the parameters forwarded by the Rendition Engine from the original request. Examples:
- FileNet: `objectStoreName`, `id`, `vsId`, `objectType`, `contentElement`
- Alfresco: `nodeRef`, `alf_ticket`, `user`, `versionLabel`
- Custom: any parameters your connector defines

**Response (single document):**

| Header | Value | Description |
|--------|-------|-------------|
| `Content-Type` | `application/octet-stream` (or specific MIME type) | Document MIME type |
| `Content-Disposition` | `attachment; filename*=UTF-8''<encoded-name>` | Optional. Document title for display in ARender |

Response body: binary document content stream.

**Response (composite document):**

| Header | Value |
|--------|-------|
| `Content-Type` | `application/json` |

Response body: a JSON `ProviderFolder` object. Each `ProviderFile` in the folder must include `parameters` with the values needed to fetch that file individually when the Rendition Engine calls `GET /documents` again.

**Status codes:**

| Code | Meaning |
|------|---------|
| 200 | Document retrieved successfully |
| 403 | Access denied |
| 404 | Document not found |

**Example — single document:**

```bash
curl -X GET "http://localhost:8787/documents?objectStoreName=OS1&id=DOC123"
```

**Example — composite document response:**

```bash
curl -X GET "http://localhost:8787/documents?document_path=my-folder"
```

```json
{
  "type": "folder",
  "name": "My Folder",
  "parameters": {},
  "contents": [
    {
      "type": "file",
      "name": "file1.pdf",
      "parameters": { "document_path": "file1" }
    }
  ]
}
```

---

### GET /annotations

Fetches all annotations for a document.

```bash
GET /annotations?{connector-specific-params}
```

**Query parameters:** Same document-identifying parameters as `GET /documents`.

**Response:** `Annotations` object (JSON) containing a list of `Annotation` objects.

---

### GET /annotations/ids

Fetches only the annotation identifiers for a document.

```bash
GET /annotations/ids?{connector-specific-params}
```

**Query parameters:** Same document-identifying parameters as `GET /documents`.

**Response:** JSON array of `AnnotationId` objects.

```bash
curl -X GET "http://localhost:8787/annotations/ids?objectStoreName=OS1&id=DOC123"
```

---

### GET /annotations/\{annotationId\}

Fetches a single annotation by its identifier.

```bash
GET /annotations/{annotationId}?{connector-specific-params}
```

**Path parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `annotationId` | `AnnotationId` | The annotation identifier |

**Query parameters:** Same document-identifying parameters as `GET /documents`.

**Response:** `Annotation` object (JSON).

---

### POST /annotations

Creates a new annotation on a document.

```bash
POST /annotations?{connector-specific-params}
```

**Query parameters:** Same document-identifying parameters as `GET /documents`.

**Request body:** `Annotation` object (JSON).

**Response:** The created `Annotation` object (JSON).

---

### PUT /annotations/\{annotationId\}

Updates an existing annotation.

```bash
PUT /annotations/{annotationId}?{connector-specific-params}
```

**Path parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `annotationId` | `AnnotationId` | The annotation identifier |

**Query parameters:** Same document-identifying parameters as `GET /documents`.

**Request body:** `Annotation` object (JSON).

**Response:** The updated `Annotation` object (JSON).

---

### DELETE /annotations/\{annotationId\}

Deletes an annotation.

```bash
DELETE /annotations/{annotationId}?{connector-specific-params}
```

**Path parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `annotationId` | `AnnotationId` | The annotation identifier |

**Query parameters:** Same document-identifying parameters as `GET /documents`.

**Response:** HTTP 200 with no body.
