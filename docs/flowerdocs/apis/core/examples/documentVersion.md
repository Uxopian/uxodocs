---
title: Handling document versions
description: "Create, restore, delete document versions"
sidebar_position: 8
date: "2001-03-30T13:20:02+02:00"
last_update:
  date: '2026-01-26T14:16:25.927Z'
  author: CI/CD Bot
content_hash: 08c4129136b4c91d90425187530bf82ae36587ae83b14057b61471ecbf791694
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `VersionService` service displays the following operations:

- `promote`: to create a version of a document
- `getVersions`: to retrieve document versions
- `revert`: to restore a version of a document
- `deleteVersion`: to delete a version of a document
- `deleteVersions`: to delete all versions of a document

# Creating a version

The example below shows how to create a version of a document.
<br/>
<Tabs>
<TabItem value="rest" label="REST">

```http
POST {{core}}/rest/documents/{documentId}/versions HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host
documentId: document identifier

-- Headers --
token: {{token}}
Content-Type: application/json

-- Body(raw) --
label: version name
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private VersionService<Document> versionService;

public Document promote() throws TechnicalException, FunctionalException

	Id id = new Id("documentId");
	String label = "Version_1";
	return versionService.promote(id, label);

```

  </TabItem>
</Tabs>

# Versions recovery

The example below shows how to recover versions of a document.
<br/>
<Tabs>
<TabItem value="rest" label="REST">

```http
GET {{core}}/rest/documents/{documentId}/versions HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host
documentId: document identifier

-- Headers --
token: {{token}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private VersionService<Document> versionService;

public VersionSeries getVersions() throws TechnicalException, FunctionalException

	Id id = new Id("documentId");
	return versionService.getVersions(id);

```

  </TabItem>
</Tabs>

# Restoring a version

The example below shows how to restore a version of a document.
<br/>
<Tabs>
<TabItem value="rest" label="REST">

```http
POST {{core}}/rest/documents/{documentId}/versions/{versionId}/revert HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host
documentId: document identifier
versionId: document version identifier

-- Headers --
token: {{token}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private VersionService<Document> versionService;

public Document revert() throws TechnicalException, FunctionalException

	Id documentId = new Id("documentId");
	Id versionId = new Id("versionId");
	id versionId = new Id("versionId");

```

  </TabItem>
</Tabs>

# Version deletion

## Deleting a version

The example below shows how to delete a version of a document.
<br/>
<Tabs>
<TabItem value="rest" label="REST">

```http
DELETE {{core}}/rest/documents/{documentId}/versions/{versionId} HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host
documentId: document identifier
versionId: document version identifier

-- Headers --
token: {{token}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private VersionService<Document> versionService;

public void deleteVersion() throws TechnicalException, FunctionalException

	Id documentId = new Id("documentId");
	Id versionId = new Id("versionId");
	return versionService.deleteVersion(documentId, versionId);

```

  </TabItem>
</Tabs>

## All versions deletion

The example below shows how to delete all versions of a document.
<br/>
<Tabs>
<TabItem value="rest" label="REST">

```http
DELETE {{core}}/rest/documents/{documentId}/versions HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host
documentId: document identifier

-- Headers --
token: {{token}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private VersionService<Document> versionService;

public void deleteVersion() throws TechnicalException, FunctionalException

	Id documentId = new Id("documentId");
	return versionService.deleteVersions(documentId);

```

  </TabItem>
</Tabs>
