---
title: Authorisation
description: Secure your application
date: "2018-03-27T13:20:01+02:00"
last_update:
  date: '2026-01-13T09:15:17.464Z'
  author: CI/CD Bot
content_hash: 1a0ec779e782938696c02d9182e4763a8ec99b31708e5249a4da4550347b339c
---

:::info
The role of a security object is to manage the various permissions on objects in FlowerDocs (components, saved searches, scopes, etc.). These security objects are referenced on FlowerDocs objects.
:::

Within the application, we define two types of security objects:

- Access control list (ACL)
- Proxy

These security objects are used to authorise (or prohibit) an identity to perform an action.

# Security objects

## Access control list (ACL)

An access control list contains one or more access control entries (`ACE`).

In each entry, different permissions are defined for a set of identities (user, group, team).

<br/>

For example, when a user wants read access to a component, the application will evaluate the read permission according to the ACL carried by the component.

:::info
If the user does not belong to any identity defined in the ACL referenced by a component, it is considered that he/she has no access rights to this component.

Component classes carry an ACL which is applied by default when a component of this class is created. This ACL can be modified later via integration.
:::

### Order of access control inputs (ACE)

The order in which `ACE` are defined is important, as it corresponds to the order in which they are evaluated. The first entry corresponds to the user, one of his groups, one of his teams or **\***, will be the one used to evaluate the various user permissions for a component.

<br/>

For example, if the first entry has the identity **\*** to view the component, and the second has the identity of the user's identifier X which does not allow the component to be viewed, the user will be able to view this component.

By inverting the two`ACL` entries, all users except user X will be able to see the component.

- When setting up`ACL`, it is advisable not to define entries with the identity **\***.

Indeed, this would mean that a user who is not part of a group could still have the permissions of the`ACL`.
It is preferable to add the name of all groups/profiles as an entity.

- It is recommended not to exceed 1000 ACL on a scope.

## ACL Proxy

This feature is in beta. For any integration requirements using ACl's proxies, please contact the FlowerDocs team to help you find the best solution for your needs.

A proxy can be used to define dynamic security based on one or more rules.

Each rule corresponds to a list of conditions and an ACL identifier.
If all the conditions of a rule are met, the user's permissions are determined according to the referenced ACL.

Three types of conditions are supported by the application:

- [Condition on tags](/docs/flowerdocs/concepts/tags/conditionnel#condition-sur-les-tags)
- [Condition on class](/docs/flowerdocs/concepts/tags/conditionnel#condition-sur-la-class)
- [Condition on user](/docs/flowerdocs/concepts/tags/conditionnel#condition-sur-l-user)

:::note[Example]

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ACLProxy name="Acl proxy for document" xmlns="http://flower.com/docs/domain/acl" xmlns:common="http://flower.com/docs/domain/common">
	<common:id>acl-proxy-document</common:id>
	<rules xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ACLConditionalRule">
		<conditions>${user.authorities}.contains("DSI")</conditions>
		<conditions>${tags.MailType}==Cancellation</conditions>
		<aclId>acl-courrier-ingoing</aclId>
	</rules>
	<rules xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ACLConditionalRule">
		<conditions>${user.authorities}.contains("ACCOUNTING")</conditions>
		<conditions>${data.classid}==IngoingMail</conditions>
		<aclId>acl-courrier-ingoing</aclId>
	</rules>
	<rules xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ACLConditionalRule">
		<conditions>!${user.authorities}.contains("LEGAL")</conditions>
		<conditions>${tags.MailType}!=Contract</conditions>
		<conditions>${tags.MailType}!=Cancellation</conditions>
		<aclId>acl-courrier-entrant</aclId>
	</rules>
</ACLProxy>
```

:::

<br/>
:::info
Like ACLs, if none of the rules is satisfied, the user is considered to have no access rights to the component.
:::

# Security object Association

A security object is associated with an object through its `ACL` field. This field contains only the ACL identifier. In this way, an ACL can be defined on several components, providing the possibility of managing security policies common to sets of components.

The ACL referenced, for example on a component, will be used to determine whether or not a user is authorised to perform an action on it.

<br/>
Creating a component is a special case. As this does not yet exist, it is the ACL defined at component class level that is evaluated. To authorise a user to create a component, he or she must have the `CREATE` permission on the ACL referenced at class level.
