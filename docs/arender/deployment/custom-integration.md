---
title: Custom integration files
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /deployment/custom-integration
sidebar_position: 6
content_hash: dacb93d27ade8d2979a7b7611d7f9a758172b3d573ba7a1aaf81730be6904dee
---

# Custom integration files

ARender ships two empty XML files dedicated to custom Spring bean configuration. Because these files are always empty in each new release, they prevent merge conflicts during upgrades and keep your customizations cleanly separated from the default ARender XML.

## Files and scope

| File | Scope | Description |
|------|-------|-------------|
| `configurations/arender-custom-integration.xml` | Client side (GUI) | Override or declare Spring beans that control the viewer UI layer. |
| `configurations/arender-custom-server-integration.xml` | Server side | Override or declare Spring beans for server-side behavior (document providers, security filters, custom services). |

Both files are imported by ARender at startup through Spring's XML import mechanism. Any bean you define or override in these files takes effect without modifying internal ARender XML.

## How Spring Boot loads these files

At startup the ARender Spring Boot application imports both XML files from the `configurations/` directory. The import path is resolved relative to the working directory of the application (the directory containing the JAR). In Docker containers this is `/home/arender/`.

The loading sequence is:

1. ARender's internal Spring XML context is initialized.
2. `arender-custom-integration.xml` is imported into the client-side context.
3. `arender-custom-server-integration.xml` is imported into the server-side context.
4. Beans defined in these files override any bean with the same `id` from the internal context.

## Externalizing the XML file location

By default the two files are read from the `configurations/` directory next to the JAR. You can relocate them using environment variables:

| Environment variable | Controls the path of |
|----------------------|----------------------|
| `customXmlClientPath` | `arender-custom-integration.xml` (client side) |
| `customXmlServerPath` | `arender-custom-server-integration.xml` (server side) |

The value must be a Spring resource path. Use the `file:` prefix to point to an absolute filesystem path.

**Example** -- externalize the server-side file:

```properties
customXmlServerPath=file:/opt/config/arender-server-configuration.xml
```

### Docker

Pass the variable through the `environment` section and mount the file:

```yaml
services:
  ui:
    image: artifactory.arondor.cloud:5001/arender-ui-springboot
    environment:
      customXmlServerPath: "file:/home/arender/custom/arender-server-configuration.xml"
      customXmlClientPath: "file:/home/arender/custom/arender-custom-integration.xml"
    volumes:
      - ./custom/arender-server-configuration.xml:/home/arender/custom/arender-server-configuration.xml
      - ./custom/arender-custom-integration.xml:/home/arender/custom/arender-custom-integration.xml
```

### Kubernetes (Helm)

Set the variables in `values.yaml` under the `env` block of the relevant service, and mount the files via a ConfigMap or Secret volume.

## Using environment variables inside XML beans

Spring's property placeholder resolution works inside custom integration XML. You can reference environment variables (or properties from `application-integrator.properties`) with the `${...}` syntax:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-boot-2.0.xsd">

    <bean id="exampleBean" class="com.example.MyCustomProvider">
        <property name="endpoint" value="${MY_CUSTOM_ENDPOINT:http://localhost:8080}" />
        <property name="timeout" value="${MY_CUSTOM_TIMEOUT:30000}" />
    </bean>

</beans>
```

The `${VAR:default}` syntax provides a fallback value when the variable is not set. This lets you keep a single XML file across environments and vary behavior through environment variables alone.

## Practical guidelines

- **Always use the custom integration files** for bean overrides instead of editing internal ARender XML. This guarantees a clean upgrade path.
- **Prefer environment variables** for values that change between environments (URLs, credentials, timeouts). Define the bean structure in the XML and inject values via `${...}` placeholders.
- **Keep one file per scope.** Put client-side beans in `arender-custom-integration.xml` and server-side beans in `arender-custom-server-integration.xml`. Mixing scopes causes beans to load in the wrong context.
- **Externalize the file path** with `customXmlClientPath` / `customXmlServerPath` when your deployment model does not allow writing to the `configurations/` directory (common in containerized setups).

## Related pages

- [Configuration system](./configuration-system.md): full precedence hierarchy and override strategy
- [Environment variables](./environment-variables.md): naming conventions and per-service prefixes
- [Docker Compose deployment](./docker-compose.md): container-based deployment
- [Kubernetes Helm deployment](./kubernetes-helm.md): Helm chart configuration
