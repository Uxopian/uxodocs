---
title: Search results
description: Customize the presentation of search results.
date: "2005-04-28T13:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: fc309d4760af660cf4cbcdde7848d55894cffd40eb44ee15978fe965cbd53c14
---

# Hiding columns

You can hide columns in the results table. To do this, add the `hiddenColumns` property.

:::note[Example]

```xml
<property name="hiddenColumns">
	<list>
		<value>TypeCourrier</value>
	</list>
</property>
```

:::

# Display

FlowerDocs lets you display search results in three different ways:

- tabular: results are presented in the classic tabular format
- thumbnail: ARender is used to generate a thumbnail of the component
- aggregation: search results are displayed as a tree structure

## Tabular and thumbnails

The default display allows the user to choose how the results are presented.
By default, the user is presented with a tabular display.

<br/>
To display search results as thumbnails by default, add the `tableByDefault` property with the `false` value:

```xml
<property name="responsePresenterProvider">
	<bean class="com.flower.docs.gui.client.search.response.SwitcherSearchResponsePresenterProvider">
		<property name="tableByDefault" value="false" />
	</bean>
</property>
```

<br/>
To go a step further and configure thumbnail content, add the following property to the ``SwitcherSearchResponsePresenterProvider`` object:

```xml
<property name="cardPresenter">
	<bean class="com.flower.docs.gui.client.search.response.CardSearchResponsePresenterProvider">
		<property name="titleTemplate">
			<list>
				<bean class="com.flower.docs.domain.i18n.I18NLabel">
					<property name="language" value="EN" />
					<property name="value" value="${name}" />
				</bean>
				<bean class="com.flower.docs.domain.i18n.I18NLabel">
					<property name="language" value="FR" />
					<property name="value" value="${name}" />
				</bean>
			</list>
		</property>
		<property name="headingTemplate">
			<list>
				<bean class="com.flower.docs.domain.i18n.I18NLabel">
					<property name="language" value="EN" />
					<property name="value" value="Added ${creationDate}, by ${owner}" />
				</bean>
				<bean class="com.flower.docs.domain.i18n.I18NLabel">
					<property name="language" value="FR" />
					<property name="value" value="Ajouté le ${creationDate}, par ${owner}" />
				</bean>
			</list>
		</property>
	</bean>
</property>
```

## Tabular

If you want the user to be able to see/use only the tabular presentation mode:

```xml
<property name="responsePresenterProvider">
	<bean class="com.flower.docs.gui.client.search.response.TableSearchResponsePresenterProvider" />
</property>
```

## Thumbnail:

If you want the user to be able to see/use only the thumbnail presentation mode:

```xml
<property name="responsePresenterProvider">
	<bean class="com.flower.docs.gui.client.search.response.CardSearchResponsePresenterProvider">
		<property name="titleTemplate">
			<list>
				<bean class="com.flower.docs.domain.i18n.I18NLabel">
					<property name="language" value="EN" />
					<property name="value" value="${name}" />
				</bean>
				<bean class="com.flower.docs.domain.i18n.I18NLabel">
					<property name="language" value="FR" />
					<property name="value" value="${name}" />
				</bean>
			</list>
		</property>
		<property name="headingTemplate">
			<list>
				<bean class="com.flower.docs.domain.i18n.I18NLabel">
					<property name="language" value="EN" />
					<property name="value" value="Added ${creationDate}, by ${owner}" />
				</bean>
				<bean class="com.flower.docs.domain.i18n.I18NLabel">
					<property name="language" value="FR" />
					<property name="value" value="Ajouté le ${creationDate}, par ${owner}" />
				</bean>
			</list>
		</property>
	</bean>
</property>
```

# Export

Search results can be exported as a CSV file.

To ensure optimum performance, the export of results is limited to the first 200 results.
