---
title: "ARender v2026.0.0 – Upgrade Notes"
draft: false
date: "2026-03-09"
weight: -202600
aliases:
  - /release/2026.0/
_build:
  list: never
---

import DocLink from '@site/src/components/DocLink';

> **Release note:** See [v2026.0.0](../release-notes).

## ⚙️ Customization and Configuration

### New Properties

* **JWT / OAuth2 Security** (Rendition Engine): New properties enable JWT-based authentication via OAuth2 bearer tokens.
  * `arender.security.enabled`: Enables the use of JWT as OAuth 2.0 bearer token.
  * `spring.security.oauth2.resourceserver.jwt.issuer-uri`: Specifies the URI of the trusted JWT issuer.

* **REST Registry Providers** (Rendition Engine): New properties for configuring REST-based document connectors as independent microservices.
  * `registry.default-provider`: Specifies the default registry to use if none of the defined registries match.
  * `registry.providers.<name>.base-url`: Defines the base URL of the provider application (e.g., FileNet, Alfresco).
  * `registry.providers.<name>.whitelisted-params`: Defines the query parameters authorized to build the document ID.

### Renamed Properties

Extensive property renaming has been applied across all Rendition modules (RenditionEngine, Taskconversion, JNIPdfEngine/PDFOwl, PDFBoxEngine) due to the Spring Boot 3+ migration.

**Metrics endpoint access** (all modules):

| Version 2023 | Version 2026 | Description |
| --- | --- | --- |
| `management.endpoint.prometheus.enabled` | `management.endpoint.prometheus.access` | Controls access level to the Prometheus actuator endpoint |
| `management.endpoint.metrics.enabled` | `management.endpoint.metrics.access` | Defines whether and how the metrics actuator endpoint can be accessed |

**Metrics export namespaces** (all modules) — the `management.metrics.export.<provider>.*` pattern has been restructured to `management.<provider>.metrics.export.*`:

| Version 2023 | Version 2026 | Description |
| --- | --- | --- |
| `management.metrics.export.elastic.enabled` | `management.elastic.metrics.export.enabled` | Enables or disables exporting metrics to Elasticsearch |
| `management.metrics.export.elastic.step` | `management.elastic.metrics.export.step` | Sets the interval at which metrics are pushed to Elasticsearch |
| `management.metrics.export.elastic.index` | `management.elastic.metrics.export.index` | Specifies the Elasticsearch index used to store exported metrics |
| `management.metrics.export.elastic.host` | `management.elastic.metrics.export.host` | Defines the Elasticsearch host where metrics are sent |
| `management.metrics.export.datadog.enabled` | `management.datadog.metrics.export.enabled` | Enables or disables exporting metrics to Datadog |
| `management.metrics.export.datadog.api-key` | `management.datadog.metrics.export.api-key` | API key used to authenticate with Datadog |
| `management.metrics.export.datadog.step` | `management.datadog.metrics.export.step` | Defines the frequency at which metrics are sent to Datadog |
| `management.metrics.export.datadog.uri` | `management.datadog.metrics.export.uri` | Specifies the Datadog API endpoint URI |
| `management.metrics.export.cloudwatch.enabled` | `management.cloudwatch.metrics.export.enabled` | Enables or disables exporting metrics to CloudWatch |
| `management.metrics.export.cloudwatch.namespace` | `management.cloudwatch.metrics.export.namespace` | Defines the CloudWatch namespace where your metrics will appear |
| `management.metrics.export.cloudwatch.step` | `management.cloudwatch.metrics.export.step` | Defines the frequency at which metrics are sent to CloudWatch |
| `management.metrics.export.cloudwatch.batchSize` | `management.cloudwatch.metrics.export.batchSize` | Defines the maximum number of metrics sent in a single API request to CloudWatch |
| `management.metrics.export.cloudwatch.region` | `management.cloudwatch.metrics.export.region` | Specifies AWS region where metrics are sent |

**REST client properties** (RenditionEngine module) — dot-separated naming has been adopted:

| Version 2023 | Version 2026 | Description |
| --- | --- | --- |
| `rest.client.max.in.memory.size` | `rest.client.max-in-memory-size` | Configure a limit on the number of bytes that can be buffered (in bytes) |
| `rest.client.max.connections` | `rest.client.max-connections` | The maximum number of connections before starting pending acquisition |
| `rest.client.pending.acquire.timeout` | `rest.client.pending-acquire-timeout` | The maximum time after which a pending acquire must complete (in milliseconds) |
| `rest.client.pending.acquire.max.count` | `rest.client.pending-acquire-max-count` | The maximum number of registered requests for acquire to keep in a pending queue |
| `rest.client.max.idle.time` | `rest.client.max-idle-time` | The duration after which the channel will be closed when idle (in milliseconds) |
| `rest.client.max.life.time` | `rest.client.max-life-time` | The duration after which the channel will be closed (in milliseconds) |
| `rest.client.read.timeout` | `rest.client.read-timeout` | The maximum time to read a response through the network (in milliseconds) |
| `rest.client.write.timeout` | `rest.client.write-timeout` | The maximum time to write a request through the network (in milliseconds) |

> For the complete list of renamed properties per module, refer to the <DocLink version="v2026.0.0" product="arender" to="guides/upgrade/2023-to-2026">migration documentation</DocLink>.

### Modified Properties

| Property | Value in Version 2023 | Value in Version 2026 | Description |
| --- | --- | --- | --- |
| `micro-services.pdf-renderer` | `JNIPdfEngine` | `PDFOwl` | Specifies which PDF Renderer to be used: JNIPdfEngine or PDFOwl |
| `topPanel.download.buttons.beanNames` | `...,downloadAnnotationsCSVButton,...` | *(value without `downloadAnnotationsCSVButton`)* | The CSV annotation download button has been removed from the default button list |

### Deleted Properties

* **StatsD metrics** (all modules): The `management.metrics.export.statsd.*` properties have been removed (`enabled`, `step`, `host`, `port`).
* **Redact feature** (Taskconversion module): The `redact.flattenText` property has been removed.
* **CSV annotation download** (Web UI): The `topPanel.documentMenu.downloadCSVAnnotations` property has been removed, along with the `downloadAnnotationsCSVButton` bean.



## 📦 Product

### Technical Stack Upgrade

This is a **major LTS release** that modernizes the entire ARender technical stack:

* **Spring Boot 2 → Spring Boot 4**: The entire backend has been migrated through Spring Boot 3 to Spring Boot 4, requiring JDK 21 as the minimum runtime. We recommend using **JDK 25** to benefit from the latest LTS JDK.
* **JDK 8 → JDK 21+**: All modules now require Java 21 at minimum. **JDK 25 is the recommended runtime** as the latest LTS release.
* **Jackson 2 → Jackson 3**: The JSON serialization framework has been updated across all modules.
* **PDFBox 2 → PDFBox 3**: The PDF processing library has been migrated to version 3.
* **Hazelcast 4 → Hazelcast 5.5.0**: Session management has been upgraded. 
:::warning
**Important:** Hazelcast 4.x and 5.x instances are not compatible and cannot coexist in the same cluster. Running two instances of `arender-document-service-broker` with different Hazelcast versions will cause conflicts and prevent the instances from starting correctly. You must either **stop the entire ARender stack** before upgrading and restart it, or perform a **blue-green deployment** ensuring that the blue and green `arender-document-service-broker` instances do not communicate with each other.
:::
* **WAR packaging removed**: ARender UI is now exclusively packaged as a Spring Boot application. Deployment to external application servers (Tomcat WAR) is no longer supported.
* **PDFOwl as default renderer**: The default PDF renderer has changed from JNIPdfEngine to PDFOwl. Using version 1.14-26

### Breaking Changes

* **Executable JAR no longer supported**: With Spring Boot 4, JARs must be run using `java -jar <jar-name>.jar` instead of executing the JAR directly.
* **ImageMagick 6 removed**: Only ImageMagick 7 is supported going forward.
* **WAR deployment removed**: ARender UI can no longer be deployed as a WAR file to an external application server. It must be deployed as a standalone Spring Boot application.

### Third-Party Tool Upgrades

* **LibreOffice**: Upgraded to version **26.2.1.2**.
* **FFmpeg**: Version **8.0.1**.
* **ImageMagick**: Version **7.1.2-15**.
* **common-mime**: Version **3.0.0**.

> Due to the upgrade of third-party tools (LibreOffice, ImageMagick, FFmpeg), there may be minor visual differences in document rendering compared to version 2023.

### Security

* Multiple critical and high-level OS package vulnerabilities have been patched in Docker images.
* Docker base images have been updated to address known vulnerabilities.



## 🔧 Integrator Section

### REST Provider (New Architecture)

ARender v2026.0.0 introduces a new **REST-based provider model** as an alternative to the legacy JAR-based connectors:

* **Independent microservices**: Providers are now standalone Spring Boot applications for FileNet and Alfresco that communicate via REST endpoints (`/documents`, `/annotations`), instead of being deployed as JARs alongside the UI.
* **Language-agnostic**: Any language capable of serving HTTP can implement a connector by following the Provider API contract.
* **Provider routing**: The Rendition Engine routes requests to the appropriate provider using the `X-Provider-ID` HTTP header or the `registry.default-provider` configuration.

> For detailed architecture, API contracts, and configuration, refer to the <DocLink version="v2026.0.0" product="arender-modern" to="guides/integration/connector-providers">REST Connector documentation</DocLink>.


### Deployment Changes

* **Web UI**: The WAR-based deployment is no longer available. ARender UI must be deployed as a Spring Boot application. See the <DocLink version="v2026.0.0" product="arender" to="guides/upgrade/2023-to-2026">Web UI migration guide</DocLink>.
* **Helm Charts**: Updated to use PDFOwl Docker images and Spring Boot-based HMI images. Skaffold has been removed.



## 💻 API

### New Functionality

* **REST Provider API**: A new REST API contract allows integrators to build custom document provider as independent microservices. The API includes endpoints for document retrieval (`GET /documents`), and full annotation CRUD (`GET/POST/PUT/DELETE /annotations`). See the <DocLink version="v2026.0.0" product="arender-modern" to="guides/integration/connector-providers">Provider API reference</DocLink>.

* **Rendition Provider API**: The Rendition Engine exposes new endpoints for the frontend to interact with REST providers, including `POST /registry/documents` for opening documents through a provider and annotation management endpoints with automatic position transformation for composite documents. See the <DocLink version="v2026.0.0" product="arender-modern" to="reference/rest-api/broker-api/#connector-operations">Rendition API reference</DocLink>.
