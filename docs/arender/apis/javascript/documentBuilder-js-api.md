---
title: "Document builder"
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: 6589046eaeecab4efc3105b7b157452dfe19c5ac4039871942a498150c338153
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

    | Function                                          | Description                                                                 | Arguments                                                                                                                                |
    | ------------------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
    | registerNotifyAlterDocumentContentEvent(callback) | Trigger a callback function when a built document is saved                  | **callback:** the callback function to call                                                                                              |
    | registerSubmitAlterDocumentContentEvent(callback) | Trigger a callback function when a document creation is submitted           | **callback:** the callback function to call                                                                                              |
    | getSubmittedAlterDocumentContentDescription(obj)  | Retrieve content description of altered document                            | **obj:** the source SubmitAlterDocumentContentEvent object                                                                               |
    | getDocumentMetadata(desc,index)                   | Extract the DocumentMetadata object from the source AlterContentDescription | **desc:** AlterContentDescription;<br/>**index:** index of the document to fetch documentMetadata from |
    | getResultDocumentId(obj)                          | Fetch resulting DocumentId                                                  | **obj:** the event that was sent when the altercontent operation has been done                                                           |


- Object: getARenderJS().getDocumentMetadata()

    | Function                                          | Description                                                | Arguments                                                                                                                                                                  |
    | ------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | addDocumentMetadata(metadata, key, value)         | Add a metadata to a documentMetadata object                | **metadata:** Metadata to modify;<br/>**key:** String that is the key of the metadata;<br/>**value:** String that is the value of the metadata |


``` javascript
function arenderjs_init(arenderjs_)
{
  arenderjs_.getDocumentBuilder()
                .registerSubmitAlterDocumentContentEvent(function(obj){
                    armt_onSubmitAlterDocumentContentEvent(arenderjs_,obj);
                });
  arenderjs_.getDocumentBuilder()
                .registerNotifyAlterDocumentContentEvent(function(obj){
                    armt_onNotifyAlterDocumentContentEvent(arenderjs_,obj);
                });
}

function armt_onSubmitAlterDocumentContentEvent(arenderjs_,obj)
{
    var desc = arenderjs_.getDocumentBuilder()
                            .getSubmittedAlterDocumentContentDescription(obj);
    var meta = arenderjs_.getDocumentBuilder()
                            .getDocumentMetadata(desc, 0);
    arenderjs_.getDocumentMetadata().addDocumentMetadata(meta, "name", "value");
}

function armt_onNotifyAlterDocumentContentEvent(arenderjs_,obj)
{
    console.log("Notify: " + obj);
    var docId = arenderjs_.getDocumentBuilder().getResultDocumentId(obj);
    console.log("Notify: " + docId);
    console.log("Notify: docId = " + docId);
}
```

### Custom document builder layout

- Object: getARenderJS().getDocumentBuilder()

  | Function                                          | Description                                                 | Arguments                                                                                                                                 |
  | ------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
  | registerDocumentBuilderOpeningEvent(callback)     | Trigger a callback function when a built document is opened | **callback:** the callback function to call                                                                                               |
  | registerDocumentBuilderSaveCustomEvent(callback)  | Trigger a callback function when a custom document is saved | **callback:** the callback function to call                                                                                               |
  | createCustomDocument(builderLayout, optionsList)  | Create a custom document in the document builder            | **builderLayout:** the json format of the custom layout,  **optionsList:** the json format of wanted types options to set in the datalist |


``` javascript
function arenderjs_init(arenderjs_) {
    /**
     * Build the custom document builder in ARender
     */
    arenderjs_.getDocumentBuilder().registerDocumentBuilderOpeningEvent(function () {
        let jsonDocumentBuilderLayout = getCustomLayout();                                                      // Retrieve the json format of the custom document builder layout
        let jsonCustomOptionsList = getOptions();                                                               // Retrieve the json format of the custom options set in the data list
        arenderjs_.getDocumentBuilder().createCustomDocument(jsonDocumentBuilderLayout, jsonCustomOptionsList); // Call the createCustomDocument function to build the custom document builder in ARender
    });
    /**
     * Retrieve and log the json format of the custom document builder created in ARender
     */
    arenderjs_.getDocumentBuilder().registerDocumentBuilderSaveCustomEvent(function (customJsonDocumentBuilderTypeInfo) {
        console.info("customJsonDocumentBuilderTypeInfo :\n" + customJsonDocumentBuilderTypeInfo);
    });
}
```