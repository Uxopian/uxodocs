---
title: Complete example to add redact annotations
last_update:
  date: '2026-03-12T20:43:52.809Z'
  author: CI/CD Bot
content_hash: b5ac57e9c49fc423995912e36d983a49040b40c64f72edd18d706af7ceefa69f
---

In this page we will detail how to create redact annotations from the document
transformations REST API.

## Redact annotation on a given text

Here, we will use the text "Test business" as an example.
To redact a specific text in the document, we first need to retrieve the
position related to.

### Retrieving the position of a text

To retrieve the position of the text, the searchText endpoint is used.

```bash
curl -X 'GET' \
 'http://localhost:8761/documents/b64_bXlkb2N1ZW1udA==/pages/0/text?searchText=Test%20business&caseSensitive=false&accentSensitive=false&regex=false' \
  -H 'accept: */*'
```

We are working here on the first page of the document b64_bXlkb2N1ZW1udA==

The result tells us the position of the desired text:

```json
{
  "searchResults": [
    {
      "positionText": {
        "pageNumber": 0,
        "position": {
          "x": 42.52,
          "y": 245.07303,
          "w": 55.264004,
          "h": 12.0
        },
        "text": "Test Business",
        "individualWidths": [
          5.3768005,
          4.8927994,
          4.4000015,
          2.4463997,
          2.4463997,
          5.869602,
          4.8927994,
          4.4000015,
          1.953598,
          4.8927994,
          4.8927994,
          4.4000015,
          4.4000015
        ],
        "fontSize": 8.0,
        "font": "JQRQXM+Helvetica",
        "clickableDestination": null,
        "paragraphId": 3,
        "rightToLeftText": false,
        "startTime": -1.0,
        "rotation": 0
      },
      "textRangeList": [
        {
          "firstCharacter": 0,
          "lastCharacter": 12
        }
      ]
    }
  ]
}
```

### Create the redact annotation

Now, we know that the position of the text corresponds to:

```json
{
  "x": 42.52,
  "y": 245.07303,
  "w": 55.264004,
  "h": 12.0
}
```

Let's apply these coordinates to the annotation creation template:

```bash
curl -X 'POST' \
  'http://localhost:8761/transformations' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "annotations": {
    "annotations": [
      {
        "type": "com.arondor.viewer.annotation.api.RedactTextElemType",
        "documentId": {
          "id": "b64_bXlkb2N1ZW1udA=="
        },
        "page": 0,
        "id": {
          "id": "non-null-value"
        },
        "coords": [
          {
            "x": 42.52,
            "y": 245.07303,
            "w": 55.264004,
            "h": 12.0
          }
        ],
        "color": {
          "r": 0,
          "g": 0,
          "b": 0
        }
      }
    ]
  },
  "format": "pdf",
  "transformationDetails": [
    {
      "transformationElements": [
        {
          "documentId": "b64_bXlkb2N1ZW1udA==",
          "pagesSelectionList": [
            {
              "maxPage": 1,
              "minPage": 1
            }
          ]
        }
      ],
      "documentTitle": "MyDocument"
    }
  ]
}'
```

The result gives the id of the transformation:

```json
{
  "transformationOrderId": {
    "id": "7325e176-400c-460b-b51e-a8026b78c62a"
  }
}
```

### Retrieve information from the transformation

Let's retrieve the document id via the previously requested transformation
order: _7325e176-400c-460b-b51e-a8026b78c62a_

```bash
curl -X 'GET' \
  'http://localhost:8761/transformations/7325e176-400c-460b-b51e-a8026b78c62a' \
  -H 'accept: */*'
```

Result: here we retrieve the transformationResultDocumentID corresponding to
b64_NGZlMWJlMTktNGYyNS00MjAzLWI1ZGQtNGNiYTkxMmI0OGIx

```json
{
  "transformationOrderId": {
    "id": "71266b11-2016-4bb6-bcd8-562cf6ca6760"
  },
  "transformationDetails": [
    {
      "transformationElements": [
        {
          "documentId": {
            "id": "b64_bXlkb2N1ZW1udA=="
          },
          "documentTitle": null,
          "pagesSelectionList": [
            {
              "minPage": 1,
              "maxPage": 1
            }
          ]
        }
      ],
      "documentTitle": "test123"
    }
  ],
  "currentState": "PROCESSED",
  "transformationResultDocumentID": {
    "id": "b64_NGZlMWJlMTktNGYyNS00MjAzLWI1ZGQtNGNiYTkxMmI0OGIx"
  },
  "annotations": {
    "annotations": [
      {
        "type": "com.arondor.viewer.annotation.api.SquareElemType",
        "color": null,
        "date": null,
        "flags": null,
        "id": null,
        "documentId": {
          "id": "b64_bXlkb2N1ZW1udA=="
        },
        "lastModifier": null,
        "page": 0,
        "position": {
          "x": 42.52,
          "y": 245.07303,
          "w": 55.264004,
          "h": 12.0
        },
        "creator": null,
        "creationDate": null,
        "opacity": null,
        "subject": null,
        "security": null,
        "startTime": -1.0,
        "endTime": -1.0,
        "contentsRichtext": null,
        "contents": null,
        "popup": null,
        "fringe": null,
        "interiorColor": {
          "r": 0,
          "g": 0,
          "b": 0
        },
        "width": null,
        "dashes": null,
        "style": null,
        "intensity": null
      }
    ]
  },
  "format": "pdf",
  "errorMessage": null,
  "queuedDate": "2024-08-07T14:28:51.188+02:00",
  "processedDate": "2024-08-07T14:28:51.237+02:00",
  "queuedTime": 3,
  "processingTime": 45
}
```

### Download the document from its ID

Now that we have the document id
_b64_NGZlMWJlMTktNGYyNS00MjAzLWI1ZGQtNGNiYTkxMmI0OGIx_ we can download it:

```bash
curl -X GET \
  'http://localhost:8761/documents/b64_NGZlMWJlMTktNGYyNS00MjAzLWI1ZGQtNGNiYTkxMmI0OGIx/file?format=pdf' \
  -o my_pdf.pdf
```

This downloaded document has the desired redacted annotation.

## Other way to create redact annotations

### Create a redact annotation in the defined zone

The annotation creation template can directly be used to create a annotation in
a zone. To create an annotation at the positions
_&#123;"x":35.0,"y":25.0,"w":160.0,"h":25.0&#125;_ the call is:

```bash
curl -X 'POST' \
  'http://localhost:8761/transformations' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "annotations": {
    "annotations": [
      {
        "type": "com.arondor.viewer.annotation.api.RedactElemType",
        "documentId": {
          "id": "b64_bXlkb2N1ZW1udA=="
        },
        "page": 0,
        "id": {
          "id": "non-null-value"
        },
        "position": {
          "x": 35.0,
          "y": 25.0,
          "w": 160.0,
          "h": 25.0
        },
        "interiorColor": {
          "r": 0,
          "g": 0,
          "b": 0
        }
      }
    ]
  },
  "format": "pdf",
  "transformationDetails": [
    {
      "transformationElements": [
        {
          "documentId": "b64_bXlkb2N1ZW1udA==",
          "pagesSelectionList": [
            {
              "maxPage": 1,
              "minPage": 1
            }
          ]
        }
      ],
      "documentTitle": "MyDocument"
    }
  ]
}'
```

### Create a redact annotation based on a rule

We can create the annotations based on rules.
As example: be able to redact all amounts in a document.
This regex is then used: (\$[0-9]+(.[0-9]+)?)

We first need to use the URL encoding to the given regex to get:
_%28%5C%24%5B0-9%5D%2B%28.%5B0-9%5D%2B%29%3F%29_

```bash
curl -X 'GET' \
  'http://localhost:8761/documents/b64_bXlkb2N1ZW1udA==/pages/0/text?searchText=%28%5C%24%5B0-9%5D%2B%28.%5B0-9%5D%2B%29%3F%29&caseSensitive=false&accentSensitive=false&regex=true' \
   -H 'accept: */*'
```

The result tells us all the positions of the matching text, now we can use the
annotation creation template, as seen previously, to create the desired
annotations.
