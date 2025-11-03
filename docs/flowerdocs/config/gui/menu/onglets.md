---
title: "Tabs"
date: "2001-03-01T13:20:01+02:00"
---


# The different types of tabs

## URL-based tabs  

To enhance integration with other information system applications, FlowerDocs lets you add URL-based tabs to the graphical user interface.

To add a new tab of this type, simply add the following property to the relevant user profile: ``tab.url=&lt;label&gt;(<URL>,&lt;icon&gt;)``

:::info
Configure an icon and tab name by setting a property such as: `Viewer(https://arender.io,fa fa-map)`
:::



## Folder-based tabs  

FlowerDocs lets you define new tabs based on folders (physical or virtual).

The principle consists in displaying a screen divided in two: 

*  sidebar: presents the various hierarchical aggregations (e.g. documents by validation status) 
*  content: presents referenced components in sortable tabular form (e.g. documents of a given status)


To add a new tab, simply add the following property to the relevant user profile: 

* ``tab.folder=<folder identifier>``
* ``tab.virtualfolder=<virtual folder identifier>``

The name of the tab displayed in the HMI corresponds to the name of the folder.

*The security of these tabs is ensured by the ACL carried by the folder.*


:::info
Configure an icon and the name of the internationalized tab by setting a property such as: `MyTab(icon=fa fa-thermometer-2,fr=Dossier,en=Folder)`
:::


## Search-based tabs  

Search-based tabs allow you to dynamically define tabs corresponding to a physical or virtual folder.
After configuring a search for a user team, users see the folders found displayed as a tab.

The search mentioned above must be defined in a `GUIConfiguration` class document and then associated with a team by adding the `tab.component.resolve= <search id>` property. 

:::note[Search example]
```xml
<bean id="agentFolderSearch" class="com.flower.docs.domain.search.Search">
  <property name="category">
    <value type="com.flower.docs.domain.component.Category">FOLDER</value>
  </property>
  <property name="request">
    <bean class="com.flower.docs.domain.search.SearchRequest">
      <property name="selectClause">
        <bean class="com.flower.docs.domain.search.SelectClause">
          <property name="fields">
            <list>
              <value>name</value>
            </list>
          </property>
        </bean>
      </property>
      <property name="filterClauses">
        <list>
          <bean class="com.flower.docs.domain.search.AndClause">
            <property name="criteria">
              <list>
                <bean class="com.flower.docs.domain.search.Criterion">
                  <property name="name" value="classid" />
                  <property name="type">
                    <value type="com.flower.docs.domain.search.Types">STRING</value>
                  </property>
                  <property name="operator">
                    <value type="com.flower.docs.domain.search.Operators">EQUALS_TO</value>
                  </property>
                  <property name="values">
                    <list>
                      <value>Folder</value>
                    </list>
                  </property>
                </bean>
              </list>
            </property>
          </bean>
        </list>
      </property>
      <property name="max" value="1" />
    </bean>
  </property>
</bean>
```
:::



# Tab order 

The order of all tabs can be redefined for each team. To define the order of a team's tabs, add the ``tabs.order`` property.
 
The value of this property must be defined as follows: ``${TabType1}(${TabName1});${TabType2}(${TabName2});`` where ``${TabType#}`` = tab type and ``${TabName#}`` = tab name

The tab type can take on the following values: 

| Value              | Description                                     |
|----------------------|-------------------------------------------------|
|NATIVE                | FlowerDocs native tab                             |
|FOLDER                | Folder-based tab                      |
|VIRTUALFOLDER         | Virtual folder-based tab              |
|URL                   | URL-based tab                         |
|RESOLVED_COMPONENT    | Search-based tab(s)             |


The value of a tab name depends on its type: 

| Type                 | Name                                                                |
|----------------------|--------------------------------------------------------------------|
|FOLDER                | Folder identifier                                             |
|VIRTUALFOLDER         | Virtual folder identifier                                     |
|URL                   | URL of the tab defined in the tab.url property                   |
|RESOLVED_COMPONENT    | Search identifier defined in the tab.component.resolve property|


For native tabs, the name can take on the following values: 

| Value              | Description                                     |
|----------------------|-------------------------------------------------|
|ADMIN                 | Administration tab                         |
|HOME                  | Home tab                                |
|INSERT                | Insert tab                              |
|SEARCH                | Search tab                             |

*Please note: All tabs to be displayed must be defined in advance.*

<br/>
**Example:** The following example displays the tabs in the following order Administration, URL tab "https://flowerdocs.com/documentation", Virtual folder tab "root", Folder tab "Arondor-2020".

The last three tabs must first be defined in the properties `tab.url`, `tab.virtualfolder` and `tab.folder`:

``NATIVE(ADMIN);URL(https://flowerdocs.com/documentation);VIRTUALFOLDER(root);FOLDER(Arondor-2020);``
