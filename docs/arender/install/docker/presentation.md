---
title: "Presentation server"
sidebar_position: 2
last_update:
  date: '2026-02-05T15:05:05.898Z'
  author: CI/CD Bot
content_hash: 42c09c592bc96fdc6f89be49ea90058083ed7a2c2ea4a62f37471614c4bf3548
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

- [Profile](/v4/configuration/web-ui/profile.md)
- [ARender front configuration properties list](/v4/configuration/web-ui/full-config.md)

#### Server

**Default configuration file location:** /home/arender/ARenderConfiguration/arender-custom-server.properties

**Custom config folder location:** /home/arender/ARenderConfiguration
