---
title: Perform a search
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: f4af785c3d6787ab749ef761794ea28889e963a8af7290f7c36cf56577714753
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The JavaScript API functions <i class="ti-hand-point-right" /> <ins>[described here](/docs/arender/development/apis/web-ui/javascript/search-js-api)</ins> <i class="ti-hand-point-left" ></i> allow you to launch a textual search on an open document, to highlight and position yourself on specific text elements on the ARender viewer.

To use them from an application other than ARender, simply make the call from the iframe's `window` object. The code to access this object will vary slightly depending on the framework used. Below is an example of a simple search for the term "ARender." To navigate to the next result, you can call the same function again. For more information on simple search and advanced search usage, refer to the documentation mentioned above.


<Tabs>
<TabItem value="react" label="ReactJS">
```javascript
const iframeWindow = iframeRef.current.contentWindow;
iframeWindow.getARenderJS().getSearchJSAPI().askSearchTextNext("arender");
```
</TabItem>

<TabItem value="angular" label="Angular">
```javascript
const iframeWindow = this.iframeRef.nativeElement.contentWindow;
iframeWindow.getARenderJS().getSearchJSAPI().askSearchTextNext("arender");
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

function askSearchTextNext(text) {
  getARenderJS()
    .getSearchJSAPI()
    .askSearchTextNext(text)
}

/**
 * Expose the `askSearchTextNext` function to the parent component.
 */
defineExpose({
  askSearchTextNext
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
 * Asks ARender to search for the next occurrence of the given text.
 * @param text The text to search for.
 */
export function askSearchTextNext(text) {
  getARenderJS()
    .getSearchJSAPI()
    .askSearchTextNext(text)
}
```
</TabItem>

<TabItem value="javascript" label="Javascript">
```javascript
function search() {
  const iframe = document.getElementById('arender-iframe');
  if (iframe && iframe.contentWindow) {
    const iframeWindow = iframe.contentWindow;
    iframeWindow.getARenderJS().getSearchJSAPI().askSearchTextNext("arender");
  } else {
    console.error('Iframe or contentWindow is not accessible.');
  }
}
```
</TabItem>
</Tabs>
