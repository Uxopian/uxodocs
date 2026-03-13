---
title: Check
sidebar_position: 5
last_update:
  date: '2026-03-13T11:59:21.642Z'
  author: CI/CD Bot
content_hash: 52c02ec3962ae49a41cc6754cde94d71ab403448d55104d2e57459414ec4d131
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
thank you kindly check [the prerequisites of the rendition](../requirements/).
