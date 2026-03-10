---
title: Architecture in IBM Filenet
sidebar_position: 5
last_update:
  date: '2026-03-10T12:51:36.773Z'
  author: CI/CD Bot
content_hash: fe60f3e7ada7de9e02de883cc946553abe391853485b5cbe084323692af1ba73
---

![image](/img/arender/diagrams/ARender-Architecture-Filenet.png)

- **N1: Filenet UI**: has the responsibility to let the Filenet user choose which documents he wants to open in ARender,
- **N2: Browser**: will create the ARender frame using the URL provided by N1,
- **N3: ARender WEB-UI**: is an application server which contains ARender WEB-UI and the Filenet connector,
- **N4: Filenet Backend**: contains API which ARender connector will interact with to fetch documents (and if needed fetch annotations
  and metadata and create new documents or new version of documents),
- **N5: ARender Rendition**: will generate images, extract text and more.
