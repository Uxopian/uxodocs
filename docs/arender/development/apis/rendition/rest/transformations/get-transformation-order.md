---
title: GET a transformation order
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 2767590bef3ec85655fff549f9e7e68a64b9e379f54fb1d787c1c58ae769246a
---

This API allows you to retrieve a transformation order previously requested.

## API technical description

Entry point :

```bash
GET /transformations/<transformationOrderId>
```

Resource path:

| Variable             | Description                      |
| :------------------- | :------------------------------- |
| transformationOderId | The ID of a transformation order |

Response :

| Attribute           | Type                | Description                                                           |
| :------------------ | :------------------ | :-------------------------------------------------------------------- |
| transformationOrder | TransformationOrder | Contains every information related to the given TransformationOrderId |

## Examples

### Retrieve a transformation order

The call below generates a request to retrieve the transformation order with id _123e4567-e89b-12d3-a456-426614174000_.

```bash
curl -X 'GET' \
  'http://localhost:8761/transformations/123e4567-e89b-12d3-a456-426614174000' \
  -H 'accept: */*'
```
