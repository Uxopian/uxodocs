---
title: Integration
last_update:
  date: '2026-03-24T08:07:20.846Z'
  author: CI/CD Bot
slug: /guides/integration
sidebar_position: 0
content_hash: c0d437e387b2344c45c475dc9ae391d10393f341c3b07c26c8d5ad5d2d590343
---

# Integrations overview

ARender integrates with document management systems through repository connectors — Java JARs loaded on the viewer's classpath. Each connector implements `DocumentAccessor` and fetches documents using the ECM's native API (CMIS, FileNet P8 CE, HTTP, etc.).

For the conceptual model, see [Connectors concept](../../concepts/connectors.md).

## ARender-maintained integrations

| ECM | Guide |
|-----|-------|
| Alfresco Content Services | [Alfresco integration](./alfresco.md) |
| IBM FileNet P8 | [IBM FileNet integration](./filenet.md) |
| IBM Content Navigator | [IBM Content Navigator integration](./ibm-content-navigator.mdx) |
| Any (custom connector) | [Custom connector development](./custom-connector.md) |

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
