---
title: Annotation configuration
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /guides/features/annotation-configuration
sidebar_position: 6
content_hash: ec5c40a70526ac76c441a8b73ff50c30c5a0ed1d181554a9f60207e4a8dd8299
---

# Annotation configuration

This page covers annotation behavior, per-type defaults, stamp templates, security levels, creation rules, and per-page loading.

## Annotation creation policy

These server-side properties control what annotation features are available. Set them in `arender-custom-server.properties`. See also the [Rendition properties — Annotations](../../reference/rendition-properties.md#annotations) for default values.

| Property | Description | Type |
|----------|-------------|------|
| `arender.server.annotations.can.create` | Allow users to create annotations | Boolean |
| `arender.server.annotations.text.html.support` | Sticky notes support HTML content | Boolean |
| `arender.server.annotations.text.reply.support` | Sticky notes support replies | Boolean |
| `arender.server.annotations.text.status.support` | Sticky notes support status tracking | Boolean |
| `arender.server.annotations.text.security.support` | Sticky notes support security levels | Boolean |
| `arender.server.annotations.text.comment.reply.support` | Sticky notes support replies in the comment explorer | Boolean |

## General annotation properties

Set these in `arender-custom-client.properties`.

| Property | Default | Type | Description |
|----------|---------|------|-------------|
| `annotation.autosave` | `false` | Boolean | Automatic save mode |
| `annotation.autorefresh` | `true` | Boolean | Auto-refresh annotations after save |
| `annotation.loadExisting` | `true` | Boolean | Load existing annotations on document open |
| `annotation.loadingGIF` | `true` | Boolean | Display loading indicator when saving |
| `annotation.searchTextInAnnotations` | `true` | Boolean | Include annotation text content in search |
| `annotation.preferences.update.onEdit.enabled` | `false` | Boolean | Allow annotation preferences update on edit |
| `annotation.autosave.repeatMode.enabled` | `false` | Boolean | Trigger save during repeatable annotation creation |
| `annotation.autosave.timerDelay` | `1000` | Integer | Auto-save delay in milliseconds |

## Per-type default properties

Each annotation type has configurable defaults set in `arender-custom-client.properties`.

### Sticky note

| Property | Default | Type |
|----------|---------|------|
| `annotation.stickyNote.opacity` | `1.0` | Float |
| `annotation.stickyNote.minimum.width` | `250` | Integer |
| `annotation.stickyNote.minimum.height` | `170` | Integer |
| `annotation.stickyNote.default.color` | `#FFDD00` | String |
| `annotation.stickyNote.default.fontSize` | `2` | Integer |
| `annotation.stickyNote.default.font` | `Helvetica` | String |
| `annotation.stickyNote.default.underline` | `false` | Boolean |
| `annotation.stickyNote.default.bold` | `false` | Boolean |
| `annotation.stickyNote.default.italic` | `false` | Boolean |
| `annotation.stickyNote.default.fontColor` | `#000000` | String |
| `annotation.stickyNote.hide.border` | `true` | Boolean |
| `annotation.stickyNote.hide.details` | `false` | Boolean |
| `annotation.stickyNote.can.hide.reply.button` | `false` | Boolean |
| `annotation.stickyNote.according.to.zoom` | `true` | Boolean |
| `annotation.stickyNote.content.edition.height.ratio` | `0.7` | Float |
| `annotation.stickyNote.dotLink.enabled` | `true` | Boolean |
| `annotation.stickyNote.pin.default.size` | `20` | Integer |
| `annotation.stickyNote.statusList.enabled` | `true` | Boolean |
| `annotation.stickyNote.action.buttons` | `HOVER` | String (`ALWAYS`, `HOVER`, `NEVER`) |
| `annotation.stickyNote.show.date` | `true` | Boolean |
| `annotation.stickyNote.creator.name.initial.only` | `true` | Boolean |
| `annotation.stickyNote.pin.display.mode` | `INITIALS` | String (`INITIALS`, `INDEX`) |
| `annotation.stickyNote.outline` | `false` | Boolean |

### Rectangle

| Property | Default | Type |
|----------|---------|------|
| `annotation.rectangle.opacity` | `0.7` | Float |
| `annotation.rectangle.minimum.width` | `30` | Integer |
| `annotation.rectangle.minimum.height` | `10` | Integer |
| `annotation.rectangle.default.color` | `#EAF39C` | String |
| `annotation.rectangle.default.border.color` | `#EAF39C` | String |
| `annotation.rectangle.default.border.width` | `0` | Integer |

### Circle

| Property | Default | Type |
|----------|---------|------|
| `annotation.circle.opacity` | `0.7` | Float |
| `annotation.circle.minimum.width` | `30` | Integer |
| `annotation.circle.minimum.height` | `10` | Integer |
| `annotation.circle.default.color` | `#EAF39C` | String |
| `annotation.circle.default.border.color` | `#EAF39C` | String |
| `annotation.circle.default.border.width` | `0` | Integer |

### Highlight, strikeout, and underline

| Property | Default | Type |
|----------|---------|------|
| `annotation.highlighttext.opacity` | `0.7` | Float |
| `annotation.highlighttext.default.color` | `#EAF39C` | String |
| `annotation.highlighttext.strike.width.ratio` | `0.1` | Float |

### Redact

| Property | Default | Type |
|----------|---------|------|
| `annotation.can.hide.redact` | `false` | Boolean |
| `toolbar.redact.locked` | `false` | Boolean |

### Arrow

| Property | Default | Type |
|----------|---------|------|
| `annotation.arrow.backgroundColor` | `#2A4869` | String |
| `annotation.arrow.opacity` | `1.0` | Float |
| `annotation.arrow.border.width` | `4.0` | Float |
| `annotation.arrow.head.type` | `OPEN_ARROW` | String |
| `annotation.arrow.tail.type` | `NONE` | String |
| `annotation.arrow.computeDistance` | `false` | Boolean |
| `annotation.arrow.minimal.head.size` | `-1` | Integer |
| `annotation.arrow.x.defaultDistance` | `12` | Integer |
| `annotation.arrow.y.defaultDistance` | `12` | Integer |
| `annotation.arrow.distance.degree.accuracy` | `0.01` | Float |

Head and tail type values: `NONE`, `SQUARE`, `CIRCLE`, `DIAMOND`, `OPEN_ARROW`, `CLOSED_ARROW`, `BUTT`, `R_OPEN_ARROW`, `R_CLOSED_ARROW`.

### Measurement arrow

| Property | Default | Type |
|----------|---------|------|
| `annotation.arrow.measurement.head.type` | `BUTT` | String |
| `annotation.arrow.measurement.tail.type` | `BUTT` | String |

Other measurement arrow properties share the same keys as the standard arrow (background color, opacity, border width, distances, accuracy).

### Polygon

| Property | Default | Type |
|----------|---------|------|
| `annotation.polygon.opacity` | `0.7` | Float |
| `annotation.polygon.backgroundColor` | `#2A4869` | String |
| `annotation.polygon.width` | `2.0f` | Float |
| `annotation.polygon.borderColor` | `#2A4869` | String |

### Polyline

| Property | Default | Type |
|----------|---------|------|
| `annotation.polyline.opacity` | `1` | Float |
| `annotation.polyline.backgroundColor` | `#2A4869` | String |
| `annotation.polyline.width` | `2.0f` | Float |

### Freehand (ink)

| Property | Default | Type |
|----------|---------|------|
| `annotation.ink.opacity` | `1` | Float |
| `annotation.ink.backgroundColor` | `#2A4869` | String |
| `annotation.ink.width` | `2.0f` | Float |

## Annotation creation defaults (XML)

You can override annotation creation defaults per type in `events-configuration.xml` by defining a creation action bean. Each bean specifies the annotation type class and its initial property values.

Example -- a blue-bordered rectangle with zero fill opacity:

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

**Color** -- RGB values between 0 and 255:

```xml
<property name="color">
  <bean class="com.arondor.viewer.annotation.common.Color">
    <property name="r" value="0" />
    <property name="g" value="0" />
    <property name="b" value="255" />
  </bean>
</property>
```

**LineEndType** -- enum values for arrow heads and tails:

```xml
<property name="head">
  <value type="com.arondor.viewer.annotation.api.LineEndType">OPEN_ARROW</value>
</property>
```

Values: `NONE`, `SQUARE`, `CIRCLE`, `DIAMOND`, `OPEN_ARROW`, `CLOSED_ARROW`, `BUTT`, `R_OPEN_ARROW`, `R_CLOSED_ARROW`.

**AnnotationFlags** -- supports the `obfuscate` flag for redaction:

```xml
<property name="annotationFlags">
  <bean class="com.arondor.viewer.annotation.common.AnnotationFlags">
    <property name="obfuscate" value="true" />
  </bean>
</property>
```

**StyleBEType** -- border styles (`CLOUDY` or `SOLID`):

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

| Property | Type | Description |
|----------|------|-------------|
| `name` | String | Stamp display name |
| `fontColor` | String | Text color (name or hex) |
| `fontSize` | Integer | Font size |
| `backgroundColor` | String | Background color (name or hex, `none` for transparent) |
| `borderColor` | String | Border color (name or hex) |
| `borderStyle` | Integer | `0` = no border, `1` = with border |
| `rotation` | Integer | Rotation in degrees |

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

| Property | Type | Description |
|----------|------|-------------|
| `name` | String | Stamp display name |
| `imageLocation` | String | Base64-encoded image data or URL |
| `defaultPosition.w` | Integer | Width in pixels |
| `defaultPosition.h` | Integer | Height in pixels |
| `rotation` | Integer | Rotation in degrees |

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

A rule has three parts: rule identity, search options, and annotation template.

### Rule structure

**Rule details:**

```xml
<property name="ruleId" value="redactSSN" />
<property name="ruleName" value="Redact Social Security Numbers" />
```

**Search options:**

```xml
<property name="searchOptions">
  <bean class="com.arondor.viewer.client.api.search.SearchOptions">
    <property name="searchText" value="\d{3}-\d{2}-\d{4}" />
    <property name="accentSensitive" value="false" />
    <property name="caseSensitive" value="false" />
    <property name="regex" value="true" />
    <property name="searchAction">
      <value type="com.arondor.viewer.client.api.search.SearchAction">ALL_PAGES</value>
    </property>
  </bean>
</property>
```

Search action values:
- `CURRENT_PAGE` -- search only the active page
- `ALL_PAGES` -- search across the entire document
- `SELECTED_PAGES` -- search specific pages (requires the `pageSelection` property)

For `SELECTED_PAGES`, add:

```xml
<property name="pageSelection">
  <list>
    <value>0</value>
    <value>2</value>
  </list>
</property>
```

**Annotation template:**

Compatible annotation types: `Strikeout`, `Underline`, `Highlight`, `Redact`, `RedactText`.

```xml
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
```

### Complete rule example

This rule redacts every occurrence of the word "confidential" across all pages:

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

### Adding rules to the catalog

Rules must be registered in the `annotationCreationRuleCatalog` bean. This overrides the default catalog:

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

Apply all rules from the catalog:

```js
$wnd.getARenderJS().createAnnotationByRuleWithCatalog();
```

Apply specific rules by ID:

```js
$wnd.getARenderJS().createAnnotationByRulesWithRuleId(["redactConfidential"]);
```

### Binding a rule to a custom button

Define a button that triggers the rule:

```xml
<bean id="customRedactButton"
  class="com.arondor.viewer.client.toppanel.presenter.ButtonPresenter">
  <constructor-arg value="customRedactButton" />
  <constructor-arg value="Redact Confidential" />
  <constructor-arg value="standardButton" />
  <property name="enabled" value="true" />
  <property name="buttonHandler">
    <bean class="com.arondor.viewer.client.jsapi.toppanel.JSCallButtonHandler">
      <property name="jsCode">
        <value>
          $wnd.getARenderJS().createAnnotationByRulesWithRuleId(["redactConfidential"]);
        </value>
      </property>
    </bean>
  </property>
</bean>
```

Add the button bean name to the annotation button list in `arender-custom-client.properties`:

```properties
topPanel.annotation.buttons.beanNames=addStickyNoteAnnotationButton,addFreeTextAnnotationButton,customRedactButton
```

## Security levels

Security levels assign a group or classification to annotations. They appear as a dropdown in the annotation toolbar when editing. Enable them with:

```properties
arender.server.annotations.text.security.support=true
```

### XML configuration

Define the `availableSecurityLevels` bean in your configuration XML. Each level has a `symbolicName` (sent to the server) and `localizedDisplayNames` (locale-to-label map):

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
      <bean class="com.arondor.viewer.annotation.common.SecurityLevel">
        <property name="symbolicName" value="restricted" />
        <property name="localizedDisplayNames">
          <map>
            <entry key="fr" value="Restreint" />
            <entry key="en" value="Restricted" />
          </map>
        </property>
      </bean>
    </list>
  </constructor-arg>
</bean>
```

### Connector-level override

Security levels can also be set programmatically in a connector by implementing `setAnnotationAccessor`:

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

### Using security levels for access control

The `AnnotationAccessor` implementation can enforce behavior based on the security value. For example, locking annotations marked as "private":

```java
private void updateAnnotationSecurity(List<Annotation> annotations)
{
    for (Annotation annotation : annotations)
    {
        if ("private".equals(annotation.getSecurity()))
        {
            annotation.getFlags().setLocked(true);
            annotation.getFlags().setReadonly(true);
        }
    }
}
```

Call this method from both `create()` and `update()` in your `AnnotationAccessor`.

## Per-page annotation loading

If the annotation connector implements the `AnnotationPageAccessor` interface, annotations are loaded one page at a time instead of all at once. This reduces initial load time for documents with many annotations.

Enable it with:

```properties
annotation.loadPerPage=true
```

The interface signature:

```java
List<Annotation> get(int page)
    throws AnnotationsNotSupportedException,
           AnnotationCredentialsException,
           InvalidAnnotationFormatException;
```

The connector must implement per-page access to the backend annotation storage to benefit from this feature.

## Comment explorer

The comment explorer panel displays annotations in a list view. Key properties:

| Property | Default | Type | Description |
|----------|---------|------|-------------|
| `annotation.comment.explorer.sortByIncrementDate` | `false` | Boolean | Sort comments by date ascending |
| `annotation.comment.explorer.filterPageAnnotations` | `true` | Boolean | Filter annotations to current page |
| `annotation.comment.explorer.eastSide.enabled` | `false` | Boolean | Place explorer on the right side |
| `annotation.comment.explorer.openOnEdit` | `false` | Boolean | Open explorer when editing an annotation |
| `annotation.comment.explorer.showAtStartup` | `false` | Boolean | Show explorer on document load |
| `annotation.comment.explorer.showAllAnnotators` | `true` | Boolean | Show all annotation authors |
| `annotation.comment.explorer.showTotalAnnotationsNumber` | `false` | Boolean | Show total annotation count |
| `annotation.comment.explorer.inline.enabled` | `false` | Boolean | Display annotations in one line |
| `annotation.comment.explorer.show.date` | `true` | Boolean | Display annotation date |
| `annotation.comment.explorer.creator.name.initial.only` | `false` | Boolean | Show only creator initials |
| `annotation.comment.explorer.show.one.annotation.only` | `false` | Boolean | Show one annotation per page |
| `annotation.comment.explorer.filter.types.enabled` | `false` | Boolean | Enable annotation type filter |
| `annotation.comment.explorer.filter.types` | | String | Comma-separated list of types to show on startup |

Available filter types: `Circle`, `Freetext`, `Highlight`, `ImageStamp`, `Polygon`, `Polyline`, `Sound`, `Square`, `Stamp`, `Strikeout`, `Text`, `Underline`.

## Date display

| Property | Default | Type | Description |
|----------|---------|------|-------------|
| `annotation.date.display.humanizedDate.enabled` | `false` | Boolean | Show relative dates ("2 hours ago") |
| `annotation.date.display.creationDate` | `true` | Boolean | Display creation date on annotations |

## Information popup

| Property | Default | Type | Description |
|----------|---------|------|-------------|
| `annotation.info.popup.enabled` | `true` | Boolean | Show info popup on hover |
| `annotation.info.popup.evenIfEditable` | `false` | Boolean | Show popup even when annotation is editable |
| `annotation.info.popup.displayUpdate` | `false` | Boolean | Show last-update information |

## Local storage

Annotation property preferences can be stored in the browser local storage:

| Property | Type | Description |
|----------|------|-------------|
| `annotation.use.local.storage` | Boolean | Persist annotation preferences in browser local storage |

:::caution
Enabling local storage prevents on-the-fly property changes such as profile switching from taking effect until the local storage is cleared.
:::
