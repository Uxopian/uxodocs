---
title: Plugins
sidebar_position: 2
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
content_hash: 98b35afacbf6b509d4c5c6c4e1a099588201023dc3526c5498c99e78d59f1833
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

ARender allow to integrate plugins. They can be opened in two different
ways:

- Direct opening from the ARender URL with the parameter _plugin=pluginName_
- Opening from ARender by events (Button press/configuration)

## Plugins XML configuration

If you use the button mode to launch your plugin, you have to make a
configuration of it in toppanel-configuration.xml:

<Tabs>
<TabItem value="before" label="Before version 4.7.0">
```xml
<bean id="topPanel" class="com.arondor.viewer.client.toppanel.TopPanel">
  <property name="containedWidgets">
    <list>
            [...]
      <ref bean="plumeButton" />
    </list>
  </property>
  <property name="moreButton">
    <ref bean="moreButton" />
  </property>
</bean>
[...]
<bean id="plumeButton" class="com.arondor.viewer.client.toppanel.presenter.ButtonPresenter" scope="prototype">
  <property name="enabled" value="true" />
  <property name="imageResource">
    <bean class="com.arondor.viewer.client.defferedmodules.ExternalImageResource">
      <property name="width" value="32" />
      <property name="height" value="32" />
      <property name="url" value="icons/plume.png" />
    </bean>
  </property>
  <property name="buttonTitle">
    <value>Plume</value>
  </property>
  <property name="buttonHandler">
    <bean class="com.arondor.viewer.client.toppanel.behavior.document.GenericHandler">
      <constructor-arg>
        <bean class="com.arondor.viewer.client.events.document.AskOpenPluginEvent">
          <constructor-arg>
            <value>plume</value>
          </constructor-arg>
          <property name="openInMultiView" value="true" />
        </bean>
      </constructor-arg>
    </bean>
  </property>
</bean>
```
</TabItem>

<TabItem value="after" label="Since version 4.7.0">
```xml
<bean id="topPanel" class="com.arondor.viewer.client.toppanel.TopPanel">
  <property name="containedWidgets">
    <list>
            [...]
      <ref bean="plumeButton" />
    </list>
  </property>
  <property name="moreButton">
    <ref bean="moreButton" />
  </property>
</bean>
[...]
<bean id="plumeButton" class="com.arondor.viewer.client.toppanel.presenter.ButtonPresenter" scope="prototype">
  <property name="enabled" value="true" />
  <property name="className" value="standardButton icon-plugin-plume toppanelButton" />
  <property name="buttonTitle">
    <value>Plume</value>
  </property>
  <property name="buttonHandler">
    <bean class="com.arondor.viewer.client.toppanel.behavior.document.GenericHandler">
      <constructor-arg>
        <bean class="com.arondor.viewer.client.events.document.AskOpenPluginEvent">
          <constructor-arg>
            <value>plume</value>
          </constructor-arg>
          <property name="openInMultiView" value="true" />
        </bean>
      </constructor-arg>
    </bean>
  </property>
</bean>
```
</TabItem>
</Tabs>


The important configuration points in this example are:

- _openInMultiView_ announces to ARender that the plugin can be
  opened in multiView and not in full window.
- _AskOpenPluginEvent_ possess a constructor-arg that refers the
  pluginName defined in the server side XML.

In order to configure the plugin itself, it is important to add the
configuration either in arender-plugin.xml or in a separate file,
referenced in the arender-plugin.xml.



```xml title="arender-plugin.xml"
<?xml version="1.0" encoding="UTF-8"?>

<beans default-lazy-init="true" default-autowire="no"
  xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">

  <!-- xml imported by ARender, please add any plugins you wish to import in this file -->
  <import resource="plume.xml"/>
</beans>
```

```xml title="plugin.xml"
<?xml version="1.0" encoding="UTF-8"?>

<beans default-lazy-init="true" default-autowire="no"
  xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">

  <bean id="plume" class="com.arondor.viewer.common.plugin.Plugin">
    <property name="iframeSrc" value="http://plume.arender.fr/" />
  </bean>
</beans>
```

Please observe the configuration of the class
_com.arondor.viewer.common.plugin.Plugin_ where we use the property
iframeSrc. This property allows to setup and iframe source URL in case
the plugin refers to an existing webpage. This webpage will then be
integrated into ARender as an iframe.

The listing of the different configuration modes are the following:

- **iframeSrc:** specifies the source of the URL of the iframe
  integrating the plugin. This implies the iframe mode.
- **html:** specifies the HTML content of the plugin. This allows a
  total control of the plugin integration but remove the
  setting by javascript calls.
- **innerHTML:** specifies the inner HTML content of the plugin. This
  allows to put an empty iframe source but with inner HTML contents.
