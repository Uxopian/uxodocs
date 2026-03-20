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

## Practical guidelines

- **Always use the custom integration files** for bean overrides instead of editing internal ARender XML. This guarantees a clean upgrade path.
- **Keep one file per scope.** Put client-side beans in `arender-custom-integration.xml` and server-side beans in `arender-custom-server-integration.xml`. Mixing scopes causes beans to load in the wrong context.

## Related pages

- [Configuration system](./configuration-system.md): full precedence hierarchy and override strategy
- [Environment variables](./environment-variables.md): naming conventions and per-service prefixes
- [Docker Compose](./docker-compose.md): container-based deployment
- [Kubernetes Helm](./kubernetes-helm.md): Helm chart configuration
