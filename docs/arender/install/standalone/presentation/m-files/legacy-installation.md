---
title: "Legacy installation"
sidebar_position: 1
last_update:
  date: '2026-02-05T15:28:19.384Z'
  author: CI/CD Bot
content_hash: 30029f46c401decce0f7938c87d1134217eaf71915092e3255fb1c580f6c5cbf
---

Here we present the Web-UI installation in M-Files. 

In our example, we deploy the Web-UI
in an environment with:

- Operating system : Windows Server 2016 Datacenter
- M-Files 
- A Tomcat9 server
- ARender Web-UI version 4.8.21
- ARender Rendition version 4.8.21. For more information on how to install, see **[documentation](../install.md)**


## Steps to Configure the Rendition

- Place the *arondor-arender-mfiles-connector-1.0.5.jar* under *rendition-engine-package-4.8.21/modules/RenditionEngine/client_libs*

[arondor-arender-mfiles-connector-1.0.5.jar](/docs/install/install-mfiles/arondor-arender-mfiles-connector-1.0.5.jar)
- Place the following property file *application.properties* under *rendition-engine-package-4.8.21/modules/RenditionEngine/*

[application.properties](/docs/install/install-mfiles/application.properties)
- Start the ARender Rendition server

## Steps to install the Web-UI

Using the username and password previously provided (contact arender-sales@arondor.com if you want access),
you can recover the version of the web application used in WAR format
**[here](https://artifactory.arondor.cloud:443/artifactory/arondor-all/com/arondor/arender/arondor-arender-hmi/4.8.21/arondor-arender-hmi-4.8.21.war)**.

Use the Tomcat9 server. You just need to deploy your war (*arondor-arender-hmi-4.8.21.war* into and to **rename it** *arondor-arender-mfiles.war*), now place it there :

* Program Files
    * Apache Software Foundation
        * Tomcat 9.0
            * webapps

Copy the previously downloaded *arondor-arender-mfiles-connector-1.0.5.jar* connector, place it under *arondor-arender-mfiles-4.8.21/WEB-INF/lib*.

Afterwards :
- Place those files *(below)* under ***arondor-arender-mfiles-4.8.21/WEB-INF/classes***<br/>
[arender-editor-specific-integration.xml](/docs/install/install-mfiles/arender-editor-specific-integration.xml)
[arender-server.properties](/docs/install/install-mfiles/arender-server.properties)

:::warning 

You need to edit different values of the *arender-server.properties* file depending on your M-Files vault configuration
:::

## Steps to deploy ARender on M-Files
- Open your M-File safe
- Install the ARenderApp.zip in your vault apps.
[ARenderApp.zip](/docs/install/install-mfiles/ARenderApp.zip)

![mfiles](pathname:///img/arender/mfiles/mfiles-03.png)
*( M-Files Admin -> choose your vault -> right click -> Applications -> Install )*

- Log out of the vault and log back in to ensure changes are accounted for

## Steps to open a document with M-Files

- Restart the IIS server

![mfiles](pathname:///img/arender/mfiles/mfiles-04.png)

- Start the Tomcat9 server
- Access M-Files under M:/

![mfiles](pathname:///img/arender/mfiles/mfiles-05.png)

- Select your safe
- Drag and drop a document to open it with ARender

![mfiles](pathname:///img/arender/mfiles/mfiles-06.png)
