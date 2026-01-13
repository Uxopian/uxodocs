---
title: ECM general architecture
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 71c177e3ccdcc86128cfa80e49943e871b12592eb5a2a7c5e8b1e48475fc533c
---

![image](/img/arender/diagrams/ARender-Architecture-With-Connector.png)

- **N1: ECM UI**: has the responsibility to let the user choose which documents he wants to open in ARender,
- **N2: Browser**: will create the ARender frame using the URL provided by N1,
- **N3: ARender WEB-UI**: is Spring Boot module which contains the connector,
- **N4: ECM Backend**: contains API which ARender connector will interact with to fetch documents (and if needed fetch annotations
  and metadata and create new documents or new version of documents),
- **N5: ARender Rendition**: is Spring Boot module that will generate images, extract text and more.
