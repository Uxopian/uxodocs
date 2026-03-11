---
title: GET version
last_update:
  date: '2026-03-11T13:57:28.063Z'
  author: CI/CD Bot
content_hash: 827c8f0fd7526d06de371af1cefbe8cb4546400390437ef228411f89faba4f06
---

This API allows you to retrieve the ARender and isntalled tools versions.

## API technical description

Endpoint:

```bash
GET /version
```

Response:

| Type | Description                |
| :--- | :------------------------- |
| JSON | ARender and tools versions |

## Examples

### Get versions

```bash
curl -X 'GET' 'http://localhost:8761/version' -H 'accept: application/json'
```

Response:

```json
{
  "Wkhtmltopdf": "0.12.6",
  "FFmpeg": "8.0.1",
  "LibreOffice": "26.2.1",
  "ImageMagick": "7.1.2-15",
  "ARender": "{{version}}"
}
```