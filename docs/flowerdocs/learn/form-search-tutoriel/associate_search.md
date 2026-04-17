---
title: Association
sidebar_position: 3
date: "2020-06-06T12:20:01+02:00"
last_update:
  date: '2026-04-17T14:38:23.664Z'
  author: CI/CD Bot
content_hash: 695d628237f25356677c4d69f53733835207e0976ccf751e5e474dc35d08552f
---

:::info
Link a search to a team of users to make it usable.
:::

<br/>

To do this:

<br/>

- Go to the **Administration > Identities > Team**menu,
- Select the user team to which the form should be linked (here `ALL_USERS`),
- In the **Properties**tab, click on the **+** button (at the top of the property list) to create the new property at the bottom of the page,
- Choose **Search template** in the drop-down list,
- Enter the `value` field with **dossierClientSearch(fr=Dossiers Client,en=Client folders)**,
- Click on the **Save**button.

<br/>

_Note: The `Value` field respects a format: `<identifiant>(<langue>=<libellé>,<langue2>=<libellé2>)`. The identifier is the id and the label is its name in the given language._

<br/>

Advanced search is now accessible and usable via the **Search > Client Folders** menu:

<br/>

![](/img/flowerdocs/documentation/learn/flowerDocs_search_advanced.png)
