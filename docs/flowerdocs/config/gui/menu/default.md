---
title: "Default page"
date: "2001-03-02T13:20:01+02:00"
---




The default page is the one displayed at login.


To configure the default page, simply add a property to the corresponding profile, for example: ``place.default=home``

The different values supported are: 


| Values                          | Description                                                                                 |
|----------------------------------|---------------------------------------------------------------------------------------------|
|home                              | Home page                                                                              |
|search(templateName)              | Search screen with optional search template name                             |
|store        	                   | File insertion screen                                                                |
|storeTask(id)        	           | Task creation screen                                                                  |
|admin       	                   | Admin console                                                                    |
|browse(id)                        | Virtual folder consultation tab                                                   |
|componentResolve(templateName)    | Search-based component tab                                                  |

Two special cases: 

* Search: the `search` keyword can take one argument: ``search(search_template_id)``
* Virtual folders: it is necessary to specify the virtual folder identifier as a parameter

