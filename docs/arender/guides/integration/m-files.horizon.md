---
title: M-Files integration
last_update:
  date: '2026-06-02T13:46:33.361Z'
  author: CI/CD Bot
slug: /guides/integration/m-files
sidebar_position: 4
content_hash: 0ae3de4ad5026f225b4c1b9dc5eef84767ccc38ae778772ce44f0ba7b262ecce
---

ARender integrates with [M-Files](https://www.m-files.com/) through the `mfiles-provider` microservice. The provider is a standalone Spring Boot application that connects to the M-Files Web Service (REST API) and exposes the ARender provider REST contract to the Document Service Broker.

## 1. Overview

The `mfiles-provider` runs as a Docker container alongside the ARender rendition backend. The Document Service Broker routes document requests to it based on the `X-Provider-ID` header injected by the BFF or reverse proxy layer. The provider fetches an object and its file(s) from an M-Files vault through the M-Files REST API and returns them to the broker for rendering.

```mermaid
%%{init: {'theme': 'neutral'}}%%
%% ARender Horizon M-Files integration
flowchart LR
  classDef client fill:#4A90D9,color:#fff
  classDef arender fill:#27AE60,color:#fff
  classDef ecm fill:#8E44AD,color:#fff

  Browser["Browser"]:::client
  Element["arender-element<br/>(Web Component)"]:::client
  BFF["BFF / reverse proxy<br/>(injects X-Provider-ID)"]:::arender
  Broker["Document Service Broker<br/>:8761"]:::arender
  Provider["mfiles-provider<br/>:8789"]:::arender
  MFiles["M-Files vault<br/>(Web Service REST API)"]:::ecm

  Browser --> Element
  Element --> BFF
  BFF --> Broker
  Broker -- "X-Provider-ID: mfiles" --> Provider
  Provider -- "HTTP REST (X-Authentication)" --> MFiles
```

*Figure: Request flow from ARender Horizon to M-Files through the provider.*

## 2. Prerequisites

- ARender rendition backend running (broker, converter, renderer, text handler)
- A BFF or reverse proxy that injects the `X-Provider-ID: mfiles` header, or set the configuration `registry.default-provider=mfiles`
- An M-Files server with the M-Files Web Service (REST API) enabled and reachable over HTTP(S)
- A valid authentication method: a pre-generated M-Files REST API token, or a service account (login/password) with access to the target vault
- Network connectivity from the `mfiles-provider` container to the M-Files REST API endpoint (its base URL must end with `/REST/`)
- Java 17 or later (if building from source)
- Docker (for container deployment)

## 3. Provider installation

The provider ships as a Docker image. Add it to your Docker Compose stack alongside the rendition services.

```yaml title="docker-compose.yml"
services:
  mfiles-provider:
    image: artifactory.arondor.cloud:5001/arender-mfiles-provider:{{version}}
    environment:
      - "ARENDER_SERVER_MFILES_WEB_URL=http://m-files-host/REST/"
      - "ARENDER_SERVER_MFILES_AUTHENTICATION_TOKEN=<m-files-rest-api-token>"
    ports:
      - "8789:8789"

  service-broker:
    image: artifactory.arondor.cloud:5001/arender-document-service-broker:{{version}}
    environment:
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-CONVERTER=19999"
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-RENDERER=9091"
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-TEXT-HANDLER=8899"
      - "REGISTRY_PROVIDERS_MFILES_BASE_URL=http://mfiles-provider:8789"
      - "REGISTRY_PROVIDERS_MFILES_WHITELISTED_PARAMS=objectType,docId,versionId,fileId,title"
      - "REGISTRY_DEFAULT_PROVIDER=mfiles"
    # ... rendition services omitted for brevity
```

## 4. Configuration

The provider is configured through Spring Boot externalized configuration. All properties under `arender.server.mfiles.*` can be set as environment variables.

### Application properties

```properties title="application.properties"
# HTTP port (default: 8789)
server.port=8789

# M-Files Web Service base URL — must end with /REST/
arender.server.mfiles.web-url=http://localhost/REST/

# Authentication — choose ONE mode:

# Mode 1 — pre-generated token
arender.server.mfiles.authentication.token=<m-files-rest-api-token>

# Mode 2 — service account (a token is fetched on the first request)
# arender.server.mfiles.authentication.username=<username>
# arender.server.mfiles.authentication.password=<secret>
# arender.server.mfiles.authentication.vault-guid=<guid>
```

### Authentication modes

The provider authenticates to the M-Files REST API with the `X-Authentication` header. Two modes are available; the **token** mode takes precedence when a token is set.

#### Token (pre-generated)

The configured token is sent as-is on every request. Generate it in M-Files (Admin or the `authenticationtokens` REST endpoint), scoped to the target vault.

```bash
ARENDER_SERVER_MFILES_WEB_URL=http://m-files-host/REST/
ARENDER_SERVER_MFILES_AUTHENTICATION_TOKEN=<m-files-rest-api-token>
```

:::note
M-Files authentication tokens have a limited lifetime. In token mode the provider cannot renew the token on its own, so provide a long-lived token; otherwise requests start failing with `HTTP 401` once it expires.
:::

#### Login/password (service account)

All requests use a shared technical account. On the first request, the provider calls `POST /REST/server/authenticationtokens` with the username, password, and vault GUID, then caches the returned token for its lifetime.

```bash
ARENDER_SERVER_MFILES_WEB_URL=http://m-files-host/REST/
ARENDER_SERVER_MFILES_AUTHENTICATION_USERNAME=username
ARENDER_SERVER_MFILES_AUTHENTICATION_PASSWORD=secret
ARENDER_SERVER_MFILES_AUTHENTICATION_VAULT_GUID={AF83944A-A5C0-441F-8A6D-DA1F9B3719EA}
```

:::note
Both modes use a single identity to reach M-Files. Documents are therefore fetched with the permissions of the service account (or the account behind the token), not those of the end user viewing them. Scope the account accordingly.
:::

### Configuration reference

| Property | Default | Description |
|---|---|---|
| `server.port` | `8789` | HTTP port the provider listens on |
| `arender.server.mfiles.web-url` | `http://localhost/REST/` | M-Files Web Service base URL. Must end with `/REST/` |
| `arender.server.mfiles.authentication.token` | (empty) | Pre-generated M-Files REST API token (token mode) |
| `arender.server.mfiles.authentication.username` | (empty) | Service account login (service-account mode) |
| `arender.server.mfiles.authentication.password` | (empty) | Service account password (service-account mode) |
| `arender.server.mfiles.authentication.vault-guid` | (empty) | Target vault GUID (service-account mode) |

### Request parameters

The following query parameters are used by the provider. The broker forwards all incoming request parameters to the provider regardless of whether they appear in `REGISTRY_PROVIDERS_MFILES_WHITELISTED_PARAMS`.

| Parameter | Required | Description |
|---|---|---|
| `docId` | Yes | M-Files object ID |
| `objectType` | No (default `0`) | M-Files object type ID. `0` = Document; custom types use their own ID (see M-Files Admin > Object Types) |
| `versionId` | No (default `latest`) | A version number, or `latest`. M-Files versions are 1-based |
| `fileId` | No | Numeric ID(s) of file(s) inside the object (`Files[].ID`, **not** the `FileGUID`). Pass several as repeated parameters — `fileId=456&fileId=789` — to open several files of the same object as one multi-document |
| `title` | No | Per-file display name(s), passed as repeated parameters and paired by index with `fileId` (e.g. `fileId=456&fileId=789&title=toto.pdf&title=hello.png`). Sets each file's name/extension so the format is detected reliably |

:::note
`whitelistedParams` controls which parameters form the internal `DocumentId` used for caching. Parameters outside the list are still forwarded to the provider.
:::

:::warning
Pass multiple values as **repeated parameters** (`fileId=456&fileId=789`), not as a single comma-separated value (`fileId=456,789`). The broker forwards each multi-valued parameter as repeated query keys, and the provider reads them as a list. A `title` value may itself contain a comma (e.g. `title=report, final.pdf`) — it is never split.
:::

### Opening a document

Every open mode goes through `GET /documents`, with the same query string the host application passes to the viewer:

| Mode | Query parameters | Result |
|---|---|---|
| Whole object | `objectType=0&docId=521` | The object's file(s): a single-file object is streamed as-is; a multi-file object is returned as a multi-document |
| One explicit file | `objectType=0&docId=534&fileId=576&title=v2.pdf` | The selected file, named after `title` |
| Several explicit files | `objectType=0&docId=534&fileId=576&fileId=977&title=v2.pdf&title=mire.pdf` | A multi-document of the selected files, in the given order |

From the host application, that last mode reads:

```javascript
window.ARender.openDocument('objectType=0&docId=534&fileId=576&fileId=977&title=v2.pdf&title=mire.pdf');
```

The viewer forwards the string verbatim — it never reorders or re-encodes parameters — so the pairing below survives all the way to the provider. See [Web Component → Parameter contract](../../reference/web-component.md#parameter-contract) for the encoding rules, and note that `uuid` is reserved by the viewer: never use it as an M-Files parameter name.

- `fileId` and `title` are **parallel lists paired by index**, each passed as repeated parameters (see the warning above).
- `title` is optional but recommended: it sets each file's name and extension so the renderer detects the format reliably. Without it, the format is guessed from the content.
- The selected files always belong to the **same object** — `docId` is a single value. Showing files from different objects together is handled by the React UI as separate documents, not by this provider.

### Document model

An M-Files object can hold one or several files:

- **Single-file object** (`SingleFile: true`) — the provider returns the file binary directly.
- **Multi-file object** — the provider returns a `ProviderFolder` (JSON) listing each file as a `ProviderFile`, each carrying its own `fileId` and file name (`title`). The broker fetches the files individually and builds a `DocumentContainer` so the viewer shows them as a single multi-document.
- **Explicit file list** — passing several `fileId` (with matching `title`) opens exactly those files of one object as a multi-document, without the provider inspecting the object first. Example: `?objectType=0&docId=123&fileId=456&fileId=789&title=title.pdf&title=hello.png`.

For the data model, see [Providers — Document model](./providers.md#document-model).

### Annotation access

The `mfiles-provider` implements only the document endpoint:

| Endpoint | Method | Description |
|---|---|---|
| `/documents` | GET | Retrieve document content |

It does **not** expose annotation endpoints. Annotations therefore fall back to the broker's default storage (XFDF files or JDBC, depending on your backend configuration). See [Providers — Annotations through providers](./providers.md#annotations-through-providers).

## 5. Verification

After starting the provider, verify the integration:

1. Check the provider is reachable and can reach M-Files:

```bash
curl "http://mfiles-provider:8789/documents?objectType=0&docId=521&versionId=latest" -o out.bin
```

Expected response: the document binary stream with a `Content-Type` header (and a `Content-Disposition` filename for single-file objects). Opening several files of one object returns a JSON folder instead:

```bash
curl "http://mfiles-provider:8789/documents?objectType=0&docId=534&fileId=576&fileId=977&title=a.pdf&title=b.pdf"
```

2. Optionally test the full broker path:

```bash
curl -X POST "http://service-broker:8761/registry/documents?objectType=0&docId=521&versionId=latest" \
  -H "X-Provider-ID: mfiles"
```

Expected: a JSON `DocumentId` (e.g. `{"id":"b64_..."}`).

3. Open ARender Horizon and load a document from M-Files:

```javascript
window.ARender.openDocument('objectType=0&docId=<docId>&versionId=latest');
```

Check that the document renders without error.

## 6. Sample use case

A company stores its documents in an M-Files vault. ARender Horizon is embedded in a web application through the `<arender-element>` Web Component. When a user opens an M-Files object:

1. The application calls `window.ARender.openDocument('objectType=0&docId=521&versionId=latest')`.
2. The `<arender-element>` component sends the request to the BFF.
3. The BFF injects `X-Provider-ID: mfiles` and forwards to the broker.
4. The broker calls `mfiles-provider:8789/documents?objectType=0&docId=521&versionId=latest`.
5. The provider authenticates to M-Files (token or service account), fetches the object's file(s) through the REST API, and returns them.
6. The broker renders the document and streams pages to the viewer. For a multi-file object, the provider returns a folder and the viewer displays all files as a single multi-document.

## 7. Common issues

| Error | Cause | Solution |
|---|---|---|
| Provider returns `400 BAD_REQUEST` (broker reports `500`) when `fileId` is set | `fileId` was given a `FileGUID` instead of the numeric file ID. `fileId` is typed as an integer, so a GUID fails to bind | Use the numeric `Files[].ID` from the object's JSON, e.g. `fileId=576`. For a single-file object, omit `fileId` |
| `java.nio.channels.ClosedChannelException` / connection errors in the provider | `arender.server.mfiles.web-url` is wrong or M-Files is unreachable from the provider container | Check the startup log line `M-Files provider initialized with web-url=...`. Verify the URL ends with `/REST/` and is reachable: `curl <web-url>objects/0/<docId>/latest -H "X-Authentication: <token>"` |
| `M-Files error HTTP 401` | The token expired/is invalid, or the service account lacks access to the vault | Provide a valid long-lived token, or verify the service account credentials and vault permissions |
| `M-Files error HTTP 404` or "object has no files" | Wrong `objectType`, unknown `docId`, or an invalid `versionId` | Confirm `objectType` (0 = Document), the object ID, and use `versionId=latest` — M-Files versions are 1-based, so `versionId=0` is not valid |
| Document opens but the file name/format is wrong when using `fileId` | A `fileId` fetch with no matching `title` returns the binary without a file name, so the format is detected from content | Pass `title` next to each `fileId` (e.g. `fileId=456&title=toto.pdf`) so the provider sets the name/extension, or omit `fileId` to use the object's own file names |
