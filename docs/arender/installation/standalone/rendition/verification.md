---
title: Check
last_update:
  date: '2025-12-02T14:29:22.460Z'
  author: CI/CD Bot
content_hash: e0a8d54f4103d68d3f6a95921911e5df7d7fc0dca61cedba30579f915de1130a
---







Once the server is starting, you can check the URL
[http://renditionServerHost:8761/health/records](http://renditionServerHost:8761/health/records)
to see status services (please replace "renditionServerHost" with your actual *hostname* on which
the rendition server is running).

![HealthRecords](/img/arender/healthRecords.png)

All services must be visible, started, and functional.

It may happen that not all services appear when rendition does not
still completely started, in this case you have to wait a few minutes.

If some services or features are incomplete or not started,
thank you kindly check [the prerequisites of the rendition](/docs/arender/installation/standalone/rendition/requirements/).
