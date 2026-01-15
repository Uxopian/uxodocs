---
title: Architecture in M-Files
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 05f731309ac9e887b17dd16f8822a79f9a15ce6454f1d96829d351ea4b667d43
---

![image](/img/arender/diagrams/ARender-Architecture-M-Files.png)

- **N1: M-Files UI**: has the responsibility to let the M-Files user choose which documents he wants to open in ARender,
- **N2: Browser**: will create the ARender frame using the URL provided by N1,
- **N3: ARender WEB-UI**: is Spring Boot module which contains the M-Files connector,
- **N4: M-Files Backend**: contains API which ARender connector will interact with to fetch documents (and if needed fetch annotations
  and metadata and create new documents or new version of documents),
- **N5: ARender Rendition**: will generate images, extract text and more. Contains M-Files connector too.
