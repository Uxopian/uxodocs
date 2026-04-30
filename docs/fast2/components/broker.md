---
sidebar_position: 2
title: Broker
last_update:
  date: '2026-01-28T13:32:53.239Z'
  author: CI/CD Bot
content_hash: 1b8499be50e7c42e2ca7a052389fcdce2cc0e22574bc92103e72adafb9ea253a
---

# The broker

:::tip

The broker is the workflow orchestrator, in charge of database communication, sending punnets to the worker(s) for them to process the operations.

:::

## <i class="fas fa-hat-chef"></i> Configure the broker

Depending on the amount of documents you are dealing with, you may want to control max memory usage allowed (Xmx) for broker.

By default, only 1GB is allocated for this resource :

```ini title="/config/env.properties"
...
# Broker Maximum memory allowed (Xmx)
BROKER_MAX_MEMORY=1G
```

If the campaign are involving a couple of millions of documents, increasing this value to 8GB or 16GB will definitely help increasing the performance rate of the migration.

<br />

## <i class="fas fa-database"></i> OpenSearch configuration

The broker communicates with the embedded OpenSearch instance. The following optional property controls how long the broker retries connecting to OpenSearch before giving up:

```ini title="/config/application.properties"
# Timeout in seconds before the broker stops retrying to connect to OpenSearch
opensearch.reconnection.timeout=60
```

The broker continues operating during OpenSearch downtime and resumes normal operations automatically once connectivity is restored.

:::note

If you are upgrading from a previous version, the package `com.fast2.esbroker` has been renamed to `com.fast2.broker`. The Maven artifact `fast2-broker-es` has been renamed to `fast2-broker-core`. Update any custom code, Spring XML configurations, or logging properties referencing the old package name.

:::

---

## <i class="fas fa-laptop"></i> Configure the UI port

The UI port is also subject to configuration.

Fast2 application run on the 1789 port by default. To change this, add or update the parameters below:

```ini title="/config/application.properties" {4}
...
# Remote broker port to use by the worker
# broker.port=1789
server.port=1789
```

<!-- Put the same value for these two properties. -->
