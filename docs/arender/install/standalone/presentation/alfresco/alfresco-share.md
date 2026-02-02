---
title: "Installation in Share"
last_update:
  date: '2026-02-02T12:16:59.945Z'
  author: CI/CD Bot
content_hash: 5209e1672ca3aaf84d0e7e8d970872df475f4cb0a016e2c8365c1a2a50996fb2
---

We present here the continuation of the installation of the Web-UI, in the Share module of Alfresco.

## Retrieve the presentation server archives

Using the username and password beforehand provided,
you can retrieve the arender for Share plugin here: [arender-for-alfresco-share-plugin-VERSION.jar](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/arender-for-alfresco-share-plugin/VERSION/arender-for-alfresco-share-plugin-VERSION.jar)
and the arender for ACS plugin here: [arender-for-alfresco-ACS-plugin-VERSION.jar](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/arender-for-alfresco-ACS-plugin/VERSION/arender-for-alfresco-ACS-plugin-VERSION.jar)

## Re-deployment of the ARender Web-UI server in Alfresco

If your Alfresco and Share module does not share the same tomcat, you will have to drop the plugin
**arender-for-alfresco-share-plugin-{version}.jar** and **arender-for-alfresco-ACS-plugin-{version}.jar** in the *lib/* folder of each of these
deployed applications.

If they are deployed in the same tomcat, then drop the **arender-for-alfresco-share-plugin-{version}.jar** and **arender-for-alfresco-ACS-plugin-{version}.jar** plugin into *{alfresco_tomcat}/shared/lib*.

The two plugins respectively allow to extend the ACS REST API used by ARender and the integration of the ARender viewer in share.

Add the following lines to the _{alfresco_tomcat}/shared/classes/alfresco/web-extension/**share-config-custom.xml**_ file between the alfresco-config attributes.

```xml
<config evaluator="string-compare" condition="Arender">
        <url>http://{arender_serveur}:{arender_port}/{arender_contexte}</url>
        <!-- exemple: <url>http://192.168.1.8:8080/arender-web-ui</url> -->
</config>
```

![alfresco](/img/arender/alfresco/alfresco-03.png)

## The installation complete

You can now start the alfresco server and try to open a file stored in it.

![alfresco](/img/arender/alfresco/alfresco-04.png)

You have finished the quick installation of ARender for Alfresco Share. To go further, please refer to the [Features documentation](../../../../connector/alfresco/features-share.md) page to know the features of such integration.**
