---
title: Association
date: "2020-06-06T12:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 360b0fb3dca4086bcab3c45c3c6925d4fadd786ec3a6126e3401e52aa399cd36
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

_Note: The `Value` field respects a format: `&lt;identifiant&gt;(&lt;langue&gt;=<libellé>,&lt;langue2&gt;=<libellé2>)`. The identifier is the id and the label is its name in the given language._

<br/>

Advanced search is now accessible and usable via the **Search > Client Folders** menu:

<br/>

![](/img/flowerdocs/documentation/learn/flowerDocs_search_advanced.png)
