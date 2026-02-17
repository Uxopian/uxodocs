---
title: "User Management"
last_update:
  date: '2026-02-16T16:29:56.656Z'
  author: CI/CD Bot
sidebar_position: 5
content_hash: 6dfec5877743e93d2ea073206eb38fd881f10a0809faa3a07de27033b424e78b
---
# User Management

The User Management section allows administrators to monitor activity at the user level to understand adoption patterns and usage intensity.

## User List

The main view displays all users who have interacted with the system, with the following metrics per user:

| Metric | Description |
| :----- | :---------- |
| **Conversation Count** | The number of sessions created by the user. |
| **Token Usage** | The total Input and Output tokens consumed. |
| **Request Count** | The total number of individual interactions. |

## User Details

Selecting a user opens a detailed view of their activity.

- **Summary Stats:** Recaps the user's total consumption and activity metrics.
- **Conversation History:** Browse the full list of conversations created by the user.
- **Request History:** Inspect individual requests and their LLM responses. This is useful for support troubleshooting and auditing purposes.
