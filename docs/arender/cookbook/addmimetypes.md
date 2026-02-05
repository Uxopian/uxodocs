---
title: "Add new image/video mime types"
sidebar_position: 2
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: 6ffca8202d963d3aecb3dfdf5242f73ac306ca18af6ee409cf090bea4f7af3a9
---

If your rendition server does not possess all the mime types that you
wish to use, it is then still possible that the rendition server could
convert your file.

In the specific case of video/image conversion, the full list of files
that can opened by imagemagick/ffmpeg is long.

If you wish to add a mime type, you just need to modify the
*application-security.yml* file of the modules/TaskConversion folder of your rendition.
This file will override the basic configuration file.

For example, if we want to add the mime type *image/x-bmp*.

In the application-security.yml file you will find:

``` yaml
security:
  user:
    name: placeholder_login
    password: placeholder_password

spring:
  profiles:
    include: >
      security,
      https
```

Would become:

``` yaml
security:
  user:
    name: placeholder_login
    password: placeholder_password

spring:
  profiles:
    include: >
      security,
      https

eureka:
  instance:
    metadataMap:
      convertMimeType: "application/mbox,message/rfc822,application/vnd.ms-outlook,text/html,application/zip,application/x-zip,
      application/x-zip-compressed,application/x-rar-compressed,application/x-rar,application/java-archive,text/rtf,
      ${mime.type.msoffice.word},${mime.type.libreoffice.text},${mime.type.msoffice.excel},${mime.type.libreoffice.sheet},
      ${mime.type.msoffice.powerpoint},${mime.type.libreoffice.presentation},${mime.type.msoffice.project},
      ${mime.type.msoffice.visio},${mime.type.msoffice.publisher},${mime.type.libreoffice.graphics},
      text/plain,video/quicktime,video/mp4,video/3gpp,audio/x-wav,audio/mp3,video/x-flv,video/mpeg,
      video/x-msvideo,video/x-matroska,video/x-ms-asf,video/mov,application/x-empty,audio/mpeg,audio/x-mpeg,audio/x-aiff,audio/mp4,video/gif,image/png,image/jpeg,image/gif,image/x-ms-bmp,image/x-bmp,image/x-portable-bitmap,image/vnd.adobe.photoshop,
      image/x-eps,application/postscript,application/dicom,application/pcx,application/x-pcx,image/pcx,image/x-pc-paintbrush,image/x-pcx,zz-application/zz-winassoc-pcx,image/jp2,image/tiff"

app:
  factoriesBeanNames:
    imageFactory: "image/webp,image/tiff,image/png,image/jpeg,image/gif,image/x-ms-bmp,image/x-bmp,image/x-portable-bitmap,image/vnd.adobe.photoshop,image/x-eps,application/postscript,application/dicom,application/pcx,application/x-pcx,image/pcx,image/x-pc-paintbrush,image/x-pcx,zz-application/zz-winassoc-pcx,image/jp2"

```
The lines of code to add are in the jar (open with a 7-zip tool), then go to:
BOOT-INF/classes/application.yaml

For the mime types the factory concerned is the
*imageFactory*, where you can add each mime types desired.
