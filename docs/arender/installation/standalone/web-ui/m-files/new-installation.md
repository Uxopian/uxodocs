---
title: New installation
sidebar_position: 2
last_update:
  date: '2026-03-06T18:23:33.786Z'
  author: CI/CD Bot
content_hash: 21889e6ee0165b04b16acaa950bea616c1468ff4e747bf4630ec793b98ae98ac
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
  docs/install/install-mfiles/vaf/arender-server.properties

You need to edit different values of the _arender-server.properties_ file depending on your M-Files vault configuration

## Steps to deploy ARender on M-Files

To install ARender on M-Files vault, follow the steps below:

- Download VAF_MFF_ArenderConnector:
  docs/install/install-mfiles/VAF_MFF_ArenderConnector_22.12.3.0.mfappx
- Run M-Files Admin console
- Right click on the desired vault and select **Applications**
- Click **Install...**
- Select the previously downloaded **VAF_MFF_ArenderConnector_22.12.3.mfappx** file
- Click **Yes** if this window shows up <br/>
  ![mfiles](/img/arender/mfiles/mfiles-app-popup.png)
- The application is now installed
- Click **Close**
- Click **Yes** if this window shows up <br/>
  ![mfiles](/img/arender/mfiles/mfiles-app-popup.png)

Now that we have installed ARender on M-Files vault, we can start configuring the application.

## Steps to configure ARender on M-Files

VAF_MFF_ArenderConnector uses a JSON configuration file. You can manage it through the graphic interface within the M-Files Admin client.

- Run M-Files Admin client
- Click on the arrow next to your vault <br/>
  ![mfiles](/img/arender/mfiles/mfiles-07.png)
- Click on **Configurations** for your vault
- Select **Other Applications** then select **VAF_MFF_ArenderConnector**. The dashboard appears
- Click on **Configuration** tab
- Fill in every configuration properties. When clicking the **i** icon, you will get a help showing up. <br/>
  ![mfiles](/img/arender/mfiles/mfiles-app-configuration.png)
- Once you have configured, click **Save**

## Steps to open a document with M-Files

- Restart the IIS server

![mfiles](/img/arender/mfiles/mfiles-04.png)

- Start the Tomcat9 server
- Access M-Files under M:\

![mfiles](/img/arender/mfiles/mfiles-05.png)

- Select your safe
- Drag and drop a document to open it with ARender

![mfiles](/img/arender/mfiles/mfiles-06.png)
