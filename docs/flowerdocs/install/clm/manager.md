---
last_update:
  date: '2026-01-27T09:19:20.024Z'
  author: CI/CD Bot
content_hash: fa711cfe92f8cf1b71efe409a1edba2a6c639deffa1de17f7bbf41e909c90dbf
---

+++
date = "2004-03-28T13:20:01+02:00"
title = "Manager"
description = "FlowerDocs Manager tool lets you deploy a scope from a Git project"
+++ 

# Git project prerequisites
 
* Access to a Git project with login/password authentication
* The project contains one or more folders containing scope templates with the structure indicated [here](/documentation/install/clm/template)

# Start FlowerDocs Manager

* Get the JAR 
* Open a terminal and enter the command: 
 
```properties
java -jar flower-docs-manager-2.8.3.jar
```
    
* Open a browser and go to http://localhost:2503/flower-manager/

# Defining a GIT project 

* Click on ``Add a Git project``
* Enter the URL to access the Git project storing the template using the HTTPS protocol
* Branch: Git branch to clone

# Cloning the project 

* Click on ``Projects``
* Click on ``Clone`` on the line of the project to be cloned
* Enter the user and password for cloning the project
* Click on ``Clone``
* If the project has been cloned, the associated templates are visible in the ``Templates`` tab 

# Defining an environment

* Click on ``Add a environment``
* Name: Name the environment
* URL:
    * Enter a URL to access the FlowerDocs Web Services base
    * example: ``https://flowerdocs.com/core/services`` 

    
# Deploying a scope

* Click on ``Deploy``
* Name of scope to be created
* Select a template to be used as a model for the scope to be created
* Select an environment on which to create the new scope
* Password for FlowerDocs administrator account
* Check ``Create`` box: If the box is checked and the scope exists, it is deleted and then recreated. If unchecked, the scope is updated.
