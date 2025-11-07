---
title: "Complete example to add redact annotations"
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
&#123;"searchResults":[&#123;"positionText":&#123;"pageNumber":0,"position":&#123;"x":42.52,"y":245.07303,"w":55.264004,"h":12.0&#125;,"text":"Test Business","individualWidths":[5.3768005,4.8927994,4.4000015,2.4463997,2.4463997,5.869602,4.8927994,4.4000015,1.953598,4.8927994,4.8927994,4.4000015,4.4000015],"fontSize":8.0,"font":"JQRQXM+Helvetica","clickableDestination":null,"paragraphId":3,"rightToLeftText":false,"startTime":-1.0,"rotation":0&#125;,"textRangeList":[&#123;"firstCharacter":0,"lastCharacter":12&#125;]&#125;]&#125;
```

###  Create the redact annotation

Now, we know that the position of the text corresponds to:

```json
&#123;"x":42.52,"y":245.07303,"w":55.264004,"h":12.0&#125;
```

Let's apply these coordinates to the annotation creation template:

```bash
curl -X 'POST' \
  'http://localhost:8761/transformations' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "annotations": &#123;
    "annotations": [

        "type": "com.arondor.viewer.annotation.api.RedactTextElemType",
        "documentId": &#123;
          "id": "b64_bXlkb2N1ZW1udA=="
        &#125;,
        "page": 0,
        "id": &#123;
          "id": "non-null-value"
        &#125;,
        "coords": [

            "x": 42.52,
            "y": 245.07303,
            "w": 55.264004,
            "h": 12.0

        ],
        "color": &#123;
          "r": 0,
          "g": 0,
          "b": 0


    ]
  &#125;,
  "format": "pdf",
  "transformationDetails": [

      "transformationElements": [

          "documentId": "b64_bXlkb2N1ZW1udA==",
          "pagesSelectionList": [

              "maxPage": 1,
              "minPage": 1

          ]

      ],
	  "documentTitle": "MyDocument"

  ]
&#125;'
```

The result gives the id of the transformation:

```json
&#123;"transformationOrderId":&#123;"id":"7325e176-400c-460b-b51e-a8026b78c62a"&#125;&#125;
```

###  Retrieve information from the transformation

Let's retrieve the document id via the previously requested transformation 
order: *7325e176-400c-460b-b51e-a8026b78c62a*

```bash
curl -X 'GET' \
  'http://localhost:8761/transformations/7325e176-400c-460b-b51e-a8026b78c62a' \
  -H 'accept: */*'
```

Result: here we retrieve the transformationResultDocumentID corresponding to 
b64_NGZlMWJlMTktNGYyNS00MjAzLWI1ZGQtNGNiYTkxMmI0OGIx

```json
{"transformationOrderId":{"id":"71266b11-2016-4bb6-bcd8-562cf6ca6760"},"transformationDetails":[{"transformationElements":[{"documentId":{"id":"b64_bXlkb2N1ZW1udA=="},"documentTitle":null,"pagesSelectionList":[{"minPage":1,"maxPage":1}]}],"documentTitle":"test123"}],"currentState":"PROCESSED","transformationResultDocumentID":&#123;"id":"b64_NGZlMWJlMTktNGYyNS00MjAzLWI1ZGQtNGNiYTkxMmI0OGIx"&#125;,"annotations":&#123;"annotations":[&#123;"type":"com.arondor.viewer.annotation.api.SquareElemType","color":null,"date":null,"flags":null,"id":null,"documentId":&#123;"id":"b64_bXlkb2N1ZW1udA=="&#125;,"lastModifier":null,"page":0,"position":&#123;"x":42.52,"y":245.07303,"w":55.264004,"h":12.0&#125;,"creator":null,"creationDate":null,"opacity":null,"subject":null,"security":null,"startTime":-1.0,"endTime":-1.0,"contentsRichtext":null,"contents":null,"popup":null,"fringe":null,"interiorColor":&#123;"r":0,"g":0,"b":0&#125;,"width":null,"dashes":null,"style":null,"intensity":null&#125;]&#125;,"format":"pdf","errorMessage":null,"queuedDate":"2024-08-07T14:28:51.188+02:00","processedDate":"2024-08-07T14:28:51.237+02:00","queuedTime":3,"processingTime":45}
```


### Download the document from its ID

Now that we have the document id 
*b64_NGZlMWJlMTktNGYyNS00MjAzLWI1ZGQtNGNiYTkxMmI0OGIx* we can download it:

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
*&#123;"x":35.0,"y":25.0,"w":160.0,"h":25.0&#125;* the call is:

```bash
curl -X 'POST' \
  'http://localhost:8761/transformations' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "annotations": &#123;
    "annotations": [

        "type": "com.arondor.viewer.annotation.api.RedactElemType",
        "documentId": &#123;
          "id": "b64_bXlkb2N1ZW1udA=="
        &#125;,
        "page": 0,
        "id": &#123;
          "id": "non-null-value"
        &#125;,
        "position": &#123;
          "x": 35.0,
          "y": 25.0,
          "w": 160.0,
          "h": 25.0
        &#125;,
        "interiorColor": &#123;
          "r": 0,
          "g": 0,
          "b": 0


    ]
  &#125;,
  "format": "pdf",
  "transformationDetails": [

      "transformationElements": [

          "documentId": "b64_bXlkb2N1ZW1udA==",
          "pagesSelectionList": [

              "maxPage": 1,
              "minPage": 1

          ]

      ],
	  "documentTitle": "MyDocument"

  ]
&#125;'
```

### Create a redact annotation based on a rule

We can create the annotations based on rules.
As example: be able to redact all amounts in a document.
This regex is then used:  (\$[0-9]+(.[0-9]+)?)

We first need to use the URL encoding to the given regex to get: 
*%28%5C%24%5B0-9%5D%2B%28.%5B0-9%5D%2B%29%3F%29*

```bash
curl -X 'GET' \
  'http://localhost:8761/documents/b64_bXlkb2N1ZW1udA==/pages/0/text?searchText=%28%5C%24%5B0-9%5D%2B%28.%5B0-9%5D%2B%29%3F%29&caseSensitive=false&accentSensitive=false&regex=true' \
   -H 'accept: */*'
```

The result tells us all the positions of the matching text, now we can use the 
annotation creation template, as seen previously, to create the desired
annotations.