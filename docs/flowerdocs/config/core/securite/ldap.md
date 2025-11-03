---
title: "Directory"
description: "Authenticate users to a company directory"
date: "2000-03-20T13:20:01+02:00"
---



# Directory configuration

This section describes the configuration of the company directory.

An administrator account must be set up to perform the following actions:
 
* user search
* user recovery
* authentication
* etc.

## Directory type

To configure access to the company directory, you need to identify the type of access required:


* ``simple``: Simple LDAP such as Apache Directory Server or OpenLDAP
* ``ad``: Microsoft Active Directory
* ``ad-ds``: Microsoft ADLDS

## Directory definition by scope

This section covers the configuration of a scope-specific directory. <b>This is the most flexible configuration mode.</b>

Directory configuration is accessible from the administration interface in the `Identities > Directory` section, and is stored as a document in the `LDAPConfiguration` class in FlowerDocs.

<br/>
The information to be configured is as follows:

| Identifier                    | Display name                               | Description                        
|-------------------------------|--------------------------------------------|------------------------------------
| `LDAPType`       				| LDAP type                					 |Directory type             
| `URL`        					| URL 			                             |Directory access url
| `User`                        | User   		                          	 | User to connect to the directory
| `Password`                   | Password		                             | Password for directory user
| `BaseDN`                     | Base DN                                	 | DN configured in the directory 
| `IdAttribute`                | Attribute for identifier                   | Directory attribute used to store the user identifier
| `GroupIdAttribute`           | Attribute for group identifier            | Directory attribute used to store the group identifier
| `DisplayNameAttribute`      | Display name attribute                     | Directory attribute used to store the user's display name
| `SearchAttribute`           	| Search attribute                           | Directory attribute used to search for users/groups
| `MembersAttribute`           | Members                            	     | Directory attribute used to store group members
| `EnableLowerCaseOfUserName` | Enable evaluation of lower case identifier | Enables you to force the resolution of user identifiers in lower case 

## Default directory definition

This section covers the configuration of a default directory for a FlowerDocs instance.

This section is not necessary if the directory is configured via the scope-based administration interface described above.
The directory type can then be defined by WEB application: 

* For **FlowerDocs GUI** using the property: ``gui.ldap.type``
* For **FlowerDocs Core** using the property: ``ws.ldap.type``


__Example:__ Configuring an embedded server

```properties
gui.ldap.type=ad
ws.ldap.type=simple
```

<br/>
To configure access to the LDAP directory, you need to set the ldap property.

| Property               | Default value                 | Description               |
|------------------------|-------------------------------|---------------------------|
| ldap.bind.url          |                               |Directory address          |
| ldap.bind.root         |                               |Base node in LDAP structure|
| ldap.base.dn           |                               | User search database      |



<br/>
An admnistrator account must be set up.

| Property               | Description              |
|------------------------|--------------------------|
| ldap.bind.dn           | User's Distinguished Name|
| ldap.bind.password     | User's password          |


<br/>
In order to retrieve (or authenticate) users with the configured directory, you must also define: 


| Property              | Description                                   |
|-----------------------|-----------------------------------------------|
| ldap.attr.id          | Attribute used to retrieve a user's identifier|

__Examples__: 

* Microsoft Active Directory : ``sAMAcountName`` 
* Microsoft Active Directory LDS: ``uid``  
* Apache Directory Server: ``uid``

<br/>
Other attributes used for user mapping can be defined: 

| Property               | Description                                   |
|------------------------|-----------------------------------------------|
| ldap.attr.display.name | Attribute used to retrieve a user's identifier|
| ldap.attr.password     | Attribute used to retrieve a user's password  |
| ldap.attr.search       | Attribute used for research                   |

### Configuration examples

#### ADLDS
	 
```properties
ldap.bind.url=ldap://ldap.company.com:389
ldap.bind.root=dc=arondor,dc=dev
ldap.bind.dn=CN=fadmin,OU=Demo,OU=FlowerDocs,DC=arondor,DC=dev
ldap.bind.password=okidoki
ldap.base.dn=OU=Demo,OU=FlowerDocs
ldap.attr.id=CN
ldap.attr.display.name=displayName
```

#### OpenLDAP

OpenLDAP requires that the base DN used
	 
```properties
ldap.bind.url=ldap://ldap.company.com:389
ldap.bind.root=
ldap.base.dn=dc=arondor,dc=dev
ldap.attr.id=CN
ldap.bind.dn=CN=admin,DC=arondor,DC=dev
ldap.bind.password=okidoki
ldap.attr.display.name=displayName
```

# Directory administration

From the administration interface, users can be created with a default password. 
For this, the password is not mandatory, but is a global parameter for the FlowerDocs instance.

| Property                       | Description                                        |
|--------------------------------|----------------------------------------------------|
| ldap.default.password          | Default password if none set at creation           |
| ldap.user.password.mandatory   | Boolean defining if the password field is mandatory|


	
Users and groups can only be created at the root of the directory access node. 

**Example:** For Microsoft Active Directory: ``&lt;domaine&gt;/<base DN>`` 
