---
title: Create custom localized labels
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 5f1c45d6e2a84e4d3dcd083d5d6fce8b4f732ace64328f188ca0461999597670
---

This guide will help you create custom localized labels.

## Default custom localized resources path

ARender internationalization approach uses **.properties** files where localizable information are stored in.

ARender allows you to customize localized labels from external custom resource files.

By default, ARender uses the following order to fetch custom localized resource files:

- Configuration properties
- &lt;HOME_DIR&gt;/ARenderCustomLabels/
- arondor-arender-hmi-spring-boot-.jar\BOOT-INF\classes\labels\

## To go further

### Define the folder path containing the custom labels

To define the folder path where the custom labels are stored, you must edit the following property :

```cfg
# ARender label configuration
# Define the folder path where the custom labels are stored
# Otherwise leave empty so that ARender can look in the <HOME_DIR>/ARenderCustomLabels/ or in the labels/ folder
# NB: Make sure the path ends with a file separator, the slash /
arender.server.external.custom.labels.path=
```

### Create your own custom localized labels

Typical resource files are named as **CustomLabels\_&#123;lang&#125;.properties**, which _lang_ corresponds to locale code :

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

For each language or the one needed, store localizable information in the form of case-sensitive key-value pairs.

To provide a concrete example, suppose you need a custom label for a custom button in 3 different languages: english, spanish and french :

These **.properties** files are to be placed whether in _&lt;HOME_DIR&gt;/ARenderCustomLabels/_ or in \*arondor-arender-hmi-spring-boot-.jar\BOOT-INF\classes\labels\*.

```cfg
hello=Hello World
```

```cfg
hello=Hola Mundo
```

```cfg
hello=Bonjour le monde
```

To use this custom label, you will need to reference it with the tag **customLabels#&#123;label-key&#125;**.

Since version 2023.0.0:

```xml
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

						alert('Hello world !');
						$wnd.getARenderJS().getGenericNotificationJSAPI().askNotification("hello");
						alert("Finished !");

						catch(e)

						alert("error !" + e);

					</value>
				</property>
			</bean>
		</property>
	</bean>
```
