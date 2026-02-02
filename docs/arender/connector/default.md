---
title: "Default connector"
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: b61911fca1dafe36df7fbaab8dee46246614b3efab293acfff262b4b7da0dc2f
---

This connector is provided as default. It is used for internal product
mechanism. For these purposes, it can be used with following URL
parmaters:

| Parameter | Description                                          |
| --------- | ---------------------------------------------------- |
| url       | Allow to supply a URL based on HTTP or FTP protocol  |
| uuid      | Used to visualize the id of a ARender document       |
| bean      | Specify use of a specific connector (Advanced level) |

:::note
Here are some examples:

- Open a WEB document

  `http://{ARENDER_SERVER}/ARender/ARender.html?url=...`

- Open a document using a specific connector providing a user id and a security token

  `http://{ARENDER_SERVER}/ARender.html?bean=myConnector&user=123456&token=9GISU9SG4Z`

:::

The URI set in the url parameter is checked in order to authorized the connexion against a set of whitelisted URL.

In Rendition side, specifically in the Broker microservice, two properties are available to whitelist URL based on HTTP protocol and FTP protocol.


```cfg title="application.properties"
# Authorized documents paths with comma-separated
authorized.paths=../../samples/,../samples/,../../tmp/,../tmp
# Authorized URLs with comma-separated
authorized.urls=
```

By default, no URL is authorized.

For example, to allow the ARender demo site to authorize the following URL document https://demo.arender.io/docs/demo/ARender-doc-demo.pdf, we need to set the property like below : 

```cfg title="application.properties"
authorized.urls=https://demo.arender.io,demo.arender.io
```

Note, that we added 2 URLs, one with the HTTP protocol and one without. Both are correct. 
But in the first one, we explicitly authorize HTTPS URL of the demo size.

With the property above, the following URL will open the document ARender-doc-demo.pdf in the ARender demo : 

https://www.demo.arender.io/?url=https://demo.arender.io/docs/demo/ARender-doc-demo.pdf