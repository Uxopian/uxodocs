---
title: OpenSearch version upgrade
sidebar_position: 6
date: "2006-03-28T13:20:01+02:00"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: 6c661572a3d7a5a3593695429aa9d48c4756cb6e3b88a3711507ea0d1f46e33e
---

To upgrade OpenSearch, you need to install a new OpenSearch cluster in the target version.
Next, the following procedure describes how to push data from one OpenSearch cluster to another after creating your scope from the CLM.

# Launch of re-indexing

In this section, we will ask OpenSearch to populate an index from another remote index.

OpenSearch will first check the request and then return the identifier of an asynchronous task.
To do this, run the following request on the target cluster, adapting it to the environments:

```yaml
POST /_reindex?wait_for_completion=false

  "source": {
    "remote": {
      "host": "http://localhost:9200",
      "username": "user",
      "password": "password"
    },
    "index": "<scope>-flower-docs",
    "type": "document",
    "size": 100
  },
  "dest": {
    "index": "<scope>-flower-docs"


```

**Note:** In this request, `<scope>` is the identifier of the FlowerDocs scope in lower case.

The response returned by OpenSearch is of the type:

```yaml
"task": "<nodeId>:<taskId>"
```

# Re-indexing status

As the re-indexing task is asynchronous, it is possible to know its status:

```properties
GET /_tasks/<nodeId>:<taskId>
```

Depending on the response returned, it is therefore possible to determine whether the re-indexing has been carried out successfully or whether it is still running.

- A `completed` flag indicates whether or not re-indexing has been completed
- The recovered task mentions a `response` or `error` object indicating whether the task was successfully completed

All re-indexing tasks can also be viewed with:

```properties
GET /_tasks?detailed=true&actions=*reindex
```
