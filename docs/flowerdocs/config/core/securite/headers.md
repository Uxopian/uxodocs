---
title: Headers
description: Secure requests made to FlowerDocs Core.
date: '2019-06-01T13:25:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: d545554f5bcfa7af8d5300e6f64665c5a7bbe492d697ea5b5411b0de09f2f54c
---


# Content security policy (CSP) and HTTP Strict Transport Security (HSTS)

To protect against attacks, FlowerDocs sets the `Content security policy` mechanism to the default value of `frame-ancestors 'self'` and the `HTTP Strict Transport Security` mechanism to a default maximum duration of `10 minutes`. However, these values can be changed using the following parameters:

* CSP: `gui.content.security.policy`
* HTS max-age: `gui.hsts.max.age`
