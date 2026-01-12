---
title: Docker architecture
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: e9fbec39bb013f68cedb27889706a7ea77f46909255f82a36922157f0ff2a1b7
---

![img](/img/arender/diagrams/ARender-Architecture-Docker.png)

- **N1: ECM UI**: has the responsibility to let the user choose which documents he wants to open in ARender,
- **N2: Browser**: will create the ARender frame using the URL provided by N1,
- **N3: ARender WEB-UI**: is an application server containing the connector and running in a docker container,
- **N4: ECM Backend**: contains API which ARender connector will interact with to fetch documents (and if needed fetch annotations
  and metadata and create new documents or new version of documents),
- **N5: ARender Rendition**: is compounded of 4 Spring Boot microservices running in docker containers that offer different services such as generating images, extracting text, converting document and more.
