---
title: "Hook test"
date: "2020-02-01T15:20:01+02:00"
---


# Subscription

In order for the`OperationHook` to be notified each time a document is created, a subscription must be defined: 

* Go to the **Administration > Configuration > Operations subscriptions section**
* Click on the **+** button to create a new subscription

<br/>
In the subscription creation form, fill in the following fields: 

* `OperationHandler`: enter the hook's HTTP URL (e.g. *http://localhost:7777/modify*).
* `Execution phase`: select the `Before` phase so that the name change is applied before the document is persisted
* `Action`: to react to a creation, select the `Create` action
* `Object ype`: choose the `Document` type
* `Activated`: tick the checkbox to activate your subscription
* `Authorization`: fill in the BASIC authorisation string using [Blitter](https://www.blitter.se/utils/basic-authentication-header-generator/) from the user defined in the *application.properties* file (example: Basic dG90bzoxMjM0)

<br/>

Finally, confirm the creation of the subscription.


# Validation

In order to test that the`OperationHook` implemented is operational: 

* create a document by the means of your choice (e.g. via the admin console)
* open the created document

If`OperationHook` has been configured correctly, the creation timestamp has been added to the name of the document created.

:::info
If the name has not been changed, check that`OperationHook` has been started and is accessible from FlowerDocs Core.
If this is the case, check the logs for more details.
:::
