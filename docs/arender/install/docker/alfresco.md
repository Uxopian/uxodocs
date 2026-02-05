---
title: "Alfresco"
sidebar_position: 3
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: f0a985e5e6458b9788a965bff9763c54f77d711b44b328eeb56fd7a1e3952e0a
---

## ARender UI for Alfresco

ARender ui for Alfresco images tag are prefixed with "-alfresco" (e.g arender-ui:4.8.21-alfresco).

To run the container, execute:

```bash
$> docker run artifactory.arondor.cloud:5001/arender-ui:4.8.21-alfresco \
-e ARENDERSRV_ARENDER_SERVER_ALFRESCO_ATOM_PUB_URL="http://<alfresco-host>:<alfresco-port>/alfresco/api/-default-/cmis/versions/1.1/atom"
```

## Alfresco in Docker

Add the ARender plugin in Alfresco share container and Alfresco content repository container to make it works.

If needed, some resources about ARender for Alfresco are available below:

- [See Alfresco documentation](/v4/connector/alfresco/_index.md)
- [Download Alfresco plugin](https://artifactory.arondor.cloud/artifactory/webapp/#/artifacts/browse/tree/General/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/4.8.21/arender-for-alfresco-share-plugin-4.8.21.jar)

:::warning
The plugin must be in tomcat/lib or /tomcat/shared/lib. Insure these paths are listed in shared.lib property in Alfresco component's **catalina.properties**.
:::

To inform share about the location of the ARender UI server, add the following lines in Alfresco share configuration file.

**tomcat/shared/classes/alfresco/web-extension/share-config-custom.xml**


```XML
  <config evaluator="string-compare" condition="Arender">
    <url>http://{arender-web-ui-server}</url>
    <!-- example: <url>http://localhost</url> -->
  </config>
```
