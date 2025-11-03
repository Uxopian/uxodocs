---
title: "Overview"
description: "Open your own popups."
date: "2001-03-28T13:19:01+02:00"
---


Different types of popup can be instantiated or modified: 

* Components creation
* Displaying existing component metadata
* Activity
* Search
* DOM content
* Linking a document to a parent folder
* Confirmation of a user choice

<br/>

These popups can be instantiated using the JS API: 

```javascript
JSAPI.get().getPopupAPI();
```

<br/>

The following functions are available to modify the various common attributes of popups: 


| Function                                              | Description                                                        |
|-------------------------------------------------------|--------------------------------------------------------------------|
|setIcon(String iconStyle)                              | Popup icon definition                                              |        
|setTitle(String title)                                 | Popup Title definition                                             |
|setDescription(String description)                     | Popup description definition                                       |
|addStyle(String style)                                 | Adding a style to the popup                                        |
|setContent(Element content)                            | Overwrites existing popup body content                             |
|addContent(Element element)                            | Adding an element to the popup body                                |
|clearContent()                                         | Overwrites popup body content                                      |
|setClosable()                                          | Enables the possibility of closing the popup with the popup cross  |
|addCloseHandler(CloseCallback callback)                | Add a callback on popup closure                                    |
|show()                                                 | Popup opening                                                      |
|close()                                                | Popup closing                                                      |
|setAutoCloseOnEnter(boolean autoCloseOnEnter)          | Popup closing by pressing Enter                                    |
<!---
 |setScrollable()                                        | Activates scroll on popup body                                      | 
-->



