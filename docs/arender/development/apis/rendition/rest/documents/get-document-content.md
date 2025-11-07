---
title: "GET Document Content"
---








This API allows you to retrieve the content of a document in specific format
```javascript
if provided otherwise in the original format.
```

## API Description

Endpoint:
```bash
GET /documents/{documentId}/file
```

Resource path:

| Variable    | Required | Description           |
|:------------|:---------|:----------------------|
| documentId  | Yes      | The ID of a document  |


Query params:

| Parameter | Required | Description                        |
|:----------|:---------|:-----------------------------------|
| format    | No       | The output format of the document  |


Response :

| Type                | Description                    |
|:--------------------|:-------------------------------|
| HttpServletResponse | The document content as a file |

## Example:

### Get Document Content

The following example retrieves the content of a document with the specified 
document ID in PDF format. The parameter -o allow to save the result in an output file.

```bash
curl -X GET 'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/file?format=pdf' -o document.pdf
```
