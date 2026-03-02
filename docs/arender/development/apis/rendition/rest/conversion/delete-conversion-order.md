---
title: DELETE a conversion order
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: a7947d5bc11ead3aa8dd7e3bbafe900200ff0642ed90810965fd51bee888f34b
---

This API allows to delete a conversion order previously requested.

## API technical description

Endpoint:

```bash
DELETE /conversions/<ConversionOrderId>
```

Resource path:

| Variable         | Description                               |
| :--------------- | :---------------------------------------- |
| conversionOderId | The id of the conversion order to delete. |

## Examples

### Delete a conversion order

The call below generates a request to delete the transform order with id _123e4567-e89b-12d3-a456-426614174000_.

```bash
curl -X 'DELETE' \
  'http://localhost:8761/conversions/123e4567-e89b-12d3-a456-426614174000' \
  -H 'accept: */*'
```
