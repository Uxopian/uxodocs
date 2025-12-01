---
title: Integration
description: Configure the plugin from the admin console.
date: '2020-02-01T15:20:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 2821d1fe1d18d0838efda6e31a209869bab83a6a935c9b93bdfd981b404ab774
---


# Plugin configuration

Using your favorite browser, open the FlowerDocs admin console, then: 

* go to `Configuration` section
* open the `Plugins` menu
* click on the `+` button to start creating a new plugin
* fill in the requested information: 
    * Path: `/my-plugin/**`
    * URL: `http://localhost:2802/secured`


# Plugin access

Now that your GUI plugin has been configured, you can access the `/count` endpoint through the GUI via the URL: `&lt;gui&gt;/plugins/&lt;scope&gt;/my-plugin/count`.

You can also test the return of the implemented service with different users to observe that the number of documents found depends on the logged-in user.

:::info
Since the plugin requires a token, direct access via the URL `http://localhost:2802/secured/count` is prohibited.
:::
