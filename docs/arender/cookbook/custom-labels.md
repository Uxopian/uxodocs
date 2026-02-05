---
title: "Create custom localized labels"
sidebar_position: 8
last_update:
  date: '2026-02-05T15:05:05.898Z'
  author: CI/CD Bot
content_hash: aef637fc03ecf95f267fa099516ab4f31961f1b6cf57bb813bf291fa11c5391b
---

This guide will help you create custom localized labels.

## Default custom localized resources path

ARender internationalization approach uses **.properties** files where localizable informations are stored in.

ARender allows you to customize localized labels from external custom resource files.

By default, ARender uses the following order to fetch custom localized resource files : 
- Configuration properties
- `HOME_DIR`/ARenderCustomLabels/
- `TOMCAT_DIR`/webapps/&lt;arender-web-ui&gt;/WEB-INF/classes/labels/ 


## To go futher

### Define the folder path containing the custom labels

To define the folder path where the custom labels are stored, you must edit the following property :


```cfg title="arender-server-custom-vanilla.properties"
# ARender label configuration
# Define the folder path where the custom labels are stored
# Otherwise leave empty so that ARender can look in the `HOME_DIR`/ARenderCustomLabels/ or in the labels/ folder
# NB: Make sure the path ends with a file separator, the slash /
arender.server.external.custom.labels.path=
```

### Create your own custom localized labels

Typical resource files are named as **CustomLabels_\{lang\}.properties**, which `lang` corresponds to locale code :
- ar (Arabic)
- de (German)
- en (English)
- es (Spanish)
- fr (French)
- he (Hebrew)
- it (Italian)
- ja (Japanese)
- pl (Polish)
- pt (Portuguese)
- pt-BR (Brazilian Portuguese)
- ru (Russian)
- zh-CN (Simplified Chinese)
- zh-TW (Traditional Chinese)

For each language or the one needed, store localizable informations in the form of case sensitive key-value pairs.

To provide a concrete example, suppose you need a custom label for a custom button in 3 differents language english, spanish and french :

These **.properties** files are to be placed whether in *`HOME_DIR`/ARenderCustomLabels/* or in *`TOMCAT_DIR`/webapps/&lt;arender-web-ui&gt;/WEB-INF/classes/labels/*.


```cfg title="CustomLabels_en.properties"
hello=Hello World
```


```cfg title="CustomLabels_es.properties"
hello=Hola Mundo
```


```cfg title="CustomLabels_fr.properties"
hello=Bonjour le monde
```

To use this custom label, you will need to reference it with the tag **customLabels#\{label-key\}**.

Before version 4.7.0 : 


```xml title="arender-custom-integration.xml"
<!-- Sample implementation of a Custom button -->
<bean id="customButton"
	class="com.arondor.viewer.client.toppanel.presenter.ButtonPresenter">
	<constructor-arg value="customButton"/>
	<property name="enabled" value="true" />
	<property name="imageResource">
		<bean
			class="com.arondor.viewer.client.defferedmodules.ExternalImageResource">
			<property name="width" value="16" />
			<property name="height" value="16" />
			<property name="url" value="http://i86.servimg.com/u/f86/14/46/83/49/biere310.gif" />
		</bean>
	</property>
    <!-- Your custom button label -->
	<property name="buttonTitle">
		<ref bean="customLabels#hello" />
	</property>
	<property name="buttonHandler">
		<bean class="com.arondor.viewer.client.jsapi.toppanel.JSCallButtonHandler">
			<property name="jsCode">
				<value>
					<!-- Custom JS action upon click/mouseDown/touch event -->
				</value>
			</property>
		</bean>
	</property>
</bean>
```

Since version 4.7.0 : 


```xml title="arender-custom-integration.xml"
<!-- Sample implementation of a Custom button -->
<bean id="customButton"
		class="com.arondor.viewer.client.toppanel.presenter.ButtonPresenter">
		<constructor-arg value="customButton"/>
		<property name="enabled" value="true" />
		<property name="className" value="standardButton icon-arender" />
		<property name="buttonTitle">
			<value>Custom Button</value>
		</property>
		<property name="buttonHandler">
			<bean class="com.arondor.viewer.client.jsapi.toppanel.JSCallButtonHandler">
				<property name="jsCode">
					<value>
						try
						{
						alert('Hello world !');
						$wnd.getARenderJS().getGenericNotificationJSAPI().askNotification("hello");
						alert("Finished !");
						}
						catch(e)
						{
						alert("error !" + e);
						}
					</value>
				</property>
			</bean>
		</property>
	</bean>
```