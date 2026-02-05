---
title: Plume
sidebar_position: 12
last_update:
  date: '2026-02-02T11:59:59.803Z'
  author: CI/CD Bot
content_hash: 0875a8af251646ddc7b0c321c147d81f4729eb144323942e96c00db390973141
---
## Sending emails in ARender

Sending email is possible using an application named "plume" which must be placed
in an application server in the same way as ARender.

### ARender Setup

A configuration is required on the ARender side:

```cfg
arenderjs.startupScript=scripts/plume.js
plume.enabled=true
plume.url=/plume
```

The *plume.url* property can be changed to match the url of the plume app deployed.

### Plume configuration

Various properties can be activated in plume, corresponding to several functionalities.
These properties must be placed in the *application.properties* file whose path is :
server/webapps/plume/WEB-INF/classes/application.properties

The *arender.enabled* property must be enabled for plume usage in ARender.

```cfg
arender.enabled=true
```

#### SMTP

For sending mail via the SMTP protocol, the properties to assign are as follows :

```cfg
smtp.enabled=true
smtp.host=
smtp.port=
smtp.username=
smtp.password=
smtp.parameters.socketFactory.port=587
smtp.parameters.socketFactory.class=javax.net.ssl.SSLSocketFactory
smtp.parameters.starttls.enable=true
smtp.parameters.ssl.trust=*
smtp.parameters.ssl.protocols=TLSv1.2
```

| Property       | Description          |
| -------------- | -------------------- |
| smtp.enabled   | Enable SMTP protocol |
| smtp.host      | SMTP host            |
| smtp.username  | SMTP user name       |
| smtp.password  | SMTP password        |

#### Rest

Activating the Rest API allows you to retrieve the current document in ARender
and use it as an attachment.

It is also possible to retrieve a contact list from an url via a Rest call,
this list can be used as a means of pre-filling contact fields.

```cfg
rest.enabled=true
rest.contacts.url=
```

#### FS

Enabling the file system allows recovery of local files which can then
be used as attachments, email templates and contact list.

Sent emails can also be saved locally.

```cfg
fs.enabled=true
fs.attachment.dir=/attachments
fs.template.dir=/templates
fs.outgoing.dir=
```

| Property          | Description                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| fs.enabled        | Enable file system                                                                                           |
| fs.attachment.dir | Attachments directory path                                                                                   |
| fs.template.dir   | Templates directory path                                                                                     |
| fs.outgoing.dir   | Path of the directory where the emails are saved after been sent, leave empty to not save the emails locally |

To define a contact list as a means of pre-filling contact fields,
it is possible to define its contacts directly in the property file in the following form :

```cfg
fs.contacts[0].firstName=firstName1
fs.contacts[0].lastName=lastName1
fs.contacts[0].email=firstName1.lastName1@test.com

fs.contacts[1].firstName=firstName2
fs.contacts[1].lastName=lastName2
fs.contacts[1].email=firstName2.lastName2@test.com

...
```

#### LDAP

A contact list can also be retrieved from the LDAP protocol.
For this, the properties are as follows :

```cfg
ldap.enabled=true
ldap.server=
ldap.username=
ldap.password=
ldap.base=
```

| Property                   | Description                                                         |
| -------------------------- | ------------------------------------------------------------------- |
| ldap.enabled               | Enable LDAP                                                         |
| ldap.server                | URL du serveur LDAP                                                 |
| ldap.username              | LDAP Server URL                                                     |
| ldap.password              | LDAP password                                                       |
| ldap.search.base           | LDAP base name                                                      |
| ldap.search.filter         | Attributes filter (example : ldap.search.filter=objectClass=person) |
| ldap.attributes.firstname  | Name of the attribute to display representing the first name        |
| ldap.attributes.lastname   | Name of the attribute to display representing the last name         |
| ldap.attributes.mail       | Name of the attribute to display representing the mail address      |
