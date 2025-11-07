---
title: "Features Alfresco Share"
---







## ARender for specific groups only

To set ARender viewer to specific Alfresco groups only, follow the below procedure:

- Go to the module deployment page: **&lt;host name&gt;/share/page/modules/deploy**
- Choose the ARender module: **ARender Preview Plugin**
- Select the evaluator on the right: **group.module.evaluator**
- In the *Evaluator Properties* :

```yaml
negate : false

relation : OR

groups : <group name>
```

## Configure document types to open with ARender

To configure which type of document should be opened with ARender (other will be opened by the default viewer configured), add the below configuration:


``` xml
<config evaluator="string-compare" condition="ArenderExclusion">
        <viewerMimeTypes>{mimeType1},{mimeType2},...,{mimeTypeN}</viewerMimeTypes>
    <!-- exemple : <viewerMimeTypes>"application/msword,image/vnd.dwg,image/x-dwg,image/x-dwf</viewerMimeTypes-->
</config>
```


## Configure document types to convert to PDF using ARender

ARender plugin for Alfresco Share can ask a conversion of the Document to PDF, before viewing it.

It has the advantage to show the document faster, especially for complex document like AutoCAD.

Configuration is done like below:


``` xml
<config evaluator="string-compare" condition="ArenderExclusion">
        <renditionMimeTypes>{mimeType1},{mimeType2},...,{mimeTypeN}</renditionMimeTypes>
    <!-- exemple : <renditionMimeTypes>"application/msword,image/vnd.dwg,image/x-dwg,image/x-dwf</renditionMimeTypes-->
</config>
```


