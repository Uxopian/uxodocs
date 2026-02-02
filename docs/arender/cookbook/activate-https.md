---
title: "Use SSL"
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: a6743c6da9593970c22956d549faee341104b56c82cc9bcd9215f1408cde5ced
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
