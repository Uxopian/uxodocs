---
title: "Destroy session"
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