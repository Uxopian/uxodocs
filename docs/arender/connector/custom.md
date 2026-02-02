---
title: "Custom connector"
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: f6ec8ec6c5d8345bd53fb706b012cfe6bf5e11a98eff65296b3ddb9e8419cd18
---

## Introduction
A sample code is available in the below link:
* https://github.com/arondor-connectors/sample-connectors

## Define a connector

**How to define a connector?**

In order to use a new connector, following steps have to be done:

Add the JAR of the connector to the application server classpath (or add
it directly to the *WEB-INF/lib* of deployed web application)

Add following lines in the *WEB-INF/classes* folder:

**arender-custom-server-integration.xml**


```XML
<bean id="customUrlParser" class="com.arondor.viewer.YourCustomURLParser" />
```

**arender-server-custom-`...`.properties**


```cfg
arender.server.url.parsers.beanNames=customUrlParser,DefaultURLParser,DocumentIdURLParser,FileattachmentURLParser,ExternalBeanURLParser,AlterContentParser,FallbackURLParser
```

## Oracle Connector

**This part details how to fetch a document stored in Oracle DB Server
using sample code based on Spring JDBC.**

The aim of this example is to provide ability to visualize a document
stored as BLOB in Oracle DB Server. This sample is based on:

- An URL as:

> `http://{ARENDER_SERVER}/ARender.html?ref={DOCUMENT_REFERENCE}`

- An Oracle schema, named *ARende*r, which contains the *T_DOCS* table:

``` java
| REF (VARCHAR) | DOC (BLOB) |
```

- The ARender dependencies (in *WEB-INFlib* folder of Web-UI WEB
    application):

    |                                      |                                               |
    | ------------------------------------ | --------------------------------------------- |
    | arondor-arender-client-api-2.2.0.jar | arondor-arender-rendition-api-2.2.0.jar       |
    | arondor-arender-common-2.2.0.jar     | arondor-common-io-2.0.0.jar                   |
    | arondor-common-mime-2.0.11.jar       | log4j-1.2.16.jar                              |
    | commons-io-1.3.2.jar                 | Spring 3.0.5.RELEASE                          |
    | commons-logging-1.1.1.jar            | ojdbc5-11.2.0.3.jar (not supplied by ARender) |

### URL Parser

The URL parser is the entry point of an ARender connector. This class
must implement *DocumentServiceURLParser* interface.

- Class variables

``` java
// The URL parameter to use to get document reference
private String docRefParameter;
// The SQL request providing document access
private String query;
private PreparedStatement preparedStatement;
private DataSource dataSource;
```

- When should ARender enable this connector?

<!-- end list -->

``` java
@Override
public boolean canParse(DocumentService documentService, ServletContext context, HttpServletRequest request)
{
   // The connector is enabled/used when ARender URL contains defined parameter
   return request.getParameter(docRefParameter) != null;
}
```

- Document loading

``` java
@Override
public DocumentId parse(DocumentService documentService, ServletContext context, HttpServletRequest request)
   throws DocumentNotAvailableException, DocumentFormatNotSupportedException
{
   String docRef = request.getParameter(docRefParameter);
   DocumentId documentId = DocumentIdGenerator.generate(docRef);
   BlobOracleDocumentAccessor oracleDocumentAccessor = new BlobOracleDocumentAccessor(docRef, documentId,
      getOrCreatePreparedStatement());
   return documentService.loadDocument(oracleDocumentAccessor);
}

protected PreparedStatement getOrCreatePreparedStatement()
{
   if (preparedStatement == null)
   {
      try
      {
         Connection connection = dataSource.getConnection();
         preparedStatement = connection.prepareStatement(getQuery());
      }
      catch (SQLException e)
      {
         LOGGER.error("Could not prepare statement for document fetching", e);
      }
   }
   return preparedStatement;
}
```

- Add getters and setters to let ability to configure this connector

``` java
public DataSource getDataSource()
{
   return dataSource;
}

public void setDataSource(DataSource dataSource)
{
   this.dataSource = dataSource;
}

public String getDocRefParameter()
{
   return docRefParameter;
}

public void setDocRefParameter(String docRefParameter)
{
   this.docRefParameter = docRefParameter;
}

public String getQuery()
{
   return query;
}

public void setQuery(String query)
{
   this.query = query;
}
```

- Connector Spring configuration

```xml
<bean id="oracleURLParser" class="com.arondor.viewer.oracle.OracleURLParser">
   <property name="docRefParameter" value="ref" />
   <property name="query" value="SELECT DOC FROM ARender.T_DOCS WHERE REF=?" />
   <property name="dataSource">
      <bean id="dataSource" class="oracle.jdbc.pool.OracleDataSource" destroy-method="close">
         <property name="connectionCachingEnabled" value="true" />
         <property name="URL" value="jdbc:oracle:thin:@{host}:{port}:{SID}" />
         <property name="user" value="{user}" />
         <property name="password" value="{password}" />
      </bean>
   </property>
</bean>
```

### Document content access

In this part, it is detailed how to effectively fetch document from its
referential. For this, we use a DAO, BlobOracleDocumentAccessor,
implementing DocumentAccessor interface.

- Content fetching

In order to fetch the stream corresponding to the BLOB file to
visualize, the *PreparedStatement* object, supplied to the constructor,
is used:

```java
@Override
public byte[] toByteArray() throws IOException
{
   try
   {
      preparedStatement.setLong(1, Long.parseLong(docRef));
      ResultSet resultSet = preparedStatement.executeQuery();
      if (!resultSet.next())
      {
         LOGGER.error("No result can be found for F_DocNumber: " + docRef);
         throw new IOException("No result can be found for F_DocNumber: " + docRef);
      }
      else
      {
         Blob blob = (Blob) resultSet.getObject(1);
         return IOUtils.toByteArray(blob.getBinaryStream());
      }
   }
   catch (NumberFormatException e)
   {
      LOGGER.error("Cannot fetch document content: F_DocNumber is not a valid long: " + docRef, e);
      throw (e);
   }
   catch (SQLException e)
   {
      LOGGER.error("Cannot fetch document content: Impossible to update statement with F_DocNumber: " + docRef,e);
      throw new IOException(e);
   }
}
@Override
public InputStream getInputStream() throws IOException
{
   return new ByteArrayInputStream(this.toByteArray());
}
@Override
public DocumentAccessor asSerializableDocumentAccessor() throws IOException
{
   return new DocumentAccessorByteArray(getUUID(), getInputStream());
}
```

- Metadata

``` java
@Override
public DocumentMetadata getDocumentMetadata()
{
   DocumentMetadata documentMetadata = new DocumentMetadata();
   DocumentProperty docProperty = new DocumentProperty("client", "Client");
   docProperty.setValue("M. Richard Dupond");
   documentMetadata.addDocumentProperty("client", docProperty);
   return documentMetadata;
}
```

[Download connector sources](http://blogs.arondor.com/administrer/content/download/1859/12592/file/ARender-connector-Oracle-sample.zip).

It is recommended to add the document title information in the DocumentMetadata in order to fully benefit from certain feature such as the correct
display of the title when the document opening has failed, for example by adding the following line in the above code:
``` java
   documentMetadata.addDocumentProperty("documentTitle", getDocumentTitle());
```

## Create a new AnnotationAccessor

When you create your own connector you have to define how to fetch, add,
update and remove annotations. To do this ARender offers an API that
defines four main methods to implement: create, update, get and delete.

Below the three main steps to initialize your own AnnotationAccessor:

1. Implement the interface AnnotationAccessor
2. Create constructors
3. Methods to implement

### Implement the interface AnnotationAccessor

``` java
public class CustomAnnotationAccessor implements AnnotationAccessor {
```

### Create constructors

The good practice is to define two constructors.

One default generic constructor, based only on the documentId

``` java
public CustomAnnotationAccessor(DocumentService documentService, DocumentId documentId)
{
    if (documentId == null)
    {
        throw new IllegalArgumentException("Invalid null documentId provided !");
    }
    this.documentId = documentId;
}
```

And another one based on the documentAccessor

``` java
public CustomAnnotationAccessor(DocumentService documentService, DocumentAccessor documentAccessor)
{
    this(documentService, documentAccessor.getUUID());
}
```

### Methods to implement

#### Method create

This method takes in parameter a list of Annotation that has been
created and saved.

Define here where and how to store these new annotations.

``` java
@Override
public void create(List<com.arondor.viewer.annotation.api.Annotationannotations)
        throws AnnotationsNotSupportedException, InvalidAnnotationFormatException, AnnotationCredentialsException,
        AnnotationNotAvailableException
{
```

#### Method update

This method takes in parameter a list of Annotation that has been
updated and saved.

Define here where and how to save these updated annotations.

``` java
@Override
public void update(List<com.arondor.viewer.annotation.api.Annotationannotations)
        throws AnnotationsNotSupportedException, InvalidAnnotationFormatException, AnnotationNotAvailableException,
        AnnotationCredentialsException
{
```

#### Method get

This method returns a list of Annotation to fetch. Define here how to
fetch them.

``` java
@Override
public synchronized List<Annotationget() throws AnnotationsNotSupportedException,
        InvalidAnnotationFormatException
{
```

#### Method delete

This method takes in parameter a list of Annotation that have been
removed. Define here where and how to remove them.

``` java
@Override
public void delete(List<com.arondor.viewer.annotation.api.Annotationannotations)
        throws AnnotationsNotSupportedException, InvalidAnnotationFormatException, AnnotationNotAvailableException,
        AnnotationCredentialsException
{
```

#### Method getAnnotationCreationPolicy

This method returns an Object AnnotationCreationPolicy defining:

- If the user can create or not annotations
- The user stamp catalog

<!-- end list -->

``` java
@Override
public AnnotationCreationPolicy getAnnotationCreationPolicy()
{
    return annotationCreationPolicy;
}
```

Useful links:

- AnnotationAccessor API is available here:
    [http://arender.fr/rendition-api/com/arondor/viewer/rendition/api/annotation/AnnotationAccessor.html](http://arender.fr/rendition-api/com/arondor/viewer/rendition/api/annotation/AnnotationAccessor.html)

## Hide parameters from the URL

ARender offers a way to hide parameters.

- The first step is to ask ARender to generate the document's UUID
  (ARender's ID). To do this generate the following URL with
  parameters you usually use to fetch the document (document id
  ...):

> `http://{HOST_ARENDER}/openExternalDocument.jsp?{PARAMETERS}`

- With the UUID fetched from the response of the above call,
  generate the following URL and visualize the document
  
> `http://{HOST_ARENDER}/?uuid={UUID_FETCHED_ABOVE}`

## Get the built document

The documentBuilder is the ARender flagship feature. (More informations
[here](/feature/documentbuilder)). Save a built document
implies, by default, the download of the document on the client side.

It is possible to override this behavior, to fetch the built content and
ofr exemple transfer it to a WebService. To do this, ARender has a
dedicated API that define an interface to implement:
[DocumentAccessorHasUpdateContent](http://arender.fr/rendition-api/com/arondor/viewer/rendition/api/document/DocumentAccessorHasUpdateContent.html).

Below an implementation example:

``` java
@Override
public DocumentAccessor updateDocumentContent(DocumentService documentService, DocumentId documentId,
        AlterContentDescription alterContentDescription)
        throws DocumentNotAvailableException, IOException, AlterContentOperationNotSupportedException,
        DocumentFormatNotSupportedException, AlterContentOperationException
{
    // this method is called to update the current DocumentAccessor content with the build document content
    // the built documentId is provided in the documentId parameter.
    DocumentAccessor modifiedDocument = getDocumentAccessorSourceToUpdate(documentService, documentId);
    switch (alterContentDescription.getContentUpdateBehavior())
    {
    case CREATE_NEW_FIRST_DOCUMENT:
        saveNewDocument(modifiedDocument, true);
        break;
    case UPDATE_FIRST_DOCUMENT:
        updateContent(modifiedDocument);
        break;
    default:
        break;
    }
    return modifiedDocument;
}

protected DocumentAccessor getDocumentAccessorSourceToUpdate(DocumentService documentService, DocumentId sourceId)
        throws AlterContentOperationNotSupportedException, DocumentNotAvailableException, IOException,
        DocumentFormatNotSupportedException
{
    // this method will search for the DocumentAccessor from the rendition service to obtain easily the built document content
    if (documentService == null)
    {
        throw new IllegalArgumentException("No documentLayout provided !");
    }
    DocumentLayout documentLayout = documentService.getDocumentLayout(sourceId);
    if (documentLayout == null)
    {
        throw new DocumentNotAvailableException("Source document " + sourceId + "is not available");
    }
    // this is optional and only if you wish to receive the document title of the document built
    DocumentLayout documentLayout = getDocumentService().getDocumentLayout(alterDocumentContent);
    if (documentLayout instanceof DocumentContainer)
    {
        // here, we take the first children (to get the built document name)
        List<DocumentLayoutchildren = ((DocumentContainer) documentLayout).getChildren();
        if (children != null && !children.isEmpty())
        {
            String builtDocumentTitle = documentService.getDocumentLayout(children.get(0).getDocumentId()).getDocumentTitle();
            // do what you wish with this title
        }
    }
    // if you just want the binary content
    return documentService.getDocumentAccessor(sourceId, DocumentAccessorSelector.RENDERED);
}
```
