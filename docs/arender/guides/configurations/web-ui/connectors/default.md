---
title: Default connector
sidebar_position: 1
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
content_hash: 2b95c8ad8c61b63a972662923abe4f8ffb5e77f332e04eb308d86fddc1b70753
---

This connector is provided as default. It is used for internal product
mechanism. For these purposes, it can be used with following URL
parameters:

| Parameter | Description                                          |
| --------- | ---------------------------------------------------- |
| url       | Allow to supply a URL based on HTTP or FTP protocol  |
| uuid      | Used to visualize the id of a ARender document       |
| bean      | Specify use of a specific connector (Advanced level) |

Here are some examples:

- Open a WEB document

    `http://{ARENDER_SERVER}/ARender/ARender.html?url=...`

- Open a document using a specific connector providing a user id and a security token

    `http://{ARENDER_SERVER}/ARender.html?bean=myConnector&user=123456&token=9GISU9SG4Z`

### Configure authorized URLs

The URI set in the url parameter is checked in order to authorized the connexion against a set of whitelisted URL.

In Rendition side, specifically in the Broker microservice, two properties are available to whitelist URL based on HTTP protocol and FTP protocol.

```properties
# Authorized documents paths with comma-separated
authorized.paths=../../samples/,../samples/,../../tmp/,../tmp
# Authorized URLs with comma-separated
authorized.urls=
```

By default, no URL is authorized.

For example, to allow the ARender demo site to authorize the following URL document https://demo.arender.io/docs/demo/ARender-doc-demo.pdf, we need to set the property like below :

```properties
authorized.urls=https://demo.arender.io,demo.arender.io
```

Note, that we added 2 URLs, one with the HTTP protocol and one without. Both are correct.
But in the first one, we explicitly authorize HTTPS URL of the demo size.

With the property above, the following URL will open the document ARender-doc-demo.pdf in the ARender demo :

https://www.demo.arender.io/?url=https://demo.arender.io/docs/demo/ARender-doc-demo.pdf

### Configure Basic Authentication

Since version 2023.1.0, a new property is available to configure URLs that need to be authenticated with a Basic Authentication.
The property must be provided in the Broker microservice.

```properties
# Set a list of key-value pairs of base64-secrets for domains
# The key and the value are separated by the character '@'
# The key-value couples are separated by the character ','
# Example : domain1@secret1,domain2@secret2,domain3@secret3
arender.url.basic.auth=
```
