---
---
title: Surveillance
---

## Sonde d'état de santé

| Composant                       | Vivacité               | Disponibilité opérationnelle |
| ------------------------------- | ---------------------- | ---------------------------- |
| arender-ui                      | /                      | /arendergwt/weather          |
| arender-document-service-broker | /swagger-ui/index.html | /health/readiness            |
| arender-document-renderer       | /actuator/health       | /health/readiness            |
| arender-document-text-handler   | /actuator/health       | /health/readiness            |
| arender-document-converter      | /actuator/health       | /health/readiness            |


## Localisation des fichiers de log

| Composant                       | Fichiers                                                      |
| ------------------------------- | ------------------------------------------------------------- |
```text
| arender-ui                      | /usr/local/tomcat/logs/localhost.{2024-month-day}.log, stdout |
```
| arender-document-service-broker | /arender/logs/arender-server.log                              |
| arender-document-renderer       | /arender/logs/document-renderer/arender-jnipdf.log            |
| arender-document-text-handler   | /arender/logs/document-text-handler/arender-pdfbox.log        |
| arender-document-converter      | /arender/logs/document-converter/arender-taskconversion.log   |
