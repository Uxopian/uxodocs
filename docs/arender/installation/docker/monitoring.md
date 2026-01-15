---
title: Monitoring
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: e6d31ea2721d0f4d638c5bbb8f95bb3767aac04f19cf11b702aa9381f9bbcde2
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
| arender-ui                      | /usr/local/tomcat/logs/localhost.&#123;year-month-day&#125;.log, stdout |
| arender-document-service-broker | /arender/logs/arender-server.log                                        |
| arender-document-renderer       | /arender/logs/document-renderer/arender-jnipdf.log                      |
| arender-document-text-handler   | /arender/logs/document-text-handler/arender-pdfbox.log                  |
| arender-document-converter      | /arender/logs/document-converter/arender-taskconversion.log             |
