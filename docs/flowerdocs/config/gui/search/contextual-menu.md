---
title: Contextual menus
date: '2012-03-28T13:20:01+02:00'
last_update:
  date: '2025-12-02T14:29:22.460Z'
  author: CI/CD Bot
content_hash: 435f6d28000e0266ea93e13647131059444eb2f2ec80e6eb557b4a17e9b5f88a
---


When you right-click on one or more search results, a contextual menu appears. It features both: 

* Native actions (open, view, etc.)
* Tasks that can be created from selected results

These actions are also added to the header of the search results table. 

To disable a native action, you can add the ``menu.contextual.${category}.hidden.actions`` property where ``${category}`` is the component category concerned. If you want to disable the `Download` action in the default document contextual menu, add the  ``menu.contextual.document.hidden.actions=DOWNLOAD_CONTENT`` property.


# Determining the Spring bean identifier
 
To further customize the contextual menu, you can define the actions it contains. 

To do this, you first need to define which contextual menu to configure: 

* for which component category? 
* for what context? A search? A folder? A virtual folder? 

Here are some examples of keys to use depending on the context: 

* ``contextualMenuDocument``: to manually set the default contextual menu
* ``contextualMenuDefaultsearchDocument``: to define the contextual menu of a specific ``DefaultSearch`` search form
* ``contextualMenuDossierAgentDocument``: to define the context menu for documents contained in an ``agentfolder`` virtual folder


# Determining the Spring bean identifier

Depending on the component category, use the Java class indicated: 

* document: ``com.flower.docs.gui.client.search.document.DocumentContextualMenuPresenter``
* task: ``com.flower.docs.gui.client.search.task.TaskContextualMenuPresenter``
* folder: ``com.flower.docs.gui.client.search.folder.FolderContextualMenuPresenter``
* virtual folder: ``com.flower.docs.gui.client.search.virtualfolder.VirtualFolderContextualMenuPresenter``


__Example:__ Defining the context menu for the ``DefaultSearch`` document search form 

```xml      
<bean id="contextualMenuDefaultsearchDocument" 
class="com.flower.docs.gui.client.search.document.DocumentContextualMenuPresenter" scope="prototype">
</bean>
```

# Defining customized actions

To define actions, it is necessary to: 

* define them in the Spring context. To do this, refer to [this part of the documentation](/docs/flowerdocs/config/gui/indexation/context).
* references in the appropriate context menu. 

Example :__ Adding an ``exportToCRM`` JavaScript action to the context menu of the ``DefaultSearch`` document search form 

```xml   
<bean id="contextualMenuDefaultsearchDocument" 
class="com.flower.docs.gui.client.search.document.DocumentContextualMenuPresenter" scope="prototype">
	<property name="actions">
		<list>
			<ref bean="exportToCRM" />
		</list>
	</property>
</bean>
```

