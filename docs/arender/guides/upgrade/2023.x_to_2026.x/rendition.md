---
title: Rendition changes
last_update:
  date: '2026-03-09T13:58:30.248Z'
  author: CI/CD Bot
content_hash: 662f1377208274a6c100474e958b420f76493eb3e743bffbaed2f06137cabf42
---

## Document Service Broker (RenditionEngine module)

### Properties in application.properties file

#### Deleted properties

| Version 2023                               | Description                                                      |
| ------------------------------------------ | ---------------------------------------------------------------- |
| `management.metrics.export.statsd.enabled` | Enables or disables exporting metrics using the StatsD protocol. |
| `management.metrics.export.statsd.step`    | Sets the reporting interval for StatsD metrics.                  |
| `management.metrics.export.statsd.host`    | Specifies the StatsD server hostname.                            |
| `management.metrics.export.statsd.port`    | Defines the port used to send metrics to the StatsD server.      |

#### Renamed properties

| Version 2023                                | Version 2026                                | Description                                                                                 |
| ------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `management.endpoint.prometheus.enabled`    | `management.endpoint.prometheus.access`     | Controls access level (enabled, read-only, or disabled) to the Prometheus actuator endpoint |
| `management.endpoint.metrics.enabled`       | `management.endpoint.metrics.access`        | Defines whether and how the metrics actuator endpoint can be accessed                       |
| `management.metrics.export.elastic.enabled` | `management.elastic.metrics.export.enabled` | Enables or disables exporting metrics to Elasticsearch                                      |
| `management.metrics.export.elastic.step`    | `management.elastic.metrics.export.step`    | Sets the interval at which metrics are pushed to Elasticsearch                              |
| `management.metrics.export.elastic.index`   | `management.elastic.metrics.export.index`   | Specifies the Elasticsearch index used to store exported metrics                            |
| `management.metrics.export.elastic.host`    | `management.elastic.metrics.export.host`    | Defines the Elasticsearch host where metrics are sent                                       |
| `management.metrics.export.datadog.enabled` | `management.datadog.metrics.export.enabled` | Enables or disables exporting metrics to Datadog                                            |
| `management.metrics.export.datadog.api-key` | `management.datadog.metrics.export.api-key` | API key used to authenticate with Datadog                                                   |
| `management.metrics.export.datadog.step`    | `management.datadog.metrics.export.step`    | Defines the frequency at which metrics are sent to Datadog                                  |
| `management.metrics.export.datadog.uri`     | `management.datadog.metrics.export.uri`     | Specifies the Datadog API endpoint URI                                                      |
| `management.metrics.export.cloudwatch.enabled` | `management.cloudwatch.metrics.export.enabled` | Enables or disables exporting metrics to Cloudwatch                                            |
| `management.metrics.export.cloudwatch.namespace` | `management.cloudwatch.metrics.export.namespace` | Defines the CloudWatch namespace where your metrics will appear                                                   |
| `management.metrics.export.cloudwatch.step`    | `management.cloudwatch.metrics.export.step`    | Defines the frequency at which metrics are sent to Cloudwatch                                  |
| `management.metrics.export.cloudwatch.batchSize`    | `management.cloudwatch.metrics.export.batchSize`    | Defines the maximum number of metrics sent in a single API request to CloudWatch                                  |
| `management.metrics.export.cloudwatch.region`     | `management.cloudwatch.metrics.export.region`     | Specifies AWS region where metrics are sent                                                      |
| `rest.client.max.in.memory.size`            | `rest.client.max-in-memory-size`            | Configure a limit on the number of bytes that can be buffered (in bytes)                    |
| `rest.client.max.connections`               | `rest.client.max-connections`               | The maximum number of connections before starting pending acquisition |
| `rest.client.pending.acquire.timeout`       | `rest.client.pending-acquire-timeout`       | The maximum time after which a pending acquire must complete (in milliseconds) |
| `rest.client.pending.acquire.max.count`     | `rest.client.pending-acquire-max-count`     | The maximum number of registered requests for acquire to keep in a pending queue. Set the value "-1" for no limit. |
| `rest.client.max.idle.time`                 | `rest.client.max-idle-time`                 | The Duration after which the channel will be closed when idle (in milliseconds). Set the value "-1" for no limit. |
| `rest.client.max.life.time`                 | `rest.client.max-life-time`                 | The Duration after which the channel will be closed (in milliseconds). Set the value "-1" for no limit. |
| `rest.client.read.timeout`                  | `rest.client.read-timeout`                  | The maximum time to read a response through the network (in milliseconds) |
| `rest.client.write.timeout`                 | `rest.client.write-timeout`                 | The maximum time to write a request through the network (in milliseconds) |

#### Modified properties

| Property                      | Value in version 2023 | Value in version 2026 | Description                                                     |
| ----------------------------- | --------------------- | --------------------- | --------------------------------------------------------------- |
| `micro-services.pdf-renderer` | `JNIPdfEngine`        | `PDFOwl`              | Specifies which PDF Renderer to be used: JNIPdfEngine or PDFOwl |

### Properties in application.yaml file

#### Added properties

| Version 2026                                           | Description                                                                       |
| ------------------------------------------------------ | --------------------------------------------------------------------------------- |
| `arender.security.enabled`                             | Enables the use of JWT as OAuth 2.0 bearer token                                  |
| `keycloak.base-url`                                    | The keycloak base url                                                             |
| `keycloak.realm`                                       | The ARender realm name on keycloak                                                |
| `keycloak.realm-url`                                   | The ARender ream url on keycloak                                                  |
| `spring.security.oauth2.resourceserver.jwt.issuer-uri` | Specifies the URI of the trusted JWT issuer                                       |
| `connector.default-registry`                           | Specifies the default registry to use if none of the defined registries match     |
| `connector.registries.filenet.base-url`                | Defines the base url of the Filenet Provider Application                          |
| `connector.registries.filenet.whitelisted-params`      | Defines the query parameters authorized to build Filenet document Id              |
| `connector.registries.alfresco.base-url`               | Defines the base url of the Alfresco Provider Application                         |
| `connector.registries.alfresco.whitelisted-params`     | Defines the query parameters authorized to build Alfresco document Id             |

## Document Converter (Taskconversion module)

### Properties in application.properties file

#### Deleted properties

| Version 2023                               | Description                                                      |
| ------------------------------------------ | ---------------------------------------------------------------- |
| `redact.flattenText`                       | Former redact feature                                            |
| `management.metrics.export.statsd.enabled` | Enables or disables exporting metrics using the StatsD protocol. |
| `management.metrics.export.statsd.step`    | Sets the reporting interval for StatsD metrics.                  |
| `management.metrics.export.statsd.host`    | Specifies the StatsD server hostname.                            |
| `management.metrics.export.statsd.port`    | Defines the port used to send metrics to the StatsD server.      |

#### Renamed properties

| Version 2023                                | Version 2026                                | Description                                                                                 |
| ------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `management.endpoint.prometheus.enabled`    | `management.endpoint.prometheus.access`     | Controls access level (enabled, read-only, or disabled) to the Prometheus actuator endpoint |
| `management.endpoint.metrics.enabled`       | `management.endpoint.metrics.access`        | Defines whether and how the metrics actuator endpoint can be accessed                       |
| `management.metrics.export.elastic.enabled` | `management.elastic.metrics.export.enabled` | Enables or disables exporting metrics to Elasticsearch                                      |
| `management.metrics.export.elastic.step`    | `management.elastic.metrics.export.step`    | Sets the interval at which metrics are pushed to Elasticsearch                              |
| `management.metrics.export.elastic.index`   | `management.elastic.metrics.export.index`   | Specifies the Elasticsearch index used to store exported metrics                            |
| `management.metrics.export.elastic.host`    | `management.elastic.metrics.export.host`    | Defines the Elasticsearch host where metrics are sent                                       |
| `management.metrics.export.datadog.enabled` | `management.datadog.metrics.export.enabled` | Enables or disables exporting metrics to Datadog                                            |
| `management.metrics.export.datadog.api-key` | `management.datadog.metrics.export.api-key` | API key used to authenticate with Datadog                                                   |
| `management.metrics.export.datadog.step`    | `management.datadog.metrics.export.step`    | Defines the frequency at which metrics are sent to Datadog                                  |
| `management.metrics.export.datadog.uri`     | `management.datadog.metrics.export.uri`     | Specifies the Datadog API endpoint URI                                                      |
| `management.metrics.export.cloudwatch.enabled` | `management.cloudwatch.metrics.export.enabled` | Enables or disables exporting metrics to Cloudwatch                                            |
| `management.metrics.export.cloudwatch.namespace` | `management.cloudwatch.metrics.export.namespace` | Defines the CloudWatch namespace where your metrics will appear                                                   |
| `management.metrics.export.cloudwatch.step`    | `management.cloudwatch.metrics.export.step`    | Defines the frequency at which metrics are sent to Cloudwatch                                  |
| `management.metrics.export.cloudwatch.batchSize`    | `management.cloudwatch.metrics.export.batchSize`    | Defines the maximum number of metrics sent in a single API request to CloudWatch                                  |
| `management.metrics.export.cloudwatch.region`     | `management.cloudwatch.metrics.export.region`     | Specifies AWS region where metrics are sent                                                      |

## Document Renderer (JNIPdfEngine and PDFOwl modules)

### Properties in application.properties file

#### Deleted properties

| Version 2023                                                 | Description                                            |
| --------------------------------------------------------- | ------------------------------------------------------ |
| `management.metrics.export.statsd.enabled`  | Enables or disables exporting metrics using the StatsD protocol.                             |
| `management.metrics.export.statsd.step`     | Sets the reporting interval for StatsD metrics.                                              |
| `management.metrics.export.statsd.host`     | Specifies the StatsD server hostname.                                                        |
| `management.metrics.export.statsd.port`     | Defines the port used to send metrics to the StatsD server.                                  |

#### Renamed properties

| Version 2023                                | Version 2026                                | Description                                                                                 |
| ------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `management.endpoint.prometheus.enabled`    | `management.endpoint.prometheus.access`     | Controls access level (enabled, read-only, or disabled) to the Prometheus actuator endpoint |
| `management.endpoint.metrics.enabled`       | `management.endpoint.metrics.access`        | Defines whether and how the metrics actuator endpoint can be accessed                       |
| `management.metrics.export.elastic.enabled` | `management.elastic.metrics.export.enabled` | Enables or disables exporting metrics to Elasticsearch                                      |
| `management.metrics.export.elastic.step`    | `management.elastic.metrics.export.step`    | Sets the interval at which metrics are pushed to Elasticsearch                              |
| `management.metrics.export.elastic.index`   | `management.elastic.metrics.export.index`   | Specifies the Elasticsearch index used to store exported metrics                            |
| `management.metrics.export.elastic.host`    | `management.elastic.metrics.export.host`    | Defines the Elasticsearch host where metrics are sent                                       |
| `management.metrics.export.datadog.enabled` | `management.datadog.metrics.export.enabled` | Enables or disables exporting metrics to Datadog                                            |
| `management.metrics.export.datadog.api-key` | `management.datadog.metrics.export.api-key` | API key used to authenticate with Datadog                                                   |
| `management.metrics.export.datadog.step`    | `management.datadog.metrics.export.step`    | Defines the frequency at which metrics are sent to Datadog                                  |
| `management.metrics.export.datadog.uri`     | `management.datadog.metrics.export.uri`     | Specifies the Datadog API endpoint URI                                                      |
| `management.metrics.export.cloudwatch.enabled` | `management.cloudwatch.metrics.export.enabled` | Enables or disables exporting metrics to Cloudwatch                                            |
| `management.metrics.export.cloudwatch.namespace` | `management.cloudwatch.metrics.export.namespace` | Defines the CloudWatch namespace where your metrics will appear                                                   |
| `management.metrics.export.cloudwatch.step`    | `management.cloudwatch.metrics.export.step`    | Defines the frequency at which metrics are sent to Cloudwatch                                  |
| `management.metrics.export.cloudwatch.batchSize`    | `management.cloudwatch.metrics.export.batchSize`    | Defines the maximum number of metrics sent in a single API request to CloudWatch                                  |
| `management.metrics.export.cloudwatch.region`     | `management.cloudwatch.metrics.export.region`     | Specifies AWS region where metrics are sent                                                      |

## Document Text Handler (PDFBoxEngine module)

### Properties in application.properties file

#### Deleted properties

| Version 2023                                                 | Description                                            |
| --------------------------------------------------------- | ------------------------------------------------------ |
| `management.metrics.export.statsd.enabled`  | Enables or disables exporting metrics using the StatsD protocol.                             |
| `management.metrics.export.statsd.step`     | Sets the reporting interval for StatsD metrics.                                              |
| `management.metrics.export.statsd.host`     | Specifies the StatsD server hostname.                                                        |
| `management.metrics.export.statsd.port`     | Defines the port used to send metrics to the StatsD server.                                  |

#### Renamed properties

| Version 2023                                | Version 2026                                | Description                                                                                 |
| ------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `management.endpoint.prometheus.enabled`    | `management.endpoint.prometheus.access`     | Controls access level (enabled, read-only, or disabled) to the Prometheus actuator endpoint |
| `management.endpoint.metrics.enabled`       | `management.endpoint.metrics.access`        | Defines whether and how the metrics actuator endpoint can be accessed                       |
| `management.metrics.export.elastic.enabled` | `management.elastic.metrics.export.enabled` | Enables or disables exporting metrics to Elasticsearch                                      |
| `management.metrics.export.elastic.step`    | `management.elastic.metrics.export.step`    | Sets the interval at which metrics are pushed to Elasticsearch                              |
| `management.metrics.export.elastic.index`   | `management.elastic.metrics.export.index`   | Specifies the Elasticsearch index used to store exported metrics                            |
| `management.metrics.export.elastic.host`    | `management.elastic.metrics.export.host`    | Defines the Elasticsearch host where metrics are sent                                       |
| `management.metrics.export.datadog.enabled` | `management.datadog.metrics.export.enabled` | Enables or disables exporting metrics to Datadog                                            |
| `management.metrics.export.datadog.api-key` | `management.datadog.metrics.export.api-key` | API key used to authenticate with Datadog                                                   |
| `management.metrics.export.datadog.step`    | `management.datadog.metrics.export.step`    | Defines the frequency at which metrics are sent to Datadog                                  |
| `management.metrics.export.datadog.uri`     | `management.datadog.metrics.export.uri`     | Specifies the Datadog API endpoint URI                                                      |
| `management.metrics.export.cloudwatch.enabled` | `management.cloudwatch.metrics.export.enabled` | Enables or disables exporting metrics to Cloudwatch                                            |
| `management.metrics.export.cloudwatch.namespace` | `management.cloudwatch.metrics.export.namespace` | Defines the CloudWatch namespace where your metrics will appear                                                   |
| `management.metrics.export.cloudwatch.step`    | `management.cloudwatch.metrics.export.step`    | Defines the frequency at which metrics are sent to Cloudwatch                                  |
| `management.metrics.export.cloudwatch.batchSize`    | `management.cloudwatch.metrics.export.batchSize`    | Defines the maximum number of metrics sent in a single API request to CloudWatch                                  |
| `management.metrics.export.cloudwatch.region`     | `management.cloudwatch.metrics.export.region`     | Specifies AWS region where metrics are sent                                                      |
