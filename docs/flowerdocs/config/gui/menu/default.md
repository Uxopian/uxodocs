---
title: Default page
date: "2001-03-02T13:20:01+02:00"
last_update:
    date: "2025-12-01T14:30:57.777Z"
    author: CI/CD Bot
content_hash: 4dfd2b2b287538d57a51684669da813c1f091401c1f2814be200777522cf9baf
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
