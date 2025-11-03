---
title: "Getting Started"
date: "2000-01-01T13:20:01+02:00"
---


The FlowerDocs graphical user interface can be customised using scripts written in JavaScript. 
These scripts allow you to use the JS API to enrich and interact with the interface.

To be executed within the browser, these scripts must be loaded from a URL accessible from the user's workstation.

<br/>
__Script class Documents__

Documents stored in the DMS with the ``Script`` class are loaded on the client side. Users who need to load these documents must have ``READ`` and ``READ_CONTENT`` permission to access them.

These JavaScript files are cached on the client side and are renewed with each update.


<br/>
__External scripts__

External scripts can be loaded client-side by including WEB resources whose URLs are concatenated in the ``js.api.scripts`` property (separated by ``,``). URLs must be accessible from client workstations.

If these scripts are to change, the URLs must be suffixed (e.g. with ``?version``) to force the browser to renew them.


