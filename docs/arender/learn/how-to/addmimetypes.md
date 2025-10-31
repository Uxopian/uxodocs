---
title: Ajout de type mime image/vidéo supportés
---

Si votre serveur de rendition ne possède pas tous les types mimes que
vous souhaitez utiliser, il est possible que le serveur puisse tout de
même convertir votre fichier.

Dans le cas d'une conversion image ou vidéo, la liste exhaustive des
fichiers images/vidéos supportés par imagemagick/ffmpeg est longue.

Si vous souhaitez rajouter un type mime, il suffit de créer/modifier le
fichier *application.properties* devant être situé dans le dossier 
modules/RenditionEngine et le fichier *application-security.yaml* situé
dans le dossier modules/RenditionEngine de votre rendition.
Ce fichier viendra surcharger le fichier de configuration de base.

Le fichier *application.properties* dans modules/RenditionEngine avec les les types mime par défaut, 
à modifier pour ajouter/supprimer les types mime voulus :


``` cfg

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



Le fichier *application-security.yaml* dans modules/TaskConversion avec les types mime par défaut,
à modifier pour ajouter/supprimer les types mime voulus au bon convertisseur

``` yaml

app:
  factoriesBeanNames:
    imageFactory: "image/webp,image/png,image/jpeg,image/gif,image/x-ms-bmp,image/x-bmp,image/x-portable-bitmap,image/vnd.adobe.photoshop,image/x-eps,application/postscript,application/dicom,application/pcx,application/x-pcx,image/pcx,image/x-pc-paintbrush,image/x-pcx,zz-application/zz-winassoc-pcx,image/jp2,image/heif,image/wmf"
    imageIOFactory: "image/tiff"
    htmlFactory: "text/html"
    genericConvertOffice: "${mime.type.msoffice.word},${mime.type.msoffice.rtf},${mime.type.libreoffice.text},
                             ${mime.type.msoffice.excel},${mime.type.libreoffice.sheet},
                             ${mime.type.msoffice.powerpoint},${mime.type.libreoffice.presentation},
                             ${mime.type.msoffice.visio},${mime.type.libreoffice.graphics},
                             ${mime.type.msoffice.project}"
    pdfboxTextFactory: "text/plain"
    videoConversionFactory: "video/mp4,audio/x-wav,audio/mp3,audio/mpeg,audio/x-mpeg,video/quicktime,video/3gpp,video/x-flv,video/mpeg,video/x-msvideo,video/x-matroska,video/x-ms-asf,audio/x-aiff,audio/mp4,video/gif,video/mp2p"
```
