---
title: Script and result
date: "2000-02-03T12:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: b91b961f9cdc1e9d07033b6a9592d45e34a66832336dd17759b81db35b08c59e
---

# Script

To use the component link plugin, add the following script to your scope.

To do this, follow the steps below:

- Go to the admin console,
- Open the `Display > Scripts ` section,
- Click on the `+` button to start creation,
- Enter a name for the script,
- Add the following content in the text editor:

```javascript
var suggestOfferLabels = [

        name: "suggestOfferTitle",
		FR: "Consultez l'offre",
		EN: "Consult offer"
	},

        name: "suggestOfferDescription",
		FR: "Accéder aux détails de l'offre d'emploi publiée.",
		EN: "Access to published job offer's details."

]
var labelsAPI = JSAPI.get().getLabelsAPI();
labelsAPI.setLabels(suggestOfferLabels);

var plugin = new LinkFreeListPlugin({
	toPopulate: 'RH_OfferLink',
	category: 'TASK',
	classId: 'JobOffer',
	tagsToDisplay: ['RH_Service', 'RH_Job'],
	title: labelsAPI.getLabel("suggestOfferTitle"),
	description: labelsAPI.getLabel("suggestOfferDescription")
});
plugin.bind();
```

# Results

- To begin with, create a job offer with a department and a position for our applicant to apply for.

- Then create an application: In the indexing form, the `HR_OfferLink` tag contains the job offer created previously, and the values entered for its `HR_Service` and `HR_Job` tags are displayed. You can select the offer and confirm the creation of the application.

<br/>
Open the application you have created, and you will see that an icon has appeared next to the `HR_OfferLink` tag. Clicking on this icon opens a popup displaying the tags of the referenced (or linked) job offer. 
The `Open` button takes you to the job offer consultation screen, where you can view both the tags and attachments for this job.
