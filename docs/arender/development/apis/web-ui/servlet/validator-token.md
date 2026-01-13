---
title: Token validation
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: ab66ab55d59a74c68a0fef06f7d493e2395968dd08131cbff5f36af728f5f0c7
---

A new servlet is deployed to configure a token validation.

## Request

This functionality is accessible via the servlet: **tokenValidatorServlet**

Usable in POST

The validation of a token is configurable if it is sent as a POST request cookie or attribute to the URL /arendergwt/validateToken.

The token must have the name "token".

The custom validator Java class shall implement the TokenValidator interface. It must be declared in the ARender configuration through the **arender.server.json.load.token.validator** property.
It will have to implement the **validate** method that checks if the token passed as an URL parameter is valid or not.
The default validator is **NoopTokenValidator**. It checks if the token is not null.
