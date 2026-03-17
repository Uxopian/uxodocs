---
title: Servlet API
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /reference/rest-api/servlet-api
sidebar_position: 2
content_hash: 7e96100e5306ac3388f6d3576e2d4ed14634ca9d0ded4f7a335d669af16b936d
---

# Servlet API Reference

The ARender Web UI exposes a set of HTTP servlet endpoints under the `/arendergwt/` path. These endpoints provide programmatic access to document operations, annotation export, printing, monitoring, and session management.

All URLs in this reference use the base path `http://<arender_host>/arendergwt/`. Replace `<arender_host>` with your ARender HMI host and port.

---

## Document Operations

### Upload / Load a Document

Upload a document by reference (GET) or by file content (POST).

**Servlet:** `uploadServlet`

#### Upload by Reference

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/arendergwt/uploadServlet` |

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `uuid` | Yes | Document ID to upload |

**Response:** Returns the new UUID created from the document ID. The document is downloaded to the server and made available in ARender.

```bash
curl -X GET 'http://<arender_host>/arendergwt/uploadServlet?uuid=docUUID'
```

#### Upload by File Content

| | |
|---|---|
| **Method** | `POST` |
| **Path** | `/arendergwt/uploadServlet` |
| **Content-Type** | `multipart/form-data` |

**Form Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `file` | Yes | The file to upload |

**Response:** Returns the new UUID assigned to the uploaded document.

```bash
curl -X POST -H "Content-Type: multipart/form-data" \
  -F "file=@yourFile.pdf" \
  "http://<arender_host>/arendergwt/uploadServlet"
```

---

### Download a Document

Download a document in its original format, as PDF, or as a ZIP archive.

**Servlet:** `downloadServlet`

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/arendergwt/downloadServlet` |

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `uuid` | Yes | Document ID |
| `sourceId` | No | Initial document ID (useful if the document ID has been transformed) |
| `title` | No | Title of the downloaded file |
| `type` | No | Download type: `INITIAL` (original format, no annotations), `RENDERED` (PDF, MP4, or TIFF), `COMPRESSED` (ZIP) |

**Response:** The document file in the requested format, renamed according to the `title` parameter.

```bash
curl -X GET 'http://<arender_host>/arendergwt/downloadServlet?uuid=docUUID&title=DocumentTitle&type=INITIAL'
```

---

### Download Document as Base64

Download a document encoded in base64.

**Servlet:** `downloadBase64EncodedDocument`

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/arendergwt/downloadBase64EncodedDocument` |

**Response:** The document content encoded in base64. The content must be decoded before use.

```bash
curl -X GET 'http://<arender_host>/arendergwt/downloadBase64EncodedDocument'
```

---

### Download Document with Annotations

Download a PDF document with annotations burned in or as editable FDF annotations.

**Servlet:** `downloadDocumentWithAnnotations`

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/arendergwt/downloadDocumentWithAnnotations` |

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `operationName` | Yes | `renderAnnotations` (annotations flattened onto the PDF) or `renderFDFAnnotations` (annotations as editable FDF objects) |

**Response:** A PDF file with annotations applied.

```bash
curl -X GET 'http://<arender_host>/arendergwt/downloadDocumentWithAnnotations?operationName=renderAnnotations'
```

---

### Download Comparison Results

Download the result of comparing two documents, with differences highlighted.

**Servlet:** `downloadDocumentWithCompareResultsServlet`

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/arendergwt/downloadServlet/mergedWithCompareResult` |

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `left` | Yes | UUID of the first document |
| `right` | Yes | UUID of the second document |

**Response:** A document where common text is highlighted in green and differing text is highlighted in red.

```bash
curl -X GET 'http://<arender_host>/arendergwt/downloadServlet/mergedWithCompareResult?left=doc1UUID&right=doc2UUID'
```

---

### Merge Documents

Merge multiple documents into a single PDF.

**Servlet:** `mergeDocumentsServlet`

| | |
|---|---|
| **Method** | `POST` or `GET` |
| **Path** | `/arendergwt/mergeDocumentsServlet` |

**Query/Form Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `url` | Yes (repeatable) | URL or connector reference for each document to merge |

**Response:** JSON containing the UUID and page count of the merged document.

```json
{
  "uuid": "b64_NWNjODk3MmQtMjJhOC00YzM3LWE4YjItNjZiMTkzOGFkMzU0",
  "nbPages": "32"
}
```

**Examples:**

```bash
# POST
curl --data "url=../../samples/arender.pdf&url=../../samples/fw4.pdf" \
  http://<arender_host>/arendergwt/mergeDocumentsServlet

# GET
curl -X GET 'http://<arender_host>/arendergwt/mergeDocumentsServlet?url=../../samples/arender.pdf&url=../../samples/fw4.pdf'
```

The merged document can then be viewed at:

```
http://<arender_host>/?uuid=<merged_uuid>
```

---

### Composite Documents (Folder Structure)

Create or retrieve composite (folder) documents from a JSON structure describing nested document references. This is useful for building virtual folder trees that exceed URL length limits.

**Servlet:** `compositeAccessorServlet`

#### Create a Composite Document

| | |
|---|---|
| **Method** | `POST` |
| **Path** | `/arendergwt/compositeAccessorServlet` |
| **Content-Type** | `application/json` |

**Request Body:** A JSON object describing the folder structure:

- `title` (optional) -- folder or document title
- `queryUrl` (optional) -- a valid `loadingQuery?<params>` string (makes this node a document)
- `references` (optional) -- array of child nodes (makes this node a folder)

`queryUrl` and `references` are mutually exclusive; `queryUrl` takes precedence.

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

**Response:** The ARender document ID of the created composite document.

```bash
curl -X POST http://<arender_host>/arendergwt/compositeAccessorServlet \
  -d @composite.json --header "Content-Type: application/json"
```

:::note
This endpoint requires sticky sessions if a load balancer is in front of the ARender HMI servers.
:::

#### Retrieve a Composite Document

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/arendergwt/compositeAccessorServlet` |

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `containerTitleComposite` | No | Composite document title (defaults to `"Document container"`) |

**Response:** A new document ID that can be used in subsequent requests.

```bash
curl -X GET 'http://<arender_host>/arendergwt/compositeAccessorServlet?containerTitleComposite=myTitle'
```

#### Add a Document to a Composite (Incremental Build)

| | |
|---|---|
| **Method** | `PUT` |
| **Path** | `/arendergwt/compositeAccessorServlet` |

Use PUT to incrementally add documents to a composite container created via GET, then finalize it.

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `documentIdComposite` | Yes | The document ID of the composite container (returned by GET) |
| `final` | No | If present, finalizes the container (loads it into the session and invalidates the cache entry). If absent, adds the parsed document URL to the container's children. |
| `containerTitleComposite` | No | Title for the child document being added |
| `mimeTypeComposite` | No | MIME type hint for the child document |

**Response:** The composite document ID.

```bash
# Add a document to the container
curl -X PUT 'http://<arender_host>/arendergwt/compositeAccessorServlet?documentIdComposite=compositeUUID&final=true&containerTitleComposite=Doc1' \
  --data-urlencode "url=http://example.com/doc1.pdf"

# Finalize the container (no 'final' parameter omitted — pass 'final' with any value)
curl -X PUT 'http://<arender_host>/arendergwt/compositeAccessorServlet?documentIdComposite=compositeUUID&final=done'
```

---

### Prepare External Document Opening

Generate an encoded UUID from URL parameters, suitable for opening a document via a connector.

**Servlet:** `openExternalDocument`

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/arendergwt/openExternalDocument` |

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `url` | Yes | The document URL |

**Response:** An encoded UUID (base64 or encrypted, depending on configuration).

The encoding mode is controlled by the property:

```properties
arender.documentid.generator.beanName=documentIdGenerator
# Use encryptedDocumentIdGenerator for encrypted UUIDs
```

```bash
curl -X GET 'http://<arender_host>/arendergwt/openExternalDocument?url=docURL'
```

---

### Evict Document from Cache

Remove a document from both memory cache and filesystem cache.

**Servlet:** `evictDocument`

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/arendergwt/evictDocument` |

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `uuid` | Yes | Document ID to evict |

**Response:** The document is removed from all caches and is no longer accessible on the server.

```bash
curl -X GET 'http://<arender_host>/arendergwt/evictDocument?uuid=doc1UUID'
```

---

## Document Structure and Content

### Document Layout

Retrieve the structure of a document as JSON, including page dimensions, MIME type, and title.

**Servlet:** `documentLayout`

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/arendergwt/documentLayout` |

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `uuid` | Yes | Document ID |

**Response:** JSON describing the document structure.

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

```bash
curl -X GET 'http://<arender_host>/arendergwt/documentLayout?uuid=doc1UUID'
```

---

### Flat Document Layout

Retrieve a flat list of all pages across child documents, without preserving the tree structure.

**Servlet:** `flatDocumentLayout`

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/arendergwt/flatDocumentLayout` |

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `uuid` | Yes | Document ID |

**Response:** A JSON array of page identifiers.

```json
[
  "b64_bG9jYWxl.../1/1/1/1|0|612.0",
  "b64_bG9jYWxl.../1/1/1/2|0|612.0",
  "b64_bG9jYWxl.../1/2|0|612.0"
]
```

```bash
curl -X GET 'http://<arender_host>/arendergwt/flatDocumentLayout?uuid=docuuid'
```

---

### Page Content

Retrieve the text content and layout information for a specific page.

**Servlet:** `pageContent`

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/arendergwt/pageContent` |

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `uuid` | Yes | Document ID |
| `pagePosition` | Yes | Page number (zero-based) |

**Response:** JSON with text positions, fonts, sizes, and hyperlink information.

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

```bash
curl -X GET 'http://<arender_host>/arendergwt/pageContent?uuid=docuuid&pagePosition=3'
```

---

## Page Imaging

### Get Page Image

Retrieve a rendered image of a specific document page.

**Servlet:** `imageServlet`

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/arendergwt/imageServlet` |

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `uuid` | Yes | Document ID |
| `pagePosition` | Yes | Page number |
| `desc` | Yes | Image size in pixels |

**Response:** The page rendered as an image.

```bash
curl -X GET 'http://<arender_host>/arendergwt/imageServlet?uuid=docUUID&pagePosition=0&desc=1024'
```

---

### Crop Page Image

Retrieve a cropped region of a document page as an image.

**Servlet:** `cropImageServlet`

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/arendergwt/cropImageServlet` |

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `uuid` | Yes | Document ID |
| `locale` | Yes | Language of the text |
| `pagePosition` | Yes | Page number |
| `desc` | Yes | Crop settings (size, position, color, etc.) |

**Response:** An image of the cropped region with descriptive text for saving.

```bash
curl -X GET 'http://<arender_host>/arendergwt/cropImageServlet?uuid=docUUID&locale=en&pagePosition=0&desc=size'
```

---

## Annotation Export

### XFDF / FDF Annotation Export and Import

Download or upload annotations in XFDF or FDF format.

**Servlet:** `servletXFDFAnnotations`

#### Download XFDF/FDF

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/arendergwt/servletXFDFAnnotations` |

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `uuid` | Yes | Document ID |
| `type` | No | File type: `XFDF` (default) or `FDF` |

**Response:** The annotation file in the requested format.

```bash
curl -X GET 'http://<arender_host>/arendergwt/servletXFDFAnnotations?uuid=docUUID&type=XFDF'
```

#### Upload XFDF

| | |
|---|---|
| **Method** | `POST` |
| **Path** | `/arendergwt/servletXFDFAnnotations` |
| **Content-Type** | `multipart/form-data` |

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `uuid` | Yes | Document ID to apply annotations to |

**Form Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `file` | Yes | The XFDF or FDF file to upload |

If the uploaded file is in FDF format, it will be converted to XFDF automatically.

```bash
curl -X POST -H "Content-Type: multipart/form-data" \
  -F "file=@annotations.xfdf" \
  "http://<arender_host>/arendergwt/servletXFDFAnnotations?uuid=docUUID"
```

**Example XFDF file:**

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

## Printing

### Print Document

Display an HTML print-preview page for selected document pages.

**Servlet:** `printServlet`

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/arendergwt/printServlet` |

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `uuid` | Yes | Document ID |
| `desc` | Yes | Image description for the pages to print |
| `pages` | Yes | Page numbers to print |
| `imagePrintStyle` | No | Image style for the printed pages |

**Response:** An HTML page with a print preview and confirmation dialog.

```bash
curl -X GET 'http://<arender_host>/arendergwt/printServlet?uuid=docUUID&desc=description&pages=1,2,3&imagePrintStyle=style'
```

---

### Print Pages

Render specific document pages as an HTML file suitable for browser printing.

**Servlet:** `printPage`

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/arendergwt/printPage` |

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `uuid` | Yes | Document ID |
| `nbPages` | Yes | Number of pages to print |
| `renditionPrintWidth` | Yes | Image width in the rendition (pixels) |
| `browserPrintWidth` | Yes | Image width displayed in the browser (pixels) |
| `page` | Yes | Page numbers to print |

**Response:** An HTML file containing the rendered pages ready for printing.

```bash
curl -X GET 'http://<arender_host>/arendergwt/printPage?uuid=docUUID&nbPages=3&renditionPrintWidth=800&browserPrintWidth=600&page=1,2,3'
```

---

## Monitoring and Administration

### Version

Retrieve the deployed ARender version.

**Servlet:** `VersionServlet`

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/arendergwt/version` |

**Response:** The ARender version in plain text.

```bash
curl -X GET 'http://<arender_host>/arendergwt/version'
```

---

### Health Records

Display server health and service availability status.

**Servlet:** `healthRecordsServlet`

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/arendergwt/health/records` |

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `check` | No | `SELF` (return the HTML page even if no service is available) or `RENDITION` (return an error if no service is available) |

**Response:** An HTML page listing each service with its port, state, and availability.

```bash
curl -X GET 'http://<arender_host>/arendergwt/health/records?check=SELF'
```

---

### Prometheus Metrics

Expose Prometheus-compatible metrics for monitoring.

**Servlet:** `prometheusMetricsServlet`

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/arendergwt/prometheus` |

**Response:** Prometheus metrics in standard exposition format.

```bash
curl -X GET 'http://<arender_host>/arendergwt/prometheus'
```

---

### Server Performance (Weather)

Retrieve performance data for all connected rendition servers, or register a new server.

**Servlet:** `weatherServlet`

#### Get Server Performance

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/arendergwt/weather` |

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `format` | No | Response format. If empty or `HTML`, returns an HTML page. Any other value returns JSON. |

**Response:** Server performance data in the requested format.

```bash
# HTML format
curl -X GET 'http://<arender_host>/arendergwt/weather'

# JSON format
curl -X GET 'http://<arender_host>/arendergwt/weather?format=JSON'
```

#### Set Rendition Targets (Replace All)

| | |
|---|---|
| **Method** | `POST` |
| **Path** | `/arendergwt/weather` |

**Request Body:** A JSON-like list of rendition server addresses. Replaces the entire target list.

```bash
curl -X POST -d "{[http://rendition-host:1990]}" \
  'http://<arender_host>/arendergwt/weather'
```

#### Add Rendition Targets

| | |
|---|---|
| **Method** | `PUT` |
| **Path** | `/arendergwt/weather` |

**Request Body:** A JSON-like list of rendition server addresses. Adds to the existing target list without replacing.

```bash
curl -X PUT -d "{[http://new-rendition-host:1990]}" \
  'http://<arender_host>/arendergwt/weather'
```

---

## Session Management

### Destroy Session

Destroy the current user session and clear all associated ARender state.

**Servlet:** `destroySession`

| | |
|---|---|
| **Method** | Any (`GET`, `POST`, etc.) |
| **Path** | `/arendergwt/destroySession` |

**Response:** The session is destroyed, clearing the following information:

- `user`
- `userAgent`
- `versionUserAgent`

```bash
curl -X GET 'http://<arender_host>/arendergwt/destroySession'
```

---

### Token Validation

Validate an authentication token sent as a cookie or POST attribute.

**Servlet:** `tokenValidatorServlet`

| | |
|---|---|
| **Method** | `POST` |
| **Path** | `/arendergwt/validateToken` |

The token must be named `token` and can be sent as a cookie or a POST parameter.

The validator class is configured via the property:

```properties
arender.server.json.load.token.validator=com.example.MyTokenValidator
```

The custom class must implement the `TokenValidator` interface and its `validate` method. The default validator (`NoopTokenValidator`) only checks that the token is not null.

---

## Connector-Specific Endpoints

### FileNet Metadata Update

Update IBM FileNet document metadata.

**Servlet:** `updateDocumentMetadataServlet`

| | |
|---|---|
| **Method** | `POST` |
| **Path** | `/arendergwt/updateDocumentMetadataServlet` |
| **Content-Type** | `application/json` |

**Query Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `uuid` | Yes | Document ID of the target FileNet document |

**Request Body:** JSON mapping of metadata property names to values. The `propertyKey` corresponds to the FileNet `symbolicName` or `displayName`.

```json
{
  "propertyKey1": "propertyValue1",
  "propertyKey2": "propertyValue2"
}
```

```bash
curl -X POST 'http://<arender_host>/arendergwt/updateDocumentMetadataServlet?uuid=docUUID' \
  -H "Content-Type: application/json" \
  -d '{"DocumentTitle": "Updated Title", "Status": "Approved"}'
```
