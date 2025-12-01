---
title: Quickmenu
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: ec44172bd4f0c47ae417e45f0f8703f81bd5ea6eb16ba923dd66293cf6f99407
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

