---
title: DELETE a transformation order
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 4fa9fbf2c277d4db1293790918c71498b5e1794cd0e5e5eec9407a24608bd4fd
---

This API allows to delete a transformation order previously requested.

## API technical description

Endpoint :

```bash
DELETE /transformations/<transformationOrderId>
```

Ressource path :

| Variable             | Description             |
| :------------------- | :---------------------- |
| transformationOderId | Transformation order ID |

## Examples

### Delete a transformation order

The call below generates a request to delete the transform order with id _123e4567-e89b-12d3-a456-426614174000_.

```bash
curl -X 'DELETE' \
  'http://localhost:8761/transformations/123e4567-e89b-12d3-a456-426614174000' \
  -H 'accept: */*'
```
