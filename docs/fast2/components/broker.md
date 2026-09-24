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

<br />

## <i class="fas fa-folder-open"></i> Configure the content storage

When workers run with `worker.content.factory=remote`, they upload the contents they produce to the broker, and the broker writes them to disk. The root folder is set on the broker side:

```ini title="/config/application.properties"
...
# Root folder where the broker stores the contents uploaded by remote workers
broker.files.dir=files/
```

The default is `files/`, relative to the broker's working directory. Below that root the layout is fixed — `<campaign>/<step name>/<documentId or punnetId>` — and the worker-side `worker.files.dir` / `worker.files.pattern` properties do not apply. See [File storage architecture](./worker.md#file-storage-architecture) on the worker page for the full local-vs-remote comparison.

:::warning[Size the volume]
All the content of every remote campaign accumulates under `broker.files.dir`. Keep it on a volume sized for the campaigns you run, or point it at one that is.
:::

