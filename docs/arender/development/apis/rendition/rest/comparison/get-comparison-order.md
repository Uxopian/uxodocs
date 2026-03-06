---
title: GET a comparison order
last_update:
  date: '2026-03-06T18:23:33.786Z'
  author: CI/CD Bot
content_hash: 8fe62697db3d0330ae4017817e9ba5edc9303eade2327f24a219a343c31e4580
---

This API allows you to retrieve a comparison order previously requested.

## API technical description

Entry point:

```bash
GET /comparisons/<comparisonOrderId>
```

Resource path:

| Variable          | Type   | Required | Description                          |
| :---------------- | :----- | :------- | :----------------------------------- |
| comparisonOrderId | String | yes      | The ID of a comparison order to get. |

Query param:

| Variable  | Type   | Required | Description                                                   |
| :-------- | :----- | :------- | :------------------------------------------------------------ |
| timeoutMs | String | no       | The maximum waiting time before getting the comparison order. |

Response:

| Attribute      | Type            | Description       |
| :------------- | :-------------- | :---------------- |
| comparisonOder | ComparisonOrder | Comparison order. |

## Examples

### Retrieve a comparison order

The call below generates a request to retrieve the comparison order with id _123e4567-e89b-12d3-a456-426614174000_.

```bash
curl -X 'GET' \
  'http://localhost:8761/comparisons/123e4567-e89b-12d3-a456-426614174000?timeoutMs=6000' \
  -H 'accept: */*'
```

Response sample:

```json
{
  "comparisonOrderId": {
    "id": "string"
  },
  "currentState": "QUEUED",
  "errorMessage": "string",
  "fuzz": 0,
  "highlightColor": "string",
  "leftDocumentId": "string",
  "lowlightColor": "string",
  "processedDate": "2023-06-19T15:17:14.454Z",
  "processingTime": 0,
  "queuedDate": "2023-06-19T15:17:14.454Z",
  "queuedTime": 0,
  "rightDocumentId": "string",
  "targetDocumentId": "string"
}
```
