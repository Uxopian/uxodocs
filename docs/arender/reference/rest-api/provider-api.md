---
title: Provider API
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
slug: /reference/rest-api/provider-api
sidebar_position: 3
content_hash: a14acb7dd6610b847863a01a51cdcf32ed01bddb7602c70bfe7f35c24b2805fe
---

# Provider API

The Provider API defines the REST contract that every provider must implement. The Document Service Broker calls these endpoints to fetch documents and manage annotations on behalf of the viewer.

For the broker-side endpoints that consume this API, see [Broker API - Provider operations](./broker-api.md#provider-operations).

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
| `objectStoreName` | query | string | provider-specific | **FileNet.** The object store name. |
| `id` | query | string | provider-specific | **FileNet.** The document identifier. |
| `vsId` | query | string | provider-specific | **FileNet.** The version series identifier. |
| `objectType` | query | string | provider-specific | **FileNet.** The object type. |
| `contentElement` | query | string | provider-specific | **FileNet.** The content element index. |
| `nodeRef` | query | string | provider-specific | **Alfresco.** The node reference. |
| `alf_ticket` | query | string | provider-specific | **Alfresco.** The authentication ticket. |
| `user` | query | string | provider-specific | **Alfresco.** The user identifier. |
| `versionLabel` | query | string | provider-specific | **Alfresco.** The version label. |

Query parameters are provider-specific. These are the whitelisted parameters forwarded by the broker from the original request.

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

### Retrieve the permissions

`GET` `/documents/permissions`

Since 2026.5.0. Returns the permissions the user calling the broker holds on a document. The broker calls it on every request that names a document, and enforces the answer. See [Permissions](/docs/arender-horizon/guides/features/permissions).

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| *(provider-specific)* | query | string | yes | Same document-identifying parameters as `GET /documents`. See the [parameters table above](#retrieve-a-document). |

The request carries the user's credentials the same way as `GET /documents`.

#### Response

| Field | Type | Description |
|-------|------|-------------|
| `permissions` | `String[]` | The granted permissions. A permission absent from the list is refused. An empty list refuses everything. |

The permission values are listed in [Permissions: Permission reference](/docs/arender-horizon/guides/features/permissions#permission-reference).

#### Errors

| Status | Broker behavior |
|--------|-----------------|
| `200` | The listed permissions are granted. |
| `404`, `501`, `204` or an empty body | The provider does not implement permissions: the broker grants every permission, except its [deny-list](/docs/arender-horizon/guides/features/permissions#broker-deny-list). |
| Any other status, a timeout or a connection error | The broker refuses the request (`403`). |

#### Example request

```bash
curl -X GET "http://filenet-provider:8787/documents/permissions?objectStoreName=OS1&id=DOC123" \
  -H "Authorization: Bearer eyJhbGciOi..."
```

#### Example response

```json
{
  "permissions": ["DOCUMENT_READ", "DOWNLOAD_RENDERED", "PRINT", "ANNOTATION_READ"]
}
```

---

### Retrieve the watermarks

`GET` `/documents/watermarks`

Since 2026.5.0. Returns the watermark of each action for a document. The broker calls it only when the user lacks at least one of the `VIEW_UNMARKED`, `DOWNLOAD_UNMARKED` and `PRINT_UNMARKED` permissions. See [Watermarks](/docs/arender-horizon/guides/features/watermarks).

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| *(provider-specific)* | query | string | yes | Same document-identifying parameters as `GET /documents`. See the [parameters table above](#retrieve-a-document). |

#### Response

| Field | Type | Description |
|-------|------|-------------|
| `view` | `Stamp` | The watermark drawn on the pages a user without `VIEW_UNMARKED` views. |
| `download` | `Stamp` | The watermark drawn on the PDFs a user without `DOWNLOAD_UNMARKED` downloads. |
| `print` | `Stamp` | The watermark drawn on the documents a user without `PRINT_UNMARKED` prints. |

A missing or `null` field gets the built-in watermark of that action.

A `Stamp` has these fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `String` | no | `TEXT`. No other type is supported. |
| `text` | `String` | yes | The text of the watermark. It may hold `{user.name}` and `{date.now#<pattern>}`, which the broker fills when it serves the document. See [Placeholders](/docs/arender-horizon/guides/features/watermarks#placeholders). |
| `placement` | `String` | yes | `CENTER`, `TOP_LEFT` or `TILED`. |
| `fontSize` | `Integer` | no | Font size in points, for an A4 page width. Must be positive. |
| `rotation` | `Integer` | no | Rotation in degrees, clockwise. |
| `color` | `String` | no | Text color, as `#RRGGBB`. |
| `opacity` | `Double` | no | Greater than 0 and at most 1. Defaults to `0.5`, or `0.2` when `TILED`. |

The `rest-provider-api` library provides the `Stamp` and `Watermarks` types, the built-in watermarks (`DefaultWatermarks`) and their check (`WatermarkValidator`).

#### Errors

| Status | Broker behavior |
|--------|-----------------|
| `200` | The watermarks are used. A watermark that cannot be drawn is replaced by the built-in one, and a warning is logged. |
| `404`, `501`, `204` or an empty body | The built-in watermarks are used. |
| Any other status, a timeout or a connection error | The broker refuses the request (`403`). |

#### Example request

```bash
curl -X GET "http://filenet-provider:8787/documents/watermarks?objectStoreName=OS1&id=DOC123"
```

#### Example response

```json
{
  "view": {
    "type": "TEXT",
    "text": "Confidential - {user.name}",
    "placement": "TILED",
    "fontSize": 14,
    "rotation": 330,
    "color": "#455A64"
  },
  "download": {
    "type": "TEXT",
    "text": "Downloaded by {user.name} at {date.now#yyyy/MM/dd HH:mm:ss}",
    "placement": "CENTER",
    "fontSize": 30,
    "rotation": 315,
    "color": "#B00020"
  }
}
```

---

### Retrieve the current user

`GET` `/auth/user`

Since 2026.5.0. Validates the token of a request and returns its user. The broker calls it when it delegates authentication to this provider (`arender.security.provider-token`). See [Security: Token validated by a provider](/docs/arender-horizon/concepts/security-model#token-validated-by-a-provider).

#### Parameters

The token comes in the header configured in `arender.security.provider-token.header`, the same header the provider reads on its other endpoints.

#### Response

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `String` | yes | The user's login in the repository. The broker stamps it as the author of the annotations the user creates or modifies. |
| `displayName` | `String` | no | The user's display name, used for `{user.name}` in watermarks. Defaults to `id`. |

#### Errors

| Status | Broker behavior |
|--------|-----------------|
| `200` with an `id` | The request is authenticated as that user. |
| `401` or `403`, or a `200` without `id` | The token is invalid: the broker answers `401`. |
| Any other status, a timeout or a connection error | The broker answers `503`. |

#### Example request

```bash
curl -X GET "http://filenet-provider:8787/auth/user" \
  -H "Authorization: Bearer eyJhbGciOi..."
```

#### Example response

```json
{
  "id": "jdoe",
  "displayName": "Jean Dupont"
}
```

---

### List annotations

`GET` `/annotations`

Returns all annotations associated with a document.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| *(provider-specific)* | query | string | yes | Same document-identifying parameters as `GET /documents`. See the [parameters table above](#retrieve-a-document). |

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
| *(provider-specific)* | query | string | yes | Same document-identifying parameters as `GET /documents`. See the [parameters table above](#retrieve-a-document). |

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
| *(provider-specific)* | query | string | yes | Same document-identifying parameters as `GET /documents`. See the [parameters table above](#retrieve-a-document). |

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
| *(provider-specific)* | query | string | yes | Same document-identifying parameters as `GET /documents`. See the [parameters table above](#retrieve-a-document). |
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
| *(provider-specific)* | query | string | yes | Same document-identifying parameters as `GET /documents`. See the [parameters table above](#retrieve-a-document). |
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
| *(provider-specific)* | query | string | yes | Same document-identifying parameters as `GET /documents`. See the [parameters table above](#retrieve-a-document). |

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

## Annotation flags

Since 2026.5.0, a provider tells the broker what the calling user may do to each annotation, through the `flags` of each annotation it returns:

```json
{
  "flags": {
    "readonly": true,
    "locked": true,
    "obfuscate": false
  }
}
```

| Flag | Set it when |
|------|-------------|
| `readonly` | The user may not update the annotation. Leave it off on the user's own annotations. |
| `locked` | The user may not delete the annotation. Leave it off on the user's own annotations. |
| `obfuscate` | On a redaction only: the redaction must stay opaque, even for a user granted `REDACTION_SEE_THROUGH`. |

A provider that supports permissions must:

- Return, on `GET /annotations`, the annotations the user may read, plus **every redaction and every page rotation** of the document. The broker filters the other annotations out for a user without `ANNOTATION_READ`.
- Set `readonly` and `locked` for the calling user on every annotation it returns. Never flag a page rotation.
- On `PUT`, keep the flags it stored, not the ones it answered: the flags it answers belong to the calling user.
- Answer `403` when the user may not perform an annotation operation. The broker returns it as `403`.
- Answer `501 Not Implemented` on the annotation endpoints it does not implement. A `404` on `GET /annotations` fails the request.

The broker combines the flags with the document permissions: updating needs `ANNOTATION_CREATE` (or `REDACTION_CREATE`) and `readonly` off, deleting needs the create permission and `locked` off, on the annotation and on each of its replies. The broker checks each `PUT` and `DELETE` against the stored annotation, and puts the stored flags and author back into each `PUT` body. It returns the final flags on every annotation response.

A provider that sets no flags lets every user holding `ANNOTATION_CREATE` update and delete every annotation.

The Alfresco, FileNet and M-Files providers compute the flags from the `annotation-rules` of their [permission policy](/docs/arender-horizon/guides/features/permissions#annotation-rules).

---

## Related pages

- [Broker API - Provider operations](./broker-api.md#provider-operations): broker-side endpoints that consume this API
- [Permissions](/docs/arender-horizon/guides/features/permissions): the permission model the provider answers
- [Watermarks](/docs/arender-horizon/guides/features/watermarks): how the broker draws the watermarks the provider answers
- [Security](/docs/arender-horizon/concepts/security-model): broker authentication with a token validated by the provider
- [Providers](../../concepts/connectors.md): concept overview
