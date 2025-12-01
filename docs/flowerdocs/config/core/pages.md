---
title: Pages
description: Show ad-hoc HTML pages.
date: '2020-02-02'
custom_edit_url: null
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: eef70916488b7fee6140d89d13ed01d338277467470de65da623a085ac7f1f6e
---


# Principle

Pages allow you to expose HTML pages to your users. They are configured by scope and can be used, for example, to collect information such as documents, or simply to make information available.

These pages can be restricted to certain users according to their authorizations, or made public so that they are accessible to all.

This concept requires two types of configuration: 

* a [template](/config/core/templates/html.md)
* a page

# Private page

A page is considered `private` if it has an ACL in its definition. 
In this case, only authenticated users can access it, and the configured ACL is evaluated to determine whether the user is authorized to consult it.

<br/>
Private pages can be accessed through a browser at the following URL: `/gui/private/&lt;scope&gt;/pages/&lt;page&gt;`.

# Public page

A page is considered `public` if its definition does not reference an ACL.
In this case, access is public and a user can access it without being authenticated.

If this page requires actions from **FlowerDocs Core**, a token can be injected to provide authentication and enable these actions to be carried out with authentication.

The token supplied initiates authentication with a technical user. The user identifier is the path to the page. It is also assigned the `#PUBLIC` profile.

Security policies can therefore be defined taking into account this public access to authorise or not actions on components.

<br/>
Public pages can be accessed through a browser at the following URL: `/gui/public/&lt;scope&gt;/pages/&lt;page&gt;`.
