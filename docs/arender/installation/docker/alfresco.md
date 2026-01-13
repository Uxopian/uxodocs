---
title: Alfresco
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 7bb946f83f30cb4b91176fcf0fe9b50f7ad281820cab0e5d8137771247f079d5
---

## ARender UI for Alfresco

To run the container, execute:

```bash
$> docker run /arender-ui-springboot:-alfresco \
-e ARENDERSRV_ARENDER_SERVER_ALFRESCO_ATOM_PUB_URL="http://<alfresco-host>:<alfresco-port>/alfresco/api/-default-/cmis/versions/1.1/atom"
```

## Alfresco in Docker

Add the ARender plugin in Alfresco share container and Alfresco content repository container to make it works.

If needed, some resources about ARender for Alfresco are available below:

- [See Alfresco documentation](/docs/arender/guides/configurations/web-ui/connectors/alfresco/features-share)
- [Download Alfresco plugin](https://artifactory.arondor.cloud/artifactory/webapp/#/artifacts/browse/tree/General/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin//arender-for-alfresco-share-plugin-.jar)

The share plugin must be /tomcat/shared/lib. Insure these paths are listed in shared.lib property in Alfresco component's **catalina.properties**.

To inform share about the location of the ARender UI server, add the following lines in Alfresco share configuration file.

```````````XML
  <config evaluator="string-compare" condition="Arender">
    <url>``````````http://{arender-web-ui-server}</url>``````````
    <!-- example: <url>http://localhost</url> -->
  </config>
```````````
