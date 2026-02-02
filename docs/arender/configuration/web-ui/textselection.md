---
title: "Text Selection"
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: 9dfae5f8156a38e3875284867f0b8dc49cd44e1da77be2b21a21d036035ed2b1
---

## General

- Key: text.selection

    | Description                                                                            | Parameter Key         | Type    |
    | -------------------------------------------------------------------------------------- | --------------------- | ------- |
    | Enable/disable default text selection character by character                           | use.legacy            | Boolean |

```cfg title="arender.properties"
# Enable the use of the legacy text selection, character by character :
# When disabled, the text selection will select word by word when a word is partially or completely selected

text.selection.use.legacy=true
```
