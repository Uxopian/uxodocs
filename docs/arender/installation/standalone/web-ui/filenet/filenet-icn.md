---
title: Installation in ICN
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: b11792ec75f9e02a54334907fc1afaca1b61f43a3de8ec134815f79c66bd1b27
---

We continue here the installation but in the ICN module of FileNet.

## Prerequisite

Concerning SSO between ICN and ARender, cross-domain SSO is not supported, for example z.AAAcompany.com and w.BBBcompany.com - where the DNS domains are different.
More information here: https://www.ibm.com/docs/en/was-nd/8.5.5?topic=authentication-single-sign-using-ltpa-cookies

## Retrieve the ARender Web-UI archive

Using the username and password beforehand provided,
you can retrieve the navigator plugin [here](https://artifactory.arondor.cloud/artifactory/arondor-all/com/arondor/arender/arondor-arender-navigator-plugin//arondor-arender-navigator-plugin-.jar)

## ARender and IBM Content Navigator (or IBM Content Manager)

### Sharing the LTPA key

Thus, you will need to configure LTPA in order to enable session sharing between IBM Content Navigator and ARender Web-UI:

- Export the LTPA CPE key

In WebSphere Administration Console of the **CPE**, navigate to **Security** > **Global Security**, under **Authentication**, click **LTPA**

![filenet](/img/arender/filenet/filenet-18.png)

- Specify a password, a filepath, and click "Export keys"

![filenet](/img/arender/filenet/filenet-19.png)

- Import the LTPA CPE key in the ARender JVM

Copy the key in hte ARender Web-UI server.

Then import this key in ARender, like below:

- Using the WebSphere Administration Console, navigate to **Security** > **Global Security**, under **Authentification**, click **LTPA**
- Fill in the same password you entered when exporting the keys
- Specify the path where you copied the keys
- Click Import keys
- Save the modifications

### Session invalidation when switching user

Since ICN version 3.0.6, if you change of user on the same session then you will get an error message when opening a document with the new user which will look like this:

Error 500: com.ibm.websphere.servlet.session.UnauthorizedSessionRequestException: SESN0008E: A user authenticated as user:localhost:389/CN=userB,CN=Users,DC=ircem,DC=dev has attempted to access a session owned by user:localhost:389/CN=userA,CN=Users,DC=ircem,DC=dev

The session of the user userA was not invalidated when he disconnected, which will cause the error when opening a document by user userB. There is a property to add in a WebSphere console which will make it possible to invalidate a session on which an unauthorized request is made. This session invalidation will allow the recovery of the correct username by ARender.

#### Adding the property

- Go to your websphere console then in the menu go to _servers -> server types -> websphere application servers_.
- Select the server on which you want to make the modification. In our example, we choose _serverICN_

![filenet](/img/arender/documentation/filenet/userSession/servers.png)

- In _Container settings_ go to _Session management_.

![filenet](/img/arender/documentation/filenet/userSession/specific_serve.png)

- In _Additional properties_, click on _custom properties_.

![filenet](/img/arender/documentation/filenet/userSession/session_management.png)

- Click on _New..._ to add the property.

![filenet](/img/arender/documentation/filenet/userSession/custom_properties.png)

- Add the property _InvalidateOnUnauthorizedSessionRequestException_ with the value _true_ so that it is applied.

![filenet](/img/arender/documentation/filenet/userSession/new_property.png)

- You must then click on _Ok_ then _save_. Restart your Filenet services to take this property into account.

### Integration of the arender plugin for FileNet

A specific plugin has been implemented to integrate ARender within ICN. Nota: ICN connector uses mixedObjects syntax.

Connect to Content Navigator.

Go to the ‘Administration View’ and click on ‘Plug-ins’

![filenet](/img/arender/filenet/filenet-22.png)

Click on the button "New Plugin-in".

![filenet](/img/arender/filenet/filenet-23.png)

Enter the JAR file path and click on ‘Load’.

![filenet](/img/arender/filenet/filenet-24.png)

Fill ‘ARender context root’ field with ARender’s address (host + port + context root). Like below:

![filenet](/img/arender/filenet/filenet-30.png)

Fill 'Unauthorized Desktops for document builder (id1,id2...)' field with comma-separated values of desktop ID.
In the screenshot below, we have black listed the desktop FakeDesktop so it won't have the document builder feature enabled.

![filenet](/img/arender/filenet/filenet-31.png)

Fill 'Watermark applied on download' field with comma-separated key-value pair of respectively desktop id and watermark bean name. The watermark bean name should be configured in ARender. There are some default watermark bean name pre-defined already in the annotationtemplate-catalog.xml, downloadWatermark and printWatermark.

Below an example of watermark to be applied on download depending on the desktop. We configured the desktop OS1 to use the downloadWatermark and the desktop CustomWatermark to use downloadWatermark aswell.

```bash
OS1=downloadWatermark,CustomDesktop=downloadWatermark
```

![filenet](/img/arender/filenet/filenet-32.png)

Fill 'Watermark applied on print' field with comma-separated key-value pair of respectively desktop id and watermark bean name. The watermark bean name should be configured in ARender. There are some default watermark bean name pre-defined already in the annotationtemplate-catalog.xml, downloadWatermark and printWatermark.

Below an example of watermark to be applied on download depending on the desktop. We configured the desktop OS1 to use the printWatermark and the desktop CustomWatermark to use printWatermark aswell.

```bash
OS1=printWatermark,CustomDesktop=printWatermark
```

![filenet](/img/arender/filenet/filenet-33.png)

To use this Map, you just need to link it to a Desktop (Desktop tab -> Edit the desktop -> Select the Map in the Viewer Map list)

![filenet](/img/arender/filenet/filenet-26.png)

And finally, click on "Save".

![filenet](/img/arender/filenet/filenet-27.png)

You can now restart your application servers and attempt to open a file in FileNet.

![filenet](/img/arender/filenet/filenet-28.png)

![filenet](/img/arender/filenet/filenet-29.png)

## Use ARender advanced features directly from ICN

End-users can use ARender Compare and Document Builder features directly from ICN.

### Create a dedicated ICN menu to show ARender advanced feature

- In ICN, go in the **Administration** menu
- Select **Menus**
- Search the Menu named **Default document context menu**

![filenet](/img/arender/filenet/Default-document-context-menu.png)

- Right click on this menu and select **Copy**
- Define a Name and a description to the new Menu
- In the _Available_ box select **Compare documents** and/or **Merge documents** action and add them into the _Selected_ menu on the right

![filenet](/img/arender/filenet/CompareAndMerge-Selected.png)

### Add the created menu to the ICN Desktop

- In ICN, go in the **Administration** menu
- Select **Desktops**
- Select the Desktop to update
- Select the tab **Menus**
- Search for the Menu named **Document context menu**
- In its drop-down list value, select the menu you created above

![filenet](/img/arender/filenet/CompareAndMergeMenu.png)

### Use ARender compare feature

To compare document, you have to select **two documents** and select **Compare documents** from ICN Action menu or using right click

![filenet](/img/arender/filenet/Compare-Action.png)

### Use ARender Document Builder feature

To merge and split documents, you have to select at least one document and select **Merge documents** from ICN Action menu or using right click

![filenet](/img/arender/filenet/Merge-Action.png)
