---
title: Custom XML integration location
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: f6acd1fdcd870e00ba6611646b1a79d4d317d96fe7c3471c579f4eb50423d872
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
