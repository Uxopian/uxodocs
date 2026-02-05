---
title: "Presentation server"
sidebar_position: 2
last_update:
  date: '2026-02-05T15:28:19.384Z'
  author: CI/CD Bot
content_hash: 8ff89db00601f318ff2155d7100b14971bbd0d1a6f5768991ff78e3ba48f18bc
---

## Configuration

### By Environment Variables

All properties can be set with environment variables by following the next rules:

- environment variables must be capitalized
- use **"_"** to replace **"."**
- any ARender profile properties must be prefixed by `"ARENDER_"`
- any ARender server properties must be prefixed by `"ARENDERSRV_"`

:::note
topPanel.logo -> ARENDER_TOPPANEL_LOGO

arender.server.rendition.hosts -> ARENDERSRV_ARENDER_SERVER_RENDITION_HOSTS
:::

### By volumes

#### Profile

**Default configuration file location:** /usr/local/tomcat/webapps/ROOT/WEB-INF/classes/arender.properties

**Custom config folder location:** /home/arender/Profile

See documentation:

- [Profile](../../configuration/web-ui/profile.md)
- [ARender front configuration properties list](../../configuration/web-ui/full-config.md)

#### Server

**Default configuration file location:** /home/arender/ARenderConfiguration/arender-custom-server.properties

**Custom config folder location:** /home/arender/ARenderConfiguration
