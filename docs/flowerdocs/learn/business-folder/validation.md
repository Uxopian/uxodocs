---
title: Validation
date: '2000-02-04T13:20:01+02:00'
last_update:
  date: '2025-12-02T14:29:22.460Z'
  author: CI/CD Bot
content_hash: 97d4430a048ca56321216a5ee4c3c95b0d1a90411ae7afad4c82903394a69820
---



To validate the correct operation of what has been set up, start by creating a customer document.
To do this, go to the `Insert` tab, insert a file and then click on `Next` to move on to the indexing stage.

In the indexing form, select the `DocumentClient` class and enter a value for the `ReferenceClient` tag (e.g. _1234_).

<br/>
Next, go to the admin console and create a `ClientFolder` virtual folder class :

* Open the `Components > Virtual folder classes` section,
* Select the `ClientFolder` virtual folder class,
* Click on the `Create an instance` button.

In the indexing form, enter the following information:

* a name for the client folder,
* the value previously entered for the `ClientReference` tag of the document created.

Then click on `Create`.

<br/>
Your first job file has been created!
To validate the data model you have created, open the customer folder you have created and check that it contains the added document.

:::info
__Resources__:

To facilitate client management between the virtual folder and the documents, use the [plugin to link one component to another](/docs/flowerdocs/learn/component-link/getting-started).
:::


<!--:::info
Find the scope module corresponding to this training [here]("")
:::
-->

