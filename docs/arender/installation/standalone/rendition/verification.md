---
title: Check
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 721dcf046cc8148c84f490c62304f4fc5e53ca656382a6564c0645b1d0011457
---

Once the server is starting, you can check the URL
[http://renditionServerHost:8761/health/records](http://renditionServerHost:8761/health/records)
to see status services (please replace "renditionServerHost" with your actual _hostname_ on which
the rendition server is running).

![HealthRecords](/img/arender/healthRecords.png)

All services must be visible, started, and functional.

It may happen that not all services appear when rendition does not
still completely started, in this case you have to wait a few minutes.

If some services or features are incomplete or not started,
thank you kindly check [the prerequisites of the rendition](/docs/arender/installation/standalone/rendition/requirements/).
