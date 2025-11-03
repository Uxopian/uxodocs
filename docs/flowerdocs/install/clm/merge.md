---
title: "Merge of several scopes"
description: "Description of the rules used to merge scopes: which elements are merged, behaviour in the event of conflicts, etc."
date: "2004-03-21T13:22:01+02:00"
---



:::info
The ``force`` parameter is used to determine the behaviour to adopt in the event of conflicts between elements in several modules:

 * true: elements present in a module overwrite elements in the initial scope
 * false (default): elements present in a module are ignored if they are present in the initial scope.

The order followed is the order passed as input to the CLM.
:::


# Execution 

The CLM offers the option of merging several scopes.

```properties
<clm> merge --template=<template> --modules=<module1>,<module2>
```

<br/>
__Parameters:__

| Parameter              | Mandatory| Description                                                                            |
|------------------------|------------|----------------------------------------------------------------------------------------|
| template               | Yes        | Identifier of template to be built (name of output folder)                        |
| modules                | Yes        | Names of templates to be merged, separated by commas                                    |
| force                  | No        | true or false *(default: false)*                                                   |



# Merge rules

Generally speaking, merge follows the following rules:

 * If an element is present in one scope and absent in another, it will be present in the merged scope
 * If an element is present in several scopes:
    * Some sub-elements are merged (see detailed rules below)
    * Other properties are either ignored or overwritten if defined, depending on the value of the ``force`` parameter.

## Scope 

Merge of data in the ``scope.xml`` file. 

The merge is performed as follows:

 * If a profile is present in several modules, the list of identities and properties is merged
 * 2 properties with the same name but different values are seen as different objects


## ACLs

 * The list of entries is merged
 * In the case of proxy ACLs: the list of proxy ACLs is merged. If a proxy ACL is present in several modules, it is ignored or overwritten depending on the value of the ``force`` parameter

## Component classes

 * The list of tag references and tag categories are merged
 * If a tag reference is present for the same class in several modules, it is ignored or overwritten depending on the value of the ``force`` parameter 

### Task classes

 * The list of attachments and replies are merged
 * If an attachment is present for a class in several modules, it is ignored or overwritten depending on the value of the ``force`` parameter 
 * If a response is present for a class in several modules, it is ignored or overwritten depending on the value of the ``force`` parameter 

### Folder classes

 * The list of attachments is merged
 * If an attachment is present for a class in several modules, it is ignored or overwritten depending on the value of the ``force`` parameter 

### Virtual folder classes

 * The search list is merged
 * If a search is present for a class in several modules, it is ignored or overwritten depending on the value of the ``force`` parameter 

## Tag classes

 * If a "Choice list" tag class is present in several modules, the lists of values are merged 
 * Conditional value lists are not merged.

## Components

 * The tag list is merged
 * If a tag is present for the same component in several modules, its value is ignored or overwritten depending on the value of the ``force`` parameter 


### Documents

 * If a document is present in several modules, its content is ignored or overwritten depending on the value of the ``force`` parameter

### Folders

 * If a folder is present in several modules, the list of attachments is merged

### Tasks

 * If a task is present in several modules, the lists of attachments and participants are merged

## Tag categories

 * If a profile is present in several modules, the list of identities and properties is merged

## Process

 * If a process is present in several modules, the list of classes is merged
 * Other process properties, such as the first step, are ignored or overwritten depending on the value of the ``force`` parameter

## Facts

 * The list of facts is merged
 * If a fact is present in several modules, it is ignored or overwritten depending on the value of the ``force`` parameter
 
# Example 

The GEC scope contains a ``MailToBeProcessed`` task class with an ``Incoming mail`` attachment. The icon property is set to ``icon_A``.

The OutgoingMail scope contains a ``MailToBeProcessed`` task class with an ``outgoing mail`` attachment. The icon property is set to ``icon_B``.

<br/>

The merge is performed in GEC-OutgoingMail order. 

<br/>

In all cases, the ``MailToBeProcessed`` class will have ``Incoming mail`` and ``Outgoing mail`` as attachments, because the list of attachments is merged.

If the ``force`` parameter is ``false``, the icon will be set to ``icon_A``

If the ``force`` parameter is ``true``, the icon will be set to ``icon_B`` 


# Summary
 
| Item                         | Overloaded / ignored properties  																			| Merged sub-elements                       |
|-------------------------------|---------------------------------------------------------------------------------------------------------------|-------------------------------------------|
| Scope                         | Data <br/> Description <br/> Labels <br/> Languages <br/> Organizational unit <br/> Rules file    | Profiles (see "Profiles" line)              |
| Profiles                       | Description <br/> Name                                                                                         | Identities <br/> properties                |
| ACLs                          | Description <br/> Name                                                                                         | Inputs                                   |
| All component classes     | Data <br/> Assets <br/> Technical <br/> Descriptions <br/> Labels <br/> Retention period    				| Tag reference <br/> Tag categories |
| Task classes              | Icon <br/> process 																						| Replies <br/> Attachments 			|
| Folder classes            | 																								                | Attachments 							|
| Virtual folder classes   | 																							 					| Searches 								|
| Tag classes                | Data <br/> Labels <br/> Pattern <br/> Searchable <br/> Type 												| Value lists 						|
| All components				| Data <br/> Name 																								| Tags 									 	|
| Folders                      | 							 																					| Attachments 							|
| Tasks                        | Assigned to <br/> Reply <br/> Process																		| Attachments <br/> Participants		 	|
| Documents                     | Content <br/> Version <br/> Version label <br/> Version ID <br/> Mime type <br/> Parent ID				| 											|
| Tag categories             | Labels <br/> Description <br/> Icon <br/> Folded <br/> Aligned <br/> Visible 								| Tags 	  							     	|
| Process                     | Labels <br/> Description <br/> First stage <br/> Style 													| Classes 									|
| Facts                         | All 																										|  										 	|