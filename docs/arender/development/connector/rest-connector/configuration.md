---
title: Configuration Reference
last_update:
  date: '2026-03-06T09:35:14.456Z'
  author: CI/CD Bot
sidebar_position: 5
content_hash: 1a17cd71a9edbcb71375b913b46f3158277eb3a2e9d5240a670523028083ae2e
---

This page documents the configuration properties for the REST connector integration, both on the Rendition side and on the connector side.

## Rendition Configuration

The Rendition uses the `connector` configuration prefix to manage REST connector registrations.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `connector.defaultRegistry` | `String` | — | Name of the default connector to use when no `X-Provider-ID` header is provided |
| `connector.registries.<name>.baseUrl` | `String` | — | Base URL of the REST connector microservice |
| `connector.registries.<name>.whitelistedParams` | `List<String>` | — | Query parameter names used for document ID generation and caching |

### Properties Format

```properties
connector.defaultRegistry=filenet

connector.registries.filenet.baseUrl=http://filenet-connector:8787
connector.registries.filenet.whitelistedParams=objectStoreName,id,vsId,objectType,contentElement

connector.registries.alfresco.baseUrl=http://alfresco-connector:8788
connector.registries.alfresco.whitelistedParams=nodeRef,alf_ticket,user,versionLabel
```

### YAML Format

```yaml
connector:
  defaultRegistry: filenet
  registries:
    filenet:
      baseUrl: http://filenet-connector:8787
      whitelistedParams:
        - objectStoreName
        - id
        - vsId
        - objectType
        - contentElement
    alfresco:
      baseUrl: http://alfresco-connector:8788
      whitelistedParams:
        - nodeRef
        - alf_ticket
        - user
        - versionLabel
```

### Whitelisted Parameters

The `whitelistedParams` list serves two purposes:

1. **Document ID generation** — Only whitelisted parameters are used to generate the internal `DocumentId`. This controls document caching: two requests with the same whitelisted parameter values will be treated as the same document.

2. **Security** — Only whitelisted parameters are forwarded to the connector. Other parameters from the original request are filtered out.

Include only the parameters that uniquely identify a document. Do not include session-specific parameters (e.g., authentication tokens) unless they are part of the document identity.

## Multiple Connectors

You can register multiple connectors simultaneously. Each connector has its own name, base URL, and whitelisted parameters. The frontend specifies which connector to use via the `X-Provider-ID` header.

```properties
connector.registries.filenet.baseUrl=http://filenet-connector:8787
connector.registries.filenet.whitelistedParams=objectStoreName,id

connector.registries.alfresco.baseUrl=http://alfresco-connector:8788
connector.registries.alfresco.whitelistedParams=nodeRef

connector.registries.custom.baseUrl=http://my-connector:9090
connector.registries.custom.whitelistedParams=document_path
```

## Connector-Side Configuration

Each REST connector is a standalone Spring Boot application with its own configuration.

### Common Properties

| Property | Description |
|----------|-------------|
| `server.port` | Port the connector listens on |

### FileNet Connector

```properties
server.port=8787

arender.server.filenet.authentication.method=oauth2ObjectStoreProvider
arender.server.filenet.ce.url=http://filenet-server:9080/wsi/FNCEWS40MTOM/
arender.server.filenet.ce.login=p8admin
arender.server.filenet.ce.password=filenet

# OAuth2 (when using oauth2ObjectStoreProvider)
spring.security.oauth2.resourceserver.jwt.issuer-uri=http://keycloak:8080/auth/realms/myrealm
```

### Alfresco Connector

```properties
server.port=8788

arender.server.alfresco.atom-pub-url=http://alfresco:8080/alfresco/api/-default-/cmis/versions/1.1/atom
arender.server.alfresco.context=alfresco
```

## Docker / Kubernetes

In containerized deployments, use service names as hostnames in the `baseUrl` configuration:

```yaml
connector:
  registries:
    filenet:
      baseUrl: http://filenet-provider:8787
    alfresco:
      baseUrl: http://alfresco-provider:8788
```

Configuration properties can be overridden via environment variables:

```bash
CONNECTOR_DEFAULT_REGISTRY=filenet
CONNECTOR_REGISTRIES_FILENET_BASE_URL=http://filenet-provider:8787
CONNECTOR_REGISTRIES_FILENET_WHITELISTED_PARAMS=objectStoreName,id,vsId
```
