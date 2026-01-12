---
# Do not modify
draft: false
title: "Fast2 release notes - "
date: 2023-04-25

# To modify
version: "2.9.0" # ex of format: 2.2.1
major_version: "2" # minor version of the release note    ex: 2.2
# description : "Stop and restart workers from UI, Filenet injector improvement, addition of Documentum extractor" # Heavily-keywords-charged sentence for short preview of the release note + google SEO
---

### Regression

Workers : still alive after stopping Fast2 for Linux

OCR : Tesseract handles PDF contents

### New feature

PunnetSerializer : support bulk serialization of punnets as JSON

### Issue

Polygon for P8 annotations are badly positioned

CSVWriter - Empty file if New column header field is null

Improve layout conversion for P8 annotations

ExplorePlace : data not searchable without a type

Dashboards : avoid start exception when dashboards are disabled

OpenText : logging categories thrown an exception

Delete map : "delete" word appears when selecting a row

Duplicating a source task duplicates documents fetched

Workers : still alive after stopping Fast2 for Windows

Worker : the worker started by the broker is not flagged as embedded anymore

Dashboards : autostarter parameter should be false by default

Trigger campaign task not in catalog

Update DefaultMap settings

### Evolution

Open Fast2 interface only when Fast2 is fully started/launched

Worker : Improve speed punnet creation for sources with less than 100 docs

Logs : Actuator exception when killing broker and worker(s)

Broker : launch its own worker script

Task Configuration : check mandatory fields are completed

Task Configuration : Check mandatory fields for the whole map

Report sent by email at the end of the campaign

Shared Objects : place rebuilding

Embed dashboards in the default Fast2 package for download

LocalSource : Parse input JSON file as punnet

UI : Ask confirmation before deleting objects

Catalog : duplicate existing task

Catalog : New task to start a campaign

Wang To XFDF - Encoding issue for Euro character (€)

Wang To XFDF - Post it types are closer to simple text types

Wang To XFDF - Lines annotation exception management

Annotations : Convert Wang to XFDF from tiff content

Local source : add extraction limit in configuration task

Panagon Content Services : New task for content extraction

SQLSource : Allow extraction of duplicated data

SQLStatement : handles contents and annotations

FileNet Extractor : silent fail for corrupted annotations

FileNet Extraction : Check if punnet is not empty

Improve layout conversion for P8 annotations with complex contents

AWS SnowBall : connection details for injection

AWS S3 : save old key when processing S3 objects as punnets

OpenText : handles set data type for categories

OpenText : Proxy password should be hidden

OCR : Tesseract verify if output doc is corrupted

<br /><br />
And other minor improvements.
