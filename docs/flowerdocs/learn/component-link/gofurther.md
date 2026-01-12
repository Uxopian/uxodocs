---
title: Going further
date: "2020-02-03T12:20:01+02:00"
last_update:
    date: "2025-12-02T14:26:41.610Z"
    author: CI/CD Bot
content_hash: ec3085eff9c061c6b89ba0601c37c8e6b3ff3ec7a4b97386096c9a01449d7219
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Enabling creation

When selecting a component to link, the user can be prompted to create a new component.
To enable this, the `creation` option accepts indexing phases during which the user can create a new component.

<Tabs>
  <TabItem value="cr-ation-d-un-composant-li-" label="Création d'un composant lié">

```javascript
var plugin = new LinkFreeListPlugin({
    toPopulate: "RH_OfferLink",
    category: "TASK",
    classId: "JobOffer",
    tagsToDisplay: ["RH_Service", "RH_Job"],
    title: labelsAPI.getLabel("suggestOfferTitle"),
    description: labelsAPI.getLabel("suggestOfferDescription"),
    creation: { phases: ["INSERT", "MODIFY"] },
});
plugin.bind();
```

  </TabItem>
</Tabs>

# Reacting to the selection

When selecting a component offered by this plugin, it may be necessary to react to it in order to access information on the selected component.
This information can be used to replicate information about the component being indexed, or to propose additional actions to the user.
The `selector` option can be used to provide a function called up when the selected component is selected.

<Tabs>
  <TabItem value="r-agir-la-s-lection-d-un-composant" label="Réagir à la sélection d'un composant">

```javascript
var plugin = new LinkFreeListPlugin({
	toPopulate: 'RH_OfferLink',
	category: 'TASK',
	classId: 'JobOffer',
	tagsToDisplay: ['RH_Service', 'RH_Job'],
	title: labelsAPI.getLabel("suggestOfferTitle"),
	description: labelsAPI.getLabel("suggestOfferDescription"),
	selector: function(component){
		console.info('The component '+component.getId()+' has bee selected!');

});
plugin.bind();
```

  </TabItem>
</Tabs>

<!--
# Filters

Imagine that human resources receives documents that need to be filed manually and linked to an application received.
To make it easier to index these documents, they have two tags, `RH_OfferLink` and `RH_ApplicationLink`. The first allows you to reference the job offer at document level. The second is the linked application.

When indexing, the user first selects the job offer. The list of applications should be filtered accordingly: only applications related to the selected job offer should be proposed.

To do this, you can add the `filterTags: ['RH_OfferLink']` option to filter the values offered according to a tag present on the form.

<Tabs>
  <TabItem value="filtrer-les-composants-propos-s" label="Filtrer les composants proposés">

```javascript
var plugin = new LinkFreeListPlugin({
	toPopulate: 'RH_ApplicationLink',
	category: 'TASK',
	classId: 'ApplicationSubmission',
	tagsToDisplay: ['name'],
	title: 'View application',
	description: 'Access application details’,
	filterTags: ['RH_OfferLink']
});
plugin.bind();
```

  </TabItem>
</Tabs>

-->

<!--:::info
Find the scope module corresponding to this training [here]("")
:::
-->
