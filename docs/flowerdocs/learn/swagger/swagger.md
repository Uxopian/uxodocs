---
title: Swagger UI
description: Test and consume REST web services.
date: "2000-02-01T12:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 75bd4f6a282e1e87e6703d29717ebb9b072ce19b97fe337d6298a04ed3835e26
---

# Goal

The aim of this module is to give you the keys to getting to grips with and using Swagger UI to consume the REST web services exposed by **FlowerDocs Core**.

# Access

Swagger UI is available from **FlowerDocs Core** at `/swagger-ui/index.html`.
For example, for an online demonstration, Swagger UI is available [here](https://flowerdocs.com/core/swagger-ui/index.html).

# Authentication

The services exposed by **FlowerDocs Core** require the client to be authenticated, so it is necessary to provide a token for requests executed from Swagger UI.

We will start by generating a user token :

- In the menu bar, select the `Authentication` specification
- Select the `authentication-rest-controller` web service
- Unfold the endpoint `POST /rest/authentication`
- Click on `Try it out`
- In the request editor, fill in the `password`, `scope` and `user` fields

If the information entered is correct, the HTTP response section shows:

- a return code 200
- a JSON token object with its text value and expiry date

Then, to authenticate future requests:

- Copy and paste the text value of the generated token (`value` field)
- Click on the `Authorize` button
- Paste the copied token

Future requests will provide **FlowerDocs Core** with the defined token to authenticate them.

# My first request

In this section, we will test our first request using Swagger UI.
This request will search for all documents whose name contains the letter `a`.

- In the menu bar, select the `Component` specification
- Select the `document-rest-controller` web service
- Unfold the endpoint `POST /rest/documents/search`
- Click on `Try it out`
- In the request editor, copy and paste the following request:

```javascript

    "filterClauses": [{
        "criteria": [{
            "name": "name",
            "operator": "CONTAINS",
            "type": "STRING",
            "values": ["a"]
        }]
    }],
    "max": 10

```

To execute the search, click on the `Execute` button and consult the results found in the section presenting the HTTP response.
