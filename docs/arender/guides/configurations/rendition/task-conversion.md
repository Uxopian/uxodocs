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
# Clear external resource URLs (img, input[type=image]) from the HTML before conversion
tools.wkhtmltopdf.external.resource.urls.cleared=false
```

### Clearing external image URLs before conversion

When a mail (or any HTML document) references images through external URLs (`http://`, `https://`, `ftp://`, `file://` or protocol-relative `//`), wkhtmltopdf attempts to fetch them during the conversion. On environments where these URLs cannot be resolved (no Internet access, restrictive firewall, unreachable hosts, …), wkhtmltopdf will retry each request before giving up, which can cause the conversion to take a very long time and eventually time out.

The property `tools.wkhtmltopdf.external.resource.urls.cleared` can be enabled to pre-process the HTML and empty the `src` attribute of `img` and `input[type=image]` elements that point to an external URL, **before** handing the document to wkhtmltopdf. The page layout and the surrounding structure are preserved (only the external image references are blanked out), so the resulting PDF keeps the original positioning of the content.

```properties title="application.properties located in ARender-Rendition-{{version}}\modules\TaskConversion"
# Enable clearing of external resource URLs prior to wkhtmltopdf conversion
tools.wkhtmltopdf.external.resource.urls.cleared=true
```

:::note
Embedded images (e.g. `data:` URIs encoded in base64) and images referenced through relative paths are **not** affected by this option — they will still be rendered normally.
:::

## Compensate JNI page normalization for annotations

When the **JNI PDF renderer** (`JNIPdfEngine`) is used, pages that are significantly larger than A4 are normalized to A4 dimensions for display, so that every page appears at the same size in the viewer. This display normalization also affects the geometry of any annotation placed on such a page: the annotation is positioned and sized against the normalized A4 dimensions instead of the true page dimensions. When the annotation is later burned into the downloaded document, it is applied to the true (larger) page and ends up mispositioned and undersized. This affects **every kind of annotation** (redactions, highlights, stamps, notes, drawings, …).

The property `annotation.compensate.jni.page.normalization` can be enabled to rescale the annotation geometry from the normalized dimensions back to the true page dimensions before burning, so the burned annotations match what is displayed in the viewer.

```properties title="application.properties located in ARender-Rendition-{{version}}\modules\TaskConversion"
# Compensate the JNI renderer page normalization when burning page-relative annotations
annotation.compensate.jni.page.normalization=true
```

:::warning
Redactions are especially sensitive: a redaction is meant to permanently remove the underlying text or image from the burned document. If a redaction is mispositioned or undersized, part of the page that was supposed to be redacted is left exposed, and the confidential content underneath can still be read or extracted from the downloaded file. When using the JNI PDF renderer, enable this property so that redactions are burned over the correct area of the true page.
:::

:::note
This property is only relevant when the **JNI PDF renderer** (`JNIPdfEngine`) is enabled on the service broker (`DSB_MICRO-SERVICES_PDF-RENDERER=JNIPdfEngine`). With the default PDFOwl renderer the page dimensions are not normalized, so this compensation is not needed. The property is disabled (`false`) by default.
:::

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