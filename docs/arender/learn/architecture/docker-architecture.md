---
title: Docker architecture
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: b225c5e32d922286a7425122a72241ad61ed530714a3d9019142e6a2e190cf1b
---

![img](/img/arender/diagrams/ARender-Architecture-Docker.png)

- **N1: ECM UI**: has the responsibility to let the user choose which documents he wants to open in ARender,
- **N2: Browser**: will create the ARender frame using the URL provided by N1,
- **N3: ARender WEB-UI**: is an application server containing the connector and running in a docker container,
- **N4: ECM Backend**: contains API which ARender connector will interact with to fetch documents (and if needed fetch annotations
  and metadata and create new documents or new version of documents),
- **N5: ARender Rendition**: is compounded of 4 Spring Boot microservices running in docker containers that offer different services such as generating images, extracting text, converting document and more.
