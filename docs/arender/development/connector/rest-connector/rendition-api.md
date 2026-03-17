---
title: Rendition API Reference
last_update:
  date: '2026-03-06T09:51:34.220Z'
  author: CI/CD Bot
sidebar_position: 3
content_hash: cc7cde42a634ac5e89f614cfd730c920be465a333b45e97c52e50686d17d0dd1
---

The Rendition API is exposed by the Rendition Engine and consumed by the ReactJS frontend. These endpoints handle opening documents through REST connectors and managing annotations on connector-provided documents.

## Headers

| Header | Required | Description |
|--------|----------|-------------|
| `X-Provider-ID` | No | Identifies which registered REST connector to route to (e.g., `filenet`, `alfresco`). If omitted, the Rendition Engine uses the `connector.defaultRegistry` configuration value. |

## Endpoints

### POST /connector/documents

Opens a document through a REST connector. The Rendition Engine resolves the connector from the `X-Provider-ID` header, forwards the request parameters to the connector's `GET /documents` endpoint, stores the result, and returns an internal `DocumentId`.

```bash
POST /connector/documents
```

**Headers:**

| Header | Value | Description |
|--------|-------|-------------|
| `X-Provider-ID` | `filenet`, `alfresco`, etc. | Connector to use |
| `Content-Type` | `application/x-www-form-urlencoded` | Form-encoded parameters |

**Request body:** Form-encoded parameters specific to the connector (e.g., `id=DOC123&objectStoreName=OS1` for FileNet).

**Response:** `DocumentId` object (JSON) — the ARender internal document identifier used for all subsequent operations.

**Example:**

```bash
curl -X POST "http://rendition:8761/connector/documents" \
  -H "X-Provider-ID: filenet" \
  -d "id=DOC123&objectStoreName=OS1"
```

---

### GET /documents/\{documentId\}/annotations/ids

Retrieves the list of annotation identifiers for a document previously opened via `POST /connector/documents`.

```bash
GET /documents/{documentId}/annotations/ids
```

**Path parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `documentId` | `DocumentId` | Internal document ID returned by `POST /connector/documents` |

**Response:** JSON array of `AnnotationId` objects.

---

### GET /documents/\{documentId\}/annotations/\{annotationId\}

Retrieves a single annotation by its identifier.

```bash
GET /documents/{documentId}/annotations/{annotationId}
```

**Path parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `documentId` | `DocumentId` | Internal document ID |
| `annotationId` | `AnnotationId` | Annotation identifier |

**Response:** `Annotation` object (JSON). The Rendition Engine applies annotation position transformations before returning the result.

---

### POST /documents/\{documentId\}/annotations

Creates a new annotation on a document.

```bash
POST /documents/{documentId}/annotations
```

**Path parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `documentId` | `DocumentId` | Internal document ID |

**Request body:** `Annotation` object (JSON).

**Response:** The created `Annotation` object (JSON).

---

### PUT /documents/\{documentId\}/annotations/\{annotationId\}

Updates an existing annotation.

```bash
PUT /documents/{documentId}/annotations/{annotationId}
```

**Path parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `documentId` | `DocumentId` | Internal document ID |
| `annotationId` | `AnnotationId` | Annotation identifier |

**Request body:** `Annotation` object (JSON).

**Response:** The updated `Annotation` object (JSON).

---

### DELETE /documents/\{documentId\}/annotations/\{annotationId\}

Deletes an annotation.

```bash
DELETE /documents/{documentId}/annotations/{annotationId}
```

**Path parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `documentId` | `DocumentId` | Internal document ID |
| `annotationId` | `AnnotationId` | Annotation identifier |

**Response:** HTTP 200 with no body.

## Routing

When the Rendition Engine receives a request on `POST /connector/documents`:

1. It reads the `X-Provider-ID` header to identify the connector. If absent, it uses the `connector.defaultRegistry` value.
2. It looks up the connector's configuration (`baseUrl` and `whitelistedParams`) from the registry.
3. It generates a `DocumentId` from the whitelisted parameters and checks its internal cache.
4. If the document is not cached, it builds a `GET /documents` request to the connector's `baseUrl` with the forwarded parameters.
5. It stores the response (binary content or composite folder structure) and returns the `DocumentId`.

For annotation operations, the Rendition Engine retrieves the stored provider name and original URL parameters from its cache and forwards requests to the connector's annotation endpoints.
