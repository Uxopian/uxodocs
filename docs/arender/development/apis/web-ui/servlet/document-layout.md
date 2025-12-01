---
title: Document layout
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: e00c710fe9430190c64547d9cf8dc4b7179dd14082e47fd020f9cad52412e38c
---







A document layout describe the structure of a document.

A new servlet is deployed to display a Json file corresponding to the structure of a document.

## Request 

This functionality is accessible via the servlet: **documentLayout**

Usable in GET


### Request example

``` bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/documentLayout?uuid=doc1UUID'
```

## Servlet Response

The browser displays the document structure in Json language.

Here an example of a Json file: 

``` json

    "type": "com.arondor.viewer.client.api.document.DocumentPageLayout",
    "documentId": {
        "id": "doc1UUID"
    },
    "documentTitle": "title.pdf",
    "mimeType": "application/pdf",
    "pageDimensionsList": [

            "width": 720.0,
            "height": 405.0,
            "rotation": 0,
            "dpi": 0,
            "pageLayers": null
        },

            "width": 720.0,
            "height": 405.0,
            "rotation": 0,
            "dpi": 0,
            "pageLayers": null
        },

            "width": 720.0,
            "height": 405.0,
            "rotation": 0,
            "dpi": 0,
            "pageLayers": null
        },
    ]

```
