---
title: POST a conversion order
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 9adf96ed6dedc4a33b350bec84ecd75237b63a863979617fb5df61d67c0cdc4f
---

This API allows you to request a conversion order to create a new document in an expected format.

## API technical description

Endpoint:

```bash
POST /conversions
```

Body:

| Attribute  | Type   | Required | Description             |
| :--------- | :----- | :------- | :---------------------- |
| documentId | String | yes      | Source document id.     |
| format     | String | yes      | Target document format. |

Response:

| Attribute         | Type              | Description                                                                                                                                   |
| :---------------- | :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| conversionOrderId | ConversionOrderId | conversion order ID.<br/>This can allow you to use other APIs like the one to retrieve some information about the conversion or to delete it. |

## Examples

### Convert a document

The call below generates a conversion request for a document already known from the rendition.

```bash
curl -X 'POST' \
  'http://localhost:8761/conversions' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "documentId": "docId",
  "format": "pdf",
}'
```
