---
title: Configuration system
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /deployment/configuration-system
sidebar_position: 4
content_hash: 149b59bb0dd0fe7865e90d136719e7f46780042e747f77593bf2c94fedc6a555
---

# Configuration system

ARender is built on Spring Boot. All services follow the Spring Boot externalized configuration model, extended with a dedicated `integrator` profile for safe customization. This page describes how configuration sources are resolved and how to override properties at each layer.

## Precedence hierarchy

Spring Boot applies configuration sources in a defined order. Higher sources override lower ones.

**Lowest to highest priority:**

| Priority | Source | Location |
|----------|--------|----------|
| 1 | Internal `application.yml` | Inside the ARender JAR |
| 2 | Internal `application.properties` | Inside the ARender JAR |
| 3 | Internal `application-integrator.yml` | Inside a connector fat JAR |
| 4 | Internal `application-integrator.properties` | Inside a connector fat JAR |
| 5 | External `application.yml` | Next to the JAR or mounted volume |
| 6 | External `application.properties` | Next to the JAR or mounted volume |
| 7 | External `application-integrator.yml` | Next to the JAR or mounted volume |
| 8 | External `application-integrator.properties` | Next to the JAR or mounted volume |
| 9 | Environment variables | OS env, Docker `environment:`, Kubernetes ConfigMap |
| 10 | JVM system properties | `-D` flags passed to `java` |
| 11 | Command-line arguments | `--property=value` passed after the JAR |

A property defined at level 11 always wins over the same property defined at level 1.

## Integrator profile strategy

ARender activates a built-in Spring profile named `integrator`:

```properties
spring.profiles.include=integrator
spring.profiles.active=integrator
```

This means Spring Boot automatically loads `application-integrator.properties` and `application-integrator.yml` from the classpath and from external locations. The integrator profile:

- Loads **in addition** to the base `application.properties`/`application.yml`.
- Overrides only the properties you explicitly redefine.
- Preserves all internal defaults for properties you do not touch.

Use `application-integrator.properties` (or its YAML variant) as your primary override file. This avoids conflicts caused by multiple `application.properties` files on the classpath.

## .properties vs .yml precedence

When both formats exist at the same location, `.properties` takes precedence over `.yml`.

**Example:** both files define the same property:

`application.yml`:
```yaml
arender:
  server:
    rendition:
      hosts: http://broker-a:8761/
```

`application.properties`:
```properties
arender.server.rendition.hosts=http://broker-b:8761/
```

Effective value: `http://broker-b:8761/` — the `.properties` file wins because it has higher precedence than `.yml` at the same location.

This rule applies at every level of the hierarchy: internal base config, internal integrator config, external base config, and external integrator config.

## Connector fat JAR internal properties

Each connector is packaged as a fat JAR (classifier `-jar-with-dependencies`). A connector can embed its own default configuration by including one of:

```
application-integrator.properties
application-integrator.yml
```

at the root of its JAR. Because the `integrator` profile is active, Spring loads these files automatically. They sit at priority levels 3-4 in the hierarchy: above ARender internal defaults but below any external configuration file.

This allows a connector to ship sensible defaults that an integrator can still override by placing an external `application-integrator.properties` alongside the main ARender JAR.

## External configuration locations

### Spring Boot standalone

Place override files next to the ARender JAR:

```
arondor-arender-hmi-springboot-<version>.jar
application-integrator.properties          # or .yml
```

Spring Boot detects and loads these files at startup without any additional flags.

### Docker

Mount override files into the container at `/home/arender/`:

```yaml
services:
  ui:
    image: artifactory.arondor.cloud:5001/arender-ui-springboot
    volumes:
      - ./application-integrator.properties:/home/arender/application-integrator.properties
```

The container working directory is `/home/arender/`, so Spring Boot picks up the file automatically.

### Kubernetes (Helm)

Use the `config.file.extraConfig` field in `values.yaml` to inject raw YAML into the generated `application.yml` ConfigMap:

```yaml
broker:
  config:
    file:
      extraConfig: |
        arender:
          server:
            annotations:
              can:
                create: false
```

For simple key-value overrides, use environment variables instead. See [Environment variables](/docs/arender/deployment/environment-variables).

## The configurations/ folder

The Spring Boot standalone package extracts a `configurations/` directory alongside the JAR:

```
arondor-arender-hmi-spring-boot-package-<version>/
  arondor-arender-hmi-spring-boot-<version>.jar
  configurations/
    arender-custom-client.properties         # viewer UI behavior overrides
    arender-custom-server.properties         # server-side overrides (broker URL, OAuth2, etc.)
    arender-custom-integration.xml           # Spring XML bean overrides (client side)
    arender-custom-server-integration.xml    # Spring XML bean overrides (server side)
  lib/                                       # connector JARs
  public/                                    # static web resources
```

| File | Purpose |
|------|---------|
| `arender-custom-server.properties` | Primary file for server-side property overrides such as `arender.server.rendition.hosts`, OAuth2 settings, and feature flags. |
| `arender-custom-client.properties` | Controls viewer UI behavior: toolbar layout, default zoom, annotation permissions. |
| `arender-custom-integration.xml` | Replaces or extends Spring beans on the client side using XML configuration. |
| `arender-custom-server-integration.xml` | Replaces or extends Spring beans on the server side. |

These files are loaded via Spring's `@PropertySource` and XML import mechanisms and are separate from the `application-integrator.properties` profile-based override. Both approaches can be used together.

## Resolution diagram

```
            ┌─────────────────────────────────┐
            │  11. Command-line arguments      │  ← highest priority
            ├─────────────────────────────────┤
            │  10. JVM -D system properties    │
            ├─────────────────────────────────┤
            │   9. Environment variables       │
            ├─────────────────────────────────┤
            │  7-8. External integrator config │
            ├─────────────────────────────────┤
            │  5-6. External base config       │
            ├─────────────────────────────────┤
            │  3-4. Connector JAR integrator   │
            ├─────────────────────────────────┤
            │  1-2. ARender JAR base config    │  ← lowest priority
            └─────────────────────────────────┘
```

## Practical guidelines

- **Do not edit files inside the ARender JAR.** Use external files or environment variables.
- **Use `application-integrator.properties`** for property overrides. It is the safest approach because it cannot collide with internal `application.properties`.
- **Use environment variables** for deployment-specific values (hostnames, ports, credentials). They sit above file-based configuration in the hierarchy.
- **Use JVM `-D` flags** sparingly, typically for debugging or one-off test runs.
- **Connector defaults** belong inside the connector fat JAR. Integrator overrides belong in external files or environment variables.

## Related pages

- [Environment variables](/docs/arender/deployment/environment-variables): naming conventions and per-service prefixes
- [Spring Boot standalone deployment](/docs/arender/deployment/spring-boot): full standalone setup guide
- [Docker Compose deployment](/docs/arender/deployment/docker-compose): container-based deployment
- [Kubernetes Helm deployment](/docs/arender/deployment/kubernetes-helm): Helm chart configuration
