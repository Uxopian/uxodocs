---
title: Product Analytics
description: Let Uxopian understand how ARender is used
date: "2005-07-28T13:20:01+02:00"
last_update:
    date: "2025-12-02T14:44:23.025Z"
    author: CI/CD Bot
content_hash: 712479c848f1e2b044c89e2d5f33f3d1e203997fe447d81c5212ff8035f7c5de
---

# Principle

Since version 2025.1.0, FlowerDocs included ARender 2023.8.0 (and more). In this version and the following, ARender has included a new feature powered by Mixpanel called Product Analytics. With this feature, the Uxopian team can collect information to better understand how ARender is used in real-world scenarios.

<br/>

Users can be assured that their sensitive information remains private and secure.
The collected data are mainly counts metrics related to the use of some specific functionalities.

:::info
More information about this new feature and the collected information are available in [the ARender documentation](https://docs.arender.io/learn/product-analytics/).
:::

# Configuration

This feature is activated by default but can be easily disabled.

To disable Product Analytics, add the property `arender.data.analytics.enabled=false` into the profile.

Documentation about the profile overriding can be found [here](./arender-config).
