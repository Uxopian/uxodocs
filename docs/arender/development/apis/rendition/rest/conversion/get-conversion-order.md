---
title: GET a conversion order
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 9142489ec211f39a7f10cbedc6f764c462e53d9c29c699c26d12edec97562ffa
---

This API allows you to retrieve a conversion order previously requested.

## API technical description

Entry point:

```bash
GET /conversions/&lt;ConversionOrderId&gt;
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

```bash

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

```
