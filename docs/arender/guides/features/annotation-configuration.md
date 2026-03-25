---
viewer: classic
title: Annotation configuration
slug: /guides/features/annotation-configuration
sidebar_position: 6
---

# Annotation configuration

This page covers annotation behavior configuration, stamp templates, security levels, creation rules, and per-page loading.

For the complete list of annotation properties, see [Viewer configuration — Annotations](../../reference/viewer-configuration.md#annotation-behavior).

## Annotation creation defaults (XML)

You can override annotation creation defaults per type in `events-configuration.xml` by defining a creation action bean. Each bean specifies the annotation type class and its initial property values.

Example — a blue-bordered rectangle with zero fill opacity:

```xml title="events-configuration.xml"
<bean id="SquareCreationAction"
  class="com.arondor.viewer.client.toppanel.behavior.annotation.CreateAnnotationButtonHandler">
  <constructor-arg>
    <bean class="com.arondor.viewer.client.annotation.events.PrepareAnnotationCreationEvent">
      <constructor-arg>
        <value type="com.arondor.viewer.annotation.common.AnnotationType">Square</value>
      </constructor-arg>
      <property name="model">
        <bean class="com.arondor.viewer.annotation.api.SquareElemType">
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
    </bean>
  </constructor-arg>
</bean>
```

### Per-type XML model classes and properties

| Annotation type | Class | Configurable properties |
|-----------------|-------|------------------------|
| Square | `SquareElemType` | `opacity` (decimal), `width` (int), `color` (Color, border), `interiorColor` (Color, fill), `style` (StyleBEType) |
| Circle | `CircleElemType` | `opacity` (decimal), `width` (int), `color` (Color, border), `interiorColor` (Color, fill), `style` (StyleBEType) |
| Text | `SquareElemType` | `opacity` (decimal), `color` (Color) |
| Highlight | `HighlightElemType` | `opacity` (decimal), `color` (Color), `flags` (AnnotationFlags) |
| Underline | `UnderlineElemType` | `opacity` (decimal), `color` (Color), `flags` (AnnotationFlags) |
| Strikeout | `StrikeoutElemType` | `opacity` (decimal), `color` (Color), `flags` (AnnotationFlags) |
| Line | `LineElemType` | `opacity` (decimal), `color` (Color), `head` (LineEndType), `tail` (LineEndType) |
| Polygon | `PolygonElemType` | `opacity` (decimal), `width` (int), `color` (Color, border), `interiorColor` (Color, fill), `style` (StyleBEType) |
| Polyline | `PolylineElemType` | `opacity` (decimal), `width` (int), `color` (Color) |
| Ink | `InkElemType` | `opacity` (decimal), `width` (int), `color` (Color) |

All classes are under the `com.arondor.viewer.annotation.api` package.

### Property type details

**Color** — RGB values between 0 and 255:

```xml
<property name="color">
  <bean class="com.arondor.viewer.annotation.common.Color">
    <property name="r" value="0" />
    <property name="g" value="0" />
    <property name="b" value="255" />
  </bean>
</property>
```

**LineEndType** — enum values for arrow heads and tails:

```xml
<property name="head">
  <value type="com.arondor.viewer.annotation.api.LineEndType">OPEN_ARROW</value>
</property>
```

Values: `NONE`, `SQUARE`, `CIRCLE`, `DIAMOND`, `OPEN_ARROW`, `CLOSED_ARROW`, `BUTT`, `R_OPEN_ARROW`, `R_CLOSED_ARROW`.

**AnnotationFlags** — supports the `obfuscate` flag for redaction:

```xml
<property name="annotationFlags">
  <bean class="com.arondor.viewer.annotation.common.AnnotationFlags">
    <property name="obfuscate" value="true" />
  </bean>
</property>
```

**StyleBEType** — border styles (`CLOUDY` or `SOLID`):

```xml
<property name="style">
  <bean class="com.arondor.viewer.annotation.api.StyleBEType">
    <constructor-arg>
      <value>CLOUDY</value>
    </constructor-arg>
  </bean>
</property>
```

## Stamp template configuration

Stamp templates are defined in `annotation-template-catalog.xml`. Two types are available: text stamps and image stamps.

### Text stamp

```xml title="annotation-template-catalog.xml"
<bean class="com.arondor.viewer.client.api.annotation.templates.AnnotationTemplate">
  <property name="name" value="Urgent" />
  <property name="annotationType">
    <value type="com.arondor.viewer.annotation.common.AnnotationType">Stamp</value>
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

### Image stamp

```xml title="annotation-template-catalog.xml"
<bean class="com.arondor.viewer.client.api.annotation.templates.AnnotationTemplate">
  <property name="name" value="Logo" />
  <property name="annotationType">
    <value type="com.arondor.viewer.annotation.common.AnnotationType">ImageStamp</value>
  </property>
  <property name="imageLocation" value="data:image/png;base64,iVBORw0KGgo..." />
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

## Annotation creation rules

Creation rules automate annotation placement based on text search patterns. This is useful for auto-redacting sensitive information (e.g., Social Security numbers, email addresses).

### Rule structure

A rule has three parts: identity, search options, and annotation template.

```xml
<bean id="redactConfidential"
  class="com.arondor.viewer.client.api.annotation.AnnotationCreationRule">
  <property name="ruleId" value="redactConfidential" />
  <property name="ruleName" value="Redact confidential occurrences" />
  <property name="searchOptions">
    <bean class="com.arondor.viewer.client.api.search.SearchOptions">
      <property name="searchText" value="confidential" />
      <property name="accentSensitive" value="false" />
      <property name="caseSensitive" value="false" />
      <property name="regex" value="false" />
      <property name="searchAction">
        <value type="com.arondor.viewer.client.api.search.SearchAction">ALL_PAGES</value>
      </property>
    </bean>
  </property>
  <property name="annotationTemplate">
    <bean class="com.arondor.viewer.client.api.annotation.templates.AnnotationTemplate">
      <property name="name" value="" />
      <property name="annotationType">
        <value type="com.arondor.viewer.annotation.common.AnnotationType">RedactText</value>
      </property>
      <property name="annotationStyle">
        <bean class="com.arondor.viewer.client.api.annotation.AnnotationStyle">
          <property name="backgroundColor" value="#000000" />
          <property name="opacity" value="1.0f" />
        </bean>
      </property>
    </bean>
  </property>
</bean>
```

Search action values: `CURRENT_PAGE`, `ALL_PAGES`, `SELECTED_PAGES` (requires `pageSelection` list property).

Compatible annotation types: `Strikeout`, `Underline`, `Highlight`, `Redact`, `RedactText`.

### Adding rules to the catalog

Rules must be registered in the `annotationCreationRuleCatalog` bean:

```xml
<bean id="annotationCreationRuleCatalog"
  class="com.arondor.viewer.client.api.annotation.AnnotationCreationRuleCatalog">
  <property name="annotationCreationRules">
    <list>
      <ref bean="redactConfidential" />
    </list>
  </property>
</bean>
```

### Triggering rules via JavaScript

```js
// Apply all rules from the catalog
$wnd.getARenderJS().createAnnotationByRuleWithCatalog();

// Apply specific rules by ID
$wnd.getARenderJS().createAnnotationByRulesWithRuleId(["redactConfidential"]);
```

## Security levels

Security levels assign a group or classification to annotations. Enable them with `arender.server.annotations.text.security.support=true` (see [Viewer configuration](../../reference/viewer-configuration.md#annotations-server)).

Define the `availableSecurityLevels` bean in your configuration XML:

```xml
<bean id="availableSecurityLevels" class="java.util.ArrayList">
  <constructor-arg>
    <list>
      <bean class="com.arondor.viewer.annotation.common.SecurityLevel">
        <property name="symbolicName" value="private" />
        <property name="localizedDisplayNames">
          <map>
            <entry key="fr" value="Prive" />
            <entry key="en" value="Private" />
          </map>
        </property>
      </bean>
      <bean class="com.arondor.viewer.annotation.common.SecurityLevel">
        <property name="symbolicName" value="public" />
        <property name="localizedDisplayNames">
          <map>
            <entry key="fr" value="Public" />
            <entry key="en" value="Public" />
          </map>
        </property>
      </bean>
    </list>
  </constructor-arg>
</bean>
```

### Connector-level override

Security levels can also be set programmatically in a connector:

```java
@Override
public void setAnnotationAccessor(AnnotationAccessor annotationAccessor)
    throws AnnotationsNotSupportedException
{
    this.annotationAccessor = annotationAccessor;
    List<SecurityLevel> levels = new ArrayList<>();
    levels.add(buildSecurityLevel("private", "Prive", "Private"));
    levels.add(buildSecurityLevel("team-a", "Equipe A", "Team A"));
    annotationAccessor.getAnnotationCreationPolicy().setAnnotationsSupportSecurity(true);
    annotationAccessor.getAnnotationCreationPolicy().setAvailableSecurityLevels(levels);
}
```
