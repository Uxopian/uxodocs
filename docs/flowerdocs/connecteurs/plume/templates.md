---
title: "Models"
date: "2003-03-28T13:20:01+02:00"
---


These templates are determined from a document search using the `Template` class (this class can be modified using the `flower.template.class` property).
The templates must therefore be accessible to Plume users.

# Filters

The models available to a user can be filtered according to different filters. 

The first concerns the model source. In this documentation, only models from FlowerDocs are documented, which is why the various filter examples have the `source` property set to `flower`.

<br/>
It is also possible to define filters on tags carried by models. For example, if the `Template` class has a `TemplateType` tag, it is possible to define a set of filters such as :  

```javascript
var filters = { "source": [ "flower" ], "TemplateType": ["Custom"] };
```

# Model types

Depending on the type of template, different functions must be called to initialize the Plume plugin.

## Email body

The first type of template concerns the body of the email to be written.

```javascript
context.getTemplatesComponent().initTemplates(filters);
```

## Signature

The second type of template concerns the signature of the user writing the email.

```javascript
context.initSignature(filters);
```


# Variables

The notion of variable can be used within templates to pre-fill them and thus facilitate the writing of an email.

<br/>
By default, several variables are valued as : 

* tags: all tags in the open component are added as variables,
* the URL of **FlowerDocs GUI**: `flowerURL`,
* the name of the logged-in user: `userDisplayName`,
* logged-in user's email address: `userMail`,
* the current scope: `scope`.

<br/>
It is also possible to add custom variables: 

```javascript
$wnd.getARenderJS().preparePluginEvent("<name>", "<value>", "plume");
```

<br/>
Once defined, these variables can be used in models such as `{variableName}`.