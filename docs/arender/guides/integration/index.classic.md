---
title: Integration
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
slug: /guides/integration
sidebar_position: 0
content_hash: 7a9bc417974285decd75a2f66f5c65a08e262f75cb8b0b5617d36dd5fdaa3193
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
