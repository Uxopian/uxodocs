---
title: Architecture in Alfresco
sidebar_position: 3
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
content_hash: 4006a449a2ddd75255abb6ea2ec5c6a1be863d70776cfa35a5027b1129846c05
---

![image](/img/arender/diagrams/ARender-Architecture-Alfresco.png)

- **N1: Alfresco UI**: has the responsibility to let the Alfresco user choose which documents he wants to open in ARender,
- **N2: Browser**: will create the ARender frame using the URL provided by N1,
- **N3: ARender WEB-UI**: is Spring Boot module which contains the Alfresco connector,
- **N4: Alfresco Backend**: contains API which ARender connector will interact with to fetch documents (and if needed fetch annotations
  and metadata and create new documents or new version of documents),
- **N5: ARender Rendition**: will generate images, extract text and more.

```
Your ECM port must be different from your ARender WEB-UI port.
```
