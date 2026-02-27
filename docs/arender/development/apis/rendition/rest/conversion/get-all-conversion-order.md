---
title: GET all conversion orders
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 5725f6a116fc1dd27bc40da2d0eaac37066d10a004c9e3e8f162eb1e1baf1164
---

This API allows you to retrieve all conversion orders.
The call to this API must be authenticated. The credentials are available in the _application.yaml_ configuration file of the document-service-broker.

```yaml
run-mode:
    username: username
    password: password
```

## API technical description

Endpoint:

```bash
GET /conversions
```

Response:

| Attribute        | Type                        | Description                 |
| :--------------- | :-------------------------- | :-------------------------- |
| conversionOrders | List&lt;ConversionOrder&gt; | The conversion orders list. |

## Examples

### Get all conversion orders

The call below generates a request to retrieve all conversion orders.
It is authenticated using the simple "Basic Authentication" method,
considering the username: _user_ and the password _password_.

```bash
curl -X 'GET' \
  'http://localhost:8761/conversions' \
  -H 'accept: */*' \
  -H 'Authorization: Basic dXNlcjpwYXNzd29yZA=='
```

Response sample:

```json
[
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
]
```
