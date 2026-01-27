---
title: Implementation
sidebar_position: 1
date: "2020-02-01T11:20:01+02:00"
last_update:
  date: '2026-01-27T09:19:20.024Z'
  author: CI/CD Bot
content_hash: 165d34f3ebc0316baacf0d431fb155cc5f340f214d9b389945ae5a148d94ebf2
---

# Goal

The aim of this training module is to lay the foundations for the development of a secured [GUI plugin](configuration).
This plugin can be consumed from and through **FlowerDocs GUI**. It will expose a service consuming the services exposed by **FlowerDocs Core**.

# Prerequisites

This tutorial is based on Maven and requires the use of the Arondor Artifactory in which the FlowerDocs libraries are implemented.
If you are extern to Arondor, please ask the FlowerDocs support to get the mentioned librairies.

# Set up

## Project creation

Using your favorite IDE, start by creating a new Maven project with the following POM:

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	&lt;modelVersion&gt;4.0.0</modelVersion>

    &lt;groupId&gt;com.flower.docs.samples</groupId>
    &lt;artifactId&gt;secured-gui-plugin</artifactId>
    &lt;version&gt;0.0.1-SNAPSHOT</version>

	&lt;dependencies&gt;
		&lt;dependency&gt;
			&lt;groupId&gt;com.flower.docs</groupId>
			&lt;artifactId&gt;flower-docs-starter-client</artifactId>
			&lt;version&gt;</version>
		</dependency>
	</dependencies>

	&lt;build&gt;
		&lt;plugins&gt;
			&lt;plugin&gt;
				&lt;groupId&gt;org.springframework.boot</groupId>
				&lt;artifactId&gt;spring-boot-maven-plugin</artifactId>
				&lt;version&gt;</version>
				&lt;executions&gt;
					&lt;execution&gt;
						&lt;goals&gt;
							&lt;goal&gt;repackage</goal>
							&lt;goal&gt;build-info</goal>
						</goals>
					</execution>
				</executions>
				&lt;configuration&gt;
					&lt;executable&gt;true</executable>
				</configuration>
			</plugin>
		</plugins>
	</build>
</project>
```

````

## Spring Boot application

This Spring Boot application is based on the [Spring Boot starter](/docs/flowerdocs/apis/core/java) provided by FlowerDocs.

To start with, we need a _main class_ Spring Boot annotated with the `@SpringBootApplication` annotation:

```java
package com.flower.samples;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.flower.docs.FlowerDocsClient;
import com.flower.docs.SecurityMode;

@SpringBootApplication
@FlowerDocsClient(security = SecurityMode.TOKEN)
public class SecuredGUIPlugin

	public static void main(String[] args)

		SpringApplication.run(SecuredGUIPlugin.class, args);

````

Here, the `@FlowerDocsClient` annotation automatically configures:

- the Java client for consuming the web services exposed by **FlowerDocs Core**
- secure requests: a token is required to consume the `@RestController` exposed by the application

<br/>
To configure the application, this `application.properties` file in the `src/main/resources` directory of your project.

## Configuration

````bash

```properties
spring.application.name=secured-gui-plugin
server.port=2802
server.servlet.context-path=/secured
ws.url=http://localhost:8081/core/services
````

````
:::info
The other configuration options offered by the Spring Boot framework can also be used.
This makes it possible to outsource application configuration.
:::

## Web service development

In this example, the web service will count the number of documents accessible by the logged-in user.
The web service will be implemented using the `@RestController` Spring annotation.

```java
package com.flower.samples;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flower.docs.domain.exception.FunctionalException;
import com.flower.docs.domain.exception.TechnicalException;
import com.flower.docs.domain.search.SearchRequest;
import com.flower.docs.service.api.document.DocumentService;

@RestController
public class FlowerRestController

	@Autowired
	private DocumentService documentService;

	@GetMapping("/count")
	public String count() throws TechnicalException, FunctionalException

		return "documents: " + documentService.search(new SearchRequest()).getFound();

````

Here, the `documentService` document management service is used to determine the total number of documents.
