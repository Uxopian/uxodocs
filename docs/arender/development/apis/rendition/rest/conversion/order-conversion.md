---
title: POST a conversion order
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 1787d83f21ef3d19ec52a2a7ccbc66664055e2cb80ba93667037b537db1adcc7
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
