---
title: POST a transformation order
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 1b9c56cc2eb9cbedc1281efe51852dba188f3feeedbda90ad4187a1870a389a5
---

This API allows you to request a transformation order to create a new document in an expected format and according to transformation criteria.

## API technical description

Endpoint :

```bash
POST /transformations
```

Body :

| Attribute             | Type                              | Required | Description                                                       |
| :-------------------- | :-------------------------------- | :------- | :---------------------------------------------------------------- |
| format                | String                            | yes      | Target document format                                            |
| transformationDetails | List&lt;TransformationDetails&gt; | yes      | The list of transformation details                                |
| annotations           | Annotations                       | no       | Annotations correctly built according to the referenced documents |

Response :

| Attribute             | Type                  | Description                                                                                                                                                 |
| :-------------------- | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transformationOrderId | TransformationOrderId | Transformation order ID.<br/>This will can permit you to use other APIs like the one to retrieve some information about the transformation or to delete it. |

## Examples

### Build a new document

The call below generates a build request from two documents already known from the rendition.
The output document will be a PDF containing pages 1 to 4 of document _docId1_ then page 1 of the same document and finally page 1 of document _docId2_.

```bash
curl -X 'POST' \
  'http://localhost:8761/transformations' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '&#123;
  "annotations": null,
  "format": "pdf",
  "transformationDetails": [

      "transformationElements": [

          "documentId": "docId1",
          "pagesSelectionList": [

              "maxPage": 4,
              "minPage": 1
            &#125;,

              "maxPage": 1,
              "minPage": 1

          ]
        },

          "documentId": "docId2",
          "pagesSelectionList": [

              "maxPage": 1,
              "minPage": 1

          ]

      ]

  ]
}'
```

### Build multiple new documents

The call below generates a build request from two documents already known from the rendition.
Two documents will be generated : one PDF containing the page 1 of document _docId1_ and one PDF containing only the page 1 of the document _docId2_.

```bash
curl -X 'POST' \
  'http://localhost:8761/transformations' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '&#123;
  "annotations": null,
  "format": "pdf",
  "transformationDetails": [

      "transformationElements": [

          "documentId": "docId1",
          "pagesSelectionList": [

              "maxPage": 1,
              "minPage": 1

          ]

      ]
    &#125;,

      "transformationElements": [

          "documentId": "docId2",
          "pagesSelectionList": [

              "maxPage": 1,
              "minPage": 1

          ]

      ]

  ]
}'
```

### Burn annotations in a document

The call below uses the same build request as in the previous example, but adds the following annotations:

- A "Square" type annotation from page 1 of document docId1
- A "Freetext" type annotation from page 1 of the document docId2
- A "Text" type annotation from page 1 of the document docId1
- A "Line" type annotation from page 1 of the document docId2

The output document will be similar to the output of the previous example and will also contain the burnt annotations mentioned above.

```bash
curl -X 'POST' \
  'http://localhost:8761/transformations' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "annotations": {
    "annotations": [

        "type": "com.arondor.viewer.annotation.api.SquareElemType",
        "documentId": {
          "id": "docId1"
        },
        "page": 0,
        "position": {
          "x": 10.0,
          "y": 10.0,
          "w": 100.0,
          "h": 100.0
        },
        "interiorColor": {
          "r": 0,
          "g": 255,
          "b": 0

      },

        "type": "com.arondor.viewer.annotation.api.FreetextElemType",
        "color": {
          "r": 0,
          "g": 255,
          "b": 255
        },
        "documentId": {
          "id": "docId2"
        },
        "page": 0,
        "position": {
          "x": 110.0,
          "y": 110.0,
          "w": 100.0,
          "h": 20.0
        },
        "opacity": 0.7,
        "contentsRichtext": {
          "type": "com.arondor.viewer.annotation.api.RichtextElemType",
          "value": "<html xmlns=\"http://www.w3.org/1999/xhtml\"><body><span style=\"font-size:16px\">This is a freetext</span></body></html>"
        },
        "contents": "This is a freetext",
        "width": 2.0,
        "defaultappearance": "0 R 1 0 0"
      },

        "type": "com.arondor.viewer.annotation.api.TextElemType",
        "color": {
          "r": 250,
          "g": 250,
          "b": 0
        },
        "documentId": {
          "id": "docId1"
        },
        "page": 0,
        "position": {
          "x": 350.0,
          "y": 200.0,
          "w": 160.0,
          "h": 50.0
        },
        "creator": "Creator Name",
        "creationDate": 1667828859995,
        "opacity": 1.0,
        "contentsRichtext": {
          "type": "com.arondor.viewer.annotation.api.RichtextElemType",
          "value": "<html xmlns=\"http://www.w3.org/1999/xhtml\">\n<body><font face=\"Helvetica\" size=\"2\">This a sticky note</font></body></html>"
        },
        "contents": "This a sticky note",
        "icon": "Note"
      },

        "type": "com.arondor.viewer.annotation.api.LineElemType",
        "color": &#123;
          "r": 100,
          "g": 100,
          "b": 100
        &#125;,
        "documentId": &#123;
          "id": "docId2"
        &#125;,
        "page": 0,
        "position": &#123;
          "x": 350.0,
          "y": 300.0,
          "w": 150.0,
          "h": 50.0
        &#125;,
        "contentsRichtext": &#123;
          "type": "com.arondor.viewer.annotation.api.RichtextElemType",
          "value": "<html xmlns=\"http://www.w3.org/1999/xhtml\"><body><p class=\"arrowDistance\">1.84in</p></body></html>"
        &#125;,
        "start": &#123;
          "x": 350.0,
          "y": 300.0
        &#125;,
        "end": &#123;
          "x": 450.0,
          "y": 350.0
        &#125;,
        "head": "OPEN_ARROW",
        "tail": "NONE",
        "width": 2.0

    ]
  },
  "format": "pdf",
  "transformationDetails": [

      "transformationElements": [

          "documentId": "docId1",
          "pagesSelectionList": [

              "maxPage": 4,
              "minPage": 1
            },

              "maxPage": 1,
              "minPage": 1

          ]
        },

          "documentId": "docId2",
          "pagesSelectionList": [

              "maxPage": 1,
              "minPage": 1

          ]

      ]

  ]
}'
```

### Add FDF annotations in a document

The call below generates a request to add a "Square" type annotation on the document _docId_.
The output document will be a PDF containing an FDF annotation.

```bash
curl -X 'POST' \
  'http://localhost:8761/transformations' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "annotations": {
    "annotations": [

        "type": "com.arondor.viewer.annotation.api.SquareElemType",
        "id": "21ea93fe-ca56-4b25-9a6b-e8091d45fd35",
        "creationDate": 1667828859995,
        "flags" : {
        },
        "documentId": &#123;
          "id": "docId"
        &#125;,
        "page": 0,
        "position": &#123;
          "x": 10.0,
          "y": 10.0,
          "w": 100.0,
          "h": 100.0
        &#125;,
        "interiorColor": &#123;
          "r": 0,
          "g": 255,
          "b": 0
        &#125;,
        "opacity": 0.5,
        "height": 90.0,
        "width": 180.0

    ]
  },
  "format": "pdf-fdf",
  "transformationDetails": [

      "transformationElements": [

          "documentId": "docId"

      ]

  ]
}'
```

### Merge several documents into one PDF

The call below generates a document merge request.
The output document will be a PDF containing the pages of document _docId1_ then those of document _docId2_.

```bash
curl -X 'POST' \
  'http://localhost:8761/transformations' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '&#123;
  "annotations": null,
  "format": "pdf",
  "transformationDetails": [

      "transformationElements": [

          "documentId": "docId1"
        &#125;,

          "documentId": "docId2"

      ]

  ]
}'
```

### Archive documents

The call below generates a document merge request.
The output document will be an archive (zip) containing the document _docId1_ which will be named _documentTitle1_ and
the document _docId2_ which will be named _documentTitle2_.

```bash
curl -X 'POST' \
  'http://localhost:8761/transformations' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "annotations": null,
  "format": "zip",
  "transformationDetails": [

      "transformationElements": [

          "documentId": "docId1",
          "documentTitle": "documentTitle1"
        },

          "documentId": "docId2",
          "documentTitle": "documentTitle2"

      ]

  ]
}'
```
