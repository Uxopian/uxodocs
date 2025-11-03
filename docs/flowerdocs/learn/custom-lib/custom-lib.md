---
title: "Customised library"
description: "Develop a Java library to override a Core behavior."
date: "2020-02-01T12:20:01+02:00"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



# Goal

In this module, we will develop a Java library enabling us to override a native **FlowerDocs Core** behavior: user token generation during authentication.

In fact, we are going to add to each user token a custom attribute named `custom`.

# Library development

## Maven project

To start developing the custom library, first open your favorite IDE, then create a new Maven project from the following POM.
In this module, we will need the following two dependencies: 

* Spring Boot: to take advantage of the framework's configuration mechanisms, so that the library can be used by **FlowerDocs Core**
* FlowerDocs Core Services to override the default token generator used by the service layer


<Tabs>
  <TabItem value="pom-xml" label="pom.xml">

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	&lt;modelVersion&gt;4.0.0</modelVersion>
    &lt;groupId&gt;com.flower.docs.samples</groupId>
	&lt;artifactId&gt;flower-docs-lib-sample</artifactId>
    &lt;version&gt;0.0.1-SNAPSHOT</version>
	&lt;dependencies&gt;
		&lt;dependency&gt;
			&lt;groupId&gt;org.springframework.boot</groupId>
			&lt;artifactId&gt;spring-boot-starter-web</artifactId>
			&lt;version&gt;</version>
		</dependency>
		&lt;dependency&gt;
			&lt;groupId&gt;com.flower.docs.core</groupId>
			&lt;artifactId&gt;flower-docs-services</artifactId>
			&lt;version&gt;</version>
		</dependency>
	</dependencies>
</project>
```


```

  </TabItem>
</Tabs>


## Token generator

In this module, we want to add a `custom` attribute to users authenticating to FlowerDocs.
To do this, we will override the `JWTTokenHelper` token generator used by **FlowerDocs Core** by default.

<Tabs>
  <TabItem value="customtokenhelper-java" label="CustomTokenHelper.java">

```java
package com.flower.samples;

import com.flower.docs.domain.security.AuthenticatedUser;
import com.flower.docs.domain.security.IdentityAttribute;
import com.flower.docs.domain.security.Token;
import com.flower.docs.security.token.JWTTokenHelper;
import com.google.common.collect.Lists;

public class CustomTokenHelper extends JWTTokenHelper

    @Override
    public Token generate(AuthenticatedUser user, long validityTime)

        user.getAttributes().add(new IdentityAttribute("custom", Lists.newArrayList("value")));
        return super.generate(user, validityTime);


```

  </TabItem>
</Tabs>



## Auto-configuration

In order for the library to define the previously added token generator, we are going to use Spring Boot's [Auto-configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/using-spring-boot.html#using-boot-auto-configuration) mechanism.
Our configuration class will automatically instantiate a `CustomTokenHelper` object and supply it to the Spring Beans context.

<Tabs>
  <TabItem value="samplelibautoconfiguration-java" label="SampleLibAutoConfiguration.java">

```java
package com.flower.samples;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class SampleLibAutoConfiguration

    @Bean
    @Primary
    CustomTokenHelper customTokenHelpder()

        return new CustomTokenHelper();


```

  </TabItem>
</Tabs>


For this configuration class to be loaded automatically by the Auto-configuration mechanism, it must be referenced in a `META-META-INF/spring.factories` file. 
With Maven, this file must be placed in the `src/main/resources` directory of your project.

<Tabs>
  <TabItem value="src-main-resources-meta-inf-spring-factories" label="src/main/resources/META-INF/spring.factories">

```properties
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
com.flower.samples.SampleLibAutoConfiguration
```

  </TabItem>
</Tabs>


## Compilation

To compile the library, use your IDE with the `clean` and `install` goals or run the `mvn clean install` command at the root of your project.

# Modification of the classpath

## Linux service

When the Core is started as a Linux service (as shown [here](/install/start.md) ), the `libs` folder is added to the JVM classpath launched by the service.
All JARs included in this directory will be added to the JVM classpath.

All you need to do is copy the library into this directory with the same user as the one with whom the service is launched (or who has read rights on the file).

## Executable JAR

When the Core is started as an executable JAR with a command such as `java -jar`, the custom library must be manually added to the JVM classpath. 
To do this, use the `-cp` parameter.

# Test

* Generate a token (e.g. using Swagger `/core/swagger-ui/index.html`) using the: 
    * Scope
    * User identifier
    * Password

* From the generated token: 
    * Open a browser and go to [jwt.io](https://jwt.io/) 
    * Paste the generated token into the _Encoded_ field

The `custom` attribute added by the `CustomTokenHelper` object is indeed present in the attributes added to the token.

