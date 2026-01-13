---
title: Indexing form
description: Configure indexing forms
date: "2002-02-28T13:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 2954fba383606eb14acb069b6982661171d34f29e600ab2f54a3cbec8eecb148
---

Indexing views are composed of two parts:

- component details (metadata, etc.)
- component content (ARender viewer, results table, etc.)

<br/>

To add a configuration, first define the `componentActivityConfigurations` bean and save the configuration, contained in the `ComponentActivityConfiguration` object, according to the [context](/docs/flowerdocs/config/gui/indexation/context):

**Example:**

```xml
<bean id="componentActivityConfigurations" class="com.flower.docs.gui.client.component.activity.ComponentActivityConfigurations">
	<property name="activityConfigurations">
		<map>
			<entry>
				<key>
					<ref bean="documentModifyContext" />
				</key>
				<bean class="com.flower.docs.gui.client.component.activity.ComponentActivityConfiguration">
					<!-- Custom configuration for document modifications -->
				</bean>
			</entry>
		</map>
	</property>
</bean>
```

# General configuration

- `leftPanelWidthRatio`: defines the ratio occupied by the left panel (value between `0.1f` and `1.0f`)
- `goBackAfterSave`: determines whether or not the user should be redirected after saving a component (including when applying a response to a task)

## Task creation

- `saveBeforeTaskCreation`: determines whether the component should be saved before a task is created from it
- `saveAfterTaskCreation`: determines whether the component should be saved after a task has been created from it
- `allowTaskCreationIfInvalid`: determines whether it is possible to create a task from an invalid component (if this is the case and save before/after is enabled, then the status is set to `INVALID`)

## Confirmations

- `showSaveConfirmationBeforeGo`: defines the display of a save confirmation popup when a modified component is removed from the index.
  <br/> If the value is `false`: - the confirmation popup displayed is a confirmation popup to cancel modifications - `showCancelConfirmation` is `false`, no confirmation popup is displayed

### Save

- `showSaveConfirmationBeforeGo`: defines the display of a save confirmation popup when a modified component is removed from the index.
- `excludedClassesFromSaveConfirmRule`: excludes component classes from the rule defined by `showSaveConfirmation`
    - If the `showSaveConfirmation` value is `true`, then modifying a component of a class present in this list will not result in the display of a confirmation popup.

### Cancel

- `showCancelConfirmation`: defines whether or not to display a confirmation popup if modifications are cancelled when indexing a component
- `excludedClassesFromCancelConfirmRule`: excludes component classes from the rule defined by `showCancelConfirmation`
    - If the `showCancelConfirmation` value is `true`, then cancelling modifications to a component of a class present in this list will not result in the display of a confirmation popup.

# Specific configuration

## Document

- `minFilesUpload`: the minimum number of files to upload for a document
- `maxFilesUpload`: maximum number of files to upload for a document

## Virtual folder

- `useAlternativeView`: allows results to be displayed as a list rather than in the viewer

### Customize the virtual folder search

The search associated with a class of virtual folders can be overridden to hide columns or add criteria.

The identifier associated with the search bean of a `DossierVirtuel` virtual folder class is `contentDossiervirtualVirtualFolder`.

## Task

- `allowInvalidSaving`: defines whether the component can be saved despite the invalidity of its data

**Example:**

```xml
<bean id="componentActivityConfigurations" class="com.flower.docs.gui.client.component.activity.ComponentActivityConfigurations">
	<property name="activityConfigurations">
		<map>
			<entry>
				<key>
					<ref bean="documentModifyContext" />
				</key>
				<bean class="com.flower.docs.gui.client.component.activity.ComponentActivityConfiguration">
					<property name="leftPanelWidthRatio" value="0.65f" />
					<property name="showSaveConfirmation" value="true"/>
					<property name="excludedClassesFromSaveConfirmRule">
						<list>
							<bean class="com.flower.docs.domain.common.Id">
								<property name="value" value="MyClassId"/>
							</bean>
						</list>
					</property>
				</bean>
			</entry>
		</map>
	</property>
</bean>
```
