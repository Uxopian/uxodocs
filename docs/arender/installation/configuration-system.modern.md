---
title: Configuration system
slug: /installation/configuration-system
sidebar_position: 4
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

Place override files next to the ARender service JAR:

```
arender-document-service-broker-{{version}}.jar
application.properties          # or .yml
```

Spring Boot detects and loads these files at startup without any additional flags.

### Docker

Mount override files into the container at `/home/arender/`:

```yaml title="docker-compose.yml"
services:
  service-broker:
    image: artifactory.arondor.cloud:5001/arender-document-service-broker
    volumes:
      - ./application.properties:/home/arender/application.properties
```

The container working directory is `/home/arender/`, so Spring Boot picks up the file automatically. The same approach works for all ARender service containers.

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

## Related pages

- [Environment variables](./environment-variables.md): naming conventions and per-service prefixes
- [Docker Compose](./docker-compose.md): container-based deployment
