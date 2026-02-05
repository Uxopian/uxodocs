---
title: "Task conversion"
sidebar_position: 2
---

## Rendition without internet Access and mails with external images

If the Rendition is installed on a server that **does not have access to Internet** and if **mails with external images** needs to be viewed, please apply the below configuration:

- Add a proxy for WKHTMLTOPDF configuration. Create a file named **application.properties** in the TaskConversion module containing the below property (adapt the proxy host if needed) (compatible with version 4.3.8 and higher):

```cfg title="application.properties located in ARender-Rendition-4.X.Y\modules\TaskConversion"
tools.wkhtmltopdf.options=--disable-javascript,--quiet,--encoding,UTF-8,--load-error-handling,ignore,--proxy,localhost
```


Since v4.8.13, internal and external links, local file access and iframe URL are disabled by default for HTML to PDF conversion.
The purpose of that is to prevent security issue.

Note this can impact the render of the HTML in ARender: 
- Clickable links will be disabled
- Image display from internal/external link or local file will not be rendered
- Iframe URL will not be rendered

The default properties in the TaskConversion service looks like this: 

```cfg title="application.properties located in ARender-Rendition-4.X.Y\modules\TaskConversion"
tools.wkhtmltopdf.options=--disable-javascript,--quiet,--encoding,UTF-8,--load-error-handling,ignore,--disable-external-links,--disable-internal-links,--disable-local-file-access
# Disable iframe URL as a safety measure
tools.wkhtmltopdf.iframe.disabled=true
```

## Legacy image conversion

To use the legacy image conversion, used in the version 3 of ARender, modify the *application-security.yaml* at 
modules/TaskConversion file with the desired mime types for the *legacyImageFactory* element.

```yaml title="application-security.yaml"
app:
  factoriesBeanNames:
    legacyImageFactory: "image/tiff,image/png,image/jpeg,image/gif"    
```

Several additional properties can be set for the conversion:

- *legacy.image.conversion.adapt.size* is used to set the pdf output size as the image input. Can be costly for big 
  images.
- *legacy.image.conversion.keep.aspect* sets the output format to A4. The image stretches otherwise.
- *legacy.image.conversion.rotateLandscapes* can be used if the image is in a landscape orientation to have a portrait
output.

```cfg title="application.properties located in ARender-Rendition-4.X.Y\modules\TaskConversion"
# Adapt the output size to the image
legacy.image.conversion.adapt.size=false
# Keep image aspect, otherwise the output is in A4 format
legacy.image.conversion.keep.aspect=true
# Rotate the landscaped input to a portrait orientation
legacy.image.conversion.rotateLandscapes=false
```

