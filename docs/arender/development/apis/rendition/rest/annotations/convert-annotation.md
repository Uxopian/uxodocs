---
title: POST annotation conversions
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 91e383ee7c3f6284a1b92d56cd583a6cccb14024880398bcf2c671758b4225a4
---

This API allows you to convert annotations from an existing document id.

## API technical description

Entry point:

```bash
POST /annotations/conversion
```

Query Param:

| Variable   | Type   | Required | Description                                                             |
| :--------- | :----- | :------- | :---------------------------------------------------------------------- |
| sourceType | String | yes      | The source annotation format type, the accepted values are XFDF or FDF. |
| targetType | String | yes      | The target annotation format type, the accepted values are XFDF or FDF. |
| documentId | String | yes      | The ID of the requested document.                                       |

Header:

| Variable | Type   | Required | Description                                                                                   |
| :------- | :----- | :------- | :-------------------------------------------------------------------------------------------- |
| Accept   | String | yes      | The format output type, the accepted values are application/json or application/octet-stream. |

Response:

| Attribute   | Type                | Description                                    |
| :---------- | :------------------ | :--------------------------------------------- |
| annotations | InputStream or JSON | The annotations for the requested document id. |

## Examples

### Convert annotations for a specified document

The call below generates a request to convert the XFDF annotations for the document with id _b64_bG9jYWxlPWZyJnJhbmRvbVVVSUQ9ZmFjMTgyOWItYjc0Ni00ZGVlLTg1YWEtNTZhNzY4NTcyOGMx_ to FDF and get the result as InputStream.

```bash
$ curl -X 'POST'\
  'http://localhost:8761/annotations/conversion?sourceType=XFDF&targetType=FDF&documentId=b64_bG9jYWxlPWZyJnJhbmRvbVVVSUQ9ZmFjMTgyOWItYjc0Ni00ZGVlLTg1YWEtNTZhNzY4NTcyOGMx'\
  -H 'accept: application/octet-stream'\
  -H 'Content-Type: application/octet-stream'\
  --data-binary '@Titre.pdf'
```
