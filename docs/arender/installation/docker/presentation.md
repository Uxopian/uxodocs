---
title: Presentation server
sidebar_position: 3
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
content_hash: 8607ab158ebd41c996c2de907dbcbc2118b443cbb6666086aa59497ecfa12b71
---

## Configuration

### By Environment Variables

All properties can be set with environment variables by following the next rules:

- environment variables must be capitalized
- use **"\_"** to replace **"."**
- any ARender profile properties must be prefixed by `"ARENDER_"`
- any ARender server properties must be prefixed by `"ARENDERSRV_"`

preference.color.mode -> ARENDER_COLOR_PREFERENCE

arender.server.rendition.hosts -> ARENDERSRV_ARENDER_SERVER_RENDITION_HOSTS

### By volumes

#### Profile

**Default configuration file location:** /usr/local/tomcat/webapps/ROOT/WEB-INF/classes/arender.properties

**Custom config folder location:** /home/arender/ARenderConfiguration

See documentation:

- [Profile](/docs/arender/guides/configurations/web-ui/visual/profile)
- [ARender front configuration properties list](/docs/arender/guides/configurations/web-ui/properties/full-config)

#### Server

**Default configuration file location:** /home/arender/ARenderConfiguration/arender-custom-server.properties

**Custom config folder location:** /home/arender/ARenderConfiguration
