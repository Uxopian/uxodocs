---
title: "Office converter"
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: 4d90d07ab00053e34a676133ff688f02fb961fabb40278089a58731151cb7238
---

This tutorial describe an example of usage of ARender to convert a Word
document into a PDF. In order to do so, we are going to explore the API
used to connect to the rendition server.

## Configuration

### Maven configuration

Before everything, we need to import the ARender maven dependencies that
are needed for this example. In the case of a maven project, it is
sufficiant to add this to the pom.xml file:

``` xml
<dependency>
       <groupId>com.arondor.arender</groupId>
       <artifactId>arondor-arender-common</artifactId>
       <version>ARender_version</version>
       <type>jar</type>
       <scope>compile</scope>
</dependency>
<dependency>
       <groupId>com.arondor.arender</groupId>
       <artifactId>arondor-arender-client-javarmi</artifactId>
       <version>ARender_version</version>
       <type>jar</type>
       <scope>compile</scope>
</dependency>
```

### Document service configuration

This first step defines the necessary information for the usage of the
API. The object DocumentService encapsulate the communication between
the Web-UI and the rendition server. (that can be remote)

``` java
ClientDocumentService clientDocumentService = new ClientDocumentService();
clientDocumentService.setRemoteTarget("http://rendition-server:8761/");
clientDocumentService.setMaxTries(3);
```

## Document loading

In order to load the document on the rendition server, we can call
loadDocumentAccessor(DocumentAccessor documentAccessor) of the
DocumentService interface. In this exemple, we give a documentAccessor
built from an inputStream containing the content of the document.

``` java
String fileToConvertPath = "C:\ARender_User\Documents\myWordDocument.docx";
FileInputStream fileInputStream = new FileInputStream(fileToConvertPath);
DocumentAccessor documentAccessor = new DocumentAccessorByteArray(fileInputStream);
clientDocumentService.loadDocumentAccessor(documentAccessor);
```

### Fetching the converted document

Within a rendition server, a document can be located in
different states. In this example, the states that interest us are:

**Initial**: Corresponds to the document pushed in its initial state,
without treatment from the rendition server. 

**Rendered**: Correspond to
the document once it has been converted/processed by the rendition
server, this is the document we want to fetch. Therefore, different
accessors, implementing the interface DocumentAccessor, are stored
allowing to access different states of a same document. The enumration
DocumentAccessorSelector allows to fetch the appropriate
DocuementAccessor.

``` java
DocumentAccessor renderedDocumentAccessor = clientDocumentService.getDocumentAccessor(documentAccessor.getUUID(),DocumentAccessorSelector.RENDERED);
InputStream pdfDocumentInputStream = renderedDocumentAccessor.getInputStream();
```
