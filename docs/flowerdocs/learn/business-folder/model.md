---
title: Setting up the template
sidebar_position: 2
date: "2000-02-01T13:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: b41725c77a9f2dd81b467c12bce824d1de5a0abfe0f070ac4f9f819753c3f353
---

Using the client file as an example, we can test the setting up of a practical example.

<br/>

## The client reference

In this example, the client reference is the pivot tag used to make the link between a client file and its contents.
To begin, create a string `ClientReference` tag class.

To do this, follow the steps below:

- Go to the admin console,
- Open the `Components > Tag classes` section,
- Click on the `+` button to start creation,
- Select the value type `Character string` then go on to the next step,
- In the form displayed, enter the `ReferenceClient` value as the identifier for this tag class,
- Click on `Create`.

Congratulations! You have created the `ClientReference` tag class, which will be used to classify a client's documents within the same folder.

## The client folder

To create instances of client folders, you need to create the virtual folder class `ClientFolder` referencing the `ClientReference` tag class.

To do this, follow the steps below:

- Go to the admin console,
- Open the `Components > Virtual folder classes` section,
- Click on the `+` button to start creation,
- Click on the + button to start creation, In the form displayed, enter the `ClientFolder` value as the class identifier, and select `Security Total Control` as the Security value,
- In the `Tags` tab, click the `Add` button and select the `ClientReference` tag class,
- In the `Search` tab, click `Filters` then `Add` to initiate a new search to link the documents,
- Check that there is an identifier for the search
- Indicate 10 results to be displayed in `Display > Number of results`
- Add a search criterion with the `ClientReference` identifier as its name, the `EQUALS_TO` operator and the variable `${tags.ReferenceClient}` as its value,
- Finally, click `Create`.

## Client documents

In order to create instances of client documents, it is necessary to create the `ClientDocument` document class .

To do this, follow the steps below:

- Go to the admin console,
- Open the `Components > Document classes` section,
- Click on the `+` button to start creation,
- In the form displayed, enter the `ClientDocument` value as the identifier for this class and `Security Total control` as the Security value,
- In the `Tags` tab, click the `Add` button and select the `ClientReference` tag class,
- Finally, click `Create`.
