---
title: Check
sidebar_position: 5
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
content_hash: 6d247cded22ccc4cafccd503d77357e04f11c4faba78888a04778a05828e0008
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
