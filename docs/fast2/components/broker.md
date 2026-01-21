---
sidebar_position: 1
title: Broker
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 9d673fb7dfb45847c73e6987ea4054cec19c9cf62b9626a3249eadb0d03a2d78
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
