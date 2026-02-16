---
title: Health records server
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: e70c85f38afd88338b7b824e20eaadf29e05fff5cf77cc1d94e918b6ba79c812
---

A new servlet is deployed to display the server performance.

## Request

This functionality is accessible via the servlet: **healthRecordsServlet**

Usable in GET.

### Request example

```bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/health/records?check=scope'
```

- check: (optional)
    - SELF: returns the HTML page even if no service is complete
    - RENDITION: sends an error if no service is complete

## Servlet Response

An HTML page is displayed with the different services. For each, the port, the state and the availability of the service are display.
