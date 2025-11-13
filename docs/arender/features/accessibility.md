---
title: "Accessibility"
---







Since version 4.5, ARender has a better support for visually impaired users.

## Reading content

The content of the documents can be read by screen readers.

To enable this, the content of the document has been added in tags inside the DOM. 
These tags can be used by software and screen-reading extensions to read the content.

For example, when you use [the Screen Reader Google Chrome extension](https://chrome.google.com/webstore/detail/screen-reader/kgejglhpjiefppelpmljglcjbhoiplfn), and you double click items with the mouse, the extension reads the content.

## Alternative text

Images that give information have an alternative text with the CSS attribute `alt=` that allows other applications to read with a synthetic voice for the user to know if an action is possible by clicking or if the icon is just informing for something.

List of images and icons with alternative text :

- Buttons of top panel
- Annotations explorer
- Tabs in side panel
- Icons in navigation panel
- Thumbnails of pages of documents
- Icons of sticky notes


## Toasters

It is possible to set the display time of toasters.

| Property              | Description                                                        | Default value     |
| --------------------- | ------------------------------------------------------------------ | ----------------- |
| toaster.toast.timeout | Sets up the timeout for toaster notifications to be hidden (in ms) | 2000              |

Modifying the default value by the value *0* allows access to the toaster elements with the tabulation.




```cfg
toaster.toast.timeout=0
```




Therefore, it is possible to close or reset the notification panel.


They have the `role=alert` attribute. This allows the screen reader to inform the user that a toaster appears.


## Keyboard navigation 

### Use

It is possible to navigate in ARender with the tabulation key of keyboard. When an element is focused, an blue outline appears on it. 

Movements from left to right are done with the *tab* key. Conversely movements from right to left are done with the keys *shift + tab*.

Apply to: 
- Top panel buttons
- Sub-menus 
- Navigation buttons
- Pictree 
- The bookmark management buttons
- Search advanced buttons
- Hyperlink explorer buttons
- Edition panel buttons
- Color pickers
- Pop up
- Text box

The navigation of some elements does not work the same way:

- Keyboard arrows navigation: 
    - List box
    - Bookmarks
    - Radio buttons of the same radio group 
    - Check box of the same check box group

- *Ctrl + enter*:
    to enter in text boxes
    - Freetext
    - Sticky note 


### The design 

To set the outline, the following css classes must be changed:



```css
:focus-visible,
button:focus,
select:focus,


```properties
[type="checkbox"]:focus-visible+label,
[type="radio"]:focus-visible+label {
```

.simple-outline:focus-visible,
button:focus,
select:focus {

```



## Problems of color perception

New styles have been added to allow people with deuteranopia, protanopia or tritanopia to see colors that match with their needs.

Each of these color perception disorders has their own style. It is possible to change the appearance of the product with the following property and one of the values assigned:


| Description                                                                                                                                 | Parameter Key           | Default value     | Type    |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ----------------- | ------- |
| Change the colors. Will NOT work on Internet Explorer. Authorized value : LEGACY, DARK, LIGHT, CUSTOM, DEUTERANOPIA, PROTANOPIA, TRITANOPIA | preference.color.mode   | LEGACY            | String  |

If you want to change one of the colors, you can change the value of the associated variable in one of the following CSS classes:



```css
.deuteranopia-theme {

.protanopia-theme { 

.tritanopia-theme {

```



