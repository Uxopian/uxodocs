---
title: Plugins
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /guides/features/plugins
sidebar_position: 14
content_hash: 346451479b766a8f19c6c435641a80c52fca0c87720c7bd6c6ada104a6f5ebf8
---

# Plugins

ARender supports embedding third-party content as plugins. A plugin can be opened in two ways:

- **URL parameter**: append `?plugin=pluginName` to the ARender URL.
- **Toolbar button**: trigger the plugin from a button configured in the top panel.

## Content modes

Each plugin is defined as a Spring bean of class `com.arondor.viewer.common.plugin.Plugin`. The bean ID must match the plugin name referenced elsewhere in the configuration.

Three mutually exclusive properties control how the plugin content is rendered:

| Property | Description |
|---|---|
| `iframeSrc` | URL loaded inside an iframe. Use this when the plugin is an external web page. |
| `html` | Raw HTML string that replaces the entire plugin container. Provides full control over the markup but prevents further JavaScript interaction through the iframe API. |
| `innerHTML` | HTML string injected as the inner content of an empty iframe. Useful when you need iframe isolation but do not have an external URL. |

## Plugin bean definition

Register your plugin in `arender-plugin.xml` (or in a dedicated file imported from it).

```xml title="arender-plugin.xml"
<?xml version="1.0" encoding="UTF-8"?>
<beans default-lazy-init="true" default-autowire="no"
  xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">

  <!-- Import individual plugin definitions -->
  <import resource="plume.xml"/>
</beans>
```

```xml title="plume.xml"
<?xml version="1.0" encoding="UTF-8"?>
<beans default-lazy-init="true" default-autowire="no"
  xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">

  <bean id="plume" class="com.arondor.viewer.common.plugin.Plugin">
    <property name="iframeSrc" value="http://plume.arender.fr/" />
  </bean>
</beans>
```

The bean `id` (`plume` in this example) is the plugin name used in URL parameters and in the toolbar button event.

## Toolbar button integration

To open a plugin from a button in the top panel, add a `ButtonPresenter` bean to `toppanel-configuration.xml`.

```xml title="toppanel-configuration.xml"
<bean id="topPanel" class="com.arondor.viewer.client.toppanel.TopPanel">
  <property name="containedWidgets">
    <list>
      <!-- existing buttons ... -->
      <ref bean="plumeButton" />
    </list>
  </property>
  <property name="moreButton">
    <ref bean="moreButton" />
  </property>
</bean>

<bean id="plumeButton"
      class="com.arondor.viewer.client.toppanel.presenter.ButtonPresenter"
      scope="prototype">
  <property name="enabled" value="true" />
  <property name="className"
            value="standardButton icon-plugin-plume toppanelButton" />
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

Key properties:

- **`AskOpenPluginEvent` constructor-arg** -- must match the plugin bean `id` defined in the plugin XML (e.g. `plume`).
- **`openInMultiView`** -- when `true`, the plugin opens in the multi-view panel alongside the document. When `false`, it opens in full window mode.
- **`className`** -- CSS classes applied to the button. Use this to assign a custom icon via your stylesheet.
