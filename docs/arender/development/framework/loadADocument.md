---
title: Load a document
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: fc811370e89e0e3e914ee27775588eaa341e0ea891672e74ec237091f3710d3c
---

The JavaScript API allows easy interaction with ARender using various commands <i class="ti-hand-point-right" />[ listed here ](/docs/arender/development/apis/web-ui/javascript/js-api) <i class="ti-hand-point-left" ></i>.

## Load a document

The **loadDocument** and **openDocument** functions from the API, <i class="ti-hand-point-right" /><ins>[ described here ](/docs/arender/development/apis/web-ui/javascript/document)</ins><i class="ti-hand-point-left" ></i> allow you to load and open a document on the ARender server.

<p><i class="ti-alert" /> Note that document opening is secured, so only documents from your document space can be opened.</p>

### Implementation example from the iframe

JavaScript API requests are made on the window object of the iframe, as shown below.

```javascript
        const loadAndOpenDocument = () => {
          const iframeWindow = iframeRef.current?.contentWindow;

          if (iframeWindow) {
            iframeWindow.getARenderJS().loadDocument(
              "loadingQuery?url=url/du/document.zip",
              (id) => {
                console.log(id);
                iframeWindow.getARenderJS().openDocument(id);

            );
          } else {
            console.error("The iframe is not accessible or not loaded.");

        };
```

```javascript
        loadAndOpenDocument(): void {
        const iframeWindow = this.iframeRef.nativeElement.contentWindow;

        if (iframeWindow) {
          iframeWindow.getARenderJS().loadDocument(
            "loadingQuery?url=url/du/document.zip",
            (id: string) => {
              console.log(id);
              iframeWindow.getARenderJS().openDocument(id);

          );
        } else &#123;
          console.error("The iframe is not accessible or not loaded.");


```

```javascript
/**
 * Returns the ARenderJS object from the iframe.
 * Throws an error if the iframe is not accessible or not loaded.
 */
function getARenderJS() {
  const iframeWindow = iframeRef.value?.contentWindow
    ? iframeRef.value.contentWindow
    : undefined

  if (iframeWindow) &#123;
    return iframeWindow.getARenderJS()

  throw new Error("The iframe is not accessible or not loaded.")

/**
 * Loads and opens a document in ARender.
 * @param url The URL of the document to load.
 */
function loadAndOpenDocument(url) {
  getARenderJS().loadDocument("loadingQuery?url=" + url, id => {
    getARenderJS().openDocument(id)
  &#125;)

/**
 * Expose the `loadAndOpenDocument` function to the parent component.
 */
defineExpose({
  loadAndOpenDocument
&#125;)
```

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

  throw new Error("The iframe is not accessible or not loaded.")

/**
 * Loads and opens a document in ARender.
 * @param url The URL of the document to load.
 */
export function loadAndOpenDocument(url) {
  getARenderJS().loadDocument("loadingQuery?url=" + url, id => {
    getARenderJS().openDocument(id)
  })

```

<p><i class="ti-alert" /> Note that if you attempt to <ins>integrate ARender into a local directory</ins>, to interact with a local HTML file, you must first <b>serve it on the localhost port of your choice</b>.</p>

<p>You can do this easily in several ways, with Python, Node.js, PHP, or others. Here is an example with Python 3.x:</p>

<ul>
<li>Open a command prompt in the directory of the host application</li>
<li>Start the server with <code>http-server -p 8000</code> (Replace 8000 with the port of your choice)</li>
<li>Access the HTML file from your browser with the URL <code>http://localhost:8000/index.html</code></li>
</ul>

<p>To load and open a document in ARender, you can create the following function in the JavaScript file of the host application:</p>

```javascript
    function loadAndOpen() {
        const iframe = document.getElementById('arender-iframe');
        if (iframe && iframe.contentWindow) {
            iframeWindow.getARenderJS().loadDocument(
              "loadingQuery?url=", // pass the url of the document to load here, after the equal sign
              (id) => {
                console.log(id);
                iframeWindow.getARenderJS().openDocument(id);

            );
          } else {
            console.error("The iframe is inaccesible or has not loaded yet");


```
