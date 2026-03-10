---
title: Architecture in M-Files
sidebar_position: 6
last_update:
  date: '2026-03-10T12:51:36.773Z'
  author: CI/CD Bot
content_hash: c04c0cf5a7391605a30b1d2cb2bca5421eeff7f01a6036b497ca8649b783e53c
---

![image](/img/arender/diagrams/ARender-Architecture-M-Files.png)

- **N1: M-Files UI**: has the responsibility to let the M-Files user choose which documents he wants to open in ARender,
- **N2: Browser**: will create the ARender frame using the URL provided by N1,
- **N3: ARender WEB-UI**: is Spring Boot module which contains the M-Files connector,
- **N4: M-Files Backend**: contains API which ARender connector will interact with to fetch documents (and if needed fetch annotations
  and metadata and create new documents or new version of documents),
- **N5: ARender Rendition**: will generate images, extract text and more. Contains M-Files connector too.
