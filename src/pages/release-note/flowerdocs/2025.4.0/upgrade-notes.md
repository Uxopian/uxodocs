---
title: Upgrade Notes 2025.4.0
description: Major technical changes in version 2025.4.0
---

# Customisation and configuration

## Configuration

### Obsolete / replaced configuration properties

- Following the upgrade of ARender to version 2023.17.0, the Lasso feature is now disabled by default.
  This feature will be removed in a future version. If this feature is important to your usage, please create an insight on our ProductBoard portal to express your interest.

### Added properties

- It is now possible to configure a separate **Base DN for groups** in the LDAP directory using the new `GroupBaseDN` property in the authentication configuration. If this property is not defined, the existing `BaseDN` is used by default. This flexible configuration allows for adaptation to organisations whose users and groups are spread across different organisational units (OUs) in the directory.

## Product

### Technical changes

- ARender version upgrade: **2023.17.0**
- A new Docker image `flower-docs-arender-hmi` has now been built and published. It includes the FlowerDocs connector jar.

#### Security

Improvements to FlowerDocs security have been made by upgrading libraries. This proactive approach ensures better protection against vulnerabilities.

### Behavior changes

#### Performances

- Optimisation has been carried out to reduce the number of calls to the virtual file service when navigating between searches. This fix resolves an issue that could result in several hundred calls in a matter of seconds for a single user.

#### Search

- Manual date entry in search forms has been corrected. The date change event now only triggers when exiting the field, rather than with each keystroke.

#### Virtual folders

- The `ClassId` column is now correctly displayed in the results table for configured virtual folders if it is present in the `selectClause` and no form is configured for that folder.

#### ServiceWorker {#serviceworker}

- The behaviour of the "Refresh" pop-up for updating the configuration via ServiceWorker has been greatly improved in order to reduce unwanted displays when browsing.

#### Annotations

- Annotations are now saved when a document is updated with a version that has fewer pages than the previous annotated version. Annotations linked to non-existent pages are now silently ignored instead of causing an error.

#### SSO

- Delegations are now calculated correctly when logging in with SSO.

#### FlowerDocs GEC

The following configuration documents have been modified (JS files only, no XML modified):

- `lookupClient.js`
- `upperCaseRefClient.js`

#### FlowerDocs eProcess

The following configuration documents have been modified (JS files only, no XML modified):

- `lookupClient.js`
- `upperCaseRefClient.js`
- `env-filterWorkflow.js`
