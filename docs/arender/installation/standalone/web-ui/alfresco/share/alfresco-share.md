---
title: Installation in Share
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 583fca2c2a908ffa1d387aee27646f513534eca11c4cc6edaf65443b854db39e
---

We present here the continuation of the installation of the Web-UI, in the Share module of Alfresco.

## Retrieve the presentation server archives

Using the username and password beforehand provided,
you can retrieve the arender for Share plugin here: [arender-for-alfresco-share-plugin-.jar](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/arender-for-alfresco-share-plugin//arender-for-alfresco-share-plugin-.jar)
and the arender for ACS plugin here: [arender-for-alfresco-ACS-plugin-.jar](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/arender-for-alfresco-ACS-plugin//arender-for-alfresco-ACS-plugin-.jar)

## Re-deployment of the ARender Web-UI server in Alfresco

If your Alfresco and Share module does not share the same tomcat, you will have to drop the plugin
**arender-for-alfresco-share-plugin-&#123;version&#125;.jar** and **arender-for-alfresco-ACS-plugin-&#123;version&#125;.jar** in the _lib/_ folder of each of these
deployed applications.

If they are deployed in the same tomcat, then drop the **arender-for-alfresco-share-plugin-&#123;version&#125;.jar** and **arender-for-alfresco-ACS-plugin-&#123;version&#125;.jar** plugin into _&#123;alfresco_tomcat&#125;/shared/lib_.

The two plugins respectively allow to extend the ACS REST API used by ARender and the integration of the ARender viewer in share.

Add the following lines to the _&#123;alfresco_tomcat&#125;/shared/classes/alfresco/web-extension/**share-config-custom.xml**_ file between the alfresco-config attributes.

```````````xml
<config evaluator="string-compare" condition="Arender">
        <url>``````````http://{arender_serveur}:{arender_port}/{arender_contexte}</url>``````````
        <!-- exemple: <url>http://192.168.1.8:8080/ARenderHMI</url> -->
</config>
```````````

![alfresco](/img/arender/alfresco/alfresco-03.png)

## The installation complete

You can now start the alfresco server and try to open a file stored in it.

![alfresco](/img/arender/alfresco/alfresco-04.png)

You have finished the quick installation of ARender for Alfresco Share. To go further, go to the page here : **[Advanced configuration](/docs/arender/guides/configurations/web-ui/connectors/alfresco/features-share)**
