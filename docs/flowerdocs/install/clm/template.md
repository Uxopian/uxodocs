---
title: Template
date: '2004-03-20T13:20:01+02:00'
last_update:
  date: '2025-12-01T14:30:57.777Z'
  author: CI/CD Bot
content_hash: 337d6bfd16cfeca6e83a06630d1e7a13ca42e03769093ae45dc7ec7254004439
---



# Scope import

The import of a scope is based on a template that serves as a model for the creation of a new scope. This notion of template allows you to initialize different scopes based on the same template.

The location of templates can be defined by supplying the `--data.dir=<path to templates>` parameter.


<br/>
A template is a set of XML files in a directory whose name is the template identifier. Its structure is based on the following files: 

* acls
* classes
    * tag
    * document
    * folder
    * task
    * virtualFolder
*  documents
*  conf
*  folders
*  tasks
*  tagCategories
*  virtualFolders
*  workflows
*  facts
*  scope.xml

<br/>

*__Note:__ The ``conf`` folder is used to isolate technical documents (such as LDAP configuration, CSS, etc.)*


In configuration XML files for ``OperationHandlerRegistration``, ``Script``, and ``Template``, it is recommended to use the following structure to reference files:
```xml
<ns3:files size="0">
      <id>Unassign_history.js</id>
      <ns4:Name>Unassign_history.js</ns4:Name>
      <ns4:FormatCode>application/javascript</ns4:FormatCode>
  </ns3:files>
  ```
  This way, referenced files will be correctly interpreted and displayed on the UI.



# Create scope with default template

The default FlowerDocs template can be downloaded from the [downloads](/install/getting-started.md) page.
It can then be used as a basis for creating a customized scope.


To create a scope from one or more templates, use the CLM, covered in the following pages.


<br/>
The default template contains a configuration file for the company form : LDAP.xml

This contains configuration variables that can be set directly at scope creation via the CLM.
To do this, simply add the following parameters to the command line sent to the CLM :

* \--ldap.type=OPENLDAP 
* \--ldap.baseDN="dc=flowerdocs,dc=com"
* \--ldap.user="cn=admin,dc=flowerdocs,dc=com"
* \--ldap.url=ldap://openldap-flowerdocs:389
* \--ldap.password=yourLDAPPassword
* \--ldap.attributes.id=CN
* \--ldap.attributes.search=displayName
* \--ldap.attributes.displayName=displayName
* \--ldap.attributes.members=uniqueMember
