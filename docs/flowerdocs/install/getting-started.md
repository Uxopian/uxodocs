---
title: Before getting started
sidebar_position: 1
date: "2000-03-28T13:20:01+02:00"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: 1693370eb861f44439a10118e9b2d0b1366f96d834f428188dcb47dd28d6c620
---

# Presentation layer

## **FlowerDocs GUI**

**FlowerDocs GUI** is a WEB application providing the presentation layer integrating the ARender viewer interface.
It is based on [Spring Boot](https://spring.io/projects/spring-boot) and WEB technologies (HTML, JavaScript...).

Default port : 8080. It can be overridden using the `server.port` property in the `gui.properties` file.

## **ARender HMI**

[ARender HMI](https://www.uxopian.com/arender), developed by [Uxopian](https://www.uxopian.com), is a WEB application integrated into **FlowerDocs GUI** as an `iframe`. It visualizes documents generated via ARender Rendition Server.

Default port : 8080. It can be overridden using the `server.port` property in the `application.properties` file.


# Service layer

## **FlowerDocs Core**

**FlowerDocs Core** is the **ECM engine**. It is a Java Web application based on [Spring Boot](https://spring.io/projects/spring-boot). It can be used to manage very large quantities of documents (add, delete, update documents, search, dynamic folders, etc.). It exposes **REST** Web Services that are consumed by the various clients:

- the native Web Interface **FlowerDocs GUI**
- third-party applications
- third-party applications, etc.

For data persistence, OpenSearch is used for the metadata part and a storage space for the document content part. Communication with OpenSearch is via its REST API.
Document content is stored according to need, and the exchange protocol depends on the technology being studied.

Integration with a corporate directory (LDAP(s)-type) is required to access information linked to the application's users.

Default port : 8081. It can be overridden using the `server.port` property in the `core.properties` file.

## ARender Rendition Server

[ARender Rendition](https://www.uxopian.com/arender), a product developed by [Uxopian](https://www.uxopian.com), is the rendition engine used to generate images corresponding to the various pages of the documents to be visualized.
This engine exposes a REST API enabling the various elements required for visualization to be retrieved from the client workstation.

Default port : 8761.

# Data

## OpenSearch

OpenSearch engine, a standalone Java application, is used to index and search data. It provides a distributed, multi-entity search engine, as well as NoSQL document storage. FlowerDocs uses these features to store document metadata in the NoSQL part and advanced search engine capabilities for queries on documents, tasks and folders.

Communication is via the OpenSearch REST API over HTTP.

Default port : 9200.

## Content storage

The **contents** of the documents (PDF, Microsoft Office Word, etc.) managed by FlowerDocs are not stored in OpenSearch but on a dedicated storage space which can be :

- a NAS-type file system via **NFS**.
- an object storage service such as **AWS S3** via the REST APIs made available.

<br/>

![Architecture example](/img/flowerdocs/documentation/fd-architecture.png)

## Redis

Redis is an in-memory database used mainly as a message broker.
With FlowerDocs, it is used to manage certain caches as well as for its OperationHandler asynchronous processing queue mechanism.

Default port : 6379.
