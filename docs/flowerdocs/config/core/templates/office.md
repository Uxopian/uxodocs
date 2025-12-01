---
title: “DOCX templates
description: 'Reusable templates, by scope, that can be enhanced with variables'
date: '2020-02-02'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 74d923cd4edbb13834d2e49c5fe1404e68b00ea0dde56365aac1d74a3475683f
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';




# Principle
FlowerDocs generates Microsoft Word documents in DOCX format from a template.
This template is also a Microsoft Word document in DOCX format that can contain custom properties (*see below*).
The properties supplied as input to the generator, and included in the template, are modified when the document is generated to take account of the values supplied.

# Properties

## Defining a new property

Before a property can be used in a document, it must first be defined at the document level:  

* Open advanced properties via the following menu: *Information > Properties > Advanced properties*
* In the *Custom*tab, enter the following information: 
    * Name: property name
    * Type: text 
    * Value: enter a default value 
* Click on *Add*

## Using a property

To use a property, it must be added to the body of the document. To do this: 

* Position the cursor at the desired location
* Press `Ctrl` + `F9` simultaneously
* Enter `DOCPROPERTY <Nom de la variable>`
* Press `F9`


## Other actions

|Shortcuts| Description|
|---|---|
|`Alt` + `F9`|Enter/exit edit mode for all custom properties|
|`Shift` + `F9`|Enter/exit edit mode for the selected property|
|`F9`|Update selected property|


# Adhoc use



<Tabs>
  <TabItem value="http" label="HTTP">

```javascript
POST {core}/rest/template/msoffice/{templateId} HTTP/1.1
token:  <token>
Content-Type: application/json
[

        "name": "variable",
        "value": ["myvalue"]

]
```

  </TabItem>
  <TabItem value="curl" label="Curl">

```curl
curl -X POST '{core}/rest/template/msoffice/{templateId}' \
-H 'token: <token>' \
-H 'Content-Type: application/json' \
-d '[

        "name": "variable",
        "value": ["myvalue"]

]'
```

  </TabItem>
</Tabs>
 
