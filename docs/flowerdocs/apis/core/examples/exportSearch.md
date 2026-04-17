---
title: Export search results as CSV
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
description: Export search results to a CSV file
sidebar_position: 26
date: "2018-04-02T12:20:01+01:59"
content_hash: eac2bf6e0b438ea74ccf0eb2a60158de9800012d0ef6e3141632984fdd1a2505
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The export search service allows exporting search results to a CSV file. The operation can be performed synchronously or asynchronously.

# Export via POST

The examples below show how to export search results using a POST request with a `SearchRequest` body.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <CATEGORY>   component category (documents, folders, tasks, virtualFolders)
curl -X POST "<CORE_HOST>/rest/<CATEGORY>/search/csv" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
  "searchCriteria": [
    {
      "name": "classId",
      "value": "MyDocumentClass"
    }
  ],
  "paginationContext": {
    "maxResults": 1000,
    "pageIndex": 0
  }
}'
```

  </TabItem>
</Tabs>

The following query parameters can be used:

|Name|Description|Default|
|------|-----------|-------|
|`isAsync`|Run as an asynchronous job|`false`|
|`locale`|Locale for date and number formatting|server default|

# Export via GET

Alternatively, the search request can be passed as a URL-encoded JSON parameter.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>      FlowerDocs Core base URL
# <TOKEN>          authentication token
# <CATEGORY>       component category (documents, folders, tasks, virtualFolders)
# <SEARCH_JSON>    URL-encoded SearchRequest JSON
curl -X GET "<CORE_HOST>/rest/<CATEGORY>/search/csv?searchRequest=<SEARCH_JSON>" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>

# Asynchronous job management

When using `isAsync=true`, the CSV export is generated in the background. Use the following endpoints to track job progress.

## Check job status

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>  FlowerDocs Core base URL
# <TOKEN>      authentication token
# <CATEGORY>   component category
curl -X GET "<CORE_HOST>/rest/<CATEGORY>/search/csv/job/status/" \
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
# <CATEGORY>   component category
curl -X GET "<CORE_HOST>/rest/<CATEGORY>/search/csv/job/" \
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
# <CATEGORY>   component category
curl -X GET "<CORE_HOST>/rest/<CATEGORY>/search/csv/job/error/" \
  -H "token: <TOKEN>"
```

  </TabItem>
</Tabs>