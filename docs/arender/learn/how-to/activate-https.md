---
title: Use SSL
sidebar_position: 25
last_update:
  date: '2026-03-12T20:43:52.809Z'
  author: CI/CD Bot
content_hash: 99a8058464c872e7f189e7e17243074fde48593df4103633ad979b5b95407daa
---

To allow your Rendition to work over https, you have to change some
properties in ARender server and Rendition server.

**Note that you cannot use both of http and https at the same
time.**

## On ARender server side

Add these lines below in the following file:

```properties
arender.server.rendition.hosts=https://RENDITION_HOSTNAME:RENDITION_PORT/
arender.rest.ssl.custom.use=true
```

## On rendition server side

Copy the files located in
"_YOUR_RENDITION_FOLDER/secure-mode-properties/_" in their respective
destination in "_YOUR_RENDITION_FOLDER/modules/_" as it should then
place them correctly in their respective folders.
