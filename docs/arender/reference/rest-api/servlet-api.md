---
viewer: classic
title: Servlet API
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
slug: /reference/rest-api/servlet-api
sidebar_position: 2
content_hash: 9ce5104947d2f39a6c4f2202cff9adba144d4da155517393d7c7a52ca0f5e2ba
---

# Servlet API Reference

The ARender Web UI exposes a set of HTTP servlet endpoints for document operations, annotation export, printing, monitoring, and session management.

**Base URL:** `http://<arender_host>/arendergwt/`

Replace `<arender_host>` with your ARender HMI host and port.

---

## Document operations

### Upload document by reference

`GET` `/arendergwt/uploadServlet`

Load a document into ARender by passing its connector-level document ID. The server fetches the document and makes it available for viewing.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `uuid` | query | string | Yes | Document ID to upload |

#### Response

Returns the new UUID created from the document ID. The document is downloaded to the server and made available in ARender.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Document uploaded successfully |
| 400 | Missing or invalid `uuid` parameter |
| 500 | Internal server error during document retrieval |

#### Example request

```bash
curl -X GET 'http://<arender_host>/arendergwt/uploadServlet?uuid=docUUID'
```

#### Example response

```
b64_NWNjODk3MmQtMjJhOC00YzM3LWE4YjItNjZiMTkzOGFkMzU0
```

---

### Upload document by file

`POST` `/arendergwt/uploadServlet`

Upload a file directly to ARender via multipart form data. The server stores the file and returns a UUID for subsequent operations.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `file` | body | file | Yes | The file to upload (`multipart/form-data`) |

#### Response

Returns the new UUID assigned to the uploaded document.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | File uploaded successfully |
| 400 | Missing file in request body |
| 500 | Internal server error during file processing |

#### Example request

```bash
curl -X POST -H "Content-Type: multipart/form-data" \
  -F "file=@yourFile.pdf" \
  "http://<arender_host>/arendergwt/uploadServlet"
```

#### Example response

```
b64_NWNjODk3MmQtMjJhOC00YzM3LWE4YjItNjZiMTkzOGFkMzU0
```

---

### Download document

`GET` `/arendergwt/downloadServlet`

Download a document in its original format, as a rendered PDF, or as a ZIP archive.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `uuid` | query | string | Yes | Document ID |
| `sourceId` | query | string | No | Initial document ID (useful if the document ID has been transformed) |
| `title` | query | string | No | Title of the downloaded file |
| `type` | query | string | No | Download type: `INITIAL` (original format, no annotations), `RENDERED` (PDF, MP4, or TIFF), `COMPRESSED` (ZIP) |

#### Response

The document file in the requested format, with the filename set according to the `title` parameter.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Document returned successfully |
| 400 | Missing or invalid parameters |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl -X GET 'http://<arender_host>/arendergwt/downloadServlet?uuid=docUUID&title=DocumentTitle&type=INITIAL'
```

#### Example response

Binary file content in the requested format.

---

### Download document as Base64

`GET` `/arendergwt/downloadBase64EncodedDocument`

Download a document encoded in base64. The content must be decoded before use.

#### Parameters

None.

#### Response

The document content encoded as a base64 string.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Base64-encoded content returned |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl -X GET 'http://<arender_host>/arendergwt/downloadBase64EncodedDocument'
```

#### Example response

```
JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwov...
```

---

### Download document with annotations

`GET` `/arendergwt/downloadDocumentWithAnnotations`

Download a PDF document with annotations either burned into the page content or embedded as editable FDF annotation objects.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `operationName` | query | string | Yes | `renderAnnotations` (annotations flattened onto the PDF) or `renderFDFAnnotations` (annotations as editable FDF objects) |

#### Response

A PDF file with annotations applied according to the specified operation.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Annotated PDF returned |
| 400 | Missing or invalid `operationName` |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl -X GET 'http://<arender_host>/arendergwt/downloadDocumentWithAnnotations?operationName=renderAnnotations'
```

#### Example response

Binary PDF content with annotations.

---

### Download comparison results

`GET` `/arendergwt/downloadServlet/mergedWithCompareResult`

Download the result of comparing two documents. Common text is highlighted in green and differing text is highlighted in red.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `left` | query | string | Yes | UUID of the first document |
| `right` | query | string | Yes | UUID of the second document |

#### Response

A document where common text is highlighted in green and differing text is highlighted in red.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Comparison document returned |
| 400 | Missing `left` or `right` parameter |
| 404 | One or both documents not found |
| 500 | Internal server error |

#### Example request

```bash
curl -X GET 'http://<arender_host>/arendergwt/downloadServlet/mergedWithCompareResult?left=doc1UUID&right=doc2UUID'
```

#### Example response

Binary document content with highlighted differences.

---

### Merge documents

`POST` `/arendergwt/mergeDocumentsServlet`

Merge multiple documents into a single PDF. Also accepts `GET` requests with query parameters.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `url` | query/body | string | Yes (repeatable) | URL or connector reference for each document to merge. Repeat this parameter for each document. |

#### Response

JSON containing the UUID and page count of the merged document. The merged document can then be viewed at `http://<arender_host>/?uuid=<merged_uuid>`.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Documents merged successfully |
| 400 | Missing or invalid `url` parameters |
| 500 | Internal server error during merge |

#### Example request

```bash
# POST
curl --data "url=../../samples/arender.pdf&url=../../samples/fw4.pdf" \
  http://<arender_host>/arendergwt/mergeDocumentsServlet

# GET
curl -X GET 'http://<arender_host>/arendergwt/mergeDocumentsServlet?url=../../samples/arender.pdf&url=../../samples/fw4.pdf'
```

#### Example response

```json
{
  "uuid": "b64_NWNjODk3MmQtMjJhOC00YzM3LWE4YjItNjZiMTkzOGFkMzU0",
  "nbPages": "32"
}
```

---

### Create composite document

`POST` `/arendergwt/compositeAccessorServlet`

Create a composite (folder) document from a JSON structure describing nested document references. This is useful for building virtual folder trees that exceed URL length limits.

:::note
This endpoint requires sticky sessions if a load balancer is in front of the ARender HMI servers.
:::

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| Request body | body | JSON | Yes | A JSON object describing the folder structure (see below) |

The request body uses `Content-Type: application/json` and contains:

- `title` (optional) -- folder or document title
- `queryUrl` (optional) -- a valid `loadingQuery?<params>` string (makes this node a document)
- `references` (optional) -- array of child nodes (makes this node a folder)

`queryUrl` and `references` are mutually exclusive; `queryUrl` takes precedence.

#### Response

The ARender document ID of the created composite document.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Composite document created |
| 400 | Invalid JSON structure |
| 500 | Internal server error |

#### Example request

```bash
curl -X POST http://<arender_host>/arendergwt/compositeAccessorServlet \
  -d @composite.json --header "Content-Type: application/json"
```

With `composite.json`:

```json
{
  "title": "test_Container",
  "references": [
    { "queryUrl": "loadingQuery?url=http://example.com/doc1.pdf" },
    { "queryUrl": "loadingQuery?url=http://example.com/doc2.pdf" },
    {
      "title": "subfolder",
      "references": [
        { "queryUrl": "loadingQuery?url=http://example.com/doc3.pdf" }
      ]
    }
  ]
}
```

#### Example response

```
b64_NWNjODk3MmQtMjJhOC00YzM3LWE4YjItNjZiMTkzOGFkMzU0
```

---

### Retrieve composite document

`GET` `/arendergwt/compositeAccessorServlet`

Retrieve or initialize a composite document container. Returns a new document ID that can be used with the PUT endpoint to incrementally add documents.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `containerTitleComposite` | query | string | No | Composite document title (defaults to `"Document container"`) |

#### Response

A new document ID that can be used in subsequent requests.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Composite container created |
| 500 | Internal server error |

#### Example request

```bash
curl -X GET 'http://<arender_host>/arendergwt/compositeAccessorServlet?containerTitleComposite=myTitle'
```

#### Example response

```
b64_NWNjODk3MmQtMjJhOC00YzM3LWE4YjItNjZiMTkzOGFkMzU0
```

---

### Add document to composite

`PUT` `/arendergwt/compositeAccessorServlet`

Incrementally add documents to a composite container created via GET, then finalize it.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `documentIdComposite` | query | string | Yes | The document ID of the composite container (returned by GET) |
| `final` | query | string | No | If present, finalizes the container (loads it into the session and invalidates the cache entry). If absent, adds the parsed document URL to the container's children. |
| `containerTitleComposite` | query | string | No | Title for the child document being added |
| `mimeTypeComposite` | query | string | No | MIME type hint for the child document |
| Request body | body | string | No | URL-encoded document URL to add |

#### Response

The composite document ID.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Document added or container finalized |
| 400 | Missing `documentIdComposite` parameter |
| 404 | Composite container not found |
| 500 | Internal server error |

#### Example request

```bash
# Add a document to the container
curl -X PUT 'http://<arender_host>/arendergwt/compositeAccessorServlet?documentIdComposite=compositeUUID&final=true&containerTitleComposite=Doc1' \
  --data-urlencode "url=http://example.com/doc1.pdf"

# Finalize the container (no 'final' parameter omitted — pass 'final' with any value)
curl -X PUT 'http://<arender_host>/arendergwt/compositeAccessorServlet?documentIdComposite=compositeUUID&final=done'
```

#### Example response

```
b64_NWNjODk3MmQtMjJhOC00YzM3LWE4YjItNjZiMTkzOGFkMzU0
```

---

### Prepare external document opening

`GET` `/arendergwt/openExternalDocument`

Generate an encoded UUID from URL parameters, suitable for opening a document via a connector.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `url` | query | string | Yes | The document URL |

#### Response

An encoded UUID (base64 or encrypted, depending on configuration).

The encoding mode is controlled by the property:

```properties
arender.documentid.generator.beanName=documentIdGenerator
# Use encryptedDocumentIdGenerator for encrypted UUIDs
```

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Encoded UUID returned |
| 400 | Missing `url` parameter |
| 500 | Internal server error |

#### Example request

```bash
curl -X GET 'http://<arender_host>/arendergwt/openExternalDocument?url=docURL'
```

#### Example response

```
b64_NWNjODk3MmQtMjJhOC00YzM3LWE4YjItNjZiMTkzOGFkMzU0
```

---

### Evict document from cache

`GET` `/arendergwt/evictDocument`

Remove a document from both memory cache and filesystem cache. The document is no longer accessible on the server after eviction.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `uuid` | query | string | Yes | Document ID to evict |

#### Response

The document is removed from all caches.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Document evicted successfully |
| 400 | Missing `uuid` parameter |
| 404 | Document not found in cache |
| 500 | Internal server error |

#### Example request

```bash
curl -X GET 'http://<arender_host>/arendergwt/evictDocument?uuid=doc1UUID'
```

#### Example response

```
OK
```

---

## Document structure

### Get document layout

`GET` `/arendergwt/documentLayout`

Retrieve the structure of a document as JSON, including page dimensions, MIME type, and title.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `uuid` | query | string | Yes | Document ID |

#### Response

JSON describing the document structure with page dimensions, MIME type, and document title.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Layout returned successfully |
| 400 | Missing `uuid` parameter |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl -X GET 'http://<arender_host>/arendergwt/documentLayout?uuid=doc1UUID'
```

#### Example response

```json
{
  "type": "com.arondor.viewer.client.api.document.DocumentPageLayout",
  "documentId": { "id": "doc1UUID" },
  "documentTitle": "title.pdf",
  "mimeType": "application/pdf",
  "pageDimensionsList": [
    {
      "width": 720.0,
      "height": 405.0,
      "rotation": 0,
      "dpi": 0,
      "pageLayers": null
    }
  ]
}
```

---

### Get flat document layout

`GET` `/arendergwt/flatDocumentLayout`

Retrieve a flat list of all pages across child documents, without preserving the tree structure.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `uuid` | query | string | Yes | Document ID |

#### Response

A JSON array of page identifiers.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Flat layout returned successfully |
| 400 | Missing `uuid` parameter |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl -X GET 'http://<arender_host>/arendergwt/flatDocumentLayout?uuid=docuuid'
```

#### Example response

```json
[
  "b64_bG9jYWxl.../1/1/1/1|0|612.0",
  "b64_bG9jYWxl.../1/1/1/2|0|612.0",
  "b64_bG9jYWxl.../1/2|0|612.0"
]
```

---

### Get page content

`GET` `/arendergwt/pageContent`

Retrieve the text content and layout information for a specific page, including text positions, fonts, sizes, and hyperlink information.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `uuid` | query | string | Yes | Document ID |
| `pagePosition` | query | integer | Yes | Page number (zero-based) |

#### Response

JSON with text positions, fonts, sizes, and hyperlink information for the specified page.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Page content returned |
| 400 | Missing or invalid parameters |
| 404 | Document or page not found |
| 500 | Internal server error |

#### Example request

```bash
curl -X GET 'http://<arender_host>/arendergwt/pageContent?uuid=docuuid&pagePosition=3'
```

#### Example response

```json
{
  "pageNumber": 3,
  "positionTextList": [
    {
      "pageNumber": 3,
      "position": { "x": 124.68, "y": 204.1, "w": 113.35, "h": 34.0 },
      "text": "Features",
      "individualWidths": [15.07, 15.8, 15.6, 10.96, 15.77, 10.9, 15.8, 13.45],
      "fontSize": 27.0,
      "font": "BCDIEE+Oxygen bold",
      "paragraphId": 0,
      "rightToLeftText": false,
      "startTime": -1.0
    }
  ],
  "imageHyperlinkPositionList": []
}
```

---

## Page imaging

### Get page image

`GET` `/arendergwt/imageServlet`

Retrieve a rendered image of a specific document page at the requested resolution.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `uuid` | query | string | Yes | Document ID |
| `pagePosition` | query | integer | Yes | Page number |
| `desc` | query | integer | Yes | Image size in pixels |

#### Response

The page rendered as an image (binary content).

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Page image returned |
| 400 | Missing or invalid parameters |
| 404 | Document or page not found |
| 500 | Internal server error |

#### Example request

```bash
curl -X GET 'http://<arender_host>/arendergwt/imageServlet?uuid=docUUID&pagePosition=0&desc=1024'
```

#### Example response

Binary image content (PNG/JPEG).

---

### Crop page image

`GET` `/arendergwt/cropImageServlet`

Retrieve a cropped region of a document page as an image with descriptive text for saving.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `uuid` | query | string | Yes | Document ID |
| `locale` | query | string | Yes | Language of the text |
| `pagePosition` | query | integer | Yes | Page number |
| `desc` | query | string | Yes | Crop settings (size, position, color, etc.) |

#### Response

An image of the cropped region.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Cropped image returned |
| 400 | Missing or invalid parameters |
| 404 | Document or page not found |
| 500 | Internal server error |

#### Example request

```bash
curl -X GET 'http://<arender_host>/arendergwt/cropImageServlet?uuid=docUUID&locale=en&pagePosition=0&desc=size'
```

#### Example response

Binary image content.

---

## Annotation export

### Download XFDF/FDF annotations

`GET` `/arendergwt/servletXFDFAnnotations`

Download annotations for a document in XFDF or FDF format.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `uuid` | query | string | Yes | Document ID |
| `type` | query | string | No | File type: `XFDF` (default) or `FDF` |

#### Response

The annotation file in the requested format.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Annotation file returned |
| 400 | Missing `uuid` parameter |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl -X GET 'http://<arender_host>/arendergwt/servletXFDFAnnotations?uuid=docUUID&type=XFDF'
```

#### Example response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ns0:xfdf xmlns:ns0="http://ns.adobe.com/xfdf/">
  <ns0:annots>
    <ns0:highlight color="#273746" flags="obfuscate"
      name="c553fe65-a3a0-4628-b396-1201bfea6285" page="1"
      rect="153.26,334.42,264.57,374.02" title="admin"
      creationdate="D:20221214090312+00'00'" opacity="1.0"
      coords="153.26,374.02,264.57,374.02,153.26,334.42,264.57,334.42"/>
    <ns0:circle color="#EAF39C" flags=""
      name="cfdbee9c-dce1-4e62-bc10-55ab1554476b" page="0"
      rect="82.03,218.50,183.40,337.68" title="Unknown"
      creationdate="D:20221228084701+00'00'" opacity="0.7"
      interior-color="#EAF39C" width="0.0" style="solid"/>
  </ns0:annots>
</ns0:xfdf>
```

---

### Upload XFDF annotations

`POST` `/arendergwt/servletXFDFAnnotations`

Upload annotations in XFDF or FDF format to apply to a document. If the uploaded file is in FDF format, it will be converted to XFDF automatically.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `uuid` | query | string | Yes | Document ID to apply annotations to |
| `file` | body | file | Yes | The XFDF or FDF file to upload (`multipart/form-data`) |

#### Response

Annotations are applied to the specified document.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Annotations uploaded successfully |
| 400 | Missing `uuid` or file |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl -X POST -H "Content-Type: multipart/form-data" \
  -F "file=@annotations.xfdf" \
  "http://<arender_host>/arendergwt/servletXFDFAnnotations?uuid=docUUID"
```

#### Example response

```
OK
```

---

## Printing

### Print document

`GET` `/arendergwt/printServlet`

Display an HTML print-preview page for selected document pages, with a confirmation dialog for the user.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `uuid` | query | string | Yes | Document ID |
| `desc` | query | string | Yes | Image description for the pages to print |
| `pages` | query | string | Yes | Page numbers to print (comma-separated) |
| `imagePrintStyle` | query | string | No | Image style for the printed pages |

#### Response

An HTML page with a print preview and confirmation dialog.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Print preview page returned |
| 400 | Missing or invalid parameters |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl -X GET 'http://<arender_host>/arendergwt/printServlet?uuid=docUUID&desc=description&pages=1,2,3&imagePrintStyle=style'
```

#### Example response

HTML content with print preview.

---

### Print pages

`GET` `/arendergwt/printPage`

Render specific document pages as an HTML file suitable for browser printing.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `uuid` | query | string | Yes | Document ID |
| `nbPages` | query | integer | Yes | Number of pages to print |
| `renditionPrintWidth` | query | integer | Yes | Image width in the rendition (pixels) |
| `browserPrintWidth` | query | integer | Yes | Image width displayed in the browser (pixels) |
| `page` | query | string | Yes | Page numbers to print (comma-separated) |

#### Response

An HTML file containing the rendered pages ready for printing.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Print-ready HTML returned |
| 400 | Missing or invalid parameters |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl -X GET 'http://<arender_host>/arendergwt/printPage?uuid=docUUID&nbPages=3&renditionPrintWidth=800&browserPrintWidth=600&page=1,2,3'
```

#### Example response

HTML content with rendered pages.

---

## Monitoring and administration

### Get version

`GET` `/arendergwt/version`

Retrieve the deployed ARender version string.

#### Parameters

None.

#### Response

The ARender version in plain text.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Version returned |
| 500 | Internal server error |

#### Example request

```bash
curl -X GET 'http://<arender_host>/arendergwt/version'
```

#### Example response

```
4.12.0.0
```

---

### Get health records

`GET` `/arendergwt/health/records`

Display server health and service availability status. Returns an HTML page listing each service with its port, state, and availability.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `check` | query | string | No | `SELF` (return the HTML page even if no service is available) or `RENDITION` (return an error if no service is available) |

#### Response

An HTML page listing each service with its port, state, and availability.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Health records page returned |
| 503 | No rendition service available (when `check=RENDITION`) |
| 500 | Internal server error |

#### Example request

```bash
curl -X GET 'http://<arender_host>/arendergwt/health/records?check=SELF'
```

#### Example response

HTML content with service status table.

---

### Get Prometheus metrics

`GET` `/arendergwt/prometheus`

Expose Prometheus-compatible metrics for monitoring.

#### Parameters

None.

#### Response

Prometheus metrics in standard exposition format.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Metrics returned |
| 500 | Internal server error |

#### Example request

```bash
curl -X GET 'http://<arender_host>/arendergwt/prometheus'
```

#### Example response

```
# HELP arender_documents_loaded Total documents loaded
# TYPE arender_documents_loaded counter
arender_documents_loaded 142
```

---

### Get server performance

`GET` `/arendergwt/weather`

Retrieve performance data for all connected rendition servers.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `format` | query | string | No | Response format. If empty or `HTML`, returns an HTML page. Any other value (e.g., `JSON`) returns JSON. |

#### Response

Server performance data in the requested format.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Performance data returned |
| 500 | Internal server error |

#### Example request

```bash
# HTML format
curl -X GET 'http://<arender_host>/arendergwt/weather'

# JSON format
curl -X GET 'http://<arender_host>/arendergwt/weather?format=JSON'
```

#### Example response

HTML or JSON content with server performance metrics.

---

### Set rendition targets

`POST` `/arendergwt/weather`

Replace the entire list of rendition server targets with a new set of addresses.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| Request body | body | string | Yes | A JSON-like list of rendition server addresses |

#### Response

The rendition target list is replaced.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Targets replaced successfully |
| 400 | Invalid request body |
| 500 | Internal server error |

#### Example request

```bash
curl -X POST -d "{[http://rendition-host:1990]}" \
  'http://<arender_host>/arendergwt/weather'
```

#### Example response

```
OK
```

---

### Add rendition targets

`PUT` `/arendergwt/weather`

Add rendition server addresses to the existing target list without replacing it.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| Request body | body | string | Yes | A JSON-like list of rendition server addresses to add |

#### Response

The new addresses are added to the existing target list.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Targets added successfully |
| 400 | Invalid request body |
| 500 | Internal server error |

#### Example request

```bash
curl -X PUT -d "{[http://new-rendition-host:1990]}" \
  'http://<arender_host>/arendergwt/weather'
```

#### Example response

```
OK
```

---

## Session management

### Destroy session

`GET` `/arendergwt/destroySession`

Destroy the current user session and clear all associated ARender state. Accepts any HTTP method (`GET`, `POST`, etc.).

#### Parameters

None.

#### Response

The session is destroyed, clearing the following information:

- `user`
- `userAgent`
- `versionUserAgent`

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Session destroyed |
| 500 | Internal server error |

#### Example request

```bash
curl -X GET 'http://<arender_host>/arendergwt/destroySession'
```

#### Example response

```
OK
```

---

### Validate token

`POST` `/arendergwt/validateToken`

Validate an authentication token sent as a cookie or POST attribute. The token must be named `token`.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `token` | cookie/body | string | Yes | The authentication token to validate |

#### Response

Validation result from the configured `TokenValidator` implementation.

The validator class is configured via the property:

```properties
arender.server.json.load.token.validator=com.example.MyTokenValidator
```

The custom class must implement the `TokenValidator` interface and its `validate` method. The default validator (`NoopTokenValidator`) only checks that the token is not null.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Token is valid |
| 400 | Token is missing or null |
| 403 | Token validation failed |
| 500 | Internal server error |

#### Example request

```bash
curl -X POST 'http://<arender_host>/arendergwt/validateToken' \
  -d "token=myAuthToken"
```

#### Example response

```
Valid
```

---

## Connector-specific endpoints

### Update FileNet document metadata

`POST` `/arendergwt/updateDocumentMetadataServlet`

Update IBM FileNet document metadata. The `propertyKey` corresponds to the FileNet `symbolicName` or `displayName`.

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| `uuid` | query | string | Yes | Document ID of the target FileNet document |
| Request body | body | JSON | Yes | JSON mapping of metadata property names to values |

The request uses `Content-Type: application/json`.

#### Response

Metadata is updated on the FileNet document.

#### Errors

| Status | Description |
|--------|-------------|
| 200 | Metadata updated successfully |
| 400 | Invalid JSON or missing `uuid` |
| 404 | Document not found |
| 500 | Internal server error |

#### Example request

```bash
curl -X POST 'http://<arender_host>/arendergwt/updateDocumentMetadataServlet?uuid=docUUID' \
  -H "Content-Type: application/json" \
  -d '{"DocumentTitle": "Updated Title", "Status": "Approved"}'
```

#### Example response

```json
{
  "propertyKey1": "propertyValue1",
  "propertyKey2": "propertyValue2"
}
```
