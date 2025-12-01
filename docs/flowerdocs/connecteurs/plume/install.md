---
title: Installation
date: '2001-03-28T13:20:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 265f6d25ba31a20cc18cccb4ee37663681927c4a55fee346a8f34953a7e59dbc
---


Two types of packaging are supplied: 

* WAR (to be deployed on the same application server as the GUI)
* Executable JAR

# WAR 

When Plume is deployed as a WEB application in a servlet container, a `plume.config.dir` property must be added to the JVM. This property must refer to the directory in which the configuration file `plume.properties` is stored.

The name of the configuration file can be changed by adding the property `spring.config.name` with the file name (without extension) as the value. 

# Executable JAR 

Application configuration is based on Spring Boot mechanisms. 
Properties for configuring Plume and its connectors can be provided in a number of ways: 

* By a JVM property : 

	```javascript
	java -D<name>=<value> -jar plume-<version>.jar
	```

* By a property file. The name of this file (without extension) must be supplied as a JVM property `spring.config.name`. At runtime, Spring will search for this file in the following directories: 
	* The `/config`  subdirectory of the current (/ runtime) directory
	* The current directory
