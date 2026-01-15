---
title: Architecture in IBM Filenet
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: ec8d0c90dc5b8cfcbcb691bc53f7281f9149a6e060e3226c75dad34bd72c4b79
---

![image](/img/arender/diagrams/ARender-Architecture-Filenet.png)

- **N1: Filenet UI**: has the responsibility to let the Filenet user choose which documents he wants to open in ARender,
- **N2: Browser**: will create the ARender frame using the URL provided by N1,
- **N3: ARender WEB-UI**: is an application server which contains ARender WEB-UI and the Filenet connector,
- **N4: Filenet Backend**: contains API which ARender connector will interact with to fetch documents (and if needed fetch annotations
  and metadata and create new documents or new version of documents),
- **N5: ARender Rendition**: will generate images, extract text and more.
