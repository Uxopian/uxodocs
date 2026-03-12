---
title: Watermarks
sidebar_position: 26
last_update:
  date: '2026-03-12T20:43:52.809Z'
  author: CI/CD Bot
content_hash: 346d4de5437595cc655afa251a0152ba6b1eea661ba6aed4797c6eefd6ecd3f9
---

This guide will help you configure ARender to use watermarks.

## Use ARender default Watermark

A pre-configured watermark exists in ARender. Its content is: _Viewed by $USERNAME$ at $TIMESTAMP$_
$USERNAME$ will be replaced with the current user name
$TIMESTAMP$ will be replaced with the current time and time

### Configuration

To activate this watermark on all documents you need to add the below properties to ARender server configuration (_arender-server-custom-vanilla.properties_)

```properties
# This allows to configure a watermark provider for the type of watermark
# to apply on document preview
arender.server.watermark.display.provider=activableDisplayWatermarkProvider
# Activate the watermark at the viewing and on the downloaded document
arender.watermark.activate.on.startup=true
# Enable annotations rendition processing if you need to use Redact or Watermark. Can have an impact on performances if the annotations take time to be fetched.
arender.server.process.annotations.rendition=true
```

### Activation

Simply restart ARender web application and you will see watermarks on each page of the document

## To go futher

### Create your own watermark

You can create the watermark of your choice by configuring its style and its text content (with variables like the date of the day and its User Name).
Below the default ARender watermark.

```xml
<bean id="customWatermark" class="com.arondor.viewer.client.api.annotation.templates.AnnotationTemplate">
  <property name="name" value="CUSTOM" />
  <property name="annotationType">
    <value type="com.arondor.viewer.annotation.common.AnnotationType">Stamp</value>
  </property>
  <property name="contentTemplate" value="Viewed by $USERNAME$ at $TIMESTAMP$" />
  <property name="annotationStyle">
    <bean class="com.arondor.viewer.client.api.annotation.AnnotationStyle">
      <property name="fontColor" value="black" />
      <property name="fontSize" value="20" />
      <property name="backgroundColor" value="none" />
      <property name="borderColor" value="black" />
      <property name="borderStyle" value="0" />
      <property name="borderWidth" value="0" />
      <property name="rotation" value="340" />
    </bean>
  </property>
  <!--watermarkPosition available values are: CENTRE and TOP_LEFT-->
  <property name="watermarkPosition" value="CENTER"/>
</bean>
```

#### Create you own watermark

To create your own watermark:

- Copy the above content in your specific ARender configuration (_arender-custom-server-integration.xml_)
- Change the bean ID
- Define its style and its textual content by modifying properties values under _annotationStyle_

#### Configure the use of your own watermark

Add the below property to ARender server configuration (_configurations/arender-custom-server.properties_).
The value is the id of the bean you just created.

```properties
# Default watermark used when watermarks are activated on startup
arender.watermark.bean.name=ChangeWithYouBeanId
```

### Activate your watermark

Simply restart ARender web application and your own watermark will be displayed on each page of the document.
