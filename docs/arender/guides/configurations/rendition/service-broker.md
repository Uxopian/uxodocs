---
title: "Service Broker"
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
sidebar_position: 1
content_hash: b8fad3cb1df9afd27f7ced067c7bdc67948bda5f87c6f098c0f2eb69f9ccf55e
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

## Checking disk space

Since version 2023.14.0, a disk space availability check has been added.
When a request to upload a new document to the rendition arrives and there is not enough disk space available,
the request is rejected and a 503 response is returned.

By default, the available space threshold is 1GB, a value that can be configured via properties:

```properties
# Disk free space threshold (in GB)
disk.free.space.threshold=2
```
