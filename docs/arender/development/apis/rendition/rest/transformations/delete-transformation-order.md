---
title: DELETE a transformation order
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: b82e77a1041208750e61bcf4e4ea6622ef92d36de4f443534428e8551f03de07
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
