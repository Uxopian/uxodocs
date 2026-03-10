---
title: ECM REST connector architecture
last_update:
  date: '2026-03-10T12:51:36.773Z'
  author: CI/CD Bot
sidebar_position: 3
content_hash: 3357a2d44748b5fb16e235ee32d51186e5a3fc2c3748bab5f17e9c6bb8835263
---

This page describes the **REST connector** integration model, introduced in **ARender v2026.0.0**. In this model, the ECM connector is a standalone application called by the ARender Rendition backend, and the frontend is the **ARender ReactJS application**.

The ARender ReactJS application can be deployed in two ways:
- **Standalone**: served via a web server such as Nginx.
- **Web component**: embedded directly into a customer's host application (e.g., an ECM UI or a custom portal).

This is why the architecture diagram below does not show a dedicated ReactJS node — the frontend delivery is flexible and depends on the customer's integration choice.

:::info
The legacy JAR connector model is still supported for the ARender Web-UI (Spring Boot) frontend. See [ECM general architecture (JAR connector)](/docs/arender/learn/architecture/ecm-architecture) for details.
:::

:::warning
This architecture **requires the ARender ReactJS application**. It does not work with the legacy ARender Web-UI (Spring Boot). If you are using the ARender Web-UI Spring Boot application, you must use the [JAR connector model](/docs/arender/learn/architecture/ecm-architecture) instead.
:::

## Architecture diagram

![ARender v2026 Architecture](/img/arender/learn/architecture/ARender_Architecture_2026.drawio.png)

## How it works

1. The user opens a document in the **Browser**, either through a standalone ARender ReactJS application or via the ARender web component embedded in the customer's host application.
2. The request goes through the **API Gateway** (oauth2-proxy + Nginx), which handles routing and authentication delegation.
3. The **Identity Provider** (Keycloak) authenticates the user via the oauth2-proxy.
4. The authenticated request reaches the **ARender Rendition** cluster. The **document-service-broker** orchestrates the work and dispatches tasks to the specialized microservices:
   - **document-renderer**: generates page images.
   - **document-text-handler**: extracts text content.
   - **document-converter**: converts documents between formats.
5. When the Rendition needs to retrieve a document from the ECM, the **document-service-broker** calls the **REST Connector Provider** via its REST API.
6. The **REST Connector Provider** translates the request into ECM-specific API calls and returns the document content, metadata, and annotations to the Rendition.
7. The Rendition microservices use **NFS** as shared storage for temporary files and rendered content.

## Component details

| Component | Role | Technology |
|---|---|---|
| **Browser** | Renders the ARender viewer (standalone ReactJS app or web component in the customer's host application) | JavaScript / ReactJS |
| **API Gateway** | Routes requests and delegates authentication | oauth2-proxy, Nginx |
| **Identity Provider** | Authenticates users | Keycloak (or any OIDC-compatible provider) |
| **ARender Rendition** | Cluster of microservices that render documents, extract text, and convert formats | Spring Boot (document-service-broker, document-renderer, document-text-handler, document-converter) |
| **NFS** | Shared file storage for the Rendition microservices | NFS |
| **REST Connector Provider** | Standalone application that retrieves documents and metadata from the ECM on behalf of the Rendition | Language-agnostic (see below) |
| **ECM Backend** | Stores documents, metadata, and annotations | ECM-specific (FileNet, Alfresco, etc.) |

## REST Connector Provider

The REST Connector Provider is a **language-agnostic** application. It exposes a REST API that the ARender Rendition calls to retrieve documents from the ECM. Customers can implement their own REST Connector Provider in any language they are comfortable with, as long as it conforms to the expected API contract.

Uxopian provides ready-made REST Connector implementations as Spring Boot applications for:
- **IBM FileNet P8**
- **Alfresco**

## Network flow

- **Browser → API Gateway**: The user accesses ARender through the Nginx reverse proxy.
- **API Gateway ↔ Identity Provider**: oauth2-proxy delegates authentication to Keycloak.
- **API Gateway → ARender Rendition**: Authenticated requests are forwarded to the document-service-broker.
- **document-service-broker → Rendition microservices**: The broker dispatches rendering, text extraction, and conversion tasks.
- **document-service-broker → REST Connector Provider**: The broker calls the REST Connector to retrieve document content and metadata from the ECM.
- **REST Connector Provider → ECM Backend**: The connector translates requests into ECM-native API calls.
- **Rendition microservices ↔ NFS**: Shared storage for temporary and rendered files.

## Key differences from the legacy JAR connector model

| Aspect | Legacy (JAR connector) | REST connector |
|---|---|---|
| **Frontend application** | ARender Web-UI (Spring Boot) | ARender ReactJS (standalone or web component) |
| **Connector location** | Embedded as a JAR in the ARender Web-UI JVM | Standalone application (language-agnostic) |
| **Who calls the ECM** | The Web-UI via the embedded connector | The REST Connector Provider, triggered by the Rendition |
| **Authentication** | Managed by the Web-UI | Delegated to an Identity Provider (Keycloak) via API Gateway |
| **Rendition architecture** | Single Spring Boot service | Microservices cluster (broker, renderer, text-handler, converter) |
| **Deployment** | Single application (Web-UI + connector) | API Gateway + Rendition cluster + REST Connector Provider |
| **Scalability** | Connector scales with the Web-UI | Each component scales independently |
| **ECM dependency isolation** | ECM libraries loaded in the Web-UI JVM | ECM libraries isolated in the connector's own process |
