---
title: Overview
sidebar_position: 1
last_update:
  date: '2026-02-27T09:15:17.464Z'
  author: CI/CD Bot
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Welcome to the ARender Framework Integration Documentation.
This guide will walk you through the process of integrating ARender into your application and learn how to interact with it.

This tutorial details the integration of ARender as well as the use of some basic features for the following frameworks:

**React, Angular, Vuejs, Svelte** and pure **JavaScript**.

<div style={{display: 'flex', justifyContent: 'space-between'}}>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <img
        src="/img/arender/icons/react-logo.png"
        alt="React logo"
        style={{height: '22px', width: '22px', marginRight: '10px'}} />
      <p style={{marginBottom: '5px'}}>React</p>
    </div>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <img
        src="/img/arender/icons/angular-logo.png"
        alt="Angular logo"
        style={{height: '22px', width: '22px', marginRight: '10px'}} />
      <p style={{marginBottom: '5px'}}>Angular</p>
    </div>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <img
        src="/img/arender/icons/vue_logo.png"
        alt="Vue.js logo"
        style={{height: '22px', width: '22px', marginRight: '10px'}} />
      <p style={{marginBottom: '5px'}}>Vue.js</p>
    </div>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <img
        src="/img/arender/icons/svelte-logo.png"
        alt="Svelte logo"
        style={{height: '22px', width: '22px', marginRight: '10px'}} />
      <p style={{marginBottom: '5px'}}>Svelte</p>
    </div>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <img
        src="/img/arender/icons/javascript-logo.png"
        alt="JavaScript logo"
        style={{height: '22px', width: '22px', marginRight: '10px'}} />
      <p style={{marginBottom: '5px'}}>JavaScript</p>
    </div>
  </div>

However, <b>ARender can be added <ins>to all types of JavaScript based applications</ins></b>, not only the frameworks shown here.

## Prerequisites
- Before embarking on framework integration, ensure that you have a front-end application using **React, Angular, Vue, Svelte, or plain JavaScript**.
- <i class="ti-hand-point-right"></i> <ins>[The ARender installation]("/installation")</ins> <i class="ti-hand-point-left" ></i> must have been completed.
- You must have implemented one of the solutions detailed below to avoid CORS-type errors when communicating between the host application and ARender.

## Avoid CORS-type errors

The host application will communicate with ARender using various functions provided in the window object of ARender, accessible from an iframe.
However, browsers enforce the Same-Origin Policy, and if ARender and the host application are on different domains, the requests in question will be blocked by the browser.
To avoid this, here are four possible solutions, detailed below, with different approaches:

- 1 - Using an nginx reverse proxy
- 2 - Installing ARender and the host application on the same server, same port, same protocol
- 3 - Disabling the browser's CORS restrictions
- 4 - Communication via PostMessage

### 1) Using an nginx Reverse Proxy

A **reverse proxy** acts as an intermediary between clients and servers and can inject the necessary CORS headers into the responses of requests. This facilitates cross-domain communications by making the proxy behave as the target server, thereby bypassing the security restrictions imposed by the Same-Origin Policy.
In this example, we use nginx.

Download the latest LTS version from the nginx website (the test was conducted with nginx-1.26.2).
After extraction, access the nginx config directory and modify the config.conf file with the following configuration:

```conf title="config.conf"
# Main Nginx configuration
worker_processes 1;

events {
    # Define the maximum number of simultaneous connections
    worker_connections 1024;
}

http {
  server {
    listen 8087;
    server_name  localhost;

    # Reverse proxy for the host application
    location / {
      proxy_pass http://localhost:5173/;
      proxy_http_version 1.1;
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }

    # Reverse proxy for ARender
    location /arender-app/ {
      proxy_pass http://localhost:8080/;
      proxy_http_version 1.1;
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;

      # Add CORS header for ARender Application
      add_header Access-Control-Allow-Origin *;
      add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
      add_header Access-Control-Allow-Headers 'Origin, Content-Type, Accept, Authorization';
    }
  }
}
```

Replace the proxy-pass values for the host application and ARender with the URLs where the two applications are running.
The reverse proxy is configured here to run on localhost:8087.

- Be sure to save the changes to the configuration file and start nginx (if using Windows, double-click on the nginx.exe executable).
Note: If you make any further changes to the configuration file, you will need to stop the nginx process (in the Task Manager, right-click on nginx in Background Processes and click on End Task) and restart it (double-click on the executable).

The configuration above allows access to your host application on the port localhost:8087 and to ARender on localhost:8087/arender-app. This latter address should be used as the base URL for accessing ARender when embedding the iframe.

### 2) Installing Both Applications on the Same Server, Same Port, Same Protocol

In this scenario, to avoid errors when communicating between applications from different origins, both applications are placed on the **same server and same port**. For proper operation, both applications must also use the **same protocol** (HTTP or HTTPS).

For example, the host application will be located at http://host-app.com, and the ARender application will be located at http://host-app.com/arender-app.
ARender will then be considered a sub-application of the host application.

However, it is important to keep in mind that, in terms of security, this is not necessarily the optimal solution for resource sharing and security: if one of the applications were compromised, the other would be as well.

### 3) Disabling Browser CORS Restrictions

This solution is quick and easy to implement. It involves launching your browser *without CORS restrictions* or using a browser extension to disable them.
This is, of course, a **very bad practice in a production environment**, but it can be suitable for quick testing in local development.

### 4) PostMessage

It is possible to keep different domains for the host application and ARender by using the window.postMessage method, which allows secure cross-domain communication.

To do so, you must add <i class="ti-hand-point-right"></i> <ins>[the initialization script]("/guides/configurations/web-ui/properties/full-config#arenderjs")</ins> <i class="ti-hand-point-left" ></i> on the ARender side :


```javascript
function arenderjs_init(arenderjs_) {

  function receiveMessage(event) {
    if (event.origin !== "http://localhost:8080") return; // Indicate ARender server url
    // Add here the actions to do on ARender side inside if conditions, for example :
    if (event.data.type === "getCurrentDocumentId") {
      event.source.postMessage(
        { type: "getCurrentDocumentIdResponse", payload: getARenderJS().getCurrentDocumentId() },
        event.origin,
      );
    }
  }

  window.addEventListener("message", receiveMessage, false);
}
```

In this documentation, the script is named "arender-custom-starter-script.js", but this name is customizable; you just need to adapt the URL accordingly on the host application's side.

- If you have used the ARender HMI Spring Boot (JAR) installation file for the ARender installation, place the initialization script in the public directory. The URL to use in the next step will then be: "./arender-custom-starter-script.js".
- If you use a Tomcat server, place the script in the scripts directory. The URL to use in the next step will then be: "./scripts/arender-custom-starter-script.js".

<p>This script must include the function <b>arenderjs_init(arenderjs_)</b>, which will allow interaction with ARender. In this function, you can configure actions of your choice, notably adding an event listener for messages received via postMessage, as well as a receiveMessage(event) function, which will be called whenever a message is received.</p>

<p>In the receiveMessage function, a <b>verification of the origin of the message</b> is performed, and you should specify the URL of the host application's server (e.g., localhost:5173 in the example). The purpose of this verification is to reject any requests that do not originate from the host application.</p>

You can then implement the desired actions based on the received message:
The example above involves retrieving the ID of the document currently displayed in ARender. It is decided that to trigger this request, the data passed to postMessage should be "getCurrentDocumentId".
In the example above, a message is sent back via the postMessage function to the host application (identified by event.origin, which corresponds to http://localhost:5173), with data in the form of a JSON object. The JSON includes a type for identifying the message on the host application's side and a payload with the corresponding ID, retrieved using the **getARenderJS().getCurrentDocumentId()** function provided by ARender. You can, of course, structure this JSON as you wish, or even replace it with a simple string.

Note: During initialization script testing, **ensure that ARender has been restarted with the updated version of the script**. Don't hesitate to use console.log() to verify the values when not seeing any difference.

On the host application's side, you will also need to set up an **event listener for postMessage** with an associated function.
Note: If you choose this solution, the following steps should be performed after implementing the iframe, described on the next page.

<ins>**Each interaction with the window object of the iframe described in the documentation will need to be adapted as postMessages exchanges, as window is not directly accessible from the host application in this scenario**.</ins>

This time, the implementation will vary depending on the framework used, as shown below. **Please create the files and components needed for your project and integrate the iframe as explained in the next page, then come back here to adapt them to postMessages as shown below**.


<Tabs>
<TabItem value="react" label="ReactJS">
In the component that integrates your iframe (see next page), add this code:

```javascript
useEffect(() => {
  const handleIframeResponseMessage = (event) => {
    // Check if the origin of the postMmessage is ARender (adapt the URL to your configuration) and do not process the message if it is not the case
    if (event.origin !== "http://localhost:8080") {
      console.warn("Unsafe origin: the message was ignored");
      return;
    }

    // Add some if conditions to adapt the response according to the value of event.data
    // For example :
    if (event.data.type === "getCurrentDocumentIdResponse") {
      console.log("Current document id", event.data.payload)
    }
  };

  // Event listener creations for postMessage messages.
  window.addEventListener("message", handleIframeResponseMessage);

  // This return allows the subscription to be closed when the react component unloads.
  return () => {
    window.removeEventListener("message", handleIframeResponseMessage);
  };
}, []);

// Function to send a postMessage to ask for the id of the currently loaded document.
function testCallUsingPostMessage() {
  if (iframeRef.current) {
    iframeRef.current.contentWindow.postMessage(
      { type: "getCurrentDocumentId" }, "http://localhost:8080/");
  }
}
```

You also need to modify the URL specified in the iframe so that the initialization script is taken into account, if it hasn't been done in the parameters file, and add, for example, a button to test the function:

```javascript
<iframe ref={iframeRef} title='integrated-arender' id='arender-iframe'
  src='http://localhost:8080/arondor-arender-hmi/?arenderjs.startupScript=scripts/arender-custom-starter-script.js'
  allow='microphone' />

<button className="button" onClick={()=> testCallUsingPostMessage()}>testCallUsingPostMessage</button>
```
</TabItem>

<TabItem value="angular" label="Angular">
In Angular, you can use a service to manage the creation and removal of the event listener, messageHandlerService.ts:

```javascript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageHandlerService {
  private messageListener?: (event: MessageEvent) => void;

  addMessageListener(listener: (event: MessageEvent) => void): void {
    this.messageListener = listener;
    window.addEventListener('message', this.messageListener);
  }

  removeMessageListener(): void {
    if (this.messageListener) {
      window.removeEventListener('message', this.messageListener);
      this.messageListener = undefined;
    }
  }
}
```

Then, update arender.component.ts this way :

```javascript
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageHandlerService } from '../messageHandlerService';

@Component({
  selector: 'app-arender',
  standalone: false,
  
  templateUrl: './arender.component.html',
  styleUrl: './arender.component.css'
})
export class ArenderComponent {
  @ViewChild('iframeRef', { static: false }) iframeRef!: ElementRef<HTMLIFrameElement>; // Référence à l'iframe
  arenderIsDisplayed: boolean = true;

  constructor(private messageHandler: MessageHandlerService) {}

  ngOnInit(): void {
    const handleIframeResponseMessage = (event: MessageEvent) => {
      // Check event origin
      if (event.origin !== "http://localhost:8080") return;
      console.log("event received", event.data)
      if (event.data.type === 'getCurrentDocumentIdResponse') {
        console.log('Current document id', event.data.payload);
      }
    };

    this.messageHandler.addMessageListener(handleIframeResponseMessage);
  }

  ngOnDestroy(): void {
    this.messageHandler.removeMessageListener();
  }

  testCallUsingPostMessage(): void {
    if (this.iframeRef && this.iframeRef.nativeElement.contentWindow) {
      this.iframeRef.nativeElement.contentWindow.postMessage(
        { type: 'getCurrentDocumentId' },
        'http://localhost:8080/'
      );
    }
  }
}
```

Finally, in the arender.component.html, add the initialization script url as a parameter to the iframe url :

```javascript
<iframe
  #iframeRef
  class="iframe" 
  [class.hidden]="!arenderIsDisplayed" 
  title="integrated-arender"
  id="arender-iframe"
  src="http://localhost:8080/arondor-arender-hmi/?arenderjs.startupScript=scripts/arender-custom-starter-script.js"
  allow="microphone"
></iframe>
<button (click)="testCallUsingPostMessage()">Test call using postMessage</button>
```

Don't forget to modify the ARender initialization script with the port of your Angular application (e.g., localhost:4200).
</TabItem>

<TabItem value="vue" label="VueJS">
In the component that integrates your iframe (see next page), add this code:

```javascript
const iframeRef = ref(null)
onMounted(() => {
  const handleIframeResponseMessage = (event) => {
    // Add some if conditions to adapt the response according to the value of event.data
    // For example :
    if (event.data.type === "getCurrentDocumentIdResponse") {
      console.log("Current document id", event.data.payload)
    }
  };

  // Event listener creations for postMessage messages.
  window.addEventListener("message", handleIframeResponseMessage);

  // Thir return allows the subscription to be closed when the react component unloads.
  return () => {
    window.removeEventListener("message", handleIframeResponseMessage);
  };
});

// Function to send a postMessage to ask for the id of the currently loaded document.
function testCallUsingPostMessage() {
  if (iframeRef.value) {
    iframeRef.value.contentWindow?.postMessage(
      { type: 'getCurrentDocumentId' },
      'http://localhost:8080',
    )
  }
}
```

You also need to modify the URL specified in the iframe so that the initialization script is taken into account, if it hasn't been done in the parameters file, and add, for example, a button to test the function:

```html
<template>
  <iframe ref="iframeRef" title="integrated-arender" id="arender-iframe"
    src="http://localhost:8080/arondor-arender-hmi/?arenderjs.startupScript=scripts/arender-custom-starter-script.js"
    allow="microphone"></iframe>
  <button @click="testCallUsingPostMessage">testCallUsingPostMessage</button>
</template>
```
</TabItem>

<TabItem value="svelte" label="Svelte">
In the component that integrates your iframe (see next page), add this code:

```javascript
let iframeRef;
onMount(() => {
  const handleIframeResponseMessage = (event) => {
    // Add here the if conditions to adapt the response according to the value of event.data
    // For example :
    if (event.data.type === "getCurrentDocumentIdResponse") {
      console.log("Current document id", event.data.payload)
    }
  };

  // Creates the event listener for postMessages
  window.addEventListener("message", handleIframeResponseMessage);

  // This returns allows to close the subscription when unmounting the React component.
  return () => {
    window.removeEventListener("message", handleIframeResponseMessage);
  };
});

// Function to send a postMessage to ask for the currently loaded document
function testCallUsingPostMessage() {
  if (iframeRef) {
    iframeRef.contentWindow?.postMessage(
      { type: "getCurrentDocumentId" },
      "http://localhost:8080"
    );
  }
}
```

You also need to modify the URL specified in the iframe so that the initialization script is taken into account, if it hasn't been done in the parameters file, and add, for example, a button to test the function:

```javascript
<iframe
  bind:this={iframeRef}
  title='integrated-arender'
  id='arender-iframe'
  src='http://localhost:8080/arondor-arender-hmi/?arenderjs.startupScript=scripts/arender-custom-starter-script.js'         
  allow='microphone'
/>

<button class="button" onclick={testCallUsingPostMessage}>testCallUsingPostMessage</button>
```
</TabItem>

<TabItem value="javascript" label="Javascript">
In JavaScript, here is the procedure:
Add an event listener to the script to receive messages, along with a callback function to process the received message:

```javascript
// Function to handle messages from iframe
function handleIframeMessages(event) {
  if (event.origin !== "http://localhost:8080") return;

  console.log("Message received from iframe:", event.data);
  if (event.data.type === 'getCurrentDocumentIdResponse') {
    console.log('Current Document ID:', event.data.payload);
  }
}

// Add message listener
window.addEventListener('message', handleIframeMessages);
```

We then add a function to send a custom message:

```javascript
// Function to send a custom message to the iframe
function sendCustomMessage() {
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage(
      { type: 'getCurrentDocumentId' },
      'http://localhost:8080/'
    );
  } else {
    console.error('Iframe or contentWindow is not accessible.');
  }
}
```

And we add a button for the trigger (here, we add a function to create multiple buttons, which can be called for each button to be created).
We should also remember to add the parameter to the URL to load the initialization script when ARender launches:

```javascript
// Dynamically add buttons if not present
function addButton(id, text, clickHandler) {
  if (!document.getElementById(id)) {
    const button = document.createElement('button');
    button.id = id;
    button.textContent = text;
    button.addEventListener('click', clickHandler);
    document.body.appendChild(button);
  }
}

addButton('sendCustomMessageButton', 'Send Custom Message', sendCustomMessage);

setARenderUrl('http://localhost:8080/arondor-arender-hmi/?arenderjs.startupScript=scripts/arender-custom-starter-script.js'); // Set the URL
```
</TabItem>
</Tabs>