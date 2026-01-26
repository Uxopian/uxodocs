---
title: Default page
sidebar_position: 2
date: "2001-03-02T13:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: 2b9dcac45181340d5c714ac996e0a408b455d960be7bb2b70856df8030bc5c6d
---

The default page is the one displayed at login.

To configure the default page, simply add a property to the corresponding profile, for example: `place.default=home`

The different values supported are:

| Values                         | Description                                      |
| ------------------------------ | ------------------------------------------------ |
| home                           | Home page                                        |
| search(templateName)           | Search screen with optional search template name |
| store                          | File insertion screen                            |
| storeTask(id)                  | Task creation screen                             |
| admin                          | Admin console                                    |
| browse(id)                     | Virtual folder consultation tab                  |
| componentResolve(templateName) | Search-based component tab                       |

Two special cases:

- Search: the `search` keyword can take one argument: `search(search_template_id)`
- Virtual folders: it is necessary to specify the virtual folder identifier as a parameter
