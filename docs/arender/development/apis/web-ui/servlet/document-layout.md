---
title: Document layout
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 3161503a122bfb6e1212119649bef4a88964cc3cbd6a39fb3945dcf39d72e0df
---

A document layout describe the structure of a document.

A new servlet is deployed to display a Json file corresponding to the structure of a document.

## Request

This functionality is accessible via the servlet: **documentLayout**

Usable in GET

### Request example

```bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/documentLayout?uuid=doc1UUID'
```

## Servlet Response

The browser displays the document structure in Json language.

Here an example of a Json file:

```json

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
