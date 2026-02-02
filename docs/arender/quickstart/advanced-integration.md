---
title: "Advanced integration"
last_update:
  date: '2026-02-02T12:23:28.934Z'
  author: CI/CD Bot
content_hash: d8ffe8910369e270d3d0c37ee7fd5c146b9f2d40665f5f14f76ee47e84aa40b2
---

## ARender personalization

By default, ARender exposes a subset of features to annotate, browse
documents, upload new documents, etc...

It is probable that this subset will not entirely fit your need. If it
does not, there are two options for you.

### ARender Profiles

ARender profiles are a Front end server side logic of configuration that
is then propagated to each end user.

A profile defines a set of properties customizing ARender default look
and feel, or even alter some features behavior.

ARender always have a default profile, named accordingly
arender-default. This one cannot be altered.

ARender always have an empty profile, named arender. This one can be
altered, and every property overridden in this profile will override the
one in arender-default.

To change profiles, simply call ARender with an additional URL parameter
: "?props=&lt;profile_name&gt;". Profiles can be placed anywhere in your
Web application server classpath.

A full documentation of all ARender profile properties is available in
the documentation, containing buttons enabling/disabling, default
coloring, etc...

### ARender JavaScript customization

ARender accepts to run a custom JavaScript file during the application
loading time to provide this custom JavaScripta reference to ARender
JavaScript API.

Once your program has this reference, you can hide/show buttons (using
the changeConfigurableElement method), you can open/close documents,
open/close some panels of ARender interface, etc...

Please refer to the full JavaScript API documentation to have more
details regarding this topic.
