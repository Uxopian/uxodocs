---
viewer: classic
title: Configuration system
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
slug: /installation/configuration-system
sidebar_position: 4
content_hash: bdfab6964ccf948e0fbdc2407eb6ef9dc782fd44dca41cb628ba80b53d555c12
---

# Configuration system

ARender is built on Spring Boot. All services follow the Spring Boot externalized configuration model. This page describes how configuration sources are resolved and how to override properties at each layer.

## Precedence hierarchy

Spring Boot applies configuration sources in a defined order. Higher sources override lower ones.

**Lowest to highest priority:**

| Priority | Source | Location |
|----------|--------|----------|
| 1 | Internal `application.yml` | Inside the ARender JAR |
| 2 | Internal `application.properties` | Inside the ARender JAR |
| 3 | External `application.yml` | Next to the JAR or mounted volume |
| 4 | External `application.properties` | Next to the JAR or mounted volume |
| 5 | Environment variables | OS env, Docker `environment:`, Kubernetes ConfigMap |
| 6 | JVM system properties | `-D` flags passed to `java` |
| 7 | Command-line arguments | `--property=value` passed after the JAR |

A property defined at level 7 always wins over the same property defined at level 1.

## .properties vs .yml precedence

When both formats exist at the same location, `.properties` takes precedence over `.yml`.

**Example:** both files define the same property:

```yaml title="application.yml"
arender:
  server:
    rendition:
      hosts: http://broker-a:8761/
```

```properties title="application.properties"
arender.server.rendition.hosts=http://broker-b:8761/
```

Effective value: `http://broker-b:8761/` — the `.properties` file wins because it has higher precedence than `.yml` at the same location.

This rule applies at every level of the configuration hierarchy.

## External configuration locations

### Spring Boot standalone

Place override files next to the ARender JAR:

```
arondor-arender-hmi-springboot-{{version}}.jar
application.properties          # or .yml
```

Spring Boot detects and loads these files at startup without any additional flags.

### Docker

Mount override files into the container at `/home/arender/`:

```yaml title="docker-compose.yml"
services:
  ui:
    image: artifactory.arondor.cloud:5001/arender-ui-springboot
    volumes:
      - ./application.properties:/home/arender/application.properties
```

The container working directory is `/home/arender/`, so Spring Boot picks up the file automatically.

### Kubernetes (Helm)

Use the `config.file.extraConfig` field in `values.yaml` to inject raw YAML into the generated `application.yml` ConfigMap:

```yaml title="values.yaml"
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

For simple key-value overrides, use environment variables instead. See [Environment variables](./environment-variables.md).

## The configurations/ folder

The Spring Boot standalone package extracts a `configurations/` directory alongside the JAR:

```
arondor-arender-hmi-spring-boot-package-{{version}}/
  arondor-arender-hmi-spring-boot-{{version}}.jar
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

These files are loaded via Spring's `@PropertySource` and XML import mechanisms.

## Resolution diagram

```
            ┌─────────────────────────────────┐
            │  7. Command-line arguments       │  ← highest priority
            ├─────────────────────────────────┤
            │  6. JVM -D system properties     │
            ├─────────────────────────────────┤
            │  5. Environment variables        │
            ├─────────────────────────────────┤
            │  3-4. External config files      │
            ├─────────────────────────────────┤
            │  1-2. ARender JAR base config    │  ← lowest priority
            └─────────────────────────────────┘
```

## Practical guidelines

- **Do not edit files inside the ARender JAR.** Use external files or environment variables.
- **Use environment variables** for deployment-specific values (hostnames, ports, credentials). They sit above file-based configuration in the hierarchy.
- **Use JVM `-D` flags** sparingly, typically for debugging or one-off test runs.

## Integrator profile

ARender ships a dedicated Spring profile for integrators, which provides additional configuration entry points. This profile is not included in 2026.0.0 — it is planned for 2026.1.0.

## Related pages

- [Environment variables](./environment-variables.md): naming conventions and per-service prefixes
- [Docker Compose](./docker-compose.md): container-based deployment
- [Kubernetes Helm](./kubernetes-helm.md): Helm chart configuration
