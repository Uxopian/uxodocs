---
viewer: classic
title: Environment variables
slug: /installation/environment-variables
sidebar_position: 5
---

# Environment variables

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
| Viewer | `arender-ui-springboot` | `ARENDERSRV_` |
| Document Service Broker | `arender-document-service-broker` | `DSB_` |
| Document Converter | `arender-document-converter` | `DCV_` |
| Document Renderer | `arender-document-renderer-pdfowl` | `DRN_` |
| Document Text Handler | `arender-document-text-handler` | `DTH_` |

:::warning
Native Spring Boot properties (e.g., `spring.security.oauth2.*`) must **not** be prefixed with `ARENDERSRV_`, otherwise they won't be taken into account or not properly used/detected at the right time. Only ARender-specific properties (e.g., `arender.server.*`) use the `ARENDERSRV_` prefix.
:::

### Property-to-variable mapping rules

1. Write the full property path in uppercase.
2. A capital letter in the property key must be preceded by `.` in the environment variable name.
3. Use `_` to separate nested YAML keys.
4. Use `[n]` to set a list element at index `n`.

**Example: nested YAML property**

```yaml
eureka:
  instance:
    metadata:
      map:
        host:
          name: document-converter
```

Becomes:

```
DCV_EUREKA_INSTANCE_METADATA.MAP_HOST.NAME=document-converter
```

The `.MAP` and `.NAME` notation reflects that `map` and `name` contain uppercase letters when written as `metadataMap` and `hostName` in Spring internals. Follow this pattern for any camelCase property key segment.

**Example: simple property override**

The property `arender.server.oauth2.enabled` on the viewer becomes:

```
ARENDERSRV_ARENDER_SERVER_OAUTH2_ENABLED=true
```

**Example: property with a camelCase segment**

The property `spring.security.oauth2.client.registration.arender.client-id` becomes:

```
SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_ARENDER_CLIENT_ID=arender-client
```

Note that native Spring Boot properties like `spring.security.*` do not use the `ARENDERSRV_` prefix.

:::note
When in doubt about a specific property, check the broker Swagger UI at `http://{broker-host}:8761/swagger-ui/index.html` or refer to the [Rendition properties](../reference/rendition-properties.md) for exact property names.
:::

---

## Docker Compose

In a Docker Compose file, set environment variables under the `environment` key for each service.

### Minimal working configuration

```yaml title="docker-compose.yml"
services:
  ui:
    image: artifactory.arondor.cloud:5001/arender-ui-springboot
    environment:
      - "ARENDERSRV_ARENDER_SERVER_RENDITION_HOSTS=http://service-broker:8761/"

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

**Enable OAuth2 on the viewer:**

```yaml
ui:
  environment:
    - "ARENDERSRV_ARENDER_SERVER_OAUTH2_ENABLED=true"
    - "SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_ARENDER_CLIENT_ID=arender-client"
    - "SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_ARENDER_CLIENT_SECRET=your-secret"
    - "SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_ARENDER_PROVIDER=keycloak"
    - "SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_ARENDER_AUTHORIZATION_GRANT_TYPE=authorization_code"
    - "SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_ARENDER_SCOPE=openid"
```

---

## Kubernetes (Helm)

The ARender Helm charts support environment variable injection at two levels: a shared ConfigMap and per-service `values.yaml` overrides.

### Helm chart structure

Two charts are available:

| Chart | Path | Purpose |
|-------|------|---------|
| `rendition` | `helm/rendition/` | Deploys broker, converter, renderer, and text handler |
| `viewer` | `helm/viewer/` | Deploys the viewer |

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

The viewer chart uses a flat `environment` map:

```yaml title="values.yaml"
# helm/viewer/values.yaml (excerpt)
environment:
  ARENDERSRV_ARENDER_SERVER_OAUTH2_ENABLED: "true"
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

### Viewer rendition hosts

The viewer chart provides a dedicated `rendition.hosts` list that generates the `ARENDERSRV_ARENDER_SERVER_RENDITION_HOSTS` variable automatically:

```yaml title="values.yaml"
rendition:
  hosts:
    - http://arender-broker.arender.svc.cluster.local:8761/
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
- [Kubernetes Helm](./kubernetes-helm.md)
