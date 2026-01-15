---
title: Use SSL
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: f2604731d38ae44fbc79e2d9e76f3aa4a0af557d3304bd6b1405abf9223b13fc
---

To allow your Rendition to work over https, you have to change some
properties in ARender server and Rendition server.

**Note that you cannot use both of http and https at the same
time.**

## On ARender server side

Add these lines below in the following file:

````cfg

```properties
arender.server.rendition.hosts=https://RENDITION_HOSTNAME:RENDITION_PORT/
arender.rest.ssl.custom.use=true
````

## On rendition server side

Copy the files located in
"_YOUR_RENDITION_FOLDER/secure-mode-properties/_" in their respective
destination in "_YOUR_RENDITION_FOLDER/modules/_" as it should then
place them correctly in their respective folders.
