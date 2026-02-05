---
title: "Alfresco"
last_update:
  date: '2026-02-05T15:28:19.384Z'
  author: CI/CD Bot
content_hash: cff50d98109fa3668104116b60a4d96f677ff769f85e8cea8ad78e93727b1342
---

We present here the installation of the ARender Web-UI in alfresco.

In our example, we are deploying the presentation server
in an environment with:

- Operating system: Ubuntu 16.04.5
- Alfresco Community 5.2.0 (with tomcat server)
- ARender Web-UI version 4.8.21

## Retrieve the presentation server archive

Using the username and password beforehand provided (contact arender-sales@arondor.com if you want an access),
you can retrieve the web application version used in WAR format [here](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/arondor-arender-hmi-alfresco/`4.8.21`/arondor-arender-hmi-alfresco-`4.8.21`.war).

## Deployment of the ARender Web-UI server in Alfresco

- Stop the Alfresco service
- Copy the file **arondor-arender-alfresco-`{version}`.ampwar** in your *`{alfresco_tomcat}`/webapps* folder
- Rename the .war file to **ARenderHMI.war**

![alfresco](pathname:///img/arender/alfresco/alfresco-01.png)

## The installation is complete

You can now start the alfresco server and try to open a file with a link formed like this:

```html
http://{arender_serveur}:{arender_port}/ARenderHMI/?nodeRef={nodeRef}&user={user}&alf_ticket={ticket}&versionLabel={version}
```

![alfresco](pathname:///img/arender/alfresco/alfresco-new-01.png)

You have finished the quick installation of ARender for Alfresco. To go further, go to the page here : **[Advanced configuration](../../../../connector/alfresco/index.md)**