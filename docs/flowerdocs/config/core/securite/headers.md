---
title: Headers
description: Secure requests made to FlowerDocs Core.
date: "2019-06-01T13:25:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: f3214637164cc7538229be531a4aadd8fd2a00eb75ed2f5740d5869ae2cf8ebe
---

# Content security policy (CSP) and HTTP Strict Transport Security (HSTS)

To protect against attacks, FlowerDocs sets the `Content security policy` mechanism to the default value of `frame-ancestors 'self'` and the `HTTP Strict Transport Security` mechanism to a default maximum duration of `10 minutes`. However, these values can be changed using the following parameters:

- CSP: `gui.content.security.policy`
- HTS max-age: `gui.hsts.max.age`
