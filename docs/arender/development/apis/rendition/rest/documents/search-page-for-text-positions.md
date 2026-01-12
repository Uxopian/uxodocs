---
title: GET Text Positions with Search on Page
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 87881c8fee3ad48d1af2c5ef510c2926739743eb9a2b50bb9993c4a4a76fd2e9
---

This API allows you to search for text positions within a specific page of a document.

## API Description

Endpoint:

```bash
GET /documents/{documentId}/pages/{page}/text
```

Resource path:

| Variable   | Required | Description                                                 |
| :--------- | :------- | :---------------------------------------------------------- |
| documentId | Yes      | The ID of a document                                        |
| page       | Yes      | The index of the page where you want to search for the text |

Query params:

| Variable        | Required | Description                                           |
| :-------------- | :------- | :---------------------------------------------------- |
| searchText      | Yes      | The text to search                                    |
| caseSensitive   | No       | Determines if the search is case-sensitive            |
| accentSensitive | No       | Determines if the search is accent-sensitive          |
| regex           | No       | Determines if the search text is a regular expression |

Response :

| Type             | Description                                                            |
| :--------------- | :--------------------------------------------------------------------- |
| PageSearchResult | The search result containing the positions of the text within the page |

## Examples

### Search Page for Text Positions

The following example demonstrates how to search for the text "example" within page 2 of the document with the ID b64_bm9yZS92SDMtMS0xMTh1735080237.
The search is case-insensitive and accent-insensitive.

```bash
curl -X 'GET' \
'http://localhost:8761/documents/b64_bm9yZS92SDMtMS0xMTh1735080237/pages/2/text?searchText=example&caseSensitive=false&accentSensitive=false&regex=false' \
-H 'accept: application/json'
```
