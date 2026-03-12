---
title: GET a conversion order
last_update:
  date: '2026-03-12T20:43:52.809Z'
  author: CI/CD Bot
content_hash: 5e2f5b6a5da03cd222bfa2ec222d549f3bfd9a0d2ca85548ff3d4738815cf18e
---

This API allows you to retrieve a conversion order previously requested.

## API technical description

Entry point:

```bash
GET /conversions/<ConversionOrderId>
```

Resource path:

| Variable         | Description                   |
| :--------------- | :---------------------------- |
| conversionOderId | The ID of a conversion order. |

Response:

| Attribute       | Type            | Description                   |
| :-------------- | :-------------- | :---------------------------- |
| conversionOrder | ConversionOrder | the conversion order details. |

## Examples

### Retrieve a conversion order

The call below generates a request to retrieve the conversion order with id _123e4567-e89b-12d3-a456-426614174000_.

```bash
curl -X 'GET' \
  'http://localhost:8761/conversions/123e4567-e89b-12d3-a456-426614174000' \
  -H 'accept: */*'
```

Response sample:

```json
{
  "conversionOrderId": {
    "id": "string"
  },
  "currentState": "QUEUED",
  "documentId": "string",
  "errorMessage": "string",
  "format": "string",
  "processedDate": "2023-06-19T16:12:24.476Z",
  "processingTime": 0,
  "queuedDate": "2023-06-19T16:12:24.476Z",
  "queuedTime": 0
}
```
