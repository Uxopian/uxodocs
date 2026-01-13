---
title: Reservations
date: "2008-02-02"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 37d1f4dac8f4b3fcd135c3d3381354f94dd81af374f24eaae14a98c2e46e219b
---

:::info
A reservation allows you to temporarily give write access to a component in the graphical interface in order to avoid concurrent modifications.
:::

A component is reserved when it is opened in read/write mode by a GUI user.
If a reserved component is opened by another user, the form is displayed as read-only.

Reservations are automatically deleted when:

- the user exits the screen from which the component was reserved (by taking an action or closing the browser)
- its session expires
- the user logs out

From the graphical user interface, the current user's reservations can be consulted using:

GET /rest/session/reservations
