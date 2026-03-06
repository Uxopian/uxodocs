---
title: Create custom localized labels
sidebar_position: 8
last_update:
  date: '2026-03-06T18:23:33.786Z'
  author: CI/CD Bot
content_hash: 5bfcc86a917834413dc584debd50460df155023fabf3704e3690e0e1b1c38bc7
---

This guide will help you create custom localized labels.

## Default custom localized resources path

ARender internationalization approach uses **.properties** files where localizable information are stored in.

ARender allows you to customize localized labels from external custom resource files.

By default, ARender uses the following order to fetch custom localized resource files:

- Configuration properties
- &lt;HOME_DIR&gt;/ARenderCustomLabels/
- arondor-arender-hmi-spring-boot-{{version}}.jar\BOOT-INF\classes\labels\

## To go further

### Define the folder path containing the custom labels

To define the folder path where the custom labels are stored, you must edit the following property :

```properties
# ARender label configuration
# Define the folder path where the custom labels are stored
# Otherwise leave empty so that ARender can look in the <HOME_DIR>/ARenderCustomLabels/ or in the labels/ folder
# NB: Make sure the path ends with a file separator, the slash /
arender.server.external.custom.labels.path=
```

### Create your own custom localized labels

Typical resource files are named as **CustomLabels\_\{lang\}.properties**, which _lang_ corresponds to locale code :

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

These **.properties** files are to be placed whether in _&lt;HOME_DIR&gt;/ARenderCustomLabels/_ or in \*arondor-arender-hmi-spring-boot-{{version}}.jar\BOOT-INF\classes\labels\*.

```properties title="CustomLabels_en.properties"
hello=Hello World
```

```properties title="CustomLabels_es.properties"
hello=Hola Mundo
```

```properties title="CustomLabels_fr.properties"
hello=Bonjour le monde
```

To use this custom label, you will need to reference it with the tag **customLabels#\{label-key\}**.

Since version 2023.0.0:

```xml
<!-- Sample implementation of a Custom button -->
<bean id="customButton" class="com.arondor.viewer.client.toppanel.presenter.ButtonPresenter">
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
