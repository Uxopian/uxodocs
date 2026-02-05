---
title: "Check"
sidebar_position: 5
last_update:
  date: '2026-02-05T15:11:39.219Z'
  author: CI/CD Bot
content_hash: 6fe80fe34ade6ca3dfa4b10753a66108f95bbf0388359d4ca5c127cd1e8b8777
---

Once the server is starting, you can check the URL
[http://renditionServerHost:8761/health/records](http://renditionServerHost:8761/health/records)
to see status services (please replace "renditionServerHost" with your actual *hostname* on which
the rendition server is running).

![HealthRecords](pathname:///img/arender/healthRecords_V4.png)

All services must be visible, started, and functional.

It may happen that not all services appear when rendition does not
still completely started, in this case you have to wait a few minutes.

If some services or features are incomplete or not started,
thank you kindly check [the prerequisites of the rendition](/v4/install/standalone/rendition/requirements/).
