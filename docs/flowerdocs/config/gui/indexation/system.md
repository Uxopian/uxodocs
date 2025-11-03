---
title: "System metadata"
description: "Configure indexing forms"
date: "2002-03-28T13:20:01+02:00"
---


# System metadata


:::info
System metadata is the metadata natively present on all components (name, class, creation date, etc.).
Their configuration on the indexing screens can be modified by overriding the basic configuration.
:::


To create a configuration of this metadata, we need to create a new ``ComponentPropertiesConfiguration`` bean (containing a list of field definitions) linked to a context.

<br/>
These associations must be added to the following object: 


```xml 
<bean id="componentProperties" class="com.flower.docs.gui.client.componentclass.ComponentPropertiesConfigurations">
	<property name="propertiesConfiguration" />
</bean>
```

 
## Field definition


To define a configuration, you need to create a new ``ComponentPropertiesConfiguration`` bean and assign it field definitions (``FieldDefinition``) to define a particular metadata.

 
The following field definitions are provided by default: 

|Identifier      |Description                             |
|-----------------|----------------------------------------|
|Name             |Component name                        |
|Class            |Component class                     |
|Class-ReadOnly   |Component class                     |
|creationDateData |Date the component was created |
|lastUpdateDate   |Date of last update            |


They can also be set manually: 


```xml
<bean id="NameDefinition" class="com.flower.docs.gui.api.model.fields.FieldDefinition">
	<property name="name" value="name" />
	<property name="type">
		<value type="com.flower.docs.gui.api.model.fields.FieldType">String</value>
	</property>
	<property name="mandatory" value="false" />
	<property name="label" ref="NameLabel" />
</bean> 

<bean id="NameLabel" class="com.flower.docs.gui.api.model.i18n.I18NLabel">
	<property name="languageMap">
		<map>
			<entry>
				<key>
					<ref bean="EN" />
				</key>
				<value>Name</value>
			</entry>
			<entry>
				<key>
					<ref bean="FR" />
				</key>
				<value>Nom</value>
			</entry>
		</map>
	</property>
</bean>
```

## Configuration 

In order to associate field definitions with a context, they must be grouped together in a ``ComponentPropertiesConfiguration`` object:

```xml
<bean id="insertDocumentConfiguration" 
class="com.flower.docs.gui.client.componentclass.ComponentPropertiesConfiguration">
    <property name="propertiesConfiguration">
        <list>
            <ref bean="NameDefinition" />
            <ref bean="Class" />
        </list>
    </property>
</bean>
```
All the associations (context / configuration) must then be defined in the following object: 

```xml 
<bean id="componentProperties" 
class="com.flower.docs.gui.client.componentclass.ComponentPropertiesConfigurations">
	<property name="propertiesConfiguration">
		<map>
		  <entry>
			<key>
			  <ref bean="documentInsertContext" />	
			</key>
			<ref bean="insertDocumentConfiguration" />
		   </entry>
		</map>
	</property>
</bean>
```

:::info
**Note** : only one `componentProperties` bean can be defined per scope. Otherwise, the last load will override the others.
:::

