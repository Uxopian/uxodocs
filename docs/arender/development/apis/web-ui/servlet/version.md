---
title: "Version"
---







Since version 2023.6.0, a new servlet has been introduced to display the ARender version.

## Request 

This functionality is accessible via the servlet: **VersionServlet**

Usable with **GET** HTTP method

### Request example

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/version'
```

## Servlet Response

The deployed ARender version in plain text format
