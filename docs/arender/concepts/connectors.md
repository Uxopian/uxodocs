---
title: Connectors
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /concepts/connectors
sidebar_position: 2
content_hash: 7bbe07ff2d2950494986ae41aca74a23d30a9a02c807bad16b190989b74fe958
---

# Connectors

A connector is a pluggable JAR that integrates ARender with a document source. Connectors implement the `DocumentAccessor` interface to fetch documents from external repositories and make them available to the viewer.

## How connectors work

When a user opens a document, the viewer delegates retrieval to a connector. The connector:

1. Receives a document identifier (URL parameters, repository-specific ID)
2. Connects to the external system using its native API
3. Returns a `DocumentAccessor` that provides the document content stream
4. Optionally provides an `AnnotationAccessor` for annotation storage in the external system

Connectors are loaded as Spring Boot auto-configured beans. Each connector JAR includes a `META-INF/spring.factories` file that registers its configuration class.

## Connector types

ARender has two kinds of connectors:

**Repository connectors** connect directly to a document management system to fetch document content.

**UI plugin connectors** integrate with the user interface of an ECM platform. They do not fetch documents directly. Instead, they bridge the ECM's UI and ARender by generating the correct URL so that the document opens in the ARender viewer. The actual document retrieval then happens through a repository connector.

## Available connectors

### Uxopian-maintained connectors

These connectors are developed and supported by Uxopian. Each has a dedicated integration guide.

| Connector | ECM | Type | Guide |
|-----------|-----|------|-------|
| CMIS | Any CMIS-compliant system (incl. Alfresco) | Repository | [CMIS](../guides/integration/cmis.md) |
| Alfresco Share plugin | Alfresco Share | UI plugin | [Alfresco](../guides/integration/alfresco.md) |
| IBM FileNet CE | IBM FileNet P8 | Repository | [FileNet](../guides/integration/ibm-filenet.md) |
| IBM Content Navigator plugin | IBM Content Navigator | UI plugin | [ICN](../guides/integration/ibm-content-navigator.md) |
| IBM Content Manager | IBM CM 8.1+ | Repository | [Content Manager](../guides/integration/ibm-content-manager.md) |
| M-Files | M-Files | Repository + VAF | [M-Files](../guides/integration/m-files.md) |

### Partner-maintained connectors

These connectors are developed and supported by integration partners. Contact the partner for documentation and support.

| ECM | Partner |
|-----|---------|
| Hyland Nuxeo | [Hyland](https://www.hyland.com/) |
| Alfresco Process Services | [Hyland](https://www.hyland.com/) |
| OpenText Documentum | [OpenText](https://www.opentext.com/) |
| Tessi Docubase / Data Content | [Tessi](https://www.tessi.eu/) |
| Extedo EXTEDOpulse / esubmanager | [Extedo](https://www.extedo.com/) |
| Salesforce | [Salesforce](https://www.salesforce.com/) |

### Annotation storage connectors

| Connector | Storage | Format |
|-----------|---------|--------|
| JDBC | SQL database (SQL Server, HSQLDB) | XFDF via JDBC |
| REST | HTTP endpoint | XFDF via REST |
| FileNet | FileNet database via native P8 API | Native FileNet annotation objects containing XFDF content |
| CMIS (Alfresco) | Alfresco folders via CMIS | XFDF files stored as CMIS documents |
| XFDF | Local filesystem | Native XFDF files |

## Connector packaging

Connectors are packaged as fat JARs using the `maven-assembly-plugin` with the `-jar-with-dependencies` classifier. To add a connector to an ARender deployment, place its JAR in the viewer's classpath (typically `/home/arender/lib/`).

## Configuration

Each connector is configured via Spring properties or XML beans. Common patterns:

- Connection URL and credentials for the external system
- Document metadata mapping
- Annotation format conversion settings
- Role-based access control (CMIS connector supports permission mapping)

See the individual connector guides under [Integration guides](../guides/integration/alfresco.md) for setup instructions.

## DocumentAccessor interface

All connectors implement the `DocumentAccessor` interface, which provides the document content stream, metadata, and optional annotation storage. For the full interface definition and how to implement it, see [Custom connector development](../custom-connector/custom-connector.md).

## Next steps

- [Custom connector development](../custom-connector/custom-connector.md)
- [Alfresco integration guide](../guides/integration/alfresco.md)
- [CMIS integration guide](../guides/integration/cmis.md)
- [IBM FileNet integration guide](../guides/integration/ibm-filenet.md)
- [IBM Content Navigator integration guide](../guides/integration/ibm-content-navigator.md)
- [IBM Content Manager integration guide](../guides/integration/ibm-content-manager.md)
- [M-Files integration guide](../guides/integration/m-files.md)
