---
title: "Rendition API"
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: f6122944b9f678618268e38792e50fa2f1b3f7ca40fbfe6821cfb8f2044c7a46
---

## Complete list of the REST API calls

ARender rendition provides the list of available REST calls. This is provided with the Swagger which allows REST calls to be tested and gives the indications necessary for the proper execution of the call. The URL is:

```cfg
{ARender_rendition_host}/swagger-ui.html
```

See the following for more detailed examples.

## Checking the existence of a document

The verification of the existence of a document is done by the following url in GET call:

```cfg
GET {ARender_rendition_host}/document/?documentId=my-custom-document-id
```

The request returns a boolean response. True if the document exists, false otherwise. The HTTP response must be 200 for a valid response.

## Loading a document

To load a document in the rendition you will have to use the following POST call:

```cfg
POST {ARender_rendition_host}/document/accessor/upload/multipart/?documentId=my-custom-document-id&documentTitle=arender-en.pdf
```

Among the *Headers* of the request you will have to add:

| Key          | Value               |
| ------------ | ------------------- |
| Content-Type | multipart/form-data |
| Accept       | application/xml     |

Then the file to load in the rendition must be provided in the *Body* of the request. The HTTP response must be 200 for a valid response.

## Document layout retrieval

To retrieve the document layout, send a GET request with the documentId as request param :


```cfg
GET {ARender_rendition_host}/document/layout/?documentId=my-custom-document-id
```

If the document is loaded then you will get the complete document layout of the document. The HTTP response must be 200 for a valid response.


```cfg title="Example of response with a 2 page document"
{
  "type": "com.arondor.viewer.client.api.document.DocumentPageLayout",
  "documentId": {
    "id": "b64_bG9jYWxlPWVuJnJhbmRvbVVVSUQ9NDcwZDIzNjMtZDNiOS00MGEzLWE0MTEtMjBjMDI3OWExZDk1"
  },
  "documentTitle": "Baujagd.pdf",
  "mimeType": "application/pdf",
  "pageDimensionsList": [
    {
      "width": 720,
      "height": 540,
      "rotation": 0,
      "dpi": 72,
      "pageLayers": null
    },
    {
      "width": 720,
      "height": 540,
      "rotation": 0,
      "dpi": 72,
      "pageLayers": null
    }
  ]
}
```


## Retrieve source or its converted version

You can retrieve the source, or the converted versions of a document using the following request in GET call:

```cfg
GET {ARender_rendition_host}/accessor/getContent/raw/{documentId}/{selector}
```

Please see below the details for the {selector} values:

| Value      | Description                                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------------------- |
| INITIAL    | The source document                                                                                           |
| RENDERED   | The converted document (conversion to **PDF** for non-multimedia documents, **MP4** for multimedia documents) |

The request will send the document in response. The HTTP response must be 200 for a valid response.

## Generating an image

To generate an image of a loaded document, you will need to use the following url in GET call:

```cfg
GET {ARender_rendition_host}/document/image/?description=IM_1800_0&documentId=my-documentID&page=1&width=1800
```

| Parameter   | Description                                                                                                                                                                                                                        |
| ----------- |----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| documentId  | The document Id in ARender                                                                                                                                                                                                         |
| page        | The page number (starts at 0)                                                                                                                                                                                                      |
| description | Start with IM to inform that it is an image, then width of the image in pixels, then the rotation in degrees then SVG if you wish to have the image in SVG, otherwise it will be in PNG. Each parameter is always separated by *_* |
| width       | The width of the image in pixels                                                                                                                                                                                                   |

The request will send the requested image in response. The HTTP response must be 200 for a valid response.