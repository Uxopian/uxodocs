---
title: Destroy session
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: c8f1da1e9ce67c27047bf1344a9b7647bd44c59e0ed0e83036d0d98e32733cef
---







A new servlet is deployed to destroy user session information.

## Request 

This functionality is accessible via the servlet: **destroySession**

The request can be used with any HTTP method.


### Request example

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/destroySession'
```

## Servlet Response

The session will be destroyed including the following ARender information:
* user
* userAgent
* versionUserAgent
