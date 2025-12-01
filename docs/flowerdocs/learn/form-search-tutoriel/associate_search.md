---
title: Association
date: '2020-06-06T12:20:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 4d8ba2fe6633c33fee2f555c435cccb3bbd35e9c3c740a4cbba5fa15ed50a174
---


:::info
Link a search to a team of users to make it usable.
:::


<br/>

To do this: 

<br/>

* Go to the **Administration > Identities > Team**menu,
* Select the user team to which the form should be linked (here `ALL_USERS`),
* In the **Properties**tab, click on the  **+** button (at the top of the property list) to create the new property at the bottom of the page,
* Choose **Search template** in the drop-down list,
* Enter the `value` field with **dossierClientSearch(fr=Dossiers Client,en=Client folders)**,
* Click on the **Save**button.

<br/>

*Note: The `Value` field respects a format: `&lt;identifiant&gt;(&lt;langue&gt;=<libellé>,&lt;langue2&gt;=<libellé2>)`. The identifier is the id and the label is its name in the given language.*

<br/>

Advanced search is now accessible and usable via the **Search > Client Folders**  menu:

<br/> 

![](/img/flowerdocs/documentation/learn/flowerDocs_search_advanced.png)
