---
title: Health records server
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 1a33ba590c1af1ed3cc40e2f5939b4edc85a1392dea2c50eba1af34c7547af9c
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
