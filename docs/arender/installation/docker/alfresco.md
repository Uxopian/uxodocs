---
title: Alfresco
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: d5710816c9b26223cc8ed6bb14075d781860d798d84ecce080f5818e773767a0
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

- [See Alfresco documentation](./guides/configurations/web-ui/connectors/alfresco/_index.en.md)
- [Download Alfresco plugin](https://artifactory.arondor.cloud/artifactory/webapp/#/artifacts/browse/tree/General/arondor-release/com/arondor/arender/arender-for-alfresco-share-plugin//arender-for-alfresco-share-plugin-.jar)


The share plugin must be /tomcat/shared/lib. Insure these paths are listed in shared.lib property in Alfresco component's **catalina.properties**.  


To inform share about the location of the ARender UI server, add the following lines in Alfresco share configuration file.



```XML
  <config evaluator="string-compare" condition="Arender">
    <url>``````````http://{arender-web-ui-server}</url>``````````
    <!-- example: <url>http://localhost</url> -->
  </config>
```


