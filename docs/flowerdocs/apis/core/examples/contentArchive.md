---
title: Content archive
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
description: Download component contents as a ZIP archive
sidebar_position: 24
date: "2018-04-02T12:20:01+01:59"
content_hash: ecf40d46f8be807229a241cfa88409abcdcbeda488006cffdfc3e275d87c055a
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The content archive service allows downloading the contents of documents, folders or virtual folders as a ZIP archive. The operation can be performed synchronously or asynchronously depending on the volume of data.

# Archive document contents

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <IDS>        document identifiers (comma-separated)
curl -X GET "<CORE_HOST>/rest/documents/<IDS>/content/archive/" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>

The following query parameters can be used:

|Name|Description|Default|
|------|-----------|-------|
|`isAsync`|Run as an asynchronous job|`true`|
|`format`|Archive format|`application/zip`|
|`includeMetaData`|Include component metadata in the archive|`false`|
|`recursive`|Include children contents recursively|`false`|
|`flatten`|Flatten the directory structure|`true`|
|`name`|Name of the output archive file|auto-generated|

# Archive folder contents

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <ID>         folder identifier
curl -X GET "<CORE_HOST>/rest/folders/<ID>/content/archive/" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>

# Archive virtual folder contents

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <ID>         virtual folder identifier
curl -X GET "<CORE_HOST>/rest/virtualFolders/<ID>/content/archive/" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>

# Asynchronous job management

When using `isAsync=true`, the archive is generated in the background. The following endpoints allow tracking the job progress.

## Check job status

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <IDS>        component identifiers used for the archive request
curl -X GET "<CORE_HOST>/rest/documents/<IDS>/content/archive/job/status/" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>

## Get job result

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <IDS>        component identifiers used for the archive request
curl -X GET "<CORE_HOST>/rest/documents/<IDS>/content/archive/job/" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>

## Get job error

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <IDS>        component identifiers used for the archive request
curl -X GET "<CORE_HOST>/rest/documents/<IDS>/content/archive/job/error/" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>