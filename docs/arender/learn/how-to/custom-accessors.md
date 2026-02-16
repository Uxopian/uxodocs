---
title: Create a custom document accessor
sidebar_position: 7
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
content_hash: bc4b6090eeb3eb00059ca722a8e1d60ca1ea1c62688516e0beaf14517e97e032
---

Depending the kind of service you want to use, we might already have
something in-house so don't hesitate to come back to us with the decided
service that will be used to fetch documents.

If you prefer to directly go and implement your custom integration for
fetching documents, there will be two things to do:

An URL parser, that will load the parameters you need from the URL and
create the second component needed, what we call a document accessor.

[http://arender.fr/rendition-api/com/arondor/viewer/rendition/api/DocumentServiceURLParser.html](http://arender.fr/rendition-api/com/arondor/viewer/rendition/api/DocumentServiceURLParser.html)

The method canParse has to return true if the parameters in the URL of
ARender are sufficient to parse the document.

The method parse will parse the parameters contained in the URL and push
the documentAccessor to the rendition server. Example:

```java
List&lt;DocumentIdParameter&gt; parameters = new ArrayList&lt;DocumentIdParameter&gt;();
parameters.add(new URLDocumentIdParameter(URL_REQUEST_PARAMETER, url));
DocumentId documentId = DocumentIdFactory.getInstance().generate(parameters);
DocumentAccessor documentAccessor = new DocumentAccessorURL(url, documentId);
documentService.loadDocumentAccessor(documentAccessor);
return documentAccessor.getUUID();
```

Here, instead of DocumentAcessorURL, you'll put your own custom
DocumentAccessor.

[http://arender.fr/rendition-api/com/arondor/viewer/rendition/api/document/DocumentAccessor.html](http://arender.fr/rendition-api/com/arondor/viewer/rendition/api/document/DocumentAccessor.html)

The methods detailed in the documentation are very straightforward and
should not cause you any implementation issues.

Once you have developed your couple Parser/Accessor you'll can add the
parser in the file arender-custom-server.properties contained in the configurations/ folder of ARender Web-UI.

- In the file _configurations/arender-custom-server-integration.xml _, define the bean:

```xml
        <bean id="customUrlParser" class="com.arondor.viewer.CustomURLParser" />
```

- In the file _configurations/arender-custom-server.properties_, add your bean Id
  to the list:

```cfg
arender.server.url.parsers.beanNames=customUrlParser,DefaultURLParser,DocumentIdURLParser,FileattachmentURLParser,ExternalBeanURLParser,AlterContentParser,FallbackURLParser
```

In the case of creating a custom Accessor/URLParser we recommend you
strongly to make a Maven project and use properties edition in order to
overlay and modify default ARender war properly each version.
