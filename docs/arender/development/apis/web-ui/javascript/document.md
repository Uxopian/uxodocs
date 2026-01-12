---
title: Opening a document
last_update:
    date: "2025-12-02T14:26:41.610Z"
    author: CI/CD Bot
content_hash: 65f478f84461bf5d1cc64e20ad468e42ef7d5da500c52d866abce31c77b9e934
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
      <td>openDocument(id)</td>
      <td>Opens a document.</td>
      <td><strong>id:</strong> ARender id</td>
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

In the example above, **loadDocument** returns an ID (in the form of a string starting with "b64\_") that will allow manipulation of the document in the ARender view.

**openDocument** is then called with the ID of the loaded document as a parameter, thereby displaying the document in question.

## Multiple document opening

ARender provides the possibility to open several documents by loading a list of documents which will be provided via JSON in order to define the tree structure. All the technical details can be found [here](/docs/arender/learn/how-to/composite-accessors)
