---
title: Folder contents
sidebar_position: 9
date: "2004-03-28T13:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: 6e9e8894adbcae0daeda857d7cd00c12a96cdfbd171d3adb17983dfe08e1f1a7
---

## Folder contents

The `folderSearchCatalog` bean is used to modify the display of data for documents, folders and virtual folders contained in a folder. It is made up of 3 properties:

- `documents`, which lets you configure the display of children documents
- `folders`, which lets you configure the display of children folders
- `virtualFolders`, which configures the display of children virtual folders

These 3 properties work in the same way:

- a `request` request
- a `hiddenColumns` list of hidden columns

By default, document identifiers are retrieved and then hidden in order to retrieve only the data requested during the search

By default in the `flower-docs-gui-client.xml` file, the `folderSearchRequest` catalog is used to display document names, classes, creation date and last modification date.

**Example:**

```xml
<bean id="folderSearchCatalog" class="com.flower.docs.gui.client.search.folder.FolderChildrenTableCatalog" scope="prototype">
	<property name="documents">
		<bean class="com.flower.docs.gui.client.search.document.DocumentTablePresenter">
			<property name="request" ref="folderSearchRequest" />
			<property name="hiddenColumns">
				<list>
					<value>id_value</value>
					<value>status</value>
				</list>
			</property>
		</bean>
	</property>
	<property name="folders">
		<bean class="com.flower.docs.gui.client.search.folder.FolderTablePresenter">
			<property name="request" ref="folderSearchRequest" />
			<property name="hiddenColumns">
				<list>
					<value>id_value</value>
					<value>status</value>
				</list>
			</property>
		</bean>
	</property>
	<property name="virtualFolders">
		<bean class="com.flower.docs.gui.client.search.virtualfolder.VirtualFolderTablePresenter">
			<property name="request" ref="folderSearchRequest" />
			<property name="hiddenColumns">
				<list>
					<value>id_value</value>
					<value>status</value>
				</list>
			</property>
		</bean>
	</property>
</bean>

<bean name="folderSearchRequest" class="com.flower.docs.domain.search.SearchRequest">
	<property name="selectClause">
		<bean class="com.flower.docs.domain.search.SelectClause">
			<property name="fields">
				<list>
					<value>name</value>
					<value>classid</value>
					<value>creationDate</value>
					<value>lastUpdateDate</value>
				</list>
			</property>
		</bean>
	</property>
</bean>
```
