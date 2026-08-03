---
title: Delegations
sidebar_position: 6
date: "2002-03-28T13:20:01+02:00"
last_update:
  date: '2026-01-26T13:36:00.326Z'
  author: CI/CD Bot
content_hash: c5ddc7455ba13d854192d7726fbede305e94fb6e6aa87fb25b8838efb47e5c8c
---

This feature enables users to delegate their work during an absence.

## Principle

A delegation is defined by:

- the user on leave
- the delegate
- the vacation period
- a description (optional)

All users access the delegation functionality via the Avatar menu and can create delegations. They also have access to the delegations given to them.

Administrators with the `DELEGATION_MANAGER` team can also create/modify or delete delegations via the administration interface.

## How it works

During the defined period, the authorizations of the user on leave are added to those of the delegate:

- access to searches and menus
- access to tasks and documents

All this is necessary to enable the delegate to carry out the absent person ' s work , even if the delegate does not normally have the necessary rights.

In the history, it is always the user who actually performed the action who is recorded.

If an administrator user delegates to a non-administrator user, the latter will access the administration interface during this period.
