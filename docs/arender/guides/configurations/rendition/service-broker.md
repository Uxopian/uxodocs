---
title: "Service Broker"
last_update:
  date: '2026-03-06T18:23:33.786Z'
  author: CI/CD Bot
sidebar_position: 1
content_hash: 41c20c7acace78a76d8eca8c31f3915000f0ad4f2367aa2431639d030e65ffa1
---

## Environment

- Key: *Kubeprovider*

    | Description                    | Parameter Key | Type             |
    | ------------------------------ | ------------- | ---------------- |
    | Use localhost for all services | useLocalhost  | Boolean          |
    | Map of service host and ports  | kubeHosts     | `Map<String, int>` |

```yaml title="application.yaml"
kubeprovider:
  useLocalhost : true
  kubeHosts:
    conversion-service: 19999
    jni-service: 9091
    pdfbox-service: 8899
```

- Key: *provider*

    | Description                 | Parameter Key | Type                    |
    | --------------------------- | ------------- | ----------------------- |
    | Specify running environment | environment   | Enum(LOCAL, KUBERNETES) |

```yaml title="application.yaml"
provider:
  environment: local
```

:::warning[Using kubernetes environment]

Metrics server must be installed on Kubernetes if `provider.environment` is set to `KUBERNETES`

:::

## Temporary file storage

When the rendition server starts, folders and files in the temporary files folder path will be deleted.
This deletion will not be automatic if the default path *../../tmp* has been modified.
In this case, the following configuration needs to be done.

```properties title="/modules/rendition-engine/application.properties"
default.document.path.startup.clear=true
```

## Conversion coordination timeout

When the broker forwards a conversion request to a rendition microservice, it waits internally for the conversion to complete before returning the result. By default this wait is capped at **120 seconds** (aligned with the HTTP read timeout).

For heavy documents such as large XLSX spreadsheets or long DOCX files, conversion can exceed 2 minutes. When the timeout expires the broker throws:

```
java.lang.IllegalStateException: Despair waiting for rendition of [documentId]
```

Use the following property in the broker's `application.properties` to raise the limit:

```properties title="/modules/rendition-engine/application.properties"
# Maximum time to wait for a document conversion to complete (in milliseconds)
arender.conversion.timeout.ms=300000
```

:::info
This timeout defaults to the value of `rest.client.read.timeout` (falling back to `120000` if unset). When tuning for heavy documents, all timeout layers must be raised consistently:

- **`arender.conversion.timeout.ms`** (this property, milliseconds) — broker coordination layer
- **[`arender.server.rendition.rest.read.timeout`](/docs/arender/guides/configurations/web-ui/server/rest-client/)** (milliseconds) — HMI HTTP read timeout
- **[`html.conversion.timeout`, `soffice.conversion.timeout`, `msoffice.conversion.timeout`](/docs/arender/guides/configurations/rendition/task-conversion#conversion-timeouts)** (seconds) — per-format converter timeouts in the TaskConversion module
:::

## Checking disk space

Since version 2023.14.0, a disk space availability check has been added.
When a request to upload a new document to the rendition arrives and there is not enough disk space available,
the request is rejected and a 503 response is returned.

By default, the available space threshold is 1GB, a value that can be configured via properties:

```properties
# Disk free space threshold (in GB)
disk.free.space.threshold=2
```
