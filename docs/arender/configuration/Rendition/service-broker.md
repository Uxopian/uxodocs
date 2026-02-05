---
title: "Service broker"
last_update:
  date: '2026-02-05T15:05:05.898Z'
  author: CI/CD Bot
sidebar_position: 1
content_hash: 1a1aa7ae57da69c74d9bea6acf214a33176bf71e1f819219447938c2ca13292c
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

:::warning Using kubernetes environment

Metrics server must be installed on Kubernetes if `provider.environment` is set to `KUBERNETES`

:::

## Temporary file storage

When the rendition server starts, folders and files in the temporary files folder path will be deleted.
This deletion will not be automatic if the default path *../../tmp* has been modified.
In this case, the following configuration needs to be done.

```cfg title="/modules/endition-engine/application.properties"
default.document.path.startup.clear=true
```