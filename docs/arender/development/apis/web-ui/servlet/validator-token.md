---
title: Token validation
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 8ac96680e098eb7c921b85943c750b3fba80310d0fe994831236ff4da18ff603
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
