---
title: "GET Named Destinations"
---







This API allows you to retrieve the named destinations of a specific document.

## API Description

Endpoint:
```bash
GET /documents/{documentId}/destinations
```

Resource path:

| Variable    | Required | Description           |
|:------------|:---------|:----------------------|
| documentId  | Yes      | The ID of a document  |

Response :

| Type              | Description                                                       |
|:------------------|:------------------------------------------------------------------|
| NamedDestinations | A JSON object representing the named destinations of the document |

## Examples

### Retrieve Named Destinations

The following example retrieves the named destinations for a document 
with ID _b64_bm9yZS92SDMtMS0xMTh1735080237_.

```bash
curl -X GET 'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/destinations' \
  -H 'accept: application/json'
```