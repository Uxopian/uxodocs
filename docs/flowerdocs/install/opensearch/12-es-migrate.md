---
title: FlowerDocs 2.6 version upgrade
sidebar_position: 7
date: "2022-02-14T13:20:01+02:00"
last_update:
  date: '2026-01-29T08:27:50.243Z'
  author: CI/CD Bot
content_hash: d56eb66be215c74b80aa5379b1e301f64caa118cc9a09df27dbc826ee25ab289
---

:::warning OpenSearch {{osVersion}}
FlowerDocs {{version}} runs on **OpenSearch {{osVersion}}**. Migrating existing data from OpenSearch 1.x to {{osVersion}} is **mandatory**. The automated migration tooling is not yet available; this section will document it once released.
:::

When upgrading FlowerDocs from version 2.5 and lower to version 2.6 and its minor versions, it is necessary to migrate the data. The indexing engine used in FlowerDocs 2.6.0 is OpenSearch, a fork of Elasticsearch version 7.10.2. Elasticsearch's internal data model has been overhauled following version 6.0 by removing support for types in indexes. A migration with rewriting is therefore necessary to carry out this version upgrade.

<br/>

For this purpose, FlowerDocs CLM provides a `job`, responsible for re-indexing scope data from an Elasticsearch 5.2.1 instance into an OpenSearch 1.3.19 instance.

<br/>

# Data reindexing

To reindex Elasticsearch data in OpenSearch, the following CLM command must be executed:

```properties
java -Des.nodes=<URL Cible OpenSearch> -jar <clm> es reindex --source=<URL source Elasticsearch> --scope=<scope cible> --reindex-source=true
```

<br/>

At a minimum, the following information is required:

- `--scope`: Scope to be re-indexed
- `--source`: Source Elasticsearch
- `-Des.nodes` : OpenSearch target (JVM parameter, not command parameter)

It is necessary to define which urls are allowed for reindexing in the OpenSearch configuration `opensearch.yml` with the property `reindex.remote.whitelist: "host1:port, host2:port"`

# Progress monitoring

The reindexing process may take longer or shorter depending on the volume of data to be reindexed.
In order to monitor the progress of the process, this utility provides information at regular intervals on the percentage of completion for:

- each Elasticsearch index
- the complete reindexing process

<br/>

The time interval between each progress point occurs every 20 seconds, and can be configured by adding the `reindexation.sleep` parameter with a value in milliseconds as follows:

```properties
<clm> es reindex --reindexation.sleep=<intervalle en ms>
```

# Authentication management

## Source: Elasticsearch

In order to provide the credentials to connect to a secure source Elasticsearch instance, the following parameters must be provided to the command:

- `--user`: Elasticsearch user ID
- `--password`: Elasticsearch user password

<br/>

```properties
java -jar <clm> es reindex --user=<Elasticsearch user> --password=<Elasticsearch password>  <others parameters>
```

## Target: OpenSearch

In order to provide the credentials to connect to a secure OpenSearch target instance, the following parameters must be provided to the JVM:

- `es.user`: OpenSearch user ID
- `es.password`: OpenSearch user password

<br/>

```properties
java -Des.nodes=<target URL OpenSearch> -Des.user=<OpenSearch user> -Des.password=<OpenSearch password> -jar <clm> es reindex <parameters>
```

# Eliminating reindexing tasks

By default, all tasks are deleted at the end of command execution. Tasks can be stored for analysis via OpenSearch APIs.
To do this, the following parameters must be supplied to the command:

- `delete-tasks=false`, no task is deleted after reindexing.
- `delete-failed-tasks=false`, only successful tasks are deleted, error tasks are retained.

<br/>

```properties
<clm> es reindex --delete-tasks=false
<clm> es reindex --delete-failed-tasks=false
```

# Index creation in OpenSearch

If indexes already exist in OpenSearch, you can disable their creation by adding the `create-indexes` parameter:

```properties
<clm> es reindex --create-indexes=false
```

# Mapping creation in OpenSearch

If the mappings for each index already exist in OpenSearch, it is possible to disable their update by adding the `update-mappings` parameter:

```properties
<clm> es reindex --update-mappings=false
```

# Configuring customized reindexing scripts

It is possible to override FlowerDocs' internal reindexing scripts by supplying your own scripts. To take them into account, you need to enter the path of a folder containing the scripts, by adding the `reindexation.scripts.path` parameter as follows:

```properties
<clm> es reindex --reindexation.scripts.path=<path to directory>
```

<br/><br/>

The reindex file must be named `Documents-reindex.json`.
