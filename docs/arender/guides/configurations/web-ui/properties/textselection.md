---
title: Text Selection
sidebar_position: 1
last_update:
  date: '2026-03-12T20:43:52.809Z'
  author: CI/CD Bot
content_hash: 528415f136a39482a2c370b7f8f4269339615ed135581adfe58c18ccc9bcaa5f
---

## General

| Description                                                  | Parameter Key             | Default value | Type    |
| ------------------------------------------------------------ | ------------------------- | ------------- | ------- |
| Enable/disable default text selection character by character | text.selection.use.legacy | true          | Boolean |

```properties
# Enable the use of the legacy text selection, character by character :
# When disabled, the text selection will select word by word when a word is partially or completely selected
text.selection.use.legacy=true
```
