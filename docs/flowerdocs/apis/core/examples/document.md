---
title: "Handling a document"
description: "Create, modify, delete your documents"
date: "2001-03-30T13:20:01+02:00"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



The `Document` service exhibits all the operations available around `DOCUMENT` type components.


# Document recovery

The examples below show how to retrieve documents using the various operations of `get`.

## Document recovery

<Tabs>
  <TabItem value="rest" label="REST">

```http
GET {{core}}/rest/documents/{ids} HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host
ids: identifier of the documents to be retrieved

-- Headers --
token: {{token}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private DocumentService service;

public List<Document> get() throws FunctionalException, TechnicalException

	List<Id> ids = Lists.newArrayList(new Id("documentId"));
	return service.get(ids);

```

  </TabItem>
</Tabs>


## Version recovery

This service allows you to retrieve a specific version of a document:

<Tabs>
  <TabItem value="rest" label="REST">

```http
GET {{core}}/rest/documents/{documentId}/versions/{versionId} HTTP/1.1

-- Paramètres d'URL
core: FlowerDocs Core host
documentId: identifier of the document to be retrieved
versionId: identifier of the version to be retrieved

-- Headers --
token: {{token}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private VersionService service;

public Document getVersion() throws FunctionalException, TechnicalException

	Id documentId = new Id("documentId"));
	Id versionId = new Id("versionId"));
	
	return service.getVersion(documentId, versionId);

```

  </TabItem>
</Tabs>


## Retrieving associated files

This service retrieves the files associated with the document whose identifier is passed as input:

- the content: `includeContent` = true
- files: `includeContent` = false

<Tabs>
  <TabItem value="rest" label="REST">

```http
GET {{core}}/rest/documents/{id}/files?includeContent={includeContent} HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host
id: document identifier
includeContent: true or false for content retrieval

-- Headers --
token: {{token}}
includeContent: {{inclut le contenu}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private DocumentService service;

public List<DocumentFile> get() throws FunctionalException, TechnicalException

	Boolean includeContent = false;
	return service.getFiles(new Id("documentId"), includeContent);

```

  </TabItem>
</Tabs>


# Document creation

The examples below show how to create documents using the following operation.

<Tabs>
  <TabItem value="rest" label="REST">

```http
POST {{core}}/rest/documents/ HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host

-- Headers --
token: {{token}}
Content-Type: application/json

-- Body (json) --
[

        "data": {
            "classId": "Document"
        },
        "category": "DOCUMENT”,
        "name": "D1"

]
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private DocumentService service;

public List<Document> create() throws FunctionalException, TechnicalException

	List<Document> documents = new ArrayList();
	Document document = new Document();
	document.setId(new Id("testId"));
    ComponentData data = new ComponentData();
    data.setClassId(new Id("ENV_Document"));
    document.setData(data);
    Tags tags = new Tags();
    tags.getTags().add(new Tag(Arrays.asList("C0012")), "B_RefClient", false));
    tags.getTags().add(new Tag(Arrays.asList("Supplier 12"), "B_ClientName", false));
    tags.getTags().add(new Tag(Arrays.asList("RIB"), "B_TypeDocument", false));
    document.setTags(tags);	
	documents.add(document);
	return service.create(documents);

```

  </TabItem>
</Tabs>


# Document creation with a content

The examples below show how to create a document with its content using the following operation.




# Document modification

The examples below show how to update documents.

## Document modification with content replacement

This operation allows to modify the data of a document (class identifier, document name, ACL, etc.) as well as modifying its content in the same call.




## Data modification

This operation updates a document's tags and data (class identifier, document name, ACL, etc.) but also its content.

:::info
This service operates on a cancel and replace basis, so all the contents and tag values must be supplied by the service at the time of update. It is therefore advisable to retrieve the document, make the changes and call the update service.
:::


<Tabs>
  <TabItem value="rest" label="REST">

```http
POST {{core}}/rest/documents/{id} HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host
id: document identifier

-- Headers --
token: {{token}}
Content-Type: application/json

-- Body (json) --
[

    	"files": [

	    		"id": "98c1f765-7595-46c3-8f4a-b75bd7c25ff7",
	    		"size": 0

	    ],
        "data": {
            "classId": "Document"
        },
        "category": "DOCUMENT”,
        "name": "D2"

]
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private DocumentService service;

public List<Document> update(Document document) throws FunctionalException, TechnicalException

	List<Document> documents = new ArrayList();
    tags.getTags().add(new Tag(Arrays.asList("Contract"), "B_TypeDocument", false));
    document.setTags(tags);	
	documents.add(document);
	return service.update(documents);

```

  </TabItem>
</Tabs>


## Add file

This operation adds content to a document

- `replace`: replaces the existing file with the new content

<Tabs>
  <TabItem value="rest" label="REST">

```http
POST {{core}}/rest/documents/{id}/files?replace={replace} HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host
replace: true or false to replace content

-- Headers --
token: {{token}}
Content-Type: multipart/form-data

-- Body (form-data) --
file (type file): file to import
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private DocumentService service;

public List<Document> addContent(Document document) throws FunctionalException, TechnicalException

	List<DocumentFile> files = new ArrayList<DocumentFile>();
	DocumentFile file = new DocumentFile();
    file.setId(new Id("MyFile"));
    file.setContent(new DataHandler(new FileDataSource(File.createTempFile("/tmp", ".txt"))));
	files.add(file);
	return service.addFiles(new Id("sampleDoc"), files, false);

```

  </TabItem>
</Tabs>


## Rename file

This operation allows you to rename a file associated with a document:

<Tabs>
  <TabItem value="rest" label="REST">

```http
POST /core/rest/documents/{id}/files/{fileId}/name HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host
id: document identifier
fileId : file identifier

-- Headers --
token: {{token}}

-- Body (form-data) --
New file name
```

  </TabItem>
</Tabs>


# Search document

The search operations all work on the same model as described [here](../examples/search.md).

# Document deletion

The examples below show how to delete documents.

## Document deletion

This operation allows to delete the document and its associated files.

<Tabs>
  <TabItem value="rest" label="REST">

```http
DELETE {{core}}/rest/documents/{ids} HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host
ids: identifiers of documents to be deleted

-- Header -- 
token: {{token}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private DocumentService service;

public void delete() throws FunctionalException, TechnicalException

	List<Id> ids = Lists.newArrayList(new Id("sample_doc"));
	service.delete(ids);

```

  </TabItem>
</Tabs>


## File deletion

This operation allows you to delete a file.

<Tabs>
  <TabItem value="rest" label="REST">

```http
DELETE /rest/documents/{documentId}/files/{fileId} HTTP/1.1

-- URL parameters --
Host: {{core}}
documentId: document identifier
fileId: content identifier to be deleted

-- Headers -- 
token: {{token}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private DocumentService service;

public void delete() throws FunctionalException, TechnicalException

	List<Id> fileIds = Lists.newArrayList(new Id("sample_doc"));
	service.deleteFiles(documentId, fileIds);

```

  </TabItem>
</Tabs>


# Content

## Content recovery

This service retrieves the content associated with the file whose identifier is passed as input:

- with or without obfuscations, depending on the parameter `includeObfuscations`

<Tabs>
  <TabItem value="rest" label="REST">

```http
GET {{core}}/rest/documents/{documentId}/files/{fileId}/content?includeObfuscations={includeObfuscations} HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host
documentId: document identifier
fileId: content identifier
includeObfuscations: true or false to include obfuscations

-- Headers --
token: {{token}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
private DocumentService service;

public List<DocumentFile> get() throws FunctionalException, TechnicalException

	Boolean includeContent = false;
	return service.getFile(new Id("documentId"), new Id("fileId"), includeContent);

```

  </TabItem>
</Tabs>


## Index document content

This service indexes the content passed in parameter and associated with the file identifier.

<Tabs>
  <TabItem value="rest" label="REST">

```http
POST {{core}}/rest/documents/{documentId}/files/{fileId}/content/index HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host
documentId: document identifier
fileId: content identifier

-- Headers --
token: {{token}}
Content-Type: application/json

-- Body (text) --
document content
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
	private DocumentContentService service;
	
	public Id addContent() throws FunctionalException, TechnicalException

		return service.index(new Id("documentId"), new Id("fileId"), "File contents");

```

  </TabItem>
</Tabs>


## Remove content indexing from a document

This service removes the indexing of content associated with a document.

<Tabs>
  <TabItem value="rest" label="REST">

```http
DELETE {{core}}/rest/documents/{documentId}/files/{fileId}/content/index HTTP/1.1

-- URL parameters --
core: FlowerDocs Core host
documentId: document identifier
fileId: content identifier

-- Headers --
token: {{token}}
Content-Type: application/json
```

  </TabItem>
  <TabItem value="java" label="JAVA">

```java
@Autowired
	private DocumentContentService service;
	
	public void removeContent() throws FunctionalException, TechnicalException

		service.deindex(new Id("documentId"), new Id("fileId"));

```

  </TabItem>
</Tabs>



This service removes indexing from all files associated with the document.
