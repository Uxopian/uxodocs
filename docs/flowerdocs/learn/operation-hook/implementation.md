---
title: Implementation
sidebar_position: 1
date: "2020-02-01T11:20:01+02:00"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: 72aced13cdc85427109afe20fe7e9e56ece87488bbf0be269cfe0d7e5ecd5255
---

:::info
This tutorial is based on Maven and requires the use of the Arondor Artifactory in which the FlowerDocs libraries are implemented.
If you are extern to Arondor, please ask the FlowerDocs support to get the mentioned librairies.

When you have completed this training module, you will be able to develop a secure [`OperationHook`](/docs/flowerdocs/concepts/operation) to respond to the creation of documents and rename them automatically.
:::

## Project creation

Using your favorite IDE, start by creating a new Maven project with the following POM:

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<groupId>com.flower.docs.samples</groupId>
	<artifactId>modify-operation-hook</artifactId>
	<version>0.0.1-SNAPSHOT</version>

	<dependencies>
		<dependency>
			<groupId>com.flower.docs</groupId>
			<artifactId>flower-docs-starter-client</artifactId>
			<version>{{version}}</version>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
				<version>2.7.18</version>
				<executions>
					<execution>
						<goals>
							<goal>repackage</goal>
							<goal>build-info</goal>
						</goals>
					</execution>
				</executions>
				<configuration>
					<executable>true</executable>
				</configuration>
			</plugin>
		</plugins>
	</build>
</project>
```

## Spring Boot application

This Spring Boot application is based on the [Spring Boot starter](/docs/flowerdocs/apis/core/java) provided by FlowerDocs.

* To start with, we need a _main class_ Spring Boot annotated with the `@SpringBootApplication` annotation:

```java
package com.flower.samples;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.flower.docs.FlowerDocsClient;
import com.flower.docs.SecurityMode;

@SpringBootApplication
@FlowerDocsClient(security = SecurityMode.USER)
public class ModifyHookApplication
{
    public static void main(String[] args)
    {
        SpringApplication.run(ModifyHookApplication.class, args);
    }
}
```

- Then add the `application.properties` file to your project's `src/main/resources` directory to configure the application:

```properties
spring.application.name=modify-hook        // 1
server.port=7777                            // 2
server.servlet.context-path=/modify        // 3

ws.url=http://localhost:8081/core/rest  // 5

internal.realm.users[0].id=<user>          // 7
internal.realm.users[0].password=<password> // 8
```

1. Spring Boot application name
2. Port used to expose WEB application
3. Application path. The application can be accessed via the basic URL _http://localhost:7777/modify_
5. URL for accessing the web services exposed by FlowerDocs Core.
7. User identifier for accessing the `OperationHook`.
8. User password for accessing the `OperationHook`

## Hook development

Now we move on to `Operation Hook`! To implement your first hook, create a `ModifyOperationHook` class such as:

```java
package com.flower.samples;

import org.springframework.web.bind.annotation.RestController;     // 13
import org.terracotta.statistics.Time;

import com.flower.docs.domain.component.Component;
import com.flower.docs.domain.exception.FunctionalException;
import com.flower.docs.domain.exception.TechnicalException;
import com.flower.docs.operation.api.DefaultComponentOperationContext;
import com.flower.docs.operation.api.OperationContext;
import com.flower.docs.operation.api.OperationHook;

@RestController
public class ModifyOperationHook extends OperationHook   // 14
{
    @Override
    public void process(OperationContext context) throws TechnicalException, FunctionalException   // 17
    {
        if (context instanceof DefaultComponentOperationContext)   // 17
        {
            DefaultComponentOperationContext componentContext = (DefaultComponentOperationContext) context;
            for (Component component : componentContext.getComponents())
            {
                component.setName(component.getName() + "_" + Time.absoluteTime());   // 24
            }
        }
    }
}
```

13. The `@RestController` annotation defines the hook as a REST web service exposed on `/`
14. The `ModifyOperationHook` class extends the `OperationHook` class, making it easier to implement a hook using the Spring Boot framework
17. The `process` method must be implemented to define the behavior following the execution of an operation within FlowerDocs Core
17. The `OperationHook` reacts only to `DefaultComponentOperationContext` class contexts
24. Each component of the operating context is renamed using the current date
