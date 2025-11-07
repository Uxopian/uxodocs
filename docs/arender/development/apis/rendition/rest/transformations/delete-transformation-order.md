---
title: "DELETE a transformation order"
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
