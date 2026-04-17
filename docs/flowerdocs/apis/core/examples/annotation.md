---
title: Handling annotations
sidebar_position: 7
description: Create, modify, delete your annotations
date: "2001-03-30T13:20:01+02:00"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: 7aec1e32d29546f0955c22ff55aebb5b0ad2e0683d56e886bc141a10a59618a1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `Annotation` service exhibits all the operations available around a document annotations.


# Annotations recovery

The examples below show how to retrieve annotations using the various operations of `get`.

## All annotations recovery

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>    FlowerDocs Core base URL
# <TOKEN>        authentication token
# <DOCUMENT_ID>  identifier of the document where are the annotations to retrieve
curl -X GET "<CORE_HOST>/rest/documents/<DOCUMENT_ID>/annotations" \
  -H "token: <TOKEN>"
```

  </TabItem>

  <TabItem value="java" label="JAVA">

```java
@Autowired
private AnnotationService service;

public List<Annotation> get() throws FunctionalException, TechnicalException
{
	Id documentId = new Id("documentId");
	return service.get(documentId);
}
```

  </TabItem>
</Tabs>

<!-- ## Rotations recovery

This functionnality is not implemented yet -->

# Annotation creation

## From a json

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>    FlowerDocs Core base URL
# <TOKEN>        authentication token
# <DOCUMENT_ID>  identifier of the document on which to create annotations
curl -X POST "<CORE_HOST>/rest/documents/<DOCUMENT_ID>/annotations" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[
    {
		"color": {
			"b": 0,
			"g": 0,
			"r": 0
		},
		"creationdate": "2025-08-25T12:21:18.497Z",
		"date": "2025-08-25T12:21:18.497Z",
		"document-id": {
			"id": "documentId"
		},
		"flags": {
			"hidden": false,
			"invisible": false,
			"locked": false,
			"norotate": false,
			"noview": false,
			"nozoom": false,
			"obfuscate": false,
			"print": false,
			"readonly": false,
			"togglenoview": false
		},
		"last-modifier": "string",
		"name": {
			"id": "string"
		},
		"opacity": 0,
		"page": 0,
		"rect": {
			"h": 0,
			"w": 0,
			"x": 0,
			"y": 0
		},
		"type": "com.arondor.viewer.annotation.api.CircleElemType",
		"title": "annotationTest"
    }
]'
```

  </TabItem>

  <TabItem value="java" label="JAVA">

```java
@Autowired
private AnnotationService service;

public void create() throws FunctionalException, TechnicalException
{
	Id documentId = new Id("documentId");

	List<Annotation> annotations = new ArrayList();
	Annotation annotation = new CircleElemType();
	annotation.setId(new AnnotationId(generateRandomString()));
	annotation.setDate(new Date());
	annotation.setSubject(generateRandomString());
	annotation.setDocumentId(new DocumentId("b64_xxx==/0/1"));
	AnnotationFlags flags = new AnnotationFlags();
	annotation.setFlags(flags);
	annotations.add(annotation);
	service.create(documentId, annotations);
}
```

  </TabItem>
</Tabs>

## From xml

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>    FlowerDocs Core base URL
# <TOKEN>        authentication token
# <DOCUMENT_ID>  identifier of the document on which to create annotations
curl -X POST "<CORE_HOST>/rest/documents/<DOCUMENT_ID>/annotations" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/xml" \
  -d '<?xml version="1.0" encoding="UTF-8"?>
<ns0:xfdf xmlns:ns0="http://ns.adobe.com/xfdf/"><ns0:annots>
<ns0:circle color="#EAF39C" flags="" name="cfdbee9c-dce1-4e62-bc10-55ab1554476b" page="0" rect="82.02787,218.50267,183.40193,337.67523" title="Unknown" creationdate="D:20221228084701+00'\''00'\''" opacity="0.7" fringe="0.0,0.0,0.0,0.0" interior-color="#EAF39C" width="0.0" style="solid" intensity=""/>
</ns0:annots>
</ns0:xfdf>'
```

  </TabItem>
</Tabs>

# Annotation modification

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>       FlowerDocs Core base URL
# <TOKEN>           authentication token
# <DOCUMENT_ID>     identifier of the document where are the annotations to update
# <ANNOTATION_IDS>  identifiers of annotations to update
curl -X POST "<CORE_HOST>/rest/documents/<DOCUMENT_ID>/annotations/<ANNOTATION_IDS>" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[
    {
		"color": {
			"b": 0,
			"g": 0,
			"r": 0
		},
		"creationdate": "2025-08-25T12:21:18.497Z",
		"date": "2025-08-25T12:21:18.497Z",
		"document-id": {
			"id": "documentId"
		},
		"flags": {
			"hidden": false,
			"invisible": false,
			"locked": false,
			"norotate": false,
			"noview": false,
			"nozoom": false,
			"obfuscate": false,
			"print": false,
			"readonly": false,
			"togglenoview": false
		},
		"last-modifier": "string",
		"name": {
			"id": "string"
		},
		"opacity": 0,
		"page": 0,
		"rect": {
			"h": 0,
			"w": 0,
			"x": 0,
			"y": 0
		},
		"type": "com.arondor.viewer.annotation.api.FreetextElemType.FreetextElemType",
		"title": "annotationTest"
    }
]'
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private AnnotationService service;

public void update() throws FunctionalException, TechnicalException
{
	Id documentId = new Id("documentId");
	List<Annotation> updates = new ArrayList();

	List<Annotation> fetchedAnnotations = annotationService.get(created.getId());
	Annotation annotToUpdate = fetchedAnnotations.get(0);
	annotToUpdate.setColor(new Color(21, 9, 98));
	updates.add(annotToUpdate):

	annotationService.update(documentId, updates);
}
```

  </TabItem>
</Tabs>


# Annotation deletion

The examples below show how to delete annotations.

## Part of annotations deletion

This operation allows to delete some of the annotations of a document

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>       FlowerDocs Core base URL
# <TOKEN>           authentication token
# <DOCUMENT_ID>     identifier of the document where are the annotations to delete
# <ANNOTATION_IDS>  identifiers of annotations to delete
curl -X DELETE "<CORE_HOST>/rest/documents/<DOCUMENT_ID>/annotations/<ANNOTATION_IDS>" \
  -H "token: <TOKEN>"
```

  </TabItem>

  <TabItem value="java" label="JAVA">

```java
@Autowired
private AnnotationService service;

public void delete() throws FunctionalException, TechnicalException
{
	Id documentId = new Id("documentId");

	List<Id> ids = Lists.newArrayList(new Id("annot1"));
	service.delete(documentId, ids);
}
```

  </TabItem>
</Tabs>

## All annotations deletion

This operation allows to delete all the annotations of a document.

<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>    FlowerDocs Core base URL
# <TOKEN>        authentication token
# <DOCUMENT_ID>  identifier of the document where are the annotations to delete
curl -X DELETE "<CORE_HOST>/rest/documents/<DOCUMENT_ID>/annotations/allAnnotations" \
  -H "token: <TOKEN>"
```

  </TabItem>

  <TabItem value="java" label="JAVA">

```java
@Autowired
private AnnotationService service;

public void delete() throws FunctionalException, TechnicalException
{
	Id documentId = new Id("documentId");
	service.delete(documentId);
}
```

  </TabItem>
</Tabs>
