---
title: "Use SSL"
sidebar_position: 26
last_update:
  date: '2026-02-05T15:05:05.898Z'
  author: CI/CD Bot
content_hash: 9ef5f7643b7a65226da8bb01ef8e75a8a2258a8554625827273413f2441e5fb2
---

To allow your Rendition to work over https, you have to change some
properties in ARender server and Rendition server.

:::warning
**Note that you cannot use both of http and https at the same
time.**
:::

## On ARender server side

Add these following lines in the folowing file:

```cfg title="arender-server-custom-vanilla.properties"
arender.server.rendition.hosts=https://RENDITION_HOSTNAME:RENDITION_PORT/
arender.rest.ssl.custom.use=true
```

## On rendition server side

Copy the files located in
"*YOUR_RENDITION_FOLDER/secure-mode-properties/*" in their respective
destination in "*YOUR_RENDITION_FOLDER/modules/*" as it should then
place them correctly in their respective folders.
