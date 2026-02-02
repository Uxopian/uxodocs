---
title: "Service broker"
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: 6f08938ff4debbf4913af3f1aee144f22ca4ffc68deb480c7b5e5ae706d6f349
---

## Environment

- Key: *Kubeprovider*

    | Description                    | Parameter Key | Type             |
    | ------------------------------ | ------------- | ---------------- |
    | Use localhost for all services | useLocalhost  | Boolean          |
    | Map of service host and ports  | kubeHosts     | Map&lt;String, int&gt; |

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