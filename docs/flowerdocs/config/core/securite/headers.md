---
title: Headers
sidebar_position: 3
description: Secure requests made to FlowerDocs Core.
date: "2019-06-01T13:25:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: c908135ec9c113fccb2cd0623cd9f8b82c093e8d82dcce5ead6770f8b872ba04
---

## Content security policy (CSP) and HTTP Strict Transport Security (HSTS)

To protect against attacks, FlowerDocs sets the `Content security policy` mechanism to the default value of `frame-ancestors 'self'` and the `HTTP Strict Transport Security` mechanism to a default maximum duration of `10 minutes`. However, these values can be changed using the following parameters:

- CSP: `gui.content.security.policy`
- HTS max-age: `gui.hsts.max.age`
