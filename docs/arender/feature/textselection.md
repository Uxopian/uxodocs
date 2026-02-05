---
title: Text Selection
sidebar_position: 18
last_update:
  date: '2026-02-05T15:11:39.219Z'
  author: CI/CD Bot
content_hash: a5afda55def107d443dc46a03e313aec54136a982c22b01bf31d6198c20a95c0
---

## Document Text Selection

ARender is composed of different layers, which are :

- Content Layer (Lower layer) : Each pages are shown as images
- Text Layer (Middle layer) : User can select, copy, search or annotate text through document text
- Annotation Layer (Upper layer) : The user can view, create, modify annotations as separate objects

## How to select text

When the user hovers the mouse over the text, the cursor becomes an I-beam pointer.
The user can click and drag the mouse over part or the whole word to select and copy or annotate the text. The selected text is then highlighted.
To copy the selected text, the user can press and hold the CTRL button then press the key C (CTRL+C).
Once copied, he can paste the text into another software application.
The user can, as well, double click on a word to select it.

![image](pathname:///img/arender/selection-character.png)

## Text Selection - Character by Character

By default, text selection highlights character by character :

![image](pathname:///img/arender/selection-character-demo.gif)

## Text Selection - Word by Word

ARender version 4.1.x introduces a new text selection feature that improves word processing.

Every time a word (or a part of it) is selected, the selection is automatically expanded to include the entire word.

![image](pathname:///img/arender/selection-word-demo.gif)

The user has the option to override this behavior by changing the direction in which the mouse pointer is being dragged as the selection is made.
This action undoes the automatic selection of the entire word, and allows the user to precisely select part or the entire word.

![image](pathname:///img/arender/selection-word-reversing-demo.gif)

To enable the new feature, please refer to the dedicated configuration [here](/v4/configuration/web-ui/textselection.md)

## Text Selection - Line

Since ARender version 4.7.3, you have the possibility to select an entire line with three clicks.

![image](pathname:///img/arender/selection-ligne.gif)

## Text Selection - Page

Since ARender version 4.7.3, you have the possibility to select an entire page with four clicks.

![image](pathname:///img/arender/selection-page.gif)

## Text Selection - Entire document

ARender version 4.8.0 introduces the selection of all the text of the current document. This feature is available through a button in the
 toppanel which is disabled by default.

To activate the button, add the following property to the *arender.properties* configuration file :

```cfg title="arender.properties"
# Activate the copy all text of the document button
topPanel.copy.document.text=true
```

![image](pathname:///img/arender/documentation/selection/selection-text-document-bouton.png)

When clicked, the button will launch the retrieval of the text of each page of the current document. The progress of the copy will be indicated
 by a notification at the bottom right. Once the copying of the text is finished, a notification will again be visible to inform the user.

![image](pathname:///img/arender/documentation/selection/selection-text-document-activation.gif)

## Text Selection - By zone

Since ARender version 4.5.x, you have the possibility to select text in a zone.

The user can do `CTRL + left-click` or `ALT + left-click` to start the text selection by zone.

![image](pathname:///img/arender/selection-zone.gif)
