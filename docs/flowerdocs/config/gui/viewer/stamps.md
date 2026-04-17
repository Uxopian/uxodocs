---
title: Stamp templates
sidebar_position: 4
description: Collaborate on documents using annotations.
date: "2005-08-28T13:20:01+02:00"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: f94a706cb6dee2b3413211931ecf5b11ed594a5c6cfc536e47a687a515b2aea8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Principle

Stamp templates are used to define the stamps a user can create. They can be of two types:

- textual: based on a character string
- image: based on an image _(encoded using the base64 format)_

A stamp template is stored as a catalogue in a document of class `UserPreference` with the following tags:

- `UserPreferenceType` with `STAMP` value
- `User` with the value of the identity to which the stamp template is shared

# By user

Users create their own stamp templates via their preferences _(accessible by clicking on their avatar)_.
New stamp templates are stored and can be accessed after refreshing the viewer in the annotations menu.

The `User` tag is filled in with the identifier of the user creating the template. Only this user can access the template.

# By team

Administrators set up stamp templates that are accessible to a team of users. The _Configuration > Stamps_ section in the administration console lets them add the XML configuration needed to create stamp templates.

The `User` tag is filled in with the identifier of the team of users who can use the template created.

<Tabs>
  <TabItem value="textual" label="Textual">

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>

<annotationTemplateCatalog>
    <annotationTemplates>
        <annotationStyle>
            <arrowWidth>0.0</arrowWidth>
            <backgroundColor>none</backgroundColor>
            <bold>false</bold>
            <borderBackmode>0</borderBackmode>
            <borderColor>green</borderColor>
            <borderStyle>1</borderStyle>
            <borderWidth>1</borderWidth>
            <fontColor>green</fontColor>
            <fontName>arial</fontName>
            <fontSize>20</fontSize>
            <hasBorder>false</hasBorder>
            <heightHead>0.0</heightHead>
            <italic>false</italic>
            <lineBackMode>2</lineBackMode>
            <lineStyle>0</lineStyle>
            <opacity>1.0</opacity>
            <rotation>30</rotation>
            <strikethrough>false</strikethrough>
            <textBackMode>1</textBackMode>
            <underline>false</underline>
        </annotationStyle>
        <annotationType>Stamp</annotationType>
        <contentTemplate>Approved on: ${date.now#dd-MM-yyyy}</contentTemplate>
        <name>Approved</name>
    </annotationTemplates>
</annotationTemplateCatalog>

```

  </TabItem>
  <TabItem value="image" label="Image">

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>

<annotationTemplateCatalog>
    <annotationTemplates>
		<name>Image</name>
		<annotationType>ImageStamp</annotationType>
		<imageLocation>data:image/png;base64,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</imageLocation>
        <annotationStyle>
            <rotation>340</rotation>
        </annotationStyle>
        <defaultPosition>
			<w>200</w>
			<h>100</h>
        </defaultPosition>
    </annotationTemplates>
</annotationTemplateCatalog>

```

  </TabItem>
</Tabs>
