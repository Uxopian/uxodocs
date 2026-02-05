---
title: "FAQ"
last_update:
  date: '2026-02-05T15:11:39.219Z'
  author: CI/CD Bot
content_hash: d0c70dbe7c74510d22cbc03cc2de8f8c9553fff4f3e00121bd2478e55423a7a6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## How to define another JVM?

According to some contexts, a specific JVM may be used for ARender
execution.

For this purpose, place into the PATH environment variable of the user
running ARender service the path to the java executable.



## In which languages is the ARender interface translated?


ARender is translated into 13 languages:

Arabic, German, English, Spanish, French, Italian, Portuguese, Chinese, Brazilian Portuguese, Hebrew, Russian, Polish, Japanese.

It is also possible to add new languages to the ARender WAR or EAR deployment by adding a label file.

To do this, copy the English translation of the labels located in WEB-INF/classes/labels/ARenderLabels_en.properties and create your own translation by renaming it with the locale you want to see supported.



## How to purge web browser cache?" complex


After a new installation, it’s possible client side (users) keep in
cache another version and that can cause an incompatibility problem with
the new ARender Web-UI application installed.

The compatibility problem usually solve itself after 24h maximum when
browser cache expires.

To solve the problem immediately, all you need is to purge the user
browser cache.

<Tabs>
<TabItem value="Internet Explorer 6" label="Internet Explorer 6">

1) Click on « Tools » then « Internet options »
2) In the part « Temporary internet files », click on « delete the files»
3) Check the box « Delete all content off-line », then click on « OK »

</TabItem>

<TabItem value="Internet Explorer 9" label="Internet Explorer 9">

1) Click on « Tools » then « Internet Options »
2) Int the part « navigation history », click on « Delete »
3) Check the box « Temporary internet files », then click on « Delete »

</TabItem>
</Tabs>

:::note
This problem comes from applications conception in GWT framework which use a specific resource at loading step called «
arendergwt.nocache.js ». The mention '.nocache.' would have to force the browser to not use the cache for this file , but it’s not really respected by Internet Explorer
:::



## Where can I find log files?


Log files trace information and errors about ARender use.

### Rendition server

To have access to logs, go to « logs » folder of Rendition server installation (by default: « C:Program FilesARender-Rendition-2.0.3logs»)

### WebSphere

To have access to ARender application logs, go to « logs » folder of
WebSphere installation folder

- By default:

  _« C:Program Files\IBMWebSphere\AppServer\profiles\App\Srv01\logs»_

- FileNet CE logs are located by default in:

  _« C:\Program Files\IBMWebSphere\AppServer\profiles\AppSrv01\FileNet\server1»_



## Which file types can I visualize?


Using ARender, you are able to visualize many types of file as:

Standard:

- PDF - all versions
- Images: JPEG, PNG, TIFF, GIF, BMP, JNG, PBM, PSD, EPS, PS, DCM (Format DICOM) and [all formats supported by ImageMagick](http://www.imagemagick.org/script/formats.php)
- Microsoft Office (97-2013): Word (.doc, .docx) , PowerPoint (.ppt, .pptx), Excel (.xls, .xlsx), WordML (.xml), Visio (.vsd)
- Composite files: ZIP, EML, MSG
- Others: TXT, OpenDocument (LibreOffice or OpenOffice)

In option:

- AutoCAD DWG



## What is ARender's versions policy?" complex


ARender's version policy is set the following way:

> [Generation Version].[Major Version].[Minor Version]

Optionally , a packaging version may be introduce, as follow:

> [Generation Version].[Major Version].[Minor Version]-[Packaging Version]

_Each number indicate:_

- **Generation version:** Generation means technological choices, it's an important change from the previous generation.

- **Major Version:** Each major version provide APIs and interface changes, as well as important new functions.

- **Minor Version:** Each minor version provide anomalies corrections as well as additional function, disable by default.

- **packaging Version:** Each packaging version only provide configuration / default parameters changes, without product's code changes.


:::note
  **Majors and Minors versions:** Major version 2.3.0 has been published the 18/06/2014, and introduced Annotation APIs and JavaScript Api changes.

  **Packaging and Minor version:** Minor version 2.3.5 has been published the 28/01/2015, and version 2.3.5-1 has been published the 02/02/2015.
:::


### Publication rythm

A major version is published each year, late june.

This version may also increment the generation version 2015 will see a
new product generation, ARender 3.0.

A new minor version is published every six weeks. Packaging version are
on a need basis or if asked.

### Ascending compatibility

Every three minor versions of the same major release are
retro-compatible. This is true for:

- Specifics parameters on server or client side.
- Specific development on various APIs
- Presentation (Web-UI) and rendition server interoperability

This means majors version can have significant change that will require
upgrade of the various ARender's modules.

### Product's support

Arondor will support every minor versions of the last two major
versions, it's all version from the last two years.




## How to set produced image's quality and size ?" complex


Most documents are being converted inside ARender to be visualized on
the browser.

This conversion (rendition) has multiple advantages:

- **Streaming:** only visualized pages are sent to the client
- **Band width reduction:** Most produced images' size are smaller than
  the source.
- **Quality:** Work being done on the server side, restitution quality
  doesn't depend on the browser setting (font, graphic hardware, ...).

Most fullscreen pages are about 100ko (un example ici).

Complicated images may be much heavier (scan documents, photos). On [this document](http://arender.fr/ARender/ARender.html?url=http://www.arender.fr/pdf/pdf/Aquarama038.pdf), we are closer to 900ko. It will also depend on screen resolution: a 1600x900 screen resolution will require a 1300 pixels wide in fullscreen.

ARender's default configuration is conservative quality wise, it works for most documents. However there is no miracle.
**To be clear, there is always the need to make choices between quality and size the images produced.**

On ARender's side, the entire configuration is made on the rendition server, on the arender-rendition-`{unix|windows}`.xml, bean "jnipdfRenderer". to be precise. Six main parameters can be used to tip the scale, following are the default values:

```XML
  <property name="**pageImageMimeType**" value="image/jpeg" />
  <property name="**quality**" value="100"/>
  <property name="**maxWidth**" value="8192"/>
  <property name="**antiAlias**" value="8"/>
  <property name="**imageType**" value="IMAGE_TYPE_RGB"/>
  <property name="**overZoom**" value="1.0"/>
```

In details:

- **imageType:** Produced image's colorspace, choose from:

    ```cfg
      "IMAGE_TYPE_RGB",
      "IMAGE_TYPE_ARGB",
      "IMAGE_TYPE_ARGB_PRE",
      "IMAGE_TYPE_BGR",
      "IMAGE_TYPE_GRAY",
      "IMAGE_TYPE_BINARY",
      "IMAGE_TYPE_BINARY_DITHER"
    ```

- **pageImageMimeType:** Image type produced. Can be:
  - image/jpeg: Very effective for scanned documents and pictures
  - image/png: More effective for text document (word, txt, pdf).

    Summary:

    ![image](pathname:///img/arender/png_vs_jpeg_medium.png)

- **quality:** Image compression level, jpeg or png (1-100), default is 100. Grain and compression levels depend on the generated image's type. Maximal quality is selected by default.

- **maxWidth:** Maximum size for images to produced (in pixels). It's especially important for big paper documents (A0 plans for example), when the user zoom-in.

- **antiAlias:** Text rendition needs anti-aliasing, via sub-pixelling technique.

- **overZoom:** Zoom level for the expected zone (float: 0.1 - 2.0, by default: 1.0).


:::note
Some examples:

- The 0.8 value imply a 80% zoom on the produced image, if the client is asking for a 1000 pixels
  wide image, rendition server will produced a 800 pixels wide image, the browser will have to
  zoom-in at 1000 with the following loss of quality.

- The 1.2 value will apply a 120% zoom on the produced image, therefor the image will be bigger
  than necessary. With the rise of new sub-pixelling screens, this option may be interesting to
  improve image.

:::



## Does ARender is suitable for people who need better accessibility ?


Since version 4.5, buttons and images have a description that can be read by software that help visually impaired people, for example :

More details in the documentation on [the accessibility feature](../feature/accessibility.md)
