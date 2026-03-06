---
title: Embed ARender in an application
last_update:
  date: '2026-03-06T18:23:33.786Z'
  author: CI/CD Bot
content_hash: a86d5fa9933959201e4b4f1d5305197a86c08f961a68d2ac0de918c24d07f964
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

To integrate ARender into your application, simply add an iframe tag pointing to the ARender server in the HTML code of your application.

## 1. Embedding the iframe

The ARender iframe should be inserted into your application at the most relevant location, depending on your use of ARender.

Here is a minimal example compatible with any type of framework:

```html
<iframe id="arender-iframe" src="Insert the ARender URL here" title="Integrated ARender iframe" allow="microphone"></iframe>
```

- The **id** uniquely identifies the iframe and allows its instance to be retrieved in JavaScript:
  `const iframe = document.getElementById('arender-iframe');`
- The **src** parameter must contain the URL of the installed version of ARender.
- The **title** provides a textual description of the iframe's content for accessibility purposes.
- The **allow='microphone'** parameter is essential to enable the use of voice annotations in ARender.

At this stage of the ARender integration, an iframe pointing to ARender appears in the DOM of the host application. However, it might not yet be visible depending on where it is integrated into the host application. You will need to define its position and dimensions, as shown in the example below.

## 2. Framework Information

ARender integration tests have been conducted with the following versions:

- React : version 18.3.1
- Angular : version 19.0.0
- VueJs : version 3.5.13
- Svelte : version 5.19.0

<p>- Create a component called ARender.tsx or ARender.jsx and insert the iframe as shown in the code below. The component can then be instantiated wherever you need it using the tag: `<ARender />`</p>
<p>- In React, you can use a <b>reference</b> to interact with the iframe using the <b>ref</b> parameter, instead of using an ID query.</p>
<p>- You can also style the iframe by adding the <b>classname</b> parameter.</p> <p>- Finally, the URL associated with the iframe through the <b>src</b> parameter can be made dynamic, allowing it to be modified dynamically.</p>


<Tabs>
<TabItem value="react" label="ReactJS">
<p>- Create a component called ARender.tsx or ARender.jsx and insert the iframe as shown in the code below. The component can then be instantiated wherever you need it using the tag: `<ARender />`</p>
<p>- In React, you can use a <b>reference</b> to interact with the iframe using the <b>ref</b> parameter, instead of using an ID query.</p>
<p>- You can also style the iframe by adding the <b>classname</b> parameter.</p> <p>- Finally, the URL associated with the iframe through the <b>src</b> parameter can be made dynamic, allowing it to be modified dynamically.</p>

```javascript title="ARender.component.tsx"
import { useRef, useState } from "react";

function ARender() {
  const iframeRef = useRef(null);
  const [arenderUrl, setARenderUrl] = useState('')
  // A dynamic url allow you to update easily the parameters
  const [arenderIsDisplayed, setArenderIsDisplayed] = useState(true)

  return (
    <>
      {
        <iframe
          ref={iframeRef}
          className={`iframe ${arenderIsDisplayed ? '' : 'hidden'}`}
          title='integrated-arender'
          id='arender-iframe'
          src={arenderUrl}
          allow='microphone'
        />
      }
    </>
  );
}
export default ARender;
```
</TabItem>

<TabItem value="angular" label="Angular">
- Create an angular component (you can do it using this CLI command :
  <code>ng generate component Arender</code>)
- Fill typescript and html files as presented below :

```javascript title="arender.component.ts"
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-arender',
  templateUrl: './arender.component.html',
  styleUrls: ['./arender.component.css']
})
export class ARenderComponent {
  @ViewChild('iframeRef', { static: false }) iframeRef!: ElementRef<HTMLIFrameElement>; // Reference to the iframe
  arenderIsDisplayed: boolean = true; // Controls the iframe visibility
}
```
```html title="arender.component.html"
<!-- Set the src attribute with ARender URL-->
<iframe #iframeRef class="iframe" [class.hidden]="!arenderIsDisplayed" title="integrated-arender" id="arender-iframe"
  src="" allow="microphone"></iframe>
```

<p>- Add ARenderComponent to the main module (file app.module.ts) if necessary by adding the arender component to the declarations list.</p>

<p>- Insert the component into the application by placing this tag in the HTML code of the appropriate file: <code><app-arender></app-arender></code></p>

<p>- The <code>@ViewChild</code> attribute will allow easy interaction with the iframe without needing to use getElementById.</p>
</TabItem>

<TabItem value="vue" label="VueJS">
<h4> Installation </h4>
- Create a new file named ARenderItem.vue and insert the following code:

```html title="ArenderItem.vue"
<script setup>
  import { ref } from "vue";

  const { arenderIsDisplayed = true } = defineProps();
  const iframeRef = ref(null);
</script>

<template>
  <iframe ref="iframeRef" :class="{ hidden: !arenderIsDisplayed }" class="iframe" title="integrated-arender"
    id="arender-iframe" :src="arenderUrl" allow="microphone"></iframe>
</template>

<style scoped>
  iframe {
    ...
  }
</style>
```

<h4>Usage</h4>

You can use the ARender component in your Vue application as follows:

```html title="App.vue"
<script setup>
  import Arender from "./components/ArenderItem.vue";
  import { ref } from "vue";
</script>

<template>
  <Arender ref="arenderRef" />
</template>
```

<h4>Features</h4>
<ol>
  <li>
    <strong>- Dynamic iframe visibility: </strong> 
    The arenderIsDisplayed prop controls whether the iframe is shown or hidden.
  </li>

  <li>
    <strong> - Direct iframe reference: </strong> 
    The iframeRef prop binds the iframe element, allowing direct interaction.
  </li>

  <li>
    <strong> - Custom styling: </strong> 
    The iframe can be styled using CSS classes.
  </li>
  <li>
    <strong> - Dynamic URL: </strong> 
    You can modify the iframe source dynamically by updating the src attribute.
  </li>
</ol>
</TabItem>

<TabItem value="svelte" label="Svelte">
<h4> Installation </h4>
- Create a new file named ARender.svelte and insert the following code:

```html title="Arender.svelte"
<script>
  let { arenderIsDisplayed = $bindable(true), iframeRef = $bindable() } = $props();
</script>

<iframe bind:this={iframeRef} class="iframe" class:hidden={!arenderIsDisplayed} title="integrated-arender"
  id="arender-iframe" src="" <!-- Add Arender url here -->
  allow="microphone"
  ></iframe>

<style>
  ...
</style>
```

<h4>Usage</h4>

You can use the ARender component in your Svelte application as follows:

```html title="+page.svelte"
<script>
  import Arender from "$components/Arender.svelte";
</script>

<Arender bind:iframeRef />
```

<h4>Features</h4>

<ol>
  <li>
    <strong>- Dynamic iframe visibility: </strong> 
    The arenderIsDisplayed prop controls whether the iframe is shown or hidden.
  </li>
  <li>
    <strong> - Direct iframe reference: </strong> 
    The iframeRef prop binds the iframe element, allowing direct interaction.
  </li>
  <li>
    <strong> - Custom styling: </strong> 
    The iframe can be styled using CSS classes.
  </li>
  <li>
    <strong> - Dynamic URL: </strong> 
    You can modify the iframe source dynamically by updating the src attribute.
  </li>
</ol>
</TabItem>

<TabItem value="javascript" label="Javascript">
To integrate with pure CSS, without using a specific framework, create the following script file:

```javascript title="index.js"
document.addEventListener('DOMContentLoaded', function () {
  // Iframe creation
  const iframe = document.createElement('iframe');
  iframe.title = 'integrated-arender';
  iframe.id = 'arender-iframe';
  iframe.allow = 'microphone';

  // Variables for the URL and the iframe states
  let arenderUrl = '';
  let arenderIsDisplayed = true;

  // Add attributes to iframe
  function updateIframe() {
    iframe.src = arenderUrl;
    iframe.className = arenderIsDisplayed ? 'iframe' : 'hidden';
  }
  // Add the iframe to the HTML body
  document.body.appendChild(iframe);

  // Function to update the HTML after an url change in the iframe
  function setARenderUrl(newUrl) {
    arenderUrl = newUrl;
    updateIframe();
  }
  // Display / hide iframe
  function toggleArenderVisibility() {
    arenderIsDisplayed = !arenderIsDisplayed;
    updateIframe();
  }
  // Initial update to manage the display of the iframe and the url
  updateIframe();

  // Add ARender URL
  setARenderUrl(''); // <= Add ARender URL here

  // Listen to the button click
  const toggleButton = document.getElementById('toggleButton');
  toggleButton.addEventListener('click', function () {
    toggleArenderVisibility();
  });
});
```

This script waits for the HTML document's DOM to load, creates an iframe element with the necessary parameters, and adds the element to the DOM.

Then add the script to the HTML file of your choice :

```html title="index.html"
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <button id="toggleButton">Afficher / Masquer l'iframe</button>

  <script src="./index.js"></script>
</body>

</html>
```
In this example, a button has been added to dynamically show/hide the iframe. (It will only work once the CSS is added in the next section.)
</TabItem>
</Tabs>



In this example, a 'hidden' class has been added to the iframe when we want to hide it (for example, by setting its width to 0px).

It is also possible to completely remove the iframe when it's not displayed, but this will result in a reload of ARender each time it's shown again.

You can <b>replicate this method of associating a button with code</b> to test the ARender features described in the following pages.

## 3. Style the iframe with CSS

The CSS classes associated with the iframe will allow us to style it.
Often, we want to display ARender on a fixed portion of the screen, occupying, for example, 60% of the screen width, and not disappearing during scrolling.
Here is an example of commented CSS:

```css
iframe {
  position: fixed;
  /* ARender will remain displayed even if you scroll in your application */
  top: 0;
  right: 0;
  width: 60%;
  /* 60% of screen width */
  transition: width 0.2s ease-in-out;
  /* Facultative transition when displaying d'ARender */
  height: 100%;
  /* Takes all screen height */
  border: none;
  /* Remove iframe borders */
  border-left: 1px solid var(--ar-color-gray-700);
  /* Add a customized border on the left side of the iframe to separate it from the rest of the application */

  &.hidden {
    width: 0px;
    /* Visualy hides ARender. ARender stays open to avoid reloading each time. */
    transition: width 0.2s ease-in-out;
    /* Facultative transition when hiding d'ARender */
  }
}
```
