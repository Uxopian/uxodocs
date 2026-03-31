---
title: "Task Conversion"
last_update:
  date: '2026-03-06T18:23:33.786Z'
  author: CI/CD Bot
sidebar_position: 2
content_hash: 900edb36ea5f5a72c0a6cb954c8a01a2780f91fc785b494da814d3d33ea3e878
---

## Conversion timeouts

The TaskConversion module exposes two levels of timeout:

- **Per-format timeouts** (in **seconds**): control how long the underlying conversion tool (LibreOffice, wkhtmltopdf, ffmpeg, …) is allowed to run.
- **`conversion.job.timeout.ms`** (in **milliseconds**): a global job-queue timeout applied to all conversion factories. If a conversion job is not picked up and completed within this duration, it is aborted.

:::note application.properties or application.yml located in ARender-Rendition-{{version}}\modules\TaskConversion

| Description                                                  | Parameter Key                | Default value | Unit         | Type    |
| ------------------------------------------------------------ | ---------------------------- | ------------- | ------------ | ------- |
| Global job-queue timeout for all conversion factories        | conversion.job.timeout.ms    | 120000        | milliseconds | Long    |
| Timeout for HTML to PDF conversion                           | html.conversion.timeout      | 120           | seconds      | Integer |
| Timeout for video format conversion                          | video.conversion.timeout     | 300           | seconds      | Integer |
| Timeout for LibreOffice to PDF conversion                    | soffice.conversion.timeout   | 120           | seconds      | Integer |
| Timeout for MS Office to PDF conversion                      | msoffice.conversion.timeout  | 120           | seconds      | Integer |

:::

:::info
When tuning for heavy documents, these converter-side timeouts must be raised alongside the broker's [`arender.conversion.timeout.ms`](/docs/arender/guides/configurations/rendition/service-broker#conversion-coordination-timeout) property (in milliseconds) and the HMI's [`arender.server.rendition.rest.read.timeout`](/docs/arender/guides/configurations/web-ui/server/rest-client/) so all layers share a consistent ceiling.
:::

## Rendition without internet Access and mails with external images

If the Rendition is installed on a server that **does not have access to Internet** and if **mails with external images** needs to be viewed, please apply the below configuration:

- Add a proxy for WKHTMLTOPDF configuration. Create a file named **application.properties** in the TaskConversion module containing the below property (adapt the proxy host if needed) (compatible with version 4.3.8 and higher):

```properties title="application.properties located in ARender-Rendition-{{version}}\modules\TaskConversion"
tools.wkhtmltopdf.options=--disable-javascript,--quiet,--encoding,UTF-8,--load-error-handling,ignore,--disable-external-links,--disable-internal-links,--disable-local-file-access,--proxy,localhost
```

Internal and external links, local file access and iframe URL are disabled by default for HTML to PDF conversion.
The purpose of that is to prevent security issue.

Note this can impact the render of the HTML in ARender: 
- Clickable links will be disabled
- Image display from internal/external link or local file will not be rendered
- Iframe URL will not be rendered

The default properties in the TaskConversion service looks like this: 

```properties title="application.properties located in ARender-Rendition-{{version}}\modules\TaskConversion"
tools.wkhtmltopdf.options=--disable-javascript,--quiet,--encoding,UTF-8,--load-error-handling,ignore,--disable-external-links,--disable-internal-links,--disable-local-file-access
# Disable iframe URL as a safety measure
tools.wkhtmltopdf.iframe.disabled=true
```

## Visit card labels language

VCF format is supported since the version 2023.6.0. Some information, such as address, phone or email are preceded by the type,
called "label", such as "Home" to indicate that the information that follows is personal.
It is possible to change the language of these labels. For now, two languages ​​are available: English and French.

The default property in the TaskConversion service looks like this: 

```properties title="application.properties located in ARender-Rendition-{{version}}\modules\TaskConversion"
# Configure the information fields language. Possible values are : "FR", "EN".
vcard.label.language=EN
```

## TIFF images rendering

Properties are available to configure the rendering of images generated from TIFFs.

:::note application.properties located in ARender-Rendition-{{version}}\modules\TaskConversion

| Description                                                                                                             | Parameter Key                     | Default value | Type    |
| ----------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------------- | ------- |
| For PDF creation from images, the maximum asked width (in pixel)                                                        | image.conversion.maximum.width.px | 2000          | Integer |
| The mime type of the generated images (Since version 2023.14.0) Possible values are **image/png** and **image/jpeg** | image.conversion.target.mime.type | image/png     | String  |
:::

## Convert JPEG and PNG with Apache PDFBox

Since the version 2023.17.0, it is possible de configure a new *factory* to convert PNG and JPEG files by using Apache PDFBox.
This will improve performance in some cases, but above all, it will ensure that the output PDF file is of a similar size to the original file.

To activate this feature, configure it as follows:

:::info[application-security.yaml]

```yml
app:
  factoriesBeanNames:
    imageFactory: "image/webp,image/gif,image/x-ms-bmp,image/x-bmp,image/x-portable-bitmap,image/vnd.adobe.photoshop,image/x-eps,application/postscript,application/dicom,application/pcx,application/x-pcx,image/pcx,image/x-pc-paintbrush,image/x-pcx,zz-application/zz-winassoc-pcx,image/jp2,image/heif,image/wmf"
    pdfboxImageFactory: "image/png,image/jpeg"
```

:::

:::warning[Warning]

Enabling this property can alter the rendering and resulting the page dimensions.

If your workflow relies on consistent page dimensions or pre-existing annotation files linked to specific page coordinates, you must exercise caution when enabling this feature.

:::