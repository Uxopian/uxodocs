---
title: Hyperlink
sidebar_position: 6
last_update:
  date: '2026-02-02T12:16:59.945Z'
  author: CI/CD Bot
content_hash: 6c8205b503e4551bd96e11d24c70b80489be6c139a74941e62656697cf422082
---

## Description

The creation of a hyperlink can be done in several ways with ARender but always needs the same elements for their creation. 
First of all the selected text which will be the clickable text of the hyperlink, 
then you will need a target which can be a page number of the current document or a URL.

## How to use it

### Contextual menu

First, select the text that will be the hyperlink. Then right-click and click on the *Create a link* option.

![image](/img/arender/documentation/hyperlinks/hyperlink1.png)

Then a window appears where you must choose the type of link, either a URL or a page number of the current document.

![image](/img/arender/documentation/hyperlinks/hyperlink2.png)

Once the choice is made, press *Validate*. The hyperlink has been created.

![image](/img/arender/documentation/hyperlinks/hyperlink3.png)

### Since version 4.8.0

#### Creation button

A button is available in the toppanel for hyperlink creation. This button is disabled by default. It is also possible to create hyperlinks in repeat mode.

| Property                                 | Description                                              | Default value     |
| ---------------------------------------- | -------------------------------------------------------- | ----------------- |
| topPanel.annotationMenu.hyperlink        | Activate the hyperlink annotation button                 | false             |
| topPanel.annotationMenu.hyperlink.repeat | Activate the hyperlink annotation button for repeat mode | false             |

```cfg title="arender.properties"

topPanel.annotationMenu.hyperlink=true
topPanel.annotationMenu.hyperlink.repeat=true

```

![image](/img/arender/documentation/hyperlinks/hyperlink4.png)

On clicking the button, you will be asked to select the text where the hyperlink will be.

![image](/img/arender/documentation/hyperlinks/hyperlink5.png)

 After selection, the cursor changes into a target to let you know that a target is needed for the hyperlink.

![image](/img/arender/documentation/hyperlinks/hyperlink6.png) 
 
Click on the page of the current document that you choose as target to create the hyperlink.

:::note 


If you are at the target selection and you made a wrong text selection, you can use the *Esc* key to return to the text selection.

:::

#### Javascript API

It is possible to provide a target from outside ARender with javascript. To do this, you must register a function that will be 
executed when ARender enters or exits target selection mode.

```js title=""

    var waitingTarget = false;

    function arenderjs_init(arenderjs_)
    {
        arenderjs_.registerNotifyHyperlinkToggleTargetModeEvent(function(activated){
            if(activated)
            {
                waitingTarget = true;
            }
            else
            {
                waitingTarget = false;
            }
        });
    }

```

Next, you will need a function to send the target to ARender when the target selection mode is activated.

```js title=""

   function armt_notifyHyperlinkTarget(target)
    {
        if(waitingTarget)
        {
            getARenderJS().notifyHyperlinkTarget(target);
            waitingTarget = false;
        } 
    }

```
