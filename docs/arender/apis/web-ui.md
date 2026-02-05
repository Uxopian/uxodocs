---
title: "Web UI API"
sidebar_position: 1
last_update:
  date: '2026-02-05T15:05:05.898Z'
  author: CI/CD Bot
content_hash: c92bf21d443dbac026fc16d05c789b30fa3678c5184a78edc82b51fbb7a325b3
---

## Get the document UUID

To obtain a UUID that will be used to load your document, you must use the following GET call:

```cfg
{arender-web-ui_host}/arendergwt/openExternalDocument?url=https://arender.io/docs/demo/ARender-doc-demo.pdf
```

You get the UUID in response. The HTTP response must be 200 for a valid response.

Response example : 
``` cfg
b64_dXJsPWh0dHBzOi8vYXJlbmRlci5pby9kb2NzL2RlbW8vQVJlbmRlci1kb2MtZGVtby5wZGY=
```

To obtain an encrypted UUID, you need the following property :


```cfg title="WEB-INF/classes/arender-server-custom-vanilla.properties"
arender.documentid.generator.beanName=encryptedDocumentIdGenerator
```

Response example of encrypted UUID : 

``` cfg
bXX_IRwGhKdg4ij~wR~jcpA7NssSfEETwzMM338XuQBixdQbaJtFApJV5IPGEklglZXjDcDGQck1Rog_
```

## Generating an image

To generate a png image, use the following URL:

```cfg
{arender-web-ui_host}/arendergwt/imageServlet?uuid=[UUID]&pagePosition=0&desc=IM_1632_0
```

| Parameter    | Description                                                                                                                                        |
| ------------ |--------------------------------------------------------------------------------------------------------------------------------------------------- |
| uuid         | The document Id in ARender                                                                                                                         |
| pagePosition | The page number (starts at 0)                                                                                                                      |
| desc         | Starts with IM to inform that it is an image, then width of the image in pixel, then rotation in degree. Each parameter is always separated by *_* |

## Impression

To start printing from the browser, use the following URL:

```cfg
{arender-web-ui_host}/arendergwt/printServlet?uuid=[UUID]&desc=IM_1200_0&imagePrintStyle=width:800px;&pages=1-19,&asPDF=true
```

| Parameter       | Description                                                                                                                                                                                                                                      |
| --------------- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| uuid            | The document Id in ARender                                                                                                                                                                                                                       |
| desc            | Starts with IM to inform that it is an image, then width of the image in pixel, then rotation in degree. Each parameter is always separated by *_* . The parameter is ignored if the asPDF parameter is present with the value *true* or *false* |
| imagePrintStyle | Define the CSS style to add on each page of the document. The parameter is ignored if the asPDF parameter is present with the value *true* or *false*                                                                                            |
| pages           | Defines the range of pages that will be printed. The parameter is ignored if the asPDF parameter is present with the value *true* or *false*                                                                                                     |
| asPDF           | The printing will be based on the document in PDF, so the document will have the pages to the dimensions of the document.                                                                                                                        |


## Document layout

### Description

Get the document layout

### URL

```cfg
{ARender_web-ui_host}/arendergwt/documentLayout?uuid=[UUID]
```

### Request Method

- GET

### Parameters

| Parameter       | Description                 |
| --------------- |---------------------------- |
| uuid            | The document Id in ARender  |


### Return value

Data representing the layout in JSON format.

Example :

``` json
{
    "type":"com.arondor.viewer.client.api.document.DocumentPageLayout",
    "documentId":
    {
      "id":"b64_I2RlZmF1bHQ="
    },
    "documentTitle":"ARender.pdf",
    "mimeType":"application/pdf",
    "pageDimensionsList":
    [{
        "width":612,
        "height":792,
        "rotation":0,
        "dpi":72,
        "pageLayers":null
    },
    {
        "width":612,
        "height":792,
        "rotation":0,
        "dpi":72,
        "pageLayers":null
    }]
}
```

## Upload

### Description

- POST

Used when uploading the document.
Generates the provided document in cache.
Use Apache's *ServletFileUpload* package to upload documents.

- GET

Check if the document is cached.
Return status is 200 if cached, 404 otherwise.


### URL

```cfg
{ARender_web-ui_host}/arendergwt/uploadServlet?uuid=[UUID]
```

### Request Method

- GET
- POST

### Parameters

| Parameter       | Description                 |
| --------------- |---------------------------- |
| uuid            | The document Id in ARender  |


### Return value

The document Id in ARender.

## Download

### Description

Downloads the document represented by the ID given in parameter.


### URL

```cfg
{ARender_web-ui_host}/arendergwt/downloadServlet?uuid=[UUID]&sourceId=[SRCID]&title=[TITLE]
```

### Request Method

- GET

### Parameters

| Parameter       | Description                                                        |
| --------------- |------------------------------------------------------------------- |
| uuid            | The document Id in ARender.                                        |
| sourceId        | The document source Id. (Used when downloading with annotations)   |
| title           | The title of the uploaded document.                                |


### Return value

The content of the document.


## Download with compare

### Description

Compares two documents passed in parameter then downloads the document representing the difference of the documents.

### URL

```cfg
{ARender_web-ui_host}/arendergwt/downloadServlet/mergedWithCompareResult?left=[LEFT]&right[RIGHT]
```

### Request Method

- GET

### Parameters

| Parameter       | Description                               |
| --------------- |------------------------------------------ |
| left            | The id of the first document to compare.  |
| right           | The id of the second document to compare. |

### Return value

The content of the document representing the difference of the documents.

## XFDF Annotations

### Description

- GET

Retrieves document-related annotations in XFDF format.

- POST

Saves a given annotation file and associates it with the document.
Use Apache's *ServletFileUpload* package to upload documents.

### URL

```cfg
{ARender_web-ui_host}/arendergwt/servletXFDFAnnotations?uuid=[UUID]&type=[TYPE]
```

### Request Method

- GET
- POST

### Parameters

- GET

| Parameter       | Description                                                                                      |
| --------------- |------------------------------------------------------------------------------------------------- |
| uuid            | The document Id in ARender.                                                                      |
| type            | Set to 'fdf' to have a FDF format type. Empty or others values will set the format type to XFDF. |

- POST

| Parameter       | Description                 |
| --------------- |---------------------------- |
| uuid            | The document Id in ARender  |                                                                                                                                                                                                                      |

### Return value

The contents of the file representing the annotations.


## CSV Annotations

### Description

Retrieves document-related annotations in CSV format.

### URL

```cfg
{ARender_web-ui_host}/arendergwt/servletCSVAnnotations?uuid=[UUID]
```

### Request Method

- GET

### Parameters

| Parameter       | Description                 |
| --------------- |---------------------------- |
| uuid            | The document Id in ARender  |                                                                                                                                                                                                                  |

### Return value

The contents of the file representing the annotations.

## Weather

### Description

Retrieves and displays reachability test information for addresses matching the renditions services (like the broker).
Default address: http://localhost:8761/
The -1 return code means an address reachability failure.

The different addresses in the body of the request are separated by commas ','.

### URL

```cfg
{ARender_web-ui_host}/arendergwt/weather?format=[FORM]
```

### Request Method

- GET

### Parameters

| Parameter       | Description                                  |
| --------------- |--------------------------------------------- |
| format          | The type of format desired (by default html) |

### Return value

The list of tested addresses.
-1.0 if address unreachable.

## Health record

Retrieves and displays the accessibility information of the micro services associated with the target addresses to be tested.
These target addresses can be defined by the previous call to the weather via the PUT and POST methods.
Accessibility information for micro services and their associated services is displayed.
Information statuses are represented by these possible values: UP, COMPLETE, NONE, PARTIAL.

### Description

### URL

```cfg
{ARender_web-ui_host}/arendergwt/health/records
```

### Request Method

- GET

### Parameters


| Parameter       | Description                                                                                                                                    |
| --------------- |----------------------------------------------------------------------------------------------------------------------------------------------- |
| check           | Two possible values "self" and "rendition", the first allows to have a return status to 200 regardless of the number of effective services.    |


### Return value

Accessibility information for micro services and their associated services is displayed.
Return status is 200 if at least one service is available, 503 otherwise.

## Download with annotations

Downloads the current document with its annotations.

### Description

### URL

```cfg
{ARender_web-ui_host}/arendergwt/downloadDocumentWithAnnotations
```

### Request Method

- GET

### Parameters


| Parameter       | Description                                                                                                                                               |
| --------------- |---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| operationName   | Type d'annotations voulu, 'renderAnnotations' pour les annotations ARender par défaut, 'renderFDFAnnotations' pour obtenir les annotations au format FDF. |


### Return value

The contents of the document as well as its annotations.

## Download base 64 encoded

### Description

Downloads the current document encoded in base 64.

### URL

```cfg
{ARender_web-ui_host}/arendergwt/downloadBase64EncodedDocument
```

### Request Method

- GET

### Parameters

No parameters.

### Return value

The contents of the base 64 encoded file.

## Evict

### Description

Evicts the document from the ARender cache.

### URL

```cfg
{ARender_web-ui_host}/arendergwt/evictDocument?uuid=[UUID]
```

### Request Method

- GET

### Parameters

| Parameter       | Description                 |
| --------------- |---------------------------- |
| uuid            | The document Id in ARender  |                                                                                                                                                                                                                    |


### Return value

No Return value.