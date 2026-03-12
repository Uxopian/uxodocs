---
title: Alfresco
sidebar_position: 4
last_update:
  date: '2026-03-12T20:43:52.809Z'
  author: CI/CD Bot
content_hash: 5847305e00cff2205ef0f1ae318fbda2e8c74405208f2ddc1d4e1fb70f67836f
---

## ARender UI for Alfresco

To run the container, execute:

```bash
$> docker run artifactory.arondor.cloud:5001/arender-ui-springboot:{{version}}-alfresco \
-e ARENDERSRV_ARENDER_SERVER_ALFRESCO_ATOM_PUB_URL="http://<alfresco-host>:<alfresco-port>/alfresco/api/-default-/cmis/versions/1.1/atom"
```

## Alfresco in Docker

Add the ARender plugin in Alfresco share container and Alfresco content repository container to make it works.

If needed, some resources about ARender for Alfresco are available below:

- [See Alfresco documentation](/docs/arender/guides/configurations/web-ui/connectors/alfresco/features-share)
- [Download Alfresco plugin](https://artifactory.arondor.cloud/artifactory/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin/{{version}}/arender-for-alfresco-share-plugin-{{version}}.jar)

The share plugin must be /tomcat/shared/lib. Insure these paths are listed in shared.lib property in Alfresco component's **catalina.properties**.

To inform share about the location of the ARender UI server, add the following lines in Alfresco share configuration file.

```XML
  <config evaluator="string-compare" condition="Arender">
    <url>http://{arender-web-ui-server}</url>
    <!-- example: <url>http://localhost</url> -->
  </config>
```