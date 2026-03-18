---
title: Integration
slug: /guides/integration
sidebar_position: 0
---

# Integrations and connectors catalog

ARender integrates with document management systems through two mechanisms:

- **Repository connectors** fetch documents from an external system and produce a `DocumentAccessor`. They are part of ARender.
- **UI plugins** are installed in the ECM's own interface and open documents in ARender by generating the correct viewer URL. They are part of the ECM, not ARender — the actual document retrieval goes through a repository connector.

For what a connector is at the conceptual level, see [Connectors concept](../../concepts/connectors.md).

## Repository connectors

These connectors are developed and supported by Uxopian.

| Connector | ECM | Guide |
|-----------|-----|-------|
| CMIS | Any CMIS-compliant system (incl. Alfresco) | [CMIS guide](./cmis.md) |
| IBM FileNet CE | IBM FileNet P8 | [FileNet guide](./ibm-filenet.mdx) |
| IBM Content Manager | IBM CM 8.1+ | [Content Manager guide](./ibm-content-manager.md) |
| M-Files | M-Files | [M-Files guide](./m-files.md) |

## ECM UI plugins

These plugins are installed in the ECM's interface. They are **not** connectors — they generate ARender URLs and rely on a repository connector for document retrieval.

| Plugin | ECM | Uses connector | Guide |
|--------|-----|----------------|-------|
| Alfresco Share plugin | Alfresco Share | CMIS | [Alfresco guide](./alfresco.mdx) |
| IBM Content Navigator plugin | IBM Content Navigator | FileNet CE | [ICN guide](./ibm-content-navigator.mdx) |

## Partner-maintained integrations

These integrations are developed and supported by partners. Contact the partner for documentation and support.

| ECM | Partner |
|-----|---------|
| Hyland Nuxeo | [Hyland](https://www.hyland.com/) |
| Alfresco Process Services | [Hyland](https://www.hyland.com/) |
| OpenText Documentum | [OpenText](https://www.opentext.com/) |
| Tessi Docubase / Data Content | [Tessi](https://www.tessi.eu/) |
| Extedo EXTEDOpulse / esubmanager | [Extedo](https://www.extedo.com/) |
| Salesforce | [Salesforce](https://www.salesforce.com/) |

## Annotation storage

| Connector | Storage | Format |
|-----------|---------|--------|
| JDBC | SQL database (SQL Server, HSQLDB) | XFDF via JDBC |
| REST | HTTP endpoint | XFDF via REST |
| FileNet | FileNet database via native P8 API | Native FileNet annotation objects containing XFDF content |
| CMIS (Alfresco) | Alfresco folders via CMIS | XFDF files stored as CMIS documents |
| XFDF | Local filesystem | Native XFDF files |

See [Annotations concept](../../concepts/annotations.md) for the annotation model and storage details.

## Other integration options

- [Embed the viewer](./embed-viewer.md) in your application via iframe
- [Custom connector development](../../custom-connector/custom-connector.md): build your own connector
