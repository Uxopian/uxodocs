---
title: Import ARender dependencies
sidebar_position: 16
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
content_hash: a539e7132ba9b5eaa1967124d755c1691c10fa36a24fa138c7ab3d9136aea924
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

````cfg

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  &lt;modelVersion&gt;4.0.0</modelVersion>
  &lt;parent&gt;
    &lt;groupId&gt;com.arondor.test</groupId>
    &lt;artifactId&gt;my-parent-pom</artifactId>
    &lt;version&gt;0.0.1-SNAPSHOT</version>
  </parent>

  &lt;artifactId&gt;custom-arender-connector</artifactId>
  &lt;packaging&gt;jar</packaging>

  &lt;dependencyManagement&gt;
    &lt;dependencies&gt;
      &lt;dependency&gt;
        &lt;groupId&gt;com.arondor.arender</groupId>
        &lt;artifactId&gt;arender-bom-web-ui</artifactId>
        &lt;version&gt;${arender.version}</version>
        &lt;type&gt;pom</type>
        &lt;scope&gt;import</scope>
      </dependency>
    </dependencies>
  </dependencyManagement>

  &lt;dependencies&gt;
    &lt;dependency&gt;
      &lt;groupId&gt;org.springframework.security</groupId>
      &lt;artifactId&gt;spring-security-oauth2-client</artifactId>
      &lt;scope&gt;provided</scope>
    </dependency>

    &lt;dependency&gt;
      &lt;groupId&gt;javax.servlet</groupId>
      &lt;artifactId&gt;javax.servlet-api</artifactId>
      &lt;scope&gt;provided</scope>
    </dependency>
  </dependencies>

</project>
````

```


```

```


```

```


```

We can see here the import of the BOM in the dependencyManagement and the use
of some dependencies which do not have a defined version. Indeed, maven will
automatically know to retrieve the version defined in the BOM and use it.
