---
title: GET version
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: ddd9a43d8fdfb7beb1a9c7f56049d53b3dc1ff86d859d61cb7029166b19320e0
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
