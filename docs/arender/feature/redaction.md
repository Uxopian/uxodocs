---
title: Redaction
sidebar_position: 14
last_update:
  date: '2026-02-02T12:16:59.945Z'
  author: CI/CD Bot
content_hash: 787d74dba2f658134c48931dbf0bdc05b222f970a7fbf6844cbe486346a96377
---
## Default behavior 

ARender offers the possibility to hide content from any document thanks to the **redaction feature**.

![image](/img/arender/features/redaction.gif)

To show the redaction buttons, add the below properties:


```cfg title="WEB-INF/classes/arender.properties"
topPanel.obfuscate=true
topPanel.obfuscateZone=true
```

:::warning
By default, only **admin** user can add Redaction on the document.

To test you need to:
* Connect as admin:
    * Either empty ARender cookie,
    * Or open a browser in private navigation.
* Open the following link: [LIVE EXAMPLE](https://www.demo.arender.io/?user=admin&topPanel.obfuscate=true&topPanel.obfuscateZone=true)
:::
  

## True redaction

In the previous example, the text below the Redactions is fetched and can be copied by any user.

If you need to use true redact, i.e. only fetch the text for authorized users, you need to:

* Activate the fetch of Redaction annotation before the image generation:


```cfg title="WEB-INF/classes/arender-server.properties"
arender.server.process.annotations.rendition=true
```

* Implement the **AuthenticationServiceProvider** interface. Example available on [GitHub](https://github.com/arondor-connectors/sample-connectors/blob/master/arender-sample-hmi/arender-sample-hmi-connector/src/main/java/com/arondor/arender/sample/connector/authentication/service/CustomAuthenticationServiceProvider.java)