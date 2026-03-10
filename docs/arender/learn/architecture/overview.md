---
title: Overview
last_update:
  date: '2026-03-10T12:51:36.773Z'
  author: CI/CD Bot
sidebar_position: 1
content_hash: cde844a3abea0ce540a07bef74245d7c168245f554bf28bf4b7b816d4205c54a
---

This is the general ARender architecture overview for the ARender Web-UI (Spring Boot) deployment model in a high-availability setup. The diagram below shows how the different ARender components interact.

![img](pathname:///img/arender/diagrams/ARender-Version5-Architecture.png)

## Component Details

| Component | Description |
|---|---|
| **Web Browser** | The client that loads the ARender viewer frontend (JavaScript). |
| **Load Balancer** | Distributes incoming HTTPS requests across multiple ARender Web-UI instances. No sticky session is required thanks to Hazelcast session replication. |
| **ARender Web-UI** | Spring Boot application that serves the viewer frontend and handles document requests. Multiple instances can run in parallel for high availability. |
| **Hazelcast** (Web-UI tier) | Provides distributed session replication between Web-UI instances, allowing any instance to serve any user session. |
| **DNS** | Used for service discovery — the Web-UI instances resolve the Rendition service addresses via DNS. |
| **ARender Rendition** | Spring Boot service that generates page images, extracts text, and converts documents. Multiple instances can run for scalability. |
| **Hazelcast** (Rendition tier) | Coordinates the Rendition cluster, enabling workload distribution and cache sharing between instances. |
| **NFS/Lustre** | Shared file storage used by all Rendition instances to store temporary files and rendered content. |

## How It Works

1. The user opens a document in the **Web Browser**.
2. The request reaches the **Load Balancer**, which forwards it to one of the ARender Web-UI instances via HTTPS.
3. The **ARender Web-UI** processes the request. Hazelcast ensures session data is replicated across all Web-UI instances, so the load balancer does not need sticky sessions.
4. The Web-UI resolves the Rendition service address via **DNS** and forwards the document to the **ARender Rendition** for processing.
5. The **ARender Rendition** generates images, extracts text, or converts the document. Hazelcast coordinates work across Rendition instances.
6. Rendered content and temporary files are stored on **NFS/Lustre**, accessible by all Rendition instances.

## Related Architectures

- For ECM integration with the ARender Web-UI (Spring Boot), see the [ECM general architecture (JAR connector)](/docs/arender/learn/architecture/ecm-architecture).
- For the new v2026.0.0 architecture with the ARender ReactJS application and REST Connectors, see [ECM REST connector architecture](/docs/arender/learn/architecture/ecm-rest-connector-architecture).
- For ECM-specific architectures: [Alfresco](/docs/arender/learn/architecture/alfresco-architecture), [IBM FileNet](/docs/arender/learn/architecture/filenet-architecture), [M-Files](../m-files-architecture), [Nuxeo](/docs/arender//learn/architecture/nuxeo-architecture).
- For Docker deployment, see [Docker architecture](/docs/arender/learn/architecture/docker-architecture).