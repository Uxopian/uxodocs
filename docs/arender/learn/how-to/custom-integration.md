---
title: Custom XML integration location
sidebar_position: 12
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
content_hash: 0b1ee9186c64d14b2ed17dffdacae1671f98b42608dd99f0f0a52ee383472b98
---

We possess in ARender two files dedicated to custom integrations that
ship out empty in order for integration to include easier custom XML
into ARender. Those two XML files are imported by ARender.

This avoids conflicts on version upgrade of ARender, and facilitates the
comparison with the new version of the XML (nothing new is overridden by
custom integration), those XML files are empty and will always be at
each new version.

- In the Web-UI:
    - configurations/arender-custom-integration.xml (GUI, client side
      configuration)
    - configurations/arender-custom-server-integration.xml (server
      side configuration)

- To externalize your XML files, you can set environment variables to change the location
  from which those two custom files will be read:
    - customXmlServerPath: corresponds to the import path of
      configurations/arender-custom-server-integration.xml .
    - customXmlClientPath: corresponds to the import path of
      configurations/arender-custom-integration.xml.

As an example, if you wish to set a file system full path to your custom
server file, you can set customXmlServerPath to:

```cfg
file:C:\\configuration\\arender-server-configuration.xml
```
