---
title: Rendition REST client
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 0e4de057519be7e4510536f6f1117a42466a7a82ad317868cb536492fef71ee8
---

## Configurations

Since version 2023.12.0, it is possible to configure the rendition REST client of the HMI in the _configurations/arender-custom-client.properties_ file.

| Description                                                                                                        | Parameter Key                                           | Default value | Type    |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- | ------------- | ------- |
| Configure a limit on the number of bytes that can be buffered (in bytes)                                           | arender.server.rendition.rest.max.in.memory.size        | 8000000       | Integer |
| The maximum number of connections before starting pending acquisition on existing ones                             | arender.server.rendition.rest.max.connections           | 200           | Integer |
| The maximum time after which a pending acquire must complete (in milliseconds)                                     | arender.server.rendition.rest.pending.acquire.timeout   | 120000        | Integer |
| The maximum number of registered requests for acquire to keep in a pending queue. Set the value "-1" for no limit. | arender.server.rendition.rest.pending.acquire.max.count | -1            | Integer |
| The Duration after which the channel will be closed when idle (in milliseconds). Set the value "-1" for no limit.  | arender.server.rendition.rest.max.idle.time             | -1            | Integer |
| The Duration after which the channel will be closed (in milliseconds). Set the value "-1" for no limit.            | arender.server.rendition.rest.max.life.time             | -1            | Integer |
| The maximum time to read a response through the network (in milliseconds)                                          | arender.server.rendition.rest.read.timeout              | 120000        | Integer |
| The maximum time to write a request through the network (in milliseconds)                                          | arender.server.rendition.rest.write.timeout             | 120000        | Integer |
