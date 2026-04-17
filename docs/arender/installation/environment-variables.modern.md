---
title: Environment variables
slug: /installation/environment-variables
sidebar_position: 5
---

ARender services are Spring Boot applications. Any Spring Boot property can be overridden via an environment variable using a per-service prefix.

## How Spring Boot externalized configuration works

Spring Boot maps environment variables to property names using a relaxed binding algorithm. For ARender services, each service has a custom environment variable prefix that scopes its configuration. The prefix prevents collisions when multiple services share the same host or pod environment.

The resolution order from lowest to highest priority:

1. Defaults compiled into the application JAR
2. `application.properties` or `application.yml` files on the classpath
3. External config files (e.g. mounted `application.yml`)
4. Environment variables

## Naming convention

### Service prefixes

Each service uses a prefix. All environment variable names must be uppercase.

| Service | Container image | Prefix |
|---------|----------------|--------|
| Document Service Broker | `arender-document-service-broker` | `DSB_` |
| Document Converter | `arender-document-converter` | `DCV_` |
| Document Renderer | `arender-document-renderer-pdfowl` | `DRN_` |
| Document Text Handler | `arender-document-text-handler` | `DTH_` |

:::warning
Native Spring Boot properties (e.g., `spring.security.oauth2.*`) must not be prefixed with a service-specific prefix such as `DSB_`. Only ARender-specific properties (e.g., `arender.server.*`) use the service prefix. Prefixing native Spring Boot properties will prevent them from being picked up or applied correctly.
:::

> **Note:** The Modern viewer deployment has no viewer UI container (`arender-ui-springboot`). The `ARENDERSRV_` prefix used in Classic deployments does not apply to the Modern stack. Provider services (e.g., `alfresco-provider`, `filenet-provider`) use their own environment variables without an ARender-specific prefix, as documented in the [Provider services](#provider-services) section below.

### Property-to-variable mapping rules

1. Start from the Spring property path (dot-separated), for example: `eureka.instance.metadataMap.hostName`.
2. Split any camelCase segment by inserting a literal `.` before each internal capital letter (e.g., `metadataMap` → `metadata.Map`, `hostName` → `host.Name`).
3. Convert the whole name to UPPERCASE.
4. Replace the original dot separators between property levels with `_` (underscore).
5. Use `[n]` to select a list element at index `n`.

**Example: nested YAML property**

```yaml
eureka:
  instance:
    metadataMap:
      hostName: document-converter
```

Transformation steps:

- Split camelCase: `eureka_instance_metadataMap_hostName`
- Level separator → underscore: `eureka_instance_metadata.Map_host.Name`
- Uppercase : `EUREKA_INSTANCE_METADATA.MAP_HOST.NAME`
- Add service prefix: `DCV_EUREKA_INSTANCE_METADATA.MAP_HOST.NAME=document-converter`

Note: The `.MAP` and `.NAME` fragments come from splitting camelCase boundaries (for example `metadataMap` and `hostName`) and should be handled the same way for any camelCase segment.

**Example: simple property override**

The broker property `arender.server.document.pdf.portfolio.enabled` becomes:

```
DSB_ARENDER_SERVER_DOCUMENT_PDF_PORTFOLIO_ENABLED=true
```

:::note
When in doubt about a specific property, check the broker Swagger UI at `http://{broker-host}:8761/swagger-ui/index.html` or refer to the [Rendition properties](../reference/rendition-properties.md) for exact property names.
:::

---

## Docker Compose

In a Docker Compose file, set environment variables under the `environment` key for each service.

### Minimal working configuration

```yaml title="docker-compose.yml"
services:
  service-broker:
    image: artifactory.arondor.cloud:5001/arender-document-service-broker
    environment:
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-CONVERTER=19999"
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-RENDERER=9091"
      - "DSB_KUBEPROVIDER_KUBE.HOSTS_DOCUMENT-TEXT-HANDLER=8899"

  document-converter:
    image: artifactory.arondor.cloud:5001/arender-document-converter
    environment:
      - "DCV_EUREKA_INSTANCE_METADATA.MAP_HOST.NAME=document-converter"
      - "DCV_APP_EUREKA_HOSTNAME=service-broker"
      - "DCV_APP_EUREKA_PORT=8761"

  document-renderer:
    image: artifactory.arondor.cloud:5001/arender-document-renderer-pdfowl
    environment:
      - "DRN_EUREKA_INSTANCE_METADATA.MAP_HOST.NAME=document-renderer"
      - "DRN_EUREKA_INSTANCE_HOSTNAME=service-broker"
      - "DRN_EUREKA_SERVER_PORT=8761"

  document-text-handler:
    image: artifactory.arondor.cloud:5001/arender-document-text-handler
    environment:
      - "DTH_EUREKA_INSTANCE_METADATA.MAP_HOST.NAME=document-text-handler"
      - "DTH_EUREKA_INSTANCE_HOSTNAME=service-broker"
      - "DTH_EUREKA_SERVER_PORT=8761"
```

### Common overrides

**Change the broker port:**

```yaml
service-broker:
  environment:
    - "DSB_SERVER_PORT=9000"
```

**Enable PDF Portfolio detection:**

```yaml
service-broker:
  environment:
    - "DSB_ARENDER_SERVER_DOCUMENT_PDF_PORTFOLIO_ENABLED=true"
```

**Increase conversion memory limit on the broker:**

```yaml
service-broker:
  environment:
    - "DSB_ARENDER_CONVERSION_MEMORY=2048m"
    - "DSB_ARENDER_JNIRENDERER_MEMORY=2048m"
    - "DSB_ARENDER_PDFBOX_MEMORY=2048m"
```

**Override the LibreOffice conversion timeout:**

```yaml
document-converter:
  environment:
    - "DCV_SOFFICE_CONVERSION_TIMEOUT=300"
```

**Activate DirectOffice for Word, Excel, and PowerPoint:**

```yaml
document-converter:
  environment:
    - "DCV_MIMETYPE_SUPPORT_DIRECTOFFICE=<word,excel,powerpoint MIME types>"
    - "DCV_MIMETYPE_SUPPORT_LIBREOFFICE=<remaining formats: RTF, ODF, Visio, Project>"
```

See the [Office conversion guide](../guides/features/office-conversion.mdx#directoffice-paid-add-on) for the full list of MIME types.

---

## Kubernetes (Helm)

The ARender Helm charts support environment variable injection at two levels: a shared ConfigMap and per-service `values.yaml` overrides.

### Helm chart structure

| Chart | Path | Purpose |
|-------|------|---------|
| `rendition` | `helm/rendition/` | Deploys broker, converter, renderer, and text handler |

### Passing environment variables via values.yaml

Each service in the `rendition` chart accepts an `environment` map under its key:

```yaml title="values.yaml"
# helm/rendition/values.yaml (excerpt)
broker:
  environment:
    PROVIDER_ENVIRONMENT: LOCAL

converter:
  environment:
    DCV_SOFFICE_CONVERSION_TIMEOUT: "300"

renderer:
  environment: {}

handler:
  environment: {}
```

### Broker service discovery in Kubernetes

The broker discovers rendition services using DNS names resolved from Kubernetes service names. The ConfigMap template (`configmap-broker.yaml`) generates the following structure automatically based on chart values:

```yaml title="configmap-broker.yaml"
kubeprovider:
  kubeHosts:
    {release-name}-converter.{namespace}.svc.cluster.local: 19999
    {release-name}-renderer.{namespace}.svc.cluster.local: 9091
    {release-name}-handler.{namespace}.svc.cluster.local: 8899
```

The broker `PROVIDER_ENVIRONMENT` variable controls how service addresses are resolved:

| Value | Behavior |
|-------|----------|
| `LOCAL` | Resolve services by hostname from the `kubeHosts` map |
| `KUBERNETES` | Use Kubernetes API to discover services (requires RBAC) |

### Injecting secrets

Use `envFrom` to mount a Kubernetes Secret as environment variables:

```yaml title="values.yaml"
broker:
  envFrom:
    - secretRef:
        name: arender-broker-secrets
```

The Secret would contain values such as:

```yaml title="arender-broker-secrets.yaml"
apiVersion: v1
kind: Secret
metadata:
  name: arender-broker-secrets
stringData:
  DSB_ARENDER_URL_BASIC_AUTH: "domain1@secret1,domain2@secret2"
```

### Injecting a custom application.yml

The `config.file.extraConfig` field in each service's values appends raw YAML to the generated `application.yml` ConfigMap:

```yaml title="values.yaml"
broker:
  config:
    file:
      extraConfig: |
        arender:
          server:
            annotations:
              can:
                create: false
```

This is useful for multi-line or complex properties that are awkward to express as a single environment variable.

---

## Provider services

In the Modern viewer architecture, connector providers run as separate Docker containers alongside the rendition backend. Providers are standard Spring Boot applications. Their properties are set directly as environment variables without an ARender-specific prefix.

### Alfresco provider

| Environment variable | Property | Default | Description |
|---|---|---|---|
| `SERVER_PORT` | `server.port` | `8788` | HTTP port |
| `ARENDER_SERVER_ALFRESCO_ATOM_PUB_URL` | `arender.server.alfresco.atom.pub.url` | `http://localhost:8080/alfresco/api/-default-/cmis/versions/1.1/atom` | CMIS 1.1 AtomPub endpoint URL |

### FileNet provider

| Environment variable | Property | Default | Description |
|---|---|---|---|
| `SERVER_PORT` | `server.port` | `8787` | HTTP port |
| `ARENDER_SERVER_FILENET_AUTHENTICATION_METHOD` | `arender.server.filenet.authentication.method` | `oauth2ObjectStoreProvider` | Authentication mode: `loginPasswordObjectStoreProvider`, `oauth2ObjectStoreProvider`, or `jaasObjectStoreProvider` |
| `ARENDER_SERVER_FILENET_CE_URL` | `arender.server.filenet.ce.url` | `http://localhost:9080/wsi/FNCEWS40MTOM/` | Content Engine WSI/MTOM endpoint URL |
| `ARENDER_SERVER_FILENET_CE_LOGIN` | `arender.server.filenet.ce.login` | `p8admin` | Service account login (login/password mode) |
| `ARENDER_SERVER_FILENET_CE_PASSWORD` | `arender.server.filenet.ce.password` | `filenet` | Service account password (login/password mode) |
| `ARENDER_SERVER_FILENET_SECURITY_OAUTH2_PREFIX` | `arender.server.filenet.security.oauth2.prefix` | (empty) | Token prefix for OAuth2 mode |
| `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_ISSUER_URI` | `spring.security.oauth2.resourceserver.jwt.issuer-uri` | — | JWT issuer URI (OAuth2 mode only) |

### Broker connector registry

The broker uses its own environment variables to register providers:

| Environment variable | Description |
|---|---|
| `CONNECTOR_DEFAULT_REGISTRY` | Default provider name when no `X-Provider-ID` header is present |
| `CONNECTOR_REGISTRIES_<NAME>_BASE_URL` | Base URL of the named provider |
| `CONNECTOR_REGISTRIES_<NAME>_WHITELISTED_PARAMS` | Comma-separated parameter names forwarded to the provider |

**Example:**

```bash
CONNECTOR_DEFAULT_REGISTRY=filenet
CONNECTOR_REGISTRIES_FILENET_BASE_URL=http://filenet-provider:8787
CONNECTOR_REGISTRIES_FILENET_WHITELISTED_PARAMS=objectStoreName,objectStoreId,objectType,id,vsId,contentElement
CONNECTOR_REGISTRIES_ALFRESCO_BASE_URL=http://alfresco-provider:8788
CONNECTOR_REGISTRIES_ALFRESCO_WHITELISTED_PARAMS=nodeRef,alf_ticket,user,versionLabel,docs,folder
```

---

## Summary table

| Deployment | Method | Example |
|------------|--------|---------|
| Docker Compose | `environment:` list in service block | `- "DCV_SOFFICE_CONVERSION_TIMEOUT=300"` |
| Kubernetes (Helm) | `environment:` map under service key | `DCV_SOFFICE_CONVERSION_TIMEOUT: "300"` |
| Kubernetes (Helm) | `envFrom:` with Secret | Mount `arender-broker-secrets` |
| Kubernetes (Helm) | `config.file.extraConfig` | Inject raw YAML into `application.yml` |
| Spring Boot (JAR) | OS environment or `-D` JVM flags | `DSB_SERVER_PORT=9000` |

---

## Related pages

- [Rendition properties](../reference/rendition-properties.md)
- [Docker Compose](./docker-compose.md)
