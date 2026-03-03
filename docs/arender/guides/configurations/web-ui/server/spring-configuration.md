---
title: "ARender Web-UI - Spring Boot Configuration"
last_update:
  date: '2026-02-27T10:47:49.798Z'
  author: CI/CD Bot
---

## Overview

ARender is built on **Spring Boot** and supports **external library (connector) loading**.

ARender Web-UI Spring Boot provides:

* Default internal configuration
* A dedicated `integrator` profile for controlled overrides
* Support for both externalized configuration and connector-embedded configuration

This approach ensures predictable configuration resolution while maintaining separation between platform defaults and customer-specific customization.

## Default Configuration Model

The application ships with internal configuration files `application.properties` and/or `application.yml`.

These files define:

* Infrastructure configuration
* Default Spring Boot behavior
* Base system properties required for correct startup

## Integrator Profile Strategy

To allow safe overrides, ARender activates and includes a dedicated Spring profile:

```properties
spring.profiles.include=integrator
spring.profiles.active=integrator
```

This enables support for `application-integrator.properties` and `application-integrator.yml`.

The `integrator` profile:

* Loads in addition to the base configuration
* Overrides only explicitly redefined properties
* Preserves internal defaults for all other settings

This prevents conflicts that may occur when multiple `application.properties` files exist on the classpath.


## Supported Override Mechanisms

### External Configuration

#### Standalone

Place the `application-integrator.properties` (or YAML variant) file next to the ARender JAR file:

```
arondor-arender-hmi-springboot-{VERSION}.jar
application-integrator.properties
```

or

```
arondor-arender-hmi-springboot-{VERSION}.jar
application-integrator.yml
```


Spring Boot will automatically detect and load the `integrator` profile configuration.


#### Docker

Place the `application-integrator.properties` (or YAML variant) file at **/home/arender/** in the arender-ui-springboot container through volume.



## Connector-Embedded Configuration (Fat JAR)

Include one of the following files inside the connector JAR:

```
application-integrator.properties
```

or

```
application-integrator.yml
```

Because the `integrator` profile is active, Spring will load this configuration in addition to the default one.



## Configuration Precedence Model

Spring Boot applies configuration sources according to a defined precedence hierarchy.

Higher sources override lower ones.

### Precedence Order (Lowest → Highest)

1. Internal `application.yml` (inside of ARender JAR)
2. Internal `application.properties` (inside of ARender JAR)
3. Internal `application-integrator.yml` (inside of the connector JAR)
4. Internal `application-integrator.properties` (inside of the connector JAR)
5. External `application.yml` (outside of ARender JAR)
6. External `application.properties` (outside of ARender JAR)
7. External `application-integrator.yml` (outside of ARender JAR)
8. External `application-integrator.properties` (outside of ARender JAR)
9. Environment variables
10. JVM system properties (`-D`)
11. Command-line arguments

## Property Format Precedence

When both formats exist in the same location:

```
application.properties
application.yml
```

The `.properties` file takes precedence over `.yml`.

### Example

`application.yml`

```yaml
server:
  port: 8080
```

`application.properties`

```properties
server.port=9090
```

**Effective value:**

```
server.port=9090
```


## Configuration Resolution Diagram

### High-Level View

```
                +----------------------------+
                |  Command-line arguments    |
                +----------------------------+
                             ↑
                +----------------------------+
                | JVM -D system properties   |
                +----------------------------+
                             ↑
                +----------------------------+
                | Environment variables      |
                +----------------------------+
                             ↑
                +----------------------------+
                | External integrator config |
                +----------------------------+
                             ↑
                +----------------------------+
                | External base config       |
                +----------------------------+
                             ↑
                +----------------------------+
                | Internal integrator config |
                +----------------------------+
                             ↑
                +----------------------------+
                | Internal base config       |
                +----------------------------+
```

Higher blocks override lower blocks.


## Summary

Use the `integrator` profile by creating `application-integrator.properties` or YAML variant in order to safely override configurations without interfering with core application stability.