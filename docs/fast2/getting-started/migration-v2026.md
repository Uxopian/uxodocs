---
title: Migration to v2026.0.0
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide covers everything required to upgrade a Fast2 installation to v2026.0.0. The upgrade introduces several breaking changes — read through the entire guide before starting.

:::danger Prerequisites

-   **Java 21** is required. Java 17 is no longer supported. Java 25 is recommended for new installations.
-   All custom tasks and extensions must be recompiled against the new Fast2 SDK before deployment (see [Step 3](#step-3--recompile-custom-code)).

:::

---

## Upgrade plan

### Step 1 — OpenSearch data migration

Fast2 v2026.0.0 ships with **OpenSearch 3.5.0**, replacing the previous 1.3.x distribution. Data from the old instance must be migrated before starting the new broker.

1. Start the new OpenSearch 3.5.0 instance (default port: `1790`).

2. Add the following entry to the new instance's `opensearch.yml` to allow remote reindex:

    ```yaml
    reindex.remote.allowlist: ["127.0.0.1:9200", "localhost:9200"]
    ```

3. Restart the new OpenSearch 3.5.0 instance.

4. Run the provided migration script:

    ```sh
    packaging/complete/src/main/resources/opensearch/script/opensearch-migration.sh
    ```

    The script migrates all 12 Fast2 indexes (`f2_campaigns`, `f2_maps`, `f2_users`, etc.) from the old instance to the new one using the Remote Reindex API.

5. Once migration is complete, stop the old OpenSearch instance and start the Fast2 v2026.0.0 broker.

:::info

If you are upgrading from a version earlier than **2.12.0**, refer to the previous upgrade notes before applying this one.

:::

---

### Step 2 — Update `application.properties`

Several properties have been renamed in this version. Update your `config/application.properties` file before starting the new broker:

| Previous property (v2025.x)          | New property (v2026.0.0)              |
| ------------------------------------- | ------------------------------------- |
| `broker.url=.../broker`               | `broker.url=.../api/broker`           |
| `broker.embeddedworker.max.memory`    | `broker.embedded.worker.max.memory`   |
| `logging.level.com.fast2.esbroker`    | `logging.level.com.fast2.broker`      |
| `arender.url`                         | `arender.rendition.url`               |

The following properties are new and optional:

```properties
# Timeout in seconds before the broker stops retrying to connect to OpenSearch
opensearch.reconnection.timeout=60
```

---

### Step 3 — Recompile custom code

The Fast2 SDK has migrated from `javax.*` to `jakarta.*` namespaces as part of the Spring Boot 4 upgrade. Any custom task, connector, or extension referencing `javax.*` must be updated and recompiled against the new SDK.

If your code references the `com.fast2.esbroker` package, rename all occurrences to `com.fast2.broker`. The Maven artifact `fast2-broker-es` has also been renamed to `fast2-broker-core`.

:::tip SDK packaging change

The `fast2-sdk` artifact is now distributed as a **fat JAR**, bundling all transitive dependencies. Developers no longer need access to the Arondor Artifactory to compile custom modules.

:::

---

## Breaking changes

### All REST API endpoints now require the `/api` prefix

Every REST endpoint has been prefixed with `/api`. Any external integration calling the Fast2 API must be updated.

Examples:

| Previous endpoint (v2025.x)   | New endpoint (v2026.0.0)       |
| ------------------------------ | ------------------------------ |
| `GET /maps`                    | `GET /api/maps`                |
| `POST /campaigns`              | `POST /api/campaigns`          |
| `GET /workers`                 | `GET /api/workers`             |
| `GET /broker/...`              | `GET /api/broker/...`          |

The Swagger UI remains available at `http://localhost:1789/swagger-ui/index.html` with the updated paths.

---

### javax.* → jakarta.* migration

All `javax.*` imports have been replaced with `jakarta.*` across the Fast2 codebase. Custom code compiled against a previous version of the SDK will fail to load at runtime without recompilation.

---

### Package rename: `com.fast2.esbroker` → `com.fast2.broker`

The broker core package has been renamed. Spring XML configurations and any code referencing the old package must be updated.

---

### EclipseLink removed

The `org.eclipse.persistent` (EclipseLink) dependency has been removed from the Fast2 distribution. If your environment explicitly bundled EclipseLink in the worker classpath, verify that no remaining dependencies rely on it.

---

### iText modules removed

All iText-based modules have been removed from the Fast2 distribution:

-   `fast2-convert-itext`
-   `fast2-eml-itext`
-   `Tiff2PdfIText` task — use [Tiff2PdfBox](../catalog/converter.md) instead.

---

## External worker authentication

Workers now authenticate exclusively via a **JWT token** issued by the broker. Existing workers configured without authentication will fail to register after the upgrade.

To provision an external worker:

1. Generate a token from an administrator account:

    ```sh
    POST /api/workers/generate-token?workerId=<my-worker-id>
    ```

2. Set the returned token as an environment variable before starting the worker:

    <Tabs groupId="operating-system">
    <TabItem value="linux" label="Linux" default>

        ```sh
        export WORKER_AUTH_TOKEN="<token>"
        ./startup-worker.sh
        ```

    </TabItem>
    <TabItem value="windows" label="Windows">

        ```cmd
        set WORKER_AUTH_TOKEN=<token>
        startup-worker.bat
        ```

    </TabItem>
    </Tabs>

Worker registrations are persisted in the database. Tokens only need to be provisioned once per worker ID.
