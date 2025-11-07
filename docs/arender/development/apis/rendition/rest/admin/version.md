---
title: "GET version"
---








This API allows you to retrieve the ARender and isntalled tools versions.

## API technical description

Endpoint:
```bash
GET /version
```

Response :

| Type  | Description                |
|:------|:---------------------------|
| JSON  | ARender and tools versions |

## Examples

### Get versions

```bash
curl -X 'GET' 'http://localhost:8761/version' -H 'accept: application/json'
```