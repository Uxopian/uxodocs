---
title: Presentation server
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: ae67c81c02d425b4e9a91f0713e74772cb8858e45c45099285f61390e62608ec
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
