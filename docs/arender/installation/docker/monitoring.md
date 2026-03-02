---
title: Monitoring
sidebar_position: 6
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
content_hash: fed89f409c4593617062afd37c2780e0daed5afd2372702a8ce9f9e38604c38a
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
