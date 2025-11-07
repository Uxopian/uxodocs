---
title: "POST annotation conversions"
---








This API allows you to convert annotations from an existing document id.

## API technical description

Entry point:
```bash
POST /annotations/conversion
```

Query Param:

| Variable             | Type   | Required | Description                                                                                   |
| :------------------- |:-------|:---------|:----------------------------------------------------------------------------------------------|
| sourceType           | String | yes      | The source annotation format type, the accepted values are XFDF or FDF.                       |
| targetType           | String | yes      | The target annotation format type, the accepted values are XFDF or FDF.                       |
| documentId           | String | yes      | The ID of the requested document.                                                             |

Header:

| Variable             | Type   | Required | Description                                                                                   |
| :------------------- |:-------|:---------|:----------------------------------------------------------------------------------------------|
| Accept               | String | yes      | The format output type, the accepted values are application/json or application/octet-stream. |

Response:

| Attribute             | Type                     | Description                                    |
| :-------------------- | :----------------------- |:-----------------------------------------------|
| annotations           | InputStream or JSON      | The annotations for the requested document id. |

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
