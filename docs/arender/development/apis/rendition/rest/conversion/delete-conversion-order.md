---
title: DELETE a conversion order
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 07f9f709d2bfb82b790e855c3688594ea5460acc3cd51695aeb68428cd30df87
---








This API allows to delete a conversion order previously requested.

## API technical description

Endpoint:
```bash
DELETE /conversions/&lt;ConversionOrderId&gt;
```

Resource path:

| Variable             | Description                               |
| :------------------- |:------------------------------------------|
| conversionOderId     | The id of the conversion order to delete. |

## Examples

### Delete a conversion order

The call below generates a request to delete the transform order with id _123e4567-e89b-12d3-a456-426614174000_.

```bash
curl -X 'DELETE' \
  'http://localhost:8761/conversions/123e4567-e89b-12d3-a456-426614174000' \
  -H 'accept: */*'
```
