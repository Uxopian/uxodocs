---
title: Java client
description: Consume web services using the Java client.
date: "2001-04-01T13:20:01+02:00"
last_update:
    date: "2025-12-02T14:29:22.460Z"
    author: CI/CD Bot
content_hash: a4921bc135a82d585a78997fc6be0298cdfc917ff6eba71f7074027c069ffa34
---

:::info
The Java client lets you interact with **FlowerDocs Core** through the web services on display.

This documentation is based on the use of [Maven](https://maven.apache.org/) and [Spring Boot ] (https://spring.io/projects/spring-boot).
:::

# Set-up

## Maven

The libraries required for this Java client are published in the [Artifactory Arondor](https://artifactory.arondor.cloud/artifactory/arondor-release).
If you are extern to Arondor, please ask the FlowerDocs support to get the mentioned librairies.

To use the Java client in a Maven project, start by adding the following dependency :

```xml
<dependency>
    <groupId>com.flower.docs</groupId>
    <artifactId>flower-docs-starter-client</artifactId>
    <version></version>
</dependency>
```

This dependency draws the necessary dependencies to start a FlowerDocs client project.

## Spring Boot application

To define your Spring Boot application as a FlowerDocs client, add the `@FlowerDocsClient` annotation to the main class as :

```java
@SpringBootApplication
@FlowerDocsClient
public class SampleClient

    public static void main(String[] args)

        SpringApplication.run(SampleClient.class, args);


```

This annotation is used to initialize the configuration required to initialize a FlowerDocs client. For the client to start up, the `ws.url` property must be defined in the _application.properties_ file with the URL for access to the web services displayed by FlowerDocs.

# Authentification

Calls to **FlowerDocs Core** require requests to be authenticated. A request can be authenticated by providing a FlowerDocs-specific user token.

## Service account

The development of an application that interacts with FlowerDocs generally requires the use of a service account used to perform operations with **FlowerDocs Core**.

To this end, the Java client provides a utility class to simplify authentication management.

```java
@Autowired
private Authenticator authenticator;
...
authenticator.authenticate("scopeId");
```

The configuration of the account used is done through the properties :

```properties
flower.user=<identifiant de l'utilisateur>
flower.password=<mot de passe>
```

_These properties can either be passed in the Spring `application.properties` configuration file or as JVM properties._

## Token generation

A user token can also be dynamically generated using the `AuthenticationService` service, which exposes the `login` method#login) :

```java
@Autowired
AuthenticationService service;
...
ContextHelper.setScope(new Id("GEC"));
Token token = service.login("user","password");
```

# Development

## Access to services

Access to FlowerDocs services is based on the Spring context. To retrieve a service instance, simply use the [@Autowired] annotation (https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/beans/factory/annotation/Autowired.html).

For example, to access the document management service :

```java
@Autowired
private DocumentService documentService;
```

## Log management

FlowerDocs APIs are based on the log framework abstraction layer [SLF4J](https://www.slf4j.org/). This framework abstracts from the logging framework used. The default implementation is [Logback](https://logback.qos.ch/).

<br/>
To instantiate a logger, simply :

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
...
private static final Logger LOGGER = LoggerFactory.getLogger(SampleClient.class);
...
LOGGER.info("Found {} documents", response.getFound());

```

:::info
The configuration of log levels is identical to that of FlowerDocs: [Logs](/docs/flowerdocs/config/exploit/logs)
:::

# Define protocol

By default FlowerDocs APIs are using SOAP protocol.
<br/>
However it is possible to choose using REST APIs configuring your application.
Add a property `rest.client.enabled` with value `true` in a _`application.properties`_ file.
