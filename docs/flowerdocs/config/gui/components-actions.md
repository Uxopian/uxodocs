---
title: Component-related actions
date: "2003-03-28T13:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 6947c9ab91b753df8395a276508b6ecbfcff8f2243d124a21f9d4cf31313e731
---

# Component-related actions

## Customized actions

Customized action(s) can be added to components.

### URL-based actions

An action consists of:

- a name, icon and title for the presentation.
- a list of component classes, phases and identities that will condition the display of the action
- a target URL that defines the page opened in a popup.

If the identity list is not filled in, the action will be visible to all.

Several variables are available to dynamically construct the URL to be opened:

- the identifier of the connected user: `user.name`
- the authorities of the connected user: `user.authorities`
- a user token: `user.token`
- the value of a tag: `tags.tagName` (replace `tagName` with the desired tag name)
- the identifier of the open component: `component.id`

```xml
<bean id="openARender" class="com.flower.docs.gui.client.action.CustomizedAction">
	<property name="name" value="VisualizeDocument" />
	<property name="title">
		<list>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="EN"/>
				<property name="value" value="Document visualization"/>
			</bean>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="FR"/>
				<property name="value" value="Visualisation du document"/>
			</bean>
		</list>
	</property>
	<property name="icon" value="fas fa-eye" />
	<property name="url" value="./ARender.html?scope=GEC&amp;`docId`=${component.id_value}" />
	<property name="allowedClasses">
		<list>
			<bean class="com.flower.docs.domain.common.Id">
				<property name="value" value="CourrierEntrant" />
			</bean>
		</list>
	</property>
	<property name="phase">
		<list>
			<value type="com.flower.docs.domain.componentclass.Phase">INSERT</value>
			<value type="com.flower.docs.domain.componentclass.Phase">MODIFY</value>
		</list>
	</property>
	<property name="principal">
		<list>
			<value>ADMIN</value>
			<value>userId</value>
		</list>
	</property>
</bean>
```

For this action to be available, it must be defined in the dedicated action catalogue:

```xml
<bean id="customizedActions" class="com.flower.docs.gui.client.action.CustomizedActionCatalog">
	<property name="actions">
		<list>
			<ref bean="openARender" />
		</list>
	</property>
</bean>
```

### JavaScript function-based actions

This type of action executes a JavaScript function.
To use this type of action, the following configuration is required:

- `name`: Action name
- `buttonStyle`: Action style corresponding to a FontAwesome icon
- `title`: Label displayed in action container
- `javaScriptFunction`: Name of the JavaScript function to be executed when the user clicks on the action

The JavaScript function must take the component category, the opening phase and an array of component identifiers as parameters:

```javascript
function exportToCRM(category, phase, componentIds){
	// Ajax request allowing to export a component to an external CRM

```

Please note:\_\_ If this function is defined in a custom JavaScript file, it must be registered in the `window` object:

```javascript
window.exportToCRM = exportToCRM;

function exportToCRM(category, phase, componentIds) {
	console.log("Exporting category=" + category + ", phase=" + phase + ", component ids=" + componentIds);

```

**Example:** Defining an action to execute a JavaScript function

```xml
<bean id="exportToCRM" class="com.flower.docs.gui.client.component.action.JavaScriptComponentAction">
	<constructor-arg value="ExportToCRM" />
	<property name="title">
		<list>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="EN"/>
				<property name="value" value="Export to CRM"/>
			</bean>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="FR"/>
				<property name="value" value="Exporter dans le CRM"/>
			</bean>
		</list>
	</property>
	<property name="buttonStyle" value="far fa-file" />
	<property name="javaScriptFunction" value="exportToCRM" />
</bean>
```

### Activity-based actions

This type of action opens different screens in a popup:

- Creation screen with verification
- Component modification screen

The popup can be customized as follows:

- `icon`: Popup icon
- `style`: Popup style
- `title`: Popup title
- `description`: Popup description
- `place`: The place corresponding to the desired screen

The button title is defined by passing it as a parameter to the action.

#### Creation with verification screen

The creation place with verification will be built using a search template identifier and the component category below:

```xml
<bean class="com.flower.docs.gui.client.activity.action.ActivityActionPresenter">
	<constructor-arg type="java.util.List">
		<list>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="EN"/>
				<property name="value" value="Create envelope"/>
			</bean>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="FR"/>
				<property name="value" value="Créer une enveloppe"/>
			</bean>
		</list>
	</constructor-arg>
	<constructor-arg>
		<bean class="com.flower.docs.gui.client.search.CreateWithVerificationPlace">
			<property name="id">
				<bean class="com.flower.docs.domain.common.Id">
					<property name="value" value="EnvelopeSearch" />
				</bean>
			</property>
			<property name="category">
				<value type="com.flower.docs.domain.component.Category">TASK</value>
			</property>
		</bean>
	</constructor-arg>

	<property name="style" value="envelope" />
	<property name="icon" value="envelope fas fa-envelope" />
	<property name="title">
		<list>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="EN"/>
				<property name="value" value="Envelope creation"/>
			</bean>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="FR"/>
				<property name="value" value="Création d'enveloppe"/>
			</bean>
		</list>
	</property>
	<property name="description">
		<list>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="EN"/>
				<property name="value" value="Before creating an envelope, please verify if it does not exist before"/>
			</bean>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="FR"/>
				<property name="value" value="Avant de créer une enveloppe, merci de vérifier que celle-ci n'existe pas déjà"/>
			</bean>
		</list>
	</property>
</bean>
```

#### Component modification screen

A component editing place allows you to view its metadata. All these places are built in the same way, with the component identifier and the `supportVisualization` property (except for folders).

_Virtual folder_

```xml
<bean class="com.flower.docs.gui.client.activity.action.ActivityActionPresenter">
	<constructor-arg type="java.util.List">
		<list>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="EN"/>
				<property name="value" value="Collective tab"/>
			</bean>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="FR"/>
				<property name="value" value="Bannette collective"/>
			</bean>
		</list>
	</constructor-arg>
	<constructor-arg>
		<bean class="com.flower.docs.gui.client.virtualfolder.modify.ModifyVirtualFolderPlace">
			<constructor-arg>
				<bean class="com.flower.docs.domain.common.Id">
					<property name="value" value="My_Virtual_Folder_Id" />
				</bean>
			</constructor-arg>
			<property name="supportVisualisation" value="false" />
		</bean>
	</constructor-arg>
	<property name="style" value="bannette" />
	<property name="icon" value="bannette fas fa-envelope" />
	<property name="title">
		<list>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="EN"/>
				<property name="value" value="Collective tab"/>
			</bean>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="FR"/>
				<property name="value" value="Bannette collective"/>
			</bean>
		</list>
	</property>
</bean>
```

_Task_

```xml
<bean class="com.flower.docs.gui.client.activity.action.ActivityActionPresenter">
	<constructor-arg type="java.util.List">
		<list>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="EN"/>
				<property name="value" value="Collective tab"/>
			</bean>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="FR"/>
				<property name="value" value="Bannette collective"/>
			</bean>
		</list>
	</constructor-arg>
	<constructor-arg>
		<bean class="com.flower.docs.gui.client.task.modify.ModifyTaskPlace">
			<constructor-arg>
				<bean class="com.flower.docs.domain.common.Id">
					<property name="value" value="My_Task_Id" />
				</bean>
			</constructor-arg>
			<property name="supportVisualisation" value="false" />
		</bean>
	</constructor-arg>
</bean>
```

_Document_

```xml
<bean class="com.flower.docs.gui.client.activity.action.ActivityActionPresenter">
		<constructor-arg type="java.util.List">
			<list>
				<bean class="com.flower.docs.domain.i18n.I18NLabel">
					<property name="language" value="EN"/>
					<property name="value" value="Bill"/>
				</bean>
				<bean class="com.flower.docs.domain.i18n.I18NLabel">
					<property name="language" value="FR"/>
					<property name="value" value="Facture"/>
				</bean>
			</list>
		</constructor-arg>
		<constructor-arg>
		<bean class="com.flower.docs.gui.client.document.modify.ModifyDocumentPlace">
			<constructor-arg>
				<bean class="com.flower.docs.domain.common.Id">
					<property name="value" value="My_Document_Id" />
				</bean>
			</constructor-arg>
			<property name="supportVisualisation" value="false" />
		</bean>
	</constructor-arg>
</bean>
```

_Folder_

```xml
<bean class="com.flower.docs.gui.client.activity.action.ActivityActionPresenter">
	<constructor-arg type="java.util.List">
		<list>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="EN"/>
				<property name="value" value="My bills"/>
			</bean>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="FR"/>
				<property name="value" value="Mes factures"/>
			</bean>
		</list>
	</constructor-arg>
	<constructor-arg>
		<bean class="com.flower.docs.gui.client.folder.modify.ModifyFolderPlace">
			<constructor-arg>
				<bean class="com.flower.docs.domain.common.Id">
					<property name="value" value="My_folder_Id" />
				</bean>
			</constructor-arg>
		</bean>
	</constructor-arg>
</bean>
```

## Context-dependent configuration

### Context definition

The component form has several customizable action containers:

- the one containing native actions (delete, attach, download, etc.): `headerActions`
- the one dedicated to task activation: `taskActions`

The default configuration of a container can be modified by defining a Spring Beans bean whose identifier is composed as follows:

- Graphic object name: `headerActions`, `taskActions`
- Component type: `Document`, `Task`, `Folder` or `VirtualFolder`
- Phase: `Insert`, `ReadOnly`, `Modify`

**Example:** In the case of modifying actions when modifying a *Document*component type, the name of the bean to be defined is `headerActionsDocumentModify``.

### Add a custom action

To add a custom action to an action container, you need to:

- know the container identifier according to the context (see above)
- locate the bean according to this identifier in the XML configuration or define it as:

```xml
<bean id="identifiant-du-conteneur" class="classe-definissant-le-type-de-conteneur"
 scope="prototype">
	<property name="actions">
		<list>
		</list>
	</property>
</bean>
```

To add a custom action, you then need to reference it using its identifier and the tag `<ref bean="identifiant-action"/>`.

--

**Example:** Adding an `exportToCRM` custom action when modifying a document

```xml
<bean id="headerActionsDocumentModify" class="com.flower.docs.gui.client.component.action.ComponentHeaderActions"
scope="prototype">
	<property name="actions">
		<list>
			<bean class="com.flower.docs.gui.client.component.action.DeleteComponentAction" />
			<ref bean="exportToCRM"/>
		</list>
	</property>
</bean>
```

### Task activation

A new type of graphical widget lets you add actions to create tasks from a component: `taskActions`.

Actions are only displayed:

- if the user has the `CREATE` permission on the component
- if the component class is authorized as a child of the task class to be created

Two items are available:

- default: all tasks that the user can create from the open component

- `com.flower.docs.gui.client.component.action.CustomComponentActionsPresenter` to manually define tasks that users can create.

In the example below, the `Move` and `Copy` task classes have been defined:

```xml
<!-- taskActions widget configuration int document modification context -->
<bean id="taskActionsDocumentModify" class="com.flower.docs.gui.client.component.action.CustomComponentActionsPresenter"
  scope="prototype">
	<property name="actions">
		<list>
			<bean class="com.flower.docs.gui.client.task.list.CreateTaskAction">
				<constructor-arg value="Move" />
			</bean>
			<bean class="com.flower.docs.gui.client.task.list.CreateTaskAction">
				<constructor-arg value="Copie" />
			</bean>
		</list>
	</property>
</bean>
```

### Activation

Actions can have an activation strategy that defines the criteria by which an action is activated or deactivated.
Some actions have one by default, such as those for creating tasks, while others do not.

Various strategies are provided natively.

<br/>

#### Permission-related

- Permission-based: `ComponentPermissionEnablingStrategy` to **only**activate an action \*\*\*\* if the logged-in user has permission on the component

**Example:** Defining a strategy that activates an action only if the user has `UPDATE_CONTENT` permission on the open component

```xml
<bean class="com.flower.docs.gui.client.component.action.ComponentPermissionEnablingStrategy">
	<constructor-arg>
		<value type="com.flower.docs.domain.acl.Permission">UPDATE_CONTENT</value>
	</constructor-arg>
</bean>
```

<br/>	
#### Tag-based

The `TagBasedEnablingStrategy` strategy can be used to restrict the activation of an action based on a component's tags.

**Example 1:** Defining a strategy that activates an action only if the value of the `Assignee` tag is equal to the logged-in user's identifier

```xml
<bean class="com.flower.docs.gui.client.component.action.TagBasedEnablingStrategy">
	<property name="requiredTags">
		<list>
			<bean class="com.flower.docs.domain.component.Tag">
				<property name="name" value="Assignee" />
				<property name="value">
					<list>
						<value>${user.id}</value>
					</list>
				</property>
			</bean>
		</list>
	</property>
</bean>
```

**Example 2:** Defining a strategy that activates an action only if the open component has a value other than those defined for the `Assignee` tag

```xml
<bean class="com.flower.docs.gui.client.component.action.TagBasedEnablingStrategy">
	<property name="valueOperator">
		<value type="com.flower.docs.domain.search.Operators">DIFFERENT</value>
	</property>
	<property name="requiredTags">
		<list>
			<bean class="com.flower.docs.domain.component.Tag">
				<property name="name" value="Assignee" />
				<property name="value">
					<list>
						<value>Comptables</value>
						<value>RH</value>
					</list>
				</property>
			</bean>
		</list>
	</property>
</bean>
```

<br/>

The `EmptyTagEnablingStrategy` strategy can be used to **only**activate an action \*\*\*\* if the component has an empty tag.

**Example:** Defining a strategy that activates an action only if the open component has the `Assignee` tag without any value

```xml
<bean class="com.flower.docs.gui.client.component.action.EmptyTagEnablingStrategy">
	<property name="tag" value="Assignee"/>
</bean>
```

#### Based on several `EnablingStrategy`

The `EnablingStrategyWrapper` strategy to compose a complex strategy based on several criteria.

**Example:** Defining a strategy that activates an action only if the open component has the `Assignee` tag with no value and the `UPDATE_CONTENT` permission

```xml
<bean class="com.flower.docs.gui.calyx.action.EnablingStrategyWrapper">
	<property name="strategies">
		<list>
			<bean class="com.flower.docs.gui.client.component.action.EmptyTagEnablingStrategy">
				<property name="tag" value="Assignee"/>
			</bean>
			<bean class="com.flower.docs.gui.client.component.action.ComponentPermissionEnablingStrategy">
				<constructor-arg>
					<value type="com.flower.docs.domain.acl.Permission">UPDATE_CONTENT</value>
				</constructor-arg>
			</bean>
		</list>
	</property>
</bean>
```

<br/>

An activation strategy is positioned on an action using the `enablingStrategy` property.
If an action has no activation strategy, its container's activation strategy is used. The latter can also be overloaded using the same property.

**Example:**

```xml
<bean id="exportToCRM" class="com.flower.docs.gui.client.component.action.JavaScriptComponentAction">
	<constructor-arg value="ExportToCRM" />
	<property name="title">
		<list>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="EN"/>
				<property name="value" value="Export to CRM"/>
			</bean>
			<bean class="com.flower.docs.domain.i18n.I18NLabel">
				<property name="language" value="FR"/>
				<property name="value" value="Exporter dans le CRM"/>
			</bean>
		</list>
	</property>
	<property name="buttonStyle" value="far fa-file" />
	<property name="javaScriptFunction" value="exportToCRM" />

	<property name="enablingStrategy" ref="updateContenPermissionEnabling" />
</bean>

<bean id="updateContenPermissionEnabling"
class="com.flower.docs.gui.client.component.action.ComponentPermissionEnablingStrategy">
	<constructor-arg>
		<value type="com.flower.docs.domain.acl.Permission">UPDATE_CONTENT</value>
	</constructor-arg>
</bean>
```

#### According to tags dates

The `DateTagEnablingStrategy` strategy is used to activate an action only if the component has a Date tag whose value matches the defined rule.
To activate this action, use the following configuration:

- `condition`: Date tag on which the activation strategy is based. It is possible to set the **$`dayDate`** value corresponding to today's date
- `shouldBeLess`: Specifies whether the date must be less than the date entered (false by default)
- `daysInterval`: The number of tolerance days. If not set, the value of the component tag will be evaluated against the value of the condition and the value of the `shouldBeLess` property

**Example:** Defining a strategy that activates an action only if the open component has the `ReceivedDate` tag
greater than the current date.

```xml
<bean id="dateEnablingStrategy" class="com.flower.docs.gui.client.component.action.DateTagEnablingStrategy">
	<property name="condition">
		<bean class="com.flower.docs.domain.component.Tag">
			<property name="name" value="ReceivedDate" />
			<property name="value" >
				<list>
					<value>$`dayDate`</value>
				</list>
			</property>
		</bean>
	</property>
	<property name="shouldBeLess" value="false"/>
</bean>
```

### Redirection

Depending on the action or action container, a redirection can be configured. This defines which screen the user will be redirected to after executing an action.

To apply a particular configuration, it is necessary to set the `redirectionStrategy` property as follows:

- For no redirection: `NoRedirectionStrategy`
- Reload the current screen: `ReloadRedirectionStrategy`
- Go to previous screen: `GoBackRedirectionStrategy`
- Go to a specific screen: `PlaceRedirectionStrategy`

**Example:** Redirecting the user to the previous screen when creating a task from the document indexing screen

```xml
<bean id="taskActionsDocumentModify" class="com.flower.docs.gui.client.task.list.ComponentTaskActionsPresenter"
scope="prototype">
	<property name="redirectionStrategy" ref="goBackRedirection" />
</bean>
<bean id="goBackRedirection" class="com.flower.docs.gui.client.action.redirect.GoBackRedirectionStrategy" />
```
