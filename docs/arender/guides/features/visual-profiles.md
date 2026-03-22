---
title: Visual profiles
last_update:
  date: '2026-03-17T14:31:35.329Z'
  author: CI/CD Bot
slug: /guides/features/visual-profiles
sidebar_position: 11
content_hash: 40e9df981a893514fcc1f211a0b408d0466e8d53c6ffae4d3abb8d15f5cedbf1
---

# Visual profiles

A visual profile is a `.properties` file that overrides default ARender UI settings for a specific audience. Each profile can control CSS, toolbar layout, panel visibility, color mode, and any other client-side property. Multiple profiles can coexist; the caller selects one at runtime through a URL parameter.

## How profiles work

When ARender loads, the GWT client reads the `props` query parameter and sends the profile name to the server. The server resolves a properties file matching that name, merges it on top of the defaults (`arender-default.properties`), and returns the resulting configuration. If no `props` parameter is provided, ARender falls back to the built-in `arender-env` profile.

The resolution order is:

1. `arender-default.properties` -- ships with ARender, contains all defaults.
2. `arender-env.properties` -- generated at container startup from `ARENDER_*` environment variables.
3. `<profileName>.properties` -- loaded when `?props=<profileName>` is present in the URL.

Properties defined in the profile file override those from earlier layers.

## Activating a profile

Append `props=<profileName>` (without the `.properties` extension) to the viewer URL:

```
https://arender.example.com/?url=../samples/arender.pdf&props=readOnly
```

Multiple documents can be opened with different profiles by varying the `props` value per URL.

## Creating a profile

### 1. Create the properties file

Create a file named after the profile, for example `readOnly.properties`. Add only the properties you want to override:

```properties title="readOnly.properties"
# Hide annotation toolbar
toolbar.annotation.buttons.beanNames=

# Disable save button
topPanel.section.left.buttons.beanNames=downloadMenu,printButton

# Force light color mode
preference.color.mode=LIGHT

# Disable rotation save
visualization.rotation.save.enabled=false
```

Any property present in `arender-default.properties` can be overridden in a profile file. The full list of available properties is documented inside the default file shipped with ARender.

### 2. Deploy the file

#### Docker

Mount the profile file into `/home/arender/ARenderConfiguration/` inside the web-ui container:

```yaml title="docker-compose.yml"
services:
  arender-ui:
    image: arender-ui:latest
    volumes:
      - ./profiles/readOnly.properties:/home/arender/ARenderConfiguration/readOnly.properties
    environment:
      ARENDERSRV_ARENDER_SERVER_RENDITION_HOSTS: http://rendition:8761
```

Using `docker run`:

```bash
docker run \
  -e ARENDERSRV_ARENDER_SERVER_RENDITION_HOSTS=http://rendition:8761 \
  -v $(pwd)/readOnly.properties:/home/arender/ARenderConfiguration/readOnly.properties \
  -p 8080:8080 \
  arender-ui:latest
```

#### Spring Boot (standalone)

Place the file in the `configurations/` folder next to the ARender web-ui JAR, or in the classpath root.

#### Kubernetes / Helm

Use a ConfigMap mounted at `/home/arender/ARenderConfiguration/`:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: arender-profiles
data:
  readOnly.properties: |
    toolbar.annotation.buttons.beanNames=
    topPanel.section.left.buttons.beanNames=downloadMenu,printButton
---
# In the Deployment spec:
volumes:
  - name: profiles
    configMap:
      name: arender-profiles
containers:
  - name: arender-ui
    volumeMounts:
      - name: profiles
        mountPath: /home/arender/ARenderConfiguration/readOnly.properties
        subPath: readOnly.properties
```

## Common profile properties

| Property | Description | Default |
|----------|-------------|---------|
| `style.sheet` | Comma-separated CSS file paths | `css/arender-style.css` |
| `preference.color.mode` | Top panel color theme (`LIGHT`, `DARK`, `LEGACY`, `CUSTOM`) | `LIGHT` |
| `topPanel.section.left.buttons.beanNames` | Buttons in the left toolbar section | Import, save, download, print menus |
| `topPanel.section.middle.buttons.beanNames` | Buttons in the middle toolbar section | Annotation, builder, image tools |
| `topPanel.section.right.buttons.beanNames` | Buttons in the right toolbar section | Navigation, zoom, fullscreen |
| `toolbar.annotation.buttons.beanNames` | Annotation toolbar buttons (empty string hides it) | All annotation types |
| `visualization.rotation.save.enabled` | Allow saving page rotation | `true` |
| `about.dialog.enabled` | Show the About dialog button | `true` |

## Device-aware profiles

ARender automatically detects the client device type (desktop, tablet, phone). The detected device is passed alongside the profile name to the server configuration service. You can use this to apply device-specific defaults without requiring separate profile files.

## Multiple profiles

To serve different user groups, create one file per profile (`admin.properties`, `readOnly.properties`, `reviewer.properties`) and mount all of them into the configuration directory. Each user or integration link simply references the appropriate profile name in the `props` parameter.
