---
title: "New installation"
last_update:
  date: '2026-02-02T12:16:59.945Z'
  author: CI/CD Bot
content_hash: 8f4cc2b4fdb1e41677f74e704743ed20464af9e67180c898346e9b7ea0a6fe9b
---

Here we present the Web-UI installation in M-Files. 

In our example, we deploy the Web-UI
in an environment with:

- Operating system : Windows Server 2016 Datacenter
- M-Files 
- A Tomcat9 server
- ARender Web-UI version VERSION
- ARender Rendition version VERSION. For more information on how to install, see **[documentation](/v4/install/standalone/presentation/install.md)**


## Steps to Configure the Rendition

- Place the *arondor-arender-mfiles-connector-1.0.5.jar* under *rendition-engine-package-VERSION/modules/RenditionEngine/client_libs*

[arondor-arender-mfiles-connector-1.0.5.jar](/docs/install/install-mfiles/arondor-arender-mfiles-connector-1.0.5.jar)
- Place the following property file *application.properties* under *rendition-engine-package-VERSION/modules/RenditionEngine/*

[application.properties](/docs/install/install-mfiles/application.properties)
- Start the ARender Rendition server

## Steps to install the Web-UI

Using the username and password previously provided (contact arender-sales@arondor.com if you want access),
you can recover the version of the web application used in WAR format
**[here](https://artifactory.arondor.cloud:443/artifactory/arondor-all/com/arondor/arender/arondor-arender-hmi/VERSION/arondor-arender-hmi-VERSION.war)**.

Use the Tomcat9 server. You just need to deploy your war (*arondor-arender-hmi-VERSION.war* into and to **rename it** *arondor-arender-mfiles.war*), now place it there :

* Program Files
    * Apache Software Foundation
        * Tomcat 9.0
            * webapps

Copy the previously downloaded *arondor-arender-mfiles-connector-1.0.5.jar* connector, place it under *arondor-arender-mfiles-VERSION/WEB-INF/lib*.

Afterwards :
- Place those files *(below)* under ***arondor-arender-mfiles-VERSION/WEB-INF/classes***<br/>
[arender-editor-specific-integration.xml](/docs/install/install-mfiles/arender-editor-specific-integration.xml)
[arender-server.properties](/docs/install/install-mfiles/vaf/arender-server.properties)

:::warning 

You need to edit different values of the *arender-server.properties* file depending on your M-Files vault configuration
:::

## Steps to deploy ARender on M-Files

To install ARender on M-Files vault, follow the steps below:
- Download VAF_MFF_ArenderConnector: 
[VAF_MFF_ArenderConnector_22.12.3.mfappx](/docs/install/install-mfiles/VAF_MFF_ArenderConnector_22.12.3.0.mfappx)
- Run M-Files Admin console
- Right click on the desired vault and select **Applications**
- Click **Install...**
- Select the previously downloaded **VAF_MFF_ArenderConnector_22.12.3.mfappx** file
- Click **Yes** if this window shows up
![mfiles](/img/arender/mfiles/mfiles-app-popup.png)
- The application is now installed
- Click **Close**
- Click **Yes** if this window shows up
![mfiles](/img/arender/mfiles/mfiles-app-popup.png)

Now that we have installed ARender on M-Files vault, we can start configuring the application.

## Steps to configure ARender on M-Files

VAF_MFF_ArenderConnector uses a JSON configuration file. You can manage it through the graphic interface within the M-Files Admin client. 

- Run M-Files Admin client
- Click on **Configurations** for you vault
- Select **Other Applications** then select **VAF_MFF_ArenderConnector**. The dashboard appears
- Click on **Configuration** tab
- Fill in every configuration properties. When clicking the **i** icon, you will get a help showing up.
![mfiles](/img/arender/mfiles/mfiles-app-configuration.png)
- Once you have configured, click **Save**


## Steps to open a document with M-Files

- Restart the IIS server

![mfiles](/img/arender/mfiles/mfiles-04.png)

- Start the Tomcat9 server
- Access M-Files under M:/

![mfiles](/img/arender/mfiles/mfiles-05.png)

- Select your safe
- Drag and drop a document to open it with ARender

![mfiles](/img/arender/mfiles/mfiles-06.png)
