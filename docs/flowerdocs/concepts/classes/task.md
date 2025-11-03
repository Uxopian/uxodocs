---
title: "Tasks"
description: "tasks classes"
date: "2018-03-02T13:20:01+02:00"
---


:::info
A task class is used to define the task model to be created. Its special features are : 

* an icon (example: ``fa fa-envelope``)
* a workflow identifier
* possible answers  
* expected attachments
:::


# Attachments

When processing a task, it may be necessary for the user to add one or more components.
 
These components are called task attachments and are globally defined by task class. 

Each expected attachment has the following attributes: 

* a identifier
* an internationalized name
* definition of a component class (identifier and category) 
* a tag list: precisely defines attachment metadata

These attachments can also be characterized by the following parameters: 

* required: defines whether the attachment must be added to validate changes made to the task, required later or optional 
* technical: defines whether or not the attachment should be displayed to users
* multivalued: defines whether the attachment can be composed of several components
* read-only: defines whether users can modify the attachment (the read-only aspect of an attachment also depends on the permissions defined at task level)

To describe an attachment, you can define : 

* a description that will be displayed when the mouse hovers over the attachment
* a summary displayed under the name of the component added as an attachment


# Summary

The summary can be configured, by scope language, to display the tags of the attached component (example: ``${Priority} Created by ${owner}``)	

By default, the summary displays the component creation date.

To go even further, you can use the JS API to define your own summary. A dedicated section [here](/apis/jsapi/forms/task-attachment#summary.md).

# Answers

Responses are used to steer tasks in a direction suggested by a workflow. 
Each answer has the following attributes: 

* an identifier
* an internationalized name
* an internationalized confirmation message

## Answers with reason

You can define a patterned response as follows:

```xml
<ns4:answers xsi:type="ns4:ReasonedAnswerDefinition" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
	<id>Initiate</id>
	<ns4:displayNames language="EN">
		<ns3:value>Send</ns3:value>
	</ns4:displayNames>
	<ns4:displayNames language="FR">
		<ns3:value>Send</ns3:value>
	</ns4:displayNames>
	<ns4:reasons tagName="Matricule" order="0" mandatory="true">
		<ns4:descriptions language="EN">
			<ns3:value>MXXXX - Enter the id of new adherent</ns3:value>
		</ns4:descriptions>
		<ns4:descriptions language="FR">
			<ns3:value>MXXXX - New adherent identifier</ns3:value>
		</ns4:descriptions>
		<ns4:pattern>^M[0-9]*$</ns4:pattern>
	</ns4:reasons>
	<ns4:reasons tagName="Comments" order="0" mandatory="true" />
</ns4:answers>
```
	
To add a motif with a pattern, the following properties must be defined:

* ``descriptions``, the internationalized description of the tag when the user has not yet entered a value in the field
* ``pattern``, the rule to apply 

For example, the rule ``^M[0-9]*$`` accepts only values beginning with ``M`` and ending with digits.
