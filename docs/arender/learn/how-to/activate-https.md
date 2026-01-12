---
title: Use SSL
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 987e30b547b9581dd0dc8f594afc697f209868c723fad8578c4d06654d4556bf
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
