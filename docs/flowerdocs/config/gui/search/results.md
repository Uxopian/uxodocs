---
title: Search results
sidebar_position: 4
description: Customize the presentation of search results.
date: "2005-04-28T13:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: ea82863b37a26a5e9a88412a688bc794cf5670957ff277b120540bae440ce67c
---

# Hiding columns

Hide columns in the results table with the ``hiddenColumns`` property:

**Example**

```xml
<property name="hiddenColumns">
	<list>
		<value>TypeCourrier</value>
	</list>
</property>
```



# Display modes

FlowerDocs supports two display modes for search results:

- **Tabular** -- classic table format
- **Thumbnail** -- ARender generates a thumbnail of the component

## Tabular and thumbnails (switcher)

The default display lets the user switch between tabular and thumbnail modes. Tabular is shown first by default.

To default to thumbnails, set `tableByDefault` to `false`:

```xml
<property name="responsePresenterProvider">
	<bean class="com.flower.docs.gui.client.search.response.SwitcherSearchResponsePresenterProvider">
		<property name="tableByDefault" value="false" />
	</bean>
</property>
```

To configure thumbnail card content, add the `cardPresenter` property:

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
					<property name="value" value="AjoutÃ© le ${creationDate}, par ${owner}" />
				</bean>
			</list>
		</property>
	</bean>
</property>
```

The `CardSearchResponsePresenterProvider` supports three template properties. Each uses `${fieldName}` placeholders that are replaced with actual values from the search results:

| Property | Description |
|----------|-------------|
| `titleTemplate` | Main title of the card |
| `headingTemplate` | Subtitle displayed below the title |
| `contentTemplate` | Body content of the card |

## Tabular only

Force tabular-only display:

```xml
<property name="responsePresenterProvider">
	<bean class="com.flower.docs.gui.client.search.response.TableSearchResponsePresenterProvider" />
</property>
```

## Thumbnail only

Use `CardSearchResponsePresenterProvider` directly as the `responsePresenterProvider`. It supports the same `titleTemplate`, `headingTemplate`, and `contentTemplate` properties as described above.

```xml
<property name="responsePresenterProvider">
	<bean class="com.flower.docs.gui.client.search.response.CardSearchResponsePresenterProvider">
		<!-- Configure titleTemplate, headingTemplate, contentTemplate as needed -->
	</bean>
</property>
```

# Export

Search results can be exported as a CSV file. The export is limited to the first 200 results for performance.
