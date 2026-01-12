---
title: Monitoring
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 3ff38137c90ff726c8b9ec2351bb18c9c97b378e1ba172eee8d7771cd0d256d3
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
