---
title: "Create a conversion module"
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: 31a885a5c8f26908034c04b43b2cb19bd7e1fa1fd59afa1c86c0cc40bb73eaa4
---

In this tutorial we will focus on the possibility of creating a document
conversion service dedicated to a single type of documents.

## Install the dedicated conversion server

Extract the content of the classic rendition packaging on the server
that you want to dedicate to a conversion type.

In our example, we will dedicate a server to the Office file conversion.

Go to the *modules/TaskConversion/* conversion module folder and drop in
the following configuration file (application.yml):

```yaml
app:
  eureka:
    hostname: <rendition_host_name>

eureka:
  instance:
    metadataMap:
      instanceId: ${eureka.instance.instanceId}
      name: ${spring.application.name}
      context: '[{"context":"/document/convert/","validMimeTypes": []},
      {"context":"/document/signature/validate/","validMimeTypes": []},
      {"context":"/document/alter/","validMimeTypes": []},
      {"context":"/document/image/","validMimeTypes": ["video/mp4"]}]'
      convertMimeType: 'text/rtf,
      application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,
      application/vnd.ms-word.document.macroEnabled.12,application/vnd.openxmlformats-officedocument.wordprocessingml.template,
      application/vnd.ms-word.template.macroEnabled.12,application/vnd.ms-excel,application/x-ms-excel,
      application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel.sheet.macroEnabled.12,
      application/vnd.openxmlformats-officedocument.spreadsheetml.template,application/vnd.ms-excel.template.macroEnabled.12,
      application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,
      application/vnd.ms-powerpoint.presentation.macroEnabled.12,application/vnd.openxmlformats-officedocument.presentationml.template,
      application/vnd.ms-powerpoint.template.macroEnabled.12,application/visio,application/x-visio,
      application/vnd.visio,application/vnd.ms-visio,application/visio.drawing,
      application/vsd,application/x-vsd,image/x-vsd,zz-application/zz-winassoc-vsd,
      application/vnd.oasis.opendocument.text,application/vnd.oasis.opendocument.spreadsheet,application/vnd.ms-project,
      application/vnd.oasis.opendocument.presentation,application/vnd.oasis.opendocument.graphics'
server:
  port: 10001

nurse:
  outPath: ${tmp.dir.doc}
  timeInterval: ${health.time.interval}
  samplesDirectory: ../../samples/
  components:
    - functionality: TKC_TextConversion
      factoryName: "textFactory"
      samplePath: "test.docx"
      docIdStr: "0ff1c3S4mpl3"
```

First, we need to target the rendition server that will be reached by
this isolated conversion micro service (replace
&lt;rendition_host_name&gt; by your rendition server IP/hostname):

```yaml
app:
  eureka:
    hostname: &lt;rendition_host_name&gt;
```

Here we replicate the default configuration of the micro conversion
service, but we change the supported mime types to reduce to Office.

```yaml
  convertMimeType: 'text/rtf,
  application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,
  application/vnd.ms-word.document.macroEnabled.12,application/vnd.openxmlformats-officedocument.wordprocessingml.template,
  application/vnd.ms-word.template.macroEnabled.12,application/vnd.ms-excel,application/x-ms-excel,
  application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel.sheet.macroEnabled.12,
  application/vnd.openxmlformats-officedocument.spreadsheetml.template,application/vnd.ms-excel.template.macroEnabled.12,
  application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,
  application/vnd.ms-powerpoint.presentation.macroEnabled.12,application/vnd.openxmlformats-officedocument.presentationml.template,
  application/vnd.ms-powerpoint.template.macroEnabled.12,application/visio,application/x-visio,
  application/vnd.visio,application/vnd.ms-visio,application/visio.drawing,
  application/vsd,application/x-vsd,image/x-vsd,zz-application/zz-winassoc-vsd,
  application/vnd.oasis.opendocument.text,application/vnd.oasis.opendocument.spreadsheet,application/vnd.ms-project,
  application/vnd.oasis.opendocument.presentation,application/vnd.oasis.opendocument.graphics'
```

Then we change the default port, so as not to conflict with the standard
micro service.

```yaml
server:
  port: 10001
```

As we remove features, we also reduce its spectrum of automatic checks
on Office documents.

```yaml
nurse:
  outPath: ${tmp.dir.doc}
  timeInterval: ${health.time.interval}
  samplesDirectory: ../../samples/
  components:
    - functionality: TKC_TextConversion
      factoryName: "textFactory"
      samplePath: "test.docx"
      docIdStr: "0ff1c3S4mpl3"
```

Once all this configuration done, it is possible to launch this micro
service unitarily with the command:

``` powershell
C:\Rendition4Office\modules\TaskConversion> java -Xmx1024m -jar task-conversion*.jar  
```

It is important to go to the *modules/TaskConversion/* module folder to
simulate a classic rendition launch.

## Classic rendition server side

We want, in our traditional ARender installation, to remove from the
TaskConversion micro service the Office documents that will now be
served by our dedicated server.

To do this, you must once again add a configuration file
(application.yml) next to the TaskConversion micro service jar:

```yaml
    eureka:
      instance:
        metadataMap:
          instanceId: ${eureka.instance.instanceId}
          name: ${spring.application.name}
          context: '[{"context":"/document/convert/","validMimeTypes": []},
          {"context":"/document/signature/validate/","validMimeTypes": []},
          {"context":"/document/alter/","validMimeTypes": []},
          {"context":"/document/image/","validMimeTypes": ["video/mp4"]}]'
          convertMimeType: 'message/rfc822,application/vnd.ms-outlook,text/html,application/zip,application/x-zip,
          application/x-zip-compressed,application/x-rar-compressed,application/x-rar,application/java-archive,
          text/plain,image/png,image/jpeg,image/gif,image/x-ms-bmp,image/x-bmp,image/x-portable-bitmap,
          image/vnd.adobe.photoshop,image/x-eps,application/postscript,application/dicom,application/pcx,
          application/x-pcx,image/pcx,image/x-pc-paintbrush,image/x-pcx,zz-application/zz-winassoc-pcx,
          image/tiff,video/quicktime,video/mp4,video/3gpp,audio/x-wav,audio/mp3,video/x-flv,video/mpeg,
          video/x-msvideo,video/x-matroska,video/x-ms-asf,application/x-empty'
    server:
      port: 9999

    nurse:
      outPath: ${tmp.dir.doc}
      timeInterval: ${health.time.interval}
      samplesDirectory: ../../samples/
      components:
        - functionality: TKC_MailConversion
          factoryName: "mailFactory"
          samplePath: "test.msg"
          docIdStr: "m41lS4mpl3"
        - functionality: TKC_VideoConversion
          factoryName: "videoConversionFactory"
          samplePath: "video.mp4"
          docIdStr: "v1d30S4mpl3"
        - functionality: TKC_ImageConversion
          factoryName: "imageFactory"
          samplePath: "img.png"
          docIdStr: "1m4g3S4mpl3"

```

Here, the treatment is the reverse of what we did for the dedicated
service.

The port is the default port, but the supported mime types are the base
ones *except* Office, and so are the auto-test components.

Once the classic rendition server has been started, this micro service
will be started and will take this configuration without the Office mime
types.

## Conclusion

Now it's your turn to choose which file types you want to isolate, or
use a dedicated high performance machine to convert video for example.

There are many ideas and even more possibilities !
