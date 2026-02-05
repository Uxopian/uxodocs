---
title: "Check"
sidebar_position: 5
last_update:
  date: '2026-02-02T12:16:59.945Z'
  author: CI/CD Bot
content_hash: 5c4c1c75c92553115fb75793a800772ea5e7fce8a89eeea524e596cd4b25658e
---

Once the server is starting, you can check the URL
[http://renditionServerHost:8761/health/records](http://renditionServerHost:8761/health/records)
to see status services (please replace "renditionServerHost" with your actual *hostname* on which
the rendition server is running).

![HealthRecords](/img/arender/healthRecords_V4.png)

All services must be visible, started, and functional.

It may happen that not all services appear when rendition does not
still completely started, in this case you have to wait a few minutes.

If some services or features are incomplete or not started,
thank you kindly check [the prerequisites of the rendition](/v4/install/standalone/rendition/requirements/).
