---
title: ECM general architecture
sidebar_position: 2
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
content_hash: 0d7ba8c14b557fe92d92e52f928daa6267981e85f2a1067766c2dc9847c10d2f
---

![image](/img/arender/diagrams/ARender-Architecture-With-Connector.png)

- **N1: ECM UI**: has the responsibility to let the user choose which documents he wants to open in ARender,
- **N2: Browser**: will create the ARender frame using the URL provided by N1,
- **N3: ARender WEB-UI**: is Spring Boot module which contains the connector,
- **N4: ECM Backend**: contains API which ARender connector will interact with to fetch documents (and if needed fetch annotations
  and metadata and create new documents or new version of documents),
- **N5: ARender Rendition**: is Spring Boot module that will generate images, extract text and more.
