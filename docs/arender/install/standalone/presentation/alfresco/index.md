---
title: "Alfresco"
last_update:
  date: '2026-02-02T12:16:59.945Z'
  author: CI/CD Bot
content_hash: cc64f74eac85e9a1cf74ee300c34cdfb7d0faca3639dd749ecd8f986c9765970
---

We present here the installation of the ARender Web-UI in alfresco.

In our example, we are deploying the presentation server
in an environment with:

- Operating system: Ubuntu 16.04.5
- Alfresco Community 5.2.0 (with tomcat server)
- ARender Web-UI version VERSION

## Retrieve the presentation server archive

Using the username and password beforehand provided (contact arender-sales@arondor.com if you want an access),
you can retrieve the web application version used in WAR format [here](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/arondor-arender-hmi-alfresco/VERSION/arondor-arender-hmi-alfresco-VERSION.war).

## Deployment of the ARender Web-UI server in Alfresco

- Stop the Alfresco service
- Copy the file **arondor-arender-hmi-alfresco-{version}.war** in your *{alfresco_tomcat}/webapps* folder
- Rename the .war file to **ARenderHMI.war**

![alfresco](/img/arender/alfresco/alfresco-01.png)

## The installation is complete

You can now start the alfresco server and try to open a file with a link formed like this:

```html
http://{arender_serveur}:{arender_port}/ARenderHMI/?nodeRef={nodeRef}&user={user}&alf_ticket={ticket}&versionLabel={version}
```

![alfresco](/img/arender/alfresco/alfresco-new-01.png)

You have finished the quick installation of ARender for Alfresco. To go further, go to the page here : **[Advanced configuration](/v4/connector/alfresco/_index.md)**