---
title: Architecture in IBM Filenet
sidebar_position: 4
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
content_hash: 1aff9e621383ca396ef03ab4618aa5036f924f4918360849c235fe79d358579a
---

![image](/img/arender/diagrams/ARender-Architecture-Filenet.png)

- **N1: Filenet UI**: has the responsibility to let the Filenet user choose which documents he wants to open in ARender,
- **N2: Browser**: will create the ARender frame using the URL provided by N1,
- **N3: ARender WEB-UI**: is an application server which contains ARender WEB-UI and the Filenet connector,
- **N4: Filenet Backend**: contains API which ARender connector will interact with to fetch documents (and if needed fetch annotations
  and metadata and create new documents or new version of documents),
- **N5: ARender Rendition**: will generate images, extract text and more.
