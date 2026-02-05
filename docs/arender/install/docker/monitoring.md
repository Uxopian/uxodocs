---
title: "Monitoring"
sidebar_position: 5
last_update:
  date: '2026-02-05T15:05:05.898Z'
  author: CI/CD Bot
content_hash: a3bf2d2bc68d2b4a83894980c85cc720a1e5c978e01709bc7f9140cda5874b4b
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Health check probe

<Tabs>
<TabItem value="Since 4.8.1" label="Since 4.8.1">

| Component                       | Liveness        | Readiness           |
| ------------------------------- | --------------- | ------------------- |
| arender-ui                      | /               | /arendergwt/weather |
| arender-document-service-broker | /swagger-ui.html| /health/readiness   |
| arender-document-renderer       | /health/health  | /health/readiness   |
| arender-document-text-handler   | /health/health  | /health/readiness   |
| arender-document-converter      | /health/health  | /health/readiness   |

</TabItem>
<TabItem value="Before 4.8.1" label="Before 4.8.1">

| Component                       | Liveness        | Readiness           |
| ------------------------------- | --------------- | ------------------- |
| arender-ui                      | /               | /arendergwt/weather |
| arender-document-service-broker | /health/records | /weather            |
| arender-document-renderer       | /health/record  | /health/record      |
| arender-document-text-handler   | /health/record  | /health/record      |
| arender-document-converter      | /health/record  | /health/record      |

</TabItem>
</Tabs>

## Log files locations

| Component                       | Files                                                         |
| ------------------------------- | ------------------------------------------------------------- |
| arender-ui                      | /usr/local/tomcat/logs/localogs-`{year}`-`{month}`-`{day}`.ziplog, stdout |
| arender-document-service-broker | /arender/logs/arender-server.log                              |
| arender-document-renderer       | /arender/logs/document-renderer/arender-jnipdf.log            |
| arender-document-text-handler   | /arender/logs/document-text-handler/arender-pdfbox.log        |
| arender-document-converter      | /arender/logs/document-converter/arender-taskconversion.log   |
