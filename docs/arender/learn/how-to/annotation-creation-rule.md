---
title: Annotation creation by rules
sidebar_position: 3
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
content_hash: 9302e6db0694b24585694cc2651fbb19e81470cf48b4f060bf43f6b84623a56f
---

## General concept

The principle of creation of annotations by rules is based on the search for a text or a regular expression on which we are going to apply a defined annotation.

For example, it is possible to automate the redact of sensitive information having a specific pattern.

## Structure of annotation creation rules

The rules will be defined via _beans_ in the ARender configuration files. A rule is made up of three main parts:

- Rule details
- Search details
- Annotation details

### Rule details

A rule needs an identifier and a name.

```xml
<property name="ruleId" value="annotationCreationRuleExample" />
<property name="ruleName" value="Example of annotation creation rule" />
```

### Search details

The search details allow you to choose a term or a regular expression to search for. The search can be refined by choosing whether accents or case are taken into account.

Different type of search is configurable in order to apply it on different area of ​​the document. The application can be done either on the current page, or on all the pages or a page selection :

- CURRENT_PAGE
- ALL_PAGES
- SELECTED_PAGES

```xml
<property name="searchOptions">
  <bean class="com.arondor.viewer.client.api.search.SearchOptions">
    <property name="searchText" value="your_text_to_be_search" />
    <property name="accentSensitive" value="false" />
    <property name="caseSensitive" value="false" />
    <property name="regex" value="true" />
    <property name="searchAction">
      <value type="com.arondor.viewer.client.api.search.SearchAction">CURRENT_PAGE</value>
    </property>
  </bean>
</property>
```

When the _SELECTED_PAGES_ option is used, the _pageSelection_ property must be added to the _bean_ of the rule, which makes it possible to list the targeted pages.

```xml
<!--ONLY FOR THE SEARCH ACTION *SELECTED_PAGES* -->
<property name ="pageSelection">
  <list>
    <value>your_page_number_here</value>
    <value>another page number..</value>
  </list>
</property>
```

### Annotation details

Annotations compatible with this feature are strikethrough, underline, underline, strikethrough, and text strikethrough annotations. The associated values ​​for each annotation type are :

- Strikeout
- Underline
- Highlight
- Redact
- RedactText

An annotation will need to have the opacity and background color set in order to be constructed. The background color only takes on the value of hexadecimal.

```xml
<property name="annotationTemplate">
  <bean class="com.arondor.viewer.client.api.annotation.templates.AnnotationTemplate">
    <property name="name" value="" />
    <property name="annotationType">
      <value type="com.arondor.viewer.annotation.common.AnnotationType">Underline</value>
    </property>
    <property name="annotationStyle">
      <bean class="com.arondor.viewer.client.api.annotation.AnnotationStyle">
        <property name="backgroundColor" value="#ff0000" />
        <property name="opacity" value="0.8f" />
      </bean>
    </property>
  </bean>
</property>
```

### Complete rule

Here is an example _bean_ of a complete rule combining the three main parts. The example allows underlining in red each word 'document' of the current page.

```xml
<bean id="annotationCreationRuleExample" class="com.arondor.viewer.client.api.annotation.AnnotationCreationRule">
  <!-- Rule details -->
  <property name="ruleId" value="annotationCreationRuleExample" />
  <property name="ruleName" value="Example of annotation creation rule" />
  <!-- Search details -->
  <property name="searchOptions">
    <bean
      class="com.arondor.viewer.client.api.search.SearchOptions">
      <property name="searchText" value="document" />
      <property name="accentSensitive" value="false" />
      <property name="caseSensitive" value="false" />
      <property name="regex" value="true" />
      <property name="searchAction">
        <value
          type="com.arondor.viewer.client.api.search.SearchAction">CURRENT_PAGE</value>
      </property>
    </bean>
  </property>
  <!-- Annotation details -->
  <property name="annotationTemplate">
    <bean
      class="com.arondor.viewer.client.api.annotation.templates.AnnotationTemplate">
      <property name="name" value="" />
      <property name="annotationType">
        <value
          type="com.arondor.viewer.annotation.common.AnnotationType">Underline</value>
      </property>
      <property name="annotationStyle">
        <bean class="com.arondor.viewer.client.api.annotation.AnnotationStyle">
          <property name="backgroundColor" value="#ff0000" />
          <property name="opacity" value="0.8f" />
        </bean>
      </property>
    </bean>
  </property>
</bean>
```

### Adding a rule to the rule catalog

To use the rules, they must be referenced in the rules catalog. The following example will override the default _annotationCreationRuleCatalog_.

Custom rules are only known to ARender from the rule catalog which lists the different rule identifiers.

```xml
<bean id="annotationCreationRuleCatalog"
  class="com.arondor.viewer.client.api.annotation.AnnotationCreationRuleCatalog">
  <property name="annotationCreationRules">
    <list>
      <ref bean="annotationCreationRuleExample" />
    </list>
  </property>
</bean>
```

## Use of rules by JavaScript

It is possible with javascript to trigger the application of all the rules of the catalog.

```js
$wnd.getARenderJS().createAnnotationByRuleWithCatalog();
```

It is also possible to make a list of the identifiers of the rules present in the catalog which must be triggered:

```js
$wnd.getARenderJS().createAnnotationByRulesWithRuleId(["annotationCreationRuleExample"]);
```

## Example of use

The following example will allow you to define a rule allowing to cross out the word _view_ on the current page.

### Creating a custom rule

```xml
<bean id="redactRuleExample"
  class="com.arondor.viewer.client.api.annotation.AnnotationCreationRule">
  <!-- Rule details -->
  <property name="ruleId" value="redactRuleExample" />
  <property name="ruleName" value="Example of annotation creation rule for redact" />
  <!-- Search details -->
  <property name="searchOptions">
    <bean
      class="com.arondor.viewer.client.api.search.SearchOptions">
      <property name="searchText" value="view" />
      <property name="accentSensitive" value="false" />
      <property name="caseSensitive" value="false" />
      <property name="regex" value="true" />
      <property name="searchAction">
        <value
          type="com.arondor.viewer.client.api.search.SearchAction">CURRENT_PAGE</value>
      </property>
    </bean>
  </property>
  <!-- Annotation details -->
  <property name="annotationTemplate">
    <bean
      class="com.arondor.viewer.client.api.annotation.templates.AnnotationTemplate">
      <property name="name" value="" />
      <property name="annotationType">
        <value
          type="com.arondor.viewer.annotation.common.AnnotationType">RedactText</value>
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

### Configuring the Annotation Rule Catalog

```xml
<bean id="annotationCreationRuleCatalog"
  class="com.arondor.viewer.client.api.annotation.AnnotationCreationRuleCatalog">
  <property name="annotationCreationRules">
    <list>
      <ref bean="annotationCreationRuleExample" />
      <ref bean="redactRuleExample" />
    </list>
  </property>
</bean>
```

### Use in a custom button

First, we create the custom button definition:

```xml
<bean id="customButtonToRedactSomething"
  class="com.arondor.viewer.client.toppanel.presenter.ButtonPresenter">
  <constructor-arg value="customButton"/>
  <constructor-arg value="Custom Button" />
  <constructor-arg value="standardButton"/>
  <property name="enabled" value="true" />
  <property name="buttonHandler">
    <bean class="com.arondor.viewer.client.jsapi.toppanel.JSCallButtonHandler">
      <property name="jsCode">
        <value>
          $wnd.getARenderJS().createAnnotationByRulesWithRuleId(["redactRuleExample"]);
        </value>
      </property>
    </bean>
  </property>
</bean>
```

Then we must add the bean identifier customButtonToRedactSomething to the list of annotation buttons like below :

```properties
topPanel.annotation.buttons.beanNames=addStickyNoteAnnotationButton,addFreeTextAnnotationButton,customButtonToRedactSomething
```

This example of configuration add 3 buttons to the annotation section of the toppanel.
