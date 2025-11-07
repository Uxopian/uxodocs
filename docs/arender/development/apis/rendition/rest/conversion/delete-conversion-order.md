---
title: "DELETE a conversion order"
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
