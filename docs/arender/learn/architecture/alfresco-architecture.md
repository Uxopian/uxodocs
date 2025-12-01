---
title: Architecture in Alfresco
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 5682ef2d5342f1a8f14da55632e610297e2f0b3ef805b928ddd8c39358f6464d
---







![image](/img/arender/diagrams/ARender-Architecture-Alfresco.png)

* **N1: Alfresco UI**: has the responsibility to let the Alfresco user choose which documents he wants to open in ARender,
* **N2: Browser**: will create the ARender frame using the URL provided by N1,
* **N3: ARender WEB-UI**: is Spring Boot module which contains the Alfresco connector,
* **N4: Alfresco Backend**: contains API which ARender connector will interact with to fetch documents (and if needed fetch annotations 
  and metadata and create new documents or new version of documents),
* **N5: ARender Rendition**: will generate images, extract text and more.




```
Your ECM port must be different from your ARender WEB-UI port.
```

