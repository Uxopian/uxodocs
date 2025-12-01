---
title: Legacy installation
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: ed6a4d86d0368591090494283a42397c086f99c5a75a96d7825b9c9563487ba8
---







Here we present the Web-UI installation in M-Files. 

In our example, we deploy the Web-UI
in an environment with:

- Operating system : Windows Server 2016 Datacenter
- M-Files 
- A Tomcat9 server
- ARender Web-UI version 
- Have a Functional Rendering. So just follow this **[documentation](./content/installation/standalone/rendition/install.en.md)**.


## Steps to Configure the Rendition

- Place the *arondor-arender-mfiles-connector-1.0.5.jar* under *rendition-engine-package-/modules/RenditionEngine/client_libs*

docs/install/install-mfiles/arondor-arender-mfiles-connector-1.0.5.jar

- Since 4.8.8, you will need to add under **rendition-engine-package-/modules/RenditionEngine** in *application.properties* the following property: **authorized.urls=http://localhost/REST/**

docs/install/install-mfiles/application.properties

- Start the ARender Rendition server


## Steps to install the Web-UI

Using the username and password previously provided (contact arender-sales@arondor.com if you want access),
you can recover the version of the web application used in WAR format
**[here](https://artifactory.arondor.cloud:443/artifactory/arondor-all/com/arondor/arender/arondor-arender-hmi//arondor-arender-hmi-.war)**.

Use the Tomcat9 server. You just need to deploy your war (*arondor-arender-hmi-.war* into and to **rename it** *arondor-arender-mfiles.war*), now place it there :

* Program Files
    * Apache Software Foundation
        * Tomcat 9.0
            * webapps

Copy the previously downloaded *arondor-arender-mfiles-connector-1.0.5.jar* connector, place it under *arondor-arender-mfiles-\WEB-INF\lib*.

Afterwards :
- Place those files *(below)* under ***arondor-arender-mfiles-\WEB-INF\classes***<br/>
docs/install/install-mfiles/arender-editor-specific-integration.xml
docs/install/install-mfiles/arender-server.properties


You need to edit different values of the *arender-server.properties* file depending on your M-Files vault configuration


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
*( M-Files Admin -> choose your safe -> right clic -> Applications -> Install )*

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
