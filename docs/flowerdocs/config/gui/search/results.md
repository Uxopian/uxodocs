---
title: Search results
sidebar_position: 4
description: Customize the presentation of search results.
date: "2005-04-28T13:20:01+02:00"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: ee7a1c3e9b1230707a64449492e33a44fe99974f52c57dacbe87bc307002167c
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

Three configurations are possible depending on whether you want to offer a choice to the user or force a specific mode.

## Tabular and thumbnails (switcher)

Use `SwitcherSearchResponsePresenterProvider` to let the user switch between tabular and thumbnail modes.

:::warning
**Both tabs are always present**, this provider does not support disabling one of them.
If you need only one mode, see [Tabular only](#tabular-only) or [Thumbnail only](#thumbnail-only).
:::
By default, tabular is shown first. To show thumbnails first, set `tableByDefault` to `false`.

To configure the card content, add the `cardPresenter` property **inside** the `SwitcherSearchResponsePresenterProvider` bean. The `CardSearchResponsePresenterProvider` supports three template properties where `${fieldName}` placeholders are replaced with values from the search results:

| Property | Description |
|----------|-------------|
| `titleTemplate` | Main title of the card |
| `headingTemplate` | Subtitle displayed below the title |
| `contentTemplate` | Body content of the card |

```xml
<property name="responsePresenterProvider">
	<bean class="com.flower.docs.gui.client.search.response.SwitcherSearchResponsePresenterProvider">
		<!-- Set to false to show thumbnails first -->
		<property name="tableByDefault" value="true" />
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
	</bean>
</property>
```

## Tabular only

Use `TableSearchResponsePresenterProvider` directly to force tabular-only display. No mode switcher is shown.

```xml
<property name="responsePresenterProvider">
	<bean class="com.flower.docs.gui.client.search.response.TableSearchResponsePresenterProvider" />
</property>
```

## Thumbnail only

Use `CardSearchResponsePresenterProvider` directly to force thumbnail-only display. No mode switcher is shown. It supports the same `titleTemplate`, `headingTemplate`, and `contentTemplate` properties as described above.

```xml
<property name="responsePresenterProvider">
	<bean class="com.flower.docs.gui.client.search.response.CardSearchResponsePresenterProvider">
		<!-- Configure titleTemplate, headingTemplate, contentTemplate as needed -->
	</bean>
</property>
```

# Export

Search results can be exported as a CSV file. The export runs asynchronously in the background, so large result sets can be exported without a row limit.
