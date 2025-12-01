---
title: GET Text Positions with Search in Document
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 0e88ad47796411127eddcaa07bbb8dfe5f0c1a072ba27d307fa0d40c574e5984
---







This API searches for text positions within a specified page range, returning an object that contains the text position found, the last page searched before the process timed out (since the backend has a defined timeout configuration), and the overall status of the search.

Available starting since version 2023.12.0.

## API Description

Endpoint:
```bash
GET /documents/{documentId}/search
```

Resource path:

| Variable    | Required | Description                                                 |
|:------------|:---------|:------------------------------------------------------------|
| documentId  | Yes      | The ID of a document                                        |


Query params:

| Variable        | Required | Description                                                                                              |
|:----------------|:---------|:---------------------------------------------------------------------------------------------------------|
| searchText      | Yes      | The text to search                                                                                       |
| fromPage        | Yes      | The starting page number for the search. Index starting from 0                                           |
| toPage          | No       | The ending page number for the search. If this parameter is set to -1, the search will continue until the last page of the document. Default to -1 |
| caseSensitive   | No       | Determines if the search is case-sensitive                  |
| accentSensitive | No       | Determines if the search is accent-sensitive                |
| regex           | No       | Determines if the search text is a regular expression       |


Response :

| Type                    | Description                                                                |
|:------------------------|:---------------------------------------------------------------------------|
| MultiPagesSearchResult  | The search result containing the positions of the text within the document |

## Examples

### Search Page for Text Positions

The following example demonstrates how to search for the text "example" from page 2 to page 5 of the document with the ID b64_bm9yZS92SDMtMS0xMTh1735080237. 
The search is case-insensitive and accent-insensitive.

```bash
curl -X 'GET' \
'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/search?searchText=example&fromPage=2&toPage=5&caseSensitive=false&accentSensitive=false&regex=false' \
-H 'accept: application/json'
```
