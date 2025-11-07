---
title: "Server performance / Set server"
---







## Server performance

A servlet is deployed to display the performance of each server.
These performances will be sent as a file, if the `format` parameter is empty, not given in the URL, or equal to `HTML`, the file will be an HTML file.
Otherwise the file will be a JSON file.

### Request 

This functionality is accessible via the servlet: **weatherServlet**

Usable in GET


#### Request example

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/weather?format=type'
```

* format: the format of the returned file (optional)

### Servlet Response

Performance of each server will be displayed in a file.
If the `format` parameter is empty, not given in the URL or equals to `HTML` the file will be an HTML file. 
Otherwise the file will be a JSON file.

## Set server

A servlet is deployed to add a server thanks to its address.

### Request 

This functionality is accessible via the servlet: **weatherServlet**

Usable in POST

#### Request example

``` bash
curl -X POST -d "<arender_rendition_host>" 'http://<arender_host>/ARender/arendergwt/weatherServlet'
```

* arender_rendition_host : new server address to add.

### Servlet Response

To make sure the server is added, it is possible to use the GET query which will give you the performance of each of your servers.