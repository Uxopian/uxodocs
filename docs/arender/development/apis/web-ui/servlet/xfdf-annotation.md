---
title: XFDF of the annotations
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 4cda93495c1737cf40770feb8933c4208236b5750e7a728aba159188845b037d
---

## Download XFDF or FDF

A servlet is deployed to download the XFDF or FDF file of the annotations of a document.

### Request

This functionality is accessible via the servlet: **servletXFDFAnnotations**

Usable in GET

#### Request example

```bash
curl -X GET 'http://<arender_host>/ARender/arendergwt/servletXFDFAnnotations?uuid=docUUID&type=typeFile'
```

- uuid: document id
- type: the type of file to download. XFDF or FDF (default: XFDF)

### Servlet Response

The XFDF or FDF file of document annotations given as parameter is downloaded.

## Load XFDF

A servlet is deployed to load the XFDF file of the annotations to a document sent in parameter.

### Request

This functionality is accessible via the servlet: **servletXFDFAnnotations**

Usable in POST

#### Request example

```bash
curl -X POST -H "Content-Type: multipart/form-data" -F "file=@yourXFDF.xfdf" "https://<arender_host>/ARender/arendergwt/servletXFDFAnnotations?uuid=docUUID"
```

- uuid: document id
- yourXFDF: title of your XFDF file

If the file or annotations format are in FDF format, they will be loaded in XFDF format.

**Example XFDF file**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ns0:xfdf xmlns:ns0="http://ns.adobe.com/xfdf/">
  <ns0:annots>
    <ns0:highlight color="#273746" flags="obfuscate" name="c553fe65-a3a0-4628-b396-1201bfea6285" page="1" rect="153.26161,334.42,264.57193,374.02002" title="admin" creationdate="D:20221214090312+00'00'" opacity="1.0" coords="153.26161,374.02002,264.57193,374.02002,153.26161,334.42,264.57193,334.42"/>
    <ns0:highlight color="#273746" flags="obfuscate" name="d374f298-205f-420e-a7d6-acd55e337151" page="1" rect="43.2,334.42,114.40608,374.02002" title="admin" creationdate="D:20221214090312+00'00'" opacity="1.0" coords="43.2,374.02002,114.40608,374.02002,43.2,334.42,114.40608,334.42"/>
    <ns0:circle color="#EAF39C" flags="" name="cfdbee9c-dce1-4e62-bc10-55ab1554476b" page="0" rect="82.02787,218.50267,183.40193,337.67523" title="Unknown" creationdate="D:20221228084701+00'00'" opacity="0.7" fringe="0.0,0.0,0.0,0.0" interior-color="#EAF39C" width="0.0" style="solid" intensity=""/>
  </ns0:annots>
</ns0:xfdf>
```

### Servlet Response

The XFDF or FDF file of document annotations given as parameter is downloaded.
