---
title: Document builder
last_update:
  date: '2026-03-12T20:43:52.809Z'
  author: CI/CD Bot
content_hash: feb2b6fc5ec576d17c1169df6eb8a4f78f14c711b7b4743a273be2914e2ca5bf
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
