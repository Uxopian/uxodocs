---
title: Annotations
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 0129a127cc679c1c0ad9e700f10977f0601950cdb76e4f085f70cce438331fd6
---

## Annotation creation policy configuration

It is possible to define several behavior for annotation creation in
ARender. This configuration is in file
_configurations/arender-custom-server.properties_.

| Key parameter                                         | Description                                           | Type    |
| ----------------------------------------------------- | ----------------------------------------------------- | ------- |
| arender.server.annotations.can.create                 | Allow users to create annotation.                     | Boolean |
| arender.server.annotations.text.html.support          | Sticky note supports HTML.                            | Boolean |
| arender.server.annotations.text.reply.support         | Sticky note supports replies.                         | Boolean |
| arender.server.annotations.text.status.support        | Sticky note supports status.                          | Boolean |
| arender.server.annotations.text.security.support      | Sticky note supports security.                        | Boolean |
| arender.server.annotations.text.comment.reply.support | Sticky note supports replies in the comment explorer. | Boolean |

Look at corresponding parts for _annotation securities **AnnotationSecurity**_ and _stamp templates **Stamp**_.

## Stamp template configuration

To modify existing stamp, or add new stamps, default configuration is at
_annotation-template-catalog.xml_. There
are two type of stamps are available: Text and image stamp.

### Text stamp

Configurable properties are:

| Description      | Key parameter   | Type                                     |
| ---------------- | --------------- | ---------------------------------------- |
| Stamp name       | name            | String                                   |
| Font color       | fontColor       | String (text color or hexadecimal)       |
| Font size        | fontSize        | Integer                                  |
| Background color | backgroundColor | Texte (text color or hexadecimal)        |
| Border color     | borderColor     | Texte (text color or hexadecimal)        |
| Border style     | borderStyle     | Integer (0 or 1, without or with border) |
| Rotation (°)     | rotation        | Integer                                  |

```xml
<bean class="com.arondor.viewer.client.api.annotation.templates.AnnotationTemplate">
    <property name="name" value="Urgent" />
    <property name="annotationType">
         <value
             type="com.arondor.viewer.annotation.common.AnnotationType">Stamp</value>
    </property>
    <property name="contentTemplate" value="Urgent" />
    <property name="annotationStyle">
         <bean class="com.arondor.viewer.client.api.annotation.AnnotationStyle">
             <property name="fontColor" value="red" />
             <property name="fontSize" value="20" />
             <property name="backgroundColor" value="none" />
             <property name="borderColor" value="red" />
             <property name="borderStyle" value="1" />
             <property name="borderWidth" value="1" />
             <property name="rotation" value="350" />
         </bean>
    </property>
</bean>
```

### Image Stamp

Configurable properties are:

| Description  | Key parameter   | Type                               |
| ------------ | --------------- | ---------------------------------- |
| Stamp name   | name            | String                             |
| Image url    | imageLocation   | String (base64 image or image url) |
| Image size   | defaultPosition | PageRelativePosition               |
| Width        | width           | Integer                            |
| Height       | height          | Integer                            |
| Rotation (°) | rotation        | Integer                            |

```xml
<bean class="com.arondor.viewer.client.api.annotation.templates.AnnotationTemplate">
    <property name="name" value="Image" />
        <property name="annotationType">
            <value
                type="com.arondor.viewer.annotation.common.AnnotationType">ImageStamp</value>
        </property>
        <property name="imageLocation"
            value="data:image/png;base64,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" />
        <property name="defaultPosition">
            <bean class="com.arondor.viewer.client.api.geometry.PageRelativePosition">
                 <property name="w" value="200" />
                 <property name="h" value="100" />
            </bean>
        </property>
        <property name="annotationStyle">
            <bean class="com.arondor.viewer.client.api.annotation.AnnotationStyle">
                <property name="rotation" value="340" />
            </bean>
        </property>
</bean>
```

## Annotation creation configuration

In a annotation creation action button it is possible to override
annotation properties defined in
_configurations/arender-custom-client.properties_, as default
annotation color or opacity. This configuration is done in
_events-configuration.xml_ in a creation
bean (class = _com.arondor.viewer.client.toppanel.behavior.annotation.CreateAnnotationButtonHandler_)
In the creation action bean, definition of an annotation is needed.

Complete definition of empty blue border rectangle:

```xml
<bean id="SquareCreationAction" class="com.arondor.viewer.client.toppanel.behavior.annotation.CreateAnnotationButtonHandler">
    <constructor-arg>
        <bean class="com.arondor.viewer.client.annotation.events.PrepareAnnotationCreationEvent">
            <constructor-arg>
                <value type="com.arondor.viewer.annotation.common.AnnotationType">Square</value>
            </constructor-arg>
            <!-- annotation definition -->
            <property name="model">
                <!-- annotation classes -->
                <bean class="com.arondor.viewer.annotation.api.SquareElemType">
                    <!-- annotation properties -->
                    <property name="width" value="12" />
                    <property name="opacity" value="0" />
                    <property name="color">
                        <bean class="com.arondor.viewer.annotation.common.Color">
                            <property name="r" value="0" />
                            <property name="g" value="0" />
                            <property name="b" value="255" />
                        </bean>
                    </property>
                </bean>
            </property>
            <!-- End of annotation definition -->
        </bean>
    </constructor-arg>
</bean>
```

Available properties are:

| Annotation type | Class             | Configurable property (property type)                                                                                                     |
| --------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Square          | SquareElemType    | opacity (decimal), width (integer), color (Color, border color), interiorColor (Color, interior color), style (StyleBEType, border style) |
| Circle          | CircleElemType    | opacity (decimal), width (integer), color (Color, border color), interiorColor (Color, interior color), style (StyleBEType, border style) |
| Text            | SquareElemType    | opacity (decimal), color (Color)                                                                                                          |
| Highlight       | HighlightElemType | opacity (decimal), color (Color), flags (AnnotationFlags)                                                                                 |
| Underline       | UnderlineElemType | opacity (decimal), color (Color), flags (AnnotationFlags)                                                                                 |
| Strikeout       | StrikeoutElemType | opacity (decimal), color (Color), flags (AnnotationFlags)                                                                                 |
| Line            | LineElemType      | opacity (decimal), color (Color), head (LineEndType), tail (LineEndType)                                                                  |
| Polygon         | PolygonElemType   | opacity (decimal), width (integer), color (Color,border color), interiorColor (Color, interior color), style (StyleBEType, border style)  |
| Polyline        | PolylineElemType  | opacity (decimal), width (integer), color (Color)                                                                                         |
| Ink             | InkElemType       | opacity (decimal), width (integer), color (Color)                                                                                         |

Precision about properties:

- Color: a color is defined on this model. r,g et b values are
  between 0 and 255.

```xml
<property name="color">
    <bean class="com.arondor.viewer.annotation.common.Color">
        <property name="r" value="0" />
        <property name="g" value="0" />
        <property name="b" value="255" />
    </bean>
</property>
```

- LineEndType: authorized values `SQUARE`, `CIRCLE`, `DIAMOND`,
  `OPEN_ARROW`, `CLOSED_ARROW`, `NONE`, `BUTT`, `R_OPEN_ARROW`,
  `R_CLOSED_ARROW`

```xml
<property name="head">
    <value type="com.arondor.viewer.annotation.api.LineEndType">NONE</value>
</property>
```

- AnnotationFlags: obfuscate tag is available

```xml
<property name="annotationFlags">
    <bean class="com.arondor.viewer.annotation.common.AnnotationFlags">
        <property name="obfuscate" value="true" />
    </bean>
</property>
```

- Style: Two styles are available: `CLOUDY` and `SOLID`

```xml
<property name="style">
    <bean class=" com.arondor.viewer.annotation.api.StyleBEType">
        <constructor-arg>
            <value>CLOUDY</value>
        </constructor-arg>
    </bean>
</property>
```

## Annotation securities configuration

Securities list allows to define securities for all annotations. This
list is visible as dropdown list in annotation toolbar when an
annotation is in edit mode. Every security has two parameters:

- **symbolicName**, value sent to server for processing.
- **localizedDisplayNames**, a map which have for every entry locale
  as key and display name as value.

```xml
<bean id="availableSecurityLevels" class="java.util.ArrayList">
    <constructor-arg>
        <list>
            <bean class="com.arondor.viewer.annotation.common.SecurityLevel">
                <property name="symbolicName" value="private" />
                <property name="localizedDisplayNames">
                    <map>
                        <entry>
                            <key>
                                <value>fr</value>
                            </key>
                            <value>Privé</value>
                        </entry>
                        <entry>
                            <key>
                                <value>en</value>
                            </key>
                            <value>Private</value>
                        </entry>
                    </map>
                </property>
            </bean>
            <bean class="com.arondor.viewer.annotation.common.SecurityLevel">
                <property name="symbolicName" value="public" />
                <property name="localizedDisplayNames">
                    <map>
                        <entry>
                            <key>
                                <value>fr</value>
                            </key>
                            <value>Public</value>
                        </entry>
                        <entry>
                            <key>
                                <value>en</value>
                            </key>
                            <value>Public</value>
                        </entry>
                    </map>
                </property>
            </bean>
        </list>
    </constructor-arg>
</bean>
```

## Configuration of a submenu for the annotation creation buttons

Since the version 4.7.x, the annotation buttons are in the toppanel by default, they are no longer in a submenu.

![img](/img/arender/toppanel/toppanel-annotation-1.png)

### Current configuration of the buttons in the toppanel

Here is the current configuration of the bean serving as the container for the annotation creation buttons :

```xml
    <bean id="annotationMenu"
		class="com.arondor.viewer.client.toppanel.presenter.SimpleButtonSetPresenter">
		<property name="enabled" value="${topPanel.annotationMenu}" />
		<property name="orderedNamedList" value="${topPanel.annotation.buttons.beanNames}" />
		<property name="className" value="fullHeight annotationMenu" />
		<property name="visibilityForTopPanel">
			<ref bean="topPanelVisibilityMode" />
		</property>
		<property name="shrinkToDropDown" value="true" />
		<property name="dropdownId" value="dropdownAnnotation" />
		<property name="dropdownClassName" value="standardButton icon-add-annotations more-icon" />
	</bean>
```

Here is an example of a bean that defines an annotation creation button located in the toppanel:

```xml
    <bean id="addHighlightRectangleAnnotationButton"
		class="com.arondor.viewer.client.widgets.ActivableButtonPresenter">
		<constructor-arg value="addHighlightRectangleAnnotationButton" />
		<property name="name" value="Square" />
		<property name="supportDoubleClick" value="${topPanel.annotationMenu.highlight.repeat}" />
		<property name="enabled" value="${topPanel.annotationMenu.highlight}" />
		<property name="className" value="standardButton icon-highlight-area toppanelButton" />
		<property name="buttonGroup" value="topPanel" />
		<property name="buttonTitle">
			<ref bean="labels#addRectangleAnnotation" />
		</property>
		<property name="visibilityForTopPanel">
			<ref bean="topPanelVisibilityMode" />
		</property>
		<property name="doubleClickButtonHandler">
			<ref bean="highlightCreationRepeatableAction" />
		</property>
		<property name="inactiveButtonHandler">
			<ref bean="quitAnnotationCreationAction" />
		</property>
		<property name="buttonHandler">
			<ref bean="highlightCreationAction" />
		</property>
		<property name="supportShortCut" value="true"/>
		<property name="shortcut">
			<bean
				class="com.arondor.viewer.client.documentcontent.shortcuts.KeyboardShortCut"
				scope="prototype">
				<property name="ctrl" value="true" />
				<property name="key" value="${shortcut.annotation.rectangle.key}" />
				<property name="enabled" value="${shortcut.annotation.rectangle.enabled}" />
			</bean>
		</property>
	</bean>
```

### Configuration to put the buttons in a submenu

#### The submenu

The container will have to be modified in order to become a button opening a submenu. First the following properties must be deleted because they are not compatible with the submenu :

- shrinkToDropDown
- dropdownId
- dropdownClassName

The class of the bean must be modified so that it corresponds to a button opening a submenu. The new class to be used is _com.arondor.viewer.client.toppanel.presenter.SubMenuButtonPresenter_.

Here is the complete example of the bean, to be put in the _arender-custom-integration.xml_ file, which allows to have a button opening a submenu instead of a simple button container in the toppanel :

```xml
<bean id="annotationMenu"
    class="com.arondor.viewer.client.toppanel.presenter.SubMenuButtonPresenter">
    <constructor-arg value="annotationMenu"/>
    <property name="enabled" value="${topPanel.annotationMenu}" />
    <property name="orderedNamedList" value="${topPanel.annotation.buttons.beanNames}" />
    <property name="className" value="standardButton icon-add-annotations more-icon" />
    <property name="visibilityForTopPanel">
        <ref bean="topPanelVisibilityMode" />
    </property>
    <property name="buttonGroup" value="topPanel" />
</bean>
```

#### The buttons in the submenu

To put the buttons in a submenu, you will have to take the bean corresponding to the annotations you want to put in the submenu, then add them to the _arender-custom-integration.xml_ file. Then the following properties will need to be removed as they are not compatible with a submenu button :

- name
- buttonGroup
- inactiveButtonHandler
- supportShortCut
- shortcut

The class of the bean must be modified in order to have a button that can be integrated into the submenu. The new class to use is _com.arondor.viewer.client.widgets.DropdownMenuItem_.

If the double-click must be managed, then it will be necessary to add before the _buttonHandler_ property, the following property allowing to define the time, in milliseconds, of the interval between the two clicks :

```xml
<property name="clickInterval" value="200" />
```

Once these steps are completed, you will have a bean that looks like the following example. The step will have to be repeated for each button to be added in a submenu.

```xml
<bean id="addHighlightRectangleAnnotationButton"
    class="com.arondor.viewer.client.widgets.DropdownMenuItem">
    <constructor-arg value="addHighlightRectangleAnnotationButton" />
    <property name="supportDoubleClick" value="${topPanel.annotationMenu.highlight.repeat}" />
    <property name="enabled" value="${topPanel.annotationMenu.highlight}" />
    <property name="className" value="standardButton icon-highlight-area toppanelButton" />
    <property name="clickInterval" value="200" />
    <property name="buttonTitle">
        <ref bean="labels#addRectangleAnnotation" />
    </property>
    <property name="visibilityForTopPanel">
        <ref bean="topPanelVisibilityMode" />
    </property>
    <property name="doubleClickButtonHandler">
        <ref bean="highlightCreationRepeatableAction" />
    </property>
    <property name="buttonHandler">
        <ref bean="highlightCreationAction" />
    </property>
</bean>
```

Result with several annotation creation buttons in the submenu :

![img](/img/arender/toppanel/toppanel-annotation-2.png)
