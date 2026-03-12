---
title: Monitoring
sidebar_position: 6
last_update:
  date: '2026-03-12T20:43:52.809Z'
  author: CI/CD Bot
content_hash: 3599fde65043633f4d01ecd519c9d701f76abed013b8bf738d9c1f05cce6fcef
---

## Health check probe

| Component                       | Liveness               | Readiness           |
| ------------------------------- | ---------------------- | ------------------- |
| arender-ui                      | /                      | /arendergwt/weather |
| arender-document-service-broker | /swagger-ui/index.html | /health/readiness   |
| arender-document-renderer       | /actuator/health       | /health/readiness   |
| arender-document-text-handler   | /actuator/health       | /health/readiness   |
| arender-document-converter      | /actuator/health       | /health/readiness   |

## Log files locations

| Component                       | Files                                                                   |
| ------------------------------- | ----------------------------------------------------------------------- |
| arender-ui                      | /usr/local/tomcat/logs/localhost&#123;year-month-day&#125;.log, stdout  |
| arender-document-service-broker | /arender/logs/arender-server.log                                        |
| arender-document-renderer       | /arender/logs/document-renderer/arender-jnipdf.log                      |
| arender-document-text-handler   | /arender/logs/document-text-handler/arender-pdfbox.log                  |
| arender-document-converter      | /arender/logs/document-converter/arender-taskconversion.log             |
