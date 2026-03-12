---
title: DELETE a conversion order
last_update:
  date: '2026-03-12T20:43:52.809Z'
  author: CI/CD Bot
content_hash: ff01dc96f3a54f4d44a11ae4ad922bcf414465f14fa790878fa9dec88c155f10
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
