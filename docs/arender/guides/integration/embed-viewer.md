---
title: Embed the viewer
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /guides/integration/embed-viewer
sidebar_position: 1
content_hash: 81463eb4d0ef3e2b28f71322f4406a70c8d8b33593bcdbf1cab7b28c60f80f8d
---

# Embed the viewer

ARender is a web application that runs at a fixed URL. To embed it in another application, the standard approach is an HTML `<iframe>`. The document to display is controlled via URL parameters passed to the viewer.

## Prerequisites

- ARender is running and accessible from the browser (see [Docker Compose deployment](../../deployment/docker-compose.md))
- The document URL or path is reachable by the ARender service broker
- If the document comes from an external URL, that URL prefix is listed in `authorized.urls` on the broker (see [Open your first document](../../quickstart/first-document.md))

## Basic iframe embed

```html
<iframe
  src="http://arender.example.com:8080/?url=https://docs.example.com/contract.pdf"
  width="100%"
  height="800px"
  allowfullscreen
  allow="microphone">
</iframe>
```

The `allow="microphone"` attribute is required if you use voice annotation features. For read-only viewing it is optional.

## URL parameters

The viewer reads parameters from the query string. The most common ones are listed below.

### Document loading parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `url` | URL or path of the document to load. Multiple `url` parameters open a multi-document view. | `?url=https://cdn.example.com/file.pdf` |
| `url` (repeated) | Open multiple documents side by side. | `?url=doc1.pdf&url=doc2.pdf` |

The `url` parameter is handled by `DefaultURLParser`. The value must resolve to a document accessible by the broker. Paths are relative to the broker's working directory; external URLs must be listed in `authorized.urls`.

### Locale and timezone

| Parameter | Description | Default |
|-----------|-------------|---------|
| `timeZone` | Java timezone ID used for date display (e.g. `Europe/Paris`). Only applied when `useTimeZone=true` is set on the URL parser bean. | JVM default |

The viewer also reads the browser's `Accept-Language` header for locale. The `locale` parameter is only available when `useLocale=true` is configured on the `DefaultURLParser` bean.

### Authentication parameters

When using connector-specific URL parsers, additional parameters are passed through the URL. For example:

- Alfresco CMIS connector: `nodeRef`, `alf_ticket`, `user`, `versionLabel`
- FileNet connector: `objectStoreName` or `objectStoreId`, `id` or `vsId`, `objectType`

See the individual connector guides for the full parameter list.

## Opening a document by internal ID

If a document has already been loaded by the broker (for example, via a REST API upload), it can be opened using its internal document ID:

```
http://arender.example.com:8080/?uuid=b64_NDNiMmI0NjctZGZlOS00MjgzLWExZWYtMjVkNGIyNTQ5Nzgw
```

This approach is useful when the host application uploads the document to the broker first, then redirects the user to the viewer with the resulting ID.

## Opening multiple documents

Pass `url` multiple times to open a multi-document view:

```
http://arender.example.com:8080/?url=https://cdn.example.com/doc1.pdf&url=https://cdn.example.com/doc2.pdf
```

The viewer displays both documents in a tabbed or stacked layout depending on configuration.

## Security considerations

**Same-origin and CSP.** If the embedding application sets a `Content-Security-Policy` header with `frame-src`, the ARender origin must be listed explicitly.

**X-Frame-Options.** ARender's viewer UI disables the `X-Frame-Options` response header by default (as visible in the FileNet security configuration). Verify this is acceptable for your security policy. If ARender is exposed to the public internet, reconsider iframe embedding without authentication.

**Authorized URLs.** The broker only fetches documents from origins listed in `authorized.urls`. Any document URL passed via the iframe `src` must match a configured prefix. This prevents server-side request forgery via the `url` parameter.

## Passing a document title

The viewer infers the document title from the URL's filename component or from the connector metadata. There is no generic `title` query parameter for the default URL parser. Connector-specific parsers (Alfresco, FileNet) derive the title from repository metadata.

## Example: host application workflow

A typical server-side-first integration:

1. The host application uploads the document to the broker REST API.
2. The broker returns a document ID.
3. The host application renders a page that includes an iframe pointing to `/?uuid={documentId}`.
4. The user sees the document without the viewer making any additional fetch request.

```bash
# Upload document
RESPONSE=$(curl -s -X POST http://broker.example.com:8761/documents \
  -H "Content-Type: application/octet-stream" \
  --data-binary @report.pdf)

DOC_ID=$(echo $RESPONSE | jq -r '.id')

# Use DOC_ID to build the iframe src
echo "http://arender.example.com:8080/?uuid=${DOC_ID}"
```

This approach keeps the document URL out of the browser's address bar and avoids `authorized.urls` configuration requirements.

## Related pages

- [Open your first document](../../quickstart/first-document.md)
- [Docker Compose deployment](../../deployment/docker-compose.md)
- [Alfresco integration guide](./alfresco.md)
- [IBM FileNet integration guide](./ibm-filenet.md)
- [Broker REST API reference](../../reference/rest-api/broker-api.md)
