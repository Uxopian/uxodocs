---
title: POST a comparison order
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 7475d005561487e63426dd028ff32160efeac1447335e5f06ee5034247e36509
---

This API allows you to request a comparison order and retrieve a ComparisonOrderId.

## API technical description

Endpoint:

```bash
POST /comparisons
```

Body:

| Attribute       | Type   | Required | Description                                                                                                             |
| :-------------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------- |
| leftDocumentId  | String | yes      | Id of the first document to compare.                                                                                    |
| rightDocumentId | String | yes      | Id of the second document to compare.                                                                                   |
| fuzz            | String | no       | Determine the accurate pixel comparison calculation. The value is between 0 and 100.                                    |
| highlightColor  | String | no       | Color of the differences. The value is in hexadecimal without the '#' character, for example "ff0000" for red color.    |
| lowlightColor   | String | no       | Color of the similarities. The value is in hexadecimal without the '#' character, for example "ffffff" for white color. |

Response:

| Attribute         | Type              | Description                                                                                                                                   |
| :---------------- | :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| comparisonOrderId | ComparisonOrderId | Comparison order ID.<br/>This can allow you to use other APIs like the one to retrieve some information about the comparison or to delete it. |

## Examples

### Order Comparison

The call below generates a comparison request of two documents already known from the rendition.

```bash
curl -X 'POST' \
  'http://localhost:8761/comparisons' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
      "fuzz": 0,
      "highlightColor": "ff0000"",
      "leftDocumentId": "docId1",
      "lowlightColor": "ffffff",
      "rightDocumentId": "docId2"
}'
```
