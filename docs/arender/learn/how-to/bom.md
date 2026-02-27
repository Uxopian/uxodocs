---
title: Import ARender dependencies
sidebar_position: 16
last_update:
  date: '2026-02-05T13:50:19.106Z'
  author: CI/CD Bot
content_hash: 772543ace498ff7c11583b7ff3c8f8bd185f1defe2bb96983a2e773d7e1dc34d
---

This feature is available from version 4.4.0

## Introduction

The ARender BOM is simply a POM file containing some of the ARender dependencies defined
in a dependencyManagement. Among other things, it makes possible to a project using ARender
libraries to always be sure to use the same versions of third-party libraries as ARender.
The advantage is that the BOM is importable and then leaves the possibility for a project
to have another parent POM.

# ARender BOM

There are a total of 3 BOMs available: the web-ui, the rendition and the root which
is the parent pom and which therefore contains the libraries common to the web-ui and to the
rendition.

```cfg
<dependency>
	<groupId>com.arondor.arender</groupId>
	<artifactId>arender-bom-root</artifactId>
	<version>${arender.version}</version>
</dependency>

<dependency>
	<groupId>com.arondor.arender</groupId>
	<artifactId>arender-bom-web-ui</artifactId>
	<version>{arender.version}</version>
</dependency>

<dependency>
	<groupId>com.arondor.arender</groupId>
	<artifactId>arender-bom-rendition</artifactId>
	<version>{arender.version}</version>
</dependency>
```

### Example

```cfg

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>com.arondor.test</groupId>
    <artifactId>my-parent-pom</artifactId>
    <version>0.0.1-SNAPSHOT</version>
  </parent>

  <artifactId>custom-arender-connector</artifactId>
  <packaging>jar</packaging>

  <dependencyManagement>
    <dependencies>
      <dependency>
        <groupId>com.arondor.arender</groupId>
        <artifactId>arender-bom-web-ui</artifactId>
        <version>${arender.version}</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>
    </dependencies>
  </dependencyManagement>

  <dependencies>
    <dependency>
      <groupId>org.springframework.security</groupId>
      <artifactId>spring-security-oauth2-client</artifactId>
      <scope>provided</scope>
    </dependency>

    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <scope>provided</scope>
    </dependency>
  </dependencies>

</project>
```

```


```

```


```

```


```

We can see here the import of the BOM in the dependencyManagement and the use
of some dependencies which do not have a defined version. Indeed, maven will
automatically know to retrieve the version defined in the BOM and use it.
