---
title: Check
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: b098ef3a110d588f9a664dbb9279bee62453354e1b91d796a510f4c519714894
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
thank you kindly check [the prerequisites of the rendition](/installation/standalone/rendition/requirements/.md).
