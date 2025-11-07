---
title: "Health records server"
---







A new servlet is deployed to display the server performance.

## Request 

This functionality is accessible via the servlet: **healthRecordsServlet**

Usable in GET.


### Request example

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/health/records?check=scope'
```

* check: (optional)
    * SELF: returns the HTML page even if no service is complete
    * RENDITION: sends an error if no service is complete

## Servlet Response

An HTML page is displayed with the different services. For each, the port, the state and the availability of the service are display.