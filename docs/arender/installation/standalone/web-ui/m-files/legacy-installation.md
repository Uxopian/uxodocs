---
title: Legacy installation
sidebar_position: 1
last_update:
  date: '2026-03-06T18:23:33.786Z'
  author: CI/CD Bot
content_hash: c1eaf0048d84821e22ed4dcbd8ba92115a5d6abc3072a3e5c93afbc8789301ab
---

Here we present the Web-UI installation in M-Files.

In our example, we deploy the Web-UI
in an environment with:

- Operating system : Windows Server 2016 Datacenter
- M-Files
- A Tomcat9 server
- ARender Web-UI version
- Have a Functional Rendering. So just follow this **[documentation](/docs/arender/installation/standalone/rendition/install)**.

## Steps to Configure the Rendition

- Place the _arondor-arender-mfiles-connector-1.0.5.jar_ under _rendition-engine-package-/modules/RenditionEngine/client_libs_

docs/install/install-mfiles/arondor-arender-mfiles-connector-1.0.5.jar

- Since 4.8.8, you will need to add under **rendition-engine-package-/modules/RenditionEngine** in _application.properties_ the following property: **authorized.urls=http://localhost/REST/**

docs/install/install-mfiles/application.properties

- Start the ARender Rendition server

## Steps to install the Web-UI

Using the username and password previously provided (contact arender-sales@arondor.com if you want access),
you can recover the version of the web application used in WAR format
**[here](https://artifactory.arondor.cloud:443/artifactory/arondor-release/com/arondor/arender/arondor-arender-hmi/{{version}}/arondor-arender-hmi-{{version}}.war)**.

Use the Tomcat9 server. You just need to deploy your war (_arondor-arender-hmi-.war_ into and to **rename it** _arondor-arender-mfiles.war_), now place it there :

- Program Files
    - Apache Software Foundation
        - Tomcat 9.0
            - webapps

Copy the previously downloaded _arondor-arender-mfiles-connector-1.0.5.jar_ connector, place it under _arondor-arender-mfiles-\WEB-INF\lib_.

Afterwards :

- Place those files _(below)_ under **_arondor-arender-mfiles-\WEB-INF\classes_**<br/>
  docs/install/install-mfiles/arender-editor-specific-integration.xml
  docs/install/install-mfiles/arender-server.properties

You need to edit different values of the _arender-server.properties_ file depending on your M-Files vault configuration

## Steps to deploy ARender on M-Files

- Unzip ARenderApp.zip with 7zip
  docs/install/install-mfiles/ARenderApp.zip
- Open **dashboard.html**
- Change UI URL by the UI version you deploy (in this example it is a 4.8.7)
  ![mfiles](/img/arender/mfiles/mfiles-dash01.png)
  ![mfiles](/img/arender/mfiles/mfiles-dash02.png)
- Open your M-File safe
- Install the ARenderApp.zip in your vault apps.
  docs/install/install-mfiles/ARenderApp.zip

![mfiles](/img/arender/mfiles/mfiles-03.png)

_( M-Files Admin -> choose your safe -> right clic -> Applications -> Install )_

- Log out of the vault and log back in to ensure changes are accounted for

## Steps to open a document with M-Files

- Restart the IIS server

![mfiles](/img/arender/mfiles/mfiles-04.png)

- Start the Tomcat9 server
- Access M-Files under M:\

![mfiles](/img/arender/mfiles/mfiles-05.png)

- Select your safe
- Drag and drop a document to open it with ARender

![mfiles](/img/arender/mfiles/mfiles-06.png)
