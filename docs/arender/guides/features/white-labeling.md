---
title: White-labeling
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /guides/features/white-labeling
sidebar_position: 12
content_hash: 10e7c162ac6c59a8707a72b8cb0357cb01cd1cd85a433473f87b19dbdd17b5e9
---

# White-labeling

ARender can be configured to remove all visible references to the ARender brand. This is useful when embedding the viewer in a product that should not expose the underlying technology.

## Enabling white-label mode

Set the following property in the web UI configuration:

```properties
arender.white.labeling=true
```

When enabled, all ARender branding is removed from the About dialog. The dialog remains functional but no longer displays product name, version, or logo.

## Customizing the loading label

During document loading and saving, ARender displays a text label at the center of the viewport. By default this label reads "ARender". Override it with:

```properties
# Text shown while a document is loading or saving
startup.loading.label=Loading...
```

Set this to any string that fits your product branding, or to an empty value to suppress the label entirely.

## Changing the browser window title

The browser tab title defaults to "ARender". To change it, edit the `ARender.html` file at the root of your web UI deployment. Locate the `<title>` element and replace its content:

```html
<title>Your Product Name</title>
```

In a Docker deployment, mount a custom `ARender.html` over the default file in the container, or apply the change in a derived image.

## Summary of properties

| Property | Default | Description |
|----------|---------|-------------|
| `arender.white.labeling` | `false` | Remove ARender branding from the About dialog |
| `startup.loading.label` | `ARender` | Text displayed during document loading and saving |
