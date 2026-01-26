---
title: Handling annotations
description: "Create, modify, delete your annotations"
sidebar_position: 7
date: "2001-03-30T13:20:01+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: 32b88fada4a3aa27f7c9aef2fd5afbd49366b4f9e8646619d95c1bfb1d9db021
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `Annotation` service exhibits all the operations available around a document annotations.

# Annotations recovery

The examples below show how to retrieve annotations using the various operations of `get`.

## All annotations recovery

<Tabs>
  <TabItem value="rest" label="REST">

```http
GET {{core}}/rest/documents/{documentId}/annotations HTTP/1.1

-- URL parameters --
core: FlowerDocs core host
documentId: identifier of the document where are the annotations to retrieve

-- Headers --
token: {{token}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private AnnotationService service;

public List<Annotation> get() throws FunctionalException, TechnicalException

	Id documentId = new Id("documentId");
	return service.get(documentId);

```

  </TabItem>
</Tabs>

<!-- ## Rotations recovery

This functionnality is not implemented yet -->

# Annotation creation

## From a json

<Tabs>
  <TabItem value="rest" label="REST">

```http
POST {{core}}/rest/documents/{documentId}/annotations HTTP/1.1

-- URL parameters --
core: FlowerDocs core host
documentId: identifier of the document on which to create annotations

-- Headers --
token: {{token}}
Content-Type: application/json

-- Body (json) --
[

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

]
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private AnnotationService service;

public void create() throws FunctionalException, TechnicalException

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

```

  </TabItem>
</Tabs>

## From xml

# Annotation modification

<Tabs>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private AnnotationService service;

public void update() throws FunctionalException, TechnicalException

	Id documentId = new Id("documentId");
	List<Annotation> updates = new ArrayList();

	List<Annotation> fetchedAnnotations = annotationService.get(created.getId());
	Annotation annotToUpdate = fetchedAnnotations.get(0);
	annotToUpdate.setColor(new Color(21, 9, 98));
	updates.add(annotToUpdate):

	annotationService.update(documentId, updates);

```

  </TabItem>
</Tabs>

# Annotation deletion

The examples below show how to delete annotations.

## Part of annotations deletion

This operation allows to delete some of the annotations of a document

<Tabs>
  <TabItem value="rest" label="REST">

```http
DELETE {{core}}/rest/documents/{documentId}/annotations/{annotationIds} HTTP/1.1

-- URL parameters --
core: FlowerDocs core host
documentId: identifier of the document where are the annotations to delete
annotationIds: identifiers of annotations to delete

-- Header --
token: {{token}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private AnnotationService service;

public void delete() throws FunctionalException, TechnicalException

	Id documentId = new Id("documentId");

	List<Id> ids = Lists.newArrayList(new Id("annot1"));
	service.delete(documentId, ids);

```

  </TabItem>
</Tabs>

## All annotations deletion

This operation allows to delete all the annotations of a document.

<Tabs>
  <TabItem value="rest" label="REST">

```http
DELETE {{core}}/rest/documents/{documentId}/annotations/allAnnotations HTTP/1.1

-- URL parameters --
core: FlowerDocs core host
documentId: identifier of the document where are the annotations to delete

-- Headers --
token: {{token}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private AnnotationService service;

public void delete() throws FunctionalException, TechnicalException

	Id documentId = new Id("documentId");
	service.delete(documentId);

```

  </TabItem>
</Tabs>
