---
title: Handling document versions
description: "Create, restore, delete document versions"
sidebar_position: 8
date: "2001-03-30T13:20:02+02:00"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: b6589584bd1998f8e8354c3ffa0562987e813a2469f63e224215e8a63f42d94a
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The `VersionService` service displays the following operations:

* `promote`: to create a version of a document
* `getVersions`: to retrieve document versions
* `revert`: to restore a version of a document
* `deleteVersion`: to delete a version of a document
* `deleteVersions`: to delete all versions of a document

# Creating a version

The example below shows how to create a version of a document.
<br/>
<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>     FlowerDocs Core base URL
# <TOKEN>         authentication token
# <DOCUMENT_ID>   document identifier
# <LABEL>         version name

curl -X POST "<CORE_HOST>/rest/documents/<DOCUMENT_ID>/versions" \
  -H "token: <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '"<LABEL>"'
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private VersionService<Document> versionService;

public Document promote() throws TechnicalException, FunctionalException
{
	Id id = new Id("documentId");
	String label = "Version_1";
	return versionService.promote(id, label);
}
```

  </TabItem>
</Tabs>

# Versions recovery

The example below shows how to recover versions of a document.
<br/>
<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>     FlowerDocs Core base URL
# <TOKEN>         authentication token
# <DOCUMENT_ID>   document identifier

curl -X GET "<CORE_HOST>/rest/documents/<DOCUMENT_ID>/versions" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private VersionService<Document> versionService;

public VersionSeries getVersions() throws TechnicalException, FunctionalException
{
	Id id = new Id("documentId");
	return versionService.getVersions(id);
}
```

  </TabItem>
</Tabs>

# Restoring a version

The example below shows how to restore a version of a document.
<br/>
<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>     FlowerDocs Core base URL
# <TOKEN>         authentication token
# <DOCUMENT_ID>   document identifier
# <VERSION_ID>    document version identifier

curl -X POST "<CORE_HOST>/rest/documents/<DOCUMENT_ID>/versions/<VERSION_ID>/revert" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private VersionService<Document> versionService;

public Document revert() throws TechnicalException, FunctionalException
{
	Id documentId = new Id("documentId");
	Id versionId = new Id("versionId");
	id versionId = new Id("versionId");
}
```

  </TabItem>
</Tabs>

# Version deletion

## Deleting a version

The example below shows how to delete a version of a document.
<br/>
<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>     FlowerDocs Core base URL
# <TOKEN>         authentication token
# <DOCUMENT_ID>   document identifier
# <VERSION_ID>    document version identifier

curl -X DELETE "<CORE_HOST>/rest/documents/<DOCUMENT_ID>/versions/<VERSION_ID>" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private VersionService<Document> versionService;

public void deleteVersion() throws TechnicalException, FunctionalException
{
	Id documentId = new Id("documentId");
	Id versionId = new Id("versionId");
	return versionService.deleteVersion(documentId, versionId);
}
```

  </TabItem>
</Tabs>

## All versions deletion

The example below shows how to delete all versions of a document.
<br/>
<Tabs>
  <TabItem value="rest" label="REST">

```bash
# <CORE_HOST>     FlowerDocs Core base URL
# <TOKEN>         authentication token
# <DOCUMENT_ID>   document identifier

curl -X DELETE "<CORE_HOST>/rest/documents/<DOCUMENT_ID>/versions" \
  -H "token: <TOKEN>"
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private VersionService<Document> versionService;

public void deleteVersion() throws TechnicalException, FunctionalException
{
	Id documentId = new Id("documentId");
	return versionService.deleteVersions(documentId);
}
```

  </TabItem>
</Tabs>