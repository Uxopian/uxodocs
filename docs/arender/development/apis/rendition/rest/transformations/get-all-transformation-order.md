---
title: GET all transformation orders
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: c347a0f2e5511211bfa19aec7450be1be42aa043d0830410ca5a9e04fafb48be
---

This API allows you to retrieve all transformation orders.

## API technical description

Endpoint :

```bash
GET /transformations
```

Response :

| Attribute            | Type                            | Description                    |
| :------------------- | :------------------------------ | :----------------------------- |
| transformationOrders | List&lt;TransformationOrder&gt; | The transformation orders list |

## Examples

### Get all transformation orders

The call below generates a request to retrieve transformation orders.

```bash
curl -X 'GET' \
  'http://localhost:8761/transformations' \
  -H 'accept: */*'
```
