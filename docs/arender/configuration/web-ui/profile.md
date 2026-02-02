---
title: "Profiles"
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: 05d7a458b9d9c047597e00beef05c85fbe1a160110d044bd973510273d90762e
---

## Introduction

In ARender, a profile enabled the use of a specific interface
configuration.

Thanks to the profiles feature, you can use specific CSS, hide/show
icons, modify panel width...

## Existing profiles

ARender is delivered with a default configuration and three profiles as
follows:

| Nom                              | Description                                                                                                     |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Base: arender-default.properties | Default configuration file offering a standard configuration for standalone use. **Do not modify this profile** |
| arender                          | Profile dedicated to a specific configuration shared for all users. **Editable**                                |
| jsapi-demo                       | Profile presenting all features available with the ARender Javascript API                                       |

:::tip Use of specific profil
`https://www.demo.arender.io/?url=https://arender.io/docs/demo/ARender-doc-demo.pdf&props=jsapi-demo`
:::

## Add 1 or N profiles

It is possible to a multiple specific profiles in order to dedicate
interface configuration to users ou group of users.

Properties are listed in the file **arender-default.properties** located
in *WEB-INF/classes* of ARender WAR (or EAR).

### Steps to follow to create a new profile

- Create a file named for example *newProfile.properties*
- Add to this file the properties you want to modify (for example:
  `visualization.rotation.save.enabled=true`)
- Save the file and add it to the Application Server classpath (for
  example: in the folder *WEB-INF/classes* of ARender WAR (or EAR))

:::note
To trigger the use of this specific profile, add to the URL the parameter props and the name of the profile (without its extension):

`http://localhost:8080/ARenderHMI/?url=../samples/arender.pdf&props=newProfile`
:::
