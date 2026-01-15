---
title: GET Pages Search Result
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 2a0126bb2f2e0e8607ad8e098e1df96187c7695bdde8c2a0ab3e030310bbbe28
---

This API allows you to retrieve the search results for the pages of a specific document.

## API Description

Endpoint:

```bash
GET /documents/{documentId}/pages
```

Resource path:

| Variable   | Required | Description          |
| :--------- | :------- | :------------------- |
| documentId | Yes      | The ID of a document |

Query params:

| Variable        | Required | Description                                                    |
| :-------------- | :------- | :------------------------------------------------------------- |
| searchText      | Yes      | The text to search for                                         |
| accentSensitive | No       | Determines if the search is accent-sensitive                   |
| caseSensitive   | No       | Determines if the search is case-sensitive                     |
| regex           | No       | Determines if the value of the searchText parameter is a regex |

Response :

| Type              | Description                                     |
| :---------------- | :---------------------------------------------- |
| PagesSearchResult | The search results for the pages in JSON format |

## Examples

### Get Pages Search Result

The following call generates a request to get the search results for the document
with ID _b64_bm9yZS92SDMtMS0xMTh1735080237_.
The search is performed for the text "example" with case sensitivity enabled.

```bash
curl -X 'GET' \
  'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/pages?searchText=example&caseSensitive=true' \
  -H 'accept: application/json'
```
