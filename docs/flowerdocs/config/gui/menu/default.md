---
title: Default page
date: "2001-03-02T13:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 94af0c745321cde870ba371344477ed95e89a21e43e1e119a0f0caea03210c40
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
