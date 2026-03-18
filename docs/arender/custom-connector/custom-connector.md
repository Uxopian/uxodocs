---
title: Custom connector development
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /custom-connector/custom-connector
sidebar_position: 1
content_hash: e78f2f970c07554d63a0fc9dbd3c9dc10eb96c3b9dc95c738f3c42f36c73934a
---

# Custom connector development

For an overview of connectors and the list of built-in ones, see [Connectors](../concepts/connectors.md).

This guide explains how to build a custom connector JAR that integrates ARender with a document source not covered by the built-in connectors. A connector consists of two components: a **URL parser** that extracts request parameters, and a **document accessor** that provides the document content.

## When to build a custom connector

Build a custom connector when your document source is not covered by the [built-in connectors](../concepts/connectors.md#available-connectors). Typical cases include in-house document repositories, proprietary ECM systems, or third-party APIs without an existing integration.

## Prerequisites

- **Java 25+** and **Maven** for building the connector JAR
- **ARender rendition API** (`arondor-arender-rendition-api`) as a dependency
- Basic familiarity with **Spring** bean configuration (XML or auto-configuration)

## How the URL parser chain works

When a user opens a document in ARender, the viewer's `ServletDocumentService` iterates over a chain of `DocumentServiceURLParser` beans. Each parser inspects the incoming HTTP request and decides whether it can handle the URL parameters. The first parser that returns `true` from `canParse()` is used to load the document.

The parser creates a `DocumentAccessor` -- an object that provides the document's content stream, metadata, and optionally an `AnnotationAccessor` for annotation storage. The accessor is registered with the `DocumentService`, and the rendition engine takes over from there.

```
HTTP request --> URL parser chain --> matching parser --> DocumentAccessor --> DocumentService
```

## Core interfaces

### DocumentServiceURLParser

Located in `com.arondor.viewer.rendition.api`:

```java
public interface DocumentServiceURLParser {
    boolean canParse(DocumentService documentService,
                     ServletContext application,
                     HttpServletRequest request);

    DocumentId parse(DocumentService documentService,
                     ServletContext application,
                     HttpServletRequest request)
            throws DocumentNotAvailableException,
                   DocumentFormatNotSupportedException;
}
```

- `canParse()` inspects the HTTP request parameters and returns `true` if this parser handles them.
- `parse()` extracts parameters, creates a `DocumentAccessor`, registers it with the `DocumentService`, and returns a `DocumentId`.

### DocumentAccessor

Located in `com.arondor.viewer.rendition.api.document`:

```java
public interface DocumentAccessor extends Serializable {
    DocumentId getDocumentId();
    String getDocumentTitle();
    void setDocumentTitle(String documentTitle);
    InputStream getInputStream() throws IOException;
    byte[] toByteArray() throws IOException;
    String getPath() throws IOException;
    String getMimeType() throws IOException;
    AnnotationAccessor getAnnotationAccessor()
            throws AnnotationsNotSupportedException;
    void setAnnotationAccessor(AnnotationAccessor annotationAccessor)
            throws AnnotationsNotSupportedException;
    DocumentAccessor asSerializableDocumentAccessor() throws IOException;
    DocumentMetadata getDocumentMetadata();
}
```

At minimum, implement `getInputStream()`, `getMimeType()`, `getDocumentId()`, `getDocumentTitle()`, and `setDocumentTitle()`.

### Specialized accessor interfaces

Extend the base `DocumentAccessor` to add capabilities:

| Interface | Purpose |
|-----------|---------|
| `DocumentAccessorHasFileName` | Provide a download filename different from the document title |
| `DocumentAccessorHasContext` | Provide the name of the UI profile property file to use (e.g., returns `role-user` for `role-user.properties`) |
| `DocumentAccessorHasUserRole` | Expose user roles for role-based access control |
| `DocumentAccessorHasPartialContent` | Support streaming / chunked loading |
| `DocumentAccessorHasUpdateContent` | Allow document content modification |

## Step-by-step implementation

### 1. Create a Maven project

Set up a Maven module with the ARender rendition API as a dependency. For a complete example, see the [sample connector on GitHub](https://github.com/arondor-connectors/sample-connectors/).

```xml
<dependencies>
    <dependency>
        <groupId>com.arondor.arender</groupId>
        <artifactId>arondor-arender-rendition-api</artifactId>
        <version>${arender.version}</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

Use `provided` scope because the HMI application already includes the API at runtime. Refer to the [sample connector POM](https://github.com/arondor-connectors/sample-connectors/blob/master/arender-sample-v2023/arender-sample-hmi-connector-v2023/pom.xml) for a complete list of dependencies.

Package the connector as a fat JAR using the `maven-assembly-plugin`:

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-assembly-plugin</artifactId>
    <configuration>
        <descriptorRefs>
            <descriptorRef>jar-with-dependencies</descriptorRef>
        </descriptorRefs>
    </configuration>
    <executions>
        <execution>
            <id>make-assembly</id>
            <phase>package</phase>
            <goals>
                <goal>single</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

### 2. Implement the DocumentAccessor

Create a class that implements `DocumentAccessor`. This example fetches a document from a hypothetical REST API:

```java
package com.example.connector;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

import com.arondor.viewer.annotation.exceptions.AnnotationsNotSupportedException;
import com.arondor.viewer.client.api.document.DocumentId;
import com.arondor.viewer.client.api.document.metadata.DocumentMetadata;
import com.arondor.viewer.rendition.api.annotation.AnnotationAccessor;
import com.arondor.viewer.rendition.api.document.DocumentAccessor;

public class CustomDocumentAccessor implements DocumentAccessor {

    private static final long serialVersionUID = 1L;

    private final DocumentId documentId;
    private final String endpoint;
    private String documentTitle;

    public CustomDocumentAccessor(DocumentId documentId, String endpoint) {
        this.documentId = documentId;
        this.endpoint = endpoint;
    }

    @Override
    public InputStream getInputStream() throws IOException {
        HttpURLConnection conn =
                (HttpURLConnection) new URL(endpoint).openConnection();
        conn.setRequestMethod("GET");
        return conn.getInputStream();
    }

    @Override
    public String getMimeType() throws IOException {
        return "application/pdf";
    }

    @Override
    public DocumentId getDocumentId() {
        return documentId;
    }

    @Override
    public DocumentId getUUID() {
        return documentId;
    }

    @Override
    public String getDocumentTitle() {
        return documentTitle;
    }

    @Override
    public void setDocumentTitle(String documentTitle) {
        this.documentTitle = documentTitle;
    }

    @Override
    public byte[] toByteArray() throws IOException {
        try (InputStream is = getInputStream();
             ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
            byte[] buf = new byte[8192];
            int len;
            while ((len = is.read(buf)) != -1) {
                bos.write(buf, 0, len);
            }
            return bos.toByteArray();
        }
    }

    @Override
    public String getPath() throws IOException {
        return null;
    }

    @Override
    public AnnotationAccessor getAnnotationAccessor()
            throws AnnotationsNotSupportedException {
        throw new AnnotationsNotSupportedException();
    }

    @Override
    public void setAnnotationAccessor(AnnotationAccessor accessor)
            throws AnnotationsNotSupportedException {
        throw new AnnotationsNotSupportedException();
    }

    @Override
    public DocumentAccessor asSerializableDocumentAccessor()
            throws IOException {
        return this;
    }

    @Override
    public DocumentMetadata getDocumentMetadata() {
        return null;
    }
}
```

### 3. Implement the URL parser

Create a `DocumentServiceURLParser` that detects when the URL contains your custom parameters and creates the accessor:

```java
package com.example.connector;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import com.arondor.viewer.client.api.document.*;
import com.arondor.viewer.rendition.api.DocumentServiceURLParser;
import com.arondor.viewer.rendition.api.document.DocumentService;

public class CustomURLParser implements DocumentServiceURLParser {

    private static final String PARAM_DOC_REF = "customDocRef";

    @Override
    public boolean canParse(DocumentService documentService,
                            ServletContext application,
                            HttpServletRequest request) {
        return request.getParameter(PARAM_DOC_REF) != null;
    }

    @Override
    public DocumentId parse(DocumentService documentService,
                            ServletContext application,
                            HttpServletRequest request)
            throws DocumentNotAvailableException {

        String docRef = request.getParameter(PARAM_DOC_REF);

        // Generate a unique DocumentId from the parameters
        List<DocumentIdParameter> parameters = new ArrayList<>();
        parameters.add(new URLDocumentIdParameter(PARAM_DOC_REF, docRef));
        DocumentId documentId =
                DocumentIdFactory.getInstance().generate(parameters);

        // Build the endpoint URL for your backend
        String endpoint = "https://my-repository.example.com/api/docs/"
                + docRef;

        // Create and register the accessor
        CustomDocumentAccessor accessor =
                new CustomDocumentAccessor(documentId, endpoint);
        accessor.setDocumentTitle("Document " + docRef);
        documentService.loadDocumentAccessor(accessor);

        return documentId;
    }
}
```

### 4. Register the bean

Define the URL parser as a Spring bean in `configurations/arender-custom-server-integration.xml`:

```xml
<bean id="customUrlParser"
      class="com.example.connector.CustomURLParser" />
```

### 5. Add the parser to the chain

In `configurations/arender-custom-server.properties`, prepend your parser bean name to the URL parser chain:

```properties
arender.server.url.parsers.beanNames=customUrlParser,DefaultURLParser,DocumentIdURLParser,FileattachmentURLParser,ExternalBeanURLParser,AlterContentParser,FallbackURLParser
```

The chain is evaluated left to right. Place your parser before `DefaultURLParser` so it is checked first. The `FallbackURLParser` should always remain last.

### 6. Deploy the connector JAR

Copy the fat JAR (`*-jar-with-dependencies.jar`) to the ARender HMI classpath:

**Docker deployment:**

Mount the JAR into the container at `/home/arender/lib/`:

```yaml
services:
  arender-ui:
    image: artifactory.arondor.cloud:5001/arender-ui-springboot:2026.0.0
    volumes:
      - ./custom-connector-jar-with-dependencies.jar:/home/arender/lib/custom-connector-jar-with-dependencies.jar
```

**Standalone deployment:**

Place the JAR in the `lib/` directory alongside the ARender HMI Spring Boot application.

## URL parser chain

The `arender.server.url.parsers.beanNames` property defines the ordered list of parsers. For each incoming request, ARender iterates through the list and calls `canParse()` on each parser. The first parser that returns `true` handles the request.

Built-in parsers:

| Parser | Purpose |
|--------|---------|
| `DefaultURLParser` | Handles `url` parameter (loads documents from a URL) |
| `DocumentIdURLParser` | Handles `documentId` parameter (reloads a previously registered document) |
| `FileattachmentURLParser` | Handles file attachment URLs |
| `ExternalBeanURLParser` | Loads a document accessor by Spring bean name |
| `AlterContentParser` | Modifies document content on the fly |
| `FallbackURLParser` | Catch-all that returns an error page when no parser matches |

## Testing

Open the ARender viewer with your custom URL parameter to verify the connector:

```
https://localhost:8080/?customDocRef=12345
```

Check the ARender HMI logs for parser chain execution. Enable debug logging for your connector package:

```properties
logging.level.com.example.connector=DEBUG
```
