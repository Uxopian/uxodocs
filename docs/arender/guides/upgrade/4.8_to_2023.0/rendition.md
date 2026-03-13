---
title: Rendition changes
last_update:
  date: '2026-03-13T11:59:21.642Z'
  author: CI/CD Bot
content_hash: f0e1a75edf88e4048d71e610b0d636b3667be987d3a691a202f4f30c688df1db
---

## Document Service Broker (RenditionEngine module)

### Properties in application.properties file

#### Deleted properties

| Version 4                                                 | Description                                            |
| --------------------------------------------------------- | ------------------------------------------------------ |
| eureka.client.register-with-eureka                        | Former property no longer in use even in latests V4    |
| eureka.client.fetch-registry                              | Former property no longer in use even in latests V4    |
| logging.level.com.netflix.eureka                          | Former property no longer in use even in latests V4    |
| logging.level.com.netflix.discovery                       | Former property no longer in use even in latests V4    |
| spring.servlet.multipart.enabled                          | Enable multipart uploads                               |
| spring.servlet.multipart.file-size-threshold              | Threshold after which files are written to disk        |
| spring.servlet.multipart.location                         | Location of temporary files                            |
| spring.servlet.multipart.max-file-size                    | Max file size                                          |
| spring.servlet.multipart.max-request-size                 | Max Request Size                                       |
| server.tomcat.max-http-form-post-size                     | Max Request Size                                       |
| arender.endpoint.metrics.export.document.accessor.enabled | ARender load document accessor endpoint metrics export |
| arender.endpoint.metrics.export.document.size.enabled     | ARender document size endpoint metrics export          |
| arender.endpoint.metrics.export.document.dpi.enabled      | ARender document dpi endpoint metrics export           |

#### Renamed properties

| Version 4                                              | Version 2023                                           | Description                                             |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------- |
| arender.endpoint.metrics.export.alter.document.enabled | arender.endpoint.metrics.export.transformation.enabled | ARender document transformation endpoint metrics export |
| arender.endpoint.metrics.export.video.enabled          | arender.endpoint.metrics.export.get.file.chunk.enabled | ARender file chunk endpoint metrics export              |

### Properties in application.yaml file

#### Deleted properties

| Version 4                              | Description                                                                       |
| -------------------------------------- | --------------------------------------------------------------------------------- |
| rest-template:connect-timeout          | Determines the timeout until a new connection is fully established                |
| rest-template:read-timeout             | Determines the timeout until it finishes reading data bytes from the socket       |
| rest-template:max-connection-total     | The total number of connections that can be reused when future requests           |
| rest-template:max-connection-per-route | The total number of connections per route that can be reused when future requests |
| rest-template:max-keep-alive           | Determines the lifespan of a connection while it is not used                      |

Connections are still configurable with new properties located in the application.properties file.

## Document Converter (Taskconversion module)

### Properties in application.properties file

#### Deleted properties

| Version 4                                                 | Description                                                                               |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| rtf.conversion.timeout                                    | Timeout in seconds for RTF files conversion to PDF                                        |
| pdf.merge.timeout                                         | Timeout in seconds to merge PDFs into a single PDF                                        |
| emltopdf.custom.mail.title                                | Eml2pdf default configuration for mail headers                                            |
| emltopdf.custom.mail.title.separator                      | Eml2pdf default configuration for mail headers                                            |
| emltopdf.custom.mail.attachment.header                    | Eml2pdf default configuration for mail headers                                            |
| emltopdf.custom.mail.display.subject.in.title             | Eml2pdf default configuration for mail headers                                            |
| emltopdf.use.legacy.header                                | Eml2pdf default configuration for mail headers                                            |
| emltopdf.custom.rtf.tag.list                              | Eml2pdf default configuration for mail headers                                            |
| emltopdf.config.filter.special.characters.regex           | Eml2pdf default configuration for mail headers                                            |
| emltopdf.config.filter.replacement.character              | Eml2pdf default configuration for mail headers                                            |
| emltopdf.encode.header.with.body.encoding                 | If true, may encode the subject and attachments title according to the body main encoding |
| emltopdf.config.format.date                               | Determines the date format in mails                                                       |
| text.factory.delegate.bean.name                           | Determines to which bean we delegate the task of converting text to pdf                   |
| arender.endpoint.metrics.export.document.accessor.enabled | ARender load document accessor endpoint metrics export                                    |
| arender.endpoint.metrics.export.document.size.enabled     | ARender document size endpoint metrics export                                             |
| arender.endpoint.metrics.export.document.dpi.enabled      | ARender document dpi endpoint metrics export                                              |

#### Renamed properties

| Version 4                                                              | Version 2023                                           | Description                                             |
| ---------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------- |
| rendition.office.options=--headless,--convert-to,pdf:writer_pdf_Export | rendition.office.options=--headless,--convert-to       | Office options                                          |
| obfuscate.deleteText=true                                              | redact.deleteText=true                                 | Property name changed                                   |
| obfuscate.flattenText=false                                            | redact.flattenText=false                               | Property name changed                                   |
| document.fallback.font.path=../fonts/                                  | document.font.path=../fonts/                           | Property name changed                                   |
| arender.endpoint.metrics.export.alter.document.enabled                 | arender.endpoint.metrics.export.transformation.enabled | ARender document transformation endpoint metrics export |
| arender.endpoint.metrics.export.video.enabled                          | arender.endpoint.metrics.export.get.file.chunk.enabled | ARender file chunk endpoint metrics export              |

The mail configuration properties have actually moved to application.properties of Document Service Broker

How to configure mime type has changed, for more information see [there](../../../../learn/how-to/addmimetypes).

### Properties in application.yaml file

#### Deleted properties

| Version 4                                                 | Description                                                                        |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| rest-template:connect-timeout                             | Determines the timeout until a new connection is fully established                 |
| rest-template:read-timeout                                | Determines the timeout until it finishes reading data bytes from the socket        |
| rest-template:max-connection-total                        | The total number of connections that can be reused when future requests            |
| rest-template:max-connection-per-route                    | The total number of connections per route that can be reused when future requests  |
| rest-template:max-keep-alive                              | Determines the lifespan of a connection while it is not used                       |
| eureka:instance:statusPageUrlPath                         | Former property no longer in use even in latests V4                                |
| eureka:instance:healthCheckUrlPath                        | Former property no longer in use even in latests V4                                |
| eureka:instance:leaseRenewalIntervalInSeconds             | Former property no longer in use even in latests V4                                |
| eureka:instance:leaseExpirationDurationInSeconds          | Former property no longer in use even in latests V4                                |
| eureka:instance:metadataMap:nativeMimeType                | Former property no longer in use even in latests V4                                |
| eureka:instance:client:enabled                            | Former property no longer in use even in latests V4                                |
| eureka:instance:client:registerWithEureka                 | Former property no longer in use even in latests V4                                |
| eureka:instance:client:fetchRegistry                      | Former property no longer in use even in latests V4                                |
| eureka:instance:client:serviceUrl                         | Former property no longer in use even in latests V4                                |
| eureka:instance:client:serviceUrl:defaultZone             | Former property no longer in use even in latests V4                                |
| app:factoriesBeanNames:pdfFactory                         | PDF converter                                                                      |
| app:factoriesBeanNames:mailFactory                        | Mail converter                                                                     |
| app:factoriesBeanNames:archiveFactory                     | Archive converter                                                                  |
| app:factoriesBeanNames:emptyDocumentConverter             | Empty document conveter                                                            |
| app:alterDocumentContentOperations:split                  | Internal operation name that determines what document transformation process to do |
| app:alterDocumentContentOperations:multiSplit             | Internal operation name that determines what document transformation process to do |
| app:alterDocumentContentOperations:hierarchicalMultiSplit | Internal operation name that determines what document transformation process to do |
| app:alterDocumentContentOperations:convert                | Internal operation name that determines what document transformation process to do |
| app:alterDocumentContentOperations:renderAnnotations      | Internal operation name that determines what document transformation process to do |
| app:alterDocumentContentOperations:renderFDFAnnotations   | Internal operation name that determines what document transformation process to do |
| app:alterDocumentContentOperations:compress               | Internal operation name that determines what document transformation process to do |
| `nurse:components[0]functionality`                          | Mail nurse configuration                                                           |
| `nurse:components[0]factoryName`                            | Mail nurse configuration                                                           |
| `nurse:components[0]samplePath`                             | Mail nurse configuration                                                           |
| `nurse:components[0]docIdStr`                               | Mail nurse configuration                                                           |

#### Renamed properties

| Version 4                                     | Version 2023                                        | Description   |
| --------------------------------------------- | --------------------------------------------------- | ------------- |
| eureka:instance:metadataMap:context           | eureka:instance:metadataMap:context                 | Value changed |
| app:factoriesBeanNames:imageFactory           | app:factoriesBeanNames:imageFactory                 | Value changed |
| app:factoriesBeanNames:textFactory            | app:factoriesBeanNames:pdfboxTextFactory            | Name changed  |
| `nurse:components[1]samplePath`: "video.mp4"    | `nurse:components[1]samplePath`: "video.avi"          | Value changed |
| `nurse:components[2]factoryName`: "textFactory" | `nurse:components[2]factoryName`: "pdfboxTextFactory" | Value changed |

## Document Renderer (JNIPdfEngine module)

### Properties in application.properties file

#### Deleted properties

| Version 4                                                 | Description                                            |
| --------------------------------------------------------- | ------------------------------------------------------ |
| arender.endpoint.metrics.export.document.accessor.enabled | ARender load document accessor endpoint metrics export |
| arender.endpoint.metrics.export.document.size.enabled     | ARender document size endpoint metrics export          |
| arender.endpoint.metrics.export.document.dpi.enabled      | ARender document dpi endpoint metrics export           |

#### Renamed properties

| Version 4                                              | Version 2023                                           | Description                                             |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------- |
| arender.endpoint.metrics.export.alter.document.enabled | arender.endpoint.metrics.export.transformation.enabled | ARender document transformation endpoint metrics export |
| arender.endpoint.metrics.export.video.enabled          | arender.endpoint.metrics.export.get.file.chunk.enabled | ARender file chunk endpoint metrics export              |

### Properties in application.yaml file

#### Deleted properties

| Version 4                                        | Description                                                                       |
| ------------------------------------------------ | --------------------------------------------------------------------------------- |
| eureka:instance:statusPageUrlPath                | Former property no longer in use even in latests V4                               |
| eureka:instance:healthCheckUrlPath               | Former property no longer in use even in latests V4                               |
| eureka:instance:leaseRenewalIntervalInSeconds    | Former property no longer in use even in latests V4                               |
| eureka:instance:leaseExpirationDurationInSeconds | Former property no longer in use even in latests V4                               |
| eureka:client:serviceUrl:defaultZone             | Former property no longer in use even in latests V4                               |
| kubprovider:services:Rendition-Engine:serviceId  | Former property no longer in use even in latests V4                               |
| kubprovider:services:Rendition-Engine:host       | Former property no longer in use even in latests V4                               |
| kubprovider:services:Rendition-Engine:port       | Former property no longer in use even in latests V4                               |
| kubprovider:services:Rendition-Engine:secure     | Former property no longer in use even in latests V4                               |
| kubprovider:services:Rendition-Engine:uri        | Former property no longer in use even in latests V4                               |
| cache:document:maxCacheSize                      | Former property no longer in use even in latests V4                               |
| cache:renderer:cacheDuration                     | Former property no longer in use even in latests V4                               |
| rest-template:connect-timeout                    | Determines the timeout until a new connection is fully established                |
| rest-template:read-timeout                       | Determines the timeout until it finishes reading data bytes from the socket       |
| rest-template:max-connection-total               | The total number of connections that can be reused when future requests           |
| rest-template:max-connection-per-route           | The total number of connections per route that can be reused when future requests |
| rest-template:max-keep-alive                     | Determines the lifespan of a connection while it is not used                      |

## Document Text Handler (PDFBoxEngine module)

### Properties in application.properties file

#### Deleted properties

| Version 4                                                 | Description                                            |
| --------------------------------------------------------- | ------------------------------------------------------ |
| arender.endpoint.metrics.export.document.accessor.enabled | ARender load document accessor endpoint metrics export |
| arender.endpoint.metrics.export.document.size.enabled     | ARender document size endpoint metrics export          |
| arender.endpoint.metrics.export.document.dpi.enabled      | ARender document dpi endpoint metrics export           |

#### Renamed properties

| Version 4                                              | Version 2023                                           | Description                                             |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------- |
| arender.endpoint.metrics.export.alter.document.enabled | arender.endpoint.metrics.export.transformation.enabled | ARender document transformation endpoint metrics export |
| arender.endpoint.metrics.export.video.enabled          | arender.endpoint.metrics.export.get.file.chunk.enabled | ARender file chunk endpoint metrics export              |

### Properties in application.yaml file

#### Deleted properties

| Version 4                                        | Description                                                                       |
| ------------------------------------------------ | --------------------------------------------------------------------------------- |
| eureka:instance:statusPageUrlPath                | Former property no longer in use even in latests V4                               |
| eureka:instance:healthCheckUrlPath               | Former property no longer in use even in latests V4                               |
| eureka:instance:leaseRenewalIntervalInSeconds    | Former property no longer in use even in latests V4                               |
| eureka:instance:leaseExpirationDurationInSeconds | Former property no longer in use even in latests V4                               |
| eureka:client:serviceUrl:defaultZone             | Former property no longer in use even in latests V4                               |
| rest-template:connect-timeout                    | Determines the timeout until a new connection is fully established                |
| rest-template:read-timeout                       | Determines the timeout until it finishes reading data bytes from the socket       |
| rest-template:max-connection-total               | The total number of connections that can be reused when future requests           |
| rest-template:max-connection-per-route           | The total number of connections per route that can be reused when future requests |
| rest-template:max-keep-alive                     | Determines the lifespan of a connection while it is not used                      |

#### Renamed properties

| Version 4                           | Version 2023                        | Description   |
| ----------------------------------- | ----------------------------------- | ------------- |
| eureka:instance:metadataMap:context | eureka:instance:metadataMap:context | Value changed |
