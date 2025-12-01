---
title: Presentation server
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 1c740cf315e2e40888ee3d5d261a375a967c6138f4c3cfc018f3c8dbbba5a571
---







## Configuration

### By Environment Variables

All properties can be set with environment variables by following the next rules:

- environment variables must be capitalized
- use **"_"** to replace **"."**
- any ARender profile properties must be prefixed by `"ARENDER_"`
- any ARender server properties must be prefixed by `"ARENDERSRV_"`


preference.color.mode -> ARENDER_COLOR_PREFERENCE

arender.server.rendition.hosts -> ARENDERSRV_ARENDER_SERVER_RENDITION_HOSTS


### By volumes

#### Profile

**Default configuration file location:** /usr/local/tomcat/webapps/ROOT/WEB-INF/classes/arender.properties

**Custom config folder location:** /home/arender/ARenderConfiguration

See documentation:

- [Profile](./guides/configurations/web-ui/visual/profile.en.md)
- [ARender front configuration properties list](./guides/configurations/web-ui/properties/full-config.en.md)

#### Server

**Default configuration file location:** /home/arender/ARenderConfiguration/arender-custom-server.properties

**Custom config folder location:** /home/arender/ARenderConfiguration
