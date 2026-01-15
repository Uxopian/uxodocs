---
title: GET version
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 02d3d51533709e1803efafff5ec54a3898e4790b80f3fd0ac2544aeea2353922
---

This API allows you to retrieve the ARender and isntalled tools versions.

## API technical description

Endpoint:

```bash
GET /version
```

Response :

| Type | Description                |
| :--- | :------------------------- |
| JSON | ARender and tools versions |

## Examples

### Get versions

```bash
curl -X 'GET' 'http://localhost:8761/version' -H 'accept: application/json'
```
