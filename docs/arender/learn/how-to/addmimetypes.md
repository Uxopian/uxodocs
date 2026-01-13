---
title: Add new image/video mime types
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 610799bb48cc70896987ac6918134fb9ca212826da782d21f590d6e9f2f52e58
---

If your rendition server does not possess all the mime types that you
wish to use, it is then still possible that the rendition server could
convert your file.

In the specific case of video/image conversion, the full list of files
that can opened by imagemagick/ffmpeg is long.

If you wish to add a mime type, you just need to create/modify the
_application.properties_ file located in the modules/RenditionEngine
and _application-security.yaml_ file located in the modules/TaskConversion folder of your rendition.
This file will override the basic configuration file.

The _application.properties_ at modules/RenditionEngine file with the default mime types,
to modify to add/remove the desired mime types:

```cfg

# List of mime types that does not need conversion to be rendered
arender.format.nativeMimeTypes=application/pdf,image/tiff,video/mp4
# List of mime types handled by the mail extractor
arender.format.documentExtractorBeanNames.mailExtractor=application/mbox,message/rfc822,application/vnd.ms-outlook
# List of mime types handled by the archive extractor
arender.format.documentExtractorBeanNames.archiveExtractor=application/zip,application/x-zip,application/x-zip-compressed,application/x-rar-compressed,application/x-rar,application/java-archive
# List of mime types to convert to mp4
arender.format.conversionTargetMimeTypes.video-mp4=audio/x-wav,audio/mp3,audio/mpeg,audio/x-mpeg,video/quicktime,video/3gpp,video/x-flv,video/mpeg,video/x-msvideo,video/x-matroska,video/x-ms-asf,audio/x-aiff,audio/mp4,video/gif,video/mp2p
# List of mime types to convert to pdf
arender.format.conversionTargetMimeTypes.application-pdf=text/rtf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-word.document.macroEnabled.12,application/vnd.openxmlformats-officedocument.wordprocessingml.template,application/vnd.ms-word.template.macroEnabled.12,\
  application/vnd.ms-excel,application/x-ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel.sheet.macroEnabled.12,application/vnd.openxmlformats-officedocument.spreadsheetml.template,application/vnd.ms-excel.template.macroEnabled.12,\
  application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-powerpoint.presentation.macroEnabled.12,application/vnd.openxmlformats-officedocument.presentationml.template,application/vnd.ms-powerpoint.template.macroEnabled.12,\
  application/vnd.ms-project,\
  application/visio,application/x-visio,application/vnd.visio,application/vnd.ms-visio,application/visio.drawing,application/vsd,application/x-vsd,image/x-vsd,zz-application/zz-winassoc-vsd,\
  application/x-mspublisher,application/vnd.ms-publisher,\
  application/vnd.oasis.opendocument.text,\
  application/vnd.oasis.opendocument.spreadsheet,\
  application/vnd.oasis.opendocument.presentation,\
  application/vnd.oasis.opendocument.graphics,\
  image/webp,image/png,image/jpeg,image/gif,image/x-ms-bmp,image/x-bmp,image/x-portable-bitmap,image/vnd.adobe.photoshop,image/x-eps,application/postscript,application/dicom,application/pcx,application/x-pcx,image/pcx,image/x-pc-paintbrush,image/x-pcx,zz-application/zz-winassoc-pcx,image/jp2,image/heif,image/wmf,\
  text/html,\
  text/plain
```

<br/>

The _application-security.yaml_ at modules/TaskConversion file with the default mime types,
to modify to add/remove the desired mime types to the right converter:

```yaml
app:
    factoriesBeanNames:
        imageFactory: "image/webp,image/png,image/jpeg,image/gif,image/x-ms-bmp,image/x-bmp,image/x-portable-bitmap,image/vnd.adobe.photoshop,image/x-eps,application/postscript,application/dicom,application/pcx,application/x-pcx,image/pcx,image/x-pc-paintbrush,image/x-pcx,zz-application/zz-winassoc-pcx,image/jp2,image/heif,image/wmf"
        imageIOFactory: "image/tiff"
        htmlFactory: "text/html"
        genericConvertOffice:
            "${mime.type.msoffice.word},${mime.type.msoffice.rtf},${mime.type.libreoffice.text},
            ${mime.type.msoffice.excel},${mime.type.libreoffice.sheet},
            ${mime.type.msoffice.powerpoint},${mime.type.libreoffice.presentation},
            ${mime.type.msoffice.visio},${mime.type.libreoffice.graphics},
            ${mime.type.msoffice.project}"
        pdfboxTextFactory: "text/plain"
        videoConversionFactory: "video/mp4,audio/x-wav,audio/mp3,audio/mpeg,audio/x-mpeg,video/quicktime,video/3gpp,video/x-flv,video/mpeg,video/x-msvideo,video/x-matroska,video/x-ms-asf,audio/x-aiff,audio/mp4,video/gif,video/mp2p"
```
