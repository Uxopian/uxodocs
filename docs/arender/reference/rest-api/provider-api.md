---
title: Provider API
slug: /reference/rest-api/provider-api
sidebar_position: 3
---

# Provider API

The Provider API defines the REST contract that every connector provider must implement. The service broker calls these endpoints to fetch documents and manage annotations on behalf of the viewer.

For the broker-side endpoints that consume this API, see [Broker API - Connector operations](./broker-api.md#connector-operations).

---

## Data model

The Provider API uses a polymorphic document model for composite document support. The `rest-provider-api` library provides the shared Java types.

### ProviderDocument

Abstract base type for all document types. Uses a `type` property as a discriminator.

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
  "name": "Case Documents",
  "parameters": {},
  "contents": [
    {
      "type": "file",
      "name": "contract.pdf",
      "parameters": {
        "id": "DOC001",
        "objectStoreName": "OS1"
      }
    },
    {
      "type": "folder",
      "name": "Attachments",
      "parameters": {},
      "contents": [
        {
          "type": "file",
          "name": "annex.pdf",
          "parameters": {
            "id": "DOC002",
            "objectStoreName": "OS1"
          }
        }
      ]
    }
  ]
}
```

---

## Endpoints

### Retrieve a document

`GET` `/documents`

Fetches document content. Returns either a binary stream for a single document, or a JSON `ProviderFolder` for a composite document.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `objectStoreName` | query | string | connector-specific | **FileNet.** The object store name. |
| `id` | query | string | connector-specific | **FileNet.** The document identifier. |
| `vsId` | query | string | connector-specific | **FileNet.** The version series identifier. |
| `objectType` | query | string | connector-specific | **FileNet.** The object type. |
| `contentElement` | query | string | connector-specific | **FileNet.** The content element index. |
| `nodeRef` | query | string | connector-specific | **Alfresco.** The node reference. |
| `alf_ticket` | query | string | connector-specific | **Alfresco.** The authentication ticket. |
| `user` | query | string | connector-specific | **Alfresco.** The user identifier. |
| `versionLabel` | query | string | connector-specific | **Alfresco.** The version label. |

Query parameters are connector-specific. These are the whitelisted parameters forwarded by the broker from the original request.

#### Response

**Single document** -- The response body is a binary content stream.

| Header | Value | Description |
|--------|-------|-------------|
| `Content-Type` | `application/octet-stream` or specific MIME type | Document MIME type |
| `Content-Disposition` | `attachment; filename*=UTF-8''<encoded-name>` | Optional. Document title displayed in ARender |

**Composite document** -- The response body is a JSON `ProviderFolder` object. Each `ProviderFile` in the folder must include `parameters` with the values needed to fetch that file individually when the broker calls `GET /documents` again for each child.

| Header | Value |
|--------|-------|
| `Content-Type` | `application/json` |

#### Errors

| Status | Description |
|--------|-------------|
| `403` | Access denied. The authenticated user does not have permission to view this document. |
| `404` | Document not found. No document matches the provided parameters. |

#### Example request

Single document:

```bash
curl -X GET "http://filenet-provider:8787/documents?objectStoreName=OS1&id=DOC123"
```

Composite document:

```bash
curl -X GET "http://filenet-provider:8787/documents?objectStoreName=OS1&id=FOLDER001"
```

#### Example response

Single document returns a binary stream with appropriate headers. Composite document returns JSON:

```json
{
  "type": "folder",
  "name": "My Folder",
  "parameters": {},
  "contents": [
    {
      "type": "file",
      "name": "file1.pdf",
      "parameters": { "id": "DOC001", "objectStoreName": "OS1" }
    },
    {
      "type": "file",
      "name": "file2.pdf",
      "parameters": { "id": "DOC002", "objectStoreName": "OS1" }
    }
  ]
}
```

---

### List annotations

`GET` `/annotations`

Returns all annotations associated with a document.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| *(connector-specific)* | query | string | yes | Same document-identifying parameters as `GET /documents`. See the [parameters table above](#retrieve-a-document). |

#### Response

A JSON array of annotation objects for the specified document.

#### Errors

| Status | Description |
|--------|-------------|
| `200` | Annotations retrieved successfully. |
| `404` | Document not found. No document matches the provided parameters. |

#### Example request

```bash
curl -X GET "http://filenet-provider:8787/annotations?objectStoreName=OS1&id=DOC123"
```

#### Example response

```json
[
  {
    "id": "annotation-001",
    "type": "highlight",
    "page": 1,
    "content": "Important section"
  },
  {
    "id": "annotation-002",
    "type": "note",
    "page": 3,
    "content": "Review needed"
  }
]
```

---

### List annotation IDs

`GET` `/annotations/ids`

Returns only the identifiers of annotations associated with a document, without the full annotation data.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| *(connector-specific)* | query | string | yes | Same document-identifying parameters as `GET /documents`. See the [parameters table above](#retrieve-a-document). |

#### Response

A JSON array of annotation ID objects.

#### Errors

| Status | Description |
|--------|-------------|
| `200` | Annotation IDs retrieved successfully. |
| `404` | Document not found. No document matches the provided parameters. |

#### Example request

```bash
curl -X GET "http://filenet-provider:8787/annotations/ids?objectStoreName=OS1&id=DOC123"
```

#### Example response

```json
[
  { "id": "annotation-001" },
  { "id": "annotation-002" },
  { "id": "annotation-003" }
]
```

---

### Retrieve an annotation

`GET` `/annotations/{annotationId}`

Fetches a single annotation by its identifier.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `annotationId` | path | string | yes | The unique identifier of the annotation. |
| *(connector-specific)* | query | string | yes | Same document-identifying parameters as `GET /documents`. See the [parameters table above](#retrieve-a-document). |

#### Response

A single annotation object (JSON).

#### Errors

| Status | Description |
|--------|-------------|
| `200` | Annotation retrieved successfully. |
| `404` | Annotation or document not found. |

#### Example request

```bash
curl -X GET "http://filenet-provider:8787/annotations/annotation-001?objectStoreName=OS1&id=DOC123"
```

#### Example response

```json
{
  "id": "annotation-001",
  "type": "highlight",
  "page": 1,
  "content": "Important section"
}
```

---

### Create an annotation

`POST` `/annotations`

Creates a new annotation on a document.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| *(connector-specific)* | query | string | yes | Same document-identifying parameters as `GET /documents`. See the [parameters table above](#retrieve-a-document). |
| *(annotation)* | body | object | yes | The annotation object to create (JSON). |

#### Response

The created annotation object, including its server-assigned `id`.

#### Errors

| Status | Description |
|--------|-------------|
| `201` | Annotation created successfully. |
| `400` | Bad request. The annotation body is malformed or missing required fields. |
| `404` | Document not found. No document matches the provided parameters. |

#### Example request

```bash
curl -X POST "http://filenet-provider:8787/annotations?objectStoreName=OS1&id=DOC123" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "note",
    "page": 2,
    "content": "Needs legal review"
  }'
```

#### Example response

```json
{
  "id": "annotation-004",
  "type": "note",
  "page": 2,
  "content": "Needs legal review"
}
```

---

### Update an annotation

`PUT` `/annotations/{annotationId}`

Updates an existing annotation.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `annotationId` | path | string | yes | The unique identifier of the annotation to update. |
| *(connector-specific)* | query | string | yes | Same document-identifying parameters as `GET /documents`. See the [parameters table above](#retrieve-a-document). |
| *(annotation)* | body | object | yes | The updated annotation object (JSON). |

#### Response

The updated annotation object.

#### Errors

| Status | Description |
|--------|-------------|
| `200` | Annotation updated successfully. |
| `400` | Bad request. The annotation body is malformed or missing required fields. |
| `404` | Annotation or document not found. |

#### Example request

```bash
curl -X PUT "http://filenet-provider:8787/annotations/annotation-004?objectStoreName=OS1&id=DOC123" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "annotation-004",
    "type": "note",
    "page": 2,
    "content": "Approved by legal team"
  }'
```

#### Example response

```json
{
  "id": "annotation-004",
  "type": "note",
  "page": 2,
  "content": "Approved by legal team"
}
```

---

### Delete an annotation

`DELETE` `/annotations/{annotationId}`

Deletes an annotation by its identifier.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `annotationId` | path | string | yes | The unique identifier of the annotation to delete. |
| *(connector-specific)* | query | string | yes | Same document-identifying parameters as `GET /documents`. See the [parameters table above](#retrieve-a-document). |

#### Response

Empty response body on success.

#### Errors

| Status | Description |
|--------|-------------|
| `200` | Annotation deleted successfully. |
| `404` | Annotation or document not found. |

#### Example request

```bash
curl -X DELETE "http://filenet-provider:8787/annotations/annotation-004?objectStoreName=OS1&id=DOC123"
```

#### Example response

```
HTTP/1.1 200 OK
Content-Length: 0
```

---

## Related pages

- [Broker API - Connector operations](./broker-api.md#connector-operations): broker-side endpoints that consume this API
- [Connectors](../../concepts/connectors.md): concept overview
