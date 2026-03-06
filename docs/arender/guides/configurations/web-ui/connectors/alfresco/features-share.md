---
title: Features Alfresco Share
sidebar_position: 2
last_update:
  date: '2026-03-06T18:23:33.786Z'
  author: CI/CD Bot
content_hash: 54176994af24327cebdc39209f901dc1e4d80b06cffa88f2a556bd633f566abc
---

## ARender for specific groups only

To set ARender viewer to specific Alfresco groups only, follow the below procedure:

- Go to the module deployment page: **&lt;host name&gt;/share/page/modules/deploy**
- Choose the ARender module: **ARender Preview Plugin**
- Select the evaluator on the right: **group.module.evaluator**
- In the _Evaluator Properties_ :

```yaml
negate: false

relation: OR

groups: <group name>
```

## Configure document types to open with ARender

To configure which type of document should be opened with ARender (other will be opened by the default viewer configured), add the below configuration:

```xml
<config evaluator="string-compare" condition="ArenderExclusion">
  <viewerMimeTypes>{mimeType1},{mimeType2},...,{mimeTypeN}</viewerMimeTypes>
  <!-- exemple : <viewerMimeTypes>"application/msword,image/vnd.dwg,image/x-dwg,image/x-dwf</viewerMimeTypes-->
</config>
```

## Configure document types to convert to PDF using ARender

ARender plugin for Alfresco Share can ask a conversion of the Document to PDF, before viewing it.

It has the advantage to show the document faster, especially for complex document like AutoCAD.

Configuration is done like below:

```xml
<config evaluator="string-compare" condition="ArenderExclusion">
  <renditionMimeTypes>{mimeType1},{mimeType2},...,{mimeTypeN}</renditionMimeTypes>
  <!-- exemple : <renditionMimeTypes>"application/msword,image/vnd.dwg,image/x-dwg,image/x-dwf</renditionMimeTypes-->
</config>
```
