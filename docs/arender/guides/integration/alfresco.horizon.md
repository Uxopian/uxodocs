---
title: Alfresco integration
slug: /guides/integration/alfresco
sidebar_position: 2
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: 0343eef9c0af95140dd97e13cbfa83b788432cca8fcabbe1b643dbb6e2be34ee
---

ARender integrates with Alfresco Content Services (ACS) through the `alfresco-provider` microservice. The provider is a standalone Spring Boot application that connects to Alfresco via the CMIS AtomPub protocol and exposes the ARender provider REST contract to the Document Service Broker.

## 1. Overview

The `alfresco-provider` runs as a Docker container alongside the ARender rendition backend. The Document Service Broker routes document requests to it based on the `X-Provider-ID` header injected by the BFF or reverse proxy layer. The provider fetches document content from Alfresco and returns it to the broker for rendering.

```mermaid
%%{init: {'theme': 'neutral'}}%%
%% ARender Horizon Alfresco integration
flowchart LR
  classDef client fill:#4A90D9,color:#fff
  classDef arender fill:#27AE60,color:#fff
  classDef ecm fill:#8E44AD,color:#fff

  Browser["Browser"]:::client
  Element["arender-element<br/>(Web Component)"]:::client
  BFF["BFF / reverse proxy<br/>(injects X-Provider-ID)"]:::arender
  Broker["Document Service Broker<br/>:8761"]:::arender
  Provider["alfresco-provider<br/>:8788"]:::arender
  Alfresco["Alfresco ACS<br/>(CMIS AtomPub)"]:::ecm

  Browser --> Element
  Element --> BFF
  BFF --> Broker
  Broker -- "X-Provider-ID: alfresco" --> Provider
  Provider -- "CMIS 1.1 AtomPub" --> Alfresco
```

*Figure: Request flow from ARender Horizon to Alfresco through the provider.*

## 2. Prerequisites

- ARender rendition backend running (broker, converter, renderer, text handler)
- A BFF or reverse proxy that injects the `X-Provider-ID: alfresco` header or set the configuration `registry.default-provider=filenet`
- Alfresco Content Services 5.x or later with CMIS 1.1 AtomPub endpoint enabled
- Network connectivity from the `alfresco-provider` container to the Alfresco CMIS endpoint
- Java 17 or later (if building from source)
- Docker (for container deployment)

## 3. Provider installation

The provider ships as a Docker image. Add it to your Docker Compose stack alongside the rendition services.

```yaml title="docker-compose.yml"
services:
  alfresco-provider:
    image: artifactory.arondor.cloud:5001/arender-alfresco-provider:{{version}}
    environment:
      - "ARENDER_SERVER_ALFRESCO_ATOM_PUB_URL=http://alfresco:8080/alfresco/api/-default-/cmis/versions/1.1/atom"
    ports:
      - "8788:8788"

  service-broker:
    image: artifactory.arondor.cloud:5001/arender-document-service-broker:{{version}}
    environment:
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-CONVERTER=19999"
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-RENDERER=9091"
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-TEXT-HANDLER=8899"
      - "REGISTRY_PROVIDERS_ALFRESCO_BASE_URL=http://alfresco-provider:8788"
      - "REGISTRY_PROVIDERS_ALFRESCO_WHITELISTED_PARAMS=nodeRef,versionLabel,docs,folder"
      - "REGISTRY_DEFAULT_PROVIDER=alfresco"
    # ... rendition services omitted for brevity
```

## 4. Configuration

The provider is configured through Spring Boot externalized configuration. All properties under `arender.server.alfresco.*` can be set as environment variables.

### Application properties

```properties title="application.properties"
# HTTP port (default: 8788)
server.port=8788

# CMIS AtomPub endpoint for the Alfresco server
arender.server.alfresco.atom.pub.url=http://localhost:8080/alfresco/api/-default-/cmis/versions/1.1/atom
```

### Configuration reference

| Property | Default | Description |
|---|---|---|
| `server.port` | `8788` | HTTP port the provider listens on |
| `arender.server.alfresco.atom.pub.url` | `http://localhost:8080/alfresco/.../atom` | CMIS 1.1 AtomPub endpoint URL for the Alfresco server |

### Request parameters

The following query parameters are used by the provider. The broker forwards all incoming request parameters to the provider regardless of whether they appear in `REGISTRY_PROVIDERS_ALFRESCO_WHITELISTED_PARAMS`.

| Parameter | Required | Description |
|---|---|---|
| `nodeRef` | Yes (single document or folder) | Alfresco nodeRef (e.g. `workspace://SpacesStore/...`). The `workspace://SpacesStore/` prefix is stripped internally. |
| `alf_ticket` | Yes | Alfresco authentication ticket for the current user |
| `user` | Yes | Alfresco username |
| `versionLabel` | No | Document version label |
| `docs` | Yes (multi-document) | Comma-separated list of `nodeRef;versionLabel` pairs |
| `folder` | No | When set with `nodeRef`, opens the nodeRef as a folder and returns its children |

The host application passes these parameters to the viewer as a single query string, which reaches the provider untouched:

```javascript
window.ARender.openDocument('nodeRef=4aa144a5-a0b1-4c2d-8e3f-1234567890ab&user=admin&alf_ticket=TICKET_xxx&versionLabel=1.0');
```

See [Web Component → Parameter contract](../../reference/web-component.md#parameter-contract) for the encoding rules, and note that `uuid` is reserved by the viewer — never use it as an Alfresco parameter name.

:::note
`whitelistedParams` controls which parameters form the internal `DocumentId` used for caching. Parameters outside the list are still forwarded to the provider. Do not add `alf_ticket` to `whitelistedParams`: it is a short-lived per-user token, and including it in the cache key causes every request with a new ticket to miss the cache, forcing unnecessary re-rendition of the same document.
:::

### Authentication

The provider authenticates to Alfresco using the `alf_ticket` passed as a query parameter. This is the Alfresco ticket obtained during the user's session (user-delegated authentication). No service account is configured in the provider itself. Ticket validity is managed on the Alfresco side.

The provider maintains a cache of CMIS connections keyed by ticket. Each connection entry expires after 2 hours of inactivity.

### Annotation access

The provider exposes annotation CRUD endpoints alongside the document endpoint. Annotations are read and written through the Alfresco CMIS API. The endpoints follow the ARender provider REST contract:

| Endpoint | Method | Description |
|---|---|---|
| `/documents` | GET | Retrieve document content |
| `/annotations` | GET | Retrieve all annotations for a document |
| `/annotations/ids` | GET | Retrieve annotation identifiers |
| `/annotations/{annotationId}` | GET | Retrieve a single annotation |
| `/annotations` | POST | Create an annotation |
| `/annotations/{annotationId}` | PUT | Update an annotation |
| `/annotations/{annotationId}` | DELETE | Delete an annotation |
| `/documents/permissions` | GET | Since 2026.5.0. The user's [permissions](../features/permissions.md) on a document |
| `/documents/watermarks` | GET | Since 2026.5.0. The [watermarks](../features/watermarks.md) of a document |

### Permissions

Since 2026.5.0, the provider computes the user's permissions on each document from its [permission policy](../features/permissions.md#permission-policy), and the flags of each annotation from its annotation rules. The facts come from Alfresco, for the user owning the ticket.

The Alfresco provider supports the three conditions:

| Condition | Values |
|---|---|
| `groups` | The `GROUP_…` authorities of the user, such as `GROUP_legal`. |
| `roles` | The user's role on the site of the document (`SiteConsumer`, `SiteContributor`, `SiteCollaborator`, `SiteManager`), and the roles the document's ACL gives the user, one of their groups or `GROUP_EVERYONE` (such as `Consumer`, `Contributor`, `Collaborator`, `Coordinator`). A rule on a site role also matches the higher site roles, in the order `SiteConsumer` < `SiteContributor` < `SiteCollaborator` < `SiteManager`. |
| `rights` | The rights mapped from the operations Alfresco allows the user on the document, below. |

| Right | Granted when Alfresco allows the user |
|---|---|
| `READ` | To read the document |
| `WRITE` | To update the document |
| `DELETE` | To delete the document |
| `VERSION` | To update the document, unless the document is locked |
| `ANNOTATE` | To update or delete the document |

When Alfresco refuses the user (expired ticket, document they may not read, deleted document), the provider grants nothing.

#### Shipped policy

The provider ships the role mapping of the Alfresco connector of the Classic viewer:

| Users | Permissions |
|---|---|
| Every user who may read the document | `DOCUMENT_READ`, `DOWNLOAD`, `DOWNLOAD_RENDERED`, `PRINT`, `VIEW_UNMARKED`, `DOWNLOAD_UNMARKED`, `PRINT_UNMARKED`, `VERSION_CREATE`, `ANNOTATION_READ` |
| Contributors: `SiteContributor` and above, `Contributor`, `Collaborator`, `Coordinator` | Also `ANNOTATION_CREATE`, `REDACTION_CREATE`, `DOCUMENT_CREATE`. They may also update the redactions of other users. |
| Collaborators: `SiteCollaborator` and above, `Collaborator`, `Coordinator` | Also `REDACTION_SEE_THROUGH`. They may also update and delete the annotations and redactions of other users. |
| Users who may update or delete the document (`ANNOTATE` right) | Also `ANNOTATION_CREATE`, `DOCUMENT_CREATE` |

Nothing is watermarked and nobody uploads. Each user may update and delete their own annotations. The [repository limits](../features/permissions.md#repository-limits) drop every write on a document the user may only read.

```properties title="application.properties (shipped)"
arender.permissions.policy.defaults=\
  DOCUMENT_READ,DOWNLOAD,DOWNLOAD_RENDERED,PRINT,VIEW_UNMARKED,DOWNLOAD_UNMARKED,PRINT_UNMARKED,\
  VERSION_CREATE,ANNOTATION_READ
arender.permissions.policy.rules[0].name=contributors annotate and redact
arender.permissions.policy.rules[0].when.roles=SiteContributor,Contributor,Collaborator,Coordinator
arender.permissions.policy.rules[0].grant=ANNOTATION_CREATE,REDACTION_CREATE,DOCUMENT_CREATE
arender.permissions.policy.rules[1].name=collaborators see through redactions
arender.permissions.policy.rules[1].when.roles=SiteCollaborator,Collaborator,Coordinator
arender.permissions.policy.rules[1].grant=REDACTION_SEE_THROUGH
arender.permissions.policy.rules[2].name=callers who may update the document annotate it
arender.permissions.policy.rules[2].when.rights=ANNOTATE
arender.permissions.policy.rules[2].grant=ANNOTATION_CREATE,DOCUMENT_CREATE
arender.permissions.policy.annotation-rules[0].name=contributors update redactions
arender.permissions.policy.annotation-rules[0].when.roles=SiteContributor,Contributor,Collaborator,Coordinator
arender.permissions.policy.annotation-rules[0].grant=REDACTION_UPDATE
arender.permissions.policy.annotation-rules[1].name=collaborators moderate annotations and redactions
arender.permissions.policy.annotation-rules[1].when.roles=SiteCollaborator,Collaborator,Coordinator
arender.permissions.policy.annotation-rules[1].grant=\
  ANNOTATION_UPDATE,ANNOTATION_DELETE,REDACTION_UPDATE,REDACTION_DELETE
arender.permissions.facts-cache-ttl=60s
```

To change it, set your own `defaults`, `rules` or `annotation-rules`: see [Changing the shipped policy](../features/permissions.md#changing-the-shipped-policy). To watermark documents, see [Watermarks](../features/watermarks.md).

## 5. Verification

After starting the provider, verify the integration:

1. Check the provider is reachable from the broker container:

```bash
curl http://alfresco-provider:8788/documents?nodeRef=<nodeRef>&alf_ticket=<ticket>&user=<user>
```

Expected response: document binary stream with `Content-Disposition` and `Content-Type` headers.

2. Open ARender Horizon and load a document from Alfresco:

```javascript
window.ARender.openDocument('nodeRef=<nodeRef>&user=<user>&alf_ticket=<ticket>');
```

Check that the document renders without error.

## 6. Sample use case

A legal department uses Alfresco to manage contract documents. ARender Horizon is embedded in an Angular application through the `<arender-element>` Web Component. When a user opens a contract from the Alfresco document library:

1. The Angular application retrieves the user's Alfresco ticket from the session.
2. The application calls `window.ARender.openDocument('nodeRef=…&user=admin&alf_ticket=…')`.
3. The `<arender-element>` component sends the request to the BFF.
4. The BFF injects `X-Provider-ID: alfresco` and forwards to the broker.
5. The broker calls `alfresco-provider:8788/documents?nodeRef=...&alf_ticket=...&user=...`.
6. The provider returns the contract PDF via CMIS. The broker renders it and streams pages to the viewer.

## 7. Common issues

| Error | Cause | Solution |
|---|---|---|
| `Cannot view document, missing info in query parameters` | `nodeRef`, `alf_ticket`, or `user` is absent from the request | Check the query string passed to `openDocument()` first, then that the BFF forwards it unchanged. The broker forwards all incoming parameters to the provider, so a missing parameter comes from the client or the BFF |
| Opaque `500` with a null `alf_ticket` in the provider logs | A parameter the provider cannot interpret reached it — typically a value whose separators were not encoded, so `alf_ticket` was parsed as part of the previous value | URL-encode every value before concatenating it into the query string. See [Web Component → Parameter contract](../../reference/web-component.md#parameter-contract) |
| `Connection refused` on CMIS call | The `arender.server.alfresco.atom.pub.url` is unreachable from the provider container | Check network connectivity: `curl <atom-pub-url>` from inside the provider container |
| `IllegalStateException: NOT IMPLEMENTED` | The request mode (DOCUMENT, FOLDER, MULTIDOCUMENT) could not be determined | Ensure `nodeRef` is present for single document mode, or `docs` for multi-document mode |