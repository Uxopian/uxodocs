---
title: Implementation
date: '2020-02-01T11:20:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: b39fd7968bf26e3e6654412b538451bc7b321a11db0a21e69243ab639d87d169
---


:::info
This tutorial is based on Maven and requires the use of the Arondor Artifactory in which the FlowerDocs libraries are implemented.
If you are extern to Arondor, please ask the FlowerDocs support to get the mentioned librairies.

When you have completed this training module, you will be able to develop a secure [`OperationHook`](/concepts/operation.md) to respond to the creation of documents and rename them automatically.
:::


# Project creation

Using your favorite IDE, start by creating a new Maven project with the following POM: 

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	&lt;modelVersion&gt;4.0.0</modelVersion>

    &lt;groupId&gt;com.flower.docs.samples</groupId>
    &lt;artifactId&gt;modify-operation-hook</artifactId>
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


```

# Spring Boot application

This Spring Boot application is based on the [Spring Boot starter](/apis/core/java.md) provided by FlowerDocs.

* To start with, we need a _main class_ Spring Boot annotated with the `@SpringBootApplication` annotation: 


package com.flower.samples;

```javascript
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
```

```javascript
import com.flower.docs.FlowerDocsClient;
import com.flower.docs.SecurityMode;
```

@SpringBootApplication
@FlowerDocsClient(security = SecurityMode.USER)
public class ModifyHookApplication
```json

    public static void main(String[] args)

        SpringApplication.run(ModifyHookApplication.class, args);


```


* Then add the `application.properties` file to your project's `src/main/resources` directory to configure the application: 


```properties
spring.application.name=modify-hook
server.port=7777
server.servlet.context-path=/modify
```

ws.url=http://localhost:8081/core/services


```properties
internal.realm.users[0].id=<user>
internal.realm.users[0].password=<password>
```


    1 Spring Boot application name

    2 Port used to expose WEB application

    3 Application path. The application can be accessed via the basic URL _http://localhost:7777/modify_

    5 URL for accessing the web services exposed by FlowerDocs Core.

    7 User identifier for accessing the `OperationHook`.

    8 User password for accessing the `OperationHook`


# Hook development

Now we move on to `Operation Hook`! To implement your first hook, create a `ModifyOperationHook` class such as: 


package com.flower.samples;

```javascript
import org.springframework.web.bind.annotation.RestController;
import org.terracotta.statistics.Time;
```

```javascript
import com.flower.docs.domain.component.Component;
import com.flower.docs.domain.exception.FunctionalException;
import com.flower.docs.domain.exception.TechnicalException;
import com.flower.docs.operation.api.DefaultComponentOperationContext;
import com.flower.docs.operation.api.OperationContext;
import com.flower.docs.operation.api.OperationHook;
```

@RestController
public class ModifyOperationHook extends OperationHook
```json

    @Override
    public void process(OperationContext context) throws TechnicalException, FunctionalException

        if (context instanceof DefaultComponentOperationContext)

            DefaultComponentOperationContext componentContext = (DefaultComponentOperationContext) context;
            for (Component component : componentContext.getComponents())

                component.setName(component.getName() + "_" + Time.absoluteTime());




```


13 The `@RestController` annotation defines the hook as a REST web service exposed on `/`

14 The `ModifyOperationHook` class extends the `OperationHook` class, making it easier to implement a hook using the Spring Boot framework

17 The `process` method must be implemented to define the behavior following the execution of an operation within FlowerDocs Core

17 The`OperationHook` reacts only to `DefaultComponentOperationContext` class contexts

24 Each component of the operating context is renamed using the current date

