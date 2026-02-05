---
title: "Pre-configuration"
sidebar_position: 3
last_update:
  date: '2026-02-05T15:05:05.898Z'
  author: CI/CD Bot
content_hash: 973f6cd32e7648bd0a3f16cd069dfbff7c4b47df7d69bd357cf1d67f4c1c16ff
---

Here we will make the rendition server reachable
from the presentation server.

By default, ARender war will search the Rendition server
locally. This will only work if you place your server
Rendition on the same server as the front-end server.

There are many ways to link and we will see
here the most durable way.

- In the machine that will contain the presentation server,
     place a folder named *ARenderConfiguration* in
     the home directory of the user starting the
     presentation server.
- In your *ARenderConfiguration* folder, place a file suffixed by
     **-custom-client-server.properties**. This way,
     it's automatically picked up by ARender, read more
     about this in the complete documentation of the configuration.

If we consider your rendition server to be at the hostname "renditionHost",
here is what your file should contain:

```cfg title="~/ARenderConfiguration/{name}-custom-client-server.properties"
arender.server.rendition.hosts=http://renditionHost:8761/
```
