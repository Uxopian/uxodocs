---
title: GET all transformation orders
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 3ec32e5cdb7dd43faa6b75910331f4410acda0019e98e455d4f0ffb06b314d7e
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
