---
title: Add a highlight notification
last_update:
  date: '2026-03-06T18:23:33.786Z'
  author: CI/CD Bot
content_hash: 713e4fea174cc166fe8db64676e1054a984d3636c4a447a1218bb2e6b38c0b2a
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The JavaScript API allows you to set up subscriptions to receive events during various actions on ARender (e.g., adding/removing notifications, rotating a page, or clicking on a hyperlink). This information is accessible <i class="ti-hand-point-right" /> <ins>[in the documentation](/docs/arender/development/apis/web-ui/javascript/annotation-js-api)</ins> <i class="ti-hand-point-left" ></i>

It is also possible to create highlight-type annotations directly from the host application, without doing so manually in ARender, using the **addAnnotation** function of the JavaScript API by following <i class="ti-hand-point-right" /> <ins>[these guidelines](/docs/arender/development/apis/web-ui/javascript/annotation-js-api#create-an-highlight-annotation)</ins> <i class="ti-hand-point-left" ></i>.

To use this function from an application other than ARender, simply replace the window object in the documentation with the appropriate object based on the framework being used.


<Tabs>
<TabItem value="react" label="ReactJS">
```javascript
const iframeWindow = iframeRef.current.contentWindow;
/*
 * Add an highlight annotation
 *
 * @param {string} documentId - ID of the document
 * @param {string} type - the annotation type (only "Highlight" is supported)
 * @param {integer} x - the annotation x coordinate
 * @param {integer} y - the annotation y coordinate
 * @param {integer} w - the annotation width
 * @param {integer} h - the annotation height
 * @param {page} page - the annotation page
 * @param {string} color - the annotation color
 * @param {float} opacity - the annotation opacity
 */
var documentId = iframeWindow.getARenderJS().getCurrentDocumentId();
var type = "Highlight";
var x = 50;
var y = 150;
var w = 100;
var h = 50;
var page = 0;
var color = "#FF0000";
var opacity = 0.4;

iframeWindow
  .getARenderJS()
  .getAnnotationJSAPI()
  .addAnnotation(documentId, type, x, y, w, h, page, color, opacity);
```
</TabItem>

<TabItem value="angular" label="Angular">
```javascript
const iframeWindow = this.iframeRef.nativeElement.contentWindow;

/*
 * Add an highlight annotation
 *
 * @param {string} documentId - ID of the document
 * @param {string} type - the annotation type (only "Highlight" is supported)
 * @param {integer} x - the annotation x coordinate
 * @param {integer} y - the annotation y coordinate
 * @param {integer} w - the annotation width
 * @param {integer} h - the annotation height
 * @param {page} page - the annotation page
 * @param {string} color - the annotation color
 * @param {float} opacity - the annotation opacity
 */
var documentId = iframeWindow.getARenderJS().getCurrentDocumentId();
var type = "Highlight";
var x = 50;
var y = 150;
var w = 100;
var h = 50;
var page = 0;
var color = "#FF0000";
var opacity = 0.4;

iframeWindow
  .getARenderJS()
  .getAnnotationJSAPI()
  .addAnnotation(documentId, type, x, y, w, h, page, color, opacity);
```
</TabItem>

<TabItem value="vue" label="VueJS">
```javascript
/**
 * Returns the ARenderJS object from the iframe.
 * Throws an error if the iframe is not accessible or not loaded.
 */
function getARenderJS() {
  const iframeWindow = iframeRef.value?.contentWindow
    ? iframeRef.value.contentWindow
    : undefined

  if (iframeWindow) {
    return iframeWindow.getARenderJS()
  }
  throw new Error("The iframe is not accessible or not loaded.")
}

/**
 * Adds an annotation to the current document.
 * @param x The x coordinate of the annotation.
 * @param y The y coordinate of the annotation.
 * @param w The width of the annotation.
 * @param h The height of the annotation.
 * @param page The page number of the annotation.
 * @param color The color of the annotation.
 * @param opacity The opacity of the annotation.
 * @param type The type of the annotation.
 */
function addAnnotation(x, y, w, h, page, color, opacity, type = "Highlight") {
  const documentId = getARenderJS().getCurrentDocumentId()
  getARenderJS()
    .getAnnotationJSAPI()
    .addAnnotation(documentId, type, x, y, w, h, page, color, opacity)
}

/**
 * Expose the `addAnnotation` function to the parent component.
 */
defineExpose({
  addAnnotation
})
```
</TabItem>

<TabItem value="svelte" label="Svelte">
```javascript
/**
 * Returns the ARenderJS object from the iframe.
 * Throws an error if the iframe is not accessible or not loaded.
 */
function getARenderJS() {
  const iframeWindow = iframeRef?.contentWindow
    ? iframeRef.contentWindow
    : undefined

  if (iframeWindow) {
    return iframeWindow.getARenderJS()
  }
  throw new Error("The iframe is not accessible or not loaded.")
}

/**
 * Adds an annotation to the current document.
 * @param x The x coordinate of the annotation.
 * @param y The y coordinate of the annotation.
 * @param w The width of the annotation.
 * @param h The height of the annotation.
 * @param page The page number of the annotation.
 * @param color The color of the annotation.
 * @param opacity The opacity of the annotation.
 * @param type The type of the annotation.
 */
export function addAnnotation(
  x,
  y,
  w,
  h,
  page,
  color,
  opacity,
  type = "Highlight"
) {
  let documentId = getARenderJS().getCurrentDocumentId()
  getARenderJS()
    .getAnnotationJSAPI()
    .addAnnotation(documentId, type, x, y, w, h, page, color, opacity)
}
```
</TabItem>

<TabItem value="javascript" label="Javascript">

```javascript
/*
 * Add an highlight annotation
 *
 * @param {string} documentId - ID of the document
 * @param {string} type - the annotation type (only "Highlight" is supported)
 * @param {integer} x - the annotation x coordinate
 * @param {integer} y - the annotation y coordinate
 * @param {integer} w - the annotation width
 * @param {integer} h - the annotation height
 * @param {page} page - the annotation page
 * @param {string} color - the annotation color
 * @param {float} opacity - the annotation opacity
 */

var documentId = iframeWindow.getARenderJS().getCurrentDocumentId();
var type = "Highlight";
var x = 50;
var y = 150;
var w = 100;
var h = 50;
var page = 0;
var color = "#FF0000";
var opacity = 0.4;

const iframe = document.getElementById('arender-iframe');
if (iframe && iframe.contentWindow) {
  getARenderJS().getAnnotationJSAPI().addAnnotation(
    documentId, type, x, y, w, h, page, color, opacity);
} else {
  console.error("The iframe is inaccessible or not loaded yet.");
}
```
</TabItem>
</Tabs>
