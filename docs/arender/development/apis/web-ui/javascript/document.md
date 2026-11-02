---
title: Opening a document
last_update:
  date: '2026-03-13T11:59:21.642Z'
  author: CI/CD Bot
content_hash: 4bf2d366cfe4d06fcd896a14ebb782c35a157b5f98c0f3f2288b953a908ac8f9
---

## Opening documents

- Object: getARenderJS()

<table>
  <thead>
    <tr>
      <th>Function</th>
      <th>Description</th>
      <th>Arguments</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>loadDocument(url, callback)</td>
      <td>
        Loads a document providing an URL. It will provide an ARender Id back.
        <p><em><strong>Note</strong>: This is purely a server-side operation, asynchronous at client side.</em></p>
      </td>
      <td>
        <p><strong>url:</strong> the URL to open;<br/>
        <strong>callback:</strong> the callback function to call when the Id is provided by the server.</p>
      </td>
    </tr>
    <tr>
      <td>openDocument(id, resetUI)</td>
      <td>Opens a document with the <strong>id</strong>.<br/> If the value of <strong>resetUI</strong> is true, or if it is not provided, the UI resets to its initial state; otherwise, the UI remains unchanged.</td>
      <td><strong>id:</strong> ARender id<br/> <strong>resetUI:</strong> Reset or not the UI</td>
    </tr>
    <tr>
      <td>askChangePage(type, index)</td>
      <td>Changes the current page.</td>
      <td>
        <p><strong>type:</strong> 'Relative', 'Index' or 'Absolute';<br/>
        <strong>index:</strong> -1 or 1 for 'Relative' or 'Absolute', otherwise the page number.</p>
      </td>
    </tr>
    <tr>
      <td>askChangePage(type, index, position, centerPosition)</td>
      <td>
        Changes the current page and goes to a position in it. The position is centered in the view, unless
        <strong>centerPosition</strong> is false: it is then placed at the top of the view, as an internal hyperlink
        click does.
        <p><em><strong>Note</strong>: centerPosition is available since 2023.24.0.</em></p>
      </td>
      <td>
        <p><strong>type, index:</strong> as above;<br/>
        <strong>position:</strong> a position built by newPageRelativePosition();<br/>
        <strong>centerPosition:</strong> optional, true by default.</p>
      </td>
    </tr>
    <tr>
      <td>newPageRelativePosition(x, y, w, h)</td>
      <td>Builds a position rectangle for askChangePage(), in page points (1/72 inch) from the top-left corner of the page.</td>
      <td><strong>x, y, w, h:</strong> the coordinates, width and height of the rectangle, in page points.</td>
    </tr>
    <tr>
      <td>enablePDFDocumentHyperlinks(boolean)</td>
      <td>Activate/de-activate the internal hyperlinks of a document.</td>
      <td><strong>boolean:</strong> Load internal hyperlinks of a document if true, unload them otherwise.</td>
    </tr>
    <tr>
      <td>disallowClickOnHyperlinks(boolean)</td>
      <td>Allow/disallow clicks on a document hyperlink for ARender.</td>
      <td><strong>boolean:</strong> if true, disallow internal hyperlinks of a document, allow them otherwise.</td>
    </tr>
  </tbody>
</table>

```js
// Loads the PDF reference document
getARenderJS().loadDocument(
  "loadingQuery?url=http://www.arender.fr/pdf/pdf/PDFReference15_v5.pdf",
  function (id) {
    getARenderJS().openDocument(id);
  }
);
// Move to page 24 (note that page index is starting at 0. So page 1 has index 0)
getARenderJS().askChangePage("Index", 23);
// Move to last page
getARenderJS().askChangePage("Absolute", 1);
```

Coordinates are page points, not fractions of the page: `y = 421` is the middle of an A4 page, which is 842 points
high. A PDF destination counts its top from the bottom of the page, so convert it with `y = pageHeight - top`. A
centered change aims at the center of the rectangle: with `w = h = 0`, it aims at `x, y`.

```js
var position = getARenderJS().newPageRelativePosition(0, 421, 0, 0);
// Center the middle of the third page in the view
getARenderJS().askChangePage("Index", 2, position);
// Put the middle of the third page at the top of the view
getARenderJS().askChangePage("Index", 2, position, false);
```

In the example above, **loadDocument** returns an ID (in the form of a string starting with "b64\_") that will allow manipulation of the document in the ARender view.

**openDocument** is then called with the ID of the loaded document as a parameter, thereby displaying the document in question.

## Multiple document opening

ARender provides the possibility to open several documents by loading a list of documents which will be provided via JSON in order to define the tree structure. All the technical details can be found [here](/docs/arender/learn/how-to/composite-accessors)

## Get opening document time

- Object: getARenderJS()

| Function                                              | Description                                       | Arguments                                   |
| ----------------------------------------------------- | ------------------------------------------------- | ------------------------------------------- |
| registerFirstPageLoaded(notifyFirstPageLoadedHandler) | Register a hook to get the first page loaded time | **callback:** the callback function to call |

```js
getARenderJS().registerFirstPageLoaded(function(documentId, time) {
  console.error("DocumentId = " + documentId + ", time = " + time);
});
```
