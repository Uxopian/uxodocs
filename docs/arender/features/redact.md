---
title: Redact
last_update:
  date: '2026-03-12T20:43:52.809Z'
  author: CI/CD Bot
content_hash: 12acc28991cbbd3192e6b5a70b5a6d33cb0f571165863272a2939f205b88c150
---

## Activate true redaction

By default and for performance optimization, ARender allows any user to select the text behind the redaction.

If you need to deactivate this behaviour you need to use true redact, i.e. configure ARender to only fetch the text for authorized users. It is necessary to:

- Activate the fetch of redaction before the image generation:

```properties title="~/configurations/arender-custom-server.properties"
arender.server.process.annotations.rendition=true
```

- Implement the **AuthenticationServiceProvider** interface. Example available on [GitHub](https://github.com/arondor-connectors/sample-connectors/blob/master/arender-sample-hmi/arender-sample-hmi-connector/src/main/java/com/arondor/arender/sample/connector/authentication/service/CustomAuthenticationServiceProvider.java)

## Default behaviour

ARender offers the possibility to hide the content of any type of document via the redact feature.

To activate the redact panel, add the following property. By default, it is disabled.

```properties title="configurations/arender-custom-client.properties"
redactexplorer.enabled=true
```

This panel will give you access to the different redact buttons. By default, four redaction classic creation buttons are available.

```properties title="configurations/arender-custom-client.properties"
redactexplorer.redact=true
redactexplorer.redactZone=true
redactexplorer.redactPageContent=true
redactexplorer.redactFullPage=true
```

The first one allows you to add a redact over text.
The second one allows you to add a redact over a plotted area.
The third allows you to redact all the textual content of the current page.
The fourth allows you to redact the whole page.

Two buttons of redactions advanced creation are available.

```properties
redactexplorer.manualInput=true
redactexplorer.rules=true
redactexplorer.redact.with.reasons=true
```

The first one allows you to open manual input panel.
The second one allows you to open rules panel.

More details on advanced redact can be found below.

It is possible to select reasons to apply on redactions.

By default the "With reason" radio button is selected.

```properties title="configurations/arender-custom-client.properties"
# If true, the radio button "With reason" is selected
redactexplorer.redact.with.reasons=true
```

The reasons are defined in the configuration files, it is possible to modify them as well as the default reasons as explained in [the dedicated documentation](/docs/arender/learn/how-to/redact-reasons)

:::warning
By default, only **admin user** can save redacts

To test please:

- Log in to ARender as admin:
    - Either Clear the ARender Cookies ,
    - **Or** Open a browser in private navigation.
- Open ARender with the following query strings in the URL: ?user=admin&amp;redactexplorer.enabled=true
:::

## Advanced redact

Advanced redact panel offers two buttons, manual input and rules.

```properties
redactexplorer.manualInput=true
redactexplorer.rules=true
redactexplorer.redact.with.reasons=true
```

### Manual input

The manual input allows you to redact a informed text or a informed pattern in the input text.

You can personalize the redact application through the dedicated button:

- Page selection: allows you to choose all pages, a range of pages, several pages or the current page
  By default, the "All pages" option is selected.

Once the search is done, you can see a preview of the results on your document.
If you want to refine your selection, you can open the results panel:

- A vertical panel is opened showing all the results
- Unselect the results you don't want to redact
- Apply all the selected redaction by clicking on the "Apply" button.

### Rules

The rules option allows you to select one or more rules and apply them.
These rules are defined in the configuration files as explained in the [dedicated documentation](/docs/arender/learn/how-to/annotation-creation-rule)

Once the rules are selected, trigger the search. It will show a preview of the results in the document.
If you want to refine your selection, you can open the results panel:

- A vertical panel is opened showing all the results
- Unselect the results you don't want to redact
- Apply all the selected redaction by clicking on the "Apply" button.

## Advanced options

### Add custom buttons

It is also possible to add your own buttons. In the file _arender-custom-integration.xml_ add the information of the button.

```xml title="configurations/arender-custom-integration.xml"
<bean id="addRedact" class="com.arondor.viewer.client.toppanel.presenter.ActivableButtonPresenter">
  <constructor-arg value="addRedact" />
  <constructor-arg>
    <ref bean="labels#addRedact" />
  </constructor-arg>
  <constructor-arg value="standardButton icon-square toppanelButton"/>
  <property name="enabled" value="${redactexplorer.redactZone}" />
  <property name="buttonGroup" value="topPanel" />
  <property name="inactiveButtonHandler">
    <ref bean="quitAnnotationCreationAction" />
  </property>
  <property name="buttonHandler">
    <ref bean="redactZoneCreationAction" />
  </property>
</bean>
```

Then add the bean id of your button to the list named “redactButtons”. If it doesn’t exist, create it.

```xml title="configurations/arender-custom-integration.xml"
<bean id="redactExplorerView" class="com.arondor.viewer.client.documentnavigator.redact.RedactExplorerView" scope="prototype">
  <property name="redactButtons">
    <list>
      <ref bean="addRedact" />
    </list>
  </property>
</bean>
```

## Conversion from V3/V4 redactions to V2023 redactions

The redaction model has evolved in ARender version 2023. To facilitate the conversion process, a new annotation accessor called RedactConverterAnnotationAccessor has been introduced, which allows for easy on-the-fly conversion.

### Usage via a Bean

The new annotation accessor takes the bean name of another annotation accessor as a parameter. You can modify this bean name as follows:

```properties title="configurations/arender-custom-server.properties"
arender.server.wrapper.source.annotation.accessor=myCustomAnnotationAccessorBeanName
```

myCustomAnnotationAccessorBeanName is the annotation accessor that will be added to the annotation accessor performing the conversion.

:::warning
The annotation accessor must have a constructor with the following signature:

```java
public CustomAnnotationAccessor(DocumentService documentService, DocumentAccessor documentAccessor)
```
:::

### Usage via Java Code

If you instantiate your _CustomAnnotationAccessor_ using Java code, you will need to modify the instantiation as follows:

```java title="Code Example"
RedactConverterAnnotationAccessor myConverterAccessor = new RedactConverterAnnotationAccessor(new CustomAnnotationAccessor());
```

If you want to stop the on-the-fly conversion, you should use the following method:

```java title="Code Example"
redactConverterAnnotationAccessor().setConvert(false);
```

And the property:

```properties title="Code Example"
arender.server.wrapper.source.convert=false
```
