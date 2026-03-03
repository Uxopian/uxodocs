---
title: Document builder
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 85c56d7a6e33d41e4405db514a1244f18a93ff3e337b41ab99f462e251184517
---

### Interacting with the documentBuilder

- Object: getARenderJS().getDocumentBuilder()

    | Function | Description                         |
    | -------- | ----------------------------------- |
    | close()  | Closes the document builder         |
    | open()   | Open the document builder           |
    | reset()  | Resets the document builder content |

### Register to the documentBuilder save event

- Object: getARenderJS().getDocumentBuilder()

    | Function                                          | Description                                                                 | Arguments                                                                      |
    | ------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
    | registerNotifyAlterDocumentContentEvent(callback) | Trigger a callback function when a built document is saved                  | **callback:** the callback function to call                                    |
    | registerSubmitAlterDocumentContentEvent(callback) | Trigger a callback function when a document creation is submitted           | **callback:** the callback function to call                                    |
    | getSubmittedAlterDocumentContentDescription(obj)  | Retrieve content description of altered document                            | **obj:** the source SubmitAlterDocumentContentEvent object                     |
    | getDocumentMetadata(desc,index)                   | Extract the DocumentMetadata object from the source AlterContentDescription |                                                                                |
    | getResultDocumentId(obj)                          | Fetch resulting DocumentId                                                  | **obj:** the event that was sent when the altercontent operation has been done |

- Object: getARenderJS().getDocumentMetadata()

    | Function                                  | Description                                 | Arguments |
    | ----------------------------------------- | ------------------------------------------- | --------- |
    | addDocumentMetadata(metadata, key, value) | Add a metadata to a documentMetadata object |           |

```javascript
function arenderjs_init(arenderjs_) {
  arenderjs_.getDocumentBuilder()
    .registerSubmitAlterDocumentContentEvent(function (obj) {
      armt_onSubmitAlterDocumentContentEvent(arenderjs_, obj);
    });
  arenderjs_.getDocumentBuilder()
    .registerNotifyAlterDocumentContentEvent(function (obj) {
      armt_onNotifyAlterDocumentContentEvent(arenderjs_, obj);
    });
}

function armt_onSubmitAlterDocumentContentEvent(arenderjs_, obj) {
  var desc = arenderjs_.getDocumentBuilder()
    .getSubmittedAlterDocumentContentDescription(obj);
  var meta = arenderjs_.getDocumentBuilder()
    .getDocumentMetadata(desc, 0);
  arenderjs_.getDocumentMetadata().addDocumentMetadata(meta, "name", "value");
}

function armt_onNotifyAlterDocumentContentEvent(arenderjs_, obj) {
  console.log("Notify: " + obj);
  var docId = arenderjs_.getDocumentBuilder().getResultDocumentId(obj);
  console.log("Notify: " + docId);
  console.log("Notify: docId = " + docId);
}
```

### Send documentBuilder save event

- Object: getARenderJS().getDocumentBuilder()

    | Function                                               | Description                                           | Arguments |
    | ------------------------------------------------------ | ----------------------------------------------------- | --------- |
    | saveCustomDocument()                                   | Trigger the custom save process with default values   |           |
    | saveCustomDocument(download, delete, freeze, behavior) | Trigger the custom save process with specific options | **download:** Activates the local download builder button.<br/> **delete:** Delete the documents from the document builder view.<br/> **freeze:** Disable the documents from the document builder view.<br/> **behavior:** Sets the document builder save behavior:<br/> **UPDATE_NO_DOCUMENT**,<br/> **CREATE_NEW_FIRST_DOCUMENT**,<br/> **UPDATE_FIRST_DOCUMENT**,<br/> **UPDATE_ALL_DOCUMENT** |

#### Example

```javascript title="scripts/example.js"
function arenderjs_init(arenderjs_)
{
  arenderjs_.getDocumentBuilder().saveCustomDocument(false,true,false,"UPDATE_NO_DOCUMENT");
}