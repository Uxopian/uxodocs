---
title: FileNet connector
last_update:
    date: "2025-12-02T14:26:41.610Z"
    author: CI/CD Bot
content_hash: dd3173b7b3708983fa1ddbd674b395146250f9dca010ae46351f27cb5300bc79
---

## ARender for IBM FileNet

ARender has a pre-configured connector for IBM FileNet P8 (4.x) and IBM FileNet Content Manager (5.x).

| Parameter       | Description                                                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| id              | Unique id of document version                                                                                                         |
| vsId            | VersionSeries id allowing to fetch last version of a document                                                                         |
| objectStoreName | The name of the ObjectStore used to store the document                                                                                |
| objectType      | Document type: document, folder, containerXML, mixedObjects (optional for documents)                                                  |
| contentElement  | Optional, index of the content element to display (ContentElement object). Acceptable values are between 1 and the number of elements |

Some examples:

- To open a document stored in FileNet P8, try:

    `http://&#123;arender_server&#125;/ARender.html?id={345A81-KT7SK95747S-5IS8-8SK0}&amp;objectStoreName=OS1`

- To open simultaneously two documents with the mixedObjects syntax:

    `http://&#123;arender_serveur&#125;/ARender.html?ids=doc:{345A81-KT7SK95747S-5IS8-8SK0},doc:&#123;F64A9342-6114-4A5C-A5E1-589A2FFB159F&#125;&amp;objectStoreName=OS1&amp;objectType=mixedObjects`

- To open simultaneously two documents and a folder:

    `http://&#123;arender_serveur&#125;/ARender.html?objectStoreName=OS1&amp;ids=doc:{3DBE573A-1AC9-4B08-8CB1-8F9495619954},doc:&#123;F64A9342-6114-4A5C-A5E1-589A2FFB159F&#125;,folder:{55714817-BDAC-4C8A-9EFB-963E4620A4E4}&amp;objectType=mixedObjects`

- To open a specific content element:

    `http://&#123;arender_serveur&#125;/ARender.html?id={345A81-KT7SK95747S-5IS8-8SK0}&amp;objectStoreName=OS1&amp;contentElement=2`

The mixedObjects syntax is: **ids=[ [ “doc” | “folder” ] “:” [ Id du document ou Folder ] [ “,"] ]+**

## Document access

Regarding authentication mode, two provider types can be used to provide
document access.

### Sharing FileNet session

In the same JVM (or at least in a shared JAAS context) using IIOP
protocol:

| Parameter             | Description                                   |
| --------------------- | --------------------------------------------- |
| content_engine_server | URI of Content Engine using the IIOP protocol |

````cfg


```properties
arender.server.filenet.authentication.method=jaasObjectStoreProvider
arender.server.filenet.ce.url=iiop://&#123;content_engine_server&#125;:2809/FileNet/Engine
````

### Technical account

Using a technical account to connect to FileNet Content Platform Engine requires the below modifications.

#### Disable security constraints

Comment the security-constraint and security-role pre-configured.

```XML
<?xml version="1.0" encoding="UTF-8"?>
<web-fragment xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://java.sun.com/xml/ns/javaee" xmlns:web="http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-fragment_3_0.xsd" id="WebAppFragment_ID" version="3.0">
    <name>web_fragment_ecm</name>
    <!--security-constraint>
        <web-resource-collection>
            <web-resource-name>action</web-resource-name>
            <description>Define the container secured resource</description>
            <url-pattern>/ArondorViewer.jsp</url-pattern>
            <url-pattern>/ARender.jsp</url-pattern>
            <url-pattern>/ARender.html</url-pattern>
            <url-pattern>/DownloadDocumentWithAnnotations.jsp</url-pattern>
            <url-pattern>/arendergwt/*</url-pattern>
            <url-pattern>/openExternalDocument.jsp</url-pattern>
        </web-resource-collection>
        <auth-constraint>
            <role-name>All Authenticated</role-name>
        </auth-constraint>
        <user-data-constraint>
            <description>User data constraints</description>
            <transport-guarantee>NONE</transport-guarantee>
        </user-data-constraint>
    </security-constraint>

    <security-role>
        <description>All Authenticated</description>
        <role-name>All Authenticated</role-name>
    </security-role-->
</web-fragment>
```

#### Modify the user context

Modify the bean having the id urlFilter (by default configured with JAASUserFilter class), by the one below:

```XML
<bean id="urlFilter"
          class="com.arondor.viewer.server.security.RequestParameterAuthenticationFilter">
    <property name="authenticationManager" ref="authenticationManager" />
</bean>
```

#### Configure the HTTP connexion

| Parameter             | Description                                              |
| --------------------- | -------------------------------------------------------- |
| content_engine_server | URI of Content Engine based on FileNet WS (MTOM ou DIME) |
| p8_identifiant        | Username of technical account                            |
| p8_password           | Password of technical account                            |

````cfg


```properties
arender.server.filenet.authentication.method=loginPasswordObjectStoreProvider
arender.server.filenet.ce.url=http://&#123;content_engine_server&#125;/wsi/FNCEWS40MTOM/
arender.server.filenet.ce.login=&#123;p8_identifiant&#125;
arender.server.filenet.ce.password=&#123;p8_password&#125;
````

## Configuration the annotation format to be saved in FileNet

### Save annotations as XML FileNet format

Default configuration, nothing to do here.

### Save annotation as XFDF

Simply add the line below to the following file:

```cfg
    arender.server.default.annotation.accessor=xfdfAnnotationAccessor
```

## Metadata fetching

```XML
<bean id="documentPropertiesConfiguration"
    class="com.arondor.viewer.filenetce.config.DocumentPropertiesConfiguration">
</bean>
```

### Include system metadata

By default, no system metadata is fetched. In order to force it, you
need to add/edit _includedSystemProperties_ property.

```XML
<property name="includedSystemProperties">
    <list>
        <value>DateCreated</value>
        <value>DateLastModified</value>
        <value>Creator</value>
        <value>LastModifier</value>
    </list>
</property>
```

### Exclude custom metadata

By default, all custom metadata are fetched and displayed. In order to
force exclusion of some ones, you need to add/edit
_excludedCustomProperties_ property

```XML
<property name="excludedCustomProperties">
    <list>
        <value>FactureRef</value>
    </list>
</property>
```

If the following error appears: \*No LoginModules configured

```javascript
for FilenetP8WSI*, an additional configuration is required:
```

- Save the file [jaas.conf.WebSphere](/docs/jadocumentation/as.conf.WebSphere) in a folder on the WAS server
- Add the following parameter to ARender's JVM:

    `-Djava.security.auth.login.config=[Path_to_jaas_file.conf.WebSphere]`

    **How to:**
    - Navigate to the menu _Server_ and select the related server.
    - open _Java and Process Management_ and click on _Process Definition_.
    - In _Start command arguments_ add the argument.

## From an user interface

### IBM Workplace &amp; Workplace XT

In order to define which document types have to be opened within ARender, you need
to edit the configuration file content-redir.properties (for Workplace XT,
in folder: _C:\Program Files\FileNet\Config\WebClient_) as follows:

```cfg
{mimeType}=/../ARender/ARender.html?{JSP_QUERY_STRING}
```

### IBM Content Navigator

A specific plugin has been implemented to integrate ARender within ICN.

ICN connector uses mixedObjects syntax.

To use it, follow the instruction below:

1. Connect to Content Navigator.
2. Go to the 'Administration View' and click on 'Plug-ins'
   ![image](/img/arender/ICN_clickplugin_medium.png)

3. Click on the button "New Plugin-in".
   ![image](/img/arender/ICN_newplugin_large.png)

4. Enter the JAR file path and click on 'Load'. (Example: _C:\sources\arender-web-ui\*arondor-arender-navigator-plugin-2.2.1.jar_)
   ![image](/img/arender/ICN_pickjar_backgroundimage.png)

5. Fill 'ARender context root' field with ARender's address (hots + port + context root). Like below:
   ![image](/img/arender/PluginContextRoot_en_backgroundimage.png)
   If you want the plugin to automatically detect the host name and replace
   it in the configuration when called, use the keyword
   `--arender.hostname--`.

6. Click on the 'Save' button.

7. Click on Edit and check that the plugin is correctly installed.
   ![image](/img/arender/ICN_editplugin_backgroundimage.png)

8. Map the new viewer. Go to 'Viewer Maps'
   ![image](/img/arender/ICN_clickmaps_medium.png)
   The default map is called 'Default viewer map' and is not editable.

9. Click on it and then click on copy.
   ![image](/img/arender/ICN_copymap_backgroundimage.png)

10. Click on "New Mapping". Then select 'Filenet Context Manager' for the
    Repository type. Then select ARenderPluginViewer in the list of viewer
    available.
    ![image](/img/arender/ICN_namemap_backgroundimage.png)

11. You can now choose the MIME Types you want to open with ARender, then
    click on OK.
    ![image](/img/arender/ICN_mapmimes_backgroundimage.png)

12. To use this Map, you just need to link it to a Desktop (Desktop tab ->
    Edit the desktop -> Select the Map in the Viewer Map list)
    ![image](/img/arender/ICN_linkdesktop_backgroundimage.png)

## Advanced features

### Document Builder with advanced merge of metadata

#### Description and configuration

For each input Document Builder FileNet document :

- If all documents share the same property, with the same value
    - The property and the value are propagated
- If the property is common to all documents, but the values are diverging
    - The property is propagated, but the value is zero-ed with the following logic :
        - String types will receive an empty String value
        - Integer/Double types will be set to 0
        - Date types will be set to the current Date of the Builder operation
        - Boolean types will be false
        - List types will be populated of a List of the correctly typed single element (empty lists not supported by the engine)
- If the property is existing in a single document
    - By default, the property will not be propagated, unless specified by its SymbolicName in the configuration

In order to propagate a unique property by its SymbolicName, you can add those in the following ARender Web-UI property, in a comma separated list.

```cfg
arender.server.filenet.document.builder.update.first.document.properties.advanced.updater.propagation.symbolic.names
```

#### How to activate the advanced merge of metadata

In order to activate this feature you will have to edit the following ARender Web-UI property :

```cfg
arender.server.filenet.document.builder.update.first.document.properties.copy.bean.name
```

The two possible values are _legacyFileNetPropertiesCopy_ (to keep the legacy behavior, by default), or
_advancedFileNetPropertiesMerger_ to active the new feature.

If you want to have the same behavior as well when updating a document content (and not only when creating document) you will have to
add the following bean to the configuration :

```xml

    <bean id="filenetDocumentUpdaterNewVersion"
          class="com.arondor.viewer.filenetce.helper.impl.FileNetDocumentUpdaterNewVersion">
        <property name="fileNetPropertiesUpdater"
                  ref="${arender.server.filenet.document.builder.update.first.document.properties.copy.bean.name}"/>
    </bean>
```

By default, this bean does not possess a _fileNetPropertiesUpdater_
to keep its legacy behavior.
With this configuration, the bean will follow the same behavior as the one configured for creating new documents.

### Forbid document creation/update in specific ObjectStores, by IDs

In order to disable the creation or update of documents from some specific FileNet ObjectStores,
we added a configuration so that you can list (separated by commas) theirs IDs :

```cfg
arender.server.filenet.document.builder.unauthorized.object.store.ids=
```

The IDs listed in the configuration property will be protected from any Document Builder operation,
and throw an exception when trying to do one regardless.

By default, this list is shipped empty, to keep legacy behavior.

### Disable DocumentBuilder feature for checkout/archived documents

It is possible to disable the DocumentBuilder feature for checkout/archived documents via the activation of the below
property:

```cfg
arender.server.filenet.document.builder.disabled.for.checkout.and.archived.documents=true
```

## Configuration of watermark display

You can configure the watermark display depending on user group and/or Filenet document class.

To activate the watermark depending on groups and/or document classes, you need to add this property :

```cfg
arender.server.watermark.display.provider=fileNetDisplayWatermarkProvider
```

To display watermark to all user in certain groups :

```cfg
#Comma-separated values that indicates which FileNet groups should have the watermark defined in arender.watermark.bean.name
arender.server.watermark.filenet.group.with=
```

To not display watermark to all user in certain groups :

```cfg
#Comma-separated values that indicates which FileNet groups should not have the watermark defined in arender.watermark.bean.name
arender.server.watermark.filenet.group.without=
```

Both properties can not be used together

To display watermark depending on Filenet document class (From 4.1.0 to 4.2.x) :

```cfg
#Comma-separated values that indicates which FileNet document classes should have the watermark defined in arender.watermark.bean.name
arender.server.watermark.filenet.document.class.with=
```

To display watermark depending on Filenet document class (Since 4.3.0) :

```cfg
#Comma-separated values that indicate which FileNet document classes should have the watermark defined in arender.watermark.bean.name
arender.server.watermark.filenet.document.class=
```

### Advanced watermark configuration

To define a watermark depending on Filenet DocumentClass and/or user group, you need to define a watermark usage for each watermark needed.
By default:

```xml
<bean id="fileNetWatermarkUsageDefinition"
    class="com.arondor.viewer.filenetce.annotation.FileNetWatermarkUsageDefinition"
    scope="singleton">
    <property name="displayWatermarkBeanName" value="${arender.watermark.bean.name}"/>
    <property name="filenetDocumentClass" ref="fileNetDocumentClassList"/>
    <property name="ldapGroupWithWatermark" ref="ldapGroup"/>
    <property name="ldapGroupWithoutWatermark" ref="ldapGroupException"/>
</bean>

<!-- List of FileNet DocumentClass will be affected by the watermark usage definition-->
<bean id="fileNetDocumentClassList"
  class="org.springframework.util.StringUtils"
  factory-method="commaDelimitedListToStringArray">
  <constructor-arg value="${arender.server.watermark.filenet.document.class}"/>
</bean>

<!-- List of LDAP group that will have the watermark-->
<bean id="ldapGroup"
  class="org.springframework.util.StringUtils"
  factory-method="commaDelimitedListToStringArray">
  <constructor-arg value="${arender.server.watermark.filenet.group.with}"/>
</bean>

<!-- List of LDAP group that will not have the watermark-->
<bean id="ldapGroupException"
  class="org.springframework.util.StringUtils"
  factory-method="commaDelimitedListToStringArray">
  <constructor-arg value="${arender.server.watermark.filenet.group.without}"/>
</bean>
```

#### Examples

You can create a new simple watermark usage definition :

```xml
<bean id="newWatermarkDefinition"
    class="com.arondor.viewer.filenetce.annotation.FileNetWatermarkUsageDefinition"
    scope="singleton">
    <property name="displayWatermarkBeanName" value="myWatermarkBean"/>
</bean>
```

You can create a new watermark usage definition by filtering with LDAP group :

```xml
<bean id="newWatermarkDefinition"
    class="com.arondor.viewer.filenetce.annotation.FileNetWatermarkUsageDefinition"
    scope="singleton">
    <property name="displayWatermarkBeanName" value="myWatermarkBean"/>
    <property name="ldapGroupWithWatermark" ref="ldapGroupExample"/>
</bean>

<!-- List of LDAP group that will have the watermark-->
<bean id="ldapGroupExample"
  class="org.springframework.util.StringUtils"
  factory-method="commaDelimitedListToStringArray">
  <constructor-arg value="myGroup"/>
</bean>
```

You can create a new watermark usage definition to display watermark for every user except those that are defined here :

```xml
<bean id="newWatermarkDefinition"
    class="com.arondor.viewer.filenetce.annotation.FileNetWatermarkUsageDefinition"
    scope="singleton">
    <property name="displayWatermarkBeanName" value="myWatermarkBean"/>
    <property name="ldapGroupWithoutWatermark" ref="ldapGroupExample"/>
</bean>

<!-- List of LDAP group that will have the watermark-->
<bean id="ldapGroupExample"
  class="org.springframework.util.StringUtils"
  factory-method="commaDelimitedListToStringArray">
  <constructor-arg value="myGroup"/>
</bean>
```

You can create a new watermark usage definition depending on FileNet documentClass :

```xml
<bean id="newWatermarkDefinition"
    class="com.arondor.viewer.filenetce.annotation.FileNetWatermarkUsageDefinition"
    scope="singleton">
    <property name="displayWatermarkBeanName" value="myWatermarkBean"/>
    <property name="filenetDocumentClass" ref="fileNetDocumentClassList"/>
</bean>

<!-- List of FileNet DocumentClass will be affected by the watermark usage definition-->
<bean id="fileNetDocumentClassList"
  class="org.springframework.util.StringUtils"
  factory-method="commaDelimitedListToStringArray">
  <constructor-arg value="${arender.server.watermark.filenet.document.class}"/>
</bean>
```

Of course, you can mix them to achieve advanced configuration :

```xml
<bean id="newWatermarkDefinition"
    class="com.arondor.viewer.filenetce.annotation.FileNetWatermarkUsageDefinition"
    scope="singleton">
    <property name="displayWatermarkBeanName" value="myWatermarkBean"/>
    <property name="filenetDocumentClass" ref="fileNetDocumentClassList"/>
    <property name="ldapGroupWithWatermark" ref="ldapGroupExample"/>
</bean>

<!-- List of FileNet DocumentClass will be affected by the watermark usage definition-->
<bean id="fileNetDocumentClassList"
  class="org.springframework.util.StringUtils"
  factory-method="commaDelimitedListToStringArray">
  <constructor-arg value="${arender.server.watermark.filenet.document.class}"/>
</bean>

<!-- List of LDAP group that will have the watermark-->
<bean id="ldapGroupExample"
  class="org.springframework.util.StringUtils"
  factory-method="commaDelimitedListToStringArray">
  <constructor-arg value="myLDAPGroup"/>
</bean>
```

Following line is mandatory to be set :

```xml
<property name="displayWatermarkBeanName" value="exampleWatermarkBean"/>
```

#### Add watermark usage definition

Then you need to add all watermark usages to the watermark provider :

```xml

<!-- EXAMPLE -->

<bean id="fileNetDisplayWatermarkProvider"
    class="com.arondor.viewer.filenetce.annotation.FileNetDisplayWatermarkProvider"
    scope="singleton">
    <property name="fileNetWatermarkDocument" >
      <list>
        <ref bean="fileNetWatermarkUsageDefinition"/>
        <ref bean="newWatermarkDefinition"/>
      </list>
    </property>
</bean>
```

### Create a PDF/A as new version or new document in document builder

Since the ARender version 4.2.0, two new behaviors have been added in order to be able to create or update a document in PDFA.

Already existing content update behaviors are :

- UPDATE_NO_DOCUMENT
- UPDATE_FIRST_DOCUMENT
- CREATE_NEW_FIRST_DOCUMENT
- UPDATE_ALL_DOCUMENT

The two new ones are :

- UPDATE_FIRST_DOCUMENT_PDFA
- CREATE_NEW_FIRST_DOCUMENT_PDFA

The new behaviors are similar to UPDATE_FIRST_DOCUMENT and CREATE_NEW_FIRST_DOCUMENT except that the file type will be PDFA.

**As a prerequisite, it is necessary to have the PDFA rendition module.**

#### Example

From the **alterdocumentcontent-configuration.xml** file configuration, you can copy the
**saveActionUpdateFirst** and **saveActionCreateFirst** beans to the **arender-custom-integration.xml**
file and modify the **contentUpdateBehavior** property as it :

```xml
<bean id="saveActionUpdateFirst"
	class="com.arondor.viewer.client.pictree.presenter.nodeaction.TreeNodeAction">
	<property name="enabled"
		value="${documentbuilder.button.updateFirst.enabled}" />
	<property name="availability">
		<bean
			class="com.arondor.viewer.client.pictree.presenter.nodeaction.TreeNodeActionAvailability$IsEnabledAndNotRoot" />
	</property>
	<property name="buttonTitle">
		<ref bean="labels#documentBuilderUpdateFirstDocument" />
	</property>
	<property name="className" value="pictreeButton saveDocumentUpdateFirstButton" />
	<property name="event">
		<bean
			class="com.arondor.viewer.client.events.documentbuilder.DocumentBuilderSaveDocumentEvent">
			<property name="freezeDocument" value="${documentbuilder.save.freeze}" />
			<property name="downloadDocument" value="${documentbuilder.save.download}" />
			<property name="deleteDocument" value="${documentbuilder.save.delete}" />
			<property name="contentUpdateBehavior">
				<value
					type="com.arondor.viewer.client.api.document.altercontent.AlterContentDescription$ContentUpdateBehavior">UPDATE_FIRST_DOCUMENT_PDFA</value>
			</property>
		</bean>
	</property>
</bean>

<bean id="saveActionCreateFirst"
	class="com.arondor.viewer.client.pictree.presenter.nodeaction.TreeNodeAction">
	<property name="enabled"
		value="${documentbuilder.button.createFirst.enabled}" />
	<property name="availability">
		<bean
			class="com.arondor.viewer.client.pictree.presenter.nodeaction.TreeNodeActionAvailability$IsEnabledAndNotRoot" />
	</property>
	<property name="buttonTitle">
		<ref bean="labels#documentBuilderCreateFirstDocument" />
	</property>
	<property name="className" value="pictreeButton saveDocumentCreateFirstButton" />
	<property name="event">
		<bean
			class="com.arondor.viewer.client.events.documentbuilder.DocumentBuilderSaveDocumentEvent">
			<property name="freezeDocument" value="${documentbuilder.save.freeze}" />
			<property name="downloadDocument" value="${documentbuilder.save.download}" />
			<property name="deleteDocument" value="${documentbuilder.save.delete}" />
			<property name="contentUpdateBehavior">
				<value
					type="com.arondor.viewer.client.api.document.altercontent.AlterContentDescription$ContentUpdateBehavior">CREATE_NEW_FIRST_DOCUMENT_PDFA</value>
			</property>
		</bean>
	</property>
</bean>
```

## Updating metadata

The servlet _updateDocumentMetadataServlet_ is dedicated to updating Filenet document metadata with a POST call.

Here is an example of the POST call, where _&#123;documentId&#125;_ is to be replaced by the documentId of the targeted document :

```````````cfg
``````````http://{HOST_ARENDER}/arendergwt/updateDocumentMetadataServlet?uuid={documentId}``````````
```````````

Then, the body of the request will accept a JSON structure defining each metadata name to modify and the associated value. The _propertyKey_ correspond to the _symbolicName_ and _displayName_ properties of Filenet. The _propertyValue_ is the value that the metadata will take.

```cfg

  "propertyKey1" : "propertyValue1",
  "propertyKey2" : "propertyValue2"

```

## Set a default document title

The following property allows to configure a default title to the document that does not have one.

```cfg
arender.server.default.filenet.document.name="default name"
```
