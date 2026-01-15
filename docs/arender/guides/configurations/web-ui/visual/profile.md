---
title: Profiles
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: bd79dd7aa2d9d52fe1a1b102056c07e36b19f4bdb7b11ccea37a53616a8443ca
---

## Introduction

In ARender, a profile enabled the use of a specific interface
configuration.

Thanks to the profiles feature, you can use specific CSS, hide/show
icons, modify panel width...

## Existing profiles

ARender is delivered with a commented configuration file:

| Nom                                             | Description                                                                                                                |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| configurations/arender-custom-client.properties | All commented configuration file offering all available configuration. Uncomment and modify the properties you want to use |

## Add 1 or N profiles

It is possible to a multiple specific profiles in order to dedicate
interface configuration to users ou group of users.

Properties are listed and commented in the file **configurations/arender-custom-client.properties** of ARender Web-UI.

### Steps to follow to create a new profile

#### Standalone

- Create a file named for example _newProfile.properties_
- Add to this file the properties you want to modify (for example:
  `visualization.rotation.save.enabled=true`)
- Save the file and add it to the **configurations** folder of the ARender Web-UI jar

To trigger the use of this specific profile, add to the URL the parameter _props_ and the name of the profile (without its extension):

`http://localhost:8080/?url=../samples/arender.pdf&amp;props=newProfile`

#### Docker

- Create a file named for example _newProfile.properties_
- Add to this file the properties you want to modify (for example:
  `visualization.rotation.save.enabled=true`)
- Save the file.
- When using "docker run", use a volume to place the file _newProfile.properties_ in _/home/arender/ARenderConfiguration/_
  Example of volume : docker run -e ARENDERSRV_ARENDER_SERVER_RENDITION_HOSTS=http://your_ip_rendition:8761 -v C:\newProfile.properties:/home/arender/ARenderConfiguration/newProfile.properties -p 127.0.0.1:8080:8080 your_image_id

To trigger the use of this specific profile, add to the URL the parameter _props_ and the name of the profile (without its extension):

`http://localhost:8080/?url=../samples/arender.pdf&amp;props=newProfile`
