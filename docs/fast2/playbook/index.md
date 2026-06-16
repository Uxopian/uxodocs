---
title: Fast2 Playbook
last_update:
  date: '2026-06-16T10:09:13.305Z'
  author: CI/CD Bot
sidebar_label: Playbook
sidebar_position: 0
content_hash: 74879b07826c2f0ee5d4eab59c87b9a074164c9da98e524a96e83ae675beec5c
---

# Fast2 Playbook

The Playbook is the **strategy** layer of the Fast2 documentation. It is about the decisions you make *before* you configure a single task: which extraction strategy fits a live source, how you catch the target up to a moving source, and where you deploy Fast2 relative to the systems it connects. These are architecture and methodology choices, anchored in real field experience and real migration failures.

:::tip Playbook vs. Cookbooks — which one do I need?
Fast2 has two hands-on sections, and they answer two different questions.

| | **Playbook** (this section) | **[Cookbooks](../cookbooks/)** |
|---|---|---|
| **Question it answers** | *Which approach should I choose?* | *How do I implement this?* |
| **Altitude** | Strategy & architecture | Tactics & recipes |
| **Unit** | A methodology, a decision matrix, a trade-off | A task config, a code snippet, an API call |
| **When you read it** | Before the project — during design and scoping | During the project — at the keyboard |
| **Example** | "Clone & Sweep vs. Snapshot & Drip for a live 800M-document FileNet source" | "Read content and metadata from S3 into a punnet" |

A cookbook tells you how to cook one dish. The playbook tells you how to plan the menu for 500 guests, with dietary constraints and a two-hour service window. You will usually start in the Playbook to choose your approach, then drop into the Cookbooks to build it.
:::

## What's in here

- **[Extracting From a Live ECM](./extracting-from-live-ecm.md)** — the three bulk-extraction methodologies (Clone & Sweep, Snapshot & Drip, Live Trickle), with a decision matrix, throttling controls, and a defensible sizing baseline. Part 1 of the migration series.
- **[Delta Migration](./delta-migration.md)** — how the target catches up to a source that never stops: the four delta-capture mechanisms, layered reconciliation, cutover patterns, and the sign-off ritual. Part 2 of the migration series.
- **[Deployment Variants](./deployment-variants.md)** — where to run Fast2 relative to the source and target: on-premise, cloud, hybrid, and AWS Snowball, with the access-control / performance / debugging trade-offs of each.

These articles are written from the field. They name real projects and real failures, because the point of a playbook is to help you avoid repeating them.
