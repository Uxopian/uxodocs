---
title: Quickmenu
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 5078ff73fded55097e10eb158928afb304680d3206697b3a9605503ecad54bc0
---

## Description

The quickmenu is a context menu that appears at the end of a text selection.
This menu is positioned below the text and will allow you to perform actions on the text.

This menu can be disabled with the following configuration :

```cfg
# Activates ARender quick contextual menu when text is selected
quick.contextual.menu.enabled=false
```

![image](/img/arender/features/quickmenu.png)

## Actions

### Annotations creation

Annotations requiring text selection have their creation button in the quickmenu.
The quickmenu supports the following annotations:

- highlight
- underline
- strikeout
- redact (If user is allowed to add them)
- hyperlink

Each button is enabled by default. You can individually disable buttons with the following configurations:

```cfg
# Enables a textual highlight annotation creation option for the quick contextual menu
quick.contextual.menu.hasHighlightText=false

# Enables a strike through annotation creation option for the quick contextual menu
quick.contextual.menu.hasStrikeoutText=false

# Enables an underline annotation creation option for the quick contextual menu
quick.contextual.menu.hasUnderlineText=false

# Enables a hyperlink creation option for the quick contextual menu
quick.contextual.menu.hasHyperlink=false

# Enables a hyperlink area creation option for the quick contextual menu
quick.contextual.menu.hasHyperlinkZone=false

# Enables a redact annotation creation option for the quick contextual menu
quick.contextual.menu.hasRedactText=false
```

### Copy of text

A button to copy selected text is enabled by default.
This button can be deactivated with the following configuration:

```cfg
# Enables a copy selected text option for the quick contextual menu
quick.contextual.menu.hasCopyText=false
```
