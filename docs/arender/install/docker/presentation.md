---
title: "Presentation server"
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: d82cc4d4bf31a78ab6c0d9bca65cb37db18787ef91c966ca0456bf68c0ade008
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
