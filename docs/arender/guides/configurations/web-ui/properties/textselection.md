---
title: Text Selection
sidebar_position: 1
last_update:
  date: '2026-01-29T16:00:59.573Z'
  author: CI/CD Bot
content_hash: 801d5d2e419b900b983d5b3d28e278c6b2a92d3b0328ca5294de309a47abfd3b
---

## General

| Description                                                  | Parameter Key             | Default value | Type    |
| ------------------------------------------------------------ | ------------------------- | ------------- | ------- |
| Enable/disable default text selection character by character | text.selection.use.legacy | true          | Boolean |

```cfg
# Enable the use of the legacy text selection, character by character :
# When disabled, the text selection will select word by word when a word is partially or completely selected

text.selection.use.legacy=true
```
