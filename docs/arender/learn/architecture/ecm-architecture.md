---
title: ECM general architecture (JAR connector)
sidebar_position: 2
last_update:
  date: '2026-03-10T12:51:36.773Z'
  author: CI/CD Bot
content_hash: 0766c1e181bc1b7074597c7a1eb7b311cae40fdd13df542f331331233debe000
---

This page describes the **legacy JAR connector** integration model, where the ECM connector is deployed as a JAR library inside the **ARender Web-UI (Spring Boot)** application. This model is specific to the ARender Web-UI Spring Boot frontend and does not apply to the ARender full ReactJS application.

:::info
Starting with ARender v2026.0.0, a new **REST connector** integration model is also available. That model requires the ARender ReactJS application (standalone or as a web component). See [ECM REST connector architecture](/docs/arender/learn/architecture/ecm-rest-connector-architecture) for details.
:::

## Architecture diagram

![image](/img/arender/diagrams/ARender-Architecture-With-Connector.png)

## How it works

1. The user selects a document in the **ECM UI** (N1). The ECM UI builds an ARender URL containing the document identifier and opens it in the browser.
2. The **Browser** (N2) loads the ARender JavaScript frontend served by the ARender Web-UI (Spring Boot) application and renders the viewer.
3. The **ARender Web-UI** (N3) is a Spring Boot application that embeds the ECM connector as a JAR library in its JVM. When the frontend requests a document, the Web-UI uses the connector to communicate with the ECM backend.
4. The **ECM Backend** (N4) exposes the APIs that the connector calls to retrieve document content, metadata, and annotations. The connector can also create new documents or new versions through these APIs.
5. The **ARender Rendition** (N5) is a Spring Boot service called by the Web-UI to generate page images, extract text, and perform document conversions.

## Component details

| Component | Role | Technology |
|---|---|---|
| **N1 — ECM UI** | Lets the user choose which document to open in ARender | ECM-specific (FileNet, Alfresco, etc.) |
| **N2 — Browser** | Renders the ARender viewer frontend | JavaScript |
| **N3 — ARender Web-UI (Spring Boot)** | Hosts the viewer backend and the embedded JAR connector | Spring Boot |
| **N4 — ECM Backend** | Stores documents, metadata, and annotations | ECM-specific |
| **N5 — ARender Rendition** | Generates images, extracts text, converts documents | Spring Boot |

## Network flow

- **N1 → N2**: The ECM UI redirects the browser to the ARender URL on port `8080`.
- **N2 ↔ N3**: The browser communicates with the ARender Web-UI on port `8080`.
- **N3 → N4**: The embedded connector calls the ECM backend APIs to fetch documents and metadata.
- **N3 → N5**: The Web-UI sends documents to the Rendition service on port `8761` for image generation and text extraction.

:::tip
If you are using the **ARender ReactJS application** (v2026.0.0+) — whether standalone or as a web component — this architecture does not apply. The ReactJS application requires the REST Connector model instead. See [ECM REST connector architecture](/docs/arender/learn/architecture/ecm-rest-connector-architecture).
:::
